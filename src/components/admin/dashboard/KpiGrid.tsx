import { KpiCard } from "./KpiCard";

export interface KpiData {
  readonly revenue: number;
  readonly orders: number;
  readonly aov: number;
  readonly conversionRate: number;
  readonly revenueTrend?: number;
  readonly ordersTrend?: number;
  readonly aovTrend?: number;
  readonly conversionTrend?: number;
}

interface KpiGridProps {
  readonly data: KpiData;
  readonly periodLabel?: string;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function KpiGrid({ data, periodLabel = "vs prior period" }: KpiGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        label="Revenue"
        value={formatCurrency(data.revenue)}
        trend={data.revenueTrend}
        trendLabel={periodLabel}
      />
      <KpiCard
        label="Orders"
        value={data.orders.toLocaleString("en-IN")}
        trend={data.ordersTrend}
        trendLabel={periodLabel}
      />
      <KpiCard
        label="Avg. Order Value"
        value={formatCurrency(data.aov)}
        trend={data.aovTrend}
        trendLabel={periodLabel}
      />
      <KpiCard
        label="Conversion Rate"
        value={`${data.conversionRate.toFixed(1)}%`}
        trend={data.conversionTrend}
        trendLabel={periodLabel}
      />
    </div>
  );
}
