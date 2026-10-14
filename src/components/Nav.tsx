"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { messages, nav } from "@/content/site";
import { photos } from "@/content/images";
import { waLink } from "@/lib/whatsapp";
import { CtaLink } from "./ui/CtaLink";

export function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 48;
    if (next !== solid) setSolid(next);
  });

  // Menu: lock scroll, close on Escape, keep focus inside, return focus on close.
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const first = menuRef.current?.querySelector<HTMLElement>("a");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && menuRef.current) {
        const items = [toggleRef.current, ...menuRef.current.querySelectorAll<HTMLElement>("a")].filter(Boolean) as HTMLElement[];
        const i = items.indexOf(document.activeElement as HTMLElement);
        const nextIndex = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : i === items.length - 1 ? 0 : i + 1;
        e.preventDefault();
        items[nextIndex]?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      toggleRef.current?.focus();
    };
  }, [open]);

  const compact = solid || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Solid backdrop fades in on scroll (opacity only) */}
      <motion.div
        aria-hidden
        className="absolute inset-0 border-b border-bone/10 bg-ink/88 backdrop-blur-md"
        initial={false}
        animate={{ opacity: solid && !open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
      <nav
        aria-label="Main"
        className={`relative mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-4 transition-[height] duration-300 ease-out sm:px-8 ${compact ? "h-16" : "h-20"}`}
      >
        <a href="#top" className="group relative z-10 flex items-center gap-3 rounded-full" aria-label="La Raza Tattoo, back to top">
          <motion.span
            className="relative block size-10 overflow-hidden rounded-full ring-1 ring-bone/20"
            animate={{ scale: compact ? 0.9 : 1 }}
          >
            <Image src={photos.logo.src} alt="" sizes="40px" className="object-cover" fill priority />
          </motion.span>
          <span translate="no" className="font-letter text-[1.65rem] leading-none text-bone">La Raza</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="group relative rounded-full px-3 py-2 text-sm font-medium text-bone/80 transition-colors hover:text-bone"
              >
                {item.label}
                <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <CtaLink href={waLink(messages.general)} whatsapp magnetic size="md">
              Get a quote on WhatsApp
            </CtaLink>
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="pill relative z-10 grid size-12 place-items-center rounded-full bg-ink-3/80 ring-1 ring-inset ring-bone/15 backdrop-blur-sm lg:hidden"
          >
            <span className="relative block h-3.5 w-5" aria-hidden>
              <motion.span
                className="absolute left-0 top-0 h-0.5 w-5 rounded-full bg-bone"
                animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
              />
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 w-5 rounded-full bg-bone"
                animate={open ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-0 flex flex-col overflow-y-auto overscroll-contain bg-ink-2 px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-24 lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: "circle(0% at 100% 0%)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "circle(150% at 100% 0%)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.ul
              className="flex flex-1 flex-col justify-center gap-1"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } } }}
            >
              {nav.map((item) => (
                <li key={item.href} className="overflow-hidden">
                  <motion.a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="display block py-1 text-[clamp(2.75rem,13vw,4.5rem)] text-bone transition-colors active:text-accent"
                    variants={{ hidden: { y: "105%" }, show: { y: "0%", transition: { type: "spring", stiffness: 160, damping: 20 } } }}
                  >
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </motion.ul>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <CtaLink href={waLink(messages.general)} whatsapp size="lg" className="w-full">
                Get a quote on WhatsApp
              </CtaLink>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
