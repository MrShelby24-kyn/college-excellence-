"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import type { ApplicationStatus } from "@/types/database";

const options: { value: ApplicationStatus; label: string }[] = [
  { value: "nouvelle", label: "Nouvelle" },
  { value: "en_cours", label: "En cours" },
  { value: "acceptee", label: "Acceptée" },
  { value: "refusee", label: "Refusée" },
];

export default function ApplicationStatusSelect({ applicationId, current }: { applicationId: string; current: ApplicationStatus }) {
  const router = useRouter();
  const [value, setValue] = useState(current);
  const [loading, setLoading] = useState(false);

  async function onChange(newStatus: ApplicationStatus) {
    setValue(newStatus);
    setLoading(true);
    await fetch(`/api/admin/applications/${applicationId}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as ApplicationStatus)}
        className="rounded border border-navy-200 px-3 py-2 text-sm outline-none focus:border-gold-500"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {loading && <Loader2 className="h-4 w-4 animate-spin text-navy-400" />}
    </div>
  );
}
