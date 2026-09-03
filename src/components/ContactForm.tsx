"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { MotionButton } from "@/components/motion/MotionButton";

type Status = "idle" | "submitting" | "success" | "error";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const FIELD_CLASSES =
  "mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-24">
      <Reveal className="text-center">
        <span className="section-kicker">Get In Touch</span>
        <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Let&apos;s Talk
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Tell me about your project and I&apos;ll get back to you within a
          day.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="card relative mt-10 overflow-hidden p-6 ring-1 ring-accent/20 sm:p-8">
        <div
          className="pointer-events-none absolute -top-24 right-0 h-56 w-56 rounded-full opacity-10 blur-3xl"
          style={{ background: "var(--accent)" }}
          aria-hidden
        />
        <form onSubmit={handleSubmit} className="relative space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-muted">
                Name
              </label>
              <input id="name" name="name" required className={FIELD_CLASSES} />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-muted">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={FIELD_CLASSES}
              />
            </div>
          </div>
          <div>
            <label htmlFor="budget" className="text-sm font-medium text-muted">
              Budget
            </label>
            <input id="budget" name="budget" className={FIELD_CLASSES} />
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium text-muted">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className={`${FIELD_CLASSES} resize-none`}
            />
          </div>
          <MotionButton
            type="submit"
            disabled={status === "submitting"}
            className="btn-glow inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-semibold text-accent-foreground disabled:opacity-60 sm:w-auto"
          >
            {status === "submitting" ? "Sending…" : "Send Message"}
            {status !== "submitting" ? <ArrowIcon /> : null}
          </MotionButton>
          <p className="text-xs text-muted">
            By submitting, you agree to have your details stored to respond
            to your inquiry. See the{" "}
            <a href="/privacy-policy" className="underline hover:text-accent">
              privacy policy
            </a>
            .
          </p>
          {status === "success" ? (
            <p className="text-sm text-accent">
              Thanks — I&apos;ll be in touch soon.
            </p>
          ) : null}
          {status === "error" ? (
            <p className="text-sm text-red-400">
              Something went wrong. Please try again.
            </p>
          ) : null}
        </form>
      </Reveal>
    </section>
  );
}
