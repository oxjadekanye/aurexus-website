import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getInsightSlugs, getLegalSlugs } from "@/lib/markdown";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/vision",
    "/approach",
    "/industries",
    "/solutions",
    "/technology",
    "/bioaegix",
    "/nptte",
    "/beatiq",
    "/ai-innovation",
    "/research",
    "/partnerships",
    "/trust",
    "/careers",
    "/insights",
    "/case-studies",
    "/contact",
  ];

  const insights = getInsightSlugs().map((slug) => ({
    url: `${siteConfig.url}/insights/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const legal = getLegalSlugs().map((slug) => ({
    url: `${siteConfig.url}/legal/${slug}`,
    lastModified: new Date("2026-07-30"),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority:
        route === ""
          ? 1
          : route === "/bioaegix" ||
              route === "/nptte" ||
              route === "/beatiq" ||
              route === "/trust"
            ? 0.9
            : 0.7,
    })),
    ...insights,
    ...legal,
  ];
}
