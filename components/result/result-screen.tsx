"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ProductCard } from "@/components/product-card";
import { baht } from "@/lib/format";
import { effectiveBudget, occShort, styleName } from "@/lib/outfit";
import { getProducts } from "@/lib/products";
import { saveCurrentLook, showToast, tryAnotherLook, useAppState, useHydrated } from "@/lib/store";

const outlineButton =
  "border-2 border-ink px-1.5 py-3 text-center text-[12px] font-extrabold hover:bg-ink hover:text-white";
const shareButton = "border border-white px-[18px] py-2.5 text-[12px] font-bold hover:bg-white hover:text-ink";

export function ResultScreen() {
  const router = useRouter();
  const hydrated = useHydrated();
  const { prefs, result } = useAppState();

  useEffect(() => {
    if (hydrated && !result) router.replace("/challenge/occasion");
  }, [hydrated, result, router]);

  if (!hydrated || !result) return <main className="flex-1" />;

  const items = getProducts(result.itemIds);
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const budget = effectiveBudget(prefs);
  const diff = budget - total;
  const size = prefs.size ?? "M";
  const occasion = occShort(prefs.occasion);
  const style = styleName(prefs.styles);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      showToast("Link copied");
    } catch {
      showToast("Couldn't copy the link");
    }
  };

  return (
    <main className="animate-fade-up">
      <div className="mx-auto w-full max-w-[640px] px-6 py-10">
        <div className="text-center">
          <h1 className="text-[34px] font-extrabold tracking-[-0.5px]">Your Look Is Ready!</h1>
          <p className="mt-1.5 text-[15px] font-bold text-brand">Completed in {result.doneSecs} seconds</p>
          <p className="mt-1.5 text-[13px] font-semibold text-muted">
            {occasion} • {style} • Size {size}
          </p>
        </div>

        <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5">
          {items.map((item) => (
            <ProductCard key={item.id} item={item} sizeLabel={`Size ${size}`} />
          ))}
        </div>

        <div className="mt-[22px] flex flex-col gap-2 border-2 border-ink p-[22px]">
          <div className="flex items-baseline justify-between">
            <span className="text-[13px] font-extrabold tracking-[2px]">TOTAL</span>
            <span className="text-[30px] font-extrabold">{baht(total)}</span>
          </div>
          <div className="flex justify-between gap-3 text-[13px] text-body">
            <span>Your Budget: {baht(budget)}</span>
            <span className="font-extrabold text-success">
              ✓ {diff >= 0 ? `${baht(diff)} under budget` : `${baht(-diff)} over budget`}
            </span>
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[13px]">
            <span className="text-body">Complete Look Score</span>
            <span className="font-extrabold text-brand">{result.score}% Match</span>
          </div>
          <div className="h-[5px] bg-track">
            <div className="h-[5px] bg-brand" style={{ width: `${result.score}%` }} />
          </div>
        </div>

        <button
          type="button"
          onClick={() => showToast(`Full look (${items.length} items) added to cart`)}
          className="mt-[18px] block w-full bg-brand p-[18px] text-center text-[17px] font-extrabold tracking-[1px] text-white hover:bg-brand-dark"
        >
          ADD FULL LOOK TO CART
        </button>
        <div className="mt-3 grid grid-cols-3 gap-2.5">
          <button type="button" onClick={tryAnotherLook} className={outlineButton}>
            TRY ANOTHER LOOK
          </button>
          <button type="button" onClick={() => router.push("/challenge/occasion")} className={outlineButton}>
            EDIT PREFERENCES
          </button>
          <button type="button" onClick={saveCurrentLook} className={outlineButton}>
            SAVE LOOK
          </button>
        </div>

        <section className="mt-11">
          <h2 className="text-center text-[24px] font-extrabold">Why this works for you</h2>
          <p className="mt-3 text-center text-[14px] leading-[1.65] text-pretty text-body">
            For your {occasion.toLowerCase()}, we selected a clean {style} combination that looks put-together while
            keeping you comfortable throughout the day. Every item matches your selected size and stays within your{" "}
            {baht(budget)} budget.
          </p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2.5">
            {[prefs.occasion === "interview" ? "Professional" : "Effortless", "Comfortable", "Within Budget"].map(
              (badge) => (
                <li key={badge} className="border border-ink px-4 py-[7px] text-[12px] font-bold tracking-[0.5px]">
                  {badge}
                </li>
              ),
            )}
          </ul>
        </section>

        <section className="mt-11 bg-ink px-6 py-[34px] text-center text-white">
          <h2 className="text-[26px] font-extrabold tracking-[-0.5px]">You did it in {result.doneSecs} seconds.</h2>
          <p className="mt-1.5 text-[13px] font-semibold text-mist">Now challenge your friends.</p>
          <div className="mx-auto mt-5 max-w-[300px] bg-brand px-[18px] py-[22px] text-left">
            <p className="text-[11px] font-extrabold tracking-[2px]">MY #OUTFITIN60</p>
            <p className="mt-2 text-[19px] font-extrabold">{occasion} Look</p>
            <div className="mt-3.5 flex justify-between gap-3 text-[13px] font-semibold">
              <span>
                Completed: <b>{result.doneSecs} sec</b>
              </span>
              <span>
                Total: <b>{baht(total)}</b>
              </span>
            </div>
            <p className="mt-3 text-[11px] font-bold">#OutfitIn60 · #ครบลุคใน60วิ</p>
          </div>
          <div className="mt-[18px] flex flex-wrap justify-center gap-2.5">
            <button type="button" onClick={() => showToast("Opening TikTok share... (prototype)")} className={shareButton}>
              Share to TikTok
            </button>
            <button
              type="button"
              onClick={() => showToast("Opening Instagram share... (prototype)")}
              className={shareButton}
            >
              Share to Instagram
            </button>
            <button type="button" onClick={copyLink} className={shareButton}>
              Copy Link
            </button>
          </div>
          <p className="mt-4 text-[13px] font-semibold text-mist">Can your friends beat your time?</p>
        </section>
      </div>
    </main>
  );
}
