"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { ShoppingCart, Filter } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

// Získáme produkty jako props ze serverové komponenty
export default function ProductsClient({ initialProducts = [] }: { initialProducts: any[] }) {
  const t = useTranslations('Products');
  const locale = useLocale();

  const translateSpec = (text: string | null) => {
    if (!text || locale !== 'en') return text;
    return text
      .replace('Ocel', 'Steel')
      .replace('Safírové s kyklopem', 'Sapphire with Cyclops')
      .replace('Safírové', 'Sapphire');
  };

const CATEGORIES = [t('all'), "Daydate", "GMT", "Nautilus"];

  const [activeCategory, setActiveCategory] = useState(t('all'));

  // Formátování produktů pro zobrazení
  const formattedProducts = initialProducts.map(p => {
    let imageStr = "/img/placeholder.png";
    try {
      const parsed = JSON.parse(p.images);
      if (Array.isArray(parsed) && parsed.length > 0) imageStr = parsed[0];
    } catch (e) {}
    return { 
      ...p, 
      name: locale === 'en' && p.nameEn ? p.nameEn : p.name,
      movement: translateSpec(p.movement),
      image: imageStr 
    };
  });

  const filteredProducts = activeCategory === t('all')
    ? formattedProducts 
    : formattedProducts.filter(p => {
        if (activeCategory === "Daydate") return p.type === "Dress" || p.type === "Daydate";
        return p.type === activeCategory;
      });

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
        <p className="text-muted-foreground text-lg">
          {t('description')}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        <div className="flex items-center gap-2 mr-4 text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">{t('filter')}</span>
        </div>
        {CATEGORIES.map(category => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            className={`rounded-full ${activeCategory === category ? "bg-primary text-primary-foreground" : ""}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        layout
      >
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden group border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-2xl bg-card">
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-background/80 backdrop-blur-md px-3 py-1 text-xs font-semibold rounded-full border border-border">
                      {product.type === "Dress" ? "Daydate" : product.type}
                    </span>
                  </div>
                  
                  <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <Link href={`/products/${product.id}`}>
                      <Button className="bg-background text-foreground hover:bg-accent hover:text-accent-foreground translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        {t('viewDetail')}
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-heading font-bold text-xl mb-2">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{product.movement}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex justify-between items-center">
                  <span className="font-bold text-lg">{product.price.toLocaleString("cs-CZ")} Kč</span>
                  <Button size="icon" variant="ghost" className="rounded-full hover:bg-accent hover:text-accent-foreground">
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          {t('noProducts')}
        </div>
      )}
    </div>
  );
}
