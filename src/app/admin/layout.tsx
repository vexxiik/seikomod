import Link from "next/link";
import { LayoutDashboard, Package, Users, Settings, LogOut, Watch, DollarSign, Globe } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="flex h-screen bg-muted/20">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r flex flex-col">
        <div className="h-20 flex items-center px-6 border-b">
          <Link href="/admin" className="flex items-center gap-2 text-primary font-heading font-bold text-xl">
            <Watch className="h-6 w-6" />
            <span>Seiko Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground font-medium transition-colors">
            <Package className="h-5 w-5" />
            Produkty
          </Link>
          <Link href="/admin/customers" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground font-medium transition-colors">
            <Users className="h-5 w-5" />
            Zákazníci
          </Link>
          <Link href="/admin/expenses" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground font-medium transition-colors">
            <DollarSign className="h-5 w-5" />
            Výdaje
          </Link>
          <Link href="/admin/discounts" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground font-medium transition-colors">
            <Package className="h-5 w-5" />
            Slevové kupóny
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground font-medium transition-colors">
            <Settings className="h-5 w-5" />
            Nastavení
          </Link>
        </nav>
        
        <div className="p-4 border-t space-y-2">
          <Link href="/">
            <button className="flex w-full items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground font-medium transition-colors">
              <Globe className="h-5 w-5" />
              Zobrazit web
            </button>
          </Link>
          <Link href="/api/auth/signout">
            <button className="flex w-full items-center gap-3 px-4 py-3 rounded-lg hover:bg-destructive/10 text-destructive font-medium transition-colors">
              <LogOut className="h-5 w-5" />
              Odhlásit se
            </button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="h-20 border-b bg-card flex items-center justify-end px-8">
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-medium">{session.user.name}</div>
              <div className="text-xs text-muted-foreground">{session.user.email}</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              {session.user.name?.charAt(0).toUpperCase() || "A"}
            </div>
          </div>
        </div>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
