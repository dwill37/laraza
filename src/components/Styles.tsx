"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { messages, PH } from "@/content/site";
import { photos, styles } from "@/content/images";
import { waLink } from "@/lib/whatsapp";
import { CtaLink } from "./ui/CtaLink";
import { Fill } from "./ui/Fill";

// Diagonal brush-cut: a slanted edge sweeps across the card from left to right.
const CUT_FROM = "polygon(0% 0%, 0% 0%, -30% 100%, 0% 100%)";
const CUT_TO = "polygon(0% 0%, 130% 0%, 100% 100%, 0% 100%)";

function StyleCard({ style, index }: { style: (typeof styles)[number]; index: number }) {
  const reduce = useReducedMotion();
  return (
    // In-view is watched on an unclipped wrapper: a fully clipped element never reports as intersecting.
    <motion.div className="flex" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
    <motion.article
      className="group flex flex-1 flex-col overflow-hidden rounded-[var(--radius-card)] bg-ink-2 ring-1 ring-inset ring-line"
      variants={{
        hidden: reduce ? { opacity: 0 } : { clipPath: CUT_FROM },
        show: reduce ? { opacity: 1 } : { clipPath: CUT_TO, transition: { duration: 1.05, delay: (index % 2) * 0.14, ease: [0.7, 0, 0.2, 1] } },
      }}
      whileHover={{ y: -6 }}
    >
      <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]">
        <motion.div
          className="absolute inset-0"
          variants={{
            hidden: { scale: reduce ? 1 : 1.28 },
            show: { scale: 1, transition: { duration: 1.5, delay: (index % 2) * 0.14, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          <Image
            src={style.photo.src}
            alt={style.photo.alt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
            placeholder="blur"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </motion.div>
      </div>
      <div className="flex flex-1 flex-col gap-5 p-6 sm:p-7">
        <div>
          <h3 className="display text-[1.9rem] leading-none text-bone">
            <Fill>{style.name}</Fill>
          </h3>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
            <Fill>{style.description}</Fill>
          </p>
        </div>
        <dl className="mt-auto grid grid-cols-2 gap-4 border-t border-line pt-5 text-sm">
          <div>
            <dt className="text-muted">Price</dt>
            <dd className="mt-1 text-bone">
              <Fill>{style.price}</Fill>
            </dd>
          </div>
          <div>
            <dt className="text-muted">Session</dt>
            <dd className="mt-1 text-bone">
              <Fill>{style.duration}</Fill>
            </dd>
          </div>
        </dl>
        <CtaLink href={waLink(messages.style(style.name))} whatsapp variant="secondary" className="w-full">
          Get a quote for this style
        </CtaLink>
      </div>
    </motion.article>
    </motion.div>
  );
}

function FriendCard() {
  const reduce = useReducedMotion();
  const spring = { type: "spring" as const, stiffness: 110, damping: 15, delay: 0.5 };
  return (
    <div className="relative sm:col-span-2 lg:col-span-1 lg:row-span-2">
      {/* Back layer: the "friend" card that slides in offset, then settles behind */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-[var(--radius-card)] bg-accent"
        initial={reduce ? false : { x: -46, y: 30, rotate: -7, opacity: 0 }}
        whileInView={{ x: 8, y: 8, rotate: 1.5, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={spring}
      />
      <motion.article
        className="relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-bone text-ink"
        initial={reduce ? { opacity: 0 } : { x: 46, y: -24, rotate: 6, opacity: 0 }}
        whileInView={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ ...spring, delay: 0.62 }}
        whileHover={{ rotate: -0.8, y: -4 }}
      >
        <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:flex-1">
          <Image
            src={photos.vacationTaco.src}
            alt={photos.vacationTaco.alt}
            fill
            sizes="(min-width: 1024px) 30vw, 100vw"
            placeholder="blur"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 p-6 sm:p-7">
          <h3 className="display text-[2.4rem] leading-[0.9]">Tattoos with a friend</h3>
          <p className="text-[0.9375rem] leading-relaxed text-ink/75">
            One of our reviewers said it best: why not get tattooed together with a friend on vacation? Matching or not,
            it&rsquo;s the souvenir you both keep.
          </p>
          <p className="text-sm text-ink">
            <span className="ph !text-ink !outline-ink/40 !bg-ink/5">{PH("any duo offer details")}</span>
          </p>
          <CtaLink href={waLink(messages.friend)} whatsapp variant="primary" magnetic className="w-full">
            Plan a duo session
          </CtaLink>
        </div>
      </motion.article>
    </div>
  );
}

export function Styles() {
  return (
    <section id="styles" aria-labelledby="styles-title" className="relative overflow-x-clip py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <div className="mb-12 max-w-3xl sm:mb-16">
          <h2 id="styles-title" className="display text-[clamp(2.75rem,7vw,5.5rem)] text-bone">
            Pick your style
          </h2>
          <p className="mt-5 max-w-[46ch] text-lg leading-snug text-muted">
            Not sure yet? Send us your idea on WhatsApp and we&rsquo;ll talk it through with you.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <StyleCard style={styles[0]} index={0} />
          <StyleCard style={styles[1]} index={1} />
          <FriendCard />
          <StyleCard style={styles[2]} index={2} />
          <StyleCard style={styles[3]} index={3} />
        </div>
      </div>
    </section>
  );
}
