# Client Product Website

A static-data product catalogue built with Next.js (App Router) + TypeScript + Tailwind CSS.
No database, backend, authentication, or checkout — visitors browse and read only.

## Stack

- Next.js 14 (App Router), TypeScript, Tailwind CSS
- Product data lives in `data/products/*.json`, split by category
- Images served from an external CDN (Cloudinary, Unsplash, etc.) via `next/image`

## Running locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Adding products

Open the relevant file in `data/products/` (e.g. `fish.json`) and append a new object
with a unique `id` and `slug`. No rebuild step beyond a normal deploy is needed.

To add a brand-new category:
1. Create `data/products/<category>.json` with an array of products.
2. Add an entry to `data/categories.json` pointing at that file.
3. Register the import in `lib/products.ts` (`productsByCategory`).

## Deployment

Push to GitHub and import the repo on Vercel. No environment variables or
database connection are required — `.env.local` is a placeholder only.
