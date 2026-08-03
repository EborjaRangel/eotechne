import { Sparkles, Calendar, Handshake, Award, Brain, LineChart } from "lucide-react";

const certifications = [
  {
    icon: Sparkles,
    title: "IA Generativa",
    description: "Certificación vigente en modelos y aplicaciones de inteligencia artificial generativa.",
  },
  {
    icon: Brain,
    title: "Ciencia de Datos Aplicada",
    description: "Certificación en análisis, modelado y extracción de valor desde datos reales.",
  },
  {
    icon: LineChart,
    title: "Business Intelligence",
    description: "Certificación en dashboards, KPIs y reportes para decisiones estratégicas.",
  },
];

export default function Speech() {
  return (
    <section className="relative overflow-hidden bg-gray-50 pt-10 pb-16 lg:pt-12 lg:pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(142,196,75,0.08)_0%,_transparent_70%)]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block text-6xl leading-none text-eotechne-green/30 sm:text-7xl">
            &ldquo;
          </span>
        </div>

        <blockquote className="mx-auto max-w-4xl text-center">
          <p className="text-xl font-semibold leading-relaxed text-eotechne-blue-dark sm:text-2xl md:text-3xl lg:text-4xl lg:leading-snug">
            Somos especialistas en{" "}
            <span className="text-eotechne-green">desarrollo a la medida</span>.
            Desde{" "}
            <span className="font-bold">2012</span> construimos soluciones que
            transforman negocios e instituciones de gobierno.
          </p>
          <p className="mt-8 text-lg leading-relaxed text-gray-600 sm:text-xl">
            Actualmente estamos{" "}
            <span className="font-semibold text-eotechne-blue-dark">certificados</span>{" "}
            en{" "}
            <span className="font-semibold text-eotechne-green">IA Generativa</span>,{" "}
            <span className="font-semibold text-eotechne-green">Ciencia de Datos Aplicada</span>{" "}
            y{" "}
            <span className="font-semibold text-eotechne-green">Business Intelligence</span>.
            Con más de 15 años de experiencia en colaboración freelance, entregamos
            proyectos con calidad, comunicación clara y compromiso total.
          </p>
        </blockquote>

        <div className="mt-14">
          <p className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-eotechne-blue-dark/60">
            Certificaciones vigentes
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex flex-col items-center rounded-2xl border border-eotechne-green/20 bg-white p-5 text-center shadow-sm sm:p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-eotechne-green/10 text-eotechne-green">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-eotechne-green/10 px-3 py-1 text-xs font-semibold text-eotechne-blue-dark">
                  <Award className="h-3.5 w-3.5 text-eotechne-green" />
                  Certificado
                </div>
                <p className="mt-4 text-lg font-bold text-eotechne-blue-dark">
                  {title}
                </p>
                <p className="mt-2 text-sm text-gray-500">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {[
            {
              icon: Calendar,
              value: "Desde 2012",
              label: "Experiencia comprobada en desarrollo a la medida",
            },
            {
              icon: Handshake,
              value: "15+ años",
              label: "Colaboración freelance con empresas y gobierno",
            },
          ].map(({ icon: Icon, value, label }) => (
            <div
              key={value}
              className="flex flex-col items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:gap-5 sm:p-6"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-eotechne-blue/10 text-eotechne-blue-dark">
                <Icon className="h-6 w-6" />
              </div>
              <div className="text-left">
                <p className="text-lg font-bold text-eotechne-blue-dark">{value}</p>
                <p className="mt-1 text-sm text-gray-500">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
