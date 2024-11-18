import { Product } from "@/types/products";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  const chunkSize = 2000;
  const { file } = (await request.json()) as { file: Product[] };
  console.log("🚀 ~ POST ~ {file}:", file.length);

  try {
    // Process data in chunks
    for (let i = 0; i < file.length; i += chunkSize) {
      const chunk = file.slice(i, i + chunkSize);

      try {
        const result = await prisma.$transaction(
          chunk.map((data: Product) => {
            const processedData = {
              asin: data.asin,
              title: data.title,
              description: data.description,
              price:
                typeof data.price === "string"
                  ? parseFloat(data.price)
                  : data.price,
              reviews: typeof data.reviews === "number" ? data.reviews : null,
              rating: data.rating || null,
              image: data.image || null,
              category: data.category,
            };

            return prisma.products.upsert({
              where: { asin: data.asin },
              update: processedData,
              create: processedData,
            });
          })
        );

        console.log("🚀 ~ POST ~ result:", result);
        console.log(
          `Processed chunk ${Math.floor(i / chunkSize) + 1} of ${Math.ceil(
            file.length / chunkSize
          )}`
        );
      } catch (err) {
        console.error(
          `Error processing chunk ${Math.floor(i / chunkSize) + 1}:`,
          err
        );
        throw err;
      }
    }

    console.log("All records processed successfully!");
    return new Response(JSON.stringify({ status: "Successful" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error processing records:", error);
    return new Response(
      JSON.stringify({
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
