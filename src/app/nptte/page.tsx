import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/sections/section";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fade-in";
import { CtaBand } from "@/components/sections/cta-band";
import { Button } from "@/components/ui/button";
import { NptteAnimatedStats } from "@/components/nptte/animated-stats";
import { NptteFaq } from "@/components/nptte/faq";
import { nptte } from "@/lib/nptte";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "NPTTE PharmaNG | National Pharmaceutical Traceability & Enforcement",
  description: nptte.seoDescription,
  alternates: { canonical: "/nptte" },
  openGraph: {
    title: "NPTTE PharmaNG | National Pharmaceutical Traceability & Enforcement",
    description: nptte.seoDescription,
    url: `${siteConfig.url}/nptte`,
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: nptte.images.hero.src,
        width: nptte.images.hero.width,
        height: nptte.images.hero.height,
        alt: nptte.images.hero.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NPTTE PharmaNG | National Pharmaceutical Traceability & Enforcement",
    description: nptte.seoDescription,
    images: [nptte.images.hero.src],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: nptte.name,
  applicationCategory: "HealthApplication",
  operatingSystem: "Web, Mobile",
  description: nptte.description,
  url: `${siteConfig.url}/nptte`,
  image: `${siteConfig.url}${nptte.images.hero.src}`,
  provider: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email.general,
  },
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/PreOrder",
    description: "National pharmaceutical digital infrastructure partnership enquiries",
  },
};

export default function NpttePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative min-h-[100svh] overflow-hidden bg-navy text-white">
        <Image
          src={nptte.images.hero.src}
          alt={nptte.images.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-r from-navy via-navy/88 to-navy/45" />
        <div className="absolute inset-0 bg-linear-to-t from-navy via-transparent to-navy/40" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-6 pb-16 pt-32 md:justify-center md:pb-24 md:pt-40">
          <FadeIn className="max-w-3xl">
            <div className="mb-6 flex items-center gap-4">
              <Image
                src={nptte.images.logo.src}
                alt={nptte.images.logo.alt}
                width={64}
                height={64}
                className="h-14 w-14 object-contain md:h-16 md:w-16"
                priority
              />
              <div>
                <p className="text-xs font-semibold tracking-[0.28em] text-emerald-300 uppercase">
                  {nptte.eyebrow}
                </p>
                <p className="mt-1 font-display text-sm font-semibold tracking-[0.18em] text-white uppercase">
                  {nptte.name}
                </p>
              </div>
            </div>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
              {nptte.headline}
            </h1>
            <p className="mt-4 text-lg font-medium text-emerald-200/95 md:text-xl">
              {nptte.tagline}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
              {nptte.description}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="light">
                <Link href="/contact">Partner with Aurexus</Link>
              </Button>
              <Button asChild size="lg" variant="lightOutline">
                <a href="#platform-overview">Explore the platform</a>
              </Button>
            </div>
            <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-emerald-200 uppercase">
              <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
              Sovereign national infrastructure
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Platform overview */}
      <Section id="platform-overview">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionHeader
              eyebrow="Platform overview"
              title={nptte.fullName}
              description={nptte.overview}
            />
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
              Built for ministries, regulators, customs and border agencies, manufacturers,
              importers, hospital groups, pharmacy networks, healthcare professionals and
              international partners who need pharmaceutical systems they can trust at national
              scale.
            </p>
          </div>
          <FadeIn delay={0.08}>
            <div className="overflow-hidden rounded-[1.75rem] border border-border bg-navy shadow-[0_30px_80px_-40px_rgba(7,17,31,0.85)]">
              <Image
                src={nptte.images.mobile.src}
                alt={nptte.images.mobile.alt}
                width={nptte.images.mobile.width}
                height={nptte.images.mobile.height}
                className="h-auto w-full object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 520px"
              />
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Why */}
      <Section id="why-nptte" dark>
        <SectionHeader
          light
          eyebrow="Why NPTTE PharmaNG"
          title={nptte.why.title}
          description={nptte.why.body}
        />
        <Stagger className="grid gap-6 md:grid-cols-2">
          {nptte.why.pillars.map((pillar) => (
            <StaggerItem key={pillar.title}>
              <div className="h-full border-t border-emerald-400/25 pt-6">
                <h3 className="font-display text-xl font-semibold tracking-tight">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70 md:text-base">
                  {pillar.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Challenges */}
      <Section id="national-challenges">
        <SectionHeader
          eyebrow="National challenges"
          title="The cost of fragmented pharmaceutical visibility"
          description="Nigeria’s pharmaceutical environment is strategically important and operationally complex. NPTTE PharmaNG responds to systemic challenges that no single application can solve alone."
        />
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {nptte.challenges.map((item) => (
            <StaggerItem key={item.title}>
              <article className="h-full rounded-2xl border border-border bg-card/70 p-5">
                <h3 className="font-display text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Capabilities + feature image */}
      <Section id="capabilities" dark>
        <SectionHeader
          light
          eyebrow="Key platform capabilities"
          title="Powerful tools for every role"
          description="Built for pharmacies, regulators and citizens—designed to support national pharmaceutical confidence online and in the field."
        />
        <FadeIn className="mb-12 overflow-hidden rounded-[1.75rem] border border-white/10">
          <Image
            src={nptte.images.roles.src}
            alt={nptte.images.roles.alt}
            width={nptte.images.roles.width}
            height={nptte.images.roles.height}
            className="h-auto w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 1152px"
          />
        </FadeIn>
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {nptte.capabilities.map((capability) => (
            <StaggerItem key={capability.title}>
              <article className="h-full rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <p className="text-[11px] font-semibold tracking-[0.2em] text-emerald-300 uppercase">
                  {capability.imageHint}
                </p>
                <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
                  {capability.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{capability.body}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Mobile showcase */}
      <Section id="mobile-showcase">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <SectionHeader
              eyebrow="Mobile showcase"
              title="Secure. Intelligent. Always connected."
              description="A national operations experience designed for citizen verification, authorised staff access, recall awareness and public reporting—presented here as an illustrative product interface."
            />
            <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              <li>Citizen medicine verification journeys</li>
              <li>Authorised staff and institutional access</li>
              <li>Emergency recall communication</li>
              <li>Suspicious medicine reporting for public protection</li>
            </ul>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="overflow-hidden rounded-[1.75rem] border border-border bg-navy">
              <Image
                src={nptte.images.connected.src}
                alt={nptte.images.connected.alt}
                width={nptte.images.connected.width}
                height={nptte.images.connected.height}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Trusted infrastructure */}
      <Section id="trusted-infrastructure" dark>
        <SectionHeader
          light
          eyebrow="Trusted digital infrastructure"
          title="Government-grade foundations for national trust"
          description="NPTTE PharmaNG is positioned as secure, sovereign and interoperable digital public infrastructure—engineered for institutions that cannot compromise on accountability."
        />
        <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {nptte.infrastructure.map((item) => (
            <StaggerItem key={item.title}>
              <article className="h-full rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-display text-xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{item.body}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* AI */}
      <Section id="ai-intelligence">
        <SectionHeader
          eyebrow="AI-enabled intelligence"
          title="Intelligence that supports institutional judgement"
          description="Responsible AI within NPTTE PharmaNG is intended to help authorised teams recognise patterns, prioritise attention and strengthen national pharmaceutical awareness. It is decision support—not autonomous control."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Oversight awareness",
              body: "Help regulators and operators focus attention where public-safety risk and compliance pressure are highest.",
            },
            {
              title: "Operational clarity",
              body: "Surface clearer pharmaceutical signals across verification, recalls and authorised ecosystem activity.",
            },
            {
              title: "Human accountability",
              body: "Preserve institutional responsibility. AI assists; authorised professionals and agencies decide.",
            },
          ].map((item) => (
            <FadeIn key={item.title}>
              <article className="h-full border-t border-primary/25 pt-6">
                <h3 className="font-display text-xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Stakeholders */}
      <Section id="who-it-serves" dark>
        <SectionHeader
          light
          eyebrow="Who it serves"
          title="One national ecosystem. Many trusted roles."
          description="NPTTE PharmaNG is designed as a multi-stakeholder platform spanning public institutions, industry operators, care providers and citizens."
        />
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {nptte.stakeholders.map((item) => (
            <StaggerItem key={item.group}>
              <article className="h-full rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-display text-lg font-semibold tracking-tight">{item.group}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{item.body}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* National impact + stats */}
      <Section id="national-impact" dark>
        <SectionHeader
          light
          eyebrow="National impact"
          title="Public benefit at national scale"
          description="The platform is designed to create measurable public value across healthcare safety, regulatory effectiveness, market integrity and national resilience."
        />
        <div className="mb-14">
          <NptteAnimatedStats />
        </div>
        <Stagger className="grid gap-6 md:grid-cols-2">
          {nptte.benefits.map((item) => (
            <StaggerItem key={item.title}>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-display text-xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{item.body}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Journey timeline */}
      <Section id="national-journey">
        <SectionHeader
          eyebrow="National journey"
          title="From shared ambition to enduring public value"
          description="A strategic pathway for institutions seeking transformational pharmaceutical governance—without publishing proprietary delivery playbooks."
        />
        <ol className="relative space-y-0 border-l border-border pl-8">
          {nptte.journey.map((step, index) => (
            <li key={step.phase} className="relative pb-10 last:pb-0">
              <span
                aria-hidden
                className="absolute -left-[2.4rem] top-1 flex h-7 w-7 items-center justify-center rounded-full border border-primary/40 bg-background text-xs font-semibold text-primary"
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

      {/* Interoperability + governance */}
      <Section id="interoperability-governance" dark>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              light
              eyebrow="Interoperability"
              title="Designed for a connected national ecosystem"
              description="NPTTE PharmaNG is positioned to help authorised systems and organisations participate in one coherent pharmaceutical evidence environment—reducing fragmentation without forcing every actor onto a single narrow tool."
            />
          </div>
          <div>
            <SectionHeader
              light
              eyebrow="Security & governance"
              title="Trustworthy by institutional design"
              description="National pharmaceutical infrastructure must protect sensitive information, respect lawful purpose and preserve auditability. Aurexus approaches NPTTE PharmaNG with enterprise security, responsible AI and governance discipline as first principles."
            />
          </div>
        </div>
      </Section>

      {/* Commercial */}
      <Section id="partner">
        <SectionHeader
          eyebrow="Partner with us"
          title={nptte.commercial.title}
          description={nptte.commercial.body}
        />
        <Stagger className="mb-10 grid gap-4 md:grid-cols-2">
          {nptte.commercial.points.map((point) => (
            <StaggerItem key={point}>
              <div className="rounded-2xl border border-border bg-card/70 px-5 py-4 text-sm font-medium leading-relaxed">
                {point}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/contact">Request a strategic discussion</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/partnerships">Explore partnerships</Link>
          </Button>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <SectionHeader
          eyebrow="Frequently asked questions"
          title="Clear answers for institutional stakeholders"
          description="Executive guidance for governments, regulators, industry partners and development collaborators evaluating NPTTE PharmaNG."
        />
        <NptteFaq items={nptte.faq} />
      </Section>

      {/* Contact strip */}
      <Section id="contact-nptte">
        <div className="rounded-[2rem] border border-border bg-card/80 p-8 md:p-12">
          <p className="text-xs font-semibold tracking-[0.28em] text-primary uppercase">Contact</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Speak with Aurexus about NPTTE PharmaNG
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            For federal institutions, regulators, manufacturers, hospital groups, pharmacy networks
            and international partners, contact Aurexus Group Ltd to discuss national collaboration.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Go to contact form</Link>
            </Button>
            <a
              className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
              href={`mailto:${siteConfig.email.general}?subject=${encodeURIComponent("NPTTE PharmaNG enquiry")}`}
            >
              {siteConfig.email.general}
            </a>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Build national pharmaceutical trust with Aurexus"
        description="NPTTE PharmaNG is ready for serious institutional dialogue—focused on public safety, regulatory confidence and scalable digital transformation."
        primary={{ href: "/contact", label: "Contact Aurexus" }}
        secondary={{ href: "/solutions", label: "All solutions" }}
      />
    </>
  );
}
