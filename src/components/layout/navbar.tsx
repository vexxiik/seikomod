"use client";

import { Link } from "@/i18n/routing";
import NextLink from "next/link";
import { ShoppingCart, Menu, User, LogOut, X } from "lucide-react";
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
import { AnimatePresence, motion } from "framer-motion";
import { LanguageSwitcher } from "./LanguageSwitcher";

import { useTranslations } from "next-intl";

export function Navbar() {
  const t = useTranslations('Navigation');
  const tAuth = useTranslations('Auth');
  const { items } = useCart();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <Link href="/" className="font-heading font-bold text-xl md:text-2xl tracking-tight text-primary z-50" onClick={() => setIsMobileMenuOpen(false)}>
            VEXX WATCH
            <span className="font-sans text-xs md:text-sm font-normal block tracking-widest text-muted-foreground uppercase md:-mt-1">
              Atelier
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 font-medium">
          <Link href="/" className="text-foreground hover:text-accent transition-colors">
            {t('home')}
          </Link>
          <Link href="/products" className="text-foreground hover:text-accent transition-colors">
            {t('products')}
          </Link>
          <Link href="/configurator" className="text-accent font-bold hover:text-accent/80 transition-colors flex items-center gap-1">
            {t('configurator')}
          </Link>
          <Link href="/about" className="text-foreground hover:text-accent transition-colors">
            {t('about')}
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-4 z-50">
          <LanguageSwitcher />
          
          <Link href="/cart">
            <Button variant="outline" size="icon" className="relative group h-10 w-10 md:h-12 md:w-12 rounded-full border-primary/20 hover:border-accent hover:bg-accent/5">
              <ShoppingCart className="h-5 w-5 md:h-6 md:w-6 group-hover:text-accent transition-colors" />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs md:text-sm font-bold rounded-full h-5 w-5 md:h-6 md:w-6 flex items-center justify-center shadow-sm">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
          
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full border border-primary/20 hover:border-accent hover:bg-accent/5 focus:outline-none transition-colors">
                <User className="h-5 w-5 md:h-6 md:w-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2 shadow-2xl border-primary/10 rounded-xl bg-background/95 backdrop-blur-xl">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>{tAuth('myAccount')}</DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>
                  {session.user?.name}
                </DropdownMenuItem>
                <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                  {session.user?.email}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <NextLink href="/account">
                  <DropdownMenuItem className="cursor-pointer rounded-lg py-2 focus:bg-accent/10 focus:text-accent transition-colors">
                    {tAuth('myAccount')}
                  </DropdownMenuItem>
                </NextLink>
                <DropdownMenuSeparator />
                {session.user?.role === "ADMIN" && (
                  <NextLink href="/admin">
                    <DropdownMenuItem className="text-primary font-medium cursor-pointer rounded-lg py-2 focus:bg-primary/10 focus:text-primary transition-colors">
                      {tAuth('adminPanel')}
                    </DropdownMenuItem>
                  </NextLink>
                )}
                <DropdownMenuItem onClick={() => signOut()} className="text-destructive cursor-pointer rounded-lg py-2 focus:bg-destructive/10 focus:text-destructive transition-colors">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{tAuth('logout')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-3 ml-2">
              <Link href="/login">
                <Button variant="ghost" className="font-medium hover:text-accent hover:bg-accent/5 transition-colors rounded-full h-12 px-6">
                  {tAuth('login')}
                </Button>
              </Link>
              <Link href="/register">
                <Button className="font-medium rounded-full h-12 px-8 shadow-md hover:shadow-xl transition-all hover:-translate-y-0.5 bg-primary text-primary-foreground border border-primary/20">
                  {tAuth('register')}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 w-full bg-background border-b shadow-xl flex flex-col p-4 z-40"
          >
            <nav className="flex flex-col gap-4 font-medium text-lg">
              <Link href="/" className="px-4 py-3 hover:bg-muted rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                {t('home')}
              </Link>
              <Link href="/products" className="px-4 py-3 hover:bg-muted rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                {t('products')}
              </Link>
              <Link href="/configurator" className="px-4 py-3 text-accent hover:bg-accent/10 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                {t('configurator')}
              </Link>
              <Link href="/about" className="px-4 py-3 hover:bg-muted rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                {t('about')}
              </Link>
              
              {!session && (
                <div className="flex flex-col gap-3 mt-4 border-t pt-6">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full h-12 rounded-full">
                      {tAuth('login')}
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full h-12 rounded-full bg-primary text-primary-foreground">
                      {tAuth('register')}
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
