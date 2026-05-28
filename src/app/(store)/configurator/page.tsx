"use client";

import { useEffect, useState } from "react";
import { useConfigurator } from "@/store/useConfigurator";
import { configuratorData } from "@/lib/configuratorData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useCart } from "@/store/useCart";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function ConfiguratorPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { addItem } = useCart();
  
  const { 
    selections, 
    currentStepIndex, 
    setCurrentStepIndex, 
    nextStep, 
    prevStep, 
    setSelection,
    getTotalPrice
  } = useConfigurator();

  const currentCategory = configuratorData[currentStepIndex];

  // State for the dev calibration panel
  const [devMode, setDevMode] = useState(false);
  const [calibration, setCalibration] = useState({ scale: 1, x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Toggle dev mode with 'Shift+D' key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'D' && e.shiftKey) setDevMode(prev => !prev);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update calibration when step changes to reset sliders
  useEffect(() => {
    const currentPart = selections[currentCategory.category];
    if (currentPart?.style) {
      setCalibration(currentPart.style);
    } else {
      // Default guesses based on category to start somewhere
      let defScale = 1;
      if (currentCategory.category === 'dial' || currentCategory.category === 'hands') defScale = 0.55;
      if (currentCategory.category === 'bracelet') defScale = 0.95;
      setCalibration({ scale: defScale, x: 0, y: 0 });
    }
  }, [currentStepIndex, selections, currentCategory.category]);

  if (!mounted) return <div className="min-h-screen flex items-center justify-center">Načítám konfigurátor...</div>;

  // Create an array of selected images in a specific Z-index order for realistic rendering
  // Typical order (back to front): Bracelet -> Case -> Dial -> Hands
  const renderOrder = ["bracelet", "case", "dial", "hands"] as const;

  // Base style for layers. We will now rely on individual part styles for perfect calibration.
  const getLayerStyle = (category: string) => {
    return {
      mixBlendMode: "darken" as any,
      zIndex: renderOrder.indexOf(category as any),
      transformOrigin: "center center",
      position: "absolute" as any,
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    };
  };

  const handleAddToCart = () => {
    // Generate a description based on selections
    const partsDescription = renderOrder
      .map(cat => selections[cat]?.name)
      .filter(Boolean)
      .join(", ");

    // Add as a custom product to the cart
    addItem({
      id: `custom-watch-${Date.now()}`,
      name: `Custom Seiko: ${partsDescription}`,
      price: getTotalPrice(),
      image: selections.case?.image || "/img/placeholder.png", // Use the case image as a fallback thumbnail
      quantity: 1,
    });

    router.push("/cart");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-8 text-center md:text-left">
          Sestavte si vlastní hodinky
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: LIVE PREVIEW */}
          <div className="w-full lg:w-1/2 sticky top-24 z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-slate-100 rounded-2xl p-4 lg:p-8 flex items-center justify-center border shadow-sm">
            {/* Added scale-90 to shrink the entire assembly by 10% so it fits in the box without changing relative offsets */}
            <div className="relative w-full max-w-[400px] aspect-square drop-shadow-[0_20px_25px_rgba(0,0,0,0.15)] scale-90">
              {/* Render layers */}
              {renderOrder.map((category) => {
                const selectedPart = selections[category];
                if (!selectedPart) return null;

                // If this is the currently active category in the stepper and devMode is on, apply the live calibration
                const isCalibratingThis = devMode && category === currentCategory.category;
                const appliedStyle = selectedPart.style || { scale: 1, x: 0, y: 0 };
                
                // Fallback scales if not defined in data, so it's not huge
                let defaultFallbackScale = 1;
                if (!selectedPart.style) {
                  if (category === 'dial' || category === 'hands') defaultFallbackScale = 0.55;
                  if (category === 'bracelet') defaultFallbackScale = 0.95;
                }
                
                const finalScale = isCalibratingThis ? calibration.scale : (selectedPart.style?.scale ?? defaultFallbackScale);
                const finalX = isCalibratingThis ? calibration.x : (selectedPart.style?.x ?? 0);
                const finalY = isCalibratingThis ? calibration.y : (selectedPart.style?.y ?? 0);
                
                return (
                  <div 
                    key={category} 
                    className="absolute inset-0"
                    style={{
                      ...getLayerStyle(category),
                      transform: `scale(${finalScale}) translate(${finalX}%, ${finalY}%)`,
                      transition: isCalibratingThis ? 'none' : 'transform 0.3s ease',
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={selectedPart.id}
                        src={selectedPart.image}
                        alt={selectedPart.name}
                        initial={{ opacity: 0, filter: "blur(4px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, filter: "blur(4px)" }}
                        transition={{ duration: 0.3 }}
                        className={`w-full h-full object-contain absolute inset-0 ${category !== 'case' ? 'drop-shadow-lg' : ''}`}
                      />
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: CONTROL PANEL */}
          <div className="w-full lg:w-1/2 space-y-8">
            
            {/* STEPPER HEADER */}
            <div className="flex items-center justify-between bg-card p-4 rounded-xl border shadow-sm">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={prevStep} 
                disabled={currentStepIndex === 0}
                className="hover:bg-accent/10"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              <div className="text-center flex-1">
                <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mb-1">
                  Krok {currentStepIndex + 1} / {configuratorData.length}
                </p>
                <h2 className="text-2xl font-heading font-bold text-primary">
                  {currentCategory.title}
                </h2>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={nextStep} 
                disabled={currentStepIndex === configuratorData.length - 1}
                className="hover:bg-accent/10"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            {/* OPTIONS GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {currentCategory.options.map((option) => {
                const isSelected = selections[currentCategory.category]?.id === option.id;
                
                return (
                  <Card 
                    key={option.id}
                    className={`cursor-pointer transition-all duration-300 overflow-hidden group border-2 ${
                      isSelected 
                        ? "border-yellow-400 bg-yellow-400/5 shadow-md" 
                        : "border-transparent hover:border-primary/20 hover:bg-muted/50"
                    }`}
                    onClick={() => setSelection(currentCategory.category, option)}
                  >
                    <CardContent className="p-5 flex flex-col h-full relative">
                      <div className="aspect-square bg-white rounded-lg mb-4 relative overflow-hidden mix-blend-multiply">
                        <img
                          src={option.thumbnail}
                          alt={option.name}
                          className={`w-full h-full object-contain p-2 transition-transform duration-500 ${
                            isSelected ? "scale-105" : "group-hover:scale-110"
                          }`}
                        />
                      </div>
                      <div className="mt-auto">
                        <h3 className="font-bold text-base line-clamp-2 leading-tight mb-1 text-primary">{option.name}</h3>
                        <p className="text-sm font-black text-muted-foreground">
                          {option.price > 0 ? `+ ${option.price.toLocaleString("cs-CZ")} Kč` : "V ceně"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* CHECKOUT ACTION */}
            <div className="mt-12 bg-card p-6 md:p-8 rounded-2xl border-2 border-primary/10 shadow-xl sticky bottom-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mb-1">
                    Celková cena
                  </p>
                  <p className="text-3xl font-heading font-bold text-primary">
                    {getTotalPrice().toLocaleString("cs-CZ")} Kč
                  </p>
                </div>
                
                <Button 
                  size="lg" 
                  className="w-full md:w-auto h-14 px-10 bg-accent text-primary hover:bg-accent/90 text-lg font-black shadow-xl shadow-accent/20 transition-all hover:scale-105"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-6 w-6" strokeWidth={2.5} />
                  Přidat do košíku
                </Button>
              </div>
            </div>

          </div>
        </div>

        {/* DEV CALIBRATION PANEL */}
        {devMode && (
          <div className="fixed bottom-0 left-0 right-0 bg-black/90 text-white p-6 z-50 flex flex-col items-center gap-4 border-t border-white/20 backdrop-blur-md">
            <h3 className="font-bold text-yellow-400">🛠️ Kalibrační režim (Aktivní pro: {currentCategory.title} - {selections[currentCategory.category]?.name})</h3>
            <div className="flex gap-8 w-full max-w-3xl">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-xs text-gray-400">Scale: {calibration.scale.toFixed(2)}</label>
                <input type="range" min="0.2" max="1.5" step="0.01" value={calibration.scale} onChange={(e) => setCalibration(c => ({...c, scale: parseFloat(e.target.value)}))} />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-xs text-gray-400">X Offset (%): {calibration.x.toFixed(1)}</label>
                <input type="range" min="-50" max="50" step="0.5" value={calibration.x} onChange={(e) => setCalibration(c => ({...c, x: parseFloat(e.target.value)}))} />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-xs text-gray-400">Y Offset (%): {calibration.y.toFixed(1)}</label>
                <input type="range" min="-50" max="50" step="0.5" value={calibration.y} onChange={(e) => setCalibration(c => ({...c, y: parseFloat(e.target.value)}))} />
              </div>
            </div>
            <div className="bg-gray-800 p-3 rounded text-sm font-mono text-green-400 w-full max-w-3xl text-center select-all cursor-pointer">
              {`style: { scale: ${calibration.scale.toFixed(2)}, x: ${calibration.x.toFixed(1)}, y: ${calibration.y.toFixed(1)} }`}
            </div>
            <p className="text-xs text-gray-500">Zkopírujte tento kód a vložte jej do `configuratorData.ts` k příslušnému dílu. Zavřít = Shift+D</p>
          </div>
        )}
      </div>
    </div>
  );
}
