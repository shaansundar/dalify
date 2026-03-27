"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Warehouse,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly icon: React.ComponentType<{ readonly className?: string }>;
}

const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Collections", href: "/admin/collections", icon: FolderTree },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Inventory", href: "/admin/inventory", icon: Warehouse },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex flex-col border-r border-cream-dark bg-cream transition-[width] duration-200 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Brand */}
      <div className="flex h-16 items-center border-b border-cream-dark px-4">
        {!collapsed && (
          <Link
            href="/admin/dashboard"
            className="font-heading text-xl font-semibold text-green"
          >
            Dalify Admin
          </Link>
        )}
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className={`ml-auto rounded-md p-1.5 text-charcoal-muted hover:bg-cream-dark hover:text-charcoal ${
            collapsed ? "mx-auto" : ""
          }`}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4" aria-label="Admin navigation">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-green-muted text-green"
                  : "text-charcoal-muted hover:bg-cream-dark hover:text-charcoal"
              } ${collapsed ? "justify-center px-2" : ""}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-cream-dark p-3">
        <button
          className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-charcoal-muted transition-colors hover:bg-cream-dark hover:text-charcoal ${
            collapsed ? "justify-center px-2" : ""
          }`}
          title={collapsed ? "Sign out" : undefined}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Sign out</span>}
        </button>
      </div>
    </aside>
  );
}
