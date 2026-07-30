import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { CookieConsent } from "@/components/consent/cookie-consent";
import { ConsentGatedScripts } from "@/components/consent/consent-gated-scripts";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Intelligent Transformation`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Aurexus",
    "Aurexus Group Ltd",
    "BioAegix",
    "AI engineering",
    "intelligent transformation",
    "responsible AI",
    "healthcare technology",
    "digital transformation",
    "NPTTE PharmaNG",
    "BeatIQ",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Engineering Intelligent Transformation`,
    description: siteConfig.description,
    images: [{ url: "/logos/aurexus-full.png", alt: "Aurexus Group Ltd" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Engineering Intelligent Transformation`,
    description: siteConfig.description,
    images: ["/logos/aurexus-full.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteConfig.url },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logos/aurexus-full.png`,
    email: siteConfig.email.general,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.line1,
      addressLocality: "Mildenhall",
      addressRegion: "Suffolk",
      postalCode: "IP28 7DE",
      addressCountry: "GB",
    },
    identifier: siteConfig.companyNumber,
    brand: [
      {
        "@type": "Brand",
        name: "BioAegix",
        url: siteConfig.products.bioaegix,
      },
      {
        "@type": "Brand",
        name: "BeatIQ",
        url: `${siteConfig.url}/beatiq`,
      },
      {
        "@type": "Brand",
        name: "NPTTE PharmaNG",
        url: `${siteConfig.url}/nptte`,
      },
    ],
  };

  return (
    <html lang="en-GB" className={`${outfit.variable} ${manrope.variable} h-full`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col antialiased">
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-card focus:px-4 focus:py-2 focus:text-foreground"
          >
            Skip to content
          </a>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <CookieConsent />
          <ConsentGatedScripts />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
