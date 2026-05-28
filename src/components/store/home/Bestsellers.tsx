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
    price: "Individuální",
    type: "Zakázka",
    image: "/img/watchmaker.png",
    link: "/custom"
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
            <Button variant="outline" className="rounded-full px-6">
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
              <Card className="relative overflow-hidden group border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-2xl bg-card h-full flex flex-col">
                <Link href={product.link} className="absolute inset-0 z-10">
                  <span className="sr-only">Zobrazit detail {product.name}</span>
                </Link>
                
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-background/80 backdrop-blur-md px-3 py-1 text-xs font-semibold rounded-full border border-border">
                      {product.type}
                    </span>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="bg-background text-foreground px-6 py-3 rounded-full text-sm font-medium shadow-lg translate-y-4 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                      {product.id === "custom" ? "Zjistit více" : "Zobrazit detail"}
                    </span>
                  </div>
                </div>
                
                <CardContent className="p-8 pb-4 flex-grow">
                  <h3 className="font-heading font-bold text-2xl mb-2">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {product.id === "custom" ? "Dle vašich představ" : "Seiko NH35 Automatic"}
                  </p>
                </CardContent>
                <CardFooter className="p-8 pt-0 flex justify-between items-center relative z-20">
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
