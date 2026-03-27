import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KpiCardProps {
  readonly label: string;
  readonly value: string;
  readonly trend?: number;
  readonly trendLabel?: string;
}

export function KpiCard({ label, value, trend, trendLabel }: KpiCardProps) {
  const trendColor =
    trend === undefined || trend === 0
      ? "text-charcoal-muted"
      : trend > 0
        ? "text-success"
        : "text-error";

  const TrendIcon =
    trend === undefined || trend === 0
      ? Minus
      : trend > 0
        ? TrendingUp
        : TrendingDown;

  return (
    <div className="rounded-lg border border-cream-dark bg-warm-white p-5 shadow-card transition-shadow hover:shadow-card-hover">
      <p className="text-sm font-medium text-charcoal-muted">{label}</p>
      <p className="mt-2 font-heading text-2xl font-semibold text-charcoal">
        {value}
      </p>
      {trend !== undefined && (
        <div className={`mt-2 flex items-center gap-1 text-xs ${trendColor}`}>
          <TrendIcon className="h-3.5 w-3.5" />
          <span className="font-medium">
            {trend > 0 ? "+" : ""}
            {trend.toFixed(1)}%
          </span>
          {trendLabel && (
            <span className="text-charcoal-muted">{trendLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}
