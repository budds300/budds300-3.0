import { getPayloadClient } from "@/lib/payload";
import { Hero } from "@/components/Hero";
import { SectionDivider } from "@/components/SectionDivider";
import { ServiceOfferings } from "@/components/ServiceOfferings";
import { Projects } from "@/components/Projects";
import { Pricing } from "@/components/Pricing";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Testimonials } from "@/components/Testimonials";
import { BlogGrid } from "@/components/BlogGrid";
import { CtaBanner } from "@/components/CtaBanner";
import { Clients } from "@/components/Clients";

export default async function Home() {
  const payload = await getPayloadClient();

  const [settings, offerings, projects, clients, services, experience, testimonials, posts] =
    await Promise.all([
      payload.findGlobal({ slug: "global-settings" }).catch(() => null),
      payload
        .find({ collection: "service-offerings", sort: "order", limit: 3 })
        .then((res) => res.docs)
        .catch(() => []),
      payload
        .find({ collection: "projects", sort: "-featured", limit: 3 })
        .then((res) => res.docs)
        .catch(() => []),
      payload
        .find({ collection: "clients", sort: "order", limit: 20 })
        .then((res) => res.docs)
        .catch(() => []),
      payload
        .find({ collection: "services", limit: 3 })
        .then((res) => res.docs)
        .catch(() => []),
      payload
        .find({
          collection: "work-experience",
          sort: "-dateRange.start",
          limit: 2,
        })
        .then((res) => res.docs)
        .catch(() => []),
      payload
        .find({ collection: "testimonials", limit: 3 })
        .then((res) => res.docs)
        .catch(() => []),
      payload
        .find({
          collection: "blog-posts",
          where: { draft: { equals: false } },
          sort: "-publishedDate",
          limit: 3,
        })
        .then((res) => res.docs)
        .catch(() => []),
    ]);

  return (
    <>
      <Hero settings={settings} />
      <SectionDivider />
      <ServiceOfferings offerings={offerings} viewAllHref="/services" />
      <Projects projects={projects} viewAllHref="/projects" />
      <Clients clients={clients} />
      <Pricing services={services} viewAllHref="/services" />
      <ExperienceTimeline experience={experience} viewAllHref="/about" />
      <Testimonials testimonials={testimonials} viewAllHref="/about" />
      {posts.length > 0 ? <BlogGrid posts={posts} viewAllHref="/blog" /> : null}
      <CtaBanner
        heading="Have a project in mind? Let's build it."
        bullets={["Fast turnarounds", "Clear communication"]}
        buttonLabel="Start a Conversation"
        buttonHref="/contact"
      />
    </>
  );
}
