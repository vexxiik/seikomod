import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SettingsForms } from "./SettingsForms";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  
  const emailSetting = await prisma.setting.findUnique({
    where: { key: "contact_email" }
  });

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Nastavení</h1>
        <p className="text-muted-foreground">Správa vašeho účtu a globálních nastavení obchodu.</p>
      </div>

      <SettingsForms 
        adminName={session?.user?.name || "Administrátor"} 
        adminEmail={session?.user?.email || "admin@seikomod.com"} 
        initialContactEmail={emailSetting?.value || "admin@seikomod.com"}
      />
    </div>
  );
}
