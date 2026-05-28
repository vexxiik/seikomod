import { prisma } from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderActions } from "@/components/admin/OrderActions";

export default async function AdminOrders() {
  const orders = await prisma.order.findMany({
    include: {
      customer: true,
      items: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Objednávky</h1>
      </div>

      <div className="rounded-md border bg-card overflow-x-auto w-full">
        <Table className="min-w-[800px]">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Zákazník</TableHead>
              <TableHead>Datum</TableHead>
              <TableHead>Položky</TableHead>
              <TableHead>Celkem</TableHead>
              <TableHead>Stav</TableHead>
              <TableHead className="text-right">Akce</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-xs">{order.id.slice(-6).toUpperCase()}</TableCell>
                <TableCell>
                  <div className="font-medium">{order.customer.name}</div>
                  <div className="text-xs text-muted-foreground">{order.customer.email}</div>
                </TableCell>
                <TableCell>{order.createdAt.toLocaleDateString("cs-CZ")}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    {order.items.map(item => (
                      <div key={item.id}>{item.quantity}x {item.productName}</div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="font-semibold">{order.total.toLocaleString("cs-CZ")} Kč</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.status === 'COMPLETED' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                    order.status === 'CANCELLED' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                    'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                  }`}>
                    {order.status === 'COMPLETED' ? 'Vyřízeno' : order.status === 'CANCELLED' ? 'Zrušeno' : 'Čeká'}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <OrderActions id={order.id} currentStatus={order.status} />
                </TableCell>
              </TableRow>
            ))}
            {orders.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  Zatím nemáte žádné objednávky.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
