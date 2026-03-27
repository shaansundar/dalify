"use client";

import { DonutChart } from "@tremor/react";

export interface OrderStatusData {
  readonly status: string;
  readonly count: number;
}

interface OrderStatusBreakdownProps {
  readonly data: ReadonlyArray<OrderStatusData>;
}

export function OrderStatusBreakdown({ data }: OrderStatusBreakdownProps) {
  return (
    <div className="rounded-lg border border-cream-dark bg-warm-white p-5">
      <h3 className="font-heading text-lg font-semibold text-charcoal">
        Orders by Status
      </h3>
      {data.length === 0 ? (
        <p className="mt-4 text-center text-sm text-charcoal-muted">
          No order data available.
        </p>
      ) : (
        <DonutChart
          className="mt-4 h-52"
          data={data as OrderStatusData[]}
          index="status"
          category="count"
          colors={["emerald", "amber", "rose", "slate"]}
          showLabel
          showAnimation
        />
      )}
    </div>
  );
}
