"use client";

import { MessageCircle } from "lucide-react";
import { schoolConfig } from "@/config/school";

export default function WhatsAppButton() {
  const url = `https://wa.me/${schoolConfig.whatsapp}?text=${encodeURIComponent(
    schoolConfig.whatsappDefaultMessage
  )}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nous contacter sur WhatsApp"
      style={{
        bottom: "max(1.25rem, calc(env(safe-area-inset-bottom, 0px) + 1rem))",
        right: "max(1.25rem, calc(env(safe-area-inset-right, 0px) + 1rem))",
      }}
      className="fixed z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg transition-transform hover:scale-105 active:scale-95 animate-soft-pulse"
    >
      <MessageCircle className="h-6 w-6" fill="white" />
      <span className="hidden text-sm font-semibold sm:inline">Écrivez-nous</span>
    </a>
  );
}
