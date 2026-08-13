import Image from "next/image";
import Link from "next/link";
import type { GlobalSetting, Media } from "@/payload-types";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { RotatingBadge } from "@/components/motion/RotatingBadge";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" strokeLinecap="round" />
    </svg>
  );
}

export function About({ settings }: { settings: GlobalSetting | null }) {
  const aboutImage =
    settings?.aboutImage && typeof settings.aboutImage === "object"
      ? (settings.aboutImage as Media)
      : null;
  const email = settings?.contactDetails?.email;

  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal className="card relative overflow-visible p-4 sm:p-6">
        <RotatingBadge className="absolute -right-4 -top-4 z-10 hidden sm:block" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          {aboutImage?.url ? (
            <div className="relative">
              <div
                className="frame-accent absolute -left-3 -top-3 hidden h-full w-full sm:block"
                aria-hidden
              />
              <div
                className="frame-accent absolute -left-6 -top-6 hidden h-full w-full opacity-50 sm:block"
                aria-hidden
              />
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.25rem] bg-background-elevated">
                <Image
                  src={aboutImage.url}
                  alt={aboutImage.alt || "About me"}
                  fill
                  sizes="(min-width: 1024px) 28rem, 100vw"
                  className="object-cover grayscale"
                />
              </div>
              <span className="icon-badge absolute left-4 top-4 z-10 text-accent-foreground">
                <SparkIcon />
              </span>
            </div>
          ) : null}
          <div className="flex flex-col justify-center p-2 sm:p-6">
            <span className="text-sm font-medium uppercase tracking-wider text-accent">
              Why Chose Us
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Built for clarity, shipped for speed
            </h2>
            <p className="mt-4 text-muted">
              I partner directly with founders and teams to turn ideas into
              reliable software — clear communication, sensible architecture,
              and code that&apos;s easy to hand off.
            </p>
            <Link
              href="#contact"
              className="btn-glow mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              Read More
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </Reveal>

      <StaggerGroup className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StaggerItem className="stat-tile">
          <p className="text-4xl font-extrabold text-accent">
            <Counter value={6} suffix="+" />
          </p>
          <p className="mt-2 text-sm text-muted">Years of Experience</p>
        </StaggerItem>
        <StaggerItem className="stat-tile">
          <p className="text-4xl font-extrabold text-accent">
            <Counter value={40} suffix="+" />
          </p>
          <p className="mt-2 text-sm text-muted">Projects Delivered</p>
        </StaggerItem>
        <StaggerItem className="stat-tile">
          <p className="text-4xl font-extrabold text-accent">
            <Counter value={15} suffix="+" />
          </p>
          <p className="mt-2 text-sm text-muted">Happy Clients</p>
        </StaggerItem>
        {email ? (
          <StaggerItem>
            <a
              href={`mailto:${email}`}
              className="stat-tile block transition-colors hover:bg-background-elevated-solid"
            >
              <span className="icon-badge mx-auto text-accent-foreground">
                <MailIcon />
              </span>
              <p className="mt-3 text-sm text-muted">For any help</p>
              <p className="mt-1 truncate font-medium">{email}</p>
            </a>
          </StaggerItem>
        ) : (
          <StaggerItem className="stat-tile">
            <span className="icon-badge mx-auto text-accent-foreground">
              <MailIcon />
            </span>
            <p className="mt-3 text-sm text-muted">Let&apos;s talk</p>
          </StaggerItem>
        )}
      </StaggerGroup>
    </section>
  );
}
