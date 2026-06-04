"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/store/useCart";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const router = useRouter();
  const t = useTranslations('Common');

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    // Optional: Redirect to cart or show a toast
    router.push("/cart");
  };

  return (
    <Button 
      size="lg" 
      onClick={handleAddToCart}
      className="w-full h-14 text-lg bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl shadow-lg shadow-accent/20 transition-transform hover:-translate-y-1"
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      {t('addToCart')}
    </Button>
  );
}
