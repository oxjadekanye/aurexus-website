import Image from "next/image";
import Link from "next/link";
import { footerNav, legalLinks, siteConfig } from "@/lib/site";
import { CookieSettingsButton } from "@/components/consent/cookie-consent";

export function Footer() {
  const primaryLegal = legalLinks.filter((l) =>
    ["/legal/privacy-policy", "/legal/cookie-policy", "/legal/terms-of-use", "/legal/accessibility", "/legal/disclaimer"].includes(
      l.href,
    ),
  );

  return (
    <footer className="border-t border-border bg-navy text-hero-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="focus-ring inline-flex items-center gap-3 rounded-md">
            <Image
              src="/logos/aurexus-mark.png"
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
            />
            <span className="font-display text-sm font-semibold tracking-[0.22em] uppercase">
              {siteConfig.shortName}
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
            {siteConfig.tagline}. Engineering intelligent transformation across industries.
          </p>
          <p className="mt-6 text-xs leading-relaxed text-white/45">
            {siteConfig.name}
            <br />
            Company Number: {siteConfig.companyNumber}
            <br />
            Registered in England and Wales
            <br />
            {siteConfig.address.line1}
            <br />
            {siteConfig.address.line2}
            <br />
            {siteConfig.address.line3}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <span className="inline-flex h-10 items-center justify-center rounded-lg border border-white/15 px-3 text-xs font-semibold tracking-wide text-white/45">
              LinkedIn — coming soon
            </span>
          </div>
        </div>

        {(
          [
            ["Company", footerNav.company],
            ["Solutions", footerNav.solutions],
            ["Trust & Legal", footerNav.trust],
          ] as const
        ).map(([title, links]) => (
          <div key={title}>
            <p className="text-xs font-semibold tracking-[0.22em] text-silver uppercase">{title}</p>
            <ul className="mt-4 space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/65 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="metal-line h-px w-full opacity-50" />
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved. BioAegix™ · The
            Aurexus Method™
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/45">
            {primaryLegal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton className="hover:text-white" />
            </li>
            <li>
              <Link href="/trust" className="hover:text-white">
                Trust Centre
              </Link>
            </li>
            <li>
              <Link href="/legal/privacy-policy" className="hover:text-white">
                All policies
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
