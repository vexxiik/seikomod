"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Watch } from "lucide-react";
import { registerUser } from "@/app/(auth)/actions";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
          setError("Registrace proběhla, ale přihlášení selhalo. Zkuste se přihlásit ručně.");
          setIsLoading(false);
        } else {
          router.push("/");
          router.refresh();
        }
      }
    } catch (err) {
      setError("Něco se pokazilo. Zkuste to prosím znovu.");
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md bg-card/50 border-none shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
              <Watch className="h-6 w-6 text-accent" />
            </div>
          </div>
          <div>
            <CardTitle className="font-heading text-2xl font-bold">Registrace</CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              Vytvořte si účet a získejte prémiovou krabičku zdarma
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
              <Label htmlFor="name" className="text-xs uppercase tracking-wider text-muted-foreground">Celé jméno</Label>
              <Input id="name" name="name" required className="h-12 bg-background" placeholder="Jan Novák" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground">E-mail</Label>
              <Input id="email" name="email" type="email" required className="h-12 bg-background" placeholder="vas@email.cz" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs uppercase tracking-wider text-muted-foreground">Heslo</Label>
              <Input id="password" name="password" type="password" required minLength={6} className="h-12 bg-background" placeholder="••••••••" />
              <p className="text-xs text-muted-foreground">Minimálně 6 znaků.</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
              {isLoading ? "Vytvářím účet..." : "Vytvořit účet"}
            </Button>
            <div className="text-sm text-center text-muted-foreground">
              Už máte účet?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Přihlaste se
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
