"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/store/useCart";
import { useRouter } from "next/navigation";

const DUMMY_PRODUCTS = [
  {
    id: "2",
    name: "Daydate Blue Textured",
    price: 5499,
    type: "Dress",
    image: "/img/daydate_blue_tex.png",
    link: "/products/2"
  },
  {
    id: "3",
    name: "Daydate Green",
    price: 5499,
    type: "Dress",
    image: "/img/daydate_green.png",
    link: "/products/3"
  },
  {
    id: "4",
    name: "GMT Coke",
    price: 5499,
    type: "GMT",
    image: "/img/gmt_coke.png",
    link: "/products/4"
  },
  {
    id: "custom",
    name: "Hodinky na míru",
    price: "Konfigurátor",
    type: "Zakázka",
    image: "/img/watchmaker.png",
    link: "/configurator"
  }
];

export function Bestsellers() {
  const { addItem } = useCart();
  const router = useRouter();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-heading text-4xl font-bold mb-4 text-foreground">Nejžádanější modely</h2>
            <p className="text-muted-foreground text-lg">
              Výběr toho nejlepšího z naší dílny. Hodinky, které si naši zákazníci oblíbili nejvíce.
            </p>
          </div>
          <Link href="/products">
            <Button variant="outline" className="rounded-full px-6 border-primary/20 hover:border-accent hover:text-accent">
              Zobrazit vše
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DUMMY_PRODUCTS.map((product, index) => (
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
                      {product.id === "custom" ? "Otevřít konfigurátor" : "Zobrazit detail"}
                    </span>
                  </div>
                </div>
                
                <CardContent className="p-8 pb-4 flex-grow">
                  <h3 className="font-heading font-bold text-2xl mb-2 group-hover:text-accent transition-colors">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {product.id === "custom" ? "Dle vašich představ" : "Seiko NH35 Automatic"}
                  </p>
                </CardContent>
                <CardFooter className={`p-8 pt-0 flex items-center relative z-20 ${product.id === "custom" ? "justify-center w-full" : "justify-between"}`}>
                  {product.id === "custom" ? (
                    <div className="w-full">
                      <span className="block w-full text-center font-bold text-sm uppercase tracking-widest text-accent border border-accent/20 bg-accent/5 px-4 py-3 rounded-xl shadow-sm group-hover:bg-accent/10 group-hover:border-accent/30 transition-all">
                        {product.price}
                      </span>
                    </div>
                  ) : (
                    <span className="font-bold text-xl">
                      {typeof product.price === "number" ? `${product.price.toLocaleString("cs-CZ")} Kč` : product.price}
                    </span>
                  )}
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
