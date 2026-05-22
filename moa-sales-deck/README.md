# Mall of America — Interactive Sales Deck

A cinematic, browser-based sales experience for Mall of America, built as an interview assignment. Designed to replace fragmented pitch materials (PDFs, spreadsheets, YouTube videos) with a single immersive, self-contained deck that can be screen-shared on a live call or sent as a standalone URL.

---

## Live Demo

> Deploy to Vercel and paste the URL here.

---

## What It Does

This is a **Digideck-style interactive deck** targeting three prospect types: retail tenants, event partners, and sponsorship buyers. The experience is non-linear — viewers can scroll through the story or jump to any section or deep-dive module instantly.

**8 story beats:**

| # | Section | What it covers |
|---|---|---|
| 1 | **Hero** | Full-bleed autoplay video, page-load animation sequence |
| 2 | **Why MOA** | Animated stat counters, visitor origin bars, access facts |
| 3 | **Retail** | Horizontal pinned scroll, brand logo wall, $1B+ framing |
| 4 | **Luxury** | Magazine editorial grid (Gucci, Coach, Burberry, CHANEL) |
| 5 | **Dining & Lifestyle** | Hero banner, 4-stat bar, mosaic image grid, restaurant list |
| 6 | **Attractions** | MOA interior hero, bento grid (Nickelodeon Universe, SEA LIFE, LEGO, FlyOver) |
| 7 | **Events & Platform** | Animated counter, Super Bowl callout, 4 platform CTAs |
| 8 | **Connect** | Contact channel cards, inquiry form, thank-you state |

**4 deep-dive modules** (lazy-loaded overlays, no page navigation):

| Module | Audience | Entry |
|---|---|---|
| Events & Activation | Event partners | Events section CTA |
| Sponsorship | Brand marketers | Events section CTA |
| Leasing Paths | Retail tenants | Retail section CTA |
| Venue Spaces | Corporate event planners | Events section CTA |

---

## Tech Stack

| Layer | Choice | Version |
|---|---|---|
| Framework | React + Vite | React 19, Vite 8 |
| Language | TypeScript | 6.x |
| Styling | Tailwind CSS v4 + inline CSS custom properties | 4.x |
| Animation | GSAP (ScrollTrigger, Flip, SplitText) | 3.15 |
| Smooth scroll | Lenis | 1.3 |
| State | Zustand | 5.x |
| Routing | React Router | v7 (library mode) |
| Deployment | Vercel | — |

**Why these tools:**

- **React + Vite over Next.js** — No SEO requirement (closed B2B tool). Vite starts in ~300ms, produces smaller bundles, and avoids SSR overhead that adds nothing here.
- **GSAP over Framer Motion** — ScrollTrigger is definitively better for scroll-driven animation. It runs outside React's render cycle, which matters with 15+ simultaneous scroll-triggered animations. All GSAP plugins are now fully free (Webflow acquisition, October 2024).
- **Lenis** — Better easing than GSAP ScrollSmoother; two-line React integration. Synced to GSAP's RAF ticker for pixel-perfect frame alignment.
- **Zustand** — No Provider boilerplate, atomic subscriptions mean scroll-tick state changes don't re-render unrelated components.
- **Sub-modules as overlay layers** — Preserves scroll position and deck context. The viewer never feels they've navigated away. Enables GSAP Flip card-to-fullscreen transitions.

---

## Local Setup

**Prerequisites:** Node 20+, npm 10+

```bash
git clone https://github.com/your-username/moa-sales-deck
cd moa-sales-deck
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

**Production build:**
```bash
npm run build   # TypeScript check + Vite bundle
npm run preview # Preview the dist/ output locally
```

The build produces ~145KB gzipped initial bundle across 4 code-split chunks (react, gsap, lenis, zustand).

---

## Project Structure

```
moa-sales-deck/
├── public/
│   ├── videos/                    # Hero background video (MP4)
│   └── images/                    # MOA interior photo (Attractions hero)
├── src/
│   ├── sections/                  # One directory per story beat
│   │   ├── Hero/
│   │   ├── WhyMOA/
│   │   ├── Retail/
│   │   ├── Luxury/
│   │   ├── Dining/
│   │   ├── Attractions/
│   │   ├── Events/
│   │   └── Contact/
│   ├── modules/                   # Lazy-loaded deep-dive overlays
│   │   ├── EventsModule/
│   │   ├── SponsorshipModule/
│   │   ├── LeasingModule/
│   │   └── VenueModule/
│   ├── components/
│   │   ├── layout/                # DeckShell, SectionWrapper, LenisProvider, ScrollProgress
│   │   ├── navigation/            # NavOverlay, DotNav, NavTrigger
│   │   └── ui/                    # VideoBackground, Button, StatCounter
│   ├── store/                     # Zustand store (activeSection, isNavOpen, activeModule, inquiryType)
│   ├── data/                      # All MOA facts as typed TypeScript constants
│   │   ├── stats.ts
│   │   ├── brands.ts
│   │   ├── attractions.ts
│   │   ├── sections.ts
│   │   └── contacts.ts
│   ├── hooks/                     # useVideoAutoplay, useSectionObserver, useLenis
│   ├── utils/                     # gsap.ts (plugin registration), cn.ts
│   ├── styles/
│   │   ├── tokens.css             # CSS custom properties: --color-moa-navy, --color-moa-gold
│   │   └── global.css             # Tailwind import, font-face, resets
│   └── main.tsx                   # Lenis init, GSAP plugin registration, router mount
├── index.html                     # Preloads: hero video, fonts
├── vite.config.ts                 # manualChunks: react, gsap, zustand, lenis
└── vercel.json                    # SPA rewrites + cache headers
```

---

## Navigation Architecture

Three tiers of non-linear navigation:

1. **Vertical scroll** — Default experience. GSAP ScrollTrigger `snap` ensures clean section landings with no half-visible sections.
2. **Dot nav** (fixed right rail, desktop) — One dot per section. Active dot enlarges with a gold glow and label. Click any dot for a Lenis `scrollTo()` jump with cinematic easing.
3. **Overlay nav** (☰ top right) — Full-screen panel. Left column lists all deck sections as large typographic links. Right column lists the 4 deep-dive modules with subtitles. GSAP stagger entrance on open.

Sub-modules mount as fixed overlay layers (z-index 40) above the main deck. The deck stays mounted and scrollable underneath — no navigation history pushed, no scroll reset on close.

**Adding a new sub-module:**
1. Create `src/modules/YourModule/index.tsx` using `<ModuleShell title="..." />`
2. Add `const YourModule = React.lazy(() => import('./modules/YourModule'))` in `App.tsx`
3. Add a trigger: `onClick={() => setActiveModule('your-module')}`

No router changes, no store schema changes needed.

---

## Animation System

| Type | Tool | Examples |
|---|---|---|
| Page-load sequence | GSAP timeline | Logo → video → headline → sub-copy (0–2.5s) |
| Section entrances | GSAP + ScrollTrigger | Word reveals, stat count-ups, stagger card entrances |
| Scroll-scrubbed | ScrollTrigger scrub | Ken Burns, horizontal pin, parallax image columns |
| Horizontal scroll | GSAP pin + scrub | Retail panels (3 editorial splits, pinned to viewport) |
| Sub-module open/close | GSAP Flip | Card-to-fullscreen expand, reverse on close |
| Micro-interactions | CSS transitions | Button hover, card lift, dot nav scale, gold line reveal |

All GSAP animations are initialised inside `gsap.context()` with `ctx.revert()` on unmount — no leaked ScrollTriggers across React re-renders.

Lenis sync: `gsap.ticker.add((time) => lenis.raf(time * 1000))` + `gsap.ticker.lagSmoothing(0)`

---

## Content Data

All MOA facts live in `src/data/` as typed TypeScript constants, decoupled from UI code. Updating numbers, brand lists, or contact info requires no component changes.

**Key figures used:**
- 40M annual visitors · 25M out-of-state · 10% international
- $162 average spend per visit · international guests spend 2.5×
- 520+ stores · 60+ restaurants · 13,000 parking spaces · 5.6M sq ft
- 400+ events per year · Super Bowl LII: 1.5M visitors in 10 days
- Nickelodeon Universe: 7 acres, 27 rides (largest indoor theme park in the US)
- Tax-free apparel in Minnesota — 0% sales tax on clothing and shoes

---

## AI Chat Assistant

The deck includes a live AI assistant (`src/components/ChatWidget.tsx`) powered by **Groq** (Llama 3.3 70B) that answers prospect questions in real time.

**Features:**
- Floating launcher (bottom-right) with a typewriter effect cycling through sample questions
- 400px chat panel with streaming token-by-token responses and a live cursor
- 4 suggested question chips on first open
- Full conversation history passed with each request
- Gold-on-cream light UI palette — distinct from the dark deck, feels like a help widget

**How it works:**
1. User types a question (or clicks a suggested chip)
2. Request goes to Groq's API with `MOA_SYSTEM_PROMPT` (defined in `src/lib/moaContext.ts`) as system context
3. Response streams back chunk-by-chunk using the Groq SDK's async iterator
4. Streamed text builds in the bubble live; on completion it's committed to message history

**Setup:** Add your Groq API key to `.env.local`:
```
VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxx
```

Get a free key at [console.groq.com](https://console.groq.com). The free tier is sufficient for a sales demo.

> The system prompt in `src/lib/moaContext.ts` contains all MOA facts (visitor stats, leasing contacts, attractions, dining, events) so the assistant answers accurately without hallucinating.

---

## AI Tools Used

| Tool | How |
|---|---|
| **Claude (Anthropic)** | Architecture planning, all component design and code generation, UX iteration |
| **Groq + Llama 3.3 70B** | Live AI chat assistant embedded in the deck (streaming responses) |
| **GSAP** | Animation system (ScrollTrigger, Flip, SplitText) |
| **Unsplash** | Placeholder imagery for Retail, Luxury, Dining, and Events sections |

**For production:** Replace Unsplash URLs in `src/data/brands.ts`, `src/sections/Retail/`, `src/sections/Dining/`, and `src/sections/Events/` with licensed MOA press kit photography. Host on Cloudinary with `f_auto,q_auto` for AVIF/WebP auto-negotiation.

---

## Design Decisions

**Color palette — why so dark?**  
MOA's luxury positioning demands premium treatment. The navy (`#0A0E1A`) + gold (`#C9A84C`) combination is drawn directly from MOA's branding and creates contrast that makes imagery and stats command attention. It also matches the premium feel of reference decks like Hermès.com and Tesla's configurator.

**Typography — why Playfair Display + Inter?**  
Playfair Display carries the editorial weight for headlines and numbers. Inter handles all body and label copy at small sizes. This pairing is a deliberate editorial convention used by luxury publications (Vogue, Architectural Digest) — authoritative but not cold.

**Why no page routing between sections?**  
A sales call doesn't follow a linear path. The prospect may want to jump from Luxury to Leasing in one click. Overlay modules and in-page section jumping give the presenter full non-linear control without URL changes or loading states that would break momentum.

**Why local video files?**  
YouTube adds 600KB+ of JS, shows third-party chrome, and has unreliable autoplay policies on Safari. Self-hosted WebM + MP4 in `/public/videos/` loads progressively with `Accept-Ranges: bytes` headers, stays under 15MB with H.264 compression, and autoplays reliably across browsers.

---

## Deployment

The project deploys to Vercel with zero configuration.

`vercel.json` provides:
- **SPA rewrites** — `/events`, `/sponsorship`, `/leasing`, `/venue` all serve `index.html` so React Router handles them client-side
- **Immutable asset caching** — `/assets/*` (hashed filenames) cached for 1 year
- **Video streaming** — `Accept-Ranges: bytes` on `/videos/*` for progressive HTTP range loading
- **Security headers** — `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` on all routes

```bash
npm i -g vercel
vercel --prod
```

---

## What I Would Improve With More Time

1. **Real MOA footage** — Replace the sample video with official MOA aerial/atrium footage compressed to <8MB WebM using `ffmpeg -vf scale=1920:-2 -c:v libx264 -crf 28 -preset slow -an`
2. **Licensed photography** — Swap Unsplash placeholders with MOA press kit imagery (available at mallofamerica.com/media)
3. **GSAP Flip module transitions** — The architecture is ready; the expand/collapse animation from the trigger card to fullscreen overlay needs the Flip plugin wired in
4. **Lead form backend** — Vercel Edge Function to route inquiries to the correct MOA contact (`lease.inquiry@moa.net` vs `natasha.freimark@moa.net`) with Claude API for inquiry type classification
5. **Mobile gestures** — Horizontal swipe on Retail panels, swipe-to-close on modules
6. **Lighthouse 90+** — Critical CSS inlining, explicit image dimensions, LCP hero poster with `fetchpriority="high"`
7. **Engagement analytics** — Session heatmaps showing which sections prospects spend most time on, giving the sales team signal on what resonates

---

## Contact

Built as an interview submission. For questions about the project, reach out at phaniindra.phani@gmail.com.
