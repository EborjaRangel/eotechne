"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import EotechneLogo from "@/components/ui/EotechneLogo";

const navLinks = [
  { href: "/#enfoque", label: "Enfoque", sectionId: "enfoque" },
  { href: "/#servicios", label: "Servicios", sectionId: "servicios" },
  { href: "/#industrias", label: "Industrias", sectionId: "industrias" },
  { href: "/#tecnologias", label: "Tecnologías", sectionId: "tecnologias" },
  { href: "/blog", label: "Blog", sectionId: null },
  { href: "/#contacto", label: "Contacto", sectionId: "contacto" },
];

const homeSectionIds = navLinks
  .map((link) => link.sectionId)
  .filter((id): id is string => id !== null);

function navLinkClassName(isActive: boolean, mobile = false) {
  const base = mobile
    ? "rounded-lg px-4 py-3 transition hover:bg-white/5 hover:text-eotechne-green"
    : "pb-0.5 transition hover:text-eotechne-green";

  return isActive
    ? `${base} text-eotechne-green underline decoration-eotechne-green decoration-2 underline-offset-4`
    : `${base} text-white/80`;
}

function isNavLinkActive(
  href: string,
  sectionId: string | null,
  pathname: string,
  activeSection: string | null,
) {
  if (href === "/blog") return pathname === "/blog";
  if (sectionId && pathname === "/") return activeSection === sectionId;
  return false;
}

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
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleSectionNav = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string, sectionId: string | null) => {
      if (sectionId && pathname === "/") {
        event.preventDefault();
        setActiveSection(sectionId);
        window.history.replaceState(null, "", href);
        scrollToSection(sectionId);
        setMobileOpen(false);
        return;
      }

      if (pathname === "/" && href.startsWith("/#")) {
        event.preventDefault();
        const id = href.slice(2);
        setActiveSection(id);
        window.history.replaceState(null, "", href);
        scrollToSection(id);
        setMobileOpen(false);
      }
    },
    [pathname],
  );

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const updateActiveSection = () => {
      const header = document.querySelector("header");
      const headerHeight = header?.getBoundingClientRect().height ?? 76;
      const offset = headerHeight + 24;
      let current: string | null = null;

      for (const id of homeSectionIds) {
        const section = document.getElementById(id);
        if (!section) continue;

        const top = section.getBoundingClientRect().top;
        if (top <= offset) current = id;
      }

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/" || !window.location.hash) return;

    const id = window.location.hash.slice(1);
    setActiveSection(id);
    requestAnimationFrame(() => scrollToSection(id));
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[var(--header-height)] bg-eotechne-blue-dark">
      <div className="mx-auto flex h-full max-w-7xl min-w-0 items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="shrink-0"
          onClick={(event) => {
            if (pathname !== "/") return;
            event.preventDefault();
            window.history.replaceState(null, "", "/");
            setActiveSection(null);
            window.scrollTo({ top: 0, behavior: "smooth" });
            setMobileOpen(false);
          }}
        >
          <EotechneLogo size="sm" priority />
        </Link>

        <nav className="hidden items-center gap-2 lg:flex xl:gap-3">
          {navLinks.map((link) => {
            const isActive = isNavLinkActive(
              link.href,
              link.sectionId,
              pathname,
              activeSection,
            );

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                onClick={(event) =>
                  handleSectionNav(event, link.href, link.sectionId)
                }
                className={`text-sm font-medium ${navLinkClassName(isActive)}`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/#contacto"
            onClick={(event) => handleSectionNav(event, "/#contacto", "contacto")}
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
            {navLinks.map((link) => {
              const isActive = isNavLinkActive(
                link.href,
                link.sectionId,
                pathname,
                activeSection,
              );

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={(event) =>
                    handleSectionNav(event, link.href, link.sectionId)
                  }
                  className={navLinkClassName(isActive, true)}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/#contacto"
              onClick={(event) =>
                handleSectionNav(event, "/#contacto", "contacto")
              }
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
