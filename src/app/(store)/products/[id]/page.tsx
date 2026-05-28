import { Button } from "@/components/ui/button";
import { Shield, Truck, RotateCcw, ShoppingCart, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/store/product/AddToCartButton";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Await the params object before accessing its properties in Next.js 15
  const { id } = await params;
  
  const productData: Record<string, any> = {
    "1": { name: "Daydate Blue", type: "Dress", image: "/img/daydate_blue.png", movement: "Seiko NH35 Automatic" },
    "2": { name: "Daydate Blue Textured", type: "Dress", image: "/img/daydate_blue_tex.png", movement: "Seiko NH35 Automatic" },
    "3": { name: "Daydate Green", type: "Dress", image: "/img/daydate_green.png", movement: "Seiko NH35 Automatic" },
    "4": { name: "GMT Coke", type: "GMT", image: "/img/gmt_coke.png", movement: "Seiko NH34 GMT" }
  };
  
  const baseProduct = productData[id] || productData["1"];

  const product = {
    id,
    name: baseProduct.name,
    price: 5499,
    type: baseProduct.type,
    description: "Tento exkluzivní kousek kombinuje prvotřídní design s neuvěřitelnou spolehlivostí japonských strojků. Ideální volbou pro ty, kteří preferují luxus a osobitý styl. Každý detail je pečlivě sladěn pro dokonalý vizuální zážitek.",
    specs: {
      movement: baseProduct.movement,
      glass: "Safírové s vnitřním AR",
      bracelet: "Oyster / President, nerezová ocel 316L",
      waterResistance: "10 ATM / 100m",
      caseSize: "40mm"
    },
    image: baseProduct.image,
    inStock: true
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        
        {/* Left Column: Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={product.image} 
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {/* Thumbnails placeholder */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-square rounded-xl bg-muted overflow-hidden border-2 border-transparent hover:border-primary cursor-pointer transition-colors">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={product.image} 
                  alt={`${product.name} thumbnail ${i}`}
                  className="object-cover w-full h-full opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Product Info */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="text-primary font-semibold tracking-wider text-sm uppercase">
              {product.type}
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>
          
          <div className="text-3xl font-bold text-accent-foreground mb-6">
            {product.price.toLocaleString("cs-CZ")} Kč
          </div>
          
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Action Area */}
          <div className="space-y-4 mb-10 pb-10 border-b">
            <div className="flex items-center gap-2 text-sm text-green-600 font-medium mb-4">
              <Check className="h-5 w-5" />
              {product.inStock ? "Skladem, připraveno k odeslání" : "Na objednávku"}
            </div>
            
            <AddToCartButton product={{
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image
            }} />
          </div>

          {/* Specifications */}
          <div className="space-y-6 mb-10">
            <h3 className="font-heading text-2xl font-bold">Technické parametry</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
              <div className="flex flex-col border-b pb-2">
                <span className="text-muted-foreground mb-1">Strojek</span>
                <span className="font-medium">{product.specs.movement}</span>
              </div>
              <div className="flex flex-col border-b pb-2">
                <span className="text-muted-foreground mb-1">Sklíčko</span>
                <span className="font-medium">{product.specs.glass}</span>
              </div>
              <div className="flex flex-col border-b pb-2">
                <span className="text-muted-foreground mb-1">Náramek</span>
                <span className="font-medium">{product.specs.bracelet}</span>
              </div>
              <div className="flex flex-col border-b pb-2">
                <span className="text-muted-foreground mb-1">Pouzdro</span>
                <span className="font-medium">{product.specs.caseSize}</span>
              </div>
              <div className="flex flex-col border-b pb-2">
                <span className="text-muted-foreground mb-1">Voděodolnost</span>
                <span className="font-medium">{product.specs.waterResistance}</span>
              </div>
            </div>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mt-auto">
            <div className="flex flex-col items-center p-4 bg-muted/50 rounded-xl">
              <Shield className="h-6 w-6 mb-2 text-primary" />
              <span className="text-xs font-medium">Záruka 2 roky</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted/50 rounded-xl">
              <Truck className="h-6 w-6 mb-2 text-primary" />
              <span className="text-xs font-medium">Doprava zdarma</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted/50 rounded-xl">
              <RotateCcw className="h-6 w-6 mb-2 text-primary" />
              <span className="text-xs font-medium">14 dní na vrácení</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
