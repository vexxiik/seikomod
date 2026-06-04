const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkCustomers() {
  const customers = await prisma.customer.findMany({
    select: { id: true, email: true, role: true }
  });
  console.log('Customers in DB:');
  console.table(customers);
}

checkCustomers().finally(() => prisma.$disconnect());
