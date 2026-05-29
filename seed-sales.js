const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const currentYear = new Date().getFullYear();
  
  // Create dummy customers if they don't exist
  const customers = [];
  for (let i = 1; i <= 3; i++) {
    const email = `zákazník${i}@test.cz`;
    let customer = await prisma.customer.findUnique({ where: { email } });
    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          name: `Zkušební Zákazník ${i}`,
          email,
          role: "USER"
        }
      });
    }
    customers.push(customer);
  }

  // Check if we already have some dummy orders
  const existingOrders = await prisma.order.count();
  if (existingOrders === 0) {
    // Generate ~10k CZK revenue across a few months
    // Let's create 2 orders: one for 5499, another for 4500
    const monthsToSeed = [new Date().getMonth() - 2, new Date().getMonth() - 1, new Date().getMonth()];
    
    // Order 1 (2 months ago)
    await prisma.order.create({
      data: {
        orderNumber: 10001,
        customerId: customers[0].id,
        total: 5499,
        status: "COMPLETED",
        createdAt: new Date(currentYear, Math.max(0, monthsToSeed[0]), 15),
        items: {
          create: [
            { productName: "Daydate Blue Textured", quantity: 1, price: 5499 }
          ]
        }
      }
    });

    // Order 2 (1 month ago)
    await prisma.order.create({
      data: {
        orderNumber: 10002,
        customerId: customers[1].id,
        total: 4501, // Total 10000 exactly for these two
        status: "COMPLETED",
        createdAt: new Date(currentYear, Math.max(0, monthsToSeed[1]), 20),
        items: {
          create: [
            { productName: "Hodinky na míru", quantity: 1, price: 4501 }
          ]
        }
      }
    });

    console.log("Seeded dummy orders. Total revenue: 10000 CZK.");
  } else {
    console.log("Orders already exist, skipping order seed.");
  }

  // Check dummy expenses
  const existingExpenses = await prisma.expense.count();
  if (existingExpenses === 0) {
    await prisma.expense.create({
      data: {
        name: "Nákup strojků NH35",
        amount: 2500,
        date: new Date(currentYear, new Date().getMonth() - 2, 5)
      }
    });
    await prisma.expense.create({
      data: {
        name: "Hosting Vercel",
        amount: 500,
        date: new Date(currentYear, new Date().getMonth() - 1, 1)
      }
    });
    console.log("Seeded dummy expenses. Total expenses: 3000 CZK.");
  } else {
    console.log("Expenses already exist, skipping expense seed.");
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
