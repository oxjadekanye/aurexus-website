import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Section, SectionHeader } from "@/components/sections/section";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fade-in";
import { CtaBand } from "@/components/sections/cta-band";
import { vision } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Vision",
  description:
    "Aurexus exists to engineer intelligent ecosystems that help organisations become more connected, informed, resilient and purpose-led.",
};

export default function VisionPage() {
  return (
    <>
      <PageHero
        title={vision.title}
        eyebrow={vision.eyebrow}
        headline={vision.headline}
        description={vision.quote}
      />
      <Section>
        <div className="mx-auto max-w-3xl space-y-6">
          {vision.body.map((paragraph, index) => (
            <FadeIn key={index} delay={index * 0.06}>
              <p className="text-lg leading-relaxed text-muted-foreground">{paragraph}</p>
            </FadeIn>
          ))}
        </div>
      </Section>
      <Section dark>
        <SectionHeader
          light
          eyebrow="Outcomes we engineer toward"
          title="Connected. Informed. Resilient. Purpose-led."
        />
        <Stagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {vision.outcomes.map((item) => (
            <StaggerItem key={item.title}>
              <div className="border-t border-white/15 pt-5">
                <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{item.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
      <CtaBand
        title="Share this vision with us"
        description="We welcome partners, researchers and institutions committed to responsible intelligent transformation."
        primary={{ href: "/partnerships", label: "Explore partnerships" }}
        secondary={{ href: "/approach", label: "Our approach" }}
      />
    </>
  );
}
