import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getGlobalSettings } from "@/lib/frontend-data";
import { ContactForm } from "@/components/ContactForm";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
};

export const revalidate = 300;

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1.5 1.5 0 0 1 1.5-.37 10.7 10.7 0 0 0 3.4.54 1.5 1.5 0 0 1 1.5 1.5V20.5a1.5 1.5 0 0 1-1.5 1.5A17.5 17.5 0 0 1 2.5 4.4 1.5 1.5 0 0 1 4 2.9h3.1a1.5 1.5 0 0 1 1.5 1.5c0 1.19.19 2.34.54 3.4a1.5 1.5 0 0 1-.37 1.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.3c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21h-4V9Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.37-3.37-1.37-.46-1.2-1.11-1.52-1.11-1.52-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.64-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.2C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M18.9 2.9h3.1l-6.8 7.8L23.3 21h-6.3l-4.9-6.4L6.4 21H3.3l7.3-8.3L2.7 2.9H9.2l4.5 5.9 5.2-5.9Zm-1.1 16.3h1.7L7.3 4.7H5.5l12.3 14.5Z" />
    </svg>
  );
}

export default async function ContactPage() {
  const settings = await getGlobalSettings();
  const contact = settings?.contactDetails;
  const whatsappNumber = contact?.whatsapp || contact?.phone;
  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}${
        contact?.whatsappMessage
          ? `?text=${encodeURIComponent(contact.whatsappMessage)}`
          : ""
      }`
    : null;

  const socials: { href: string; label: string; icon: ReactNode }[] = [
    contact?.linkedin
      ? { href: contact.linkedin, label: "LinkedIn", icon: <LinkedInIcon /> }
      : null,
    contact?.github
      ? { href: contact.github, label: "GitHub", icon: <GitHubIcon /> }
      : null,
    contact?.twitter
      ? { href: contact.twitter, label: "Twitter", icon: <TwitterIcon /> }
      : null,
  ].filter((s) => s !== null);

  const hasDirectContact = whatsappHref || contact?.email || contact?.phone;

  return (
    <div className="pt-16">
      <ContactForm />
      {hasDirectContact || socials.length > 0 ? (
        <section className="mx-auto max-w-2xl px-6 pb-24">
          {whatsappHref ? (
            <Reveal>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="card group relative flex items-center gap-4 overflow-hidden p-6 ring-1 ring-accent/25"
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-30"
                  style={{ background: "var(--accent)" }}
                  aria-hidden
                />
                <span className="icon-tile relative h-14 w-14 shrink-0 bg-accent text-accent-foreground">
                  <WhatsAppIcon size={26} />
                </span>
                <span className="relative flex-1">
                  <span className="block font-semibold text-foreground">
                    Chat on WhatsApp
                  </span>
                  <span className="block text-sm text-muted">
                    Usually replies within minutes
                  </span>
                </span>
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="relative shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"
                  aria-hidden
                >
                  <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Reveal>
          ) : null}

          {contact?.email || contact?.phone ? (
            <StaggerGroup
              className={`grid gap-4 sm:grid-cols-2 ${whatsappHref ? "mt-4" : ""}`}
            >
              {contact.email ? (
                <StaggerItem>
                  <a
                    href={`mailto:${contact.email}`}
                    className="card flex items-center gap-3 p-5 hover:text-accent"
                  >
                    <span className="icon-tile shrink-0">
                      <MailIcon />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-wide text-muted">
                        Email
                      </span>
                      <span className="block truncate text-sm font-medium text-foreground">
                        {contact.email}
                      </span>
                    </span>
                  </a>
                </StaggerItem>
              ) : null}
              {contact.phone ? (
                <StaggerItem>
                  <a
                    href={`tel:${contact.phone}`}
                    className="card flex items-center gap-3 p-5 hover:text-accent"
                  >
                    <span className="icon-tile shrink-0">
                      <PhoneIcon />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-wide text-muted">
                        Phone
                      </span>
                      <span className="block truncate text-sm font-medium text-foreground">
                        {contact.phone}
                      </span>
                    </span>
                  </a>
                </StaggerItem>
              ) : null}
            </StaggerGroup>
          ) : null}

          {socials.length > 0 ? (
            <Reveal className="mt-8 flex justify-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="icon-tile text-muted transition-colors hover:text-accent"
                >
                  {s.icon}
                </a>
              ))}
            </Reveal>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
