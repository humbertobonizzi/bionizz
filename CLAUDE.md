# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

bionizz — a Next.js site of free, no-signup, browser-only online tools (converters, calculators, generators, formatters), in Brazilian Portuguese. Monetized via Google AdSense. Deployed on Vercel.

## Commands

```bash
npm run dev      # start dev server
npm run build    # production build
npm run lint      # eslint
```

There is no test suite configured.

## Architecture

Every tool follows the same three-piece pattern; replicate it exactly when adding a new tool:

1. **Register it in `lib/tools.ts`** — add a `Tool` entry (`slug`, `name`, `description`, `category`, `icon`). `category` is one of `conversor | calculadora | gerador | formatador`, each with a label/color already defined in `categoryLabels`/`categoryColors`. This file is the single source of truth used to build the homepage list, tool pages, and `app/sitemap.ts`.
2. **Route at `app/ferramentas/<slug>/page.tsx`** — a server component that only sets `metadata` (title/description) and renders `<ToolLayout tool={...}><ToolComponent /></ToolLayout>`, looking up the tool via `tools.find((t) => t.slug === '<slug>')!`.
3. **Client component at `app/ferramentas/<slug>/<PascalCaseName>.tsx`** — `'use client'`, contains all actual UI/logic/state for the tool. All computation runs client-side in the browser — no backend/API routes/database for tool logic.

`components/ToolLayout.tsx` wraps every tool page (back link, icon/category badge, title/description, card container, bottom ad slot) — don't reimplement this chrome inside individual tool components.

Shared pieces: `components/Header.tsx`, `components/Footer.tsx`, `components/CookieBanner.tsx` (LGPD consent), `components/AdSlot.tsx` (AdSense placement, publisher ID set in `app/layout.tsx`), `components/ToolCard.tsx` (homepage tool grid item). Domain helpers that aren't simple UI live in `lib/` (e.g. `lib/cpfCnpj.ts`).

`app/sitemap.ts` and `app/robots.ts` are generated from `lib/tools.ts` — new tools are picked up automatically, no manual edits needed there.

## Conventions

- Styling is Tailwind CSS v4 with a fixed brand palette used via inline `style`/hex classes rather than Tailwind color names — see `categoryColors` in `lib/tools.ts` for the pattern (`#1B2B5E` navy, `#6B7280` gray text, `#E2E6EF` borders, etc.). Match these when styling new tools.
- No path aliases beyond `@/*` → repo root (see `tsconfig.json`).
- Fonts: Inter (`--font-inter`) for body, JetBrains Mono (`--font-mono`) for the display/mono headings (`font-mono-display` class).
