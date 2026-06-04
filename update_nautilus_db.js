const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateDb() {
  const products = await prisma.product.findMany();
  for (const product of products) {
    if (product.name.toLowerCase().includes('nautilus') && product.type !== 'Nautilus') {
      await prisma.product.update({
        where: { id: product.id },
        data: { type: 'Nautilus' }
      });
      console.log(`Updated ${product.name} to type Nautilus`);
    }
  }
}

updateDb().finally(() => prisma.$disconnect());
