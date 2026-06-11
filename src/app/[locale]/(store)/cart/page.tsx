"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Trash2, ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useCart } from "@/store/useCart";
import { submitOrder, validateDiscountCode } from "../checkout/actions";
import { useRouter } from "@/i18n/routing";
import { useSession } from "next-auth/react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tag, MapPin, Truck } from "lucide-react";
import Script from "next/script";
import { useTranslations } from "next-intl";

export default function CartPage() {
  const t = useTranslations('Cart');
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Discount UI state
  const [discountError, setDiscountError] = useState<string | null>(null);
  const [isCheckingDiscount, setIsCheckingDiscount] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();

  const { 
    items, removeItem, clearCart,
    includeWatchBox, setIncludeWatchBox,
    packetaBranch, setPacketaBranch,
    discountCode, setDiscountCode,
    appliedDiscount, setAppliedDiscount
  } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 89; // Zásilkovna

  const watchBoxPrice = includeWatchBox ? (session ? 200 : 600) : 0;
  
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
  const total = step === "cart" 
    ? Math.max(0, subtotalWithBox - discountAmount) 
    : Math.max(0, subtotalWithBox + shipping - discountAmount);

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
      setDiscountError(t('errVerify'));
    } finally {
      setIsCheckingDiscount(false);
    }
  };

  const handleCheckoutSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    
    const data = {
      firstName: formData.get("firstName") as string || "",
      lastName: formData.get("lastName") as string || "",
      email: formData.get("email") as string || "",
      address: formData.get("address") as string || "",
      city: formData.get("city") as string || "",
      zip: formData.get("zip") as string || "",
      includeWatchBox,
      discountCode: appliedDiscount?.code,
      packetaBranchId: packetaBranch?.id || "",
      packetaBranchName: packetaBranch?.name || "",
    };

    try {
      const result = await submitOrder(data, items, total);
      if (result.error) {
        alert(result.error);
        setIsSubmitting(false);
        return;
      }
      if (result.success && result.url) {
        clearCart();
        window.location.href = result.url;
      } else if (result.success) {
        clearCart();
        router.push("/checkout/success");
      }
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        alert(e.message);
      } else {
        alert(t('errGeneric'));
      }
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-20 min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground text-lg">{t('loading')}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 min-h-screen">
      {/* Packeta Widget Script */}
      <Script src="https://widget.packeta.com/v6/www/js/library.js" strategy="lazyOnload" />

      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-8">
        {step === "cart" ? t('titleCart') : t('titleCheckout')}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {step === "cart" ? (
            <Card className="border-border/50 shadow-sm bg-card rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                {items.length === 0 ? (
                  <div className="p-16 text-center text-muted-foreground text-lg">
                    {t('emptyCart')}
                  </div>
                ) : (
                  <div className="divide-y divide-border/50">
                    {items.map((item) => (
                      <div key={item.id} className="p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-8 hover:bg-muted/20 transition-colors">
                        <div className="h-32 w-32 rounded-xl overflow-hidden bg-gradient-to-b from-muted/50 to-muted/20 flex-shrink-0 border border-border/50 p-2 shadow-inner">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <div className="flex-1 space-y-1 md:space-y-2">
                          <h3 className="font-heading font-semibold text-xl md:text-2xl tracking-tight">{item.name}</h3>
                          <p className="text-muted-foreground text-sm font-medium">{t('inStock')}</p>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 md:gap-8 mt-4 sm:mt-0">
                          <div className="font-bold text-xl md:text-2xl whitespace-nowrap">
                            {item.price.toLocaleString("cs-CZ")} Kč
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-destructive/70 hover:bg-destructive/10 hover:text-destructive h-10 w-10 md:h-12 md:w-12 rounded-full transition-colors"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-5 w-5 md:h-6 md:w-6" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border/50 shadow-sm bg-card rounded-2xl">
              <CardHeader className="p-6 md:p-8 pb-4">
                <CardTitle className="font-heading text-2xl tracking-tight">{t('deliveryData')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8 p-6 md:p-8 pt-0">
                <form id="checkout-form" onSubmit={(e) => {
                  e.preventDefault();
                  if (!agreeTerms) {
                    alert(t('errTerms'));
                    return;
                  }
                  if (!packetaBranch) {
                    alert(t('errSelectBranch'));
                    return;
                  }
                  handleCheckoutSubmit(new FormData(e.currentTarget));
                }} className="space-y-8">
                
                {/* Zásilkovna Selection */}
                <div className="bg-muted/30 p-6 rounded-xl border border-border/50 space-y-4">
                  <div className="flex items-center gap-3">
                    <Truck className="h-6 w-6 text-accent" />
                    <h3 className="font-heading text-xl font-bold">{t('deliveryMethod')}</h3>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-background p-4 rounded-lg border border-border shadow-sm">
                    <div className="space-y-1">
                      <div className="font-bold flex items-center gap-2">
                        {t('packetaTitle')}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        {packetaBranch ? (
                          <>
                            <MapPin className="h-4 w-4 text-green-500" />
                            <span className="text-foreground font-medium">{packetaBranch.name}</span>
                          </>
                        ) : (
                          t('noBranchSelected')
                        )}
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant={packetaBranch ? "outline" : "default"}
                      className={!packetaBranch ? "bg-accent text-accent-foreground hover:bg-accent/90" : ""}
                      onClick={() => {
                        if (typeof window !== "undefined" && (window as any).Packeta) {
                          (window as any).Packeta.Widget.pick(process.env.NEXT_PUBLIC_PACKETA_API_KEY || "87654321", (point: any) => {
                            if (point) {
                              setPacketaBranch({ id: point.id, name: point.name });
                            }
                          }, { country: "cz", language: "cs" });
                        } else {
                          alert(t('errLoadWidget'));
                        }
                      }}
                    >
                      {packetaBranch ? t('changeBranch') : t('selectBranch')}
                    </Button>
                  </div>
                  {!packetaBranch && <p className="text-sm text-destructive font-medium mt-2">{t('packetaRequired')}</p>}
                </div>
                

                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="firstName" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{t('firstName')}</Label>
                    <Input id="firstName" name="firstName" required placeholder="Jan" className="h-12 bg-background/50 border-border/50 focus:bg-background transition-colors" />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="lastName" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{t('lastName')}</Label>
                    <Input id="lastName" name="lastName" required placeholder="Novák" className="h-12 bg-background/50 border-border/50 focus:bg-background transition-colors" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{t('email')}</Label>
                  <Input id="email" name="email" type="email" required placeholder="jan.novak@email.cz" className="h-12 bg-background/50 border-border/50 focus:bg-background transition-colors" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="address" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{t('address')}</Label>
                  <Input id="address" name="address" required placeholder="Václavské náměstí 1" className="h-12 bg-background/50 border-border/50 focus:bg-background transition-colors" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="city" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{t('city')}</Label>
                    <Input id="city" name="city" required placeholder="Praha" className="h-12 bg-background/50 border-border/50 focus:bg-background transition-colors" />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="zip" className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{t('zip')}</Label>
                    <Input id="zip" name="zip" required placeholder="110 00" className="h-12 bg-background/50 border-border/50 focus:bg-background transition-colors" />
                  </div>
                </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-1">
          <Card className="border border-border/50 shadow-xl sticky top-28 bg-gradient-to-b from-card/80 to-card/40 rounded-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-primary to-accent opacity-50" />
            <CardHeader className="p-6 md:p-8 pb-4">
              <CardTitle className="font-heading text-xl tracking-tight">{t('summary')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6 md:p-8 pt-0">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t('subtotal')}</span>
                <span className="font-medium">{subtotal.toLocaleString("cs-CZ")} Kč</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t('shippingPacketa')}</span>
                <span className="font-medium">
                  {step === "cart" ? <span className="text-xs text-muted-foreground">{t('shippingCalcNextStep')}</span> : `${shipping} Kč`}
                </span>
              </div>
              


              <div className="pt-6 border-t border-border/50">
                <div className="flex items-start space-x-3 bg-background/40 p-4 rounded-xl border border-border/50 shadow-inner">
                  <Checkbox 
                    id="watchBox" 
                    checked={includeWatchBox} 
                    onCheckedChange={(c) => setIncludeWatchBox(c as boolean)} 
                    className="mt-1 border-primary/30 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                  />
                  <div className="flex flex-col flex-1">
                    <Label htmlFor="watchBox" className="font-medium flex justify-between cursor-pointer text-sm">
                      <span>{t('premiumBox')}</span>
                      <span className={session ? "text-green-600 font-bold" : "font-semibold"}>
                        {session ? "200 Kč" : "600 Kč"}
                      </span>
                    </Label>
                    {!session && (
                      <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                        {t('boxInfo')} <Link href="/login" className="text-accent hover:underline font-medium">{t('login')}</Link>.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border/50 space-y-3">
                <Label className="font-medium flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                  <Tag className="h-4 w-4" /> {t('discountCode')}
                </Label>
                <div className="flex gap-2">
                  <Input 
                    placeholder={t('enterCode')}
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    disabled={!!appliedDiscount || isCheckingDiscount}
                    className="bg-background/50 border-border/50 uppercase tracking-widest text-sm h-11"
                  />
                  {appliedDiscount ? (
                    <Button variant="outline" className="h-11 text-destructive border-destructive/20 hover:bg-destructive/10 hover:text-destructive" onClick={() => {
                      setAppliedDiscount(null);
                      setDiscountCode("");
                    }}>
                      {t('cancel')}
                    </Button>
                  ) : (
                    <Button variant="secondary" className="h-11 px-6 font-semibold" onClick={handleApplyDiscount} disabled={!discountCode || isCheckingDiscount}>
                      {isCheckingDiscount ? t('applying') : t('apply')}
                    </Button>
                  )}
                </div>
                {discountError && <p className="text-destructive text-sm font-medium">{discountError}</p>}
                {appliedDiscount && (
                  <p className="text-green-600 text-sm font-medium flex justify-between bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <span>{t('discountApplied')} ({appliedDiscount.code})</span>
                    <span>-{discountAmount.toLocaleString("cs-CZ")} Kč</span>
                  </p>
                )}
              </div>

              <Separator className="bg-border/50" />
              <div className="flex justify-between font-bold text-xl md:text-2xl tracking-tight">
                <span>{t('total')}</span>
                <span className="text-accent">{total.toLocaleString("cs-CZ")} Kč</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-6 bg-accent/5 p-3 rounded-lg border border-accent/10">
                <ShieldCheck className="h-5 w-5 text-accent" />
                <span>{t('safeShopping')}</span>
              </div>
            </CardContent>
            <CardFooter>
              {step === "cart" ? (
                <Button 
                  className="w-full h-12 text-base bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={() => setStep("checkout")}
                  disabled={items.length === 0}
                >
                  {t('continueToCheckout')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <div className="w-full space-y-4">
                  <div className="flex items-start space-x-3 bg-muted/20 p-4 rounded-lg border border-border/50">
                    <Checkbox 
                      id="agreeTerms" 
                      checked={agreeTerms} 
                      onCheckedChange={(c) => setAgreeTerms(c as boolean)} 
                      className="mt-1 flex-shrink-0"
                    />
                    <Label htmlFor="agreeTerms" className="text-sm leading-relaxed font-medium cursor-pointer block flex-1">
                      {t.rich('agreeTerms', {
                        terms: (chunks) => <Link href="/terms" target="_blank" className="underline hover:no-underline font-semibold">{chunks}</Link>,
                        privacy: (chunks) => <Link href="/privacy" target="_blank" className="underline hover:no-underline font-semibold">{chunks}</Link>
                      })}
                    </Label>
                  </div>

                  <Button 
                    form="checkout-form"
                    type="submit"
                    disabled={isSubmitting || !agreeTerms}
                    className="w-full h-12 text-base bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20"
                  >
                    {isSubmitting ? t('processing') : t('finishAndPay')}
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full"
                    onClick={() => setStep("cart")}
                    disabled={isSubmitting}
                  >
                    {t('backToCart')}
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
