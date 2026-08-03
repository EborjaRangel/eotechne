import { Target, Users, Rocket, Award } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const pillars = [
  {
    icon: Target,
    title: "Enfoque en resultados",
    description:
      "Cada línea de código está orientada a resolver problemas reales de tu negocio y generar valor medible.",
  },
  {
    icon: Users,
    title: "PyMEs, medianas y gobierno",
    description:
      "Soluciones a la medida para empresas en crecimiento e instituciones públicas: escalables, seguras y adaptadas a cada sector.",
  },
  {
    icon: Rocket,
    title: "Desarrollo ágil",
    description:
      "Metodología iterativa con entregas frecuentes. Ves avances reales desde las primeras semanas del proyecto.",
  },
  {
    icon: Award,
    title: "Certificaciones vigentes",
    description:
      "Certificados en IA Generativa, Ciencia de Datos Aplicada y Business Intelligence — respaldo formal de nuestra expertise.",
  },
];

export default function Enfoque() {
  return (
    <section id="enfoque" className="bg-white pt-10 pb-20 lg:pt-12 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Enfoque"
          title="Simple, inteligente, confiable"
          description="Desde 2012, con certificaciones en IA Generativa, Ciencia de Datos Aplicada y Business Intelligence."
        />

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/50 p-6 transition hover:border-eotechne-green/30 hover:shadow-xl hover:shadow-eotechne-green/5 sm:p-8"
            >
              <div className="absolute -right-2 -top-2 text-6xl font-bold text-eotechne-green/5 transition group-hover:text-eotechne-green/10 sm:-right-4 sm:-top-4 sm:text-8xl">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-eotechne-green/10 text-eotechne-green transition group-hover:bg-eotechne-green group-hover:text-white">
                  <pillar.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-lg font-bold text-eotechne-blue-dark">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
