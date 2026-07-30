import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/sections/section";
import { Prose } from "@/components/content/prose";
import { CtaBand } from "@/components/sections/cta-band";
import { getAllInsights, getInsight, getInsightSlugs } from "@/lib/markdown";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getInsightSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getInsight(slug);
  if (!article) return { title: "Insight" };
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getInsight(slug);
  if (!article) notFound();

  const others = (await getAllInsights()).filter((a) => a.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: { "@type": "Organization", name: "Aurexus Group Ltd" },
  };

  return (
    <>
      <PageHero
        title={article.title}
        eyebrow={article.category}
        headline={article.title}
        description={`${article.readingTime} · ${new Date(article.date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}`}
      />
      <Section>
        <Prose html={article.html} className="mx-auto max-w-3xl" />
        {others.length ? (
          <div className="mx-auto mt-16 max-w-3xl border-t border-border pt-10">
            <p className="text-xs font-semibold tracking-[0.22em] text-primary uppercase">
              Related reading
            </p>
            <ul className="mt-4 space-y-3">
              {others.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/insights/${item.slug}`}
                    className="text-foreground underline-offset-4 hover:underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Section>
      <CtaBand
        title="Continue the conversation"
        description="Explore partnerships, BioAegix or the Aurexus Method™ with our team."
        primary={{ href: "/contact", label: "Contact" }}
        secondary={{ href: "/insights", label: "All insights" }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
