import { Code2, Server, Database, Cloud, GitBranch, Shield } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const technologies = [
  {
    icon: Code2,
    name: "React & Next.js",
    description: "Interfaces modernas, rápidas y optimizadas para SEO.",
  },
  {
    icon: Server,
    name: "Node.js",
    description: "APIs robustas y escalables con TypeScript.",
  },
  {
    icon: Database,
    name: "PostgreSQL",
    description: "Base de datos relacional confiable y de alto rendimiento.",
  },
  {
    icon: Cloud,
    name: "Cloud & DevOps",
    description: "Despliegue en Railway, Vercel y arquitecturas cloud.",
  },
  {
    icon: GitBranch,
    name: "CI/CD",
    description: "Integración y despliegue continuo con GitHub Actions.",
  },
  {
    icon: Shield,
    name: "Seguridad",
    description: "Autenticación, encriptación y mejores prácticas OWASP.",
  },
];

export default function Tecnologias() {
  return (
    <section id="tecnologias" className="bg-white pt-10 pb-20 lg:pt-12 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Tecnologías"
          title="Stack moderno y probado"
          description="Utilizamos las mejores herramientas del mercado para construir soluciones duraderas."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="flex gap-5 rounded-2xl border border-gray-100 p-6 transition hover:border-eotechne-blue/20 hover:shadow-lg"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-eotechne-blue-dark to-eotechne-blue text-eotechne-green">
                <tech.icon className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-bold text-eotechne-blue-dark">{tech.name}</h3>
                <p className="mt-1 text-sm text-gray-600">{tech.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
