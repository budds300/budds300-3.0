import Link from "next/link";
import type { GlobalSetting } from "@/payload-types";

export function Footer({ settings }: { settings: GlobalSetting | null }) {
  const year = new Date().getFullYear();
  const contact = settings?.contactDetails;

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {year} All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/privacy-policy" className="hover:text-foreground">
            Privacy Policy
          </Link>
          {contact?.email ? (
            <a href={`mailto:${contact.email}`} className="hover:text-foreground">
              Email
            </a>
          ) : null}
          {contact?.github ? (
            <a href={contact.github} className="hover:text-foreground">
              GitHub
            </a>
          ) : null}
          {contact?.linkedin ? (
            <a href={contact.linkedin} className="hover:text-foreground">
              LinkedIn
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
