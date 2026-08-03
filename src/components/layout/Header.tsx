"use client";

import { useCallback, useEffect, useState } from "react";
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

function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const header = document.querySelector("header");
  const headerHeight = header?.getBoundingClientRect().height ?? 76;
  const top =
    target.getBoundingClientRect().top + window.scrollY - headerHeight;

  window.scrollTo({ top, behavior: "smooth" });
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSectionNav = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (pathname !== "/" || !href.startsWith("/#")) return;

      event.preventDefault();
      scrollToSection(href.slice(2));
      setMobileOpen(false);
    },
    [pathname],
  );

  useEffect(() => {
    if (pathname !== "/" || !window.location.hash) return;

    const id = window.location.hash.slice(1);
    requestAnimationFrame(() => scrollToSection(id));
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[var(--header-height)] bg-eotechne-blue-dark">
      <div className="mx-auto flex h-full max-w-7xl min-w-0 items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="min-w-0 shrink"
          onClick={(event) => {
            if (pathname !== "/") return;
            event.preventDefault();
            window.history.replaceState(null, "", "/");
            window.scrollTo({ top: 0, behavior: "smooth" });
            setMobileOpen(false);
          }}
        >
          <TypewriterCircuitLogo size="sm" dark />
        </Link>

        <nav className="hidden items-center gap-2 lg:flex xl:gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(event) => handleSectionNav(event, link.href)}
              className={`text-sm font-medium text-white/80 transition hover:text-eotechne-green ${
                pathname === link.href ? "text-eotechne-green" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contacto"
            onClick={(event) => handleSectionNav(event, "/#contacto")}
            className="rounded-full bg-eotechne-green px-3 py-1.5 text-sm font-semibold text-eotechne-blue-dark transition hover:bg-eotechne-green-light xl:px-4 xl:py-2"
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
                onClick={(event) => handleSectionNav(event, link.href)}
                className="rounded-lg px-4 py-3 text-white/80 transition hover:bg-white/5 hover:text-eotechne-green"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contacto"
              onClick={(event) => handleSectionNav(event, "/#contacto")}
              className="mt-2 rounded-full bg-eotechne-green px-4 py-3 text-center font-semibold text-eotechne-blue-dark"
            >
              Cotiza tu proyecto
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
