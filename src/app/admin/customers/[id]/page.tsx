import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CustomerDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Zástupná data
  const customer = {
    id: id,
    name: "Jan Novák",
    email: "jan.novak@email.cz",
    address: "Václavské náměstí 1, 110 00 Praha",
    createdAt: new Date(),
    spent: 25970,
    orders: [
      { id: "ord_1", date: new Date(), total: 8990, status: "COMPLETED" },
      { id: "ord_2", date: new Date(Date.now() - 864000000), total: 16980, status: "COMPLETED" }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/customers">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Detail zákazníka: {customer.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Informace</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">E-mail</div>
              <div className="font-medium">{customer.email}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Adresa</div>
              <div className="font-medium">{customer.address}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Zákazníkem od</div>
              <div className="font-medium">{customer.createdAt.toLocaleDateString("cs-CZ")}</div>
            </div>
            <div className="pt-4 border-t">
              <div className="text-sm text-muted-foreground">Celkem utraceno</div>
              <div className="text-2xl font-bold text-primary">{customer.spent.toLocaleString("cs-CZ")} Kč</div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Historie objednávek</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customer.orders.map(order => (
                <div key={order.id} className="flex justify-between items-center py-3 border-b last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <ShoppingBag className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">
                        <Link href={`/admin/orders/${order.id}`} className="hover:underline">
                          {order.id}
                        </Link>
                      </div>
                      <div className="text-sm text-muted-foreground">{order.date.toLocaleDateString("cs-CZ")}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{order.total.toLocaleString("cs-CZ")} Kč</div>
                    <div className="text-xs text-green-600 font-medium">Vyřízeno</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
