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

const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getGlobalSettings();

  const title = settings?.headline || "Full-Stack / Software Engineer";
  const description =
    settings?.bio ||
    "Full-stack software engineer building fast, reliable web products.";
  const favicon =
    settings?.favicon && typeof settings.favicon === "object"
      ? (settings.favicon as Media)
      : null;

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s · ${title}` },
    description,
    alternates: { canonical: "/" },
    icons: favicon?.url ? { icon: favicon.url } : undefined,
    openGraph: {
      title,
      description,
      url: SITE_URL,
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
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <JsonLd settings={settings} siteUrl={SITE_URL} />
        <Header logo={logo} />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
