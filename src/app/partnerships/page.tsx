import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Section, SectionHeader } from "@/components/sections/section";
import { Stagger, StaggerItem } from "@/components/motion/fade-in";
import { CtaBand } from "@/components/sections/cta-band";
import { partnerships } from "@/lib/content";

export const metadata: Metadata = {
  title: "Partnerships",
  description:
    "Aurexus collaborates with NHS organisations, universities, research institutions, technology partners and public-sector organisations to advance responsible innovation.",
};

export default function PartnershipsPage() {
  return (
    <>
      <PageHero
        title={partnerships.title}
        eyebrow={partnerships.eyebrow}
        headline={partnerships.headline}
        description={partnerships.intro}
        actions={[
          { href: "/contact", label: "Partner with Aurexus" },
          { href: "/ai-innovation", label: "AI & Innovation", variant: "secondary" },
        ]}
      />
      <Section>
        <SectionHeader
          eyebrow="Who we work with"
          title="Complementary expertise. Shared public value."
          description={partnerships.closing}
        />
        <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {partnerships.partners.map((partner) => (
            <StaggerItem key={partner}>
              <div className="rounded-xl border border-border bg-card px-4 py-5 text-sm font-medium">
                {partner}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
      <Section dark>
        <SectionHeader
          light
          eyebrow="Collaboration opportunities"
          title="Where conversations begin"
        />
        <Stagger className="grid gap-3 md:grid-cols-2">
          {partnerships.opportunities.map((item) => (
            <StaggerItem key={item}>
              <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/80">
                {item}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
      <CtaBand
        title="Let’s build the future together"
        description="Partnership, research and enterprise enquiries are welcome."
        primary={{ href: "/contact", label: "Contact Aurexus" }}
        secondary={{ href: "/careers", label: "Careers" }}
      />
    </>
  );
}
