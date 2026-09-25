import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { schoolConfig } from "@/config/school";
import { getSiteSettings } from "@/lib/data/settings";

export default async function ContactSummary() {
  const settings = await getSiteSettings();
  const mapSrc = `https://www.google.com/maps?q=${settings.gps.lat},${settings.gps.lng}&z=15&output=embed`;

  return (
    <section className="section-padding">
      <div className="container-site grid gap-10 lg:grid-cols-2">
        <div>
          <span className="section-kicker">Nous trouver</span>
          <h2 className="section-title">Venez nous rendre visite</h2>

          <ul className="mt-6 space-y-4 text-navy-700">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
              {settings.address}
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-gold-500" />
              {settings.phone}
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 shrink-0 text-gold-500" />
              {settings.email}
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
              <span>
                {schoolConfig.openingHours.map((h) => (
                  <span key={h.day} className="block">
                    {h.day} : {h.hours}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>

        <div className="overflow-hidden rounded-2xl border border-navy-100 shadow-sm">
          <iframe
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 320 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localisation de l'établissement"
          />
        </div>
      </div>
    </section>
  );
}
