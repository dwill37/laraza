"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { messages } from "@/content/site";
import { photos } from "@/content/images";
import { waLink } from "@/lib/whatsapp";
import { CtaLink } from "./ui/CtaLink";

const LINE = "Leave Playa with a story on your skin";

export function FinalCta() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Scroll-linked marquee: the oversized line slides sideways as you scroll past
  const x = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["4%", "-38%"]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.18, 1]);

  return (
    <section ref={ref} aria-labelledby="final-title" className="relative isolate overflow-hidden py-28 sm:py-40">
      <motion.div className="absolute inset-0 -z-20" style={{ scale }}>
        <Image
          src={photos.floralSleeve.src}
          alt={photos.floralSleeve.alt}
          fill
          sizes="100vw"
          placeholder="blur"
          className="object-cover"
          style={{ objectPosition: photos.floralSleeve.position }}
        />
      </motion.div>
      {/* Warm wash + legibility scrim */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[#b5562e]/35 mix-blend-multiply" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(13_11_10/0.7),rgb(13_11_10/0.55)_50%,rgb(13_11_10/0.88))]" />

      <h2 id="final-title" className="sr-only">
        {LINE}
      </h2>
      <div aria-hidden className="overflow-hidden">
        <motion.p style={{ x }} className="display whitespace-nowrap text-[clamp(5rem,17vw,15rem)] leading-[0.85] text-bone">
          {LINE}
          <span className="text-accent"> &middot; </span>
          {LINE}
        </motion.p>
      </div>

      <div className="mx-auto mt-12 flex max-w-[1400px] flex-col items-start gap-8 px-4 sm:mt-16 sm:px-8 md:flex-row md:items-end md:justify-between">
        <p className="max-w-[38ch] text-xl leading-snug text-bone/90 sm:text-2xl">
          You came for the beach. Take something home that won&rsquo;t wash off.
        </p>
        <CtaLink href={waLink(messages.final)} whatsapp size="lg" magnetic className="w-full sm:w-auto">
          Message us on WhatsApp
        </CtaLink>
      </div>
    </section>
  );
}
