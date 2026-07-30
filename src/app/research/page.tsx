import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentDocPage } from "@/components/content/content-doc-page";
import { getContentPage } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "Research & Innovation",
  description:
    "Aurexus advances intelligent organisations through applied research, responsible AI and purposeful partnership.",
  alternates: { canonical: "/research" },
};

export default async function ResearchPage() {
  const doc = await getContentPage("research");
  if (!doc) notFound();

  return (
    <ContentDocPage
      title={doc.title}
      eyebrow="Research & Innovation"
      headline={doc.title}
      description={doc.description}
      html={doc.html}
      cta={{
        title: "Collaborate with Aurexus",
        description: "Research programmes, pilots and strategic partnerships are welcome.",
        primary: { href: "/partnerships", label: "Partnerships" },
        secondary: { href: "/contact", label: "Contact" },
      }}
    />
  );
}
