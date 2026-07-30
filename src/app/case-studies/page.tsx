import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/sections/section";
import { FadeIn } from "@/components/motion/fade-in";
import { CtaBand } from "@/components/sections/cta-band";
import { caseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Case studies from Aurexus deployments will be published as outcomes can be shared responsibly with partner organisations.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        title={caseStudies.title}
        eyebrow={caseStudies.eyebrow}
        headline={caseStudies.headline}
        description={caseStudies.intro}
      />
      <Section>
        <FadeIn>
          <div className="rounded-3xl border border-dashed border-border bg-card/70 p-10 md:p-14">
            <p className="text-xs font-semibold tracking-[0.28em] text-primary uppercase">
              Coming soon
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {caseStudies.placeholder}
            </p>
          </div>
        </FadeIn>
      </Section>
      <CtaBand
        title="Become a reference partner"
        description="Organisations interested in pioneering deployments and shared learning are invited to connect."
        primary={{ href: "/contact", label: "Start a conversation" }}
        secondary={{ href: "/bioaegix", label: "About BioAegix" }}
      />
    </>
  );
}
