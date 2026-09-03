import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceOfferingBySlug } from "@/lib/frontend-data";
import { RichText } from "@/components/RichText";
import { CtaBanner } from "@/components/CtaBanner";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const offering = await getServiceOfferingBySlug(slug);
  if (!offering) return {};
  return {
    title: offering.title,
    description: offering.description,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const offering = await getServiceOfferingBySlug(slug);
  if (!offering) notFound();

  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pb-16 pt-24">
        <Link href="/services" className="text-sm font-medium text-accent hover:underline">
          &larr; All Services
        </Link>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
          {offering.title}
        </h1>
        <p className="mt-4 text-lg text-muted">{offering.description}</p>
        {offering.detail ? (
          <div className="mt-8">
            <RichText data={offering.detail} />
          </div>
        ) : null}
      </section>
      <CtaBanner
        heading={`Interested in ${offering.title}?`}
        buttonLabel="Book a Call"
        buttonHref="/contact"
      />
    </>
  );
}
