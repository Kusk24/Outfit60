"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { StickerArt } from "@/components/ut/sticker-art";
import { TeeCanvas } from "@/components/ut/tee-canvas";
import type { Size } from "@/lib/data";
import { baht } from "@/lib/format";
import { fill } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/provider";
import { showToast } from "@/lib/store";
import { INKS, STICKERS } from "@/lib/stickers";
import { UT_BLANK } from "@/lib/ut-blank";
import { UT_SERIES } from "@/lib/ut-series";
import {
  colorOf,
  designQuery,
  MAX_SIZE,
  MAX_STICKERS,
  MIN_SIZE,
  readDesign,
  type Placed,
  type Side,
  type UtDesign,
} from "@/lib/ut";

const outlineButton =
  "border-2 border-ink px-1.5 py-3 text-center text-[12px] font-extrabold hover:bg-ink hover:text-white";

export function UtStudio() {
  const { dict, lang } = useI18n();
  const t = dict.ut;
  const params = useSearchParams();

  // The link is the source of truth on arrival, so a shared design opens exactly as it was saved.
  const [design, setDesign] = useState<UtDesign>(() => readDesign(new URLSearchParams(params.toString())));
  const [mode, setMode] = useState<"design" | "series">("design");
  const [seriesIndex, setSeriesIndex] = useState(0);
  const [designIndex, setDesignIndex] = useState(0);
  const [side, setSide] = useState<Side>("front");
  const [selected, setSelected] = useState<number | null>(design.front.length ? 0 : null);
  const [size, setSize] = useState<Size | null>(null);

  const color = colorOf(design);
  const series = UT_SERIES[seriesIndex];
  const item = series.designs[Math.min(designIndex, series.designs.length - 1)];
  const designing = mode === "design";
  const sizes: readonly Size[] = designing ? UT_BLANK.sizes : item.sizes;
  const chosenSize = size && sizes.includes(size) ? size : sizes[Math.floor(sizes.length / 2)];
  const placed = design[side];
  const current = selected !== null ? placed[selected] : undefined;
  const full = placed.length >= MAX_STICKERS;

  // Keep the address bar in step without a navigation, so the design is always
  // copyable. Debounced because a drag changes the design on every pointer move,
  // and Safari throttles history writes to 100 per 30 seconds.
  const query = designQuery(design);
  useEffect(() => {
    const id = setTimeout(() => {
      window.history.replaceState(null, "", `${window.location.pathname}?${query}`);
    }, 250);
    return () => clearTimeout(id);
  }, [query]);

  const patch = (index: number, change: Partial<Placed>) =>
    setDesign((d) => ({ ...d, [side]: d[side].map((p, i) => (i === index ? { ...p, ...change } : p)) }));

  const addSticker = (sticker: string) => {
    if (full) return;
    setSelected(placed.length);
    setDesign((d) => ({
      ...d,
      // Black and navy tees get a light ink by default, so a new sticker always shows.
      [side]: [...d[side], { sticker, x: 50, y: 50, size: 42, rotation: 0, ink: d.color === 1 || d.color === 3 ? 2 : 0 }],
    }));
  };

  const removeSelected = () => {
    if (selected === null) return;
    setDesign((d) => ({ ...d, [side]: d[side].filter((_, i) => i !== selected) }));
    setSelected(null);
  };

  const clearSide = () => {
    setDesign((d) => ({ ...d, [side]: [] }));
    setSelected(null);
  };

  const switchSide = (next: Side) => {
    setSide(next);
    setSelected(design[next].length ? 0 : null);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast(dict.toasts.linkCopied);
    } catch {
      showToast(dict.toasts.copyFailed);
    }
  };

  return (
    <div className="mt-6 grid gap-8 md:grid-cols-[minmax(0,1fr)_320px] md:items-start">
      <div>
        {designing ? (
        <TeeCanvas
          image={color.image}
          alt={lang === "th" ? UT_BLANK.nameTh : UT_BLANK.name}
          side={side}
          placed={placed}
          selected={selected}
          onSelect={setSelected}
          onMove={(index, x, y) => patch(index, { x, y })}
        />
        ) : (
          <>
            <div className="relative mx-auto w-full max-w-[420px] bg-look" style={{ aspectRatio: item.ratio }}>
              <Image src={item.image} alt={lang === "th" ? item.nameTh : item.name} fill loading="eager" sizes="(max-width: 768px) 92vw, 420px" className="object-contain" />
            </div>
            <div className="mx-auto mt-3 w-full max-w-[420px]">
              <p className="mb-1.5 text-[11px] font-extrabold tracking-[1.5px] text-muted uppercase">{t.print}</p>
              <div className="relative aspect-[3/2] w-full bg-look">
                <Image src={item.art} alt={t.print} fill loading="eager" sizes="(max-width: 768px) 92vw, 420px" className="object-cover" />
              </div>
            </div>
          </>
        )}
        <p className="mt-3 text-center text-[12px] leading-[1.6] text-muted">
          {designing ? (placed.length ? t.dragHint : t.emptyHint) : t.seriesNote}
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div role="tablist" className="grid grid-cols-2 border-2 border-brand">
          {(["design", "series"] as const).map((value) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={mode === value}
              onClick={() => setMode(value)}
              className={`px-2 py-2.5 text-[12px] font-extrabold ${
                mode === value ? "bg-brand text-white" : "hover:bg-brand-tint"
              }`}
            >
              {value === "design" ? t.modeDesign : t.modeSeries}
            </button>
          ))}
        </div>

        {designing ? (
        <>
        <div role="tablist" className="grid grid-cols-2 border-2 border-ink">
          {(["front", "back"] as const).map((value) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={side === value}
              onClick={() => switchSide(value)}
              className={`px-2 py-2.5 text-[12px] font-extrabold ${
                side === value ? "bg-ink text-white" : "hover:bg-paper"
              }`}
            >
              {value === "front" ? t.front : t.back}
              {design[value].length ? ` (${design[value].length})` : ""}
            </button>
          ))}
        </div>

        <Field label={t.colour}>
          <div className="flex flex-wrap gap-2">
            {UT_BLANK.colors.map((option, i) => (
              <button
                key={option.code}
                type="button"
                aria-pressed={design.color === i}
                aria-label={option.name}
                title={option.name}
                onClick={() => setDesign((d) => ({ ...d, color: i }))}
                className={`size-9 border-2 p-0.5 ${design.color === i ? "border-brand" : "border-option"}`}
              >
                <span className="block size-full border border-line" style={{ backgroundColor: option.hex }} />
              </button>
            ))}
          </div>
        </Field>

        <div>
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <p className="text-[12px] font-extrabold tracking-[1.5px] uppercase">
              {full ? fill(t.stickersFull, { n: MAX_STICKERS }) : t.stickers}
            </p>
            {placed.length > 0 && (
              <button type="button" onClick={clearSide} className="text-[12px] font-bold text-brand hover:underline">
                {t.clearAll}
              </button>
            )}
          </div>
          <div className="grid grid-cols-6 gap-1.5">
            {STICKERS.map((sticker) => (
              <button
                key={sticker.id}
                type="button"
                disabled={full}
                aria-label={t.stickerNames[sticker.id as keyof typeof t.stickerNames]}
                title={t.stickerNames[sticker.id as keyof typeof t.stickerNames]}
                onClick={() => addSticker(sticker.id)}
                className="border-2 border-option p-1.5 hover:border-ink disabled:opacity-35 disabled:hover:border-option"
              >
                <StickerArt sticker={sticker.id} ink={1} className="w-full" />
              </button>
            ))}
          </div>
        </div>

        {current && selected !== null ? (
          <div className="flex flex-col gap-4 border-2 border-ink p-[18px]">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[12px] font-extrabold tracking-[1.5px] uppercase">
                {t.stickerNames[current.sticker as keyof typeof t.stickerNames]}
              </span>
              <button
                type="button"
                onClick={removeSelected}
                className="text-[12px] font-bold text-brand hover:underline"
              >
                {t.remove}
              </button>
            </div>

            <label className="block">
              <span className="text-[12px] font-bold">{t.scale}</span>
              <input
                type="range"
                min={MIN_SIZE}
                max={MAX_SIZE}
                step={2}
                value={current.size}
                onChange={(event) => patch(selected, { size: Number(event.target.value) })}
                className="m-0.5 mt-1.5 w-full"
              />
            </label>

            <label className="block">
              <span className="text-[12px] font-bold">{t.rotation}</span>
              <input
                type="range"
                min={-180}
                max={180}
                step={5}
                value={current.rotation}
                onChange={(event) => patch(selected, { rotation: Number(event.target.value) })}
                className="m-0.5 mt-1.5 w-full"
              />
            </label>

            <div>
              <span className="text-[12px] font-bold">{t.ink}</span>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {INKS.map((hex, i) => (
                  <button
                    key={hex}
                    type="button"
                    aria-pressed={current.ink === i}
                    aria-label={t.inkNames[i]}
                    title={t.inkNames[i]}
                    onClick={() => patch(selected, { ink: i })}
                    className={`size-7 border-2 p-0.5 ${current.ink === i ? "border-brand" : "border-option"}`}
                  >
                    <span className="block size-full border border-line" style={{ backgroundColor: hex }} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="border-2 border-dashed border-option p-[18px] text-[13px] leading-[1.6] text-muted">
            {t.selectHint}
          </p>
        )}
        </>
        ) : (
          <>
            <Field label={t.series}>
              <div className="grid grid-cols-3 gap-2">
                {UT_SERIES.map((option, i) => (
                  <button
                    key={option.slug}
                    type="button"
                    aria-pressed={seriesIndex === i}
                    onClick={() => {
                      setSeriesIndex(i);
                      setDesignIndex(0);
                    }}
                    className={`border-2 px-1.5 py-2 text-[11px] leading-tight font-bold text-pretty ${
                      seriesIndex === i ? "border-brand bg-brand-tint" : "border-option hover:border-ink"
                    }`}
                  >
                    {lang === "th" ? option.nameTh : option.name}
                  </button>
                ))}
              </div>
            </Field>

            <Field label={t.designs}>
              <div className="grid grid-cols-3 gap-2">
                {series.designs.map((option, i) => (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={designIndex === i}
                    onClick={() => setDesignIndex(i)}
                    className={`flex flex-col items-center gap-1 border-2 p-1.5 ${
                      designIndex === i ? "border-brand bg-brand-tint" : "border-option hover:border-ink"
                    }`}
                  >
                    <span className="relative block h-[58px] w-full overflow-hidden">
                      <Image src={option.art} alt="" fill loading="eager" sizes="90px" className="object-cover" />
                    </span>
                    <span lang="en" className="text-[10px] font-bold">
                      #{option.label}
                    </span>
                  </button>
                ))}
              </div>
            </Field>
          </>
        )}

        <div className="border-2 border-ink p-[18px]">
          <p className="text-[14px] font-extrabold text-pretty">
            {designing ? (lang === "th" ? UT_BLANK.nameTh : UT_BLANK.name) : lang === "th" ? item.nameTh : item.name}
          </p>
          <p lang="en" className="mt-0.5 text-[12px] text-muted">
            {designing ? `${UT_BLANK.productId} · ${color.name}` : item.productId}
          </p>

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

          <div className="mt-4 flex items-baseline justify-between border-t border-line pt-3">
            <span className="text-[12px] font-extrabold tracking-[2px]">{t.total}</span>
            <span className="text-[24px] font-extrabold">{baht(designing ? UT_BLANK.price : item.price)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => showToast(fill(dict.toasts.utAdded, { size: chosenSize }))}
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
