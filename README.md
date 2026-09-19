# OutfitIn60 — 60 Seconds to Dressed

A campaign concept website for **UNIQLO Thailand's #OutfitIn60 challenge**. You pick an occasion, a budget, your size and a style, and a 60-second countdown builds a complete outfit from real product photos. The outfit always fits your budget.

> Student prototype, not an official UNIQLO site. The cart, the TikTok/Instagram sharing and stock status are simulated.

## Features

- **4-step challenge**: occasion → budget → Men/Women + size → style and colours
- **Live 60-second countdown**, with checklist steps ticking off as it runs
- **Outfit builder**: scores 100 products on occasion, style and colour, keeps the total under budget, and adds an outer layer or bag when there's room
- **Result page**: product cards, total vs. budget, match score, "Try another look", and a shareable challenge card
- **My Looks**: saved looks are kept in the browser (localStorage)
- **Community page**: example looks from other players
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

Open <http://localhost:3000>.

| Command      | What it does                  |
| ------------ | ----------------------------- |
| `pnpm dev`   | Start the dev server          |
| `pnpm build` | Build for production          |
| `pnpm start` | Serve the production build    |
| `pnpm lint`  | Run ESLint                    |

**Quick demo:** the countdown runs in real seconds (34–54 s). To run it faster, add `?speed=fast` to the building page URL (`/building?speed=fast`).

## Project structure

```
app/
  page.tsx                 Landing page
  challenge/               4-step flow (layout = back link, progress bar, next button)
    occasion/ budget/ size/ style/
  building/                60-second countdown
  result/                  The finished look
  community/               Community looks
  looks/                   Saved looks
components/                UI pieces (header, product card, option card, …)
lib/
  data.ts                  Occasions, styles, colours, budgets, copy
  products.ts              Product catalogue (100 items)
  outfit.ts                Outfit-building algorithm
  store.ts                 App state (sessionStorage + localStorage)
public/
  products/                Product photos (WebP, 3:4)
  fonts/                   Anuphan web fonts
```

## Product catalogue

The photos in `public/products` are web-optimised versions of the original shots, which sit in the `Men/` and `Girl/` folders (those originals are not committed). Every item's name, price, sizes, style and occasion tags, and colours are in `lib/products.ts`. Prices are indicative THB prices for the prototype.

## Deploying on Vercel

1. Push this repository to GitHub.
2. At [vercel.com/new](https://vercel.com/new), import the repository. Vercel detects Next.js and pnpm on its own, so no settings need changing.
3. Click **Deploy**. Every later push to `main` redeploys the site.
