import Image from "next/image";
import { hrefOr, isPlaceholder, nav, site } from "@/content/site";
import { photos } from "@/content/images";
import { FacebookIcon, InstagramIcon } from "./ui/BrandIcons";
import { Fill } from "./ui/Fill";

export function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { label: "Instagram", href: site.links.instagram, Icon: InstagramIcon },
    { label: "Facebook", href: site.links.facebook, Icon: FacebookIcon },
  ];
  return (
    <footer className="border-t border-line bg-ink pb-28 pt-16 sm:pb-12">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <a href="#top" className="inline-flex items-center gap-3 rounded-full" aria-label="La Raza Tattoo, back to top">
            <span className="relative block size-14 overflow-hidden rounded-full ring-1 ring-bone/20">
              <Image src={photos.logo.src} alt="" fill sizes="56px" className="object-cover" />
            </span>
            <span translate="no" className="font-letter text-4xl leading-none text-bone">La Raza Tattoo</span>
          </a>
          <address className="mt-6 space-y-1.5 not-italic text-[0.9375rem] leading-relaxed text-muted">
            <span className="block">{site.address.full}</span>
            <span className="block">
              <a href={site.phone.href} className="text-bone hover:text-accent">
                {site.phone.display}
              </a>
            </span>
            <span className="block">
              {isPlaceholder(site.links.email) ? (
                <Fill>{site.links.email}</Fill>
              ) : (
                <a href={`mailto:${site.links.email}`} className="text-bone hover:text-accent">
                  {site.links.email}
                </a>
              )}
            </span>
          </address>
        </div>

        <div className="md:col-span-3">
          <h2 className="text-sm font-semibold text-bone">Hours</h2>
          <p className="mt-4 space-y-1 text-[0.9375rem] leading-relaxed text-muted">
            <span className="block">Closes at {site.hours.closes}</span>
            <span className="block">
              Opens <Fill>{site.hours.opens ?? site.hours.opensLabel}</Fill>
            </span>
            <span className="block">
              <Fill>{site.hours.days?.join(", ") ?? site.hours.daysLabel}</Fill>
            </span>
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-2">
          <h2 className="text-sm font-semibold text-bone">Explore</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-[0.9375rem] md:grid-cols-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-muted transition-colors hover:text-bone">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-2">
          <h2 className="text-sm font-semibold text-bone">Follow</h2>
          <ul className="mt-4 flex gap-3">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={hrefOr(href)}
                  {...(isPlaceholder(href) ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  aria-label={`La Raza Tattoo on ${label}`}
                  className="pill grid size-12 place-items-center rounded-full bg-ink-3 text-bone ring-1 ring-inset ring-line transition-colors hover:bg-accent hover:text-ink"
                >
                  <Icon className="size-5" />
                </a>
              </li>
            ))}
          </ul>
          <ul className="mt-3 space-y-1.5">
            {socials
              .filter((s) => isPlaceholder(s.href))
              .map((s) => (
                <li key={s.label}>
                  <Fill>{s.href}</Fill>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-[1400px] flex-col gap-2 border-t border-line px-4 pt-8 text-sm text-muted sm:flex-row sm:justify-between sm:px-8">
        <p>&copy; {year} La Raza Tattoo. All rights reserved.</p>
        <p>5th Avenue & 50th Street, Playa del Carmen</p>
      </div>
    </footer>
  );
}
