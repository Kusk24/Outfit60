"use client";

import { StepHeading } from "@/components/challenge/step-heading";
import { OptionCard } from "@/components/option-card";
import { OCCASIONS } from "@/lib/data";
import { useI18n } from "@/lib/i18n/provider";
import { setPrefs, useAppState } from "@/lib/store";

export default function OccasionStep() {
  const { prefs } = useAppState();
  const { dict } = useI18n();

  return (
    <>
      <StepHeading title={dict.occasionStep.title} sub={dict.occasionStep.sub} />
      <div className="mt-[22px] grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">
        {OCCASIONS.map((id) => (
          <OptionCard
            key={id}
            selected={prefs.occasion === id}
            onClick={() => setPrefs({ occasion: id })}
            className="px-4 py-[18px] text-left"
          >
            <span className="block text-[16px] font-extrabold">{dict.occasions[id].title}</span>
            <span className="mt-[3px] block text-[12px] text-muted">{dict.occasions[id].sub}</span>
          </OptionCard>
        ))}
      </div>
    </>
  );
}
