import { PrismaClient } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { hash } from "bcryptjs";

const SALT_ROUNDS = 12;

async function main() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error(
      "ADMIN_EMAIL and ADMIN_PASSWORD environment variables are required for seeding.",
    );
    process.exit(1);
  }

  const passwordHash = await hash(password, SALT_ROUNDS);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      role: "ADMIN",
      passwordHash,
    },
    create: {
      email,
      name: "Admin",
      role: "ADMIN",
      passwordHash,
      emailVerified: new Date(),
    },
  });

  console.log(`Seeded admin user: ${user.email} (${user.id})`);

  await prisma.$disconnect();
  await pool.end();
}

main().catch((e) => {
  console.error("Seed failed:", e);
  process.exit(1);
});
