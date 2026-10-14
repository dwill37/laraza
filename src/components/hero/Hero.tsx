"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type Transition } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { isPlaceholder, messages, site } from "@/content/site";
import { photos } from "@/content/images";
import { waLink } from "@/lib/whatsapp";
import { CtaLink } from "../ui/CtaLink";
import { GoogleIcon } from "../ui/BrandIcons";
import { Star } from "../ui/Stars";
import { ShutterWordmark } from "./ShutterWordmark";

const INTRO_KEY = "laraza-intro-seen";
const lift: Transition["ease"] = [0.76, 0, 0.24, 1];

const LINES = [
  ["Take", "a", "piece", "of", "art"],
  ["home", "from", "Playa."],
];

export function Hero() {
  const reduce = useReducedMotion();
  // Full intro plays once per session; repeat views get a quick, shutter-less entrance.
  const [intro, setIntro] = useState(true);
  useEffect(() => {
    try {
      if (sessionStorage.getItem(INTRO_KEY)) setIntro(false);
      else sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* storage unavailable: keep the intro */
    }
  }, []);

  const showShutter = intro && !reduce;
  const t0 = showShutter ? 0.95 : 0; // moment the shutter starts lifting

  // Subtle parallax of the photo while leaving the hero
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);

  // Hero copy starts painted (transform-only entrances, partly visible in its mask) so it counts for LCP at first paint;
  // on the first visit it sits behind the shutter, so visitors never see the starting state.
  let wordIndex = 0;

  return (
    <section
      id="top"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100dvh] items-end overflow-hidden bg-ink"
    >
      {/* Remount on intro resolution so entrance delays match the chosen mode */}
      <div key={showShutter ? "intro" : "quick"} className="contents">
      {/* Photo */}
      <motion.div className="absolute inset-0 -z-20" style={{ y: photoY }}>
        <motion.div
          className="hero-reveal absolute inset-0"
          initial={reduce ? false : { scale: 1.14 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, delay: t0, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={photos.archangel.src}
            alt={photos.archangel.alt}
            fill
            priority
            fetchPriority="high"
            quality={80}
            sizes="100vw"
            placeholder="blur"
            className="object-cover brightness-[1.25] contrast-[1.08]"
            style={{ objectPosition: photos.archangel.position }}
          />
        </motion.div>
      </motion.div>

      {/* Golden-hour tint that burns off once the shutter is up */}
      <motion.div
        aria-hidden
        className="hero-reveal pointer-events-none absolute inset-0 -z-10 bg-[#c9852f] mix-blend-multiply"
        initial={{ opacity: reduce ? 0 : 0.6 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.1, delay: t0 + 0.3, ease: "easeOut" }}
      />
      {/* Legibility scrim: deep at the bottom-left where the copy sits */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(13_11_10/1)_0%,rgb(13_11_10/0.7)_35%,rgb(13_11_10/0)_68%,rgb(13_11_10/0.35)_100%)] lg:bg-[linear-gradient(to_top,rgb(13_11_10/1)_0%,rgb(13_11_10/0.8)_14%,rgb(13_11_10/0)_50%),linear-gradient(to_right,rgb(13_11_10/0.7)_0%,rgb(13_11_10/0.1)_55%,transparent_100%)]"
      />

      {/* Copy */}
      <div className="relative mx-auto w-full max-w-[1400px] px-4 pb-14 pt-32 sm:px-8 sm:pb-20 lg:pb-24">
        <motion.a
          href={isPlaceholder(site.links.googleReviews) ? "#reviews" : site.links.googleReviews}
          className="hero-reveal pill mb-6 inline-flex items-center gap-2.5 rounded-full bg-ink/70 py-2 pl-2.5 pr-4 text-sm font-medium text-bone ring-1 ring-inset ring-bone/15 backdrop-blur-md"
          initial={reduce ? false : { opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 16, delay: t0 + 0.85 }}
        >
          <span className="grid size-6 place-items-center rounded-full bg-bone">
            <GoogleIcon className="size-3.5 text-ink" />
          </span>
          <span className="flex items-center gap-1">
            <span className="font-semibold">{site.rating.value}</span>
            <span className="sr-only">out of 5 stars</span>
            <Star className="size-3.5 text-accent" />
            <span className="text-bone/85">on Google</span>
          </span>
          <span className="text-bone/50" aria-hidden>
            ·
          </span>
          <span className="text-bone/85">{site.rating.count} reviews</span>
        </motion.a>

        <h1 id="hero-title" className="display max-w-[16ch] text-[clamp(3.1rem,10.5vw,7.25rem)] text-bone">
          {LINES.map((line, li) => (
            <span key={li} className="block">
              {line.map((word) => {
                const i = wordIndex++;
                const accent = word === "art";
                return (
                  <span key={word + i} className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                    <motion.span
                      className={`hero-reveal inline-block ${accent ? "text-accent" : ""}`}
                      initial={reduce ? false : { y: "72%" }}
                      animate={{ y: "0%" }}
                      transition={{ type: "spring", stiffness: 120, damping: 18, delay: t0 + 0.25 + i * 0.055 }}
                    >
                      {word}
                    </motion.span>
                    {" "}
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <motion.p
          className="hero-reveal mt-6 max-w-[34ch] text-lg leading-snug text-bone/85 sm:text-xl"
          initial={reduce ? false : { y: 18 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: t0 + 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Affordable, professional tattoos right on 5th Avenue. Very clean, very meticulous, in our clients&rsquo; words.
        </motion.p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          {[
            <CtaLink key="wa" href={waLink(messages.general)} whatsapp magnetic size="lg" className="w-full sm:w-auto">
              Get your tattoo quote on WhatsApp
            </CtaLink>,
            <CtaLink key="work" href="#work" variant="secondary" size="lg" magnetic className="w-full sm:w-auto">
              See the work
            </CtaLink>,
          ].map((cta, i) => (
            <motion.div
              key={i}
              className="hero-reveal"
              initial={reduce ? false : { opacity: 0, y: 26, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 15, delay: t0 + 0.7 + i * 0.09 }}
            >
              {cta}
            </motion.div>
          ))}
        </div>
      </div>

      {showShutter ? (
        <>
          <motion.div
            aria-hidden
            className="intro-shutter shutter-slats pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center gap-6"
            initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.8, delay: t0, ease: lift }}
          >
            <ShutterWordmark />
          </motion.div>
          {/* Bottom rail of the shutter, riding the clip edge */}
          <motion.div
            aria-hidden
            className="intro-shutter pointer-events-none absolute inset-0 z-30 border-b-[3px] border-accent"
            initial={{ y: "0%", opacity: 1 }}
            animate={{ y: "-100%", opacity: [1, 1, 0] }}
            transition={{ duration: 0.8, delay: t0, ease: lift }}
          />
        </>
      ) : null}

      </div>

      <noscript>
        <style>{`.intro-shutter{display:none!important}.hero-reveal{opacity:1!important;transform:none!important}`}</style>
      </noscript>
    </section>
  );
}
