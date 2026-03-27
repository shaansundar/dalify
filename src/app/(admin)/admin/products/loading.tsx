export default function ProductsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-32 rounded bg-cream-dark" />
          <div className="h-4 w-56 rounded bg-cream-dark" />
        </div>
        <div className="h-10 w-36 rounded-md bg-cream-dark" />
      </div>

      {/* Search + filter */}
      <div className="flex gap-3">
        <div className="h-10 w-64 rounded-md bg-cream-dark" />
        <div className="h-10 w-36 rounded-md bg-cream-dark" />
      </div>

      {/* Table skeleton */}
      <div className="rounded-lg border border-cream-dark">
        <div className="border-b border-cream-dark bg-cream px-4 py-3">
          <div className="h-4 w-full rounded bg-cream-dark" />
        </div>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border-b border-cream-dark px-4 py-3 last:border-0"
          >
            <div className="h-4 w-4 rounded bg-cream-dark" />
            <div className="h-10 w-10 rounded bg-cream-dark" />
            <div className="flex-1 h-4 rounded bg-cream-dark" />
            <div className="h-5 w-16 rounded-full bg-cream-dark" />
            <div className="h-4 w-20 rounded bg-cream-dark" />
            <div className="h-4 w-16 rounded bg-cream-dark" />
          </div>
        ))}
      </div>
    </div>
  );
}
