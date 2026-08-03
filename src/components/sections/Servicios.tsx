import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/lib/data/services";

export default function Servicios() {
  return (
    <section id="servicios" className="scroll-mt-[var(--header-height)] bg-gray-50 pt-6 pb-14 lg:pt-8 lg:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Servicios"
          title="Soluciones que impulsan tu operación"
          description="Desarrollamos sistemas especializados para PyMEs, medianas empresas, gobierno, análisis de datos y Business Intelligence."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:p-8"
            >
              <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-eotechne-green to-eotechne-blue transition-all duration-300 group-hover:w-full" />
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-eotechne-blue-dark text-eotechne-green transition group-hover:bg-eotechne-green group-hover:text-eotechne-blue-dark">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-eotechne-blue-dark">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
