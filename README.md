# Shubham Singh — Portfolio

Neural Blueprint v3.0 · Built with **Next.js 14**, **Three.js**, **TypeScript**

## Quick Start

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Deploy to Vercel (1 command)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (auto-detects Next.js)
vercel
```

Or push to GitHub → connect repo on vercel.com → auto-deploys on every push.

## Project Structure

```
app/
  layout.tsx          # Root layout + SEO metadata
  page.tsx            # Main page (SSG pre-rendered)
  globals.css         # Design system (CSS variables)
  data/
    portfolio.ts      # ← Edit all your content HERE
  components/
    Navbar.tsx/css     # Fixed nav with scroll-aware highlight
    Hero.tsx/css       # Typing animation, parallax name, counters
    NodeBackground.tsx # Three.js node graph (lazy, client-only)
    Cursor.tsx/css     # Custom animated cursor
    Sections.tsx/css   # About, Skills, Experience, Projects, Education, Contact
    useReveal.ts       # Scroll reveal hook
```

## Update Content

All content lives in **`app/data/portfolio.ts`** — edit name, projects, experience, stats etc. there. No need to touch any component files.

## Performance

- **SSG**: All HTML pre-rendered at build time → instant first paint
- **Three.js**: Lazy-loaded client-side only via `dynamic(() => import(...), { ssr: false })`
- **CSS Modules**: Zero runtime CSS-in-JS overhead
- **Font preconnect**: Google Fonts loaded with `preconnect`
- **Code splitting**: Next.js automatically splits each component
