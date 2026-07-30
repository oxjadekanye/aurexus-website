import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Section, SectionHeader } from "@/components/sections/section";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fade-in";
import { CtaBand } from "@/components/sections/cta-band";
import { approach } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Approach",
  description:
    "The Aurexus Method™ is a seven-stage framework for intelligent transformation: Discover, Diagnose, Design, Develop, Deploy, Demonstrate and Evolve.",
};

export default function ApproachPage() {
  return (
    <>
      <PageHero
        title={approach.title}
        eyebrow={approach.eyebrow}
        headline={approach.headline}
        description={approach.quote}
      />
      <Section>
        <FadeIn className="mx-auto max-w-3xl">
          <p className="text-lg leading-relaxed text-muted-foreground">{approach.intro}</p>
        </FadeIn>
        <Stagger className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {approach.methodPrinciples.map((item) => (
            <StaggerItem key={item.title}>
              <div className="h-full border-t border-primary/25 pt-5">
                <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
      <Section dark>
        <SectionHeader
          light
          eyebrow="Transformation lifecycle"
          title="Seven phases. Continuous learning."
          description="The Aurexus Method™ is cyclical: every implementation generates knowledge that strengthens the next cycle."
        />
        <ol className="grid gap-4 md:grid-cols-2">
          {approach.phases.map((phase, index) => (
            <li
              key={phase.name}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-xs font-semibold tracking-[0.22em] text-silver uppercase">
                Phase {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold">{phase.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{phase.body}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section>
        <SectionHeader
          eyebrow={approach.principlesTitle}
          title="Standards that shape every decision"
          description={approach.principlesIntro}
        />
        <Stagger className="grid gap-6 sm:grid-cols-2">
          {approach.principles.map((item, index) => (
            <StaggerItem key={item.title}>
              <div className="flex gap-4">
                <span className="font-display text-sm font-semibold text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
      <CtaBand
        title="Apply the Method in your organisation"
        description="Talk with Aurexus about intelligent transformation programmes grounded in operational reality."
        primary={{ href: "/contact", label: "Contact us" }}
        secondary={{ href: "/industries", label: "Industries" }}
      />
    </>
  );
}
