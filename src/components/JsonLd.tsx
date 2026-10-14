import { artists, isPlaceholder, site } from "@/content/site";

/** TattooParlor structured data. Placeholder values are left out until they are filled in site.ts. */
export function JsonLd() {
  const { hours } = site;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "TattooParlor",
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    image: `${site.url}/opengraph-image.jpg`,
    logo: `${site.url}/icon.jpg`,
    telephone: site.phone.e164,
    address: {
      "@type": "PostalAddress",
      streetAddress: isPlaceholder(site.address.streetNumber)
        ? site.address.street
        : `${site.address.street} ${site.address.streetNumber}`,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", ...site.geo },
    hasMap: site.maps.directions,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: 5,
    },
    employee: artists.filter((a) => a.visible).map((a) => ({ "@type": "Person", name: a.name, jobTitle: "Tattoo artist" })),
  };

  const sameAs = [site.links.instagram, site.links.facebook].filter((l) => !isPlaceholder(l));
  if (sameAs.length) data.sameAs = sameAs;
  if (!isPlaceholder(site.links.email)) data.email = site.links.email;

  // Emitted only once opening days and time are filled in site.ts (closing time 21:00 is known).
  if (hours.days?.length && hours.opens) {
    data.openingHoursSpecification = [
      { "@type": "OpeningHoursSpecification", dayOfWeek: hours.days, opens: hours.opens, closes: hours.closes },
    ];
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
