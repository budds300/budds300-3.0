import type { Metadata } from "next";
import { getPayloadClient } from "@/lib/payload";
import { ServiceOfferings } from "@/components/ServiceOfferings";
import { Pricing } from "@/components/Pricing";
import { CtaBanner } from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Services",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const payload = await getPayloadClient();

  const [offerings, services] = await Promise.all([
    payload
      .find({ collection: "service-offerings", sort: "order", limit: 40 })
      .then((res) => res.docs),
    payload.find({ collection: "services", limit: 12 }).then((res) => res.docs),
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
