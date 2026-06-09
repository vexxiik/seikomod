"use client";

import { Button } from "@/components/ui/button";
import { Trash2, CheckCircle, XCircle, Eye, FileText } from "lucide-react";
import { deleteOrder, updateOrderStatus } from "@/app/admin/actions";
import { useTransition } from "react";
import Link from "next/link";

export function OrderActions({ id, currentStatus }: { id: string, currentStatus: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex justify-end gap-1">
      <Link href={`/admin/orders/${id}`}>
        <Button 
          variant="ghost" 
          size="icon" 
          title="Zobrazit detail"
          className="text-muted-foreground hover:text-blue-500"
        >
          <Eye className="h-4 w-4" />
        </Button>
      </Link>
      
      <a href={`/api/invoices/${id}`} target="_blank" rel="noopener noreferrer">
        <Button 
          variant="ghost" 
          size="icon" 
          title="Stáhnout fakturu"
          className="text-muted-foreground hover:text-indigo-500"
          type="button"
        >
          <FileText className="h-4 w-4" />
        </Button>
      </a>
      
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
