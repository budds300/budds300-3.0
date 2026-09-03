import { getGlobalSettings, getDocs } from "@/lib/frontend-data";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { SectionDivider } from "@/components/SectionDivider";
import { Projects } from "@/components/Projects";
import { TechStackGrid } from "@/components/TechStackGrid";
import { Pricing } from "@/components/Pricing";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Testimonials } from "@/components/Testimonials";
import { BlogGrid } from "@/components/BlogGrid";
import { CtaBanner } from "@/components/CtaBanner";
import { Clients } from "@/components/Clients";
import type {
  Client,
  Project,
  Service,
  ServiceOffering,
  Testimonial,
  WorkExperience,
  BlogPost,
  TechStackItem,
} from "@/payload-types";

export const revalidate = 300;

export default async function Home() {
  const [settings, offerings, projects, techStack, clients, services, experience, testimonials, posts] =
    await Promise.all([
      getGlobalSettings(),
      getDocs<ServiceOffering>({ collection: "service-offerings", sort: "order", limit: 4 }),
      getDocs<Project>({ collection: "projects", sort: "-featured", limit: 6 }),
      getDocs<TechStackItem>({ collection: "tech-stack-items", sort: "order", limit: 40 }),
      getDocs<Client>({ collection: "clients", sort: "order", limit: 20 }),
      getDocs<Service>({ collection: "services", limit: 3 }),
      getDocs<WorkExperience>({
        collection: "work-experience",
        sort: "-dateRange.start",
        limit: 2,
      }),
      getDocs<Testimonial>({ collection: "testimonials", limit: 3 }),
      getDocs<BlogPost>({
        collection: "blog-posts",
        where: { draft: { equals: false } },
        sort: "-publishedDate",
        limit: 3,
      }),
    ]);

  return (
    <>
      <Hero settings={settings} />
      <SectionDivider />
      <About settings={settings} offerings={offerings} viewAllHref="/services" />
      <Projects projects={projects} viewAllHref="/projects" />
      <TechStackGrid items={techStack} />
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
