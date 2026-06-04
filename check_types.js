const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const types = await prisma.product.findMany({ select: { type: true } });
  console.log([...new Set(types.map(t => t.type))]);
}
main().finally(() => prisma.$disconnect());
