"use client";

import Link from "next/link";
import { ShoppingCart, Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/useCart";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { items } = useCart();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <Link href="/" className="font-heading font-bold text-2xl tracking-tight text-primary">
            SEIKO MOD
            <span className="font-sans text-sm font-normal block tracking-widest text-muted-foreground uppercase -mt-1">
              Atelier
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 font-medium">
          <Link href="/" className="text-foreground hover:text-accent transition-colors">
            Domů
          </Link>
          <Link href="/products" className="text-foreground hover:text-accent transition-colors">
            Katalog
          </Link>
          <Link href="/configurator" className="text-accent font-bold hover:text-accent/80 transition-colors flex items-center gap-1">
            Konfigurátor
          </Link>
          <Link href="/about" className="text-foreground hover:text-accent transition-colors">
            O preciznosti
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Button variant="outline" size="icon" className="relative group h-12 w-12 rounded-full border-primary/20 hover:border-accent hover:bg-accent/5">
              <ShoppingCart className="h-6 w-6 group-hover:text-accent transition-colors" />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-sm">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
          
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center justify-center h-12 w-12 rounded-full border border-primary/20 hover:border-accent hover:bg-accent/5 focus:outline-none transition-colors">
                <User className="h-6 w-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2 shadow-2xl border-primary/10 rounded-xl bg-background/95 backdrop-blur-xl">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Můj účet</DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>
                  {session.user?.name}
                </DropdownMenuItem>
                <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                  {session.user?.email}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {session.user?.role === "ADMIN" && (
                  <Link href="/admin">
                    <DropdownMenuItem className="text-primary font-medium cursor-pointer rounded-lg py-2 focus:bg-primary/10 focus:text-primary transition-colors">
                      Admin panel
                    </DropdownMenuItem>
                  </Link>
                )}
                <DropdownMenuItem onClick={() => signOut()} className="text-destructive cursor-pointer rounded-lg py-2 focus:bg-destructive/10 focus:text-destructive transition-colors">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Odhlásit se</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-3 ml-2">
              <Link href="/login">
                <Button variant="ghost" className="font-medium hover:text-accent hover:bg-accent/5 transition-colors rounded-full h-12 px-6">
                  Přihlásit
                </Button>
              </Link>
              <Link href="/register">
                <Button className="font-medium rounded-full h-12 px-8 shadow-md hover:shadow-xl transition-all hover:-translate-y-0.5 bg-primary text-primary-foreground border border-primary/20">
                  Registrovat
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
