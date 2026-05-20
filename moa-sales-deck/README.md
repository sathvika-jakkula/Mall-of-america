# Mall of America — Interactive Sales Deck

A cinematic, Digideck-style browser-based sales tool for Mall of America targeting prospective retail tenants, sponsors, and event partners.

---

## What It Is

An interactive sales deck that replaces fragmented pitch materials (PDFs, YouTube videos, spreadsheets) with a single immersive experience. Designed to be screen-shared on a live sales call or sent as a standalone link.

- Non-linear navigation — viewer controls their journey
- Video-first storytelling with autoplay, scroll-triggered media
- Luxury UI inspired by Apple, Hermès, Tesla
- 4 expandable sub-modules: Events, Sponsorship, Leasing, Venue

---

## Tech Stack

| Layer | Tool | Why |
|---|---|---|
| Framework | React 18 + Vite 6 | No SSR needed; 300ms dev start; optimal static output |
| Styling | Tailwind CSS v4 | Oxide engine, ~50ms builds, JIT-only utilities |
| Animation | GSAP 3 (ScrollTrigger, SplitText, Flip, DrawSVG) | Best-in-class scroll animation; now fully free |
| Smooth scroll | Lenis | Syncs to GSAP RAF; superior inertia feel |
| State | Zustand | No Provider boilerplate; atomic, no scroll-tick re-renders |
| Fonts | Google Fonts (Playfair Display + Inter) | CDN delivery with preconnect |
| Deployment | Vercel | SPA rewrites, immutable asset caching, zero config |

---

## Setup

```bash
git clone https://github.com/your-username/moa-sales-deck
cd moa-sales-deck
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

**Build for production:**
```bash
npm run build
npm run preview
```

---

## Architecture

```
src/
├── sections/          # 8 story beats (Hero → Contact)
├── modules/           # 4 lazy-loaded sub-modules
│   ├── EventsModule/
│   ├── SponsorshipModule/
│   ├── LeasingModule/
│   └── VenueModule/
├── components/
│   ├── layout/        # DeckShell, LenisProvider, ModuleRenderer
│   ├── navigation/    # NavOverlay, DotNav, NavTrigger
│   └── ui/            # VideoBackground, StatCounter, Button
├── store/             # Zustand: navigation, video, module, lead slices
├── data/              # All MOA facts as typed constants
├── hooks/             # useVideoAutoplay, useSectionObserver, useLenis
└── utils/             # GSAP plugin registration, cn, formatNumber
```

### Navigation Architecture

Three tiers:
1. **Vertical scroll** — default; ScrollTrigger snap ensures clean section landings
2. **Dot nav** (right rail) — click any dot for a Lenis `scrollTo()` jump
3. **Overlay nav** (top-left ☰) — full-screen panel with section + sub-module links

Sub-modules render as fixed overlay layers (z-index 40) above the deck. No page navigation, no scroll reset.

### Adding a New Sub-Module

1. Create `src/modules/YourModule/index.tsx` using `<ModuleShell title="..." />`
2. Add `const YourModule = React.lazy(() => import('./modules/YourModule'))` in `ModuleRenderer.tsx`
3. Render it: `{activeModule === 'your-module' && <YourModule />}`
4. Add a trigger anywhere: `onClick={() => setActiveModule('your-module')}`

No router changes, no store changes needed.

---

## Content Data

All MOA facts are in `src/data/` as typed TypeScript constants. Update them independently of UI code:

- `stats.ts` — visitor numbers, sales figures
- `brands.ts` — tenant logos and luxury brand moments
- `attractions.ts` — Nickelodeon Universe, SEA LIFE, etc.
- `contacts.ts` — leasing, partnership, events contacts
- `sections.ts` — navigation manifest

---

## AI Tools Used

- **Claude (Anthropic)** — architecture planning, component design, all code generation
- **Unsplash** — placeholder imagery (replace with licensed MOA photography for production)
- **GSAP** — animation system (ScrollTrigger, SplitText, DrawSVG, Flip)

For production: replace Unsplash URLs with Cloudinary-hosted images using `f_auto,q_auto` transforms for AVIF/WebP auto-negotiation.

---

## Design Decisions

**Why React + Vite over Next.js:** This is a closed B2B sales tool with no SEO requirement. SSR's primary benefit is irrelevant. Vite produces smaller bundles and starts in ~300ms vs Next.js's 2-8s cold start.

**Why GSAP over Framer Motion:** GSAP's ScrollTrigger is definitively superior for scroll-based animation. It operates outside React's render cycle, which matters when you have 15+ simultaneous scroll-driven animations. All plugins are now free (Webflow acquisition, Oct 2024).

**Why Lenis:** Better easing feel than GSAP ScrollSmoother and simpler React integration. Synced to GSAP's RAF in two lines.

**Why sub-modules as overlay layers:** Preserves the deck's scroll position and context. The user never feels they've left the experience. Enables GSAP Flip "card expands to fullscreen" transitions.

**No video files included:** Hero video uses a public sample MP4. In production, self-host compressed WebM + MP4 in `/public/videos/` using: `ffmpeg -vf scale=1920:-2 -c:v libx264 -crf 28 -preset slow -an output.mp4`

---

## What I'd Improve With More Time

1. **Real MOA video footage** — replace sample video with official MOA aerial footage, compressed to <8MB WebM
2. **Licensed photography** — replace Unsplash placeholders with MOA press kit imagery from mallofamerica.com/media
3. **GSAP Flip transitions** — animate sub-module cards expanding to fullscreen (architecture already supports it)
4. **Lead form backend** — Vercel Edge Function routing inquiries to correct contacts with Claude API classification
5. **Mobile optimization** — swipe gestures and mobile nav for full phone support
6. **Lighthouse audit** — target 90+ score with image optimization and critical CSS inlining
7. **Analytics** — session tracking to show sales team which sections prospects engage with most

---

## Deployment

Deployed on Vercel. The `vercel.json` handles:
- SPA rewrites for sub-module paths (`/events`, `/sponsorship`, `/leasing`, `/venue`)
- Immutable caching for hashed assets (`/assets/*`)
- `Accept-Ranges: bytes` on videos for progressive loading
