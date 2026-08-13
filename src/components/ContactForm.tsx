"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

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
    <section id="contact" className="mx-auto max-w-2xl px-6 py-24">
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        Let&apos;s Talk
      </h2>
      <p className="mt-3 text-muted">
        Tell me about your project and I&apos;ll get back to you within a day.
      </p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="name" className="text-sm text-muted">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-1 w-full rounded-lg border border-border bg-background-elevated px-4 py-2.5 outline-none focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm text-muted">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-border bg-background-elevated px-4 py-2.5 outline-none focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="budget" className="text-sm text-muted">
            Budget
          </label>
          <input
            id="budget"
            name="budget"
            className="mt-1 w-full rounded-lg border border-border bg-background-elevated px-4 py-2.5 outline-none focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="message" className="text-sm text-muted">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="mt-1 w-full rounded-lg border border-border bg-background-elevated px-4 py-2.5 outline-none focus:border-accent"
          />
        </div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-glow rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send Message"}
        </button>
        {status === "success" ? (
          <p className="text-sm text-accent">Thanks — I&apos;ll be in touch soon.</p>
        ) : null}
        {status === "error" ? (
          <p className="text-sm text-red-400">
            Something went wrong. Please try again.
          </p>
        ) : null}
      </form>
    </section>
  );
}
