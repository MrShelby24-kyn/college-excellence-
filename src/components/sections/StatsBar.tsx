import { Users, GraduationCap, Award, TrendingUp } from "lucide-react";
import { getSiteSettings } from "@/lib/data/settings";

export default async function StatsBar() {
  const settings = await getSiteSettings();

  const stats = [
    { icon: Users, value: `${settings.stats.students}+`, label: "Élèves" },
    { icon: GraduationCap, value: `${settings.stats.teachers}`, label: "Enseignants" },
    { icon: Award, value: `${settings.stats.yearsOfExperience} ans`, label: "D'expérience" },
    { icon: TrendingUp, value: `${settings.stats.successRatePercent}%`, label: "Taux de réussite" },
  ];

  return (
    <section className="relative z-10 bg-white pt-8">
      <div className="container-site sm:-mt-12">
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-xl sm:grid-cols-4 sm:p-8">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy">
                <Icon className="h-5 w-5" />
              </span>
              <span className="font-display text-2xl font-bold text-navy sm:text-3xl">{value}</span>
              <span className="text-xs font-medium text-navy-500 sm:text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
