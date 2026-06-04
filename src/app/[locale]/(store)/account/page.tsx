import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Truck, ExternalLink, CalendarDays, Receipt } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    redirect("/login");
  }

  const t = await getTranslations("Account");

  const orders = await prisma.order.findMany({
    where: { customerId: session.user.id },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING_PAYMENT':
        return <Badge variant="outline" className="bg-orange-500/10 text-orange-600 hover:bg-orange-500/20">Čeká na platbu</Badge>;
      case 'PAID':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20">Zaplaceno</Badge>;
      case 'PENDING':
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">Zpracovává se</Badge>;
      case 'COMPLETED':
        return <Badge variant="outline" className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Odesláno</Badge>;
      case 'CANCELLED':
        return <Badge variant="outline" className="bg-red-500/10 text-red-600 hover:bg-red-500/20">Zrušeno</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl min-h-[80vh]">
      <div className="mb-12">
        <h1 className="font-heading text-4xl font-bold mb-2">{t('title')}</h1>
        <p className="text-muted-foreground">{session.user.name} ({session.user.email})</p>
      </div>

      <div className="space-y-8">
        <div className="flex items-center gap-3 border-b pb-4">
          <Package className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold font-heading">{t('orders')}</h2>
        </div>

        {orders.length === 0 ? (
          <Card className="bg-card/30 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
              <Receipt className="w-12 h-12 mb-4 opacity-20" />
              <p>{t('noOrders')}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden bg-card/40 border-primary/10 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-muted/30 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{t('orderNumber')}</p>
                      <p className="font-bold font-heading">{order.orderNumber || order.id.slice(-6).toUpperCase()}</p>
                    </div>
                    <div className="h-10 w-px bg-border hidden md:block mx-2"></div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t('date')}</p>
                      <p className="font-medium flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-muted-foreground" />
                        {new Date(order.createdAt).toLocaleDateString('cs-CZ')}
                      </p>
                    </div>
                    <div className="h-10 w-px bg-border hidden md:block mx-2"></div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t('total')}</p>
                      <p className="font-bold">{order.total.toLocaleString('cs-CZ')} Kč</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {getStatusBadge(order.status)}
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-0 border-border/50">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium">{item.productName}</p>
                            <p className="text-sm text-muted-foreground">{item.quantity}x {item.price.toLocaleString('cs-CZ')} Kč</p>
                          </div>
                        </div>
                        <p className="font-bold">{(item.quantity * item.price).toLocaleString('cs-CZ')} Kč</p>
                      </div>
                    ))}
                  </div>

                  {order.packetaBarcode && order.status === 'COMPLETED' && (
                    <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Truck className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">Zásilka byla odeslána</p>
                          <p className="text-sm text-muted-foreground">Sledovací číslo: {order.packetaBarcode}</p>
                        </div>
                      </div>
                      <a 
                        href={`https://tracking.packeta.com/cs_CZ/?id=${order.packetaBarcode}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm font-bold text-primary hover:underline bg-background px-4 py-2 rounded-lg border shadow-sm"
                      >
                        {t('track')}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
