"use client";

import { motion } from "motion/react";
import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const VIEWPORT = { once: true, margin: "-80px" } as const;

type MotionTag = "div" | "article" | "figure" | "li";

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  x = 0,
  duration = 0.6,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  duration?: number;
  as?: MotionTag;
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerGroup({
  children,
  className,
  stagger = 0.12,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const items = Children.toArray(children);
  return (
    <div className={className}>
      {items.map((child, i) => {
        if (!isValidElement(child)) return child;
        return cloneElement(child as ReactElement<{ delay?: number }>, {
          delay: i * stagger,
        });
      })}
    </div>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: MotionTag;
  delay?: number;
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.5, delay, ease: EASE_OUT }}
    >
      {children}
    </MotionTag>
  );
}
