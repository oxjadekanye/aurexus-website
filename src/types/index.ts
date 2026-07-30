export type NavItem = {
  href: string;
  label: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  href?: string;
  items: NavItem[];
};

export type MarkdownDoc = {
  slug: string;
  title: string;
  description: string;
  content: string;
  html: string;
  data: Record<string, unknown>;
};

export type InsightArticle = MarkdownDoc & {
  date: string;
  category: string;
  featured: boolean;
  readingTime: string;
};
