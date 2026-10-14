"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gallery } from "@/content/images";
import type { Open } from "./Work";

/** Full-screen viewer. The photo flies in from its thumbnail via a shared layoutId. */
export function Lightbox({
  open,
  onClose,
  onNavigate,
}: {
  open: Open;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const isOpen = open !== null;

  useEffect(() => {
    if (!open) return;
    const n = gallery.length;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((open.index + 1) % n);
      if (e.key === "ArrowLeft") onNavigate((open.index - 1 + n) % n);
      if (e.key === "Tab" && dialogRef.current) {
        const items = [...dialogRef.current.querySelectorAll<HTMLElement>("button")];
        const i = items.indexOf(document.activeElement as HTMLElement);
        e.preventDefault();
        items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length]?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;
    lastFocus.current = document.activeElement as HTMLElement;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.documentElement.style.overflow = prev;
      lastFocus.current?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  const photo = open ? gallery[open.index] : null;
  const n = gallery.length;

  return (
    <AnimatePresence>
      {open && photo ? (
        <motion.div
          key="lightbox"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Tattoo photo viewer"
          className="fixed inset-0 z-[80] flex items-center justify-center overscroll-contain p-4 sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button type="button" aria-label="Close viewer" tabIndex={-1} onClick={onClose} className="absolute inset-0 bg-ink/94 backdrop-blur-sm" />

          <figure className="pointer-events-none relative flex h-full w-full max-w-5xl flex-col items-center justify-center gap-4">
            <motion.div
              key={open.index}
              layoutId={open.index === open.origin ? `${open.variant}-${open.index}` : undefined}
              initial={open.index === open.origin ? undefined : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="pointer-events-auto relative max-h-[78vh] w-auto overflow-hidden rounded-[var(--radius-media)]"
              style={{ aspectRatio: `${photo.src.width} / ${photo.src.height}`, height: "min(78vh, calc((100vw - 2rem) * " + photo.src.height / photo.src.width + "))" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 60vw, 100vw" quality={80} className="object-cover" />
            </motion.div>
            <motion.figcaption
              className="max-w-[60ch] text-center text-sm leading-relaxed text-bone/80"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {photo.alt}
            </motion.figcaption>
          </figure>

          <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-3 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:justify-between sm:px-6">
            <NavButton label="Previous photo" onClick={() => onNavigate((open.index - 1 + n) % n)} dir="prev" />
            <NavButton label="Next photo" onClick={() => onNavigate((open.index + 1) % n)} dir="next" />
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close viewer"
            className="pill absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-ink-3 text-bone ring-1 ring-inset ring-bone/15 transition-colors hover:bg-line"
          >
            <span aria-hidden className="relative block size-4">
              <span className="absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 rotate-45 rounded-full bg-current" />
              <span className="absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 -rotate-45 rounded-full bg-current" />
            </span>
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function NavButton({ label, onClick, dir }: { label: string; onClick: () => void; dir: "prev" | "next" }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      whileTap={{ scale: 0.9 }}
      className="pill grid size-12 place-items-center rounded-full bg-ink-3 text-bone ring-1 ring-inset ring-bone/15 transition-colors hover:bg-line"
    >
      <span aria-hidden className={`block size-2.5 border-b-2 border-l-2 border-current ${dir === "prev" ? "ml-1 rotate-45" : "mr-1 -rotate-[135deg]"}`} />
    </motion.button>
  );
}
