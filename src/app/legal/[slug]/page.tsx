import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/sections/section";
import { Prose } from "@/components/content/prose";
import { getAllLegalPages, getLegalPage, getLegalSlugs } from "@/lib/markdown";
import { legalLinks } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getLegalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getLegalPage(slug);
  if (!doc) return { title: "Legal" };
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `/legal/${doc.slug}` },
  };
}

export default async function LegalPage({ params }: Props) {
  const { slug } = await params;
  const doc = await getLegalPage(slug);
  if (!doc) notFound();

  const all = await getAllLegalPages();
  const lastUpdated = String(doc.data.lastUpdated ?? "2026-07-30");
  const effectiveDate = String(doc.data.effectiveDate ?? lastUpdated);
  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <>
      <PageHero
        title={doc.title}
        eyebrow="Legal"
        headline={doc.title}
        description={`Effective ${formatDate(effectiveDate)} · Last updated ${formatDate(lastUpdated)}`}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold tracking-[0.22em] text-primary uppercase">
              Policies
            </p>
            <ul className="mt-4 max-h-[70vh] space-y-1 overflow-y-auto pr-2 text-sm">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={
                      link.href === `/legal/${slug}`
                        ? "font-semibold text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-muted-foreground">
              {all.length} policies ·{" "}
              <Link href="/trust" className="underline-offset-4 hover:underline">
                Trust Centre
              </Link>
            </p>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              These documents are informational policy notices for Aurexus Group Ltd. They do not
              constitute legal certification, accreditation or regulatory approval.
            </p>
          </aside>
          <Prose html={doc.html} className="max-w-3xl" />
        </div>
      </Section>
    </>
  );
}
