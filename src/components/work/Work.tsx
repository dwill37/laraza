"use client";

import Image from "next/image";
import { LayoutGroup, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gallery } from "@/content/images";
import { hrefOr, isPlaceholder, site } from "@/content/site";
import { CtaLink } from "../ui/CtaLink";
import { InstagramIcon } from "../ui/BrandIcons";
import { Lightbox } from "./Lightbox";

/** `origin` is the thumbnail the viewer opened from: only it shares a layoutId, so browsing crossfades instead of flying. */
export type Open = { variant: "strip" | "grid"; index: number; origin: number } | null;

/* Desktop: vertical scroll drives a horizontal strip (sticky stage + useScroll/useTransform). */
function Strip({ onOpen, open }: { onOpen: (i: number) => void; open: Open }) {
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const x = useTransform(smooth, (v) => -v * distance);
  const progress = useTransform(smooth, [0, 1], [0, 1]);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={stage} className="relative hidden lg:block" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden">
        <motion.ul ref={track} style={{ x }} className="flex w-max items-center gap-6 pl-[max(2rem,calc((100vw-1400px)/2+2rem))] pr-[12vw]">
          {gallery.map((photo, i) => {
            const tall = i % 3 !== 1;
            const isOpen = open?.variant === "strip" && open.origin === i && open.index === i;
            return (
              <li key={i} className={tall ? "h-[68vh]" : "h-[52vh] self-end mb-[8vh]"}>
                <button
                  type="button"
                  onClick={() => onOpen(i)}
                  aria-label={`Open photo: ${photo.alt}`}
                  className="group relative block h-full overflow-hidden rounded-[var(--radius-media)] focus-visible:rounded-[var(--radius-media)]"
                  style={{ aspectRatio: `${photo.src.width} / ${photo.src.height}` }}
                >
                  {!isOpen ? (
                    <motion.span layoutId={`strip-${i}`} className="absolute inset-0 block overflow-hidden rounded-[var(--radius-media)]">
                      <Image
                        src={photo.src}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 40vw, 1px"
                        placeholder="blur"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                      />
                    </motion.span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </motion.ul>
        {/* Scroll progress rail */}
        <div className="mx-auto mt-10 w-full max-w-[1400px] px-8">
          <div className="h-px w-full bg-line">
            <motion.div className="h-px origin-left bg-accent" style={{ scaleX: progress }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Mobile/tablet: two-column masonry with staggered reveals. */
function Grid({ onOpen, open, always }: { onOpen: (i: number) => void; open: Open; always?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <ul className={`columns-2 gap-3 px-4 sm:columns-3 sm:gap-4 sm:px-8 ${always ? "mx-auto max-w-[1400px] lg:columns-4" : "lg:hidden"}`}>
      {gallery.map((photo, i) => {
        const isOpen = open?.variant === "grid" && open.origin === i && open.index === i;
        return (
          <motion.li
            key={i}
            className="mb-3 break-inside-avoid sm:mb-4"
            initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 120, damping: 18, delay: (i % 2) * 0.08 }}
          >
            <button
              type="button"
              onClick={() => onOpen(i)}
              aria-label={`Open photo: ${photo.alt}`}
              className="relative block w-full overflow-hidden rounded-[var(--radius-media)]"
              style={{ aspectRatio: `${photo.src.width} / ${photo.src.height}` }}
            >
              {!isOpen ? (
                <motion.span layoutId={`grid-${i}`} className="absolute inset-0 block overflow-hidden rounded-[var(--radius-media)]">
                  <Image src={photo.src} alt="" fill sizes="(min-width: 640px) 33vw, 50vw" placeholder="blur" className="object-cover" />
                </motion.span>
              ) : null}
            </button>
          </motion.li>
        );
      })}
    </ul>
  );
}

export function Work() {
  const [open, setOpen] = useState<Open>(null);
  // Reduced motion: no scroll-linked sideways movement, the grid is used at every width.
  const reduce = useReducedMotion();
  const igMissing = isPlaceholder(site.links.instagram);

  return (
    <section id="work" aria-labelledby="work-title" className="relative py-24 sm:py-32 lg:pb-16">
      <div className="mx-auto mb-12 flex max-w-[1400px] flex-col gap-6 px-4 sm:mb-16 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 id="work-title" className="display text-[clamp(2.75rem,7vw,5.5rem)] text-bone">
            Fresh from the chair
          </h2>
          <p className="mt-5 max-w-[42ch] text-lg leading-snug text-muted">
            Real pieces, done at La Raza on 5th Avenue. Tap any photo to see it up close.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <CtaLink href={hrefOr(site.links.instagram)} variant="secondary">
            <span className="inline-flex items-center gap-2.5">
              <InstagramIcon className="size-[1.1rem]" />
              See more on Instagram
            </span>
          </CtaLink>
          {igMissing ? <span className="ph">{site.links.instagram}</span> : null}
        </div>
      </div>

      <LayoutGroup>
        {reduce ? null : <Strip open={open} onOpen={(index) => setOpen({ variant: "strip", index, origin: index })} />}
        <Grid always={!!reduce} open={open} onOpen={(index) => setOpen({ variant: "grid", index, origin: index })} />
        <Lightbox open={open} onClose={() => setOpen(null)} onNavigate={(index) => setOpen((o) => (o ? { ...o, index } : o))} />
      </LayoutGroup>
    </section>
  );
}
