import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getGlobalSettings } from "@/lib/frontend-data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { PageTransition } from "@/components/motion/PageTransition";

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

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s · ${title}` },
    description,
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      url: SITE_URL,
      type: "website",
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

export default async function RootLayout({
  children,
}: LayoutProps<"/">) {
  const settings = await getGlobalSettings();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd settings={settings} siteUrl={SITE_URL} />
        <Header />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
