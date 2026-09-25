import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { schoolConfig } from "@/config/school";
import { getPageContent } from "@/lib/data/content";
import { homeContentDefaults } from "@/lib/content-defaults";
import Reveal from "@/components/sections/Reveal";

export default async function Presentation() {
  const content = await getPageContent("home", homeContentDefaults);

  return (
    <section className="section-padding bg-surface">
      <Reveal>
      <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
          <Image
            src={content.presentationImageUrl}
            alt={schoolConfig.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <span className="section-kicker">Notre établissement</span>
          <h2 className="section-title">Pourquoi choisir {schoolConfig.shortName} ?</h2>
          <p className="mt-4 text-navy-600">{content.presentationText}</p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {content.whyUsItems.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-navy-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      </Reveal>
    </section>
  );
}
