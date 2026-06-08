const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addBatman() {
  const batman = await prisma.product.create({
    data: {
      name: 'Seiko Mod GMT Batman',
      nameEn: 'Seiko Mod GMT Batman',
      description: 'Tento model je inspirován ikonickým designem hodinek GMT-Master a osazen prestižním automatickým strojkem Seiko NH34. Představuje dokonalé spojení vysoké kvality a dostupnosti ve sportovně-elegantním provedení s ikonickou černo-modrou lunetou (Batman).',
      descriptionEn: 'This model is inspired by the iconic GMT-Master design and powered by the prestigious Seiko NH34 automatic movement. It represents the perfect fusion of high quality and affordability in a sporty-elegant case with the iconic black-and-blue bezel (Batman).',
      price: 6390,
      type: 'GMT',
      movement: 'Seiko NH34 GMT Automatic',
      glass: 'Safírové s kyklopem',
      bracelet: '904L Ocel Jubilee',
      images: '["/img/gmt-batman.webp"]',
      stock: 5
    }
  });
  console.log('Added Batman:', batman);
}

addBatman().finally(() => prisma.$disconnect());
