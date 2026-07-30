import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentDocPage } from "@/components/content/content-doc-page";
import { getContentPage } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "About Aurexus",
  description:
    "Learn how Aurexus Group Ltd became an intelligent transformation and applied research company dedicated to responsible digital ecosystems.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const doc = await getContentPage("about");
  if (!doc) notFound();

  return (
    <ContentDocPage
      title={doc.title}
      eyebrow="Aurexus Group Ltd"
      headline={doc.title}
      description={doc.description}
      html={doc.html}
      cta={{
        title: "See the philosophy in action",
        description: "BioAegix is the first expression of the Aurexus approach within health and social care.",
        primary: { href: "/bioaegix", label: "Discover BioAegix" },
        secondary: { href: "/vision", label: "Our vision" },
      }}
    />
  );
}
