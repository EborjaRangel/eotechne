import { SITE_URL, TAGLINE, CONTACT_EMAIL, CONTACT_PHONE_DISPLAY } from "@/lib/brand";
import type { BlogPost } from "@/lib/blog";
import { getPostPath } from "@/lib/blog";

export const DEFAULT_OG_IMAGE = "/logos/eotechne-logo-propuesta-4-apilado.png";

export const SITE_DESCRIPTION =
  "Consultoría y desarrollo de software a la medida para PyMEs, medianas empresas e instituciones de gobierno en México. Certificados en IA Generativa, Ciencia de Datos Aplicada y Business Intelligence. Desde 2012.";

export const DEFAULT_KEYWORDS = [
  "desarrollo de software a la medida",
  "software empresarial México",
  "IA Generativa empresas",
  "Business Intelligence",
  "Ciencia de Datos",
  "desarrollo web Next.js",
  "consultoría tecnológica",
  "gobierno digital México",
  "PyMEs tecnología",
  "EOTECHNE",
];

export function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EOTECHNE",
    url: SITE_URL,
    logo: absoluteUrl(DEFAULT_OG_IMAGE),
    description: SITE_DESCRIPTION,
    foundingDate: "2012",
    areaServed: {
      "@type": "Country",
      name: "México",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE_DISPLAY,
      availableLanguage: ["Spanish"],
    },
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "EOTECHNE",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "es-MX",
    publisher: {
      "@type": "Organization",
      name: "EOTECHNE",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(DEFAULT_OG_IMAGE),
      },
    },
  };
}

export function buildBlogPostingJsonLd(post: BlogPost) {
  const url = absoluteUrl(getPostPath(post.slug));

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "EOTECHNE",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(DEFAULT_OG_IMAGE),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    articleSection: post.category,
    inLanguage: "es-MX",
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function defaultOpenGraph(
  title: string,
  description: string,
  path = "/",
) {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    url,
    siteName: "EOTECHNE",
    locale: "es_MX" as const,
    type: "website" as const,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "EOTECHNE — Software a la medida",
      },
    ],
  };
}

export function defaultTwitter(title: string, description: string) {
  return {
    card: "summary_large_image" as const,
    title,
    description,
    images: [DEFAULT_OG_IMAGE],
  };
}
