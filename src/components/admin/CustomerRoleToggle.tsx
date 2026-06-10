"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, ShieldOff, Loader2 } from "lucide-react";
import { toggleCustomerRole } from "@/app/admin/actions";
import { useRouter } from "next/navigation";

interface CustomerRoleToggleProps {
  id: string;
  currentRole: string;
  isSelf: boolean;
}

export function CustomerRoleToggle({ id, currentRole, isSelf }: CustomerRoleToggleProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    if (isSelf) {
      alert("Nemůžete změnit svou vlastní roli.");
      return;
    }

    try {
      setIsLoading(true);
      const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
      await toggleCustomerRole(id, newRole);
      alert(`Role změněna na ${newRole === "ADMIN" ? "Administrátor" : "Uživatel"}`);
      router.refresh();
    } catch (error) {
      alert("Nastala chyba při změně role.");
    } finally {
      setIsLoading(false);
    }
  };

  const isAdmin = currentRole === "ADMIN";

  if (isSelf) {
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        className="mr-2 text-muted-foreground/50 cursor-not-allowed"
        title="Nemůžete změnit svou vlastní roli"
      >
        <Shield className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={handleToggle}
      disabled={isLoading}
      className={`mr-2 ${isAdmin ? 'text-primary' : 'text-muted-foreground'} hover:text-primary transition-colors`}
      title={isAdmin ? "Odebrat práva administrátora" : "Přidělit práva administrátora"}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isAdmin ? (
        <Shield className="h-4 w-4 text-blue-500" />
      ) : (
        <ShieldOff className="h-4 w-4" />
      )}
    </Button>
  );
}
