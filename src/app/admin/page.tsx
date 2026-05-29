import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, DollarSign, Package, Users } from "lucide-react";
import dynamic from "next/dynamic";
import { prisma } from "@/lib/prisma";

const DashboardChart = dynamic(
  () => import("@/components/admin/DashboardChart").then(mod => mod.DashboardChart),
  { ssr: false, loading: () => <div className="w-full h-full flex items-center justify-center text-muted-foreground">Načítám graf...</div> }
);

export default async function AdminDashboard() {
  const [
    ordersCount,
    customersCount,
    productsCount,
    revenueAgg,
    latestOrders,
    allOrders,
    allExpenses
  ] = await Promise.all([
    prisma.order.count(),
    prisma.customer.count(),
    prisma.product.count(),
    prisma.order.aggregate({
      _sum: { total: true },
      where: { status: { not: "CANCELLED" } }
    }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { customer: true }
    }),
    prisma.order.findMany({
      where: { status: { not: "CANCELLED" } },
      select: { total: true, createdAt: true }
    }),
    prisma.expense.findMany({
      select: { amount: true, date: true }
    })
  ]);

  const totalRevenue = revenueAgg._sum.total || 0;

  // Aggregate by month (0-11)
  const revenuesByMonth = new Array(12).fill(0);
  const expensesByMonth = new Array(12).fill(0);

  const currentYear = new Date().getFullYear();

  allOrders.forEach(order => {
    if (order.createdAt.getFullYear() === currentYear) {
      revenuesByMonth[order.createdAt.getMonth()] += order.total;
    }
  });

  allExpenses.forEach(expense => {
    if (expense.date.getFullYear() === currentYear) {
      expensesByMonth[expense.date.getMonth()] += expense.amount;
    }
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Celkové tržby</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue.toLocaleString("cs-CZ")} Kč</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Objednávky</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ordersCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Zákazníci</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customersCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktivní produkty</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productsCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Přehled prodejů a výdajů</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <DashboardChart revenues={revenuesByMonth} expenses={expensesByMonth} />
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Poslední objednávky</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {latestOrders.length === 0 ? (
                <p className="text-sm text-muted-foreground">Žádné objednávky.</p>
              ) : (
                latestOrders.map((order) => (
                  <div key={order.id} className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{order.customer.name}</p>
                      <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                    </div>
                    <div className="ml-auto font-medium">+{order.total.toLocaleString("cs-CZ")} Kč</div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
