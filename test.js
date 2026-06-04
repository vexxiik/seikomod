const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
prisma.product.findMany().then(p => {console.log(p.map(x => ({name: x.name, images: x.images}))); prisma.$disconnect()});
