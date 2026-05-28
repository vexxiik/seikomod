import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Package, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function OrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // V reálné aplikaci bychom zde stáhli z DB podle ID.
  // const order = await prisma.order.findUnique({ where: { id }, include: { items: true, customer: true } });
  
  // Zástupná data
  const order = {
    id: id,
    status: "COMPLETED",
    createdAt: new Date(),
    total: 8990,
    customer: {
      name: "Jan Novák",
      email: "jan.novak@email.cz",
      address: "Václavské náměstí 1, Praha"
    },
    items: [
      { id: "1", name: "Submariner Stealth Black", price: 8990, quantity: 1 }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Detail objednávky {order.id.slice(0, 8)}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Položky</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.items.map(item => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-muted rounded-md flex items-center justify-center">
                      <Package className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">{item.quantity} ks</div>
                    </div>
                  </div>
                  <div className="font-semibold">{item.price.toLocaleString("cs-CZ")} Kč</div>
                </div>
              ))}
              <div className="flex justify-between items-center pt-4 font-bold text-lg">
                <span>Celkem</span>
                <span>{order.total.toLocaleString("cs-CZ")} Kč</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Zákazník</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="font-medium">{order.customer.name}</div>
                <div className="text-sm text-muted-foreground">{order.customer.email}</div>
                <div className="text-sm">{order.customer.address}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Stav objednávky</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <CheckCircle className="h-5 w-5" />
                Vyřízeno
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
