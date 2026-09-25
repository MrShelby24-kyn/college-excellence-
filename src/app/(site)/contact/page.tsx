import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import ContactForm from "@/components/sections/ContactForm";
import { schoolConfig } from "@/config/school";
import { getSiteSettings } from "@/lib/data/settings";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez-nous par téléphone, WhatsApp, email ou via le formulaire en ligne.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const mapSrc = `https://www.google.com/maps?q=${settings.gps.lat},${settings.gps.lng}&z=15&output=embed`;
  const waUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(schoolConfig.whatsappDefaultMessage)}`;

  return (
    <>
      <PageHeader
        kicker="Contact"
        title="Parlons de la scolarité de votre enfant"
        description="Notre équipe est disponible pour répondre à toutes vos questions."
      />

      <section className="section-padding">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-navy-100 p-6">
              <ul className="space-y-4 text-navy-700">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                  {settings.address}
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-gold-500" /> {settings.phone}
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-gold-500" /> {settings.email}
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                  <span>
                    {schoolConfig.openingHours.map((h) => (
                      <span key={h.day} className="block">{h.day} : {h.hours}</span>
                    ))}
                  </span>
                </li>
              </ul>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                <MessageCircle className="h-4 w-4" /> Discuter sur WhatsApp
              </a>
            </div>

            <div className="overflow-hidden rounded-2xl border border-navy-100 shadow-sm">
              <iframe
                src={mapSrc}
                width="100%"
                height="260"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation de l'établissement"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-navy-100 p-6 md:p-8">
            <h2 className="mb-6 font-display text-xl font-bold text-navy">Envoyez-nous un message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
