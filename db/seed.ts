import sampleData from "./sample-data";
import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient();

  // Delete all products
  await prisma.product.deleteMany();

  // Delete all users
  await prisma.user.deleteMany();

  // Delete all accounts
  await prisma.account.deleteMany();

  // Delete all sessions
  await prisma.session.deleteMany();

  // Delete all verification tokens
  await prisma.verificationToken.deleteMany();

  // Create new products
  await prisma.product.createMany({ data: sampleData.products });

  // Create new users
  await prisma.user.createMany({ data: sampleData.users });

  console.log("Database seeded successfully.");
}

main();