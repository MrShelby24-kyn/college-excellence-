import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import GalleryGrid from "@/components/sections/GalleryGrid";
import { getGalleryItems } from "@/lib/data/gallery";

export const metadata: Metadata = {
  title: "Galerie",
  description: "Photos de l'établissement, des classes, activités et événements.",
};

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <>
      <PageHeader
        kicker="Galerie"
        title="La vie de l'établissement en images"
        description="Établissement, classes, activités et événements marquants de l'année."
      />
      <section className="section-padding">
        <div className="container-site">
          <GalleryGrid items={items} />
        </div>
      </section>
    </>
  );
}
