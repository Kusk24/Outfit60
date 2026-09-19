"use client";

import { StepHeading } from "@/components/challenge/step-heading";
import { OptionCard } from "@/components/option-card";
import { OCCASIONS } from "@/lib/data";
import { setPrefs, useAppState } from "@/lib/store";

export default function OccasionStep() {
  const { prefs } = useAppState();

  return (
    <>
      <StepHeading title="What are you dressing for?" sub="Choose your situation and we'll build the look around you." />
      <div className="mt-[22px] grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">
        {OCCASIONS.map((occasion) => (
          <OptionCard
            key={occasion.id}
            selected={prefs.occasion === occasion.id}
            onClick={() => setPrefs({ occasion: occasion.id })}
            className="px-4 py-[18px] text-left"
          >
            <span className="block text-[16px] font-extrabold">{occasion.title}</span>
            <span className="mt-[3px] block text-[12px] text-muted">{occasion.sub}</span>
          </OptionCard>
        ))}
      </div>
    </>
  );
}
