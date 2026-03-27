"use client";

import type { AdminOrder } from "@/lib/shopify-admin/types";

interface RecentOrdersFeedProps {
  readonly orders: ReadonlyArray<AdminOrder>;
}

const STATUS_COLORS: Record<string, string> = {
  PAID: "bg-success/10 text-success",
  PENDING: "bg-gold-muted text-gold",
  REFUNDED: "bg-error/10 text-error",
  PARTIALLY_REFUNDED: "bg-terracotta/10 text-terracotta",
};

function formatCurrency(amount: string, currency: string): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
  }).format(Number(amount));
}

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

export function RecentOrdersFeed({ orders }: RecentOrdersFeedProps) {
  return (
    <div className="rounded-lg border border-cream-dark bg-warm-white p-5">
      <h3 className="font-heading text-lg font-semibold text-charcoal">
        Recent Orders
      </h3>
      {orders.length === 0 ? (
        <p className="mt-4 text-center text-sm text-charcoal-muted">
          No recent orders.
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between rounded-md border border-cream-dark p-3"
            >
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-charcoal">
                  {order.name}
                </p>
                <p className="text-xs text-charcoal-muted">
                  {order.customer
                    ? `${order.customer.firstName ?? ""} ${order.customer.lastName ?? ""}`.trim() ||
                      order.customer.email
                    : "Guest"}
                </p>
              </div>
              <div className="text-right space-y-0.5">
                <p className="text-sm font-medium text-charcoal">
                  {formatCurrency(
                    order.totalPriceSet.shopMoney.amount,
                    order.totalPriceSet.shopMoney.currencyCode,
                  )}
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      STATUS_COLORS[order.displayFinancialStatus] ??
                      "bg-cream text-charcoal-muted"
                    }`}
                  >
                    {order.displayFinancialStatus}
                  </span>
                  <span className="text-[10px] text-charcoal-muted">
                    {formatDate(order.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
