import { Button } from "@/components/ui/button";
import { Shield, Truck, RotateCcw, ShoppingCart, Check } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { AddToCartButton } from "@/components/store/product/AddToCartButton";

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string, locale: string }> }) {
  const t = await getTranslations('ProductDetail');
  // Await the params object before accessing its properties in Next.js 15
  const { id, locale } = await params;
  
  const dbProduct = await prisma.product.findUnique({
    where: { id }
  });

  console.log("PARAMS:", await params);
  console.log("ID:", id);
  console.log("DB PRODUCT:", dbProduct);

  if (!dbProduct) {
    console.log("NOT FOUND CALLED!");
    notFound();
  }

  let imageUrl = "/img/watchmaker.png"; // Fallback image
  try {
    const parsedImages = JSON.parse(dbProduct.images as string);
    if (Array.isArray(parsedImages) && parsedImages.length > 0) {
      imageUrl = parsedImages[0];
    }
  } catch (e) {
    // Keep fallback
  }

  const translateSpec = (text: string | null) => {
    if (!text || locale !== 'en') return text;
    return text
      .replace('Ocel', 'Steel')
      .replace('Safírové s kyklopem', 'Sapphire with Cyclops')
      .replace('Safírové', 'Sapphire');
  };

  const product = {
    id: dbProduct.id,
    name: locale === 'en' && dbProduct.nameEn ? dbProduct.nameEn : dbProduct.name,
    price: dbProduct.price,
    type: dbProduct.type || t('noCategory'),
    description: locale === 'en' && dbProduct.descriptionEn ? dbProduct.descriptionEn : dbProduct.description,
    specs: {
      movement: translateSpec(dbProduct.movement) || t('notSpecified'),
      glass: translateSpec(dbProduct.glass) || t('notSpecified'),
      bracelet: translateSpec(dbProduct.bracelet) || t('notSpecified'),
      waterResistance: t('notSpecified'), // Not in DB schema currently
      caseSize: t('notSpecified') // Not in DB schema currently
    },
    image: imageUrl,
    inStock: dbProduct.stock > 0
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
        
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
              {product.inStock ? t('inStock') : t('onOrder')}
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
            <h3 className="font-heading text-2xl font-bold">{t('specs')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
              <div className="flex flex-col border-b pb-2">
                <span className="text-muted-foreground mb-1">{t('movement')}</span>
                <span className="font-medium">{product.specs.movement}</span>
              </div>
              <div className="flex flex-col border-b pb-2">
                <span className="text-muted-foreground mb-1">{t('glass')}</span>
                <span className="font-medium">{product.specs.glass}</span>
              </div>
              <div className="flex flex-col border-b pb-2">
                <span className="text-muted-foreground mb-1">{t('bracelet')}</span>
                <span className="font-medium">{product.specs.bracelet}</span>
              </div>
              <div className="flex flex-col border-b pb-2">
                <span className="text-muted-foreground mb-1">{t('case')}</span>
                <span className="font-medium">{product.specs.caseSize}</span>
              </div>
              <div className="flex flex-col border-b pb-2">
                <span className="text-muted-foreground mb-1">{t('waterResistance')}</span>
                <span className="font-medium">{product.specs.waterResistance}</span>
              </div>
            </div>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mt-auto">
            <div className="flex flex-col items-center p-4 bg-muted/50 rounded-xl">
              <Shield className="h-6 w-6 mb-2 text-primary" />
              <span className="text-xs font-medium">{t('warranty')}</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted/50 rounded-xl">
              <Truck className="h-6 w-6 mb-2 text-primary" />
              <span className="text-xs font-medium">{t('shipping')}</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted/50 rounded-xl">
              <RotateCcw className="h-6 w-6 mb-2 text-primary" />
              <span className="text-xs font-medium">{t('returns')}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
