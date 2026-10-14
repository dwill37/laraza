"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useId, useState } from "react";
import { faqs, messages } from "@/content/site";
import { waLink } from "@/lib/whatsapp";
import { Fill } from "./ui/Fill";

/** Accordion: answers clip in, rows below glide to their new spot via layout (transform) animation. */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-8">
        <h2 id="faq-title" className="display mb-12 text-[clamp(2.75rem,7vw,5.5rem)] text-bone sm:mb-14">
          Good questions
        </h2>

        <LayoutGroup>
          <ul className="flex flex-col gap-3">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              const panelId = `${base}-panel-${i}`;
              const buttonId = `${base}-button-${i}`;
              return (
                <motion.li
                  layout="position"
                  key={item.q}
                  transition={{ type: "spring", stiffness: 260, damping: 30 }}
                  className={`overflow-hidden rounded-[var(--radius-card)] ring-1 ring-inset transition-colors duration-300 ${isOpen ? "bg-ink-2 ring-accent/50" : "bg-ink-2/50 ring-line hover:bg-ink-2"}`}
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 rounded-[var(--radius-card)] px-6 py-5 text-left text-lg font-semibold text-bone sm:px-7 sm:py-6 sm:text-xl"
                    >
                      {item.q}
                      <motion.span
                        aria-hidden
                        className={`relative grid size-9 shrink-0 place-items-center rounded-full transition-colors ${isOpen ? "bg-accent text-ink" : "bg-ink-3 text-bone"}`}
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      >
                        <span className="absolute h-0.5 w-3.5 rounded-full bg-current" />
                        <span className="absolute h-3.5 w-0.5 rounded-full bg-current" />
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
                        animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                        exit={{ opacity: 0, transition: { duration: 0.12 } }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="space-y-3 px-6 pb-6 text-[1.0625rem] leading-relaxed text-muted sm:px-7 sm:pb-7"
                      >
                        {item.a.map((p) => (
                          <p key={p}>
                            <Fill>{p}</Fill>
                          </p>
                        ))}
                        {item.cta ? (
                          <a
                            href={waLink(messages.general)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-semibold text-accent"
                          >
                            Message us on WhatsApp <span aria-hidden>&rarr;</span>
                            <span className="sr-only">(opens in a new tab)</span>
                          </a>
                        ) : null}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ul>
        </LayoutGroup>
      </div>
    </section>
  );
}
