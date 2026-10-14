"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";
import { photos } from "@/content/images";
import { CtaLink } from "./ui/CtaLink";
import { Fill } from "./ui/Fill";

export function Location() {
  const reduce = useReducedMotion();
  return (
    <section id="location" aria-labelledby="location-title" className="relative overflow-x-clip py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <h2 id="location-title" className="display mb-12 max-w-[14ch] text-[clamp(2.75rem,7vw,5.5rem)] text-bone sm:mb-16">
          Find us on Quinta Avenida
        </h2>

        <motion.div className="grid gap-5 lg:grid-cols-12 lg:gap-6" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          {/* Map card: wipes open, then the pin drops */}
          <motion.div
            className="relative min-h-[380px] overflow-hidden rounded-[var(--radius-card)] bg-ink-3 ring-1 ring-inset ring-line lg:col-span-7 lg:min-h-[560px]"
            variants={{
              hidden: reduce ? { opacity: 0 } : { clipPath: "inset(0% 100% 0% 0% round 20px)" },
              show: reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0% round 20px)", transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } },
            }}
          >
            <iframe
              title="Map showing La Raza Tattoo at 5th Avenue and 50th Street, Playa del Carmen"
              src={site.maps.embed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 [filter:grayscale(0.35)_contrast(1.05)]"
              allowFullScreen
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -ml-6 -mt-14"
              variants={{
                hidden: { y: reduce ? 0 : -260, opacity: 0 },
                show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 13, delay: 0.95 } },
              }}
            >
              <svg viewBox="0 0 48 60" className="h-14 w-12 drop-shadow-[0_8px_10px_rgb(0_0_0/0.45)]">
                <path d="M24 58S4 36 4 22a20 20 0 0 1 40 0c0 14-20 36-20 36Z" fill="var(--color-accent)" stroke="var(--color-ink)" strokeWidth="2.5" />
                <circle cx="24" cy="22" r="7" fill="var(--color-ink)" />
              </svg>
            </motion.div>
          </motion.div>

          <div className="flex flex-col gap-5 lg:col-span-5">
            <motion.div
              className="flex flex-col gap-7 rounded-[var(--radius-card)] bg-ink-2 p-7 ring-1 ring-inset ring-line sm:p-8"
              variants={{
                hidden: { opacity: 0, x: 40 },
                show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 90, damping: 18, delay: 0.3 } },
              }}
            >
              <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <div>
                  <dt className="text-sm text-muted">Address</dt>
                  <dd className="mt-1.5 text-lg leading-snug text-bone">
                    <address className="not-italic">
                      {site.address.display}
                      <br />
                      <span className="text-[0.9375rem] text-bone/70">{site.address.full}</span>
                      <br />
                      <Fill>{site.address.streetNumber}</Fill>
                    </address>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Plus code</dt>
                  <dd className="mt-1.5 text-lg leading-snug text-bone">{site.plusCode}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Hours</dt>
                  <dd className="mt-1.5 space-y-1 text-lg leading-snug text-bone">
                    <span className="block">Closes at {site.hours.closes}</span>
                    <span className="block text-[0.9375rem]">
                      Opens <Fill>{site.hours.opens ?? site.hours.opensLabel}</Fill>
                    </span>
                    <span className="block text-[0.9375rem]">
                      <Fill>{site.hours.days?.join(", ") ?? site.hours.daysLabel}</Fill>
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Phone & WhatsApp</dt>
                  <dd className="mt-1.5 text-lg">
                    <a href={site.phone.href} className="text-bone underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">
                      {site.phone.display}
                    </a>
                  </dd>
                </div>
              </dl>
              <CtaLink href={site.maps.directions} magnetic className="w-full sm:w-auto sm:self-start">
                Get directions
              </CtaLink>
            </motion.div>

            <motion.div
              className="relative min-h-[260px] flex-1 overflow-hidden rounded-[var(--radius-card)]"
              variants={{
                hidden: reduce ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0% round 20px)" },
                show: reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0% round 20px)", transition: { duration: 1, delay: 0.45, ease: [0.76, 0, 0.24, 1] } },
              }}
            >
              <Image
                src={photos.storefront.src}
                alt={photos.storefront.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                placeholder="blur"
                className="object-cover object-[50%_35%]"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
