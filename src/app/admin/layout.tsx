import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminLayoutWrapper } from "@/components/admin/AdminLayoutWrapper";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <AdminLayoutWrapper user={{ name: session.user.name, email: session.user.email, role: session.user.role }}>
      {children}
    </AdminLayoutWrapper>
  );
}
