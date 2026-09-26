import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { getSiteSettings } from "@/lib/data/settings";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.excellence-divo-demo.ci";

// Les pages publiques sont maintenant mises en cache et régénérées au plus
// toutes les 60 secondes (ISR), au lieu d'être recalculées à chaque visite.
// Une modification dans /admin apparaît donc sur le site en moins d'une minute.
export const revalidate = 60;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "School",
    name: settings.name,
    description: settings.description,
    telephone: settings.phone,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: "Divo",
      addressCountry: "CI",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: settings.gps.lat,
      longitude: settings.gps.lng,
    },
    url: siteUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
