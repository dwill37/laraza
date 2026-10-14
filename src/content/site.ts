/**
 * Single source of truth for every business fact on the site.
 * Facts come only from La Raza Tattoo's Google Business Profile.
 * Anything unknown is a visible `[PLACEHOLDER: ...]` string: search this file for "PLACEHOLDER" to fill them in.
 */

export const PH = (label: string) => `[PLACEHOLDER: ${label}]`;
export const isPlaceholder = (value: string | null | undefined) => !value || value.startsWith("[PLACEHOLDER");

export const site = {
  name: "La Raza Tattoo",
  // [PLACEHOLDER: production domain] Used for canonical URL, Open Graph and JSON-LD.
  url: "https://example.com",

  phone: {
    display: "+52 984 104 3378",
    href: "tel:+529841043378",
    e164: "+529841043378",
  },
  whatsappNumber: "529841043378",

  address: {
    display: "5th Avenue & 50th Street, Playa del Carmen",
    street: "5ta Avenida con Calle 50",
    streetNumber: PH("exact street number if any"),
    postalCode: "77710",
    city: "Playa del Carmen",
    region: "Quintana Roo",
    country: "MX",
    full: "5ta Avenida con Calle 50, 77710 Playa del Carmen, Q.R., México",
  },

  plusCode: "JWQP+GH Playa del Carmen, Quintana Roo, México",
  // Decoded from the plus code (full code 76GJJWQP+GH, cell center). [PLACEHOLDER: verify lat/long on Google Maps]
  geo: { latitude: 20.638813, longitude: -87.063563 },

  hours: {
    closes: "21:00",
    // Fill these to complete the hours display and the JSON-LD openingHoursSpecification.
    opens: null as string | null, // [PLACEHOLDER: opening time, e.g. "11:00"]
    days: null as string[] | null, // [PLACEHOLDER: opening days, e.g. ["Monday", "Tuesday", ...]]
    opensLabel: PH("opening time"),
    daysLabel: PH("opening days"),
  },

  rating: { value: 4.8, count: 14 },

  links: {
    instagram: PH("Instagram URL"),
    facebook: PH("Facebook link"),
    email: PH("email"),
    googleReviews: PH("Google reviews link"),
  },

  maps: {
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=" +
      encodeURIComponent("La Raza Tattoo, 5ta Avenida con Calle 50, Playa del Carmen"),
    embed: "https://www.google.com/maps?q=" + encodeURIComponent("JWQP+GH Playa del Carmen, Quintana Roo") + "&z=17&output=embed",
  },
} as const;

export const nav = [
  { href: "#styles", label: "Styles" },
  { href: "#work", label: "Work" },
  { href: "#artists", label: "Artists" },
  { href: "#reviews", label: "Reviews" },
  { href: "#location", label: "Location" },
  { href: "#faq", label: "FAQ" },
] as const;

export const messages = {
  general: "Hi La Raza Tattoo! I saw your website and I’d like a quote for a tattoo.",
  style: (style: string) => `Hi La Raza Tattoo! I saw your website and I’d like a quote for a ${style} tattoo.`,
  friend: "Hi La Raza Tattoo! My friend and I would like to get tattooed together during our trip.",
  artist: (name: string) => `Hi La Raza Tattoo! I saw your website and I’d like to book a tattoo with ${name}.`,
  final: "Hi La Raza Tattoo! I’m in Playa del Carmen and I’d like to get tattooed with you.",
};

export const artists = [
  // Set `visible: false` to hide an artist card (and remove them from JSON-LD).
  { name: "Mariel", visible: true, specialty: PH("specialty"), bio: PH("short bio"), photo: PH("artist photo") },
  { name: "Gustavo", visible: true, specialty: PH("specialty"), bio: PH("short bio"), photo: PH("artist photo") },
  { name: "Kevin", visible: true, specialty: PH("specialty"), bio: PH("short bio"), photo: PH("artist photo") },
];
export const artistsNote = PH("confirm Mariel, Gustavo and Kevin still work at the studio");

export const reviews = [
  {
    name: "Matt W.",
    role: "Google Local Guide",
    text: "Highly recommend Mariel! Affordable, professional, very clean and very meticulous. I recommend her to everyone. Why not get tattooed together with a friend on vacation?",
  },
  {
    name: "Alonzo R.",
    role: "Google Local Guide",
    text: "I’ve been lucky to get great tattoos done by Gustavo and Kevin. A great place to get tattooed at unbeatable prices. I’ll be back soon!",
  },
  {
    name: "Agape",
    role: "Google Local Guide",
    text: "What a beautiful place! Thank you for your exceptional work. I spent many hours here getting a work of art tattooed, a piece that revealed something incredible in me.",
  },
];

export const faqs = [
  {
    q: "How do I get a quote?",
    a: [
      "Send us a WhatsApp message with your idea: reference photos, the size you have in mind and where on your body it goes. We reply with a quote.",
    ],
    cta: true,
  },
  {
    q: "How much does a tattoo cost?",
    a: [
      "Our clients call our prices affordable, even unbeatable. Every piece is quoted on its size, detail and placement, so the fastest way to know is to message us.",
      PH("exact prices or price ranges"),
    ],
  },
  {
    q: "Can I get tattooed during my vacation?",
    a: [
      "Yes. We’re right on 5th Avenue, so it’s easy to drop by during your trip.",
      PH("walk-ins and same-day sessions policy"),
    ],
  },
  {
    q: "Can I book a specific artist?",
    a: [
      "Yes. Ask for Mariel, Gustavo or Kevin when you message us on WhatsApp.",
      PH("confirm artist booking policy"),
    ],
  },
  {
    q: "Do I need to leave a deposit?",
    a: [PH("deposit policy")],
  },
  {
    q: "How should I care for my tattoo in the sun and sea?",
    a: [PH("aftercare advice for sun, sea and pools")],
  },
];

/** href for a link that may still be a placeholder: falls back to "#" so nothing breaks. */
export const hrefOr = (url: string) => (isPlaceholder(url) ? "#" : url);
