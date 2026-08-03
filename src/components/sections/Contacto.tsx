import { Mail, Phone, MapPin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/ui/ContactForm";

export default function Contacto() {
  return (
    <section id="contacto" className="scroll-mt-[var(--header-height)] relative overflow-hidden bg-eotechne-blue-dark pt-6 pb-14 lg:pt-8 lg:pb-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(142,196,75,0.1)_0%,_transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Contacto"
          title="¿Listo para transformar tu negocio?"
          description="Cuéntanos sobre tu proyecto y te responderemos en menos de 24 horas."
          light
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-white">
              Hablemos de tu proyecto
            </h3>
            <p className="mt-3 text-white/60">
              Ya sea Software a la medida, análisis de datos, Business Intelligence
              o una solución para gobierno — estamos listos para ayudarte.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-eotechne-green/10 text-eotechne-green">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-white/50">Email</p>
                  <p className="font-medium text-white">contacto@eotechne.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-eotechne-green/10 text-eotechne-green">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-white/50">Teléfono</p>
                  <p className="font-medium text-white">+52 (55) 0000 0000</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-eotechne-green/10 text-eotechne-green">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-white/50">Ubicación</p>
                  <p className="font-medium text-white">México</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:p-6 lg:col-span-3 lg:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
