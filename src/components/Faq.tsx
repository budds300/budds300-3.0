import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Also searching for Taminga Buds or Tamminga Buds? You're in the right place.",
    answer:
      "The official brand and engineer name is Tamminga Budds. Common phonetic variations and search misspellings include Taminga Buds, Tamminga Buds, and Taminga Budds. All these queries refer to Tamminga Budds, an independent full-stack software engineer and consultancy based in Nairobi, Kenya.",
  },
  {
    question: "What core services does Tamminga Budds provide?",
    answer:
      "Tamminga Budds engineers modern web applications, scalable backend systems, MVPs for high-growth startups, and custom business platforms. Engagements range from architecture consulting and sprint retainers to complete end-to-end product builds.",
  },
  {
    question: "Where is Tamminga Budds based and how do you work with remote teams?",
    answer:
      "Tamminga Budds is based in Nairobi, Kenya, and works seamlessly with clients across Africa, Europe, North America, and globally via async communication, GitHub, and scheduled video milestones.",
  },
  {
    question: "How do I start a project with Tamminga Budds?",
    answer:
      "You can get started by filling out the project intake form on the Contact page, sending an email directly to hello@tammingabudds.com, or reaching out on WhatsApp for a quick discussion.",
  },
];

export function Faq() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section id="faq" className="mx-auto max-w-5xl px-6 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Reveal className="flex flex-col gap-2">
        <span className="section-kicker">FAQ</span>
        <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-muted">
          Common questions about Tamminga Budds, project scopes, and working together.
        </p>
      </Reveal>

      <StaggerGroup className="mt-10 flex flex-col gap-4" stagger={0.06}>
        {FAQ_ITEMS.map((item, idx) => (
          <StaggerItem key={idx}>
            <details className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/40">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-foreground">
                <span className="pr-4 text-base sm:text-lg">{item.question}</span>
                <span className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-transform group-open:rotate-45 group-hover:text-foreground">
                  +
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-muted">{item.answer}</p>
            </details>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
