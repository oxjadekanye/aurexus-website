import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Section, SectionHeader } from "@/components/sections/section";
import { InsightCard } from "@/components/ui/cards";
import { Stagger, StaggerItem } from "@/components/motion/fade-in";
import { CtaBand } from "@/components/sections/cta-band";
import { getAllInsights } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "News & Insights",
  description:
    "Executive insights from Aurexus on intelligent transformation, responsible AI, BioAegix and the Aurexus Method™.",
  alternates: { canonical: "/insights" },
};

export default async function InsightsPage() {
  const articles = await getAllInsights();
  const featured = articles.filter((a) => a.featured);
  const rest = articles.filter((a) => !a.featured);

  return (
    <>
      <PageHero
        title="News & Insights"
        eyebrow="Thought leadership"
        headline="Ideas that shape intelligent organisations"
        description="Concise executive perspectives drawn from the Aurexus philosophy—rewritten for leaders, partners and practitioners."
      />
      {featured.length ? (
        <Section>
          <SectionHeader eyebrow="Featured" title="Start here" />
          <Stagger className="grid gap-6 md:grid-cols-2">
            {featured.map((article) => (
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
        </Section>
      ) : null}
      <Section className={featured.length ? "pt-0 md:pt-0" : undefined}>
        <SectionHeader eyebrow="All articles" title="Latest insights" />
        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(rest.length ? rest : articles).map((article) => (
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
      </Section>
      <CtaBand
        title="Bring these ideas into your organisation"
        description="Talk with Aurexus about transformation programmes grounded in operational reality."
        primary={{ href: "/contact", label: "Contact us" }}
        secondary={{ href: "/approach", label: "Our approach" }}
      />
    </>
  );
}
