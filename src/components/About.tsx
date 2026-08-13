import Image from "next/image";
import Link from "next/link";
import type { GlobalSetting, Media } from "@/payload-types";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
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
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        {aboutImage?.url ? (
          <div className="arch-frame w-full">
            <div className="relative aspect-[4/5] w-full bg-background-elevated">
              <Image
                src={aboutImage.url}
                alt={aboutImage.alt || "About me"}
                fill
                sizes="(min-width: 1024px) 28rem, 100vw"
                className="object-cover grayscale"
              />
            </div>
          </div>
        ) : null}
        <div className="card flex flex-col justify-center p-8 sm:p-10">
          <span className="text-sm font-medium uppercase tracking-wider text-accent">
            Why Work With Me
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
          </Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="stat-tile">
          <p className="text-4xl font-extrabold text-accent">6+</p>
          <p className="mt-2 text-sm text-muted">Years of Experience</p>
        </div>
        <div className="stat-tile">
          <p className="text-4xl font-extrabold text-accent">40+</p>
          <p className="mt-2 text-sm text-muted">Projects Delivered</p>
        </div>
        <div className="stat-tile">
          <p className="text-4xl font-extrabold text-accent">15+</p>
          <p className="mt-2 text-sm text-muted">Happy Clients</p>
        </div>
        {email ? (
          <a href={`mailto:${email}`} className="stat-tile transition-colors hover:border-accent">
            <span className="icon-badge mx-auto text-accent-foreground">
              <MailIcon />
            </span>
            <p className="mt-3 text-sm text-muted">For any help</p>
            <p className="mt-1 truncate font-medium">{email}</p>
          </a>
        ) : (
          <div className="stat-tile">
            <span className="icon-badge mx-auto text-accent-foreground">
              <MailIcon />
            </span>
            <p className="mt-3 text-sm text-muted">Let&apos;s talk</p>
          </div>
        )}
      </div>
    </section>
  );
}
