import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = ["Élève", "Parent", "Documents", "Récapitulatif"];

export default function StepProgress({ current }: { current: number }) {
  return (
    <ol className="mb-10 flex items-center">
      {steps.map((label, i) => {
        const stepNumber = i + 1;
        const isDone = stepNumber < current;
        const isActive = stepNumber === current;
        return (
          <li key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                  isDone && "bg-navy text-gold",
                  isActive && "bg-gold text-navy-900",
                  !isDone && !isActive && "bg-navy-100 text-navy-400"
                )}
              >
                {isDone ? <Check className="h-4 w-4" /> : stepNumber}
              </span>
              <span
                className={cn(
                  "hidden text-xs font-medium sm:block",
                  isActive ? "text-navy" : "text-navy-400"
                )}
              >
                {label}
              </span>
            </div>
            {stepNumber !== steps.length && (
              <div className={cn("mx-2 h-0.5 flex-1", isDone ? "bg-navy" : "bg-navy-100")} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
