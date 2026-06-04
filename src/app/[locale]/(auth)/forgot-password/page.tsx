"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { KeyRound, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { requestPasswordReset } from "../actions";

export default function ForgotPasswordPage() {
  const t = useTranslations('Auth');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const res = await requestPasswordReset(formData);

    if (res?.error) {
      setError(res.error);
    } else {
      setSuccess(true);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-20 flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md bg-card/50 border-none shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
              <KeyRound className="h-6 w-6 text-accent" />
            </div>
          </div>
          <div>
            <CardTitle className="font-heading text-2xl font-bold">{t('forgotPassword')}</CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              {t('resetPasswordDesc')}
            </CardDescription>
          </div>
        </CardHeader>

        {success ? (
          <CardContent className="space-y-6 flex flex-col items-center py-6">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
            <p className="text-center text-muted-foreground">
              {t('resetSent')}
            </p>
            <Link href="/login">
              <Button variant="outline" className="mt-4">
                {t('backToLogin')}
              </Button>
            </Link>
          </CardContent>
        ) : (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {error && (
                <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md border border-destructive/20 text-center">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground">{t('email')}</Label>
                <Input id="email" name="email" type="email" required className="h-12 bg-background" placeholder="vas@email.cz" />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
                {isLoading ? "..." : t('sendLink')}
              </Button>
              <div className="text-sm text-center text-muted-foreground">
                <Link href="/login" className="text-primary hover:underline font-medium">
                  {t('backToLogin')}
                </Link>
              </div>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
}
