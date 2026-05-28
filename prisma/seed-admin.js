const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function run() {
  const p = new PrismaClient();
  const hash = await bcrypt.hash('DefN0tVexx', 10);
  await p.customer.upsert({
    where: { email: 'admin@seikomod.com' },
    update: {},
    create: { name: 'Admin', email: 'admin@seikomod.com', password: hash }
  });
  console.log('Admin created!');
  await p["$disconnect"]();
}
run();
