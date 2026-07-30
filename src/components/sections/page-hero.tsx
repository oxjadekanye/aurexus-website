import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  headline: string;
  description?: string;
  dark?: boolean;
  actions?: { href: string; label: string; external?: boolean; variant?: "primary" | "secondary" }[];
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  headline,
  description,
  dark = true,
  actions,
  className,
}: PageHeroProps) {
  return (
    <section
      aria-labelledby="page-hero-heading"
      className={cn(
        "relative overflow-hidden",
        dark ? "surface-mesh text-white" : "surface-panel text-foreground",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-silver/10 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-32 md:pb-28 md:pt-40">
        {eyebrow ? (
          <p
            className={cn(
              "mb-4 text-xs font-semibold uppercase tracking-[0.28em]",
              dark ? "text-silver" : "text-primary",
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <p className="sr-only">{title}</p>
        <h1
          id="page-hero-heading"
          className="font-display max-w-4xl text-4xl font-semibold tracking-tight text-balance md:text-5xl lg:text-6xl"
        >
          {headline}
        </h1>
        {description ? (
          <p
            className={cn(
              "mt-6 max-w-2xl text-lg leading-relaxed md:text-xl",
              dark ? "text-white/75" : "text-muted-foreground",
            )}
          >
            {description}
          </p>
        ) : null}
        {actions?.length ? (
          <div className="mt-10 flex flex-wrap gap-3">
            {actions.map((action) => (
              <Button
                key={action.label}
                asChild
                size="lg"
                variant={
                  action.variant === "secondary"
                    ? dark
                      ? "lightOutline"
                      : "outline"
                    : dark
                      ? "light"
                      : "default"
                }
              >
                {action.external ? (
                  <a href={action.href} target="_blank" rel="noopener noreferrer">
                    {action.label}
                  </a>
                ) : (
                  <Link href={action.href}>{action.label}</Link>
                )}
              </Button>
            ))}
          </div>
        ) : null}
      </div>
      <div className="metal-line h-px w-full opacity-70" />
    </section>
  );
}
