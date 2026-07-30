"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fade-in";
import { Section, SectionHeader } from "@/components/sections/section";
import { CtaBand } from "@/components/sections/cta-band";
import { InsightCard } from "@/components/ui/cards";
import { home, solutions } from "@/lib/content";
import { siteConfig } from "@/lib/site";

type InsightTeaser = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingTime: string;
  date: string;
};

export function HomePage({ insights = [] }: { insights?: InsightTeaser[] }) {
  const reduce = useReducedMotion();

  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden surface-mesh text-white">
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            aria-hidden
            className="absolute -left-24 top-16 h-[28rem] w-[28rem] rounded-full bg-accent/30 blur-3xl"
            animate={reduce ? undefined : { opacity: [0.35, 0.55, 0.35], scale: [1, 1.08, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute bottom-0 right-0 h-[32rem] w-[32rem] rounded-full bg-primary/25 blur-3xl"
            animate={reduce ? undefined : { opacity: [0.25, 0.45, 0.25], x: [0, -20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        </div>

        <motion.div
          aria-hidden
          initial={reduce ? false : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 0.22, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <Image
            src="/logos/aurexus-mark.png"
            alt=""
            width={960}
            height={960}
            priority
            className="h-[min(88vw,42rem)] w-[min(88vw,42rem)] object-contain opacity-90"
          />
        </motion.div>
        <div className="absolute inset-0 bg-linear-to-r from-navy via-navy/80 to-navy/35" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl items-center px-6 pb-20 pt-28">
          <div className="max-w-2xl">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-display text-4xl font-semibold tracking-[0.18em] text-white uppercase sm:text-5xl md:text-6xl"
            >
              {home.brand}
            </motion.p>
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.12 }}
              className="mt-6 text-2xl font-medium tracking-tight text-white/90 text-balance sm:text-3xl md:text-4xl"
            >
              {home.headline}
            </motion.h1>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.22 }}
              className="mt-5 max-w-lg text-base leading-relaxed text-white/65 md:text-lg"
            >
              {home.support}
            </motion.p>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.32 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <Button asChild size="xl" variant="light">
                <Link href={home.primaryCta.href}>
                  {home.primaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="lightOutline">
                <Link href={home.secondaryCta.href}>{home.secondaryCta.label}</Link>
              </Button>
            </motion.div>
          </div>
        </div>
        <div className="metal-line absolute inset-x-0 bottom-0 h-px opacity-60" />
      </section>

      <Section>
        <SectionHeader
          eyebrow="Who we are"
          title="Aurexus Group Ltd — parent technology company"
          description="Aurexus researches, engineers, develops and operates intelligent software ecosystems across multiple industries. We develop responsible digital ecosystems in which people, processes, data, governance and technology work together to achieve defined organisational outcomes."
        />
        <Stagger className="grid gap-8 md:grid-cols-3">
          {home.pillars.map((pillar) => (
            <StaggerItem key={pillar.title}>
              <div className="h-full border-t border-primary/25 pt-6">
                <h3 className="font-display text-xl font-semibold tracking-tight">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{pillar.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section dark>
        <SectionHeader
          light
          eyebrow="Product portfolio"
          title="Three ecosystems. One engineering standard."
          description="BioAegix is our flagship Intelligent Healthcare Ecosystem. NPTTE PharmaNG is our National Pharmaceutical Traceability & Enforcement Platform. BeatIQ is our Intelligent Music Technology Platform."
        />
        <Stagger className="grid gap-6 md:grid-cols-3">
          {solutions.products.map((product) => {
            const external = product.href.startsWith("http");
            const className =
              "group focus-ring flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-white/25 hover:bg-white/8";
            const body = (
              <>
                <div className="mb-6 flex h-16 items-center">
                  <Image
                    src={product.logo}
                    alt={`${product.name} logo`}
                    width={160}
                    height={64}
                    className="max-h-14 w-auto object-contain"
                  />
                </div>
                <p className="text-xs font-semibold tracking-[0.2em] text-silver uppercase">
                  {product.role}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold">{product.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/65">
                  {product.summary}
                </p>
                {external ? (
                  <p className="mt-4 text-sm font-semibold text-white/90 underline-offset-4 group-hover:underline">
                    www.beatiq.co.uk
                  </p>
                ) : null}
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  {external ? "Visit site" : "Learn more"}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </>
            );
            return (
              <StaggerItem key={product.name}>
                {external ? (
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {body}
                  </a>
                ) : (
                  <Link href={product.href} className={className}>
                    {body}
                  </Link>
                )}
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Aurexus ecosystem"
          title="Interconnected platforms, shared engineering principles"
          description="Rather than creating disconnected applications, Aurexus engineers interconnected platforms designed to solve complex real-world challenges through artificial intelligence, secure cloud technologies, intelligent automation and human-centred design."
        />
        <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.ecosystemPrinciples.map((principle) => (
            <StaggerItem key={principle}>
              <div className="rounded-xl border border-border bg-card px-4 py-4 text-sm font-medium">
                {principle}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <p className="text-xs font-semibold tracking-[0.28em] text-primary uppercase">
              Our approach
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Understanding before software. Transformation before technology.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              The Aurexus Method™ moves organisations from fragmented operations toward
              intelligent, continuously learning ecosystems—Discover through Evolve.
            </p>
            <Button asChild className="mt-8" size="lg">
              <Link href="/approach">
                Explore the Method
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ol className="space-y-4">
              {[
                "Discover",
                "Diagnose",
                "Design",
                "Develop",
                "Deploy",
                "Demonstrate",
                "Evolve",
              ].map((phase, index) => (
                <li
                  key={phase}
                  className="flex items-center gap-4 border-b border-border/70 pb-4"
                >
                  <span className="font-display text-sm font-semibold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg font-medium tracking-tight">{phase}</span>
                </li>
              ))}
            </ol>
          </FadeIn>
        </div>
      </Section>

      <Section dark>
        <SectionHeader
          light
          eyebrow="Why Aurexus"
          title="Purpose before platforms. Trust before scale."
          description="We evaluate every initiative against one question: does this create meaningful, measurable and sustainable value for the organisations and people it is intended to serve?"
        />
        <Stagger className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Transformation before technology",
              body: "We diagnose organisational reality before prescribing software.",
            },
            {
              title: "Responsible intelligence",
              body: "AI supports judgement. People and institutions retain accountability.",
            },
            {
              title: "Engineered for trust",
              body: "Security, governance and interoperability are designed in from day one.",
            },
          ].map((item) => (
            <StaggerItem key={item.title}>
              <div className="border-t border-white/15 pt-5">
                <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{item.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-10">
          <Button asChild variant="lightOutline" size="lg">
            <Link href="/trust">Visit the Trust Centre</Link>
          </Button>
        </div>
      </Section>

      {insights.length ? (
        <Section>
          <SectionHeader
            eyebrow="Featured insights"
            title="Perspectives for executive leaders"
            description="Original web essays drawn from the Aurexus corporate philosophy."
          />
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {insights.slice(0, 3).map((article) => (
              <StaggerItem key={article.slug}>
                <InsightCard
                  href={`/insights/${article.slug}`}
                  title={article.title}
                  description={article.description}
                  category={article.category}
                  readingTime={article.readingTime}
                  date={article.date}
                />
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-10">
            <Button asChild variant="outline" size="lg">
              <Link href="/insights">
                All insights
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Section>
      ) : null}

      <CtaBand
        title="Ready to build with Aurexus?"
        description={`Partner with ${siteConfig.name} on intelligent transformation, applied research and responsible AI ecosystems.`}
        primary={{ href: "/contact", label: "Start a conversation" }}
        secondary={{ href: "/partnerships", label: "Partnership opportunities" }}
      />
    </>
  );
}
