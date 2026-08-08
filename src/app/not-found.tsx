import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página que buscas no existe en EOTECHNE.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen min-w-0 flex-col items-center justify-center overflow-x-clip bg-white px-4 pt-14 text-center sm:pt-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-eotechne-green">
          Error 404
        </p>
        <h1 className="mt-4 text-3xl font-bold text-eotechne-blue-dark sm:text-5xl">
          Página no encontrada
        </h1>
        <p className="mt-4 max-w-md text-gray-600">
          El enlace puede estar roto o la página fue movida. Regresa al inicio o
          visita nuestro blog.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-eotechne-green px-6 py-3 text-sm font-semibold text-eotechne-blue-dark transition hover:bg-eotechne-green-light"
          >
            Ir al inicio
          </Link>
          <Link
            href="/blog"
            className="rounded-full border border-eotechne-blue-dark/20 px-6 py-3 text-sm font-semibold text-eotechne-blue-dark transition hover:border-eotechne-green"
          >
            Ver blog
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
