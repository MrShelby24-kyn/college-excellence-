import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import Presentation from "@/components/sections/Presentation";
import LevelsPreview from "@/components/sections/LevelsPreview";
import NewsPreview from "@/components/sections/NewsPreview";
import GalleryPreview from "@/components/sections/GalleryPreview";
import Testimonials from "@/components/sections/Testimonials";
import ContactSummary from "@/components/sections/ContactSummary";

// Un seul bouton de préinscription sur cette page (dans le Hero) : la navbar
// en fournit un second, toujours visible. Pas de 3e bouton redondant (CtaBanner retiré).
export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Presentation />
      <LevelsPreview />
      <NewsPreview />
      <GalleryPreview />
      <Testimonials />
      <ContactSummary />
    </>
  );
}
