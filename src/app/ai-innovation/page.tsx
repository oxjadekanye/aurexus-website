import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Section, SectionHeader } from "@/components/sections/section";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fade-in";
import { CtaBand } from "@/components/sections/cta-band";
import { aiInnovation } from "@/lib/content";

export const metadata: Metadata = {
  title: "AI & Innovation",
  description:
    "Aurexus approaches artificial intelligence as responsible decision support—contextual, governed and accountable to human expertise.",
};

export default function AiInnovationPage() {
  return (
    <>
      <PageHero
        title={aiInnovation.title}
        eyebrow={aiInnovation.eyebrow}
        headline={aiInnovation.headline}
        description={aiInnovation.intro}
      />
      <Section>
        <FadeIn className="mx-auto max-w-3xl">
          <blockquote className="border-l-2 border-primary pl-6 text-2xl font-medium tracking-tight text-balance text-foreground md:text-3xl">
            {aiInnovation.quote}
          </blockquote>
        </FadeIn>
        <Stagger className="mt-16 grid gap-8 md:grid-cols-2">
          {aiInnovation.beliefs.map((item) => (
            <StaggerItem key={item.title}>
              <div className="h-full border-t border-primary/25 pt-5">
                <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
      <Section dark>
        <SectionHeader
          light
          eyebrow="Trust & governance"
          title="Innovation that can be trusted"
          description="Security, transparency, interoperability and ethical innovation are engineered into every Aurexus ecosystem from the beginning—not bolted on later."
        />
      </Section>
      <CtaBand
        title="Collaborate on responsible AI"
        description="Explore research partnerships, governance frameworks and intelligent ecosystem programmes."
        primary={{ href: "/partnerships", label: "Partnerships" }}
        secondary={{ href: "/contact", label: "Contact" }}
      />
    </>
  );
}
