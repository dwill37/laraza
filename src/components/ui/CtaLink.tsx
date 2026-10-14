"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { ComponentProps, PointerEvent } from "react";
import { WhatsAppIcon } from "./BrandIcons";

type Variant = "primary" | "secondary" | "light";

const variants: Record<Variant, string> = {
  // Ink on terracotta: 5.8:1 contrast
  primary: "bg-accent text-ink hover:bg-accent-soft",
  secondary: "bg-ink-3/85 text-bone ring-1 ring-inset ring-bone/15 backdrop-blur-sm hover:bg-ink-3",
  light: "bg-bone text-ink hover:bg-white",
};

const sizes = {
  md: "h-12 px-5 text-[0.9375rem] gap-2.5",
  lg: "h-14 px-6 text-base gap-3 sm:h-16 sm:px-8 sm:text-lg",
};

type Props = Omit<ComponentProps<typeof motion.a>, "children"> & {
  children: React.ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
  whatsapp?: boolean;
  magnetic?: boolean;
};

/** Pill CTA with spring tap feedback and an optional magnetic pull toward the cursor (mouse only). */
export function CtaLink({
  children,
  variant = "primary",
  size = "md",
  whatsapp,
  magnetic,
  className = "",
  ...props
}: Props) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 16, mass: 0.4 });
  const active = magnetic && !reduce;

  function onMove(e: PointerEvent<HTMLAnchorElement>) {
    if (!active || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  const external = typeof props.href === "string" && props.href.startsWith("http");

  return (
    <motion.a
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
      style={active ? { x, y } : undefined}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileHover={reduce ? undefined : { scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={`pill inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap rounded-full font-semibold tracking-[-0.01em] transition-colors duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {whatsapp ? <WhatsAppIcon className={size === "lg" ? "size-5 sm:size-6" : "size-[1.15rem]"} /> : null}
      <span>{children}</span>
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </motion.a>
  );
}
