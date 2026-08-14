import Image from "next/image";
import Link from "next/link";
import type { GlobalSetting, Media } from "@/payload-types";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { MotionAnchor } from "@/components/motion/MotionButton";

const FALLBACK_HEADLINE = "Full-Stack / Software Engineer";
const FALLBACK_BIO =
  "I design and build fast, reliable web products end-to-end — from data models to pixel-polished UI.";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.94 9.94 0 0 0 4.84 1.23h.01c5.5 0 9.96-4.45 9.96-9.95S17.54 2 12.04 2Zm0 18.2h-.01a8.24 8.24 0 0 1-4.2-1.15l-.3-.18-3.1.81.83-3.02-.2-.31a8.22 8.22 0 0 1-1.27-4.39c0-4.55 3.7-8.24 8.26-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.71 8.23-8.25 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.4-.12-.56.13-.17.24-.64.8-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.38-1.99-1.22-.74-.65-1.23-1.46-1.38-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.24-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.83-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.22.25-.87.85-.87 2.07s.89 2.4 1.02 2.57c.12.17 1.75 2.67 4.25 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z" />
    </svg>
  );
}

export function Hero({ settings }: { settings: GlobalSetting | null }) {
  const headline = settings?.headline || FALLBACK_HEADLINE;
  const bio = settings?.bio || FALLBACK_BIO;
  const resume =
    settings?.resumePDF && typeof settings.resumePDF === "object"
      ? (settings.resumePDF as Media).url
      : null;
  const profileImage =
    settings?.profileImage && typeof settings.profileImage === "object"
      ? (settings.profileImage as Media)
      : null;
  const phone = settings?.contactDetails?.phone;
  const whatsappHref = phone
    ? `https://wa.me/${phone.replace(/[^0-9]/g, "")}`
    : null;

  return (
    <section id="home" className="bg-grid relative -mt-[4.75rem] overflow-hidden border-b border-border pt-[4.75rem]">
      <div
        className="pointer-events-none absolute -top-36 left-1/2 h-96 w-[36rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--accent)" }}
        aria-hidden
      />
      <div className="relative mx-auto grid min-h-[calc(100vh-4.75rem)] max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 sm:py-28 lg:grid-cols-[0.95fr_1.05fr]">
        <StaggerGroup className="flex flex-col items-start gap-6" stagger={0.14}>
          <StaggerItem>
            <span className="section-kicker">
              Available for new projects
            </span>
          </StaggerItem>
          <StaggerItem>
            <h1 className="max-w-2xl text-5xl font-black leading-[0.96] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.6rem]">
              {headline}
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="max-w-2xl text-lg leading-8 text-muted">{bio}</p>
          </StaggerItem>
          <StaggerItem className="flex flex-wrap items-center gap-4 pt-2">
            <>
              {whatsappHref ? (
                <MotionAnchor
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glow flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground"
                >
                  <WhatsAppIcon />
                  Chat on WhatsApp
                </MotionAnchor>
              ) : (
                <Link
                  href="/contact"
                  className="btn-glow rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
                >
                  Let&apos;s Talk
                </Link>
              )}
              <Link
                href="#projects"
                className="rounded-full border border-border px-6 py-3 font-medium transition-colors hover:border-accent"
              >
                See Work
              </Link>
              {resume ? (
                <MotionAnchor
                  href={resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border px-6 py-3 font-medium"
                >
                  Download CV
                </MotionAnchor>
              ) : null}
            </>
          </StaggerItem>
        </StaggerGroup>
        {profileImage?.url ? (
          <Reveal x={40} delay={0.2} className="relative mx-auto w-full max-w-md xl:max-w-lg">
            <div className="absolute -right-3 top-12 z-10 rounded-full border border-accent/35 bg-background-elevated px-4 py-2 text-sm font-semibold text-accent shadow-2xl sm:-right-8">
              5+ Years
            </div>
            <div className="rounded-t-full border-[6px] border-accent bg-background-elevated/70 p-3 shadow-[0_0_70px_rgb(214_255_69/0.16)]">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-full bg-background">
                <Image
                  src={profileImage.url}
                  alt={profileImage.alt || "Profile photo"}
                  fill
                  sizes="(min-width: 1280px) 32rem, (min-width: 1024px) 28rem, 22rem"
                  className="object-contain object-bottom"
                  priority
                />
              </div>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
