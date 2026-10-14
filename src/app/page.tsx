import { Nav } from "@/components/Nav";
import { Hero } from "@/components/hero/Hero";
import { WhyLaRaza } from "@/components/WhyLaRaza";
import { Styles } from "@/components/Styles";
import { Work } from "@/components/work/Work";
import { Artists } from "@/components/Artists";
import { Reviews } from "@/components/Reviews";
import { HowItWorks } from "@/components/HowItWorks";
import { Location } from "@/components/Location";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="pill fixed left-4 top-4 z-[90] -translate-y-24 rounded-full bg-bone px-5 py-3 font-semibold text-ink transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <WhyLaRaza />
        <Styles />
        <Work />
        <Artists />
        <Reviews />
        <HowItWorks />
        <Location />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
