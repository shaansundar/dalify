import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="font-heading text-6xl font-semibold text-charcoal">404</h1>
      <p className="mt-4 text-lg text-charcoal-muted">
        We couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-md bg-green px-6 py-3 text-sm font-medium text-warm-white transition-colors hover:bg-green-light"
      >
        Back to Home
      </Link>
    </div>
  );
}
