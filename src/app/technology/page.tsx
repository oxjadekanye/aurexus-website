import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentDocPage } from "@/components/content/content-doc-page";
import { getContentPage } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "Explore Aurexus engineering principles, architecture philosophy, security posture, responsible AI and scalable innovation.",
  alternates: { canonical: "/technology" },
};

export default async function TechnologyPage() {
  const doc = await getContentPage("technology");
  if (!doc) notFound();

  return (
    <ContentDocPage
      title={doc.title}
      eyebrow="Engineering excellence"
      headline={doc.title}
      description={doc.description}
      html={doc.html}
      cta={{
        title: "Review our Trust Centre",
        description: "Security, privacy, responsible AI and governance commitments in one place.",
        primary: { href: "/trust", label: "Trust Centre" },
        secondary: { href: "/solutions", label: "Solutions" },
      }}
    />
  );
}
