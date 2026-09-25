import { getSiteSettings } from "@/lib/data/settings";
import HeaderClient from "@/components/layout/HeaderClient";

export default async function Header() {
  const settings = await getSiteSettings();
  return <HeaderClient name={settings.name} logoUrl={settings.logoUrl} />;
}
