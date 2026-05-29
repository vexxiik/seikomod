"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/app/admin/actions";
import { useTransition } from "react";
import Link from "next/link";
import { Edit } from "lucide-react";

export function ProductActions({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex justify-end gap-2">
      <Link href={`/admin/products/${id}`}>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground hover:text-primary"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </Link>
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-muted-foreground hover:text-destructive"
        disabled={isPending}
        onClick={() => {
          if (confirm("Opravdu chcete smazat tento produkt? Všechny propojené objednávky mohou být ovlivněny.")) {
            startTransition(async () => {
              await deleteProduct(id);
            });
          }
        }}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
