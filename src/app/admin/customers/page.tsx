import { prisma } from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CustomerDeleteButton } from "@/components/admin/CustomerDeleteButton";
import { CustomerRoleToggle } from "@/components/admin/CustomerRoleToggle";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function AdminCustomers() {
  const session = await getServerSession(authOptions);
  const currentUserId = session?.user?.id;

  const customers = await prisma.customer.findMany({
    include: {
      orders: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Zákazníci</h1>
      </div>

      <div className="rounded-md border bg-card overflow-x-auto w-full">
        <Table className="min-w-[600px]">
          <TableHeader>
            <TableRow>
              <TableHead>Jméno</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Počet objednávek</TableHead>
              <TableHead>Celkem utraceno</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Akce</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => {
              const spent = customer.orders.reduce((sum, order) => sum + order.total, 0);
              
              return (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.orders.length}</TableCell>
                  <TableCell>{spent.toLocaleString("cs-CZ")} Kč</TableCell>
                  <TableCell>
                    {customer.role === "ADMIN" ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Admin
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        User
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right whitespace-nowrap">
                    <a href={`mailto:${customer.email}`}>
                      <Button variant="ghost" size="icon" className="mr-2 text-muted-foreground hover:text-primary">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </a>
                    <CustomerRoleToggle id={customer.id} currentRole={customer.role} isSelf={customer.id === currentUserId} />
                    <CustomerDeleteButton id={customer.id} />
                  </TableCell>
                </TableRow>
              );
            })}
            {customers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  Zatím nemáte žádné zákazníky.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
