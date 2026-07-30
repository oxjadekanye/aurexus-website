import type { Metadata } from "next";
import { HomePage } from "./home-page";
import { getAllInsights } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "Aurexus Group Ltd | Engineering Intelligent Transformation",
  description:
    "Aurexus Group Ltd is a global AI engineering and intelligent transformation company. Explore BioAegix, our flagship healthcare platform, and our approach to responsible intelligent ecosystems.",
  alternates: { canonical: "/" },
};

export default async function Page() {
  const insights = await getAllInsights();

  return (
    <HomePage
      insights={insights.map((article) => ({
        slug: article.slug,
        title: article.title,
        description: article.description,
        category: article.category,
        readingTime: article.readingTime,
        date: article.date,
      }))}
    />
  );
}
