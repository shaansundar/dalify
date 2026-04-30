import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import { AdminProviders } from "@/components/admin/layout/AdminProviders";
import { Toaster } from "sonner";
import { auth } from "@/lib/auth/config";

export const metadata: Metadata = {
  title: {
    default: "Dalify Admin",
    template: "%s | Dalify Admin",
  },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    return (
      <AdminProviders>
        {children}
        <Toaster position="bottom-right" richColors />
      </AdminProviders>
    );
  }

  return (
    <AdminProviders>
      <div className="flex h-screen overflow-hidden bg-warm-white">
        <AdminSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
      <Toaster position="bottom-right" richColors />
    </AdminProviders>
  );
}
