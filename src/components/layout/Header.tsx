"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import TypewriterCircuitLogo from "@/components/ui/TypewriterCircuitLogo";

const navLinks = [
  { href: "/#enfoque", label: "Enfoque" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#industrias", label: "Industrias" },
  { href: "/#tecnologias", label: "Tecnologías" },
  { href: "/blog", label: "Blog" },
  { href: "/#contacto", label: "Contacto" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-eotechne-blue-dark shadow-lg">
      <div className="mx-auto flex max-w-7xl min-w-0 items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <Link href="/" className="min-w-0 shrink">
          <TypewriterCircuitLogo size="sm" dark />
        </Link>

        <nav className="hidden items-center gap-4 lg:flex xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium text-white/80 transition hover:text-eotechne-green ${
                pathname === link.href ? "text-eotechne-green" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contacto"
            className="rounded-full bg-eotechne-green px-4 py-2 text-sm font-semibold text-eotechne-blue-dark transition hover:bg-eotechne-green-light xl:px-5 xl:py-2.5"
          >
            Cotiza tu proyecto
          </Link>
        </nav>

        <button
          type="button"
          className="shrink-0 text-white lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-eotechne-blue-dark lg:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-3 text-white/80 transition hover:bg-white/5 hover:text-eotechne-green"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contacto"
              className="mt-2 rounded-full bg-eotechne-green px-4 py-3 text-center font-semibold text-eotechne-blue-dark"
              onClick={() => setMobileOpen(false)}
            >
              Cotiza tu proyecto
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
