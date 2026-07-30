"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { nptte } from "@/lib/nptte";

function useCountUp(target: number, active: boolean, duration = 1200) {
  const [value, setValue] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!active) return;

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      if (reduce) {
        setValue(target);
        return;
      }
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, duration, reduce, target]);

  return value;
}

function StatItem({
  value,
  suffix,
  label,
  active,
}: {
  value: number;
  suffix: string;
  label: string;
  active: boolean;
}) {
  const shown = useCountUp(value, active);
  return (
    <div className="border-t border-white/15 pt-6">
      <p className="font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
        {shown}
        {suffix}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-white/65">{label}</p>
    </div>
  );
}

export function NptteAnimatedStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setActive(true);
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {nptte.stats.map((stat) => (
        <StatItem
          key={stat.label}
          value={stat.value}
          suffix={stat.suffix}
          label={stat.label}
          active={active}
        />
      ))}
    </div>
  );
}
