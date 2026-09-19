"use client";

import { StepHeading } from "@/components/challenge/step-heading";
import { OptionCard } from "@/components/option-card";
import { cn } from "@/lib/cn";
import { COLORS, STYLES } from "@/lib/data";
import { useI18n } from "@/lib/i18n/provider";
import { setPrefs, useAppState } from "@/lib/store";

const toggle = <T,>(list: T[], value: T) =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

export default function StyleStep() {
  const { prefs } = useAppState();
  const { dict } = useI18n();

  return (
    <>
      <StepHeading title={dict.styleStep.title} sub={dict.styleStep.sub} />
      <div className="mt-[22px] grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3">
        {STYLES.map((style) => (
          <OptionCard
            key={style}
            selected={prefs.styles.includes(style)}
            onClick={() => setPrefs({ styles: toggle(prefs.styles, style) })}
            className="px-3.5 py-4 text-left"
          >
            <span className="block text-[15px] font-extrabold">{dict.styles[style].title}</span>
            <span className="mt-[3px] block text-[12px] text-muted">{dict.styles[style].sub}</span>
          </OptionCard>
        ))}
      </div>
      <h2 className="mt-[26px] text-[14px] font-bold">{dict.styleStep.colours}</h2>
      <div className="mt-3 flex flex-wrap gap-3.5">
        {COLORS.map((color) => {
          const selected = prefs.colors.includes(color.label);
          return (
            <button
              key={color.label}
              type="button"
              aria-pressed={selected}
              onClick={() => setPrefs({ colors: toggle(prefs.colors, color.label) })}
              className="flex flex-col items-center gap-1.5"
            >
              <span
                className={cn(
                  "block size-[38px] rounded-full border-[3px]",
                  selected ? "border-brand" : color.label === "White" ? "border-dot" : "border-transparent",
                )}
                style={{ background: color.hex }}
              />
              <span className="text-[11px] font-semibold text-body">{dict.colors[color.label]}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
