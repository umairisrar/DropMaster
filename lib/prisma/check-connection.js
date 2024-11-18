import { PrismaClient } from "@prisma/client";

async function checkConnection() {
  if (!process.env.DATABASE_URL) {
    console.error("ERROR: DATABASE_URL environment variable is not set.");
    console.error(
      "Please set the DATABASE_URL environment variable and try again."
    );
    process.exit(1);
  }

  const prisma = new PrismaClient({
    // Increase timeout to 30 seconds
    timeout: 30000,
  });

  try {
    await prisma.$connect();
    await prisma.$metrics();
    console.log("Database connection successful.");
  } catch (e) {
    console.error("Unable to connect to the database:", e.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

checkConnection();
