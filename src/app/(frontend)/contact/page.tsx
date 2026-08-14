import type { Metadata } from "next";
import { getPayloadClient } from "@/lib/payload";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const payload = await getPayloadClient();
  const settings = await payload
    .findGlobal({ slug: "global-settings" })
    .catch(() => null);
  const contact = settings?.contactDetails;

  return (
    <div className="pt-16">
      <ContactForm />
      {contact?.email || contact?.phone || contact?.linkedin || contact?.github ? (
        <Reveal className="mx-auto max-w-2xl px-6 pb-24">
          <div className="card flex flex-col gap-3 p-6 text-sm">
            {contact.email ? (
              <a href={`mailto:${contact.email}`} className="hover:text-accent">
                {contact.email}
              </a>
            ) : null}
            {contact.phone ? (
              <a href={`tel:${contact.phone}`} className="hover:text-accent">
                {contact.phone}
              </a>
            ) : null}
            <div className="flex gap-4 text-muted">
              {contact.linkedin ? (
                <a href={contact.linkedin} className="hover:text-foreground">
                  LinkedIn
                </a>
              ) : null}
              {contact.github ? (
                <a href={contact.github} className="hover:text-foreground">
                  GitHub
                </a>
              ) : null}
              {contact.twitter ? (
                <a href={contact.twitter} className="hover:text-foreground">
                  Twitter
                </a>
              ) : null}
            </div>
          </div>
        </Reveal>
      ) : null}
    </div>
  );
}
