"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Trash2, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/store/useCart";
import { submitOrder, validateDiscountCode } from "@/app/(store)/checkout/actions";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Checkbox } from "@/components/ui/checkbox";
import { Tag } from "lucide-react";

export default function CartPage() {
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [includeWatchBox, setIncludeWatchBox] = useState(false);
  
  // Discount state
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{code: string, discount: number, type: string} | null>(null);
  const [discountError, setDiscountError] = useState<string | null>(null);
  const [isCheckingDiscount, setIsCheckingDiscount] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();

  const { items, removeItem, clearCart } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 0; // Free shipping
  const watchBoxPrice = includeWatchBox ? (session ? 0 : 499) : 0;
  
  // Calculate discount
  let discountAmount = 0;
  let subtotalWithBox = subtotal + watchBoxPrice;
  if (appliedDiscount) {
    if (appliedDiscount.type === "PERCENTAGE") {
      discountAmount = subtotalWithBox * (appliedDiscount.discount / 100);
    } else {
      discountAmount = appliedDiscount.discount;
    }
  }
  
  const total = Math.max(0, subtotalWithBox + shipping - discountAmount);

  const handleApplyDiscount = async () => {
    if (!discountCode) return;
    setIsCheckingDiscount(true);
    setDiscountError(null);
    try {
      const res = await validateDiscountCode(discountCode);
      if (res.error) {
        setDiscountError(res.error);
        setAppliedDiscount(null);
      } else if (res.discount) {
        setAppliedDiscount({
          code: res.discount.code,
          discount: res.discount.discount,
          type: res.discount.type
        });
        setDiscountError(null);
      }
    } catch (e) {
      setDiscountError("Chyba při ověřování");
    } finally {
      setIsCheckingDiscount(false);
    }
  };

  const handleCheckoutSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    formData.append("includeWatchBox", includeWatchBox.toString());
    if (appliedDiscount) {
      formData.append("discountCode", appliedDiscount.code);
    }
    try {
      const result = await submitOrder(formData, items, total);
      if (result.success) {
        clearCart();
        router.push("/checkout/success");
      }
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        alert(e.message);
      } else {
        alert("Něco se pokazilo. Zkuste to prosím znovu.");
      }
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-20 min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground text-lg">Načítám košík...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 min-h-screen">
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-8">
        {step === "cart" ? "Váš košík" : "Dokončení objednávky"}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {step === "cart" ? (
            <Card className="border-none shadow-sm bg-card/50">
              <CardContent className="p-0">
                {items.length === 0 ? (
                  <div className="p-16 text-center text-muted-foreground text-lg">
                    Váš košík je zatím prázdný.
                  </div>
                ) : (
                  <div className="divide-y divide-border/50">
                    {items.map((item) => (
                      <div key={item.id} className="p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-8">
                        <div className="h-32 w-32 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <h3 className="font-heading font-semibold text-2xl">{item.name}</h3>
                          <p className="text-muted-foreground">Skladem</p>
                        </div>
                        <div className="flex items-center gap-8 mt-4 sm:mt-0">
                          <div className="font-bold text-2xl whitespace-nowrap">
                            {item.price.toLocaleString("cs-CZ")} Kč
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive h-12 w-12 rounded-full"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-6 w-6" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="border-none shadow-sm bg-card/50">
              <CardHeader className="p-8 md:p-10 pb-4">
                <CardTitle className="font-heading text-2xl">Doručovací údaje</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8 p-8 md:p-10 pt-0">
                <form id="checkout-form" action={handleCheckoutSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="firstName" className="text-sm uppercase tracking-wider text-muted-foreground">Jméno</Label>
                    <Input id="firstName" name="firstName" required placeholder="Jan" className="h-12 bg-background" />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="lastName" className="text-sm uppercase tracking-wider text-muted-foreground">Příjmení</Label>
                    <Input id="lastName" name="lastName" required placeholder="Novák" className="h-12 bg-background" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm uppercase tracking-wider text-muted-foreground">E-mail</Label>
                  <Input id="email" name="email" type="email" required placeholder="jan.novak@email.cz" className="h-12 bg-background" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="address" className="text-sm uppercase tracking-wider text-muted-foreground">Ulice a číslo popisné</Label>
                  <Input id="address" name="address" required placeholder="Václavské náměstí 1" className="h-12 bg-background" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="city" className="text-sm uppercase tracking-wider text-muted-foreground">Město</Label>
                    <Input id="city" name="city" required placeholder="Praha" className="h-12 bg-background" />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="zip" className="text-sm uppercase tracking-wider text-muted-foreground">PSČ</Label>
                    <Input id="zip" name="zip" required placeholder="110 00" className="h-12 bg-background" />
                  </div>
                </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-1">
          <Card className="border-none shadow-md sticky top-28 bg-primary/5">
            <CardHeader>
              <CardTitle>Shrnutí objednávky</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Mezisoučet</span>
                <span>{subtotal.toLocaleString("cs-CZ")} Kč</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Doprava</span>
                <span className="text-green-600 font-medium">Zdarma</span>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex items-start space-x-3 bg-background p-4 rounded-lg border border-border shadow-sm">
                  <Checkbox 
                    id="watchBox" 
                    checked={includeWatchBox} 
                    onCheckedChange={(c) => setIncludeWatchBox(c as boolean)} 
                    className="mt-1"
                  />
                  <div className="flex flex-col flex-1">
                    <Label htmlFor="watchBox" className="font-medium flex justify-between cursor-pointer">
                      <span>Prémiová krabička</span>
                      <span className={session ? "text-green-600 font-bold" : "font-semibold"}>
                        {session ? "Zdarma" : "499 Kč"}
                      </span>
                    </Label>
                    {!session && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Pro přihlášené zákazníky je krabička zdarma. <Link href="/login" className="text-primary hover:underline">Přihlaste se</Link>.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border space-y-3">
                <Label className="font-medium flex items-center gap-2">
                  <Tag className="h-4 w-4" /> Slevový kód
                </Label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Zadejte kód..." 
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    disabled={!!appliedDiscount || isCheckingDiscount}
                    className="bg-background uppercase"
                  />
                  {appliedDiscount ? (
                    <Button variant="outline" className="text-destructive border-destructive/20 hover:bg-destructive/10 hover:text-destructive" onClick={() => {
                      setAppliedDiscount(null);
                      setDiscountCode("");
                    }}>
                      Zrušit
                    </Button>
                  ) : (
                    <Button variant="secondary" onClick={handleApplyDiscount} disabled={!discountCode || isCheckingDiscount}>
                      {isCheckingDiscount ? "..." : "Použít"}
                    </Button>
                  )}
                </div>
                {discountError && <p className="text-destructive text-sm font-medium">{discountError}</p>}
                {appliedDiscount && (
                  <p className="text-green-600 text-sm font-medium flex justify-between">
                    <span>Sleva aplikována ({appliedDiscount.code})</span>
                    <span>-{discountAmount.toLocaleString("cs-CZ")} Kč</span>
                  </p>
                )}
              </div>

              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Celkem k úhradě</span>
                <span>{total.toLocaleString("cs-CZ")} Kč</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                <span>Bezpečný nákup se 14denní zárukou vrácení peněz</span>
              </div>
            </CardContent>
            <CardFooter>
              {step === "cart" ? (
                <Button 
                  className="w-full h-12 text-base bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={() => setStep("checkout")}
                  disabled={items.length === 0}
                >
                  Pokračovat k pokladně
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <div className="w-full space-y-3">
                  <Button 
                    form="checkout-form"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 text-base bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20"
                  >
                    {isSubmitting ? "Zpracovávám..." : "Dokončit a zaplatit"}
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full"
                    onClick={() => setStep("cart")}
                    disabled={isSubmitting}
                  >
                    Zpět do košíku
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>

      </div>
    </div>
  );
}
