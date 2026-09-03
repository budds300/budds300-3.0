import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { MotionAnchor } from "@/components/motion/MotionButton";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CtaBanner({
  heading,
  bullets,
  buttonLabel,
  buttonHref,
}: {
  heading: string;
  bullets?: string[];
  buttonLabel: string;
  buttonHref: string;
}) {
  const external = buttonHref.startsWith("http");

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <Reveal className="card relative overflow-hidden p-8 text-center ring-1 ring-accent/30 sm:p-12">
        <div
          className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[32rem] -translate-x-1/2 rounded-full opacity-10 blur-3xl"
          style={{ background: "var(--accent)" }}
          aria-hidden
        />
        <div className="relative">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            {heading}
          </h2>
          {bullets?.length ? (
            <ul className="mx-auto mt-4 flex max-w-lg flex-col items-center gap-1 text-foreground/70 sm:flex-row sm:justify-center sm:gap-6">
              {bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          ) : null}
          {external ? (
            <MotionAnchor
              href={buttonHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground"
            >
              {buttonLabel}
              <ArrowIcon />
            </MotionAnchor>
          ) : (
            <Link
              href={buttonHref}
              className="btn-glow mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              {buttonLabel}
              <ArrowIcon />
            </Link>
          )}
        </div>
      </Reveal>
    </section>
  );
}
