"use client";

import { useState } from "react";
import { StepHeading } from "@/components/challenge/step-heading";
import { OptionCard } from "@/components/option-card";
import { GENDERS, SIZES } from "@/lib/data";
import { useI18n } from "@/lib/i18n/provider";
import { setPrefs, useAppState } from "@/lib/store";

export default function SizeStep() {
  const { prefs } = useAppState();
  const [sizeHelp, setSizeHelp] = useState(false);
  const { dict } = useI18n();
  const t = dict.sizeStep;

  return (
    <>
      <StepHeading title={t.title} sub={t.sub} />
      <h2 className="mt-[22px] text-[14px] font-bold">{t.shopFor}</h2>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {GENDERS.map((gender) => (
          <OptionCard
            key={gender}
            selected={prefs.gender === gender}
            onClick={() => setPrefs({ gender })}
            className="px-4 py-5 text-center text-[15px] font-extrabold"
          >
            {dict.genders[gender]}
          </OptionCard>
        ))}
      </div>
      <h2 className="mt-[26px] text-[14px] font-bold">{t.yourSize}</h2>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {SIZES.map((size) => (
          <OptionCard
            key={size}
            selected={prefs.size === size}
            onClick={() => setPrefs({ size })}
            className="py-[22px] text-center text-[18px] font-extrabold"
          >
            {size}
          </OptionCard>
        ))}
      </div>
      <div className="mt-[22px] text-center">
        <p className="text-[13px] text-muted">{t.notSure}</p>
        <button
          type="button"
          aria-expanded={sizeHelp}
          onClick={() => setSizeHelp(!sizeHelp)}
          className="mt-2 inline-block border border-ink px-5 py-2.5 text-[12px] font-bold hover:bg-ink hover:text-white"
        >
          {t.help}
        </button>
        {sizeHelp && (
          <p className="mt-3.5 bg-paper p-4 text-left text-[13px] leading-[1.6] text-body">{t.guide}</p>
        )}
      </div>
    </>
  );
}
