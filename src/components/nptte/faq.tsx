export function NptteFaq({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-border rounded-3xl border border-border bg-card/60">
      {items.map((item) => (
        <details key={item.q} className="group px-5 py-4 md:px-6">
          <summary className="focus-ring cursor-pointer list-none rounded-lg font-display text-lg font-semibold tracking-tight marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="flex items-start justify-between gap-4">
              {item.q}
              <span
                aria-hidden
                className="mt-1 text-primary transition group-open:rotate-45"
              >
                +
              </span>
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
