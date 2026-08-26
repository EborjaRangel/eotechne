import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Globe, Code2 } from "lucide-react";
import NewsletterForm from "@/components/blog/NewsletterForm";
import { TAGLINE, LOGO_ALT, LOGO_PATH } from "@/lib/brand";

export default function Footer() {
  return (
    <footer className="bg-eotechne-blue-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center">
              <div className="relative h-16 w-auto">
                <Image
                  src={LOGO_PATH}
                  alt={LOGO_ALT}
                  width={512}
                  height={512}
                  unoptimized
                  className="h-16 w-auto object-contain"
                />
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
              {TAGLINE}. Desde 2012, consultoría y desarrollo para PyMEs, medianas
              empresas e instituciones de gobierno. Certificados en IA Generativa,
              Ciencia de Datos Aplicada y Business Intelligence.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-eotechne-green">Enlaces</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li>
                <Link href="/blog" className="transition hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/#enfoque" className="transition hover:text-white">
                  Enfoque
                </Link>
              </li>
              <li>
                <Link href="/#servicios" className="transition hover:text-white">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/#industrias" className="transition hover:text-white">
                  Industrias
                </Link>
              </li>
              <li>
                <Link href="/#contacto" className="transition hover:text-white">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-eotechne-green">Contacto</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-eotechne-green" />
                contacto@eotechne.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-eotechne-green" />
                México
              </li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white/5 p-2 transition hover:bg-eotechne-green/20 hover:text-eotechne-green"
                aria-label="LinkedIn"
              >
                <Globe className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white/5 p-2 transition hover:bg-eotechne-green/20 hover:text-eotechne-green"
                aria-label="GitHub"
              >
                <Code2 className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 lg:p-8">
          <h3 className="font-semibold text-eotechne-green">Boletín</h3>
          <p className="mt-2 text-sm text-white/60">
            Suscríbete y guardamos tu correo en nuestra base de datos para
            enviarte artículos y novedades.
          </p>
          <div className="mt-4">
            <NewsletterForm variant="dark" compact />
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-sm text-white/40">
          © {new Date().getFullYear()} EOTECHNE. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
