import { Product } from "@/types/products";
import { PrismaClient } from "@prisma/client";
// import { forceRevalidate } from "@/utils/removeServerCache";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  //   forceRevalidate(request);
  const chunkSize = 2000;
  const chunks: Product[][] = [];

  const { file } = (await request.json()) as { file: Product[] };
  console.log("🚀 ~ POST ~ {file}:", file.length);

  try {
    // Split data into chunks
    for (let i = 0; i < file.length; i += chunkSize) {
      const chunk = file.slice(i, i + chunkSize);
      chunks.push(chunk);
    }

    // Process each chunk
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];

      try {
        // Process records in the chunk with transactions
        const result = await prisma.$transaction(
          chunk.map((data: Product) =>
            prisma.products.upsert({
              where: {
                asin: data.asin,
              },
              update: {
                title: data.title,
                asin: data.asin,
                description: data.description,
                price:
                  typeof data.price === "string"
                    ? parseFloat(data.price)
                    : data.price,
                reviews: data.reviews as string[],
                category: data.category,
              },
              create: {
                asin: data.asin,
                title: data.title,
                description: data.description,
                price:
                  typeof data.price === "string"
                    ? parseFloat(data.price)
                    : data.price,
                reviews: data.reviews as string[],
                category: data.category,
              },
            })
          )
        );

        console.log("🚀 ~ POST ~ result:", result);

        console.log(`Processed chunk ${i + 1} of ${chunks.length}`);
      } catch (err) {
        console.error(`Error processing chunk ${i + 1}:`, err);
        throw err;
      }
    }

    console.log("All records processed successfully!");

    return new Response(
      JSON.stringify({
        status: "Successful",
      }),
      {
        status: 200,
      }
    );
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
