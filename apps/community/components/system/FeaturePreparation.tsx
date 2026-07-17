import { CheckCircle2, Clock3, type LucideIcon } from "lucide-react";

import { PageHeader } from "@/components/ui/PageHeader";

export type FeaturePreparationProps = {
  title: string;
  description: string;
  eyebrow: string;
  icon: LucideIcon;
  features: string[];
  note: string;
};

export function FeaturePreparation({
  title,
  description,
  eyebrow,
  icon: Icon,
  features,
  note,
}: FeaturePreparationProps) {
  return (
    <div className="space-y-5 pb-24 md:pb-0">
      <PageHeader title={title} description={description} />

      <section className="relative overflow-hidden rounded-[30px] border border-[#ead9b8] bg-white/88 p-5 shadow-[0_18px_45px_rgba(88,60,28,0.10)] sm:p-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 size-56 rounded-full bg-[#bde9ff]/50 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-20 size-56 rounded-full bg-[#b9df8c]/40 blur-3xl"
        />

        <div className="relative">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <span className="grid size-14 shrink-0 place-items-center rounded-[20px] border border-[#cfe5ba] bg-[#edf7df] text-[#4f8124]">
              <Icon size={26} />
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[#ead9b8] bg-[#fffaf0] px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#9b6635]">
                  {eyebrow}
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d9c7ff] bg-[#f3edff] px-3 py-1 text-[11px] font-black uppercase tracking-[0.1em] text-[#6d4cc2]">
                  <Clock3 size={13} />
                  In Preparation
                </span>
              </div>

              <h2 className="mt-4 text-[clamp(1.45rem,3vw,2.25rem)] font-black leading-tight text-[#2f2418]">
                {title} is being built as a real connected feature.
              </h2>

              <p className="mt-3 max-w-3xl font-bold leading-7 text-[#7a5635]">
                {note}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-3 rounded-[20px] border border-[#ead9b8] bg-[#fffaf0]/85 p-4"
              >
                <CheckCircle2
                  size={19}
                  className="mt-0.5 shrink-0 text-[#6fa83a]"
                />
                <p className="text-sm font-black leading-6 text-[#5f4a35]">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
