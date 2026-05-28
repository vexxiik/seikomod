import { prisma } from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddExpenseModal } from "@/components/admin/AddExpenseModal";
import { ExpenseDeleteButton } from "@/components/admin/ExpenseDeleteButton";

export default async function AdminExpenses() {
  const expenses = await prisma.expense.findMany({
    orderBy: { date: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Výdaje (Komponenty)</h1>
        <AddExpenseModal />
      </div>

      <div className="rounded-md border bg-card overflow-x-auto w-full">
        <Table className="min-w-[600px]">
          <TableHeader>
            <TableRow>
              <TableHead>Název</TableHead>
              <TableHead>Datum</TableHead>
              <TableHead className="text-right">Částka</TableHead>
              <TableHead className="text-right">Akce</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.name}</TableCell>
                <TableCell>{expense.date.toLocaleDateString("cs-CZ")}</TableCell>
                <TableCell className="text-right text-destructive font-semibold">
                  -{expense.amount.toLocaleString("cs-CZ")} Kč
                </TableCell>
                <TableCell className="text-right">
                  <ExpenseDeleteButton id={expense.id} />
                </TableCell>
              </TableRow>
            ))}
            {expenses.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                  Zatím nebyly zaznamenány žádné výdaje.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
