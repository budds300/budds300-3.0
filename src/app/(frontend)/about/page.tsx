import type { Metadata } from "next";
import { getGlobalSettings, getDocs } from "@/lib/frontend-data";
import { About } from "@/components/About";
import { TechStackGrid } from "@/components/TechStackGrid";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Testimonials } from "@/components/Testimonials";
import { CtaBanner } from "@/components/CtaBanner";
import type {
  ServiceOffering,
  TechStackItem,
  WorkExperience,
  Testimonial,
} from "@/payload-types";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
};

export const revalidate = 300;

export default async function AboutPage() {
  const [settings, offerings, techStack, experience, testimonials] =
    await Promise.all([
      getGlobalSettings(),
      getDocs<ServiceOffering>({ collection: "service-offerings", sort: "order", limit: 4 }),
      getDocs<TechStackItem>({ collection: "tech-stack-items", sort: "order", limit: 40 }),
      getDocs<WorkExperience>({
        collection: "work-experience",
        sort: "-dateRange.start",
        limit: 20,
      }),
      getDocs<Testimonial>({ collection: "testimonials", limit: 12 }),
    ]);

  return (
    <>
      <div className="pt-16" />
      <About settings={settings} offerings={offerings} viewAllHref="/services" />
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
