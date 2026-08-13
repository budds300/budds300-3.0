"use client";

import Image from "next/image";
import { useRef } from "react";
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
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = (card?.offsetWidth ?? 320) + 24;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div
        ref={scrollerRef}
        className="no-scrollbar mx-auto mt-10 flex max-w-5xl snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)",
        }}
      >
        {testimonials.map((t) => {
          const avatar =
            t.avatar && typeof t.avatar === "object"
              ? (t.avatar as Media)
              : null;

          return (
            <figure
              key={t.id}
              data-card
              className="card w-[80vw] shrink-0 snap-start p-6 sm:w-80"
            >
              <div className="flex items-center gap-3">
                {avatar?.url ? (
                  <Image
                    src={avatar.url}
                    alt={avatar.alt || t.clientName}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                ) : null}
                <div>
                  <p className="font-medium">{t.clientName}</p>
                  <p className="text-sm text-muted">{t.roleCompany}</p>
                </div>
              </div>
              <StarRating rating={t.rating} className="mt-4" />
              <blockquote className="mt-3 text-muted">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <p className="mt-4 border-t border-border pt-3 text-sm text-muted">
                Reviews on: <span className="text-foreground">{t.platform}</span>
              </p>
            </figure>
          );
        })}
      </div>

      <div className="mx-auto mt-4 flex max-w-5xl items-center gap-3 px-6">
        <button
          type="button"
          onClick={() => scrollByCard("left")}
          aria-label="Previous testimonial"
          className="icon-badge text-accent-foreground transition-opacity hover:opacity-80"
        >
          <ChevronIcon direction="left" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard("right")}
          aria-label="Next testimonial"
          className="icon-badge text-accent-foreground transition-opacity hover:opacity-80"
        >
          <ChevronIcon direction="right" />
        </button>
      </div>
    </div>
  );
}
