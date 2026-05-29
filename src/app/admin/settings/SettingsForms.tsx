"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { KeyRound, Mail, User } from "lucide-react";
import { updateAdminPassword, updateContactEmail } from "./actions";
import { useState } from "react";

export function SettingsForms({ 
  adminName, 
  adminEmail,
  initialContactEmail
}: { 
  adminName: string;
  adminEmail: string;
  initialContactEmail: string;
}) {
  const [pwdMsg, setPwdMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handlePasswordSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setPwdMsg("");
    const formData = new FormData(e.currentTarget);
    const result = await updateAdminPassword(adminEmail, formData);
    if (result?.error) setPwdMsg(`❌ ${result.error}`);
    if (result?.success) {
      setPwdMsg(`✅ ${result.success}`);
      (e.target as HTMLFormElement).reset();
    }
    setIsPending(false);
  }

  async function handleEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setEmailMsg("");
    const formData = new FormData(e.currentTarget);
    const result = await updateContactEmail(formData);
    if (result?.error) setEmailMsg(`❌ ${result.error}`);
    if (result?.success) setEmailMsg(`✅ ${result.success}`);
    setIsPending(false);
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profil administrátora
          </CardTitle>
          <CardDescription>
            Základní informace o vašem účtu a změna hesla.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Jméno</Label>
            <Input defaultValue={adminName} disabled />
          </div>
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input defaultValue={adminEmail} disabled />
          </div>
          <form onSubmit={handlePasswordSubmit} className="pt-4 mt-4 border-t space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <KeyRound className="h-4 w-4" />
              Změna hesla
            </h4>
            <div className="grid gap-2">
              <Label htmlFor="password">Nové heslo</Label>
              <Input id="password" name="password" type="password" required minLength={6} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Potvrzení nového hesla</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" required minLength={6} />
            </div>
            {pwdMsg && <p className="text-sm font-medium">{pwdMsg}</p>}
            <Button type="submit" disabled={isPending}>Změnit heslo</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Kontaktní údaje e-shopu
          </CardTitle>
          <CardDescription>
            Nastavení e-mailu pro přijímání upozornění o nových objednávkách a dotazech.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="contact_email">Notifikační e-mail</Label>
              <Input id="contact_email" name="contact_email" defaultValue={initialContactEmail} type="email" required />
              <p className="text-xs text-muted-foreground">
                Na tento e-mail vám budou chodit upozornění o poptávkách ze sekce Návrh na míru.
              </p>
            </div>
            {emailMsg && <p className="text-sm font-medium">{emailMsg}</p>}
            <Button type="submit" disabled={isPending}>Uložit e-mail</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
