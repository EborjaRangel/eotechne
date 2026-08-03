interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  light?: boolean;
}

export default function SectionHeading({
  label,
  title,
  description,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="text-center">
        <span
          className={`inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest ${
            light
              ? "bg-white/10 text-eotechne-green"
              : "bg-eotechne-green/10 text-eotechne-green"
          }`}
        >
          {label}
        </span>
      </div>
      <h2
        className={`mt-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl ${
          light ? "text-white" : "text-eotechne-blue-dark"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            light ? "text-white/70" : "text-gray-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
