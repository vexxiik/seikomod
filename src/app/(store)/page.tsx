import { Hero } from "@/components/store/home/Hero";
import { Bestsellers } from "@/components/store/home/Bestsellers";
import { PrecisionSection } from "@/components/store/home/PrecisionSection";
import { WatchCraftingSection } from "@/components/store/home/WatchCraftingSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Bestsellers />
      <WatchCraftingSection />
      <PrecisionSection />
    </div>
  );
}
