"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { registerUser } from "../actions";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function RegisterPage() {
  const t = useTranslations('Auth');
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await registerUser(formData);

      if (result.error) {
        setError(result.error);
        setIsLoading(false);
      } else if (result.success) {
        // Automatically sign in after registration
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (res?.error) {
          setError(t('registerSuccessError'));
          setIsLoading(false);
        } else {
          router.push("/");
          router.refresh();
        }
      }
    } catch (err) {
      setError(t('genericError'));
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md mb-4">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('backToWeb')}
        </Link>
      </div>
      <Card className="w-full max-w-md bg-card/50 border-none shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center items-center gap-3">
            <img src="/icon.svg" alt="Vexx Watch Atelier" className="w-12 h-12 shrink-0 drop-shadow-sm" />
            <div className="font-heading font-bold text-2xl tracking-tight text-primary flex flex-col justify-center text-left">
              <span className="leading-none">VEXX WATCH</span>
              <span className="font-sans text-xs font-normal tracking-widest text-muted-foreground uppercase mt-1 leading-none">
                Atelier
              </span>
            </div>
          </div>
          <div>
            <CardTitle className="font-heading text-2xl font-bold">{t('registerTitle')}</CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              {t('registerDesc')}
            </CardDescription>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md border border-destructive/20 text-center">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs uppercase tracking-wider text-muted-foreground">{t('fullName')}</Label>
              <Input id="name" name="name" required className="h-12 bg-background" placeholder="Jan Novák" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground">{t('email')}</Label>
              <Input id="email" name="email" type="email" required className="h-12 bg-background" placeholder="vas@email.cz" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs uppercase tracking-wider text-muted-foreground">{t('password')}</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  required 
                  minLength={6} 
                  className="h-12 bg-background pr-10" 
                  placeholder="••••••••" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">{t('passwordMin')}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-xs uppercase tracking-wider text-muted-foreground">{t('confirmPassword')}</Label>
              <div className="relative">
                <Input 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  type={showPassword ? "text" : "password"} 
                  required 
                  minLength={6} 
                  className="h-12 bg-background pr-10" 
                  placeholder="••••••••" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
              {isLoading ? t('registerBtnLoading') : t('registerBtn')}
            </Button>
            <div className="text-sm text-center text-muted-foreground">
              {t('hasAccount')}{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                {t('loginLink')}
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
