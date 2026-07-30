"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { megaMenu, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function Header() {
  const pathname = usePathname();
  return <HeaderChrome key={pathname} />;
}

function HeaderChrome() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open || Boolean(activeMenu);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "border-b border-border/50 bg-background/90 text-foreground shadow-sm backdrop-blur-xl"
          : "bg-transparent text-hero-foreground",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6 md:h-20">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-md">
          <Image
            src="/logos/aurexus-mark.png"
            alt=""
            width={40}
            height={40}
            className="h-9 w-9 object-contain md:h-10 md:w-10"
            priority
          />
          <span className="font-display text-sm font-semibold tracking-[0.22em] uppercase">
            {siteConfig.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {megaMenu.map((group) => (
            <div
              key={group.label}
              className="relative"
              onMouseEnter={() => setActiveMenu(group.label)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button
                type="button"
                className={cn(
                  "focus-ring inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm transition",
                  solid ? "text-foreground/75 hover:text-foreground" : "text-white/75 hover:text-white",
                  activeMenu === group.label && (solid ? "text-foreground" : "text-white"),
                )}
                aria-expanded={activeMenu === group.label}
                onClick={() =>
                  setActiveMenu((current) => (current === group.label ? null : group.label))
                }
              >
                {group.label}
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </button>
              {activeMenu === group.label ? (
                <div className="absolute left-0 top-full pt-3">
                  <div className="w-[28rem] rounded-2xl border border-border bg-card p-3 shadow-2xl">
                    <div className="grid gap-1">
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="rounded-xl px-4 py-3 transition hover:bg-secondary"
                          onClick={() => setActiveMenu(null)}
                        >
                          <p className="text-sm font-semibold text-foreground">{item.label}</p>
                          {item.description ? (
                            <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
                          ) : null}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
          <Link
            href="/bioaegix"
            className={cn(
              "focus-ring rounded-md px-3 py-2 text-sm transition",
              solid ? "text-foreground/75 hover:text-foreground" : "text-white/75 hover:text-white",
              pathname === "/bioaegix" && "font-semibold",
            )}
          >
            BioAegix
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className={cn(!solid && "border-white/20 text-white hover:bg-white/10")} />
          <Button
            asChild
            size="sm"
            variant={solid ? "default" : "light"}
            className="hidden sm:inline-flex"
          >
            <Link href="/contact">Contact</Link>
          </Button>
          <button
            type="button"
            className={cn(
              "focus-ring inline-flex h-10 w-10 items-center justify-center rounded-lg lg:hidden",
              solid ? "text-foreground" : "text-white",
            )}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="max-h-[80vh] overflow-y-auto border-t border-border bg-background px-6 py-4 text-foreground lg:hidden"
          aria-label="Mobile"
        >
          {megaMenu.map((group) => (
            <div key={group.label} className="mb-4">
              <p className="px-3 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                {group.label}
              </p>
              <ul className="mt-2">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-lg px-3 py-2.5 text-sm hover:bg-secondary"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Link
            href="/contact"
            className="mt-2 block rounded-lg bg-primary px-3 py-3 text-center text-sm font-semibold text-primary-foreground"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
