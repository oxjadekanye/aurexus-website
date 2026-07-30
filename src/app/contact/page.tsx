import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/sections/section";
import { FadeIn } from "@/components/motion/fade-in";
import { ContactForm } from "@/components/contact/contact-form";
import { Prose } from "@/components/content/prose";
import { getContentPage } from "@/lib/markdown";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Aurexus Group Ltd for partnership, research, enterprise and general enquiries.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const doc = await getContentPage("contact");
  if (!doc) notFound();

  return (
    <>
      <PageHero
        title={doc.title}
        eyebrow="Connect with Aurexus"
        headline={doc.title}
        description={doc.description}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn>
            <div className="space-y-8">
              <Prose html={doc.html} />
              <div>
                <p className="text-xs font-semibold tracking-[0.22em] text-primary uppercase">
                  Registered office
                </p>
                <p className="mt-3 text-sm leading-relaxed">
                  {siteConfig.name}
                  <br />
                  {siteConfig.address.line1}
                  <br />
                  {siteConfig.address.line2}
                  <br />
                  {siteConfig.address.line3}
                  <br />
                  Company No: {siteConfig.companyNumber}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.22em] text-primary uppercase">
                  Email
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <a
                      className="underline-offset-4 hover:underline"
                      href={`mailto:${siteConfig.email.general}`}
                    >
                      {siteConfig.email.general}
                    </a>
                    <span className="text-muted-foreground"> — all enquiries</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.22em] text-primary uppercase">
                  Online
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <a className="underline-offset-4 hover:underline" href={siteConfig.url}>
                      {siteConfig.domain}
                    </a>
                  </li>
                  <li>
                    <a
                      className="underline-offset-4 hover:underline"
                      href={siteConfig.products.bioaegix}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      www.bioaegix.com
                    </a>
                  </li>
                  <li>
                    <a
                      className="underline-offset-4 hover:underline"
                      href={siteConfig.products.beatiq}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      www.beatiq.co.uk
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
              <h2 className="font-display text-2xl font-semibold tracking-tight">Send a message</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Submitting opens your email client with a drafted enquiry to Aurexus.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
