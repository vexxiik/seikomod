const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function makeAdmin() {
  await prisma.customer.updateMany({
    where: {
      email: {
        in: ['kuba.sokol2007@gmail.com', 'admin@seikomod.com']
      }
    },
    data: { role: 'ADMIN' }
  });
  console.log('Roles updated to ADMIN.');
}

makeAdmin().finally(() => prisma.$disconnect());
