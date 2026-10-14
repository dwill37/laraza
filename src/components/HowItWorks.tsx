"use client";

import { motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { messages, PH } from "@/content/site";
import { waLink } from "@/lib/whatsapp";
import { Fill } from "./ui/Fill";

const STEPS = [
  {
    title: "Send your idea on WhatsApp",
    body: "Share reference photos, the size you have in mind and the body area. The more we see, the sharper your quote.",
    extra: null as string | null,
    link: true,
  },
  {
    title: "Get your design and quote",
    body: "We reply with your quote, so you know exactly where you stand before you sit down.",
    extra: PH("design / approval process and deposit policy"),
    link: false,
  },
  {
    title: "Come to 5th Avenue & 50th Street and get inked",
    body: "Drop by the studio on Quinta Avenida, take a seat and leave Playa with something that stays.",
    extra: PH("aftercare info"),
    link: false,
  },
];

/** Hand-drawn-feeling route: a gentle zigzag down the left edge, sized to the real list height. */
function routePath(h: number) {
  const seg = 110;
  let d = "M20 0";
  for (let y = 0, i = 0; y < h; y += seg, i++) {
    const nextY = Math.min(y + seg, h);
    const cx = i % 2 === 0 ? 36 : 4;
    d += ` Q${cx} ${(y + nextY) / 2} 20 ${nextY}`;
  }
  return d;
}

function StudioVideo() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;
    if (inView && !paused) v.play().catch(() => {});
    else v.pause();
  }, [inView, reduce, paused]);
  return (
    <motion.div
      className="relative overflow-hidden rounded-[var(--radius-card)] bg-ink-3 ring-1 ring-inset ring-line"
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 80, damping: 18 }}
    >
      <video
        ref={ref}
        className="aspect-[9/16] max-h-[78vh] w-full object-cover"
        src="/media/la-raza-studio.mp4"
        poster="/media/la-raza-studio-poster.jpg"
        muted
        loop
        playsInline
        preload="none"
        controls={!!reduce}
        aria-label="A La Raza artist tattooing a client’s leg under a headlamp at the studio"
      />
      {reduce ? null : (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play studio video" : "Pause studio video"}
          className="pill absolute bottom-4 left-4 grid size-11 place-items-center rounded-full bg-ink/75 text-bone ring-1 ring-inset ring-bone/20 backdrop-blur-sm transition-colors hover:bg-ink"
        >
          {paused ? (
            <span aria-hidden className="ml-0.5 size-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-current" />
          ) : (
            <span aria-hidden className="flex gap-1">
              <span className="h-3.5 w-1 rounded-sm bg-current" />
              <span className="h-3.5 w-1 rounded-sm bg-current" />
            </span>
          )}
        </button>
      )}
    </motion.div>
  );
}

export function HowItWorks() {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const [h, setH] = useState(600);
  const maskId = "route-" + useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setH(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section aria-labelledby="how-title" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-4 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h2 id="how-title" className="display text-[clamp(2.75rem,7vw,5.5rem)] text-bone">
            From idea to ink
          </h2>

          <ol ref={listRef} className="relative mt-14 flex flex-col gap-16 pl-16 sm:pl-20">
            {/* Dashed walking route, revealed by a scroll-driven mask */}
            <svg aria-hidden className="absolute left-0 top-0 w-10 overflow-visible sm:left-2" height={h} viewBox={`0 0 40 ${h}`} fill="none">
              <defs>
                <mask id={maskId} maskUnits="userSpaceOnUse">
                  <motion.path
                    d={routePath(h)}
                    stroke="white"
                    strokeWidth={8}
                    style={{ pathLength: reduce ? 1 : draw }}
                  />
                </mask>
              </defs>
              <path d={routePath(h)} stroke="var(--color-line)" strokeWidth={2} strokeDasharray="2 10" strokeLinecap="round" />
              <path
                d={routePath(h)}
                mask={`url(#${maskId})`}
                stroke="var(--color-accent)"
                strokeWidth={2.5}
                strokeDasharray="7 9"
                strokeLinecap="round"
              />
            </svg>

            {STEPS.map((step, i) => (
              <motion.li
                key={step.title}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ type: "spring", stiffness: 100, damping: 18 }}
              >
                <motion.span
                  aria-hidden
                  className="display absolute -left-16 top-0 grid size-11 place-items-center rounded-full bg-accent text-2xl text-ink sm:-left-[4.6rem] sm:size-12"
                  initial={reduce ? false : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 1 }}
                  transition={{ type: "spring", stiffness: 380, damping: 14, delay: 0.1 }}
                >
                  {i + 1}
                </motion.span>
                <h3 className="display max-w-[20ch] text-[clamp(1.9rem,4vw,2.75rem)] leading-[0.95] text-bone">{step.title}</h3>
                <p className="mt-4 max-w-[52ch] text-[1.0625rem] leading-relaxed text-muted">{step.body}</p>
                {step.extra ? (
                  <p className="mt-3">
                    <Fill>{step.extra}</Fill>
                  </p>
                ) : null}
                {step.link ? (
                  <a
                    href={waLink(messages.general)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-5 inline-flex items-center gap-2 font-semibold text-accent"
                  >
                    Start the chat
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                      &rarr;
                    </span>
                    <span className="sr-only">(opens WhatsApp in a new tab)</span>
                  </a>
                ) : null}
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-5">
          <div className="mx-auto max-w-sm lg:sticky lg:top-28 lg:max-w-none">
            <StudioVideo />
          </div>
        </div>
      </div>
    </section>
  );
}
