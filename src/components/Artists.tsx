"use client";

import { motion, useReducedMotion } from "framer-motion";
import { artists, artistsNote, messages } from "@/content/site";
import { waLink } from "@/lib/whatsapp";
import { CtaLink } from "./ui/CtaLink";
import { Fill } from "./ui/Fill";

function ArtistCard({ artist, index }: { artist: (typeof artists)[number]; index: number }) {
  const reduce = useReducedMotion();
  const delay = index * 0.15;
  return (
    <motion.article
      className={`flex flex-col ${index === 1 ? "lg:mt-20" : index === 2 ? "lg:mt-10" : ""}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Portrait panel: rolls up like a shop shutter. Swap in a real photo when available. */}
      <motion.div
        className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-ink-3 ring-1 ring-inset ring-line"
        variants={{
          hidden: reduce ? { opacity: 0 } : { clipPath: "inset(100% 0% 0% 0%)" },
          show: reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1, delay, ease: [0.76, 0, 0.24, 1] } },
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -right-4 -top-10 select-none font-letter text-[17rem] leading-none text-accent/15"
        >
          {artist.name[0]}
        </span>
        <div className="absolute left-5 top-5 max-w-[80%]">
          <Fill>{artist.photo}</Fill>
        </div>
        <div className="absolute inset-x-0 bottom-0 overflow-hidden p-6 pt-0">
          <motion.h3
            className="font-letter text-[clamp(3.5rem,9vw,5rem)] leading-[1.05] text-bone"
            variants={{
              hidden: { x: reduce ? "0%" : "-110%" },
              show: { x: "0%", transition: { type: "spring", stiffness: 90, damping: 17, delay: delay + 0.55 } },
            }}
          >
            {artist.name}
          </motion.h3>
        </div>
      </motion.div>

      <div className="flex flex-1 flex-col gap-4 px-1 pt-6">
        <p className="text-sm font-medium text-sand">
          <Fill>{artist.specialty}</Fill>
        </p>
        <p className="text-[0.9375rem] leading-relaxed text-muted">
          <Fill>{artist.bio}</Fill>
        </p>
        <CtaLink href={waLink(messages.artist(artist.name))} whatsapp variant="secondary" className="mt-auto w-full sm:w-auto sm:self-start">
          {`Book with ${artist.name}`}
        </CtaLink>
      </div>
    </motion.article>
  );
}

export function Artists() {
  const visible = artists.filter((a) => a.visible);
  if (!visible.length) return null;
  return (
    <section id="artists" aria-labelledby="artists-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <div className="mb-12 max-w-3xl sm:mb-16">
          <h2 id="artists-title" className="display text-[clamp(2.75rem,7vw,5.5rem)] text-bone">
            The hands behind the work
          </h2>
          <p className="mt-5 max-w-[46ch] text-lg leading-snug text-muted">
            Our reviewers name them one by one. Ask for yours when you message us.
          </p>
          <p className="mt-3">
            <Fill>{artistsNote}</Fill>
          </p>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {visible.map((artist, i) => (
            <ArtistCard key={artist.name} artist={artist} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
