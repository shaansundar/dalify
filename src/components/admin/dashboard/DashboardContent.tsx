"use client";

import { useState } from "react";
import { LayoutDashboard } from "lucide-react";
import { PageHeader } from "@/components/admin/shared/PageHeader";
import { KpiGrid, type KpiData } from "./KpiGrid";
import { RevenueChart, type RevenueDataPoint } from "./RevenueChart";
import { TopProductsTable, type TopProduct } from "./TopProductsTable";
import { OrderStatusBreakdown, type OrderStatusData } from "./OrderStatusBreakdown";
import { RecentOrdersFeed } from "./RecentOrdersFeed";
import { DateRangeSelector, type DateRange } from "./DateRangeSelector";
import type { AdminOrder } from "@/lib/shopify-admin/types";

// TODO: Replace with React Query + server actions when NIM-59 is done
const EMPTY_KPIS: KpiData = {
  revenue: 0,
  orders: 0,
  aov: 0,
  conversionRate: 0,
};
const EMPTY_REVENUE: ReadonlyArray<RevenueDataPoint> = [];
const EMPTY_PRODUCTS: ReadonlyArray<TopProduct> = [];
const EMPTY_STATUS: ReadonlyArray<OrderStatusData> = [];
const EMPTY_ORDERS: ReadonlyArray<AdminOrder> = [];

export function DashboardContent() {
  const [dateRange, setDateRange] = useState<DateRange>("30d");

  // TODO: Wire to server actions via React Query when NIM-59 is done
  const kpis = EMPTY_KPIS;
  const revenueData = EMPTY_REVENUE;
  const topProducts = EMPTY_PRODUCTS;
  const orderStatus = EMPTY_STATUS;
  const recentOrders = EMPTY_ORDERS;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="Dashboard"
          description="Sales analytics overview"
        />
        <DateRangeSelector value={dateRange} onChange={setDateRange} />
      </div>

      {/* KPI Cards */}
      <KpiGrid data={kpis} />

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart data={revenueData} />
        </div>
        <OrderStatusBreakdown data={orderStatus} />
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <TopProductsTable products={topProducts} />
        <RecentOrdersFeed orders={recentOrders} />
      </div>
    </div>
  );
}
