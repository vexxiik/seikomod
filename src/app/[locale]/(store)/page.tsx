import { Hero } from "@/components/store/home/Hero";
import { Bestsellers } from "@/components/store/home/Bestsellers";
import { PrecisionSection } from "@/components/store/home/PrecisionSection";
import { WatchCraftingSection } from "@/components/store/home/WatchCraftingSection";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const targetNames = [
    "Seiko Mod GMT Pepsi",
    "Seiko Mod Datejust Black",
    "Seiko Mod GMT Batman"
  ];
  
  const rawProducts = await prisma.product.findMany({
    where: {
      name: {
        in: targetNames
      }
    }
  });

  const products = targetNames
    .map(name => rawProducts.find(p => p.name === name))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Bestsellers initialProducts={products} />
      <WatchCraftingSection />
      <PrecisionSection />
    </div>
  );
}
