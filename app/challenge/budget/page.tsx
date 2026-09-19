"use client";

import { StepHeading } from "@/components/challenge/step-heading";
import { OptionCard } from "@/components/option-card";
import { BUDGETS } from "@/lib/data";
import { baht } from "@/lib/format";
import { effectiveBudget } from "@/lib/outfit";
import { setPrefs, useAppState } from "@/lib/store";

export default function BudgetStep() {
  const { prefs } = useAppState();

  return (
    <>
      <StepHeading title="What's your budget?" sub="We'll only recommend outfits within your limit." />
      <div className="mt-[22px] grid grid-cols-2 gap-3">
        {BUDGETS.map((budget) => (
          <OptionCard
            key={budget.value}
            selected={prefs.budget === budget.value}
            onClick={() => setPrefs({ budget: budget.value })}
            className="px-4 py-5 text-center text-[15px] font-extrabold"
          >
            {budget.label}
          </OptionCard>
        ))}
      </div>
      <div className="mt-5 border border-card px-4 py-[18px]">
        <label htmlFor="custom-budget" className="block text-[13px] font-bold">
          Custom budget
        </label>
        <input
          id="custom-budget"
          type="range"
          min={500}
          max={5000}
          step={100}
          value={prefs.budget}
          onChange={(event) => setPrefs({ budget: Number(event.target.value) })}
          className="m-0.5 mt-3"
        />
        <p className="mt-2 text-[14px] text-body">
          Your maximum budget: <span className="font-extrabold text-brand">{baht(effectiveBudget(prefs))}</span>
        </p>
      </div>
    </>
  );
}
