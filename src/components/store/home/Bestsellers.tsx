"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/store/useCart";
import { useRouter } from "@/i18n/routing";
import { Product } from "@prisma/client";
import { useTranslations, useLocale } from "next-intl";

interface BestsellersProps {
  initialProducts: Product[];
}

export function Bestsellers({ initialProducts = [] }: BestsellersProps) {
  const { addItem } = useCart();
  const router = useRouter();
  const t = useTranslations('Bestsellers');
  const locale = useLocale();

  const displayProducts = [
    ...initialProducts.map(p => {
      let imageStr = "/img/placeholder.png";
      try {
        const parsed = JSON.parse(p.images);
        if (Array.isArray(parsed) && parsed.length > 0) imageStr = parsed[0];
      } catch (e) {}

      return {
        id: p.id,
        name: locale === 'en' && p.nameEn ? p.nameEn : p.name,
        price: p.price,
        type: p.type,
        movement: p.movement,
        image: imageStr,
        link: `/products/${p.id}`
      };
    }),
    {
      id: "custom",
      name: t('customName'),
      price: t('customPrice'),
      type: t('customType'),
      movement: t('customMovement'),
      image: "/img/watchmaker.png",
      link: "/configurator"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-heading text-4xl font-bold mb-4 text-foreground">{t('title')}</h2>
            <p className="text-muted-foreground text-lg">
              {t('description')}
            </p>
          </div>
          <Link href="/products">
            <Button variant="outline" className="rounded-full px-6 border-primary/20 hover:border-accent hover:text-accent">
              {t('viewAll')}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden group border border-border/50 shadow-sm hover:shadow-2xl hover:border-accent/30 transition-all duration-500 rounded-2xl bg-card h-full flex flex-col">
                <Link href={product.link} className="absolute inset-0 z-10">
                  <span className="sr-only">Zobrazit detail {product.name}</span>
                </Link>
                
                <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-muted/50 to-muted/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out p-4"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-background px-3 py-1.5 text-[11px] font-bold tracking-widest uppercase rounded-full border border-border text-foreground shadow-sm">
                      {product.type}
                    </span>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-background text-foreground px-6 py-3 rounded-full text-sm font-semibold shadow-2xl translate-y-4 group-hover:translate-y-0 transition-all duration-300 pointer-events-none border border-white/10">
                      {product.id === "custom" ? t('getPrice') : t('viewDetail')}
                    </span>
                  </div>
                </div>
                
                <CardContent className="p-8 pb-4 flex-grow">
                  <h3 className="font-heading font-bold text-2xl mb-2 group-hover:text-accent transition-colors">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {product.movement}
                  </p>
                </CardContent>
                <CardFooter className={`p-8 pt-0 flex items-center relative z-20 ${product.id === "custom" ? "justify-center w-full" : "justify-between"}`}>
                  <span className="font-bold text-xl">
                    {typeof product.price === "number" ? `${product.price.toLocaleString("cs-CZ")} Kč` : product.price}
                  </span>
                  {product.id !== "custom" && (
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="rounded-full hover:bg-accent hover:text-accent-foreground h-10 w-10 relative z-30"
                      onClick={(e) => {
                        e.preventDefault();
                        addItem({
                          id: product.id,
                          name: product.name,
                          price: product.price as number,
                          image: product.image,
                          quantity: 1
                        });
                        router.push("/cart");
                      }}
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
