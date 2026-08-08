import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import JsonLd from "@/components/seo/JsonLd";
import { TAGLINE, SITE_URL } from "@/lib/brand";
import {
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
  DEFAULT_KEYWORDS,
  SITE_DESCRIPTION,
  defaultOpenGraph,
  defaultTwitter,
} from "@/lib/seo";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `EOTECHNE | ${TAGLINE}`,
    template: `%s | EOTECHNE`,
  },
  description: SITE_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  authors: [{ name: "EOTECHNE", url: SITE_URL }],
  creator: "EOTECHNE",
  publisher: "EOTECHNE",
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": `${SITE_URL}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: defaultOpenGraph(`EOTECHNE | ${TAGLINE}`, SITE_DESCRIPTION),
  twitter: defaultTwitter(`EOTECHNE | ${TAGLINE}`, SITE_DESCRIPTION),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/logos/eotechne-prop4-e-icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full min-w-0 flex-col overflow-x-clip">
        <JsonLd data={[buildOrganizationJsonLd(), buildWebSiteJsonLd()]} />
        {children}
      </body>
    </html>
  );
}
