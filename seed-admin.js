const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@seikomod.com";
  
  const existingAdmin = await prisma.customer.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("DefN0tVexx", 10);
    await prisma.customer.create({
      data: {
        name: "Administrátor",
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN"
      }
    });
    console.log("Admin user created.");
  } else {
    // If exists but no role, update role
    if (existingAdmin.role !== "ADMIN") {
      await prisma.customer.update({
        where: { email: adminEmail },
        data: { role: "ADMIN" }
      });
      console.log("Admin user role updated.");
    } else {
      console.log("Admin user already exists.");
    }
  }

  // Also create secondary email setting if it doesn't exist
  const emailSetting = await prisma.setting.findUnique({
    where: { key: "contact_email" }
  });

  if (!emailSetting) {
    await prisma.setting.create({
      data: {
        key: "contact_email",
        value: "admin@seikomod.com"
      }
    });
    console.log("Contact email setting created.");
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
