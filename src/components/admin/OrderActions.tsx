"use client";

import { Button } from "@/components/ui/button";
import { Trash2, CheckCircle, XCircle } from "lucide-react";
import { deleteOrder, updateOrderStatus } from "@/app/admin/actions";
import { useTransition } from "react";

export function OrderActions({ id, currentStatus }: { id: string, currentStatus: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex justify-end gap-1">
      {currentStatus !== 'COMPLETED' && (
        <Button 
          variant="ghost" 
          size="icon" 
          title="Označit jako vyřízeno"
          className="text-muted-foreground hover:text-green-500"
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {
              await updateOrderStatus(id, 'COMPLETED');
            });
          }}
        >
          <CheckCircle className="h-4 w-4" />
        </Button>
      )}
      
      {currentStatus !== 'CANCELLED' && (
        <Button 
          variant="ghost" 
          size="icon" 
          title="Zrušit objednávku"
          className="text-muted-foreground hover:text-orange-500"
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {
              await updateOrderStatus(id, 'CANCELLED');
            });
          }}
        >
          <XCircle className="h-4 w-4" />
        </Button>
      )}

      <Button 
        variant="ghost" 
        size="icon" 
        title="Smazat objednávku"
        className="text-muted-foreground hover:text-destructive"
        disabled={isPending}
        onClick={() => {
          if (confirm("Opravdu chcete smazat tuto objednávku?")) {
            startTransition(async () => {
              await deleteOrder(id);
            });
          }
        }}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
