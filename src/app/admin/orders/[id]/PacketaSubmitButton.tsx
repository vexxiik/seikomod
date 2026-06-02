"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { submitToPacketa } from "./actions";
import { PackagePlus } from "lucide-react";

export function PacketaSubmitButton({ orderId }: { orderId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await submitToPacketa(orderId);
      if (res.error) {
        setError(res.error);
      }
    } catch (err: any) {
      setError(err.message || "Něco se pokazilo");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-4 pt-4 border-t">
      <Button 
        onClick={handleSubmit} 
        disabled={isSubmitting}
        variant="outline"
        className="w-full border-green-500 text-green-700 hover:bg-green-50"
      >
        <PackagePlus className="mr-2 h-4 w-4" />
        {isSubmitting ? "Odesílám..." : "Založit zásilku v Zásilkovně"}
      </Button>
      {error && <p className="text-sm text-destructive mt-2">{error}</p>}
    </div>
  );
}
