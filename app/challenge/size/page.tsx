"use client";

import { useState } from "react";
import { StepHeading } from "@/components/challenge/step-heading";
import { OptionCard } from "@/components/option-card";
import { GENDERS, SIZES } from "@/lib/data";
import { setPrefs, useAppState } from "@/lib/store";

export default function SizeStep() {
  const { prefs } = useAppState();
  const [sizeHelp, setSizeHelp] = useState(false);

  return (
    <>
      <StepHeading
        title="Find your size"
        sub="Choose your usual UNIQLO size so we only recommend available options."
      />
      <h2 className="mt-[22px] text-[14px] font-bold">Shop for</h2>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {GENDERS.map((gender) => (
          <OptionCard
            key={gender.id}
            selected={prefs.gender === gender.id}
            onClick={() => setPrefs({ gender: gender.id })}
            className="px-4 py-5 text-center text-[15px] font-extrabold"
          >
            {gender.label}
          </OptionCard>
        ))}
      </div>
      <h2 className="mt-[26px] text-[14px] font-bold">Your size</h2>
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
        <p className="text-[13px] text-muted">Not sure about your size?</p>
        <button
          type="button"
          aria-expanded={sizeHelp}
          onClick={() => setSizeHelp(!sizeHelp)}
          className="mt-2 inline-block border border-ink px-5 py-2.5 text-[12px] font-bold hover:bg-ink hover:text-white"
        >
          Help me find my size
        </button>
        {sizeHelp && (
          <p className="mt-3.5 bg-paper p-4 text-left text-[13px] leading-[1.6] text-body">
            Quick guide — height 150–160 cm: XS–S · 160–170 cm: S–M · 170–178 cm: M–L · 178 cm+: L–XXL. When in doubt
            for shirts and jackets, size up for comfort.
          </p>
        )}
      </div>
    </>
  );
}
