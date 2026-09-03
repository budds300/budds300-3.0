import Image from "next/image";
import Link from "next/link";
import type { GlobalSetting, Media, ServiceOffering } from "@/payload-types";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { SERVICE_ICONS } from "@/lib/service-icons";
import { getYearsOfExperience } from "@/lib/experience";

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

export function About({
  settings,
  offerings = [],
  viewAllHref,
}: {
  settings: GlobalSetting | null;
  offerings?: ServiceOffering[];
  viewAllHref?: string;
}) {
  const aboutImage =
    settings?.aboutImage && typeof settings.aboutImage === "object"
      ? (settings.aboutImage as Media)
      : null;
  const email = settings?.contactDetails?.email;
  const yearsOfExperience = getYearsOfExperience();

  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal className="card relative overflow-visible p-4 sm:p-6">
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
                  src={aboutImage.sizes?.card?.url || aboutImage.url}
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
              href="/contact"
              className="btn-glow mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              Read More
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </Reveal>

      <StaggerGroup className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]" stagger={0.08}>
        <div className="flex flex-col gap-6">
          <StaggerItem className="stat-tile flex flex-1 flex-col items-center justify-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-background-elevated-solid text-2xl font-extrabold text-foreground">
              <Counter value={yearsOfExperience} suffix="+" />
            </span>
            <p className="mt-6 text-lg font-semibold">
              Years of
              <br />
              Experience
            </p>
          </StaggerItem>
          {email ? (
            <StaggerItem>
              <a
                href={`mailto:${email}`}
                className="stat-tile flex items-center gap-4 p-5 text-left transition-colors hover:bg-background-elevated-solid"
              >
                <span className="icon-badge shrink-0 bg-accent text-accent-foreground">
                  <MailIcon />
                </span>
                <span>
                  <span className="block text-sm text-muted">For any Help:</span>
                  <span className="block truncate font-semibold">{email}</span>
                </span>
              </a>
            </StaggerItem>
          ) : (
            <StaggerItem className="stat-tile flex items-center gap-4 p-5 text-left">
              <span className="icon-badge shrink-0 bg-accent text-accent-foreground">
                <MailIcon />
              </span>
              <span className="font-semibold">Let&apos;s talk</span>
            </StaggerItem>
          )}
        </div>
        <div className="flex flex-col gap-6">
          {offerings.length > 0 && viewAllHref ? (
            <div className="flex justify-end">
              <Link
                href={viewAllHref}
                className="shrink-0 text-sm font-medium text-accent hover:underline"
              >
                View All &rarr;
              </Link>
            </div>
          ) : null}
          <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2">
            {offerings.slice(0, 4).map((offering) => (
              <StaggerItem
                key={offering.id}
                className="stat-tile flex flex-col items-center py-8 text-center"
              >
                <span className="text-accent">{SERVICE_ICONS[offering.icon]}</span>
                <p className="mt-4 font-semibold">{offering.title}</p>
                <p className="mt-1 line-clamp-2 text-sm text-muted">
                  {offering.description}
                </p>
              </StaggerItem>
            ))}
          </div>
        </div>
      </StaggerGroup>
    </section>
  );
}
