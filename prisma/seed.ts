import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log("Wiping database...")
  
  // Wipe all data in the correct order to avoid foreign key constraint errors
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.expense.deleteMany()
  await prisma.customer.deleteMany()
  await prisma.product.deleteMany()
  
  console.log("Database wiped.")
  console.log("Seeding exactly 3 products...")

  await prisma.product.createMany({
    data: [
      {
        name: "Daydate Blue Textured",
        description: "Prémiový modrý texturovaný ciferník pro jedinečný vzhled.",
        price: 5499,
        type: "Dress",
        movement: "Seiko NH35 Automatic",
        glass: "Safírové s antireflexem",
        bracelet: "President, nerezová ocel",
        images: JSON.stringify(["/img/daydate_blue_tex.png"]),
        stock: 3,
      },
      {
        name: "Daydate Green",
        description: "Smaragdově zelený ciferník evokující opravdový luxus.",
        price: 5499,
        type: "Dress",
        movement: "Seiko NH35 Automatic",
        glass: "Safírové s antireflexem",
        bracelet: "President, nerezová ocel",
        images: JSON.stringify(["/img/daydate_green.png"]),
        stock: 4,
      },
      {
        name: "GMT Coke",
        description: "Cestovní klasika GMT Coke pro světoběžníky.",
        price: 5499,
        type: "GMT",
        movement: "Seiko NH34 GMT Automatic",
        glass: "Safírové s kyklopem",
        bracelet: "Oyster, nerezová ocel",
        images: JSON.stringify(["/img/gmt_coke.png"]),
        stock: 2,
      }
    ]
  })
  
  console.log("Database seeded successfully with 3 products.")
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
