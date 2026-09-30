import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getGlobalSettings } from "@/lib/frontend-data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { PageTransition } from "@/components/motion/PageTransition";
import type { Media } from "@/payload-types";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const PRIMARY_CANONICAL_URL =
  process.env.NEXT_PUBLIC_CANONICAL_URL || "https://www.tammingabudds.com";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getGlobalSettings();

  const title =
    settings?.metaTitle?.trim() ||
    settings?.headline ||
    "Tamminga Budds | Full-Stack Software Engineer";
  const description =
    settings?.metaDescription?.trim() ||
    settings?.bio ||
    "Official portfolio of Tamminga Budds (also referenced as Taminga Buds or Tamminga Buds) — Software engineer in Nairobi building enterprise platforms, business systems, and web applications.";
  const favicon =
    settings?.favicon && typeof settings.favicon === "object"
      ? (settings.favicon as Media)
      : null;

  return {
    metadataBase: new URL(PRIMARY_CANONICAL_URL),
    applicationName: "Tamminga Budds",
    title: { default: title, template: `%s · Tamminga Budds` },
    description,
    keywords: [
      "Tamminga Budds",
      "Taminga Buds",
      "Tamminga Buds",
      "Taminga Budds",
      "Software Engineer Nairobi",
      "Full-Stack Developer",
      "Web Application Development",
    ],
    icons: favicon?.url ? { icon: favicon.url } : undefined,
    openGraph: {
      siteName: "Tamminga Budds",
      title,
      description,
      url: PRIMARY_CANONICAL_URL,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function RootLayout({
  children,
}: LayoutProps<"/">) {
  const settings = await getGlobalSettings();
  const logoImage =
    settings?.logo && typeof settings.logo === "object"
      ? (settings.logo as Media)
      : null;
  const logo =
    logoImage?.url && logoImage.width && logoImage.height
      ? {
          url: logoImage.url,
          alt: logoImage.alt || "Logo",
          width: logoImage.width,
          height: logoImage.height,
        }
      : null;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <JsonLd settings={settings} siteUrl={PRIMARY_CANONICAL_URL} />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Header logo={logo} />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
