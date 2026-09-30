import type { GlobalSetting, Media } from "@/payload-types";

export function JsonLd({
  settings,
  siteUrl,
}: {
  settings: GlobalSetting | null;
  siteUrl: string;
}) {
  const brandName = "Tamminga Budds";
  const alternateNames = [
    "Taminga Buds",
    "Tamminga Buds",
    "Taminga Budds",
  ];

  const description =
    settings?.metaDescription?.trim() ||
    settings?.bio ||
    "Official portfolio of Tamminga Budds — Software engineer in Nairobi building enterprise platforms, business systems, and web applications.";

  const email = settings?.contactDetails?.email;
  const sameAs = [
    settings?.contactDetails?.github,
    settings?.contactDetails?.linkedin,
    settings?.contactDetails?.twitter,
  ].filter(Boolean);

  const logoImage =
    settings?.logo && typeof settings.logo === "object"
      ? (settings.logo as Media)
      : null;
  const logoUrl = logoImage?.url
    ? logoImage.url.startsWith("http")
      ? logoImage.url
      : `${siteUrl}${logoImage.url}`
    : undefined;

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: brandName,
    alternateName: alternateNames,
    url: siteUrl,
    logo: logoUrl,
    description,
    email: email || undefined,
    sameAs: sameAs.length ? sameAs : undefined,
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${siteUrl}/#localbusiness`,
    name: brandName,
    alternateName: alternateNames,
    url: siteUrl,
    logo: logoUrl,
    description,
    email: email || undefined,
    sameAs: sameAs.length ? sameAs : undefined,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    areaServed: "Worldwide",
    serviceType: "Software Engineering",
  };

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: brandName,
    alternateName: alternateNames,
    jobTitle: "Software Engineer",
    description,
    url: siteUrl,
    email: email || undefined,
    sameAs: sameAs.length ? sameAs : undefined,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: brandName,
    alternateName: alternateNames,
    url: siteUrl,
  };

  const schemas = [organization, localBusiness, person, website];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}

