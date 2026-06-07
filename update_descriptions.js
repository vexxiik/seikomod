const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();

  for (const product of products) {
    let descCs = "";
    let descEn = "";

    if (product.name === 'Seiko Mod Nautilus Blue') {
      descCs = "Tento model je inspirován ikonickým designem Nautilus a osazen prestižním automatickým strojkem Seiko NH38. Představuje dokonalé spojení vysoké kvality a dostupnosti v elegantním 41mm provedení s uhrančivým modrým ciferníkem.";
      descEn = "This model is inspired by the iconic Nautilus design and powered by the prestigious Seiko NH38 automatic movement. It represents the perfect fusion of high quality and affordability in an elegant 41mm case with a captivating blue dial.";
    } else if (product.name === 'Seiko Mod Day-Date Noir') {
      descCs = "Tento model je inspirován ikonickým designem hodinek Day-Date a osazen prestižním automatickým strojkem Seiko NH35. Představuje dokonalé spojení vysoké kvality a dostupnosti v elegantním 39mm provedení s hlubokým černým ciferníkem.\n\nKaždý kus je pečlivě ručně sestaven a nabízí následující specifikace:";
      descEn = "This model is inspired by the iconic Day-Date design and powered by the prestigious Seiko NH35 automatic movement. It represents the perfect fusion of high quality and affordability in an elegant 39mm case with a deep black dial.\n\nEach piece is carefully hand-assembled and offers the following specifications:";
    } else if (product.name === 'Seiko Mod Day-Date Green') {
      descCs = "Tento model je inspirován ikonickým designem hodinek Day-Date a osazen prestižním automatickým strojkem Seiko NH35. Představuje dokonalé spojení vysoké kvality a dostupnosti v elegantním 39mm provedení se smaragdově zeleným ciferníkem.\n\nKaždý kus je pečlivě ručně sestaven a nabízí následující specifikace:";
      descEn = "This model is inspired by the iconic Day-Date design and powered by the prestigious Seiko NH35 automatic movement. It represents the perfect fusion of high quality and affordability in an elegant 39mm case with an emerald green dial.\n\nEach piece is carefully hand-assembled and offers the following specifications:";
    } else if (product.name === 'Seiko Mod Day-Date Blue Textured') {
      descCs = "Tento model je inspirován ikonickým designem hodinek Day-Date a osazen prestižním automatickým strojkem Seiko NH35. Představuje dokonalé spojení vysoké kvality a dostupnosti v elegantním 39mm provedení s texturovaným modrým ciferníkem.\n\nKaždý kus je pečlivě ručně sestaven a nabízí následující specifikace:";
      descEn = "This model is inspired by the iconic Day-Date design and powered by the prestigious Seiko NH35 automatic movement. It represents the perfect fusion of high quality and affordability in an elegant 39mm case with a textured blue dial.\n\nEach piece is carefully hand-assembled and offers the following specifications:";
    } else if (product.name === 'Seiko Mod GMT Coke') {
      descCs = "Tento model je inspirován ikonickým designem hodinek GMT-Master a osazen prestižním automatickým strojkem Seiko NH34. Představuje dokonalé spojení vysoké kvality a dostupnosti ve sportovně-elegantním 40mm provedení s ikonickou červeno-černou lunetou (Coke).\n\nKaždý kus je pečlivě ručně sestaven a nabízí následující specifikace:";
      descEn = "This model is inspired by the iconic GMT-Master design and powered by the prestigious Seiko NH34 automatic movement. It represents the perfect fusion of high quality and affordability in a sporty-elegant 40mm case with the iconic red-and-black bezel (Coke).\n\nEach piece is carefully hand-assembled and offers the following specifications:";
    } else if (product.name === 'Seiko Mod GMT Sprite') {
      descCs = "Tento model je inspirován ikonickým designem hodinek GMT-Master a osazen prestižním automatickým strojkem Seiko NH34. Představuje dokonalé spojení vysoké kvality a dostupnosti ve sportovně-elegantním 40mm provedení s černo-zelenou lunetou (Sprite).\n\nKaždý kus je pečlivě ručně sestaven a nabízí následující specifikace:";
      descEn = "This model is inspired by the iconic GMT-Master design and powered by the prestigious Seiko NH34 automatic movement. It represents the perfect fusion of high quality and affordability in a sporty-elegant 40mm case with the black-and-green bezel (Sprite).\n\nEach piece is carefully hand-assembled and offers the following specifications:";
    } else if (product.name === 'Seiko Mod Nautilus Rosegold') {
      descCs = "Tento model je inspirován ikonickým designem Nautilus a osazen prestižním automatickým strojkem Seiko NH38. Představuje dokonalé spojení vysoké kvality a dostupnosti v luxusním 41mm provedení v barvě růžového zlata (Rosegold).\n\nKaždý kus je pečlivě ručně sestaven a nabízí následující specifikace:";
      descEn = "This model is inspired by the iconic Nautilus design and powered by the prestigious Seiko NH38 automatic movement. It represents the perfect fusion of high quality and affordability in a luxurious 41mm rose gold case.\n\nEach piece is carefully hand-assembled and offers the following specifications:";
    }

    if (descCs && descEn) {
      await prisma.product.update({
        where: { id: product.id },
        data: {
          description: descCs,
          descriptionEn: descEn
        }
      });
      console.log(`Updated ${product.name}`);
    }
  }

  console.log("All products updated!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
