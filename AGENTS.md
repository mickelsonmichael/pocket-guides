# Pocket Guides — Agent Reference

A reference doc for AI agents creating or maintaining guides in this
React + TypeScript + Tailwind CSS repository.

---

## Tech Stack

- **Vite** — build tool / dev server
- **React 18** — UI framework (uses the modern `jsx-runtime`, no
  `import React` required)
- **TypeScript 5 (strict)**
- **react-router-dom 6** — client-side routing with a base path of
  `/pocket-guides/` (matches the GitHub Pages URL)
- **Tailwind CSS 3** — utility classes. Site design tokens are exposed
  as Tailwind colors/fonts (`bg`, `surface`, `accent`, `accent2`,
  `accent3`, `font-pixel`, `font-mono`). Custom CSS lives in
  `src/styles/site.css` and `src/styles/index.css`.
- **Prettier + ESLint** — formatting and linting, enforced by CI.

The old Foundation grid classes (`grid-container`, `grid-x`, `cell`,
`large-N`, etc.) used by the original static HTML still work — a small
shim in `src/styles/index.css` provides the layout behaviour Foundation
used to provide. Prefer Tailwind utilities in new code.

---

## Repository Structure

```
pocket-guides/
├── AGENTS.md                      # This file
├── index.html                     # Vite entry (loads /src/main.tsx)
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── .prettierrc.json
├── .eslintrc.cjs
├── public/
│   └── assets/img/
│       └── <slug>-boxart.jpg      # Box art (served at BASE_URL/assets/img/...)
├── src/
│   ├── main.tsx                   # React entry, mounts BrowserRouter
│   ├── App.tsx                    # Route table
│   ├── vite-env.d.ts
│   ├── components/
│   │   ├── GuideHeader.tsx        # Shared header (title + RA button)
│   │   ├── SideNav.tsx            # Sticky sidebar nav
│   │   ├── Footer.tsx
│   │   └── shared.tsx             # InfoBox, WarnBox, Tag, SectionTitle,
│   │                              # SubsectionTitle, BulletList, TableWrap
│   ├── pages/
│   │   ├── HomePage.tsx           # Landing page + live search
│   │   ├── GuidePage.tsx          # Generic guide renderer
│   │   └── NotFoundPage.tsx
│   ├── guides/
│   │   └── registry.ts            # Metadata + `?raw` HTML imports for each guide
│   └── styles/
│       ├── index.css              # Tailwind directives + Foundation grid shim
│       └── site.css               # Dark-theme design tokens + shared components
├── games/
│   └── <slug>.html                # Original guide HTML (imported as raw strings)
└── .github/
    ├── workflows/
    │   ├── ci.yml                 # Format / Lint / Typecheck / Build on PR + main
    │   └── deploy.yml             # Deploy dist/ to GitHub Pages on main
    ├── skills/
    │   ├── style/SKILL.md         # Style decisions (accents, shared components)
    │   └── lint/SKILL.md          # Formatting, linting, typechecking conventions
    └── agents/
        ├── fact-checker.md        # Verifies factual claims in a guide
        └── lint.md                # Runs format/lint/typecheck as the last step
```

---

## Local development

```bash
npm install       # once
npm run dev       # Vite dev server at http://localhost:5173/pocket-guides/
npm run build     # production build → dist/
npm run preview   # serve the production build locally
npm run check     # format:check + lint + typecheck
```

Run `npm run format` and `npm run lint:fix` to auto-fix style / lint
issues. Run the **lint agent** (`.github/agents/lint.md`) as the last
step of any task that modifies source files. The lint agent uses the
`lint` skill (`.github/skills/lint/SKILL.md`) for conventions.

---

## Adding a New Guide

### 1. Drop the HTML file

Put the guide under `games/<slug>.html`, using the shape the existing
guides use:

- A per-guide `<style>` block in `<head>` (optional) — extracted and
  injected automatically by `GuidePage`.
- `<body>` contains `<div class="grid-container">` → `<guide-header …>`
  → another `<div class="grid-container">` → `<div class="grid-x
grid-margin-x">` → sidebar `<div class="cell large-3 show-for-large">`
  → main `<div class="cell large-9">`.
- An optional `<footer>` is extracted and re-rendered through the shared
  `Footer` component.

`GuidePage` parses this with `DOMParser` and renders:

- The `<GuideHeader>` component (from `title`, `platform`, `ra-id`).
- The `<SideNav>` component (from the `.side-nav ul li a` items).
- The main content via `dangerouslySetInnerHTML` — all existing
  `.info-box`, `.warn-box`, `.tag`, `.bullet-list`, `.tbl-wrap` classes
  keep working via `src/styles/site.css`.

### 2. Add a box-art image

Save as `public/assets/img/<slug>-boxart.jpg`. The file is served at
`${BASE_URL}assets/img/<slug>-boxart.jpg` in the browser.

### 3. Register the guide

Add an entry to `src/guides/registry.ts`:

```ts
import mySlugRaw from '../../games/my-slug.html?raw';

export const guides: GuideMeta[] = [
  // …
  {
    slug: 'my-slug',
    title: 'My Game',
    platform: 'Game Boy · Genre · Publisher · Year',
    meta: 'GB · Genre · Year',
    year: 1997,
    searchTerms: 'my game gb year genre alternate names',
    boxArt: img('my-slug-boxart.jpg'),
    alt: 'My Game box art',
    raId: '0000',
    html: mySlugRaw,
  },
];
```

The home page and router pick it up automatically.

### 4. Writing new content as React components

For **new content** prefer the shared React components over raw
HTML / classes:

```tsx
import { InfoBox, WarnBox, Tag, SectionTitle, SubsectionTitle, BulletList, TableWrap } from '../components/shared';

<SectionTitle id="overview">Overview</SectionTitle>
<p>…</p>
<InfoBox><p>Tip…</p></InfoBox>
<WarnBox><p>Watch out…</p></WarnBox>
<TableWrap>
  <table>…</table>
</TableWrap>
```

---

## Style Skill

Consult the **style** skill (`.github/skills/style/SKILL.md`) whenever
you make visual decisions — accent colour selection, CSS variable
overrides, use of shared components. The rules are unchanged from the
static-HTML era:

- Only `--accent`, `--accent2`, `--accent3`, `--glow` may be overridden
  per guide.
- Never override `--bg`, `--surface`, `--surface2`, `--border`,
  `--text`, `--text-dim`.
- Tables use `<TableWrap><table>…</table></TableWrap>` (no inline
  styles).
- No emoji — use FontAwesome Free icons (loaded globally from the
  stylesheet in `index.html`).

---

## Fact-Checker Agent

After drafting or significantly updating a guide, run the
**fact-checker** agent (`.github/agents/fact-checker.md`). It parses
factual claims and verifies them against live web sources.

---

## Lint Agent (Definition of Done)

Run the **lint agent** (`.github/agents/lint.md`) as the **last step**
of any task that changes source code. The agent:

1. Uses the `lint` skill (`.github/skills/lint/SKILL.md`) for
   conventions.
2. Runs `npm run format:check`, `npm run lint`, `npm run typecheck`.
3. Applies `npm run format` / `npm run lint:fix` where applicable.
4. Returns a green / red report.

A task is not considered done until the lint agent returns a green
report for all three checks.

---

## Deployment

- `.github/workflows/ci.yml` runs on every pull request and on pushes
  to `main`. It runs format, lint, typecheck, and build, and uploads
  the `dist/` folder as a Pages artifact on `main`.
- `.github/workflows/deploy.yml` deploys that artifact to GitHub Pages
  after the CI workflow succeeds on `main`.
