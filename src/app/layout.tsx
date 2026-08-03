import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { TAGLINE } from "@/lib/brand";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: `EOTECHNE | ${TAGLINE}`,
  description: `${TAGLINE}. Desde 2012, consultoría y desarrollo para PyMEs, medianas empresas e instituciones de gobierno. Certificados en IA Generativa, Ciencia de Datos Aplicada y Business Intelligence.`,
  keywords: [
    "desarrollo de software",
    "IA Generativa",
    "Ciencia de Datos Aplicada",
    "Business Intelligence",
    "certificaciones",
    "gobierno",
    "PyMEs",
    "México",
  ],
  openGraph: {
    title: `EOTECHNE | ${TAGLINE}`,
    description: TAGLINE,
    type: "website",
    locale: "es_MX",
    siteName: "EOTECHNE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full min-w-0 flex-col overflow-x-clip">{children}</body>
    </html>
  );
}
