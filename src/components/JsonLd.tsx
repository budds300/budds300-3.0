import type { GlobalSetting } from "@/payload-types";

export function JsonLd({
  settings,
  siteUrl,
}: {
  settings: GlobalSetting | null;
  siteUrl: string;
}) {
  const name = settings?.headline || "Full-Stack / Software Engineer";
  const description =
    settings?.bio ||
    "Full-stack software engineer building fast, reliable web products.";
  const email = settings?.contactDetails?.email;
  const sameAs = [
    settings?.contactDetails?.github,
    settings?.contactDetails?.linkedin,
    settings?.contactDetails?.twitter,
  ].filter(Boolean);

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    description,
    url: siteUrl,
    email: email || undefined,
    sameAs: sameAs.length ? sameAs : undefined,
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name,
    description,
    url: siteUrl,
    areaServed: "Worldwide",
    serviceType: "Software Engineering",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
    </>
  );
}
