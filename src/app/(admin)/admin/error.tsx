"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorPageProps {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}

export default function AdminError({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <div className="rounded-full bg-error/10 p-4">
        <AlertTriangle className="h-8 w-8 text-error" />
      </div>
      <h2 className="mt-4 font-heading text-xl font-semibold text-charcoal">
        Something went wrong
      </h2>
      <p className="mt-2 max-w-md text-sm text-charcoal-muted">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      {error.digest && (
        <p className="mt-1 text-xs text-charcoal-muted">
          Error ID: {error.digest}
        </p>
      )}
      <button
        onClick={reset}
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-green px-4 py-2 text-sm font-medium text-warm-white transition-colors hover:bg-green-light"
      >
        <RefreshCw className="h-4 w-4" />
        Try again
      </button>
    </div>
  );
}
