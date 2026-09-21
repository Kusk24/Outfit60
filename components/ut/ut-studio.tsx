"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { OptionCard } from "@/components/option-card";
import { UtGraphic } from "@/components/ut/ut-graphic";
import type { Size } from "@/lib/data";
import { baht } from "@/lib/format";
import { fill } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/provider";
import { showToast } from "@/lib/store";
import { designQuery, FAMILIES, PALETTES, randomSeed, readDesign, UT_BLANKS, type UtDesign } from "@/lib/ut";

const outlineButton =
  "border-2 border-ink px-1.5 py-3 text-center text-[12px] font-extrabold hover:bg-ink hover:text-white";

export function UtStudio() {
  const { dict, lang } = useI18n();
  const t = dict.ut;
  const params = useSearchParams();

  // The link is the source of truth on arrival, so a shared design opens exactly as it was saved.
  const initial = readDesign(new URLSearchParams(params.toString()));
  const [design, setDesign] = useState<UtDesign>(initial.design);
  const [blankIndex, setBlankIndex] = useState(initial.blank);
  const [size, setSize] = useState<Size | null>(null);

  // An empty word falls back to the campaign line in the reader's own language.
  // The fallback is written into the link too, so a shared design never changes.
  const effective: UtDesign =
    design.family === "wordmark" && !design.word.trim() ? { ...design, word: t.wordPlaceholder } : design;

  const blank = UT_BLANKS[blankIndex];
  const sizes = blank.product.sizes ?? [];
  // Blanks carry different size runs, so a size picked on one may not exist on the next.
  const chosenSize = size && sizes.includes(size) ? size : (sizes[Math.floor(sizes.length / 2)] ?? null);

  // Keep the address bar in step without a navigation, so the current design is always copyable.
  const query = designQuery(effective, blankIndex);
  useEffect(() => {
    window.history.replaceState(null, "", `${window.location.pathname}?${query}`);
  }, [query]);

  const update = (patch: Partial<UtDesign>) => setDesign((current) => ({ ...current, ...patch }));

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast(dict.toasts.linkCopied);
    } catch {
      showToast(dict.toasts.copyFailed);
    }
  };

  return (
    <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1fr)_320px] md:items-start">
      <div className="md:sticky md:top-24">
        <div
          className="relative mx-auto w-full max-w-[420px] bg-look"
          style={{ aspectRatio: blank.ratio }}
        >
          <Image
            src={blank.product.image}
            alt={lang === "th" ? blank.product.nameTh : blank.product.name}
            fill
            loading="eager"
            sizes="(max-width: 768px) 92vw, 420px"
            className="object-contain"
          />
          <div
            className="absolute"
            style={{
              left: `${blank.print.x}%`,
              top: `${blank.print.y}%`,
              width: `${(blank.print.w * effective.scale) / 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <UtGraphic design={effective} className="w-full" />
          </div>
        </div>
        <p className="mt-3 text-center text-[12px] leading-[1.6] text-muted">{t.howMade}</p>
      </div>

      <div className="flex flex-col gap-6">
        <Field label={t.blank}>
          <div className="grid grid-cols-3 gap-2">
            {UT_BLANKS.map((option, i) => (
              <OptionCard
                key={option.id}
                selected={i === blankIndex}
                onClick={() => setBlankIndex(i)}
                className="items-center gap-1 p-2"
              >
                <span className="relative block h-[54px] w-full">
                  <Image
                    src={option.product.image}
                    alt=""
                    fill
                    loading="eager"
                    sizes="90px"
                    className="object-contain"
                  />
                </span>
                <span className="text-[11px] font-bold">{baht(option.product.price)}</span>
              </OptionCard>
            ))}
          </div>
        </Field>

        <Field label={t.design}>
          <div className="grid grid-cols-3 gap-2">
            {FAMILIES.map((family) => (
              <OptionCard
                key={family}
                selected={design.family === family}
                onClick={() => update({ family })}
                className="px-2 py-3 text-center text-[12px] font-extrabold"
              >
                {t.families[family]}
              </OptionCard>
            ))}
          </div>
        </Field>

        {design.family === "wordmark" && (
          <Field label={t.word}>
            <input
              type="text"
              value={design.word}
              maxLength={28}
              placeholder={t.wordPlaceholder}
              onChange={(event) => update({ word: event.target.value })}
              className="w-full border-2 border-option px-3 py-2.5 text-[14px] font-bold focus:border-ink focus:outline-none"
            />
          </Field>
        )}

        <Field label={t.palette}>
          <div className="flex flex-wrap gap-2">
            {PALETTES.map((palette, i) => (
              <button
                key={palette.id}
                type="button"
                aria-pressed={design.palette === i}
                aria-label={t.palettes[palette.id]}
                title={t.palettes[palette.id]}
                onClick={() => update({ palette: i })}
                className={`flex border-2 p-1 ${design.palette === i ? "border-brand" : "border-option"}`}
              >
                {palette.colors.map((color) => (
                  <span key={color} className="size-5 border border-line" style={{ backgroundColor: color }} />
                ))}
              </button>
            ))}
          </div>
        </Field>

        <Field label={t.scale}>
          <input
            id="ut-scale"
            type="range"
            min={55}
            max={115}
            step={5}
            value={design.scale}
            onChange={(event) => update({ scale: Number(event.target.value) })}
            className="m-0.5 w-full"
          />
        </Field>

        <button
          type="button"
          onClick={() => update({ seed: randomSeed() })}
          className="w-full bg-brand p-[18px] text-[15px] font-extrabold tracking-[1px] text-white hover:bg-brand-dark"
        >
          {t.generate}
        </button>

        <div className="border-2 border-ink p-[18px]">
          <p className="text-[14px] font-extrabold">{lang === "th" ? blank.product.nameTh : blank.product.name}</p>
          <p lang="en" className="mt-0.5 text-[12px] text-muted">
            {blank.product.productId}
          </p>

          {sizes.length > 0 && (
            <div className="mt-3.5">
              <span className="text-[12px] font-bold">{t.size}</span>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {sizes.map((option) => (
                  <button
                    key={option}
                    type="button"
                    lang="en"
                    aria-pressed={chosenSize === option}
                    onClick={() => setSize(option)}
                    className={`min-w-[38px] border-2 px-2 py-1.5 text-[12px] font-extrabold ${
                      chosenSize === option ? "border-brand bg-brand-tint" : "border-option"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 flex items-baseline justify-between border-t border-line pt-3">
            <span className="text-[12px] font-extrabold tracking-[2px]">{t.total}</span>
            <span className="text-[24px] font-extrabold">{baht(blank.product.price)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => showToast(fill(dict.toasts.utAdded, { size: chosenSize ?? "" }))}
            className={outlineButton}
          >
            {t.addToCart}
          </button>
          <button type="button" onClick={copyLink} className={outlineButton}>
            {t.copyLink}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-[12px] font-extrabold tracking-[1.5px] uppercase">{label}</p>
      {children}
    </div>
  );
}
