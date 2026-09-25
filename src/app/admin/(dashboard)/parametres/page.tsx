import { getSiteSettings } from "@/lib/data/settings";
import SettingsForm from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy">Réglages du site</h1>
      <p className="mt-1 text-sm text-navy-500">
        Ces informations alimentent directement le site public (en-tête, pied de page, page d&apos;accueil).
      </p>
      <div className="mt-6">
        <SettingsForm initial={settings} />
      </div>
    </div>
  );
}
