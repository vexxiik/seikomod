const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateDb() {
  const products = await prisma.product.findMany();
  for (const product of products) {
    if (product.name.toLowerCase().includes('nautilus')) {
      await prisma.product.update({
        where: { id: product.id },
        data: { stock: 0 }
      });
      console.log(`Updated ${product.name} to stock 0 (preorder)`);
    }
  }
}

updateDb().finally(() => prisma.$disconnect());
