const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateDb() {
  const products = await prisma.product.findMany();
  for (const product of products) {
    if (product.stock !== 0) {
      await prisma.product.update({
        where: { id: product.id },
        data: { stock: 0 }
      });
      console.log(`Updated ${product.name} to stock 0 (preorder)`);
    } else {
      console.log(`Skipped ${product.name} (already at stock 0)`);
    }
  }
}

updateDb()
  .then(() => console.log('Finished updating all watches to preorder.'))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
