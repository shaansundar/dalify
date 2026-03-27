"use client";

import { AdminBreadcrumb } from "./AdminBreadcrumb";
import { User } from "lucide-react";

export function AdminHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-cream-dark bg-warm-white px-6">
      <AdminBreadcrumb />

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-charcoal-muted hover:bg-cream transition-colors">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">Admin</span>
        </div>
      </div>
    </header>
  );
}
