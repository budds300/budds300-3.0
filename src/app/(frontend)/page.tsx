import { getPayloadClient } from "@/lib/payload";
import { Hero } from "@/components/Hero";
import { SectionDivider } from "@/components/SectionDivider";
import { About } from "@/components/About";
import { ServiceOfferings } from "@/components/ServiceOfferings";
import { TechStackGrid } from "@/components/TechStackGrid";
import { Projects } from "@/components/Projects";
import { Pricing } from "@/components/Pricing";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Testimonials } from "@/components/Testimonials";
import { ContactForm } from "@/components/ContactForm";

export default async function Home() {
  const payload = await getPayloadClient();

  const [settings, offerings, projects, services, experience, testimonials] =
    await Promise.all([
      payload.findGlobal({ slug: "global-settings" }).catch(() => null),
      payload
        .find({ collection: "service-offerings", sort: "order", limit: 12 })
        .then((res) => res.docs),
      payload
        .find({ collection: "projects", sort: "-featured", limit: 12 })
        .then((res) => res.docs),
      payload
        .find({ collection: "services", limit: 12 })
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
      <Hero settings={settings} />
      <SectionDivider />
      <About settings={settings} />
      <ServiceOfferings offerings={offerings} />
      <TechStackGrid />
      <Projects projects={projects} />
      <Pricing services={services} />
      <ExperienceTimeline experience={experience} />
      <Testimonials testimonials={testimonials} />
      <ContactForm />
    </>
  );
}
