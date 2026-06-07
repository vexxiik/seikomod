import { Button } from "@/components/ui/button";
import { Shield, Truck, RotateCcw, ShoppingCart, Check } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { AddToCartButton } from "@/components/store/product/AddToCartButton";
import { ProductFaq } from "@/components/store/product/ProductFaq";

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

  const getSpecs = (name: string, locale: string) => {
    const isEn = locale === 'en';
    const n = name.toLowerCase();
    
    if (n.includes('nautilus')) {
      return [
        { label: isEn ? 'Case Diameter' : 'Průměr pouzdra', value: isEn ? '41 mm (without crown)' : '41 mm (bez korunky)' },
        { label: isEn ? 'Movement' : 'Strojek', value: 'Automatic Seiko NH38' },
        { label: isEn ? 'Thickness' : 'Tloušťka', value: '12 mm' },
        { label: isEn ? 'Glass' : 'Sklo', value: isEn ? 'Sapphire, scratch-resistant' : 'Safírové, odolné proti poškrábání' },
        { label: isEn ? 'Case' : 'Pouzdro', value: isEn ? '904L Stainless Steel' : 'Nerezová ocel 904L' },
        { label: isEn ? 'Crown' : 'Korunka', value: isEn ? 'Screw-down' : 'Šroubovací' },
        { label: isEn ? 'Wrist Circumference' : 'Obvod zápěstí', value: isEn ? '14.5 cm to 22 cm (adjustable)' : '14,5 cm až 22 cm (nastavitelný)' },
        { label: isEn ? 'Bracelet' : 'Náramek', value: isEn ? '904L Stainless Steel with butterfly clasp' : 'Nerezová ocel 904L s bezpečnostním motýlkovým zapínáním' },
        { label: isEn ? 'Case Back' : 'Zadní víčko', value: isEn ? 'Transparent, visible movement' : 'Průhledné, viditelný strojek' },
        { label: isEn ? 'Water Resistance' : 'Voděodolnost', value: '3 ATM' }
      ];
    } else if (n.includes('gmt')) {
      return [
        { label: isEn ? 'Case Diameter' : 'Průměr pouzdra', value: isEn ? '40 mm (without crown)' : '40 mm (bez korunky)' },
        { label: isEn ? 'Movement' : 'Strojek', value: 'Automatic Seiko NH34 (GMT)' },
        { label: isEn ? 'Thickness' : 'Tloušťka', value: '12 mm' },
        { label: isEn ? 'Glass' : 'Sklo', value: isEn ? 'Sapphire, scratch-resistant, with AR coating' : 'Safírové, odolné proti poškrábání, s antireflexní úpravou' },
        { label: isEn ? 'Case' : 'Pouzdro', value: isEn ? '904L Stainless Steel' : 'Nerezová ocel 904L' },
        { label: isEn ? 'Crown' : 'Korunka', value: isEn ? 'Screw-down' : 'Šroubovací' },
        { label: isEn ? 'Wrist Circumference' : 'Obvod zápěstí', value: isEn ? '14.5 cm to 22 cm (adjustable)' : '14,5 cm až 22 cm (nastavitelný)' },
        { label: isEn ? 'Bracelet' : 'Náramek', value: isEn ? '904L Stainless Steel (with safety clasp)' : 'Nerezová ocel 904L (s bezpečnostní sponou)' },
        { label: isEn ? 'Case Back' : 'Zadní víčko', value: isEn ? 'Transparent, visible movement' : 'Průhledné, viditelný strojek' },
        { label: isEn ? 'Water Resistance' : 'Voděodolnost', value: '3 ATM' }
      ];
    } else if (n.includes('datejust')) {
      return [
        { label: isEn ? 'Case Diameter' : 'Průměr pouzdra', value: isEn ? '36 mm (without crown)' : '36 mm (bez korunky)' },
        { label: isEn ? 'Movement' : 'Strojek', value: 'Automatic Seiko NH35' },
        { label: isEn ? 'Thickness' : 'Tloušťka', value: '12 mm' },
        { label: isEn ? 'Glass' : 'Sklo', value: isEn ? 'Sapphire, scratch-resistant, with AR coating' : 'Safírové, odolné proti poškrábání, s antireflexní úpravou' },
        { label: isEn ? 'Case' : 'Pouzdro', value: isEn ? '904L Stainless Steel' : 'Nerezová ocel 904L' },
        { label: isEn ? 'Crown' : 'Korunka', value: isEn ? 'Screw-down' : 'Šroubovací' },
        { label: isEn ? 'Wrist Circumference' : 'Obvod zápěstí', value: isEn ? '14.5 cm to 22 cm (adjustable)' : '14,5 cm až 22 cm (nastavitelný)' },
        { label: isEn ? 'Bracelet' : 'Náramek', value: isEn ? '904L Stainless Steel (with safety clasp)' : 'Nerezová ocel 904L (s bezpečnostní sponou)' },
        { label: isEn ? 'Case Back' : 'Zadní víčko', value: isEn ? 'Transparent, visible movement' : 'Průhledné, viditelný strojek' },
        { label: isEn ? 'Water Resistance' : 'Voděodolnost', value: '3 ATM' }
      ];
    } else { // DayDate a další default
      return [
        { label: isEn ? 'Case Diameter' : 'Průměr pouzdra', value: isEn ? '39 mm (without crown)' : '39 mm (bez korunky)' },
        { label: isEn ? 'Movement' : 'Strojek', value: 'Automatic Seiko NH35' },
        { label: isEn ? 'Thickness' : 'Tloušťka', value: '12 mm' },
        { label: isEn ? 'Glass' : 'Sklo', value: isEn ? 'Sapphire, scratch-resistant, with AR coating' : 'Safírové, odolné proti poškrábání, s antireflexní úpravou' },
        { label: isEn ? 'Case' : 'Pouzdro', value: isEn ? '904L Stainless Steel' : 'Nerezová ocel 904L' },
        { label: isEn ? 'Crown' : 'Korunka', value: isEn ? 'Screw-down' : 'Šroubovací' },
        { label: isEn ? 'Wrist Circumference' : 'Obvod zápěstí', value: isEn ? '14.5 cm to 22 cm (adjustable)' : '14,5 cm až 22 cm (nastavitelný)' },
        { label: isEn ? 'Bracelet' : 'Náramek', value: isEn ? '904L Stainless Steel (with safety clasp)' : 'Nerezová ocel 904L (s bezpečnostní sponou)' },
        { label: isEn ? 'Case Back' : 'Zadní víčko', value: isEn ? 'Transparent, visible movement' : 'Průhledné, viditelný strojek' },
        { label: isEn ? 'Water Resistance' : 'Voděodolnost', value: '3 ATM' }
      ];
    }
  };

  const product = {
    id: dbProduct.id,
    name: locale === 'en' && dbProduct.nameEn ? dbProduct.nameEn : dbProduct.name,
    price: dbProduct.price,
    type: dbProduct.type || t('noCategory'),
    description: locale === 'en' && dbProduct.descriptionEn ? dbProduct.descriptionEn : dbProduct.description,
    specs: getSpecs(dbProduct.name, locale),
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
              {product.specs.map((spec, i) => (
                <div key={i} className="flex flex-col border-b border-border/50 pb-2">
                  <span className="text-muted-foreground mb-1">{spec.label}</span>
                  <span className="font-medium text-foreground">{spec.value}</span>
                </div>
              ))}
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

          {/* FAQ Section */}
          <ProductFaq />

        </div>
      </div>
    </div>
  );
}
