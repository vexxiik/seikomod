const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getProducts() {
  const pepsi = await prisma.product.findFirst({ where: { name: { contains: 'Pepsi' } } });
  console.log('Pepsi:', pepsi);
}

getProducts().finally(() => prisma.$disconnect());
