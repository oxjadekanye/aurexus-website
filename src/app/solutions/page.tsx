import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { Section, SectionHeader } from "@/components/sections/section";
import { Prose } from "@/components/content/prose";
import { FadeIn } from "@/components/motion/fade-in";
import { CtaBand } from "@/components/sections/cta-band";
import { Button } from "@/components/ui/button";
import { getContentPage } from "@/lib/markdown";
import { solutions } from "@/lib/content";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Explore Aurexus solutions across AI engineering, digital transformation, enterprise software and BioAegix healthcare technology.",
  alternates: { canonical: "/solutions" },
};

export default async function SolutionsPage() {
  const doc = await getContentPage("solutions");
  if (!doc) notFound();

  return (
    <>
      <PageHero
        title={doc.title}
        eyebrow="Capability portfolio"
        headline={doc.title}
        description={doc.description}
      />
      <Section>
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {solutions.products.map((product) => {
            const external = product.href.startsWith("http");
            const className =
              "group focus-ring flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition hover:border-primary/35";
            const body = (
              <>
                <div className="mb-5 flex h-24 items-center justify-center rounded-xl bg-navy p-4">
                  <Image
                    src={product.logo}
                    alt={`${product.name} logo`}
                    width={140}
                    height={80}
                    className="max-h-16 w-auto object-contain"
                  />
                </div>
                <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                  {product.role}
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold">{product.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.summary}</p>
                {external ? (
                  <p className="mt-4 text-sm font-semibold text-primary underline-offset-4 group-hover:underline">
                    www.beatiq.co.uk
                  </p>
                ) : null}
              </>
            );
            return (
              <FadeIn key={product.name}>
                {external ? (
                  <a
                    id="beatiq"
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {body}
                  </a>
                ) : (
                  <Link
                    href={product.href}
                    className={className}
                    id={product.name === "NPTTE PharmaNG" ? "nptte-pharmang" : undefined}
                  >
                    {body}
                  </Link>
                )}
              </FadeIn>
            );
          })}
        </div>
        <SectionHeader
          eyebrow="How we deliver"
          title="Enterprise capabilities grounded in the Aurexus Method™"
        />
        <Prose html={doc.html} className="mx-auto max-w-3xl" />
        <div className="mt-10 flex justify-center">
          <Button asChild size="lg">
            <Link href="/bioaegix">Explore BioAegix</Link>
          </Button>
        </div>
      </Section>
      <CtaBand
        title="Build the next Aurexus ecosystem with us"
        description="Strategic partners and enterprise teams are invited to explore collaboration."
        primary={{ href: "/partnerships", label: "Partnerships" }}
        secondary={{ href: "/contact", label: "Contact" }}
      />
    </>
  );
}
