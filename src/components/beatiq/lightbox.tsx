"use client";

import { useCallback, useEffect, useId, useState, type ReactNode } from "react";
import Image from "next/image";
import { X } from "lucide-react";

type LightboxImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export function BeatiqLightbox({
  image,
  children,
}: {
  image: LightboxImage;
  children: (open: () => void) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  const close = useCallback(() => setOpen(false), []);
  const openModal = useCallback(() => setOpen(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [close, open]);

  return (
    <>
      {children(openModal)}
      {open ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="focus-ring absolute top-4 right-4 rounded-full border border-white/20 bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Close image preview"
          >
            <X className="h-5 w-5" />
          </button>
          <p id={titleId} className="sr-only">
            {image.alt}
          </p>
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-[1.5rem] border border-white/15 bg-black shadow-[0_40px_120px_-30px_rgba(168,85,247,0.55)]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="mx-auto h-auto max-h-[90vh] w-auto object-contain"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
