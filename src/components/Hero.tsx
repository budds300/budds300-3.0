import Image from "next/image";
import Link from "next/link";
import type { GlobalSetting, Media } from "@/payload-types";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { MotionAnchor } from "@/components/motion/MotionButton";
import { getYearsOfExperience } from "@/lib/experience";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

const FALLBACK_HEADLINE = "Full-Stack / Software Engineer";
const FALLBACK_BIO =
  "I design and build fast, reliable web products end-to-end — from data models to pixel-polished UI.";

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
  const whatsappNumber =
    settings?.contactDetails?.whatsapp || settings?.contactDetails?.phone;
  const whatsappMessage = settings?.contactDetails?.whatsappMessage;
  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}${
        whatsappMessage ? `?text=${encodeURIComponent(whatsappMessage)}` : ""
      }`
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
            <h1 className="max-w-2xl text-3xl font-black leading-[0.96] tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
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
              {getYearsOfExperience()}+ Years
            </div>
            <div className="rounded-t-full border-[6px] border-accent bg-background-elevated/70 p-3 shadow-[0_0_70px_rgb(214_255_69/0.16)]">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-full bg-background">
                <Image
                  src={profileImage.sizes?.hero?.url || profileImage.url}
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
