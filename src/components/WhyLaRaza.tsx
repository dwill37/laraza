"use client";

import { motion, useReducedMotion } from "framer-motion";

/* Simple geometric line marks, drawn stroke by stroke on reveal (pathLength). */
const ICONS = {
  tag: ["M6 24 22 8h18v18L24 42Z", "M30.5 15.5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0"],
  sparkle: ["M24 6c1 11 7 17 18 18-11 1-17 7-18 18-1-11-7-17-18-18 11-1 17-7 18-18Z", "M39 4v8", "M35 8h8"],
  nib: ["M15 6h18", "M15 6 10 22l14 22 14-22-5-16", "M24 44V28", "M21.5 24a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0"],
  pin: ["M24 44S10 31 10 20a14 14 0 0 1 28 0c0 11-14 24-14 24Z", "M19 20a5 5 0 1 0 10 0a5 5 0 1 0 -10 0"],
};

const ITEMS = [
  {
    icon: ICONS.tag,
    title: "Prices that make sense",
    body: "Clients keep saying it: affordable, even unbeatable. Great work shouldn’t eat your whole travel budget.",
  },
  {
    icon: ICONS.sparkle,
    title: "Very clean. Very meticulous.",
    body: "Those are our clients’ exact words. We’ll take them.",
  },
  {
    icon: ICONS.nib,
    title: "Tattoos that feel like art",
    body: "Reviewers call their pieces works of art. One left with a tattoo that “revealed something incredible” in them.",
  },
  {
    icon: ICONS.pin,
    title: "Right on 5th Avenue",
    body: "Quinta Avenida at 50th Street. Easy to drop by between the beach and dinner.",
  },
];

function DrawnIcon({ paths, delay }: { paths: string[]; delay: number }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 48 48" className="size-12 shrink-0 text-accent sm:size-14" fill="none" aria-hidden>
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ pathLength: { duration: 0.9, delay: delay + i * 0.25, ease: "easeInOut" }, opacity: { duration: 0.01, delay: delay + i * 0.25 } }}
        />
      ))}
    </svg>
  );
}

export function WhyLaRaza() {
  return (
    <section aria-labelledby="why-title" className="relative overflow-x-clip py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-4 sm:px-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2 id="why-title" className="display text-[clamp(2.75rem,7vw,5.5rem)] text-bone">
              Why La Raza
            </h2>
            <p className="mt-5 max-w-[36ch] text-lg leading-snug text-muted">
              Four reasons, straight from the people who sat in our chairs.
            </p>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:gap-5">
          {ITEMS.map((item, i) => {
            const fromLeft = i % 2 === 0;
            return (
              <motion.li
                key={item.title}
                className={`group relative flex flex-col gap-8 rounded-[var(--radius-card)] bg-ink-2 p-7 ring-1 ring-inset ring-line transition-colors duration-300 hover:bg-ink-3 sm:p-8 ${i % 2 === 1 ? "sm:mt-14 sm:-mb-14" : ""}`}
                initial={{ opacity: 0, x: fromLeft ? -70 : 70, rotate: fromLeft ? -2 : 2 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ type: "spring", stiffness: 90, damping: 16, delay: (i % 2) * 0.12 }}
                whileHover={{ y: -4 }}
              >
                <DrawnIcon paths={item.icon} delay={0.25 + (i % 2) * 0.12} />
                <div>
                  <h3 className="display text-[2rem] leading-[0.95] text-bone">{item.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{item.body}</p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
