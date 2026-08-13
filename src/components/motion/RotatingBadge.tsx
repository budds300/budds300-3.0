"use client";

import { motion } from "motion/react";

const CHARS = "BEST • WORKING SINCE 2019 • ".split("");

export function RotatingBadge({ className }: { className?: string }) {
  return (
    <motion.div
      className={className}
      style={{ position: "relative", width: "6rem", height: "6rem" }}
      animate={{ rotate: 360 }}
      transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      aria-hidden
    >
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <defs>
          <path
            id="badge-circle"
            d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          />
        </defs>
        <text fill="var(--accent)" fontSize="8.2" letterSpacing="1.5">
          <textPath href="#badge-circle">{CHARS.join("")}</textPath>
        </text>
      </svg>
      <span
        className="absolute inset-0 m-auto flex h-8 w-8 items-center justify-center rounded-full"
        style={{ background: "var(--accent)" }}
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--accent-foreground)" strokeWidth="2">
          <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </motion.div>
  );
}
