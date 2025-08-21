# StoryHub — Next.js + Tailwind + Framer Motion (Fixed)

**Important fixes included:**
- `app/layout.js` now imports `./globals.css` (Tailwind loads correctly)
- Tailwind plugins: `@tailwindcss/line-clamp` and `@tailwindcss/typography`
- Global utility `.no-scrollbar` provided
- Uses Next.js `app/` router (14.x)

## Run locally
```bash
npm install
npm run dev
```

## Deploy to Vercel
- Push this folder to a GitHub repo.
- Import the repo in Vercel (Framework preset: **Next.js**).
- Build & deploy with defaults.
```
Build Command: next build
Output Directory: .next
```
