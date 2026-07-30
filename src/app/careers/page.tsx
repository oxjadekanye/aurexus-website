import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentDocPage } from "@/components/content/content-doc-page";
import { getContentPage } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Aurexus Group Ltd to engineer intelligent ecosystems with purpose, discipline and responsible innovation.",
  alternates: { canonical: "/careers" },
};

export default async function CareersPage() {
  const doc = await getContentPage("careers");
  if (!doc) notFound();

  return (
    <ContentDocPage
      title={doc.title}
      eyebrow="Join Aurexus"
      headline={doc.title}
      description={doc.description}
      html={doc.html}
      actions={[{ href: "/contact", label: "Get in touch" }]}
      cta={{
        title: "Share your experience",
        description: "Speculative applications and conversations about future roles are welcome.",
        primary: { href: "/contact", label: "Contact careers" },
        secondary: { href: "/about", label: "About Aurexus" },
      }}
    />
  );
}
