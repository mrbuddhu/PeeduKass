# Peedu Kass — Bilingual Artist Website with a Custom Multi-Language CMS

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000)](https://vercel.com)

**Live site:** https://peedukass.com
**Admin panel / CMS:** https://peedukass.com/admin

A production website for **Peedu Kass** — Estonian double-bassist, composer, bandleader and educator — covering biography, discography, concert calendar, photo and video galleries, audio streaming, and a downloadable press kit. The site is fully **bilingual (English ⇄ Estonian)** and ships with a **hand-built content management system** that lets the artist update every part of the site himself, with no third-party CMS subscription.

Built as commercial client work and deployed on Vercel with Supabase as the content database.

---

## Contents

- [What this project demonstrates](#what-this-project-demonstrates)
- [Tech stack](#tech-stack)
- [The custom CMS](#the-custom-cms)
- [Content pipeline: how an edit reaches the visitor](#content-pipeline-how-an-edit-reaches-the-visitor)
- [Multilingual architecture](#multilingual-architecture)
- [SEO implementation](#seo-implementation)
- [Site structure](#site-structure)
- [API reference](#api-reference)
- [Running it locally](#running-it-locally)
- [Architecture notes & roadmap](#architecture-notes--roadmap)
- [Built for artists and booking professionals](#built-for-artists-and-booking-professionals)

---

## What this project demonstrates

- **Zero-substance content editing.** News items, gigs, photos, videos, tracks, bio and press materials are all editable by the artist — no developer in the loop, no per-edit cost.
- **A CMS built from first principles**, not bolted on: three storage layers, per-language content files, media upload, and automatic version history through Git.
- **Genuine bilingual support**, not a translation widget: separate English and Estonian content records for every section, plus a full UI string dictionary.
- **Search-engine-ready foundations:** canonical URLs, Open Graph and Twitter cards, generated sitemap, robots directives, language alternates, and complete metadata on every page.
- **Fast, self-hosted, accessible delivery** — variable fonts via `next/font`, no render-blocking third-party font requests.

---

## Tech stack

| Layer | Technology | Role in this project |
|---|---|---|
| Framework | **Next.js 14** (App Router) | File-based routing, metadata API, route handlers (`app/api/*`) |
| Language | **TypeScript 5** | Typed content models across CMS and UI components |
| Styling | **Tailwind CSS 4** + `tw-animate-css` | Utility-first design system, custom properties for brand typography |
| UI primitives | **Radix UI** + shadcn/ui conventions | Accessible dialogs, tabs, selects, toasts, accordions |
| Icons | **lucide-react** | Consistent icon set |
| Data / content store | **Supabase (PostgreSQL)** | `cms_content` table keyed on `(section, lang)` |
| Version store | **GitHub Contents API** | Every CMS save is committed as JSON — free, permanent history |
| Hosting | **Vercel** | Serverless functions, edge caching, auto-deploy on push |
| Analytics | **@vercel/analytics** | Production traffic measurement |
| Fonts | **Playfair Display**, **Be Vietnam Pro** | Self-hosted via `next/font/google` with `display: swap` |
| Media | **sharp**, `fluent-ffmpeg` scripts | Image optimisation and audio prep |
| Package scripts | `npm` / `pnpm` (both lockfiles committed) | `dev`, `build`, `start`, `lint` |

---

## The custom CMS

The admin panel is a single-page tool at `/admin` — no external CMS, no plugin licence, no editor seat fees.

**Content sections it manages** (each maps to a JSON file *and* a Supabase row):

| Section | Screen | Storage file |
|---|---|---|
| Home – News | `news` | `public/content/news.json` |
| About – Bio | `bio` | `public/content/bio.json` |
| About – Bands & projects | `bands` | `public/content/bands.json` |
| About – Awards | `awards` | `public/content/awards.json` |
| Calendar – Concerts | `gigs` | `public/content/gigs.json` |
| Gallery – Photos | `photos` | `public/content/photos.json` |
| Gallery – Videos | `videos` | `public/content/videos.json` |
| Audio – Tracks | `audio` | `public/content/audio.json` |
| Press – Kit | `pressKit` | `public/content/press-kit.json` |
| Press – Photos | `pressPhotos` | `public/content/press-photos.json` |

**What makes it powerful in practice:**

- **Bilingual editing from one screen.** A language toggle switches the whole editor between English and Estonian content; each language is stored separately (`*_est.json`, and a distinct `lang` column in the database).
- **Three-layer durability.** A save writes to Supabase, to the JSON file in the repository, and to GitHub as a commit. Losing any one layer does not lose the content.
- **Built-in history.** Because each edit is a Git commit (`CMS: update public/content/…`), every change is attributable and reversible — a free replacement for "draft / publish / restore" machinery.
- **Automatic cross-language mirroring** for the concert calendar, so a gig list never appears in one language only.
- **Media upload with sanitised filenames** for images (`jpg`, `jpeg`, `png`, `webp`), documents (`pdf`, `zip`) and audio (`mp3`, `wav`, `m4a`, `ogg`, `aac`), served back from `/uploads/`.
- **Live propagation.** Open visitor tabs are notified through a `BroadcastChannel("cms")` and a `cms:content-updated` window event, so published changes refresh without a manual reload.
- **Path-restricted writes.** The save handler only accepts targets under `public/content/`, rejecting traversal attempts with `403 Forbidden`.
- **Snapshot files** kept in `public/content/_backups/` as a manual recovery aid (written by an earlier revision of the save handler; automatic snapshot writing is on the roadmap below).

---

## Content pipeline: how an edit reaches the visitor

```
Artist edits in /admin
        │
        ▼
POST /api/admin/save ──► Supabase  cms_content (section, lang)   ← read first
        │             ├─► public/content/<section>[_est].json    ← fallback
        │             └─► GitHub Contents API commit             ← durable history
        │                                                            │
        │                                                            ▼
        │                                                     Vercel rebuild
        ▼
Visitor opens a page ──► GET /api/content/<section>/<lang>
                            Supabase row → JSON file → other language → []
```

Reads are **fault-tolerant by design**: if the database is unreachable the API route transparently falls back to the committed JSON file, and if a translation is missing it serves the other language rather than showing an empty section.

---

## Multilingual architecture

Two cooperating layers, both controlled from the client:

1. **Interface strings** — `components/language-context.tsx` provides `t(key)` over a ~150-entry English/Estonian dictionary covering navigation, hero copy, section headings, form labels and press-kit facts. Selection persists in `localStorage` under `siteLanguage` and is restored on direct page loads.
2. **Editorial content** — per-section, per-language records (`news.json` vs `news_est.json`; Supabase rows with `lang = 'en' | 'est'`), fetched by each component as `/api/content/<section>/<lang>`.

Result: an Estonian visitor reading the site sees Estonian menus, headings *and* news, bio and concert text — while English visitors see the equivalent English record.

---

## SEO implementation

Implemented in `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts` and per-page `export const metadata` blocks on all six public routes:

- **Title, description and keyword sets** targeting the artist's discoverable terms — *Peedu Kass, bassist, composer, Estonian music, jazz, discography, performances*.
- **`metadataBase`** so every relative OG/twitter URL resolves absolutely to `peedukass.com`.
- **Canonical URL and `alternates.languages`** declarations for English and Estonian.
- **Open Graph** (`type: website`, 1200×630 `og-image.webp`, `siteName`) and **Twitter `summary_large_image`** cards, so shared links render with artwork on Facebook, Instagram, LinkedIn and X.
- **Granular crawler directives** — `index, follow` with `max-image-preview: large` and unlimited snippets for `googleBot`.
- **Generated `sitemap.xml`** with per-route `lastModified`, `changeFrequency` (daily for the concert calendar, weekly for news/audio/gallery) and priority weighting.
- **`robots.txt`** pointing crawlers at the sitemap and explicitly disallowing `/admin/`, so the CMS stays out of the index.
- **Complete favicon set** — 16/32 px icons and a 180×180 Apple touch icon.
- **Image-level metadata**: `about` and `press` pages declare `og:image` URLs plus alt text for concert and promo photography.
- **Core Web Vitals posture**: self-hosted variable fonts with `display: swap`, `pt-16 md:pt-20` layout offset to avoid cumulative layout shift from the fixed header, no-store fetches for CMS data so content is always current.

---

## Site structure

```
app/
  page.tsx            Home — hero, news feed
  about/              Biography, bands & projects, awards
  calendar/           Concert calendar, upcoming + past, ticket links
  gallery/            Photo gallery, video gallery
  audio/              Track player, streaming platform links
  press/              Press kit, hi-res promo photos, technical info
  contact/            Booking enquiry form and contact details
  admin/              The CMS
  sitemap.ts robots.ts
  api/
    admin/save/       Triple-target content writer
    admin/upload/     Media upload
    content/[section]/[lang]/   Read API with layered fallbacks
    spotify-preview/[id]/       Spotify embed previews
components/           26 feature components + Radix-based ui/ primitives
public/content/       10 sections x 2 languages, plus _backups/
lib/                  Supabase server client, utilities
```

---

## API reference

| Method | Route | Purpose |
|---|---|---|
| `POST` | `/api/admin/save` | Write `{ path, contents }` to Supabase, JSON file and GitHub; returns per-target status flags |
| `POST` | `/api/admin/upload` | `multipart/form-data` media upload → `{ url: "/uploads/<timestamp-name>.ext" }` |
| `GET` | `/api/content/{section}/{lang}` | Content read with Supabase → file → alternate-language fallback chain |
| `GET` | `/api/spotify-preview/{id}` | Spotify track preview metadata |

Admin endpoints require `x-admin-user` and `x-admin-pass` request headers and answer `401 Unauthorized` otherwise.

---

## Running it locally

```bash
git clone https://github.com/mrbuddhu/PeeduKass.git
cd PeeduKass
npm install          # or pnpm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run lint
```

The site renders from the committed JSON in `public/content/` with no database required, so a fresh clone works offline. Supabase features activate automatically when the relevant variables are present.

### Environment variables

| Name | Scope | Purpose |
|---|---|---|
| `NEXT_PUBLIC_ADMIN_USER` / `NEXT_PUBLIC_ADMIN_PASS` | client + server | Shared credentials guarding `/admin` |
| `SUPABASE_URL` | server only | Supabase project endpoint |
| `SUPABASE_SERVICE_ROLE` | server only | Service-role key for `cms_content` writes |
| `GITHUB_TOKEN` | server only | Fine-grained PAT with Contents read/write on this repo |
| `GITHUB_REPO` | server only | `owner/repo` target for CMS commits |
| `GITHUB_BRANCH` | server only | Branch receiving CMS commits (default `main`) |

Server-only variables are read exclusively inside route handlers. Note that Vercel injects environment variables at deploy time — changing one requires a redeploy before the running function sees it.

---

## Architecture notes & roadmap

Honest engineering caveats, for anyone evaluating the codebase:

- **`GITHUB_TOKEN` is a single point of failure for CMS writes** on a read-only serverless filesystem. Making the Supabase write path a fully verified second target is the top priority; per-target error reporting is planned so a failed save names its cause instead of returning a generic message.
- **Shared-credential auth is adequate for a portfolio site but not session-hardened.** Migration to signed-in sessions with per-user accounts is the planned upgrade for multi-operator use.
- **Serverless filesystem writes do not persist**, so `public/uploads/` media requires the repository-commit path to survive redeploys; object storage is the intended long-term home for uploaded assets.
- **`hreflang` currently declares `/en` and `/et` paths** while language is client-side state; URL-routed locales would make the language split crawlable as separate pages.
- **JSON-LD structured data** (`MusicGroup`, `Person`, `Event`, `Album`) is specified in `SEO-STRATEGY.md` and not yet emitted — the next step for rich results.
- **Automatic pre-write snapshots** to `public/content/_backups/` were part of an earlier save handler and are worth restoring, so a bad edit can be rolled back without digging through Git history.

---

## Built for artists and booking professionals

A working musician's website has three jobs: be findable, be current, and hand over cleanly. This project does all three without a subscription.

- **Always current** — new gig, release or photo goes live in under a minute, in either language, by the artist alone.
- **Nothing locked** — content is plain JSON plus one Postgres table. No proprietary export, no vendor lock-in, no migration tax if the site ever moves host.
- **Everything recoverable** — Git history and local backup copies mean an accidental edit is never a loss.
- **Priced sensibly** — the CMS is bespoke code rather than a per-editor licence, so running cost scales with traffic, not with content changes.

The same architecture generalises directly to other creator portfolios — musicians, dancers, theatre companies, photographers — where the owner wants editorial control and a bilingual public presence without depending on a developer for every update.

---

## Contact

Artist & bookings: **peedukass@gmail.com**
Repository: **https://github.com/mrbuddhu/PeeduKass**
Website: **https://peedukass.com**

All content, photography and recordings © Peedu Kass. All rights reserved.
