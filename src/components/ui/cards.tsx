import Link from "next/link";
import { cn } from "@/lib/utils";

export function FeatureCard({
  title,
  description,
  href,
  eyebrow,
  className,
}: {
  title: string;
  description: string;
  href?: string;
  eyebrow?: string;
  className?: string;
}) {
  const inner = (
    <>
      {eyebrow ? (
        <p className="text-xs font-semibold tracking-[0.22em] text-primary uppercase">{eyebrow}</p>
      ) : null}
      <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </>
  );

  const classes = cn(
    "group h-full rounded-2xl border border-border bg-card/80 p-6 transition duration-300 hover:border-primary/35 hover:shadow-[0_20px_50px_-28px_rgba(11,79,156,0.45)]",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={cn(classes, "focus-ring block")}>
        {inner}
      </Link>
    );
  }

  return <div className={classes}>{inner}</div>;
}

export function InsightCard({
  title,
  description,
  href,
  category,
  readingTime,
  date,
}: {
  title: string;
  description: string;
  href: string;
  category: string;
  readingTime: string;
  date: string;
}) {
  return (
    <Link
      href={href}
      className="focus-ring group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition hover:border-primary/35"
    >
      <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
        <span>{category}</span>
        <span className="text-muted-foreground">·</span>
        <span className="normal-case tracking-normal text-muted-foreground">{readingTime}</span>
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold tracking-tight transition group-hover:text-primary">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <time className="mt-6 text-xs text-muted-foreground" dateTime={date}>
        {new Date(date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </time>
    </Link>
  );
}
