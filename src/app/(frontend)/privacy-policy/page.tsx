import type { Metadata } from "next";
import { getPrivacyPolicy } from "@/lib/frontend-data";
import { RichText } from "@/components/RichText";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy-policy" },
};

export const revalidate = 300;

export default async function PrivacyPolicyPage() {
  const policy = await getPrivacyPolicy();

  const lastUpdated = policy?.lastUpdated
    ? new Date(policy.lastUpdated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <section className="mx-auto max-w-3xl px-6 pb-24 pt-24">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        {policy?.title || "Privacy Policy"}
      </h1>
      {lastUpdated ? (
        <p className="mt-3 text-sm text-muted">Last updated: {lastUpdated}</p>
      ) : null}
      {policy?.content ? (
        <div className="mt-8">
          <RichText data={policy.content} />
        </div>
      ) : (
        <p className="mt-8 text-muted">
          Privacy policy content has not been added yet.
        </p>
      )}
    </section>
  );
}
