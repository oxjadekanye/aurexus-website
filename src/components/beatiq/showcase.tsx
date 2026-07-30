"use client";

import Image from "next/image";
import { FadeIn } from "@/components/motion/fade-in";
import { BeatiqLightbox } from "@/components/beatiq/lightbox";
import { beatiq } from "@/lib/beatiq";

export function BeatiqShowcases() {
  return (
    <div className="space-y-20 md:space-y-28">
      {beatiq.showcases.map((item, index) => {
        const imageLeft = index % 2 === 1;
        return (
          <div
            key={item.id}
            id={item.id}
            className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
          >
            <FadeIn className={imageLeft ? "lg:order-1" : "lg:order-2"}>
              <BeatiqLightbox image={item.image}>
                {(open) => (
                  <button
                    type="button"
                    onClick={open}
                    className="group focus-ring relative mx-auto block w-full max-w-[22rem] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-[0_30px_90px_-40px_rgba(168,85,247,0.65)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-fuchsia-400/35 hover:shadow-[0_40px_110px_-36px_rgba(249,115,22,0.45)]"
                    aria-label={`Enlarge ${item.image.alt}`}
                  >
                    <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-linear-to-br from-fuchsia-500/10 via-transparent to-orange-400/10 opacity-0 transition group-hover:opacity-100" />
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      width={item.image.width}
                      height={item.image.height}
                      className="relative h-auto w-full rounded-[1.5rem] object-cover"
                      sizes="(max-width: 1024px) 80vw, 352px"
                      loading="lazy"
                    />
                  </button>
                )}
              </BeatiqLightbox>
            </FadeIn>
            <FadeIn delay={0.08} className={imageLeft ? "lg:order-2" : "lg:order-1"}>
              <p className="text-xs font-semibold tracking-[0.28em] text-fuchsia-300 uppercase">
                {item.eyebrow}
              </p>
              <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-white/70 md:text-lg">
                {item.body}
              </p>
              <p className="mt-5 text-xs tracking-[0.16em] text-white/40 uppercase">
                {item.previewNote}
              </p>
            </FadeIn>
          </div>
        );
      })}
    </div>
  );
}
