"use client";

import { useState, useCallback } from "react";

interface GalleryImage {
  readonly url: string;
  readonly altText: string | null;
  readonly width: number;
  readonly height: number;
}

interface ImageGalleryProps {
  readonly images: ReadonlyArray<GalleryImage>;
  readonly productTitle: string;
}

export function ImageGallery({ images, productTitle }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleThumbnailClick = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  if (images.length === 0) {
    return (
      <div className="aspect-square overflow-hidden rounded-lg bg-cream-dark">
        <div className="flex h-full w-full items-center justify-center">
          <span className="px-8 text-center font-heading text-xl text-charcoal-muted">
            {productTitle}
          </span>
        </div>
      </div>
    );
  }

  const selectedImage = images[selectedIndex];

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="group relative aspect-square overflow-hidden rounded-lg bg-cream-dark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={selectedImage.url}
          alt={selectedImage.altText ?? productTitle}
          width={selectedImage.width}
          height={selectedImage.height}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={image.url}
              type="button"
              onClick={() => handleThumbnailClick(index)}
              className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                index === selectedIndex
                  ? "border-green opacity-100"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.url}
                alt={image.altText ?? `${productTitle} thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
