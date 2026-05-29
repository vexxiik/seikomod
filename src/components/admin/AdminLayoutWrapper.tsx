"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Package, Users, Settings, LogOut, 
  Watch, DollarSign, Globe, ShoppingCart, Menu, X 
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function AdminLayoutWrapper({ 
  children, 
  user 
}: { 
  children: React.ReactNode; 
  user: { name?: string | null; email?: string | null; role?: string | null };
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Zavřít menu při změně stránky
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/products", icon: Package, label: "Produkty" },
    { href: "/admin/orders", icon: ShoppingCart, label: "Objednávky" },
    { href: "/admin/customers", icon: Users, label: "Zákazníci" },
    { href: "/admin/expenses", icon: DollarSign, label: "Výdaje" },
    { href: "/admin/discounts", icon: Package, label: "Slevové kupóny" },
    { href: "/admin/settings", icon: Settings, label: "Nastavení" },
  ];

  return (
    <div className="flex h-screen bg-muted/20">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-card border-r flex-col z-20">
        <div className="h-20 flex items-center px-6 border-b">
          <Link href="/admin" className="flex items-center gap-2 text-primary font-heading font-bold text-xl">
            <Watch className="h-6 w-6" />
            <span>Seiko Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                {link.label}
              </Link>
            );
          })}
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

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.aside 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-card border-r flex flex-col z-50 md:hidden shadow-2xl"
            >
              <div className="h-20 flex items-center justify-between px-6 border-b">
                <Link href="/admin" className="flex items-center gap-2 text-primary font-heading font-bold text-xl">
                  <Watch className="h-6 w-6" />
                  <span>Seiko Admin</span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2 text-muted-foreground hover:text-foreground">
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <Link 
                      key={link.href} 
                      href={link.href} 
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                        isActive 
                          ? "bg-primary/10 text-primary" 
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  );
                })}
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
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 overflow-auto flex flex-col min-w-0">
        <header className="h-16 md:h-20 shrink-0 border-b bg-card flex items-center justify-between px-4 md:px-8 z-10 sticky top-0">
          <button 
            className="md:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex items-center gap-3 ml-auto">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium">{user.name}</div>
              <div className="text-xs text-muted-foreground">{user.email}</div>
            </div>
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shrink-0">
              {user.name?.charAt(0).toUpperCase() || "A"}
            </div>
          </div>
        </header>
        <div className="flex-1 p-4 md:p-8 overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
