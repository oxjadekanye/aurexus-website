import type { NavGroup } from "@/types";

export const siteConfig = {
  name: "Aurexus Group Ltd",
  shortName: "Aurexus",
  domain: "www.aurexus-group.com",
  url: "https://www.aurexus-group.com",
  tagline: "AI-Driven Solutions, Limitless Possibilities",
  description:
    "Aurexus Group Ltd is a global AI engineering and intelligent transformation company developing responsible digital ecosystems that help organisations operate more effectively, make better decisions and create lasting value.",
  companyNumber: "17152745",
  address: {
    line1: "Unit A, 82 James Carter Road",
    line2: "Mildenhall, Bury St. Edmunds",
    line3: "Suffolk, England, IP28 7DE",
  },
  email: {
    general: "admin@aurexus-group.com",
  },
  products: {
    bioaegix: "https://www.bioaegix.com",
    beatiq: "https://www.beatiq.co.uk",
  },
} as const;

export const megaMenu: NavGroup[] = [
  {
    label: "Company",
    href: "/about",
    items: [
      { href: "/about", label: "About Aurexus", description: "Story, mission and ambition" },
      { href: "/vision", label: "Vision", description: "Intelligent organisations for society" },
      { href: "/approach", label: "Our Approach", description: "The Aurexus Method™" },
      { href: "/careers", label: "Careers", description: "Build with purpose" },
      { href: "/insights", label: "News & Insights", description: "Executive perspectives" },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    items: [
      { href: "/solutions", label: "Solutions", description: "AI engineering & transformation" },
      { href: "/bioaegix", label: "BioAegix", description: "Flagship healthcare platform" },
      { href: "/technology", label: "Technology", description: "Architecture & engineering" },
      { href: "/industries", label: "Industries", description: "Where we create value" },
    ],
  },
  {
    label: "Innovation",
    href: "/research",
    items: [
      { href: "/research", label: "Research & Innovation", description: "Applied research strategy" },
      { href: "/ai-innovation", label: "AI & Innovation", description: "Responsible intelligence" },
      { href: "/partnerships", label: "Partnerships", description: "Collaborate with Aurexus" },
      { href: "/trust", label: "Trust Centre", description: "Security, privacy & governance" },
    ],
  },
];

export const legalLinks = [
  { href: "/legal/privacy-policy", label: "Privacy Policy" },
  { href: "/legal/cookie-policy", label: "Cookie Policy" },
  { href: "/legal/terms-of-use", label: "Terms of Use" },
  { href: "/legal/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/legal/acceptable-use", label: "Acceptable Use" },
  { href: "/legal/ai-transparency", label: "AI Transparency" },
  { href: "/legal/responsible-ai", label: "Responsible AI" },
  { href: "/legal/accessibility", label: "Accessibility" },
  { href: "/legal/gdpr", label: "GDPR" },
  { href: "/legal/information-security", label: "Information Security" },
  { href: "/legal/modern-slavery", label: "Modern Slavery" },
  { href: "/legal/anti-bribery", label: "Anti-Bribery" },
  { href: "/legal/equality-diversity-inclusion", label: "EDI" },
  { href: "/legal/environmental", label: "Environmental" },
  { href: "/legal/copyright", label: "Copyright" },
  { href: "/legal/trademark", label: "Trademarks" },
  { href: "/legal/disclaimer", label: "Disclaimer" },
  { href: "/legal/complaints", label: "Complaints" },
  { href: "/legal/vulnerability-disclosure", label: "Vulnerability Disclosure" },
] as const;

export const footerNav = {
  company: [
    { href: "/about", label: "About Aurexus" },
    { href: "/vision", label: "Our Vision" },
    { href: "/approach", label: "Our Approach" },
    { href: "/careers", label: "Careers" },
    { href: "/insights", label: "News & Insights" },
  ],
  solutions: [
    { href: "/solutions", label: "Solutions" },
    { href: "/bioaegix", label: "BioAegix" },
    { href: "/technology", label: "Technology" },
    { href: "/industries", label: "Industries" },
    { href: "/research", label: "Research" },
  ],
  trust: [
    { href: "/trust", label: "Trust Centre" },
    { href: "/legal/privacy-policy", label: "Privacy" },
    { href: "/legal/cookie-policy", label: "Cookies" },
    { href: "/legal/information-security", label: "Security" },
    { href: "/legal/responsible-ai", label: "Responsible AI" },
    { href: "/contact", label: "Contact" },
  ],
} as const;
