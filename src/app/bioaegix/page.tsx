import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { Section, SectionHeader } from "@/components/sections/section";
import { Prose } from "@/components/content/prose";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fade-in";
import { CtaBand } from "@/components/sections/cta-band";
import { getContentPage } from "@/lib/markdown";
import { bioaegix } from "@/lib/content";

export const metadata: Metadata = {
  title: "BioAegix",
  description:
    "BioAegix is Aurexus Group Ltd’s flagship Intelligent Healthcare Ecosystem—an AI-powered platform connecting professionals, providers, residents, families and stakeholders.",
  alternates: { canonical: "/bioaegix" },
};

export default async function BioAegixPage() {
  const doc = await getContentPage("bioaegix");
  if (!doc) notFound();

  return (
    <>
      <PageHero
        title={doc.title}
        eyebrow={bioaegix.eyebrow}
        headline={bioaegix.headline}
        description={bioaegix.intro}
        actions={[
          { href: "https://www.bioaegix.com", label: "Visit bioaegix.com", external: true },
          { href: "/contact", label: "Talk to Aurexus", variant: "secondary" },
        ]}
      />
      <Section>
        <div className="mb-12 grid items-center gap-10 lg:grid-cols-[1fr_240px]">
          <FadeIn>
            <p className="text-lg leading-relaxed text-muted-foreground">{bioaegix.whyHealthcare}</p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {bioaegix.systemsNote}
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="rounded-3xl bg-navy p-8">
              <Image
                src="/logos/bioaegix.png"
                alt="BioAegix logo"
                width={200}
                height={200}
                className="mx-auto h-auto w-full max-w-[180px] object-contain"
              />
            </div>
          </FadeIn>
        </div>
        <SectionHeader
          eyebrow="Intelligent modules"
          title="One secure ecosystem"
          description="BioAegix brings together multiple intelligent modules designed to improve quality of care, operational efficiency, compliance and clinical decision-making."
        />
        <Stagger className="mb-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {bioaegix.modules.map((module) => (
            <StaggerItem key={module}>
              <div className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium">
                {module}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <Prose html={doc.html} className="mx-auto max-w-3xl" />
      </Section>
      <CtaBand
        title="See BioAegix in more depth"
        description="Visit the BioAegix platform site or speak with Aurexus Group Ltd about healthcare transformation."
        primary={{ href: "/contact", label: "Contact Aurexus" }}
        secondary={{ href: "/trust", label: "Trust Centre" }}
      />
    </>
  );
}
