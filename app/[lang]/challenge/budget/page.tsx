"use client";

import { StepHeading } from "@/components/challenge/step-heading";
import { OptionCard } from "@/components/option-card";
import { BUDGETS } from "@/lib/data";
import { baht } from "@/lib/format";
import { useI18n } from "@/lib/i18n/provider";
import { effectiveBudget } from "@/lib/outfit";
import { setPrefs, useAppState } from "@/lib/store";

export default function BudgetStep() {
  const { prefs } = useAppState();
  const t = useI18n().dict.budgetStep;

  return (
    <>
      <StepHeading title={t.title} sub={t.sub} />
      <div className="mt-[22px] grid grid-cols-2 gap-3">
        {BUDGETS.map((value) => (
          <OptionCard
            key={value}
            selected={prefs.budget === value}
            onClick={() => setPrefs({ budget: value })}
            className="px-4 py-5 text-center text-[15px] font-extrabold"
          >
            {t.options[value]}
          </OptionCard>
        ))}
      </div>
      <div className="mt-5 border border-card px-4 py-[18px]">
        <label htmlFor="custom-budget" className="block text-[13px] font-bold">
          {t.custom}
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
          {t.max} <span className="font-extrabold text-brand">{baht(effectiveBudget(prefs))}</span>
        </p>
      </div>
    </>
  );
}
