import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { schoolConfig } from "@/config/school";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.excellence-divo-demo.ci";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${schoolConfig.name} | Éducation & Excellence à Divo`,
    template: schoolConfig.seo.titleTemplate,
  },
  description: schoolConfig.seo.defaultDescription,
  keywords: schoolConfig.seo.keywords,
  openGraph: {
    type: "website",
    locale: "fr_CI",
    url: siteUrl,
    siteName: schoolConfig.name,
    title: `${schoolConfig.name} | Éducation & Excellence à Divo`,
    description: schoolConfig.seo.defaultDescription,
    images: [{ url: "/images/og-cover.jpg", width: 1200, height: 630, alt: schoolConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: schoolConfig.name,
    description: schoolConfig.seo.defaultDescription,
  },
  icons: { icon: schoolConfig.faviconUrl },
  alternates: { canonical: siteUrl },
};

// viewport-fit=cover : nécessaire pour que les marges de sécurité
// (env(safe-area-inset-*)) fonctionnent sur les écrans à encoche / barre de gestes.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">{children}</body>
    </html>
  );
}
