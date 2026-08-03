import SectionHeading from "@/components/ui/SectionHeading";
import { industries } from "@/lib/data/industries";

export default function Industrias() {
  return (
    <section id="industrias" className="relative overflow-hidden bg-eotechne-blue-dark pt-10 pb-20 lg:pt-12 lg:pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(142,196,75,0.08)_0%,_transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Industrias"
          title="Experiencia en múltiples sectores"
          description="Adaptamos nuestra expertise tecnológica a las necesidades específicas de cada industria."
          light
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {industries.map((industry) => (
            <div
              key={industry.name}
              className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm transition hover:border-eotechne-green/30 hover:bg-white/10"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-eotechne-green/10 text-eotechne-green transition group-hover:bg-eotechne-green group-hover:text-eotechne-blue-dark">
                <industry.icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-white/90">
                {industry.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
