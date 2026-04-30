import { PrismaClient } from "@/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

function createPrismaClient(): PrismaClient {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const adapter = new PrismaPg(pool);

  return new PrismaClient({ adapter });
}

declare const globalThis: {
  __prisma: PrismaClient | undefined;
} & typeof global;

export const prisma =
  globalThis.__prisma ?? (globalThis.__prisma = createPrismaClient());
