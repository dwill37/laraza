import type { StaticImageData } from "next/image";
import { PH } from "./site";

import logo from "@images/image_14.jpg";
import heartWeb from "@images/image_2.jpg";
import sunMoon from "@images/image_3.jpg";
import mandala from "@images/image_4.jpg";
import masks from "@images/image_5.jpg";
import floralSleeve from "@images/image_6.jpg";
import archangel from "@images/image_7.jpg";
import cowboySkull from "@images/image_8.jpg";
import crossFlowers from "@images/image_9.jpg";
import jellyfish from "@images/image_10.jpg";
import storefront from "@images/image_11.jpg";
import vacationTaco from "@images/image_12.jpg";
import colorMask from "@images/image_13.jpg";

export type Photo = { src: StaticImageData; alt: string; position?: string };

export const photos = {
  logo: { src: logo, alt: "La Raza Tattoo logo: a monkey in a cap above a ribbon that reads La Raza" },
  archangel: {
    src: archangel,
    alt: "Black and grey realism tattoo of a winged archangel gripping a sword, covering the upper arm and shoulder",
    position: "50% 30%",
  },
  heartWeb: {
    src: heartWeb,
    alt: "Blackwork tattoo of a spider-web heart wrapped in sharp thorn shapes on the forearm, below a bold line-work rose",
  },
  sunMoon: {
    src: sunMoon,
    alt: "Fine-line sun and crescent moon tattoo with a sleeping face, wavy rays and small stars on the inner forearm",
  },
  mandala: {
    src: mandala,
    alt: "Dotwork mandala tattoo with layered petals shaded in black stipple, running along the forearm",
  },
  masks: {
    src: masks,
    alt: "Five anime-style fox and demon masks tattooed in a vertical line down the calf, with red, pink, blue and yellow color accents",
  },
  floralSleeve: {
    src: floralSleeve,
    alt: "Black and grey floral tattoo on the upper arm with sunflowers, roses, daisies and a butterfly",
    position: "50% 45%",
  },
  cowboySkull: {
    src: cowboySkull,
    alt: "Black and grey realism tattoo of a skull in a cowboy hat with a draped bandana on the forearm",
  },
  crossFlowers: {
    src: crossFlowers,
    alt: "Stippled black and grey flowers around a glowing red cross with two red butterflies on the forearm",
  },
  jellyfish: {
    src: jellyfish,
    alt: "Large dotwork jellyfish with long flowing tentacles and leafy vines tattooed on the outer thigh",
  },
  storefront: {
    src: storefront,
    alt: "La Raza Tattoo storefront in Playa del Carmen: a red TATTOO sign, terracotta awning and the La Raza monkey banner by the door",
  },
  vacationTaco: {
    src: vacationTaco,
    alt: "Colorful cartoon tattoo of a taco in sunglasses lounging on a striped beach chair under a palm tree, holding a margarita and saying Hola",
  },
  colorMask: {
    src: colorMask,
    alt: "Bold traditional-style color tattoo of a fanged mask in teal, red and yellow on the forearm",
  },
} satisfies Record<string, Photo>;

/** Portfolio order: alternates black and grey with color to keep the strip rhythmic. */
export const gallery: Photo[] = [
  photos.floralSleeve,
  photos.masks,
  photos.cowboySkull,
  photos.jellyfish,
  photos.vacationTaco,
  photos.heartWeb,
  photos.crossFlowers,
  photos.sunMoon,
  photos.colorMask,
  photos.mandala,
];

export const styles = [
  { id: "style-1", name: PH("style name"), description: PH("short description"), price: PH('price or "from $..."'), duration: PH("approximate session time"), photo: photos.cowboySkull },
  { id: "style-2", name: PH("style name"), description: PH("short description"), price: PH('price or "from $..."'), duration: PH("approximate session time"), photo: photos.sunMoon },
  { id: "style-3", name: PH("style name"), description: PH("short description"), price: PH('price or "from $..."'), duration: PH("approximate session time"), photo: photos.mandala },
  { id: "style-4", name: PH("style name"), description: PH("short description"), price: PH('price or "from $..."'), duration: PH("approximate session time"), photo: photos.masks },
];
