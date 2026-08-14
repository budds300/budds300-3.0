import type { Metadata } from "next";
import { getPayloadClient } from "@/lib/payload";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectsFilterGrid } from "@/components/ProjectsFilterGrid";
import { CtaBanner } from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Projects",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const payload = await getPayloadClient();
  const { docs: projects } = await payload.find({
    collection: "projects",
    sort: "-featured",
    limit: 100,
  });

  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pb-4 pt-24">
        <Reveal>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Projects
          </h1>
          <p className="mt-3 text-muted">
            A selection of platforms and products I&apos;ve designed and built.
          </p>
        </Reveal>
      </section>
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <ProjectsFilterGrid projects={projects} />
      </section>
      <CtaBanner
        heading="Have something similar in mind?"
        bullets={["Free scoping call", "2-4 week MVP turnarounds"]}
        buttonLabel="Start a Project"
        buttonHref="/contact"
      />
    </>
  );
}
