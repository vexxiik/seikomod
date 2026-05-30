import { Hero } from "@/components/store/home/Hero";
import { Bestsellers } from "@/components/store/home/Bestsellers";
import { PrecisionSection } from "@/components/store/home/PrecisionSection";
import { WatchCraftingSection } from "@/components/store/home/WatchCraftingSection";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' }
  });
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Bestsellers initialProducts={products} />
      <WatchCraftingSection />
      <PrecisionSection />
    </div>
  );
}
