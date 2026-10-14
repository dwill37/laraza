"use client";

import { motion, useReducedMotion } from "framer-motion";
import { messages } from "@/content/site";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./ui/BrandIcons";

/** Always-on WhatsApp button. Big and labeled on mobile, a small round button on desktop. Enters after the hero intro. */
export function FloatingWhatsApp() {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={waLink(messages.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with La Raza Tattoo on WhatsApp (opens in a new tab)"
      className="pill fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40 flex h-14 items-center gap-2.5 rounded-full bg-accent pl-4 pr-5 font-semibold text-ink shadow-[0_14px_34px_-10px_rgb(0_0_0/0.75)] sm:bottom-6 sm:right-6 lg:size-12 lg:justify-center lg:p-0 lg:opacity-80 lg:transition-opacity lg:hover:opacity-100"
      initial={reduce ? false : { scale: 0, rotate: -30, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 14, delay: 2.4 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
    >
      <WhatsAppIcon className="size-6 lg:size-5" />
      <span className="lg:sr-only">WhatsApp</span>
    </motion.a>
  );
}
