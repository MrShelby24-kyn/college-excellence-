import type { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import LoginForm from "@/components/admin/LoginForm";
import { schoolConfig } from "@/config/school";

export const metadata: Metadata = { title: "Connexion administration" };

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold">
            <GraduationCap className="h-6 w-6" />
          </span>
          <h1 className="mt-3 font-display text-xl font-bold text-navy">
            {schoolConfig.shortName}
          </h1>
          <p className="text-sm text-navy-500">Espace administration</p>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
