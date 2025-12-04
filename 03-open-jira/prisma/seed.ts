import { PrismaClient, Prisma } from "../src/app/generated/prisma/client";
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import 'dotenv/config'

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.EntryCreateInput[] = [
  {
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur, aperiam?',
    status: 'pending',
  },
  {
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur, aperiam?',
    status: 'progress'
  },
  {
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur, aperiam?',
    status: 'finished',
  },
];

export async function main() {
  await prisma.entry.deleteMany()

  for (const u of userData) {
    await prisma.entry.create({ data: u });
  }
}

main();
