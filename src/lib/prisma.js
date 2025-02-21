// lib/prisma.js
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global;

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // In development, use the global object to persist Prisma client
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }
  prisma = globalForPrisma.prisma;
}

export default prisma;
