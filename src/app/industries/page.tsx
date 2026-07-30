import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentDocPage } from "@/components/content/content-doc-page";
import { getContentPage } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Aurexus applies intelligent transformation across healthcare, social care, government, public sector, enterprise, education and future industries.",
  alternates: { canonical: "/industries" },
};

export default async function IndustriesPage() {
  const doc = await getContentPage("industries");
  if (!doc) notFound();

  return (
    <ContentDocPage
      title={doc.title}
      eyebrow="Where complexity meets purpose"
      headline={doc.title}
      description={doc.description}
      html={doc.html}
      cta={{
        title: "Discuss your sector with Aurexus",
        description: "We start with understanding—then engineer ecosystems that endure.",
        primary: { href: "/contact", label: "Get in touch" },
        secondary: { href: "/solutions", label: "View solutions" },
      }}
    />
  );
}
