import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import readingTime from "reading-time";
import type { InsightArticle, MarkdownDoc } from "@/types";

const root = process.cwd();

async function toHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

function readMdFile(filePath: string): { data: Record<string, unknown>; content: string } {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  return { data: parsed.data as Record<string, unknown>, content: parsed.content };
}

export async function getContentPage(slug: string): Promise<MarkdownDoc | null> {
  const filePath = path.join(root, "content", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const { data, content } = readMdFile(filePath);
  return {
    slug: String(data.slug ?? slug),
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    content,
    html: await toHtml(content),
    data,
  };
}

export async function getLegalPage(slug: string): Promise<MarkdownDoc | null> {
  const filePath = path.join(root, "legal", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const { data, content } = readMdFile(filePath);
  return {
    slug: String(data.slug ?? slug),
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    content,
    html: await toHtml(content),
    data: {
      ...data,
      lastUpdated: data.lastUpdated ?? "2026-07-30",
    },
  };
}

export function getLegalSlugs(): string[] {
  const dir = path.join(root, "legal");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export async function getAllLegalPages(): Promise<MarkdownDoc[]> {
  const slugs = getLegalSlugs();
  const pages = await Promise.all(slugs.map((slug) => getLegalPage(slug)));
  return pages.filter(Boolean) as MarkdownDoc[];
}

export async function getInsight(slug: string): Promise<InsightArticle | null> {
  const filePath = path.join(root, "content", "insights", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const { data, content } = readMdFile(filePath);
  const stats = readingTime(content);
  return {
    slug: String(data.slug ?? slug),
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    content,
    html: await toHtml(content),
    data,
    date: String(data.date ?? "2026-07-30"),
    category: String(data.category ?? "Insights"),
    featured: Boolean(data.featured),
    readingTime: stats.text,
  };
}

export function getInsightSlugs(): string[] {
  const dir = path.join(root, "content", "insights");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export async function getAllInsights(): Promise<InsightArticle[]> {
  const slugs = getInsightSlugs();
  const articles = await Promise.all(slugs.map((slug) => getInsight(slug)));
  return (articles.filter(Boolean) as InsightArticle[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/** Extract ## sections from markdown into titled blocks for structured pages */
export function extractSections(markdown: string): { id: string; title: string; body: string }[] {
  const parts = markdown.split(/^## /gm).filter(Boolean);
  return parts.map((part) => {
    const [titleLine, ...rest] = part.split("\n");
    const title = titleLine.trim();
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return { id, title, body: rest.join("\n").trim() };
  });
}
