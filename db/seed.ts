import sampleData from "./sample-data";
import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient();

  // Delete all products
  await prisma.product.deleteMany();

  // Create new products
  await prisma.product.createMany({ data: sampleData.products });

  console.log("Database seeded successfully");
}

main();