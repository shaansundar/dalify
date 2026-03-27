"use client";

import { useState, useCallback } from "react";
import { Upload, X, GripVertical } from "lucide-react";
import Image from "next/image";

export interface ProductImage {
  readonly id: string;
  readonly url: string;
  readonly altText: string;
}

interface ImageUploaderProps {
  readonly images: ReadonlyArray<ProductImage>;
  readonly onImagesChange: (images: ReadonlyArray<ProductImage>) => void;
  readonly maxImages?: number;
}

export function ImageUploader({
  images,
  onImagesChange,
  maxImages = 10,
}: ImageUploaderProps) {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      // File upload will be wired when Admin API image upload is implemented
    },
    [],
  );

  function handleRemove(id: string) {
    onImagesChange(images.filter((img) => img.id !== id));
  }

  function handleAltTextChange(id: string, altText: string) {
    onImagesChange(
      images.map((img) => (img.id === id ? { ...img, altText } : img)),
    );
  }

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-charcoal">Images</label>

      {/* Drop zone */}
      {images.length < maxImages && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-8 transition-colors ${
            dragOver
              ? "border-green bg-green-muted"
              : "border-cream-dark hover:border-charcoal-muted"
          }`}
        >
          <Upload className="mb-2 h-8 w-8 text-charcoal-muted" />
          <p className="text-sm text-charcoal-muted">
            Drag and drop images, or click to browse
          </p>
          <p className="mt-1 text-xs text-charcoal-muted">
            PNG, JPG, WEBP up to 20MB each
          </p>
        </div>
      )}

      {/* Image list */}
      {images.length > 0 && (
        <div className="space-y-2">
          {images.map((image) => (
            <div
              key={image.id}
              className="flex items-center gap-3 rounded-md border border-cream-dark bg-cream p-2"
            >
              <GripVertical className="h-4 w-4 shrink-0 cursor-grab text-charcoal-muted" />
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded">
                <Image
                  src={image.url}
                  alt={image.altText || "Product image"}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <input
                type="text"
                value={image.altText}
                onChange={(e) => handleAltTextChange(image.id, e.target.value)}
                placeholder="Alt text"
                className="flex-1 rounded border border-cream-dark bg-warm-white px-2 py-1 text-sm text-charcoal placeholder:text-charcoal-muted focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
              />
              <button
                onClick={() => handleRemove(image.id)}
                className="rounded p-1 text-charcoal-muted hover:bg-cream-dark hover:text-error"
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
