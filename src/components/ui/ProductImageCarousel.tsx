"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { normalizeProductImages } from "@/lib/productImages";

export function ProductImageCarousel({
  images,
  fallbackImage,
  alt,
}: {
  images?: string[];
  fallbackImage: string;
  alt: string;
}) {
  const productImages = normalizeProductImages(images, fallbackImage);
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultipleImages = productImages.length > 1;

  useEffect(() => setActiveIndex(0), [images, fallbackImage]);

  return (
    <div className="group relative aspect-[16/10] overflow-hidden bg-brand-bg-alt">
      <img
        src={productImages[activeIndex] || fallbackImage}
        alt={`${alt} ${activeIndex + 1}`}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />
      {hasMultipleImages && (
        <>
          <button
            type="button"
            onClick={() => setActiveIndex((index) => (index - 1 + productImages.length) % productImages.length)}
            aria-label="Previous product image"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/55 p-2 text-white opacity-0 backdrop-blur-sm transition hover:bg-black/75 group-hover:opacity-100 focus:opacity-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setActiveIndex((index) => (index + 1) % productImages.length)}
            aria-label="Next product image"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/55 p-2 text-white opacity-0 backdrop-blur-sm transition hover:bg-black/75 group-hover:opacity-100 focus:opacity-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1.5 backdrop-blur-sm">
            {productImages.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show product image ${index + 1}`}
                className={`h-1.5 rounded-full transition-all ${index === activeIndex ? "w-5 bg-white" : "w-1.5 bg-white/55 hover:bg-white/80"}`}
              />
            ))}
          </div>
          <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
            {activeIndex + 1} / {productImages.length}
          </span>
        </>
      )}
    </div>
  );
}
