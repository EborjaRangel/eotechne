import { Mail } from "lucide-react";
import NewsletterForm from "@/components/blog/NewsletterForm";

export default function Boletin() {
  return (
    <section id="boletin" className="bg-gray-50 pt-6 pb-14 lg:pt-8 lg:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-eotechne-blue-dark">
          <div className="grid gap-6 p-6 sm:gap-8 sm:p-8 lg:grid-cols-2 lg:p-12">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-eotechne-green/10 text-eotechne-green">
                <Mail className="h-6 w-6" />
              </div>
              <span className="mt-6 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-eotechne-green">
                Boletín
              </span>
              <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                Suscríbete y recibe contenido exclusivo
              </h2>
              <p className="mt-3 text-white/60">
                Al suscribirte, tu correo queda registrado en nuestra base de
                datos. Recibirás artículos sobre IA Generativa, Ciencia de Datos
                y Business Intelligence.
              </p>
            </div>
            <div className="flex items-center">
              <div className="w-full">
                <NewsletterForm variant="dark" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
