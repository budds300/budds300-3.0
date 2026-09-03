"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Media, Testimonial } from "@/payload-types";
import { StarRating } from "@/components/StarRating";

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials[activeIndex];
  const avatar =
    active?.avatar && typeof active.avatar === "object"
      ? (active.avatar as Media)
      : null;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % testimonials.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [testimonials.length]);

  const move = (direction: "left" | "right") => {
    setActiveIndex((index) =>
      direction === "left"
        ? (index - 1 + testimonials.length) % testimonials.length
        : (index + 1) % testimonials.length,
    );
  };

  if (!active) return null;

  return (
    <div className="mx-auto mt-10 max-w-5xl px-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.55fr]">
        <div className="card relative min-h-[23rem] overflow-hidden p-6 sm:p-8">
          <div className="absolute right-6 top-4 text-8xl font-black text-foreground/[0.04]">
            0{activeIndex + 1}
          </div>
          <AnimatePresence mode="wait">
            <motion.figure
              key={active.id}
              initial={{ opacity: 0, x: 48, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -48, filter: "blur(8px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex h-full flex-col"
            >
              <StarRating rating={active.rating} className="text-lg" />
              <blockquote className="mt-8 text-2xl font-semibold leading-snug sm:text-3xl">
                &ldquo;{active.quote}&rdquo;
              </blockquote>
              <div className="mt-auto flex items-center gap-4 pt-10">
                {avatar?.url ? (
                  <Image
                    src={avatar.url}
                    alt={avatar.alt || active.clientName}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent font-black text-accent-foreground">
                    {active.clientName.slice(0, 1)}
                  </div>
                )}
                <div>
                  <p className="font-bold">{active.clientName}</p>
                  <p className="text-sm text-muted">{active.roleCompany}</p>
                </div>
              </div>
              <p className="mt-5 border-t border-border pt-4 text-sm text-muted">
                Reviews on: <span className="text-foreground">{active.platform}</span>
              </p>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="flex flex-col justify-between gap-4">
          <div className="grid gap-3">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`rounded-lg border p-4 text-left transition-all ${
                  index === activeIndex
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-background-elevated text-muted hover:border-accent/60 hover:text-foreground"
                }`}
              >
                <span className="text-xs font-black uppercase">0{index + 1}</span>
                <p className="mt-1 font-bold">{testimonial.clientName}</p>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => move("left")}
              aria-label="Previous testimonial"
              className="icon-badge text-accent-foreground transition-opacity hover:opacity-80"
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={() => move("right")}
              aria-label="Next testimonial"
              className="icon-badge text-accent-foreground transition-opacity hover:opacity-80"
            >
              <ChevronIcon direction="right" />
            </button>
            <div className="ml-2 h-px flex-1 bg-border">
              <motion.div
                key={activeIndex}
                className="h-px bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5.5, ease: "linear" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
