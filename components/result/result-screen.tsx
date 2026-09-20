"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LookBoard } from "@/components/look-board";
import { LookItems } from "@/components/look-items";
import { baht } from "@/lib/format";
import { fill } from "@/lib/i18n/config";
import { occShort, styleName } from "@/lib/i18n/labels";
import { useI18n } from "@/lib/i18n/provider";
import { effectiveBudget } from "@/lib/outfit";
import { getProducts } from "@/lib/products";
import { saveCurrentLook, showToast, tryAnotherLook, useAppState, useHydrated } from "@/lib/store";

const outlineButton =
  "border-2 border-ink px-1.5 py-3 text-center text-[12px] font-extrabold hover:bg-ink hover:text-white";
const shareButton = "border border-white px-[18px] py-2.5 text-[12px] font-bold hover:bg-white hover:text-ink";

export function ResultScreen() {
  const router = useRouter();
  const hydrated = useHydrated();
  const { prefs, result } = useAppState();
  const { dict, href, lang } = useI18n();
  const t = dict.result;
  const startPath = href("/challenge/occasion");

  useEffect(() => {
    if (hydrated && !result) router.replace(startPath);
  }, [hydrated, result, router, startPath]);

  if (!hydrated || !result) return <main className="flex-1" />;

  const items = getProducts(result.itemIds);
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const budget = effectiveBudget(prefs);
  const diff = budget - total;
  const size = prefs.size ?? "M";
  const occasion = occShort(dict, prefs.occasion);
  const style = styleName(dict, prefs.styles[0]);

  const tryAnother = () => {
    tryAnotherLook();
    showToast(dict.toasts.newLook);
  };

  const save = () => {
    const outcome = saveCurrentLook();
    if (outcome) showToast(outcome === "saved" ? dict.toasts.saved : dict.toasts.duplicate);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin + href("/"));
      showToast(dict.toasts.linkCopied);
    } catch {
      showToast(dict.toasts.copyFailed);
    }
  };

  return (
    <main className="animate-fade-up">
      <div className="mx-auto w-full max-w-[640px] px-6 py-10">
        <div className="text-center">
          <h1 className="text-[34px] font-extrabold tracking-[-0.5px]">{t.title}</h1>
          <p className="mt-1.5 text-[15px] font-bold text-brand">{fill(t.completed, { secs: result.doneSecs })}</p>
          <p className="mt-1.5 text-[13px] font-semibold text-muted">{fill(t.meta, { occ: occasion, style, size })}</p>
        </div>

        <LookBoard items={items} className="mt-7 h-[460px] sm:h-[560px]" />
        <LookItems items={items} size={size} dict={dict} lang={lang} />

        <div className="mt-[22px] flex flex-col gap-2 border-2 border-ink p-[22px]">
          <div className="flex items-baseline justify-between">
            <span className="text-[13px] font-extrabold tracking-[2px]">{t.total}</span>
            <span className="text-[30px] font-extrabold">{baht(total)}</span>
          </div>
          <div className="flex justify-between gap-3 text-[13px] text-body">
            <span>{fill(t.budget, { budget: baht(budget) })}</span>
            <span className="font-extrabold text-success">
              {fill(diff >= 0 ? t.under : t.over, { amount: baht(Math.abs(diff)) })}
            </span>
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[13px]">
            <span className="text-body">{t.score}</span>
            <span className="font-extrabold text-brand">{fill(t.match, { score: result.score })}</span>
          </div>
          <div className="h-[5px] bg-track">
            <div className="h-[5px] bg-brand" style={{ width: `${result.score}%` }} />
          </div>
        </div>

        <button
          type="button"
          onClick={() => showToast(fill(dict.toasts.addedToCart, { n: items.length }))}
          className="mt-[18px] block w-full bg-brand p-[18px] text-center text-[17px] font-extrabold tracking-[1px] text-white hover:bg-brand-dark"
        >
          {t.addToCart}
        </button>
        <div className="mt-3 grid grid-cols-3 gap-2.5">
          <button type="button" onClick={tryAnother} className={outlineButton}>
            {t.tryAnother}
          </button>
          <button type="button" onClick={() => router.push(startPath)} className={outlineButton}>
            {t.edit}
          </button>
          <button type="button" onClick={save} className={outlineButton}>
            {t.save}
          </button>
        </div>

        <section className="mt-11">
          <h2 className="text-center text-[24px] font-extrabold">{t.whyTitle}</h2>
          <p className="mt-3 text-center text-[14px] leading-[1.65] text-pretty text-body">
            {fill(t.why, { occ: occasion, occLower: occasion.toLowerCase(), style, budget: baht(budget) })}
          </p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2.5">
            {[
              prefs.occasion === "interview" ? t.badges.professional : t.badges.effortless,
              t.badges.comfortable,
              t.badges.withinBudget,
            ].map((badge) => (
              <li key={badge} className="border border-ink px-4 py-[7px] text-[12px] font-bold tracking-[0.5px]">
                {badge}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-11 bg-ink px-6 py-[34px] text-center text-white">
          <h2 className="text-[26px] font-extrabold tracking-[-0.5px]">{fill(t.shareTitle, { secs: result.doneSecs })}</h2>
          <p className="mt-1.5 text-[13px] font-semibold text-mist">{t.shareSub}</p>
          <div className="mx-auto mt-5 max-w-[300px] bg-brand px-[18px] py-[22px] text-left">
            <p lang="en" className="text-[11px] font-extrabold tracking-[2px]">
              MY #OUTFITIN60
            </p>
            <p className="mt-2 text-[19px] font-extrabold">{fill(t.lookTitle, { occ: occasion })}</p>
            <div className="mt-3.5 flex justify-between gap-3 text-[13px] font-semibold">
              <span>
                {t.shareCompleted} <b>{fill(t.shareSecs, { secs: result.doneSecs })}</b>
              </span>
              <span>
                {t.shareTotal} <b>{baht(total)}</b>
              </span>
            </div>
            <p className="mt-3 text-[11px] font-bold">#OutfitIn60 · #ครบลุคใน60วิ</p>
          </div>
          <div className="mt-[18px] flex flex-wrap justify-center gap-2.5">
            <button type="button" onClick={() => showToast(dict.toasts.tiktok)} className={shareButton}>
              {t.shareTikTok}
            </button>
            <button type="button" onClick={() => showToast(dict.toasts.instagram)} className={shareButton}>
              {t.shareInstagram}
            </button>
            <button type="button" onClick={copyLink} className={shareButton}>
              {t.copyLink}
            </button>
          </div>
          <p className="mt-4 text-[13px] font-semibold text-mist">{t.beatTime}</p>
        </section>
      </div>
    </main>
  );
}
