import Link from "next/link";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#what-i-do", label: "Services" },
  { href: "#stack", label: "Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#pricing", label: "Pricing" },
  { href: "#experience", label: "Experience" },
  { href: "#testimonials", label: "Testimonials" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="icon-tile h-8 w-8 text-sm">TB</span>
          tamminga<span className="text-accent">.</span>dev
        </Link>
        <ul className="hidden gap-8 text-sm text-muted sm:flex">
          {LINKS.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={
                  i === 0
                    ? "border-b-2 border-accent pb-1 text-foreground transition-colors"
                    : "pb-1 transition-colors hover:text-foreground"
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="btn-glow rounded-full bg-accent px-5 py-2 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
        >
          Contact Me
        </a>
      </nav>
    </header>
  );
}
