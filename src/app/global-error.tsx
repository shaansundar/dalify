"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-neutral-50 font-sans text-neutral-900">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-semibold">Something went wrong</h2>
          <p className="mb-6 text-neutral-600">
            We&apos;ve been notified and are looking into it.
          </p>
          <button
            onClick={reset}
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm text-white hover:bg-neutral-800"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
