import type { ReactNode } from "react";

interface CardProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly image?: {
    readonly src: string;
    readonly alt: string;
  };
}

export function Card({ children, className = "", image }: CardProps) {
  return (
    <div
      className={`overflow-hidden rounded-lg bg-warm-white shadow-card transition-shadow duration-150 ease-in-out hover:shadow-card-hover ${className}`}
    >
      {image && (
        <div className="aspect-square overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
