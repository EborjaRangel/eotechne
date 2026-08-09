import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { AnimatedLogoImage } from "@/components/ui/AnimatedLogo";
import EotechneLogo from "@/components/ui/EotechneLogo";
import { LOGO_PATH } from "@/lib/brand";

export default function LogosPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen min-w-0 overflow-x-clip bg-gray-50 pt-14 sm:pt-16">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <AnimatedSection>
            <Link
              href="/"
              className="text-sm font-medium text-eotechne-blue-dark hover:text-eotechne-green"
            >
              ← Volver al inicio
            </Link>
            <h1 className="mt-6 text-2xl font-bold text-eotechne-blue-dark sm:text-3xl">
              Logo EOTECHNE
            </h1>
            <p className="mt-2 max-w-2xl text-gray-600">
              Logo oficial con identidad de Data Science &amp; Big Data, usado en
              el sitio, favicon y redes sociales.
            </p>
          </AnimatedSection>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <AnimatedSection delay={0.05}>
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <AnimatedLogoImage
                  src={LOGO_PATH}
                  alt="Logo oficial EOTECHNE"
                />
                <div className="border-t border-gray-100 p-6">
                  <h2 className="font-bold text-eotechne-blue-dark">
                    Logo principal
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Header, footer, favicon, Open Graph y compartidos en redes.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="flex h-full flex-col justify-center rounded-2xl border border-gray-200 bg-eotechne-blue-dark p-8 sm:p-10">
                <p className="text-sm font-semibold uppercase tracking-widest text-eotechne-green">
                  Vista en header
                </p>
                <div className="mt-6 flex items-center justify-center rounded-xl bg-white/5 p-6">
                  <EotechneLogo size="md" />
                </div>
                <p className="mt-6 text-sm text-white/70">
                  También disponible en tamaños pequeño (navegación) y grande
                  (presentaciones).
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
