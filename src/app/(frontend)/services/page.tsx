import type { Metadata } from "next";
import { getDocs } from "@/lib/frontend-data";
import { ServiceOfferings } from "@/components/ServiceOfferings";
import { Pricing } from "@/components/Pricing";
import { CtaBanner } from "@/components/CtaBanner";
import type { ServiceOffering, Service } from "@/payload-types";

export const metadata: Metadata = {
  title: "Services",
  alternates: { canonical: "/services" },
};

export const revalidate = 300;

export default async function ServicesPage() {
  const [offerings, services] = await Promise.all([
    getDocs<ServiceOffering>({ collection: "service-offerings", sort: "order", limit: 40 }),
    getDocs<Service>({ collection: "services", limit: 12 }),
  ]);

  return (
    <>
      <div className="pt-16" />
      <ServiceOfferings offerings={offerings} expanded />
      <Pricing services={services} />
      <CtaBanner
        heading="Ready to scope your project?"
        bullets={["No-obligation call", "Fixed-scope quotes"]}
        buttonLabel="Book a Call"
        buttonHref="/contact"
      />
    </>
  );
}
