import { cn } from "@/lib/utils";

export function Prose({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "prose prose-aurexus max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
