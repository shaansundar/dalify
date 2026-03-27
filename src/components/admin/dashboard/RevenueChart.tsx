"use client";

import { AreaChart } from "@tremor/react";

export interface RevenueDataPoint {
  readonly date: string;
  readonly revenue: number;
}

interface RevenueChartProps {
  readonly data: ReadonlyArray<RevenueDataPoint>;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="rounded-lg border border-cream-dark bg-warm-white p-5">
      <h3 className="font-heading text-lg font-semibold text-charcoal">
        Revenue
      </h3>
      {data.length === 0 ? (
        <p className="mt-4 text-center text-sm text-charcoal-muted">
          No revenue data available for this period.
        </p>
      ) : (
        <AreaChart
          className="mt-4 h-72"
          data={data as RevenueDataPoint[]}
          index="date"
          categories={["revenue"]}
          colors={["emerald"]}
          valueFormatter={formatCurrency}
          showLegend={false}
          showGridLines={false}
          curveType="monotone"
        />
      )}
    </div>
  );
}
