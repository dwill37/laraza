import { site } from "@/content/site";

/** wa.me deep link with a URL-encoded, pre-filled English message. */
export function waLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
