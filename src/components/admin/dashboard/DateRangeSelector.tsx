"use client";

export type DateRange = "7d" | "30d" | "90d";

interface DateRangeSelectorProps {
  readonly value: DateRange;
  readonly onChange: (range: DateRange) => void;
}

const RANGES: ReadonlyArray<{ readonly value: DateRange; readonly label: string }> = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
];

export function DateRangeSelector({ value, onChange }: DateRangeSelectorProps) {
  return (
    <div className="inline-flex rounded-md border border-cream-dark bg-cream">
      {RANGES.map((range) => (
        <button
          key={range.value}
          onClick={() => onChange(range.value)}
          className={`px-3 py-1.5 text-xs font-medium transition-colors first:rounded-l-md last:rounded-r-md ${
            value === range.value
              ? "bg-green text-warm-white"
              : "text-charcoal-muted hover:text-charcoal"
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}
