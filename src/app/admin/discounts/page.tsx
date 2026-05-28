import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tag, Trash2, Power, PowerOff } from "lucide-react";
import { createDiscountCode, deleteDiscountCode, toggleDiscountCode } from "./actions";

export default async function DiscountsPage() {
  const discounts = await prisma.discountCode.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold mb-2">Slevové kupóny</h1>
        <p className="text-muted-foreground">Správa slevových kódů a akcí pro zákazníky.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <form action={createDiscountCode} className="bg-card p-6 rounded-xl border shadow-sm space-y-4">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <Tag className="h-5 w-5" /> Nový kupón
            </h2>
            <div className="space-y-2">
              <Label htmlFor="code">Kód (např. VANOCE20)</Label>
              <Input id="code" name="code" required className="uppercase" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Typ slevy</Label>
              <select id="type" name="type" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="PERCENTAGE">Procentuální (%)</option>
                <option value="FIXED">Pevná částka (Kč)</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="discount">Hodnota (např. 15 nebo 500)</Label>
              <Input id="discount" name="discount" type="number" min="1" step="0.01" required />
            </div>
            <Button type="submit" className="w-full">Vytvořit kupón</Button>
          </form>
        </div>

        <div className="md:col-span-2">
          <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kód</TableHead>
                  <TableHead>Sleva</TableHead>
                  <TableHead>Použito</TableHead>
                  <TableHead>Stav</TableHead>
                  <TableHead className="text-right">Akce</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {discounts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      Zatím nemáte žádné kupóny.
                    </TableCell>
                  </TableRow>
                ) : (
                  discounts.map((discount) => (
                    <TableRow key={discount.id}>
                      <TableCell className="font-medium uppercase">{discount.code}</TableCell>
                      <TableCell>
                        {discount.type === "PERCENTAGE" ? `${discount.discount} %` : `${discount.discount} Kč`}
                      </TableCell>
                      <TableCell>{discount.usedCount}×</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${discount.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {discount.isActive ? 'Aktivní' : 'Neaktivní'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <form action={async () => { "use server"; await toggleDiscountCode(discount.id, !discount.isActive); }} className="inline">
                          <Button variant="ghost" size="icon" type="submit" title={discount.isActive ? "Vypnout" : "Zapnout"}>
                            {discount.isActive ? <PowerOff className="h-4 w-4 text-orange-500" /> : <Power className="h-4 w-4 text-green-500" />}
                          </Button>
                        </form>
                        <form action={async () => { "use server"; await deleteDiscountCode(discount.id); }} className="inline">
                          <Button variant="ghost" size="icon" type="submit" className="text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </form>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
