import type { Metadata } from "next";
import { LayoutDashboard } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <LayoutDashboard className="h-6 w-6 text-green" />
        <h1 className="font-heading text-2xl font-semibold text-charcoal">
          Dashboard
        </h1>
      </div>

      <div className="rounded-lg border border-cream-dark bg-cream p-8 text-center">
        <p className="text-charcoal-muted">
          Analytics dashboard coming soon. Admin shell is operational.
        </p>
      </div>
    </div>
  );
}
