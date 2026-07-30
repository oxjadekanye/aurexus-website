import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/sections/section";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fade-in";
import { CtaBand } from "@/components/sections/cta-band";
import { Button } from "@/components/ui/button";
import { BeatiqShowcases } from "@/components/beatiq/showcase";
import { beatiq } from "@/lib/beatiq";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "BeatIQ — AI-Powered Offline Music Intelligence | Aurexus Group",
  description: beatiq.seoDescription,
  alternates: { canonical: "/beatiq" },
  openGraph: {
    title: "BeatIQ — AI-Powered Offline Music Intelligence | Aurexus Group",
    description: beatiq.seoDescription,
    url: `${siteConfig.url}/beatiq`,
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: beatiq.heroImage.src,
        width: beatiq.heroImage.width,
        height: beatiq.heroImage.height,
        alt: beatiq.heroImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BeatIQ — AI-Powered Offline Music Intelligence | Aurexus Group",
    description: beatiq.seoDescription,
    images: [beatiq.heroImage.src],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: beatiq.name,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Android",
  description: beatiq.description,
  url: `${siteConfig.url}/beatiq`,
  image: `${siteConfig.url}${beatiq.heroImage.src}`,
  slogan: beatiq.tagline,
  provider: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email.general,
  },
  sameAs: [beatiq.url],
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/PreOrder",
    description: "Product updates and partnership enquiries for BeatIQ",
  },
};

export default function BeatiqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative min-h-[100svh] overflow-hidden bg-[#07060b] text-white">
        <Image
          src={beatiq.heroImage.src}
          alt={beatiq.heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%] opacity-55"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#07060b] via-[#07060b]/88 to-[#07060b]/35" />
        <div className="absolute inset-0 bg-linear-to-t from-[#07060b] via-transparent to-[#07060b]/50" />
        <div className="pointer-events-none absolute -left-16 top-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-10 h-80 w-80 rounded-full bg-orange-500/15 blur-3xl" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-6 pb-16 pt-32 md:justify-center md:pb-24 md:pt-40">
          <FadeIn className="max-w-3xl">
            <div className="mb-6 flex items-center gap-4">
              <Image
                src={beatiq.logo.src}
                alt={beatiq.logo.alt}
                width={56}
                height={56}
                className="h-12 w-12 object-contain md:h-14 md:w-14"
                priority
              />
              <div>
                <p className="text-xs font-semibold tracking-[0.28em] text-fuchsia-300 uppercase">
                  {beatiq.eyebrow}
                </p>
                <p className="mt-1 font-display text-sm font-semibold tracking-[0.18em] uppercase">
                  {beatiq.name}
                </p>
              </div>
            </div>
            <h1 className="font-display text-5xl font-semibold tracking-tight text-balance sm:text-6xl md:text-7xl">
              {beatiq.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
              {beatiq.supporting}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="light">
                <a href="#overview">Explore BeatIQ</a>
              </Button>
              <Button asChild size="lg" variant="lightOutline">
                <a href={beatiq.url} target="_blank" rel="noopener noreferrer">
                  Visit BeatIQ
                </a>
              </Button>
              <Button asChild size="lg" variant="lightOutline">
                <Link href="/contact">Partner With Us</Link>
              </Button>
            </div>
            <p className="mt-8 text-sm text-white/55">
              Product site:{" "}
              <a
                className="font-semibold text-fuchsia-200 underline-offset-4 hover:underline"
                href={beatiq.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {beatiq.displayUrl}
              </a>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Overview */}
      <Section id="overview" dark>
        <SectionHeader
          light
          eyebrow="Product overview"
          title={beatiq.overview.title}
          description={beatiq.overview.body}
        />
        <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {beatiq.overview.pillars.map((pillar) => (
            <StaggerItem key={pillar}>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-medium text-white/85 backdrop-blur-sm">
                {pillar}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Why */}
      <Section id="why-beatiq">
        <SectionHeader
          eyebrow="Why BeatIQ"
          title={beatiq.why.title}
          description={beatiq.why.intro}
        />
        <Stagger className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {beatiq.why.problems.map((problem) => (
            <StaggerItem key={problem}>
              <div className="h-full rounded-2xl border border-border bg-card/70 px-4 py-4 text-sm font-medium">
                {problem}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <FadeIn>
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {beatiq.why.answer}
          </p>
        </FadeIn>
      </Section>

      {/* Visual showcases */}
      <section className="relative overflow-hidden bg-[#07060b] py-20 text-white md:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-24 left-1/4 h-64 w-64 rounded-full bg-fuchsia-600/15 blur-3xl" />
          <div className="absolute right-10 bottom-32 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6">
          <FadeIn className="mb-16 max-w-3xl md:mb-20">
            <p className="mb-3 text-xs font-semibold tracking-[0.28em] text-fuchsia-300 uppercase">
              Product experience
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              Designed for the way people actually listen
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/65">
              Explore representative BeatIQ product previews across home, playback, discovery,
              offline listening and personal library experiences.
            </p>
          </FadeIn>
          <BeatiqShowcases />
        </div>
      </section>

      {/* Offline + library */}
      <Section id="offline-library">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="Premium offline experience"
              title={beatiq.offline.title}
              description={beatiq.offline.body}
            />
            <ul className="space-y-2 text-sm text-muted-foreground md:text-base">
              {beatiq.offline.themes.map((theme) => (
                <li key={theme} className="border-t border-border pt-3">
                  {theme}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader
              eyebrow="Intelligent music library"
              title={beatiq.library.title}
              description={beatiq.library.body}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card/80 p-5">
                <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  Before
                </p>
                <p className="mt-3 font-mono text-sm text-muted-foreground">{beatiq.library.before}</p>
              </div>
              <div className="rounded-2xl border border-fuchsia-500/30 bg-fuchsia-500/5 p-5">
                <p className="text-xs font-semibold tracking-[0.2em] text-fuchsia-600 uppercase dark:text-fuchsia-300">
                  After
                </p>
                <p className="mt-3 text-lg font-semibold">{beatiq.library.afterTitle}</p>
                <p className="text-sm text-muted-foreground">{beatiq.library.afterArtist}</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">{beatiq.library.note}</p>
          </div>
        </div>
      </Section>

      {/* Player + search */}
      <Section id="player-search" dark>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader light eyebrow="Player experience" title={beatiq.player.title} />
            <p className="text-base leading-relaxed text-white/70">{beatiq.player.body}</p>
          </div>
          <div>
            <SectionHeader light eyebrow="Smart search" title={beatiq.search.title} />
            <p className="text-base leading-relaxed text-white/70">{beatiq.search.body}</p>
          </div>
        </div>
      </Section>

      {/* Intelligence */}
      <Section id="intelligence">
        <SectionHeader
          eyebrow="Future AI music intelligence"
          title={beatiq.intelligence.title}
          description={beatiq.intelligence.intro}
        />
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {beatiq.intelligence.planned.map((item) => (
            <StaggerItem key={item.title}>
              <article className="h-full rounded-2xl border border-border bg-card/70 p-5">
                <p className="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
                  Planned / in development
                </p>
                <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Vision */}
      <Section id="vision" dark>
        <SectionHeader
          light
          eyebrow="Find Every Beat vision"
          title={beatiq.vision.title}
          description={beatiq.vision.body}
        />
        <FadeIn>
          <p className="max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6 text-sm leading-relaxed text-white/70 md:text-base">
            {beatiq.vision.safe}
          </p>
        </FadeIn>
      </Section>

      {/* Privacy */}
      <Section id="privacy">
        <SectionHeader
          eyebrow="Privacy and offline-first"
          title={beatiq.privacy.title}
          description={beatiq.privacy.note}
        />
        <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {beatiq.privacy.points.map((point) => (
            <StaggerItem key={point}>
              <div className="h-full rounded-2xl border border-border bg-card/70 px-5 py-4 text-sm font-medium leading-relaxed">
                {point}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Who */}
      <Section id="who" dark>
        <SectionHeader
          light
          eyebrow="Who it is for"
          title="Built for listeners who want more from their music"
          description="BeatIQ is designed for people who care about ownership, clarity and uninterrupted listening—whether offline, on the move or deep into a large personal collection."
        />
        <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {beatiq.audiences.map((audience) => (
            <StaggerItem key={audience}>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-medium text-white/80">
                {audience}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Roadmap */}
      <Section id="roadmap">
        <SectionHeader
          eyebrow="Product evolution"
          title="A clear public roadmap—without proprietary delivery detail"
          description="BeatIQ evolves in layers. Exact schedules and internal delivery sequencing remain confidential."
        />
        <ol className="relative space-y-0 border-l border-border pl-8">
          {beatiq.roadmap.map((step, index) => (
            <li key={step.phase} className="relative pb-10 last:pb-0">
              <span
                aria-hidden
                className="absolute -left-[2.4rem] top-1 flex h-7 w-7 items-center justify-center rounded-full border border-fuchsia-400/40 bg-background text-xs font-semibold text-fuchsia-600 dark:text-fuchsia-300"
              >
                {index + 1}
              </span>
              <h3 className="font-display text-xl font-semibold tracking-tight">{step.phase}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* CTA contact */}
      <Section id="join">
        <div className="rounded-[2rem] border border-border bg-card/80 p-8 md:p-12">
          <p className="text-xs font-semibold tracking-[0.28em] text-primary uppercase">
            Calls to action
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Follow BeatIQ. Partner with Aurexus.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Visit the BeatIQ product site, join product-update conversations, explore partnership
            opportunities, or contact Aurexus Group Ltd for early-access discussions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={beatiq.url} target="_blank" rel="noopener noreferrer">
                Visit BeatIQ
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Join Early Access / Updates</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/partnerships">Partnership Enquiries</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            General Aurexus enquiries:{" "}
            <a
              className="font-semibold text-primary underline-offset-4 hover:underline"
              href={`mailto:${siteConfig.email.general}?subject=${encodeURIComponent("BeatIQ enquiry")}`}
            >
              {siteConfig.email.general}
            </a>
          </p>
        </div>
      </Section>

      <CtaBand
        title="Find Every Beat with BeatIQ"
        description="A premium offline-first music intelligence product from Aurexus Group Ltd—built for private libraries, beautiful playback and a future-ready discovery layer."
        primary={{ href: "/contact", label: "Contact Aurexus" }}
        secondary={{ href: "/solutions", label: "All solutions" }}
      />
    </>
  );
}
