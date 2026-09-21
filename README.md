# OutfitIn60 — 60 Seconds to Dressed

A campaign concept website for **UNIQLO Thailand's #OutfitIn60 challenge**. You pick an occasion, a budget, your size and a style, and a 60-second countdown builds a complete outfit from real product photos. The outfit always fits your budget.

> Student prototype, not an official UNIQLO site. The cart, the TikTok/Instagram sharing and stock status are simulated.

## Features

- **4-step challenge**: occasion → budget → Men/Women + size → style and colours
- **Live 60-second countdown**, with checklist steps ticking off as it runs
- **Outfit builder**: scores 152 UNIQLO products on occasion, style and colour, keeps the total under budget, and adds a layer and accessories when there's room
- **Result page**: the look laid out as a styling board (top and bottom stacked, layer and accessories at the side), with total vs. budget, match score, "Try another look" and a shareable challenge card
- **UT Creator Studio**: design a graphic, put it on a real UNIQLO tee, and keep the link
- **My Looks**: saved looks are kept in the browser (localStorage)
- **Community page**: example looks from other players
- **English and Thai**: switch with EN / ไทย in the nav bar. Every page has both versions, under `/en/...` and `/th/...`.
- Responsive from phone to desktop. Anuphan font with Thai support.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- React 19 + TypeScript
- Tailwind CSS v4
- pnpm

## Getting started

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>. It redirects to `/en` or `/th` based on your browser language.

| Command      | What it does                  |
| ------------ | ----------------------------- |
| `pnpm dev`   | Start the dev server          |
| `pnpm build` | Build for production          |
| `pnpm start` | Serve the production build    |
| `pnpm lint`  | Run ESLint                    |

**The countdown** runs in real seconds. A look lands in 10–15 seconds, inside the 60-second challenge clock.

## Project structure

```
app/[lang]/                Every page, once per language (/en, /th)
  layout.tsx               Root layout: <html lang>, header, footer, dictionary
  page.tsx                 Landing page
  challenge/               4-step flow (layout = back link, progress bar, next button)
    occasion/ budget/ size/ style/
  building/                60-second countdown
  result/                  The finished look
  community/               Community looks
  looks/                   Saved looks
  ut/                      UT Creator Studio
proxy.ts                   Redirects "/", "/looks", … to /en or /th
components/                UI pieces (header, language switcher, product card, …)
lib/
  i18n/en.ts, i18n/th.ts   All site text in English and Thai
  data.ts                  Occasion, style, colour and budget ids
  products.ts              Product catalogue (152 items)
  outfit.ts                Outfit-building algorithm
  ut.ts                    UT Creator Studio design generator
  store.ts                 App state (sessionStorage + localStorage)
public/
  products/                Product photos (WebP, 3:4)
  fonts/                   Anuphan web fonts
```

## UT Creator Studio

`/en/ut` and `/th/ut`. Pick one of three plain UNIQLO tees, pick a design family — shapes,
wordmark or pattern — and generate until something lands. Palette and print size are
adjustable, and the tee's real price, product code and size run are shown.

Designs are **generated from a seed, not drawn by an image model**. `lib/ut.ts` turns a seed
into a list of shapes with a small deterministic PRNG, so the same seed always produces the
same graphic. The seed and every other setting live in the query string
(`/en/ut?b=0&f=wordmark&s=zz9&p=1&z=95`), which means a design you like can be bookmarked,
shared, or screenshotted for a slide and it will still be there tomorrow. The page says this
in plain language rather than implying a model it does not use.

## Product catalogue

`lib/products.ts` holds 152 real products from the [UNIQLO Thailand store](https://www.uniqlo.com/th/th/): product code, English and Thai names, THB price, available sizes and colours. The photos in `public/products` are UNIQLO's own flat product shots, resized to 600×800 WebP.

The data was fetched once from UNIQLO's public store API and checked in, so the site needs no network at build or run time. Style and occasion tags (what suits an interview, a trip, a ฿1,000 budget) are derived from each product's name.

Product names, images and data are © UNIQLO (Fast Retailing). They are used here only for a non-commercial student campaign concept.

## Languages

All text lives in `lib/i18n/en.ts` and `lib/i18n/th.ts`. The Thai dictionary is typed against the English one, so a missing translation fails the build. To change wording, edit the matching key in both files.

Visitors to a URL without a language (`/`, `/looks`, a shared link) are sent to their last choice from the switcher (saved in the `NEXT_LOCALE` cookie). Otherwise they go to their browser's language, or English by default. Product names stay in English, as on UNIQLO's Thai store.

## Deploying on Vercel

1. Push this repository to GitHub.
2. At [vercel.com/new](https://vercel.com/new), import the repository. Vercel detects Next.js and pnpm on its own, so no settings need changing.
3. Click **Deploy**. Every later push to `main` redeploys the site.
