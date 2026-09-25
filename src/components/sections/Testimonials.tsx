import { Quote, Star } from "lucide-react";
import Reveal from "@/components/sections/Reveal";

const testimonials = [
  {
    name: "Mme Konan A.",
    role: "Parent d'élève en 4ème",
    quote:
      "Le suivi pédagogique est remarquable. Mon fils a gagné en confiance et ses résultats se sont nettement améliorés depuis son arrivée.",
  },
  {
    name: "M. Bamba S.",
    role: "Parent d'élève en 3ème",
    quote:
      "Une équipe à l'écoute, disponible et rassurante. La communication avec les enseignants est simple et régulière.",
  },
  {
    name: "Mme Yao C.",
    role: "Parent d'élève en 6ème",
    quote:
      "Cadre sécurisant, discipline bien encadrée et enseignants investis. Je recommande cet établissement sans hésiter.",
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-navy-900 text-white">
      <Reveal>
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-kicker text-gold-300">Témoignages</span>
          <h2 className="font-display text-3xl font-bold md:text-4xl">Ce que disent les parents</h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl bg-navy-800 p-6">
              <Quote className="h-6 w-6 text-gold-400" />
              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-navy-100">&laquo; {t.quote} &raquo;</p>
              <div className="mt-4 border-t border-navy-700 pt-4">
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-navy-300">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </Reveal>
    </section>
  );
}
