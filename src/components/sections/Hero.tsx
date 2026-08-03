"use client";

import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerChildren";
import { TAGLINE } from "@/lib/brand";

const heroGlobos: { icon: LucideIcon; label: string }[] = [
  { icon: Award, label: "IA Generativa" },
  { icon: Award, label: "Ciencia de Datos Aplicada" },
  { icon: Award, label: "Business Intelligence" },
  { icon: Award, label: "Desarrollo Full Stack" },
  { icon: Award, label: "Frontend" },
  { icon: Award, label: "Backend" },
  { icon: Award, label: "DevOps y Nube" },
];

const stats = [
  { value: "2012", label: "Desde entonces innovando" },
  { value: "3", label: "Certificaciones vigentes" },
  { value: "15+", label: "Años en colaboración freelance" },
  { value: "100+", label: "Proyectos entregados" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-eotechne-green/15 via-transparent to-transparent"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-eotechne-blue/10 via-transparent to-transparent"
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300497b' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pt-20 pb-12 sm:px-6 sm:pt-24 sm:pb-16 lg:px-8">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-eotechne-green/40 bg-eotechne-green/10 px-3 py-1.5 text-xs font-medium leading-snug text-eotechne-blue-dark sm:px-4 sm:text-sm"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-eotechne-green opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-eotechne-green" />
            </span>
            {TAGLINE}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl font-bold leading-tight tracking-tight text-eotechne-blue-dark sm:text-5xl lg:text-7xl"
          >
            Impulsamos tu negocio con{" "}
            <span className="bg-gradient-to-r from-eotechne-green to-eotechne-blue bg-clip-text text-transparent">
              tecnología
            </span>{" "}
            que transforma
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl"
          >
            Desde <span className="font-semibold text-eotechne-blue-dark">2012</span>{" "}
            creamos sistemas a la medida para pequeñas y medianas empresas e
            instituciones de gobierno. Actualmente certificados en IA Generativa,
            Ciencia de Datos Aplicada y Business Intelligence.
          </motion.p>

          <StaggerContainer className="mt-8 flex flex-wrap items-center gap-3" delay={0.5}>
            {heroGlobos.map(({ icon: Icon, label }) => (
              <StaggerItem key={label}>
                <motion.span
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="inline-flex max-w-full items-center gap-2 rounded-full border border-eotechne-blue/20 bg-eotechne-blue/5 px-3 py-2 text-xs font-semibold text-eotechne-blue-dark sm:px-5 sm:py-2.5 sm:text-sm"
                >
                  <Icon className="h-4 w-4 shrink-0 text-eotechne-green" />
                  {label}
                </motion.span>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <Link
              href="#contacto"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-eotechne-green px-6 py-3.5 font-semibold text-eotechne-blue-dark transition hover:bg-eotechne-green-light sm:w-auto sm:px-8 sm:py-4"
            >
              Inicia tu proyecto
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="#servicios"
              className="inline-flex w-full items-center justify-center rounded-full border border-eotechne-blue-dark/20 px-6 py-3.5 font-semibold text-eotechne-blue-dark transition hover:border-eotechne-green hover:bg-eotechne-green/5 sm:w-auto sm:px-8 sm:py-4"
            >
              Conoce nuestros servicios
            </Link>
          </motion.div>
        </div>

        <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 border-t border-gray-200 pt-10 min-[480px]:grid-cols-2 sm:mt-20 sm:gap-8 sm:pt-12 lg:grid-cols-4" delay={1}>
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <motion.div whileHover={{ y: -4 }}>
                <div className="text-2xl font-bold text-eotechne-green sm:text-3xl lg:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-gray-500 sm:text-sm">{stat.label}</div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
