import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { Section, SectionHeader } from "@/components/sections/section";
import { Prose } from "@/components/content/prose";
import { FeatureCard } from "@/components/ui/cards";
import { CtaBand } from "@/components/sections/cta-band";
import { getContentPage } from "@/lib/markdown";
import { Stagger, StaggerItem } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "Trust Centre",
  description:
    "Aurexus Trust Centre: security, privacy, compliance, responsible AI, data protection and incident response commitments.",
  alternates: { canonical: "/trust" },
};

const trustLinks = [
  { href: "/legal/information-security", label: "Information Security", description: "How we protect systems and data" },
  { href: "/legal/privacy-policy", label: "Privacy", description: "UK GDPR and Data Protection Act 2018" },
  { href: "/legal/gdpr", label: "GDPR Statement", description: "Data protection commitments" },
  { href: "/legal/responsible-ai", label: "Responsible AI", description: "Human accountability and governance" },
  { href: "/legal/ai-transparency", label: "AI Transparency", description: "How we communicate AI use" },
  { href: "/legal/vulnerability-disclosure", label: "Vulnerability Disclosure", description: "Report security issues responsibly" },
  { href: "/legal/accessibility", label: "Accessibility", description: "WCAG-oriented accessibility statement" },
  { href: "/legal/cookie-policy", label: "Cookies", description: "How we use cookies on this site" },
];

export default async function TrustPage() {
  const doc = await getContentPage("trust");
  if (!doc) notFound();

  return (
    <>
      <PageHero
        title={doc.title}
        eyebrow="Trust Centre"
        headline="Security, privacy and responsible intelligence"
        description={doc.description}
        actions={[
          { href: "/legal/privacy-policy", label: "Privacy Policy" },
          { href: "/contact", label: "Contact security", variant: "secondary" },
        ]}
      />
      <Section>
        <SectionHeader
          eyebrow="Policies & commitments"
          title="Enterprise trust documentation"
          description="Detailed UK policies underpin every Aurexus engagement. Operational controls mature with scale; certifications are never claimed without evidence."
        />
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustLinks.map((item) => (
            <StaggerItem key={item.href}>
              <FeatureCard
                href={item.href}
                title={item.label}
                description={item.description}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
      <Section dark>
        <SectionHeader light eyebrow="Overview" title="How Aurexus approaches trust" />
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10">
          <Prose html={doc.html} className="prose-invert mx-auto max-w-3xl" />
        </div>
        <p className="mt-8 text-center text-sm text-white/60">
          Prefer a full policy index?{" "}
          <Link href="/legal/privacy-policy" className="text-white underline-offset-4 hover:underline">
            Browse legal pages
          </Link>
        </p>
      </Section>
      <CtaBand
        title="Need a security questionnaire or NDA discussion?"
        description="Enterprise and partnership teams can reach us for diligence materials proportionate to engagement scope."
        primary={{ href: "/contact", label: "Contact Aurexus" }}
        secondary={{ href: "/legal/vulnerability-disclosure", label: "Report a vulnerability" }}
      />
    </>
  );
}
