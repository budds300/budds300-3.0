import type { Metadata } from "next";
import { getPayloadClient } from "@/lib/payload";
import { About } from "@/components/About";
import { ServiceOfferings } from "@/components/ServiceOfferings";
import { TechStackGrid } from "@/components/TechStackGrid";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Testimonials } from "@/components/Testimonials";
import { CtaBanner } from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const payload = await getPayloadClient();

  const [settings, offerings, techStack, experience, testimonials] =
    await Promise.all([
      payload.findGlobal({ slug: "global-settings" }).catch(() => null),
      payload
        .find({ collection: "service-offerings", sort: "order", limit: 3 })
        .then((res) => res.docs),
      payload
        .find({ collection: "tech-stack-items", sort: "order", limit: 40 })
        .then((res) => res.docs),
      payload
        .find({
          collection: "work-experience",
          sort: "-dateRange.start",
          limit: 20,
        })
        .then((res) => res.docs),
      payload
        .find({ collection: "testimonials", limit: 12 })
        .then((res) => res.docs),
    ]);

  return (
    <>
      <div className="pt-16" />
      <About settings={settings} />
      <ServiceOfferings offerings={offerings} viewAllHref="/services" />
      <TechStackGrid items={techStack} />
      <ExperienceTimeline experience={experience} />
      <Testimonials testimonials={testimonials} />
      <CtaBanner
        heading="Like what you see? Let's talk about your project."
        bullets={["Free initial consult", "Response within a day"]}
        buttonLabel="Get In Touch"
        buttonHref="/contact"
      />
    </>
  );
}
