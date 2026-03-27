export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header + date range */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-36 rounded bg-cream-dark" />
          <div className="h-4 w-52 rounded bg-cream-dark" />
        </div>
        <div className="h-8 w-56 rounded-md bg-cream-dark" />
      </div>

      {/* KPI grid skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-cream-dark bg-warm-white p-5 space-y-3"
          >
            <div className="h-4 w-20 rounded bg-cream-dark" />
            <div className="h-8 w-28 rounded bg-cream-dark" />
            <div className="h-3 w-16 rounded bg-cream-dark" />
          </div>
        ))}
      </div>

      {/* Charts row skeleton */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-lg border border-cream-dark bg-warm-white p-5">
          <div className="h-5 w-24 rounded bg-cream-dark" />
          <div className="mt-4 h-72 rounded bg-cream-dark" />
        </div>
        <div className="rounded-lg border border-cream-dark bg-warm-white p-5">
          <div className="h-5 w-32 rounded bg-cream-dark" />
          <div className="mt-4 h-52 rounded-full mx-auto w-52 bg-cream-dark" />
        </div>
      </div>

      {/* Bottom row skeleton */}
      <div className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-cream-dark bg-warm-white p-5 space-y-3"
          >
            <div className="h-5 w-32 rounded bg-cream-dark" />
            {Array.from({ length: 5 }).map((_, j) => (
              <div key={j} className="h-4 w-full rounded bg-cream-dark" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
