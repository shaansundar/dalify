export default function AdminLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-48 rounded bg-cream-dark" />
          <div className="h-4 w-64 rounded bg-cream-dark" />
        </div>
        <div className="h-10 w-32 rounded-md bg-cream-dark" />
      </div>

      {/* Table skeleton */}
      <div className="rounded-lg border border-cream-dark">
        <div className="border-b border-cream-dark bg-cream px-4 py-3">
          <div className="h-4 w-full rounded bg-cream-dark" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border-b border-cream-dark px-4 py-3 last:border-0"
          >
            <div className="h-10 w-10 rounded bg-cream-dark" />
            <div className="flex-1 space-y-1.5">
              <div className="h-4 w-3/4 rounded bg-cream-dark" />
              <div className="h-3 w-1/2 rounded bg-cream-dark" />
            </div>
            <div className="h-4 w-16 rounded bg-cream-dark" />
          </div>
        ))}
      </div>
    </div>
  );
}
