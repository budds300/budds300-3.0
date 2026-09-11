"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const LINKS = [
  { href: "/#home", section: "home", label: "Home" },
  { href: "/#services", section: "services", label: "Services" },
  { href: "/#projects", section: "projects", label: "Work" },
  { href: "/#clients", section: "clients", label: "Clients" },
  { href: "/#testimonials", section: "testimonials", label: "Reviews" },
  { href: "/contact", section: "contact", label: "Contact" },
];

type HeaderLogo = {
  url: string;
  alt: string;
  width: number;
  height: number;
};

export function Header({ logo }: { logo?: HeaderLogo | null }) {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sectionIds = useMemo(
    () => LINKS.map((link) => link.section).filter((section) => section !== "contact"),
    [],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      {
        rootMargin: "-36% 0px -52% 0px",
        threshold: [0.08, 0.2, 0.4, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname, sectionIds]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-30 px-3 pt-3">
      <nav
        className={`mx-auto flex max-w-5xl items-center justify-between rounded-full border px-4 py-3 transition-all duration-300 sm:px-5 ${
          scrolled
            ? "border-accent/30 bg-background-elevated/92 shadow-[0_18px_60px_rgb(0_0_0/0.28)] backdrop-blur-xl"
            : "border-border/70 bg-background/60"
        }`}
      >
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          {logo ? (
            <Image
              src={logo.url}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="h-9 w-auto"
              priority
            />
          ) : (
            <>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-black text-accent-foreground">
                TB
              </span>
              tamminga<span className="text-accent">.</span>dev
            </>
          )}
        </Link>
        <ul className="hidden items-center gap-1 rounded-full border border-border bg-background/50 p-1 text-sm text-muted md:flex">
          {LINKS.map((link) => {
            const active =
              pathname === "/"
                ? activeSection === link.section
                : link.href !== "/" && pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "rounded-full bg-foreground px-3 py-1.5 text-background transition-colors"
                      : "rounded-full px-3 py-1.5 transition-colors hover:text-foreground"
                  }
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="btn-glow hidden rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground transition-transform hover:-translate-y-0.5 sm:inline-block sm:px-5"
          >
            Let&apos;s Talk
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent/50 md:hidden"
          >
            <span className="relative flex h-4 w-5 flex-col justify-between">
              <span
                className={`h-0.5 w-full rounded-full bg-current transition-transform duration-200 ${
                  menuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full rounded-full bg-current transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`h-0.5 w-full rounded-full bg-current transition-transform duration-200 ${
                  menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav-menu"
        className={`mx-auto mt-2 max-w-5xl origin-top overflow-hidden rounded-3xl border border-border bg-background-elevated/95 shadow-[0_18px_60px_rgb(0_0_0/0.28)] backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden ${
          menuOpen ? "max-h-[28rem] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 p-3 text-base text-muted" aria-hidden={!menuOpen}>
          {LINKS.map((link) => {
            const active =
              pathname === "/"
                ? activeSection === link.section
                : link.href !== "/" && pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  tabIndex={menuOpen ? 0 : -1}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={
                    active
                      ? "block rounded-xl bg-foreground px-4 py-3 font-semibold text-background transition-colors"
                      : "block rounded-xl px-4 py-3 transition-colors hover:bg-background/60 hover:text-foreground"
                  }
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li className="pt-1">
            <Link
              href="/contact"
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
              className="btn-glow block rounded-xl bg-accent px-4 py-3 text-center font-bold text-accent-foreground transition-transform"
            >
              Let&apos;s Talk
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
