"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { addExpense } from "@/app/admin/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AddExpenseModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (!isOpen) {
    return (
      <Button 
        className="bg-primary text-primary-foreground hover:bg-primary/90"
        onClick={() => setIsOpen(true)}
      >
        <Plus className="mr-2 h-4 w-4" /> Zapsat výdaj
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-background rounded-xl p-6 w-full max-w-md shadow-lg border">
        <h2 className="text-xl font-bold mb-4">Nový výdaj</h2>
        <form 
          action={(formData) => {
            startTransition(async () => {
              await addExpense(formData);
              setIsOpen(false);
            });
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Název položky</Label>
            <Input id="name" name="name" required placeholder="Např. Strojky NH35" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Částka (Kč)</Label>
            <Input id="amount" name="amount" type="number" required placeholder="1500" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Datum (nepovinné)</Label>
            <Input id="date" name="date" type="date" />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              disabled={isPending}
            >
              Zrušit
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Ukládám..." : "Uložit výdaj"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
