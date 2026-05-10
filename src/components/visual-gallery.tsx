"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

type Visual = {
  src: string;
  alt: string;
  caption: string;
};

type VisualGalleryProps = {
  visuals: Visual[];
  gridClassName?: string;
};

export default function VisualGallery({
  visuals,
  gridClassName = "grid gap-5",
}: VisualGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeVisual = activeIndex === null ? null : visuals[activeIndex];
  const hasMultipleVisuals = visuals.length > 1;

  useEffect(() => {
    if (activeIndex === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowLeft" && hasMultipleVisuals) {
        setActiveIndex((current) => {
          if (current === null) return current;
          return (current - 1 + visuals.length) % visuals.length;
        });
      }

      if (event.key === "ArrowRight" && hasMultipleVisuals) {
        setActiveIndex((current) => {
          if (current === null) return current;
          return (current + 1) % visuals.length;
        });
      }
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, hasMultipleVisuals, visuals.length]);

  function showPrevious() {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current - 1 + visuals.length) % visuals.length;
    });
  }

  function showNext() {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current + 1) % visuals.length;
    });
  }

  const modal =
    activeVisual &&
    typeof document !== "undefined" &&
    createPortal(
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Expanded image"
        className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/80 p-4 backdrop-blur-sm"
        onMouseDown={() => setActiveIndex(null)}
      >
        <div
          className="relative flex max-h-[92vh] w-full max-w-7xl flex-col"
          onMouseDown={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label="Close expanded image"
            className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-stone-950/75 text-white transition hover:bg-white hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-white/70"
          >
            <X className="h-5 w-5" />
          </button>

          {hasMultipleVisuals && (
            <>
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Show previous image"
                className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-stone-950/75 text-white transition hover:bg-white hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-white/70"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={showNext}
                aria-label="Show next image"
                className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-stone-950/75 text-white transition hover:bg-white hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-white/70"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <div className="overflow-hidden rounded-[1.75rem] border border-white/15 bg-black shadow-2xl">
            <Image
              src={activeVisual.src}
              alt={activeVisual.alt}
              width={1600}
              height={900}
              className="max-h-[78vh] w-full object-contain"
              sizes="100vw"
              priority
            />
          </div>

          <div className="mt-4 rounded-[1.25rem] border border-white/10 bg-stone-950/75 px-5 py-4 text-sm leading-7 text-stone-100">
            {activeVisual.caption}
          </div>
        </div>
      </div>,
      document.body,
    );

  return (
    <>
      <div className={gridClassName}>
        {visuals.map((visual, index) => (
          <figure key={visual.src}>
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Expand image: ${visual.alt}`}
              className="group block w-full cursor-zoom-in text-left focus:outline-none focus:ring-2 focus:ring-stone-950/30"
            >
              <div className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-stone-100">
                <Image
                  src={visual.src}
                  alt={visual.alt}
                  width={1600}
                  height={900}
                  className="h-auto w-full transition duration-300 group-hover:scale-[1.01]"
                  sizes="(max-width: 768px) 100vw, 1152px"
                />
              </div>
            </button>

            <figcaption className="mt-3 text-sm leading-7 text-stone-600">
              {visual.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {modal}
    </>
  );
}