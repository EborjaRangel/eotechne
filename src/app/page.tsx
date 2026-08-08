import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollRestoration from "@/components/layout/ScrollRestoration";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Hero from "@/components/sections/Hero";
import Speech from "@/components/sections/Speech";
import Enfoque from "@/components/sections/Enfoque";
import Servicios from "@/components/sections/Servicios";
import Industrias from "@/components/sections/Industrias";
import Tecnologias from "@/components/sections/Tecnologias";
import BlogPreview from "@/components/sections/BlogPreview";
import Boletin from "@/components/sections/Boletin";
import Contacto from "@/components/sections/Contacto";
import { SITE_URL, TAGLINE } from "@/lib/brand";
import {
  defaultOpenGraph,
  defaultTwitter,
  SITE_DESCRIPTION,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: `Software a la medida en México | ${TAGLINE}`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: defaultOpenGraph(
    `EOTECHNE | Software a la medida en México`,
    SITE_DESCRIPTION,
  ),
  twitter: defaultTwitter(
    `EOTECHNE | Software a la medida en México`,
    SITE_DESCRIPTION,
  ),
};

export default function Home() {
  return (
    <>
      <ScrollRestoration />
      <Header />
      <main className="min-w-0 overflow-x-clip">
        <Hero />
        <AnimatedSection className="bg-white">
          <Speech />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <Enfoque />
        </AnimatedSection>
        <AnimatedSection delay={0.05}>
          <Servicios />
        </AnimatedSection>
        <AnimatedSection>
          <Industrias />
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <Tecnologias />
        </AnimatedSection>
        <AnimatedSection direction="left">
          <BlogPreview />
        </AnimatedSection>
        <AnimatedSection direction="right">
          <Boletin />
        </AnimatedSection>
        <AnimatedSection>
          <Contacto />
        </AnimatedSection>
      </main>
      <Footer />
    </>
  );
}
