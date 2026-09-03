"use client";

import { motion, type HTMLMotionProps } from "motion/react";

export function MotionAnchor({
  className,
  children,
  ...props
}: HTMLMotionProps<"a">) {
  return (
    <motion.a
      className={className}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.a>
  );
}

export function MotionButton({
  className,
  children,
  ...props
}: HTMLMotionProps<"button">) {
  return (
    <motion.button
      className={className}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
