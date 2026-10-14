"use client";

import { motion, useInView, useMotionValueEvent, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { hrefOr, isPlaceholder, reviews, site } from "@/content/site";
import { CtaLink } from "./ui/CtaLink";
import { GoogleIcon } from "./ui/BrandIcons";
import { StarRow } from "./ui/Stars";

const FILL = (site.rating.value / 5) * 100;

function RatingBlock() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const value = useSpring(0, { stiffness: 38, damping: 18, restDelta: 0.001 });

  useEffect(() => {
    if (reduce) return;
    if (numberRef.current && !inView) numberRef.current.textContent = "0.0";
    if (inView) value.set(site.rating.value);
  }, [inView, reduce, value]);

  // Write straight to the DOM: no React re-render per frame
  useMotionValueEvent(value, "change", (v) => {
    if (numberRef.current) numberRef.current.textContent = v.toFixed(1);
  });

  return (
    <div ref={ref} className="flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:gap-10">
      <p className="display text-[clamp(7rem,24vw,15rem)] leading-[0.8] text-bone tabular-nums" aria-hidden>
        <span ref={numberRef}>{site.rating.value.toFixed(1)}</span>
      </p>
      <div className="pb-2 sm:pb-5">
        <div className="relative inline-block" role="img" aria-label={`${site.rating.value} out of 5 stars`}>
          <StarRow className="text-line" starClassName="size-9 sm:size-11" />
          <motion.div
            className="absolute inset-0 text-accent"
            initial={reduce ? false : { clipPath: "inset(0% 100% 0% 0%)" }}
            animate={inView || reduce ? { clipPath: `inset(0% ${100 - FILL}% 0% 0%)` } : undefined}
            style={reduce ? { clipPath: `inset(0% ${100 - FILL}% 0% 0%)` } : undefined}
            transition={{ duration: 1.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <StarRow starClassName="size-9 sm:size-11" />
          </motion.div>
        </div>
        <p className="mt-3 flex items-center gap-2 text-lg text-bone/85">
          <GoogleIcon className="size-4" />
          Based on {site.rating.count} Google reviews
        </p>
        <p className="sr-only">
          Rated {site.rating.value} out of 5 on Google, based on {site.rating.count} reviews.
        </p>
      </div>
    </div>
  );
}

export function Reviews() {
  const reduce = useReducedMotion();
  const tilts = [-3.5, 2.5, -1.5];
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="relative overflow-x-clip bg-ink-2 py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <h2 id="reviews-title" className="sr-only">
          Reviews
        </h2>
        <RatingBlock />

        <ul className="mt-16 grid gap-6 sm:mt-20 md:grid-cols-3 md:gap-5 lg:gap-8">
          {reviews.map((r, i) => (
            <motion.li
              key={r.name}
              className={`flex ${i === 1 ? "md:mt-12" : i === 2 ? "md:mt-4" : ""}`}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 80, x: i === 0 ? -30 : i === 2 ? 30 : 0, rotate: tilts[i] * 3 }}
              whileInView={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 70, damping: 14, delay: i * 0.14 }}
              whileHover={{ rotate: tilts[i] / 2, y: -6 }}
            >
              <figure className="flex w-full flex-col justify-between gap-8 rounded-[var(--radius-card)] bg-bone p-7 text-ink shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8)] sm:p-8">
                <div>
                  <StarRow className="text-accent" starClassName="size-5" />
                  <blockquote className="mt-5 text-[1.0625rem] leading-relaxed text-ink">
                    <p>&ldquo;{r.text}&rdquo;</p>
                  </blockquote>
                </div>
                <figcaption className="flex items-center gap-3 border-t border-ink/10 pt-5">
                  <span aria-hidden className="grid size-11 place-items-center rounded-full bg-ink font-letter text-2xl text-bone">
                    {r.name[0]}
                  </span>
                  <span>
                    <span className="block font-semibold">{r.name}</span>
                    <span className="block text-sm text-ink/65">{r.role}</span>
                  </span>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </ul>

        <div className="mt-14 flex flex-col items-start gap-2 sm:items-center">
          <CtaLink href={hrefOr(site.links.googleReviews)} variant="light" magnetic>
            <span className="inline-flex items-center gap-2.5">
              <GoogleIcon className="size-4" />
              {`Read all ${site.rating.count} reviews on Google`}
            </span>
          </CtaLink>
          {isPlaceholder(site.links.googleReviews) ? <span className="ph">{site.links.googleReviews}</span> : null}
        </div>
      </div>
    </section>
  );
}
