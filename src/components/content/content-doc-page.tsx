import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/sections/section";
import { Prose } from "@/components/content/prose";
import { CtaBand } from "@/components/sections/cta-band";
import { FadeIn } from "@/components/motion/fade-in";

type ContentDocPageProps = {
  title: string;
  eyebrow?: string;
  headline: string;
  description?: string;
  html: string;
  cta?: {
    title: string;
    description: string;
    primary: { href: string; label: string };
    secondary?: { href: string; label: string };
  };
  actions?: {
    href: string;
    label: string;
    external?: boolean;
    variant?: "primary" | "secondary";
  }[];
};

export function ContentDocPage({
  title,
  eyebrow,
  headline,
  description,
  html,
  cta,
  actions,
}: ContentDocPageProps) {
  return (
    <>
      <PageHero
        title={title}
        eyebrow={eyebrow}
        headline={headline}
        description={description}
        actions={actions}
      />
      <Section>
        <FadeIn>
          <Prose html={html} className="mx-auto max-w-3xl" />
        </FadeIn>
      </Section>
      {cta ? (
        <CtaBand
          title={cta.title}
          description={cta.description}
          primary={cta.primary}
          secondary={cta.secondary}
        />
      ) : null}
    </>
  );
}
