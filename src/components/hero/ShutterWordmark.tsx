"use client";

import { motion } from "framer-motion";
import { WORDMARK_GLYPHS, WORDMARK_VIEWBOX } from "./wordmark-paths";

/** "La Raza" hand-lettered on the shop shutter: each glyph outline is stroked, then filled. */
export function ShutterWordmark() {
  return (
    <>
      <svg viewBox={WORDMARK_VIEWBOX} className="w-[min(82vw,720px)] overflow-visible text-bone" aria-hidden>
        {WORDMARK_GLYPHS.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, fillOpacity: 0 }}
            animate={{ pathLength: 1, fillOpacity: 1 }}
            fill="currentColor"
            transition={{
              pathLength: { duration: 0.62, delay: 0.08 + i * 0.06, ease: [0.65, 0, 0.35, 1] },
              fillOpacity: { duration: 0.3, delay: 0.55 + i * 0.03, ease: "easeOut" },
            }}
          />
        ))}
      </svg>
      <motion.p
        className="display text-sm tracking-[0.35em] text-sand sm:text-base"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        Tattoo studio
      </motion.p>
    </>
  );
}
