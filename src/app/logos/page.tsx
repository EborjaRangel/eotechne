"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { AnimatedLogoImage } from "@/components/ui/AnimatedLogo";

const logos = [
  {
    file: "eotechne-logo-propuesta-1-wordmark.png",
    title: "Propuesta 1 — Wordmark clásico",
    description: "Icono E + texto EO/TECHNE. Estilo corporativo horizontal.",
  },
  {
    file: "eotechne-logo-propuesta-2-monograma.png",
    title: "Propuesta 2 — Monograma",
    description: "Letra E estilizada. Ideal para favicon e iconos.",
  },
  {
    file: "eotechne-logo-propuesta-3-tech.png",
    title: "Propuesta 3 — Tech / circuito",
    description: "Icono abstracto tecnológico con wordmark.",
  },
  {
    file: "eotechne-logo-propuesta-4-apilado.png",
    title: "Propuesta 4 — Apilado vertical",
    description: "Hexágono + nombre + tagline Desarrollo a la medida.",
  },
  {
    file: "eotechne-logo-propuesta-5-fullstack.png",
    title: "Propuesta 5 — Fullstack / capas",
    description: "Emblema circular con capas. Enfoque desarrollo full stack.",
  },
];

export default function LogosPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen min-w-0 overflow-x-clip bg-gray-50 pb-12 pt-20 sm:pb-16 sm:pt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <Link
              href="/"
              className="text-sm font-medium text-eotechne-blue-dark hover:text-eotechne-green"
            >
              ← Volver al inicio
            </Link>
            <h1 className="mt-6 text-2xl font-bold text-eotechne-blue-dark sm:text-3xl">
              Propuestas de logo EOTECHNE
            </h1>
            <p className="mt-2 text-gray-600">
              Animaciones de muestra — elige la que prefieras para integrar en el sitio.
            </p>
          </AnimatedSection>

          <div className="mt-8 grid gap-6 sm:mt-12 sm:gap-8 md:grid-cols-2">
            {logos.map((logo, index) => (
              <AnimatedSection key={logo.file} delay={index * 0.08}>
                <motion.div
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                  whileHover={{
                    y: -6,
                    boxShadow: "0 20px 40px rgba(0, 73, 123, 0.12)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <AnimatedLogoImage
                    src={`/logos/${logo.file}`}
                    alt={logo.title}
                  />
                  <div className="border-t border-gray-100 p-4 sm:p-6">
                    <h2 className="font-bold text-eotechne-blue-dark">{logo.title}</h2>
                    <p className="mt-1 text-sm text-gray-600">{logo.description}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
