import Link from "next/link";

interface CollectionCardProps {
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly imagePlaceholderColor?: string;
}

export function CollectionCard({
  title,
  description,
  href,
  imagePlaceholderColor = "bg-cream-dark",
}: CollectionCardProps) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-lg bg-warm-white shadow-card transition-shadow duration-150 hover:shadow-card-hover"
    >
      <div
        className={`aspect-[4/3] ${imagePlaceholderColor} flex items-center justify-center overflow-hidden`}
      >
        <span className="font-heading text-2xl font-semibold text-charcoal-muted transition-transform duration-300 group-hover:scale-105">
          {title}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-heading text-xl font-semibold text-charcoal">
          {title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-charcoal-muted">
          {description}
        </p>
        <span className="mt-3 inline-flex items-center text-sm font-medium text-green transition-colors group-hover:text-green-light">
          Browse Collection
          <svg
            className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
