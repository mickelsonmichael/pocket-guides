# Pocket Guides — Agent Reference

A reference doc for AI agents creating or maintaining guides in this repository.

---

## Repository Structure

```
pocket-guides/
├── index.html                     # Main landing page with game card grid
├── agents.md                      # This file
├── assets/
│   ├── site.css                   # Shared stylesheet (all guides link to this)
│   └── img/
│       └── <game>-boxart.jpg        # Box-art images (always JPG from RetroAchievements)
└── games/
    └── <game-slug>.html           # One HTML file per game guide
```

---

## Creating a New Guide

### 1. File Naming

- Guide files live in `games/` and are named with a kebab-case slug: `pokemon-yellow.html`, `donkey-kong-gb.html`.
- Box art images go in `assets/img/` as `<slug>-boxart.jpg`.

### 2. HTML Skeleton

Every guide must:

1. Link `https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Share+Tech+Mono&display=swap`
2. Link `https://cdn.jsdelivr.net/npm/foundation-sites@6.8.1/dist/css/foundation.min.css`
3. Link `../assets/site.css`
4. Load `../assets/guide-header.js` (the shared `<guide-header>` web component)
5. Use `<guide-header>` for the page header — **do not** write a raw `<header>` element or separate back-link/nav in guides
6. Use a Foundation `.grid-container` > `.grid-x` layout with a sticky sidebar (`.side-nav`) on large screens and the main content in the remaining columns

```html
<head>
  ...
  <link rel="stylesheet" href="../assets/site.css">
  <script src="../assets/guide-header.js" defer></script>
</head>
<body>
<div class="shell">

  <guide-header
    title="Game Name"
    platform="Platform · Genre · Publisher · Year"
    ra-id="12345"
    nav='[{"label":"Overview","href":"#overview"},{"label":"Controls","href":"#controls"}]'
  ></guide-header>

  ...content...

</div>
</body>
```

#### `<guide-header>` attributes

| Attribute  | Required | Description |
|------------|----------|-------------|
| `title`    | Yes      | Game title (plain text) |
| `platform` | No       | Single metadata line shown below the title, e.g. `"Game Boy · Platformer · Nintendo · 1994"` |
| `ra-id`    | Yes      | RetroAchievements game ID — renders a header button linking to `https://retroachievements.org/game/{id}` |
| `nav`      | No       | JSON array of `{label, href}` objects for the sticky top-nav bar. Omit for sidebar-nav layouts. |

The component renders:
- A **back link** (`← Pocket Guides`) to `../index.html` — larger than the old inline link
- The game **title** (`<h1>`)
- A single **metadata line** below the title (replaces the old duplicate `.game-label` + `.subtitle` pattern)
- A **RetroAchievements button** in the top-right corner (when `ra-id` is supplied)
- An optional **sticky nav bar** (when `nav` JSON is supplied)

> **Note:** Because the `<guide-header>` component provides the RetroAchievements link, do **not** add a separate RA link in the Overview `.info-box` or the `<footer>`. The button in the header is the canonical location.

### 3. CSS Variables (theme)

`site.css` exposes these custom properties — override in `<style>` to change the accent colour for a guide:

| Variable       | Purpose                            |
|----------------|------------------------------------|
| `--accent`     | Primary highlight colour           |
| `--accent2`    | Lighter variant of accent          |
| `--accent3`    | Muted/dim accent (headings, etc.)  |
| `--glow`       | `box-shadow` value for glow effect |
| `--surface`    | Card/panel background              |
| `--surface2`   | Slightly lighter surface           |
| `--border`     | Border colour                      |
| `--text`       | Primary text                       |
| `--text-dim`   | Secondary/muted text               |

### 4. Shared CSS Classes (from `site.css`)

| Class              | Usage                                          |
|--------------------|------------------------------------------------|
| `.section-title`   | `<h2>` section heading with bottom border      |
| `.subsection-title`| `<h3>` sub-heading                             |
| `.info-box`        | Blue-tinted informational callout              |
| `.warn-box`        | Orange/amber warning callout                   |
| `.bullet-list`     | Styled `<ul>` list                             |
| `.tag`             | Small inline label/badge                       |
| `.back-link`       | "← Back" navigation link in the header        |
| `.side-nav`        | Sticky left navigation (`show-for-large`)     |
| `.nav-heading`     | Label above `.side-nav` link list              |

### 5. Registering in `index.html`

Add a card inside `#game-grid`:

```html
<div class="cell small-6 medium-4 large-3 game-card"
     data-name="searchable keywords here">
  <a href="games/<slug>.html">
    <img src="assets/img/<slug>-boxart.jpg" alt="Box art alt text">
    <div class="game-card-info">
      <div class="game-card-title">Display Name</div>
      <div class="game-card-meta">Platform · Genre · Year</div>
    </div>
  </a>
</div>
```

The `data-name` attribute powers the live search — include the game name, platform, genre, year, and any common alternate spellings.

---

## Guide Content Standards

### What to Include

A complete guide should cover:

- **Overview** — platform, year, key differences from related titles
- **Collectibles / Roster** — items, characters, or units available (with indicators for exclusivity, missable content, or trade requirements)
- **Acquisition methods** — how to get each collectible or unlock each mechanic
- **Mechanics** — any non-obvious or genre-specific systems (stat formulas, type charts, glitches, etc.)
- **Items / Equipment** — notable items with locations, especially limited/one-time ones
- **Tips / Callouts** — use `.info-box` for useful tips and `.warn-box` for warnings (missable content, irreversible decisions, bugs)

### Accuracy Guidelines

- Use **primary sources** (Bulbapedia, Serebii, official manuals) and specify the version/generation where relevant (e.g., "Gen I" for Pokémon mechanics)
- Distinguish between **in-game content** and **later changes** (e.g., "this mechanic changed in Gen II")
- Clearly label content that requires a second cartridge or link cable
- Mark glitches or exploits as such — don't present them as intended mechanics

### Tables

- Use `border-collapse: collapse` with alternating row hover states
- Column headers: `font-family: 'Press Start 2P'`, `font-size: 7–9px`, `color: var(--accent3)`
- Cell text: `font-size: 11–12px`, `color: var(--text)`
- Muted secondary info: `font-size: 10px`, `color: var(--text-dim)`

### Status / Tag Colours

Consistent colour patterns for status indicators (define custom `.pstatus`-style classes per guide):

| Meaning       | Background  | Foreground  |
|---------------|-------------|-------------|
| In wild / available | dark green | bright green |
| Gift / event  | dark amber  | yellow      |
| Evolve only   | dark blue   | bright blue |
| Trade required / unavailable | dark red | red |
| Fossil / special method | dark purple | lavender |
| Game Corner   | dark cyan   | cyan        |
| In-game trade | dark orange | orange      |
| Legendary / static | dark gold | yellow |

### Pokémon-Specific Conventions

- Always state the **generation** when describing mechanics (DVs vs IVs, Stat Exp vs EVs, Special vs Sp.Atk/Sp.Def)
- Distinguish between **owned** and **seen** for Pokédex requirements
- For trade-required Pokémon: specify which version(s) have them
- Note **trade-evolution** Pokémon (require trading to evolve, not just a stone)
- Note **missable** gifts or static encounters (Snorlax, legendary birds, starters — especially those that disappear if you walk away)

---

## Box Art

Always download box art from **RetroAchievements** as the primary source. Do **not** create SVG placeholders.

### How to Get Box Art from RetroAchievements

1. Find the game's page on RetroAchievements (e.g. `https://retroachievements.org/game/{id}`).
2. The box art image is displayed on the game page. Inspect the page source (or a cached copy via the Wayback Machine if the domain is blocked) to find the direct image URL — it will look like `https://media.retroachievements.org/Images/XXXXXX.png`.
3. Download the image and convert to JPG at ≤300px wide, 85% JPEG quality.
4. Save as `assets/img/<slug>-boxart.jpg`.

### If the RetroAchievements Domain Is Blocked

Use the Wayback Machine to retrieve the cached game page and image:

```
https://web.archive.org/web/2025/https://retroachievements.org/game/{id}
```

Find the `Images/XXXXXX.png` URL in the cached HTML, then fetch that image via Wayback Machine:

```
https://web.archive.org/web/20251123213126im_/https://media.retroachievements.org/Images/XXXXXX.png
```

Convert the downloaded PNG to JPG and save as `assets/img/<slug>-boxart.jpg`.

### Linking to RetroAchievements

Every guide must supply a RetroAchievements game ID via the `<guide-header ra-id="...">` attribute. The component renders a **RetroAchievements** button in the page header automatically — do **not** add a separate RA link in the Overview `.info-box` or `<footer>`.

RA URL pattern: `https://retroachievements.org/game/{id}`

---

## Checklist for a New Guide

- [ ] `games/<slug>.html` created with `<guide-header>` component (title, platform, ra-id, nav attributes set)
- [ ] `<script src="../assets/guide-header.js" defer>` included in `<head>` after `site.css`
- [ ] `assets/img/<slug>-boxart.jpg` downloaded from RetroAchievements and added
- [ ] Card added to `index.html` `#game-grid` with accurate `data-name`
- [ ] Accent colour variables overridden in `<style>` to match the game's palette
- [ ] All tables use the shared column-header style
- [ ] Missable/trade-required items clearly marked with `.warn-box` or status tags
- [ ] Glitches and exploits labelled as such
- [ ] Sources cited in the footer (`<footer>`)
- [ ] **Fact-checker agent run** and all reported errors resolved (see `.github/agents/fact-checker.md`)

---

## Fact-Checker Agent

After completing a guide, run the **fact-checker** agent (`.github/agents/fact-checker.md`) to verify accuracy. The agent:

1. Parses every factual claim in the guide HTML
2. Uses live web searches (Bulbapedia, GameFAQs, wikis, etc.) to verify each claim — **not just LLM knowledge**
3. Checks for platform conflation (e.g., GBA vs GBC vs GB)
4. Returns a structured report of incorrect facts, unverifiable claims, and verified facts

**To invoke:** Pass the full HTML content of the finished guide to the fact-checker agent. It will return a markdown report. Fix every item in the "Incorrect Facts" table before considering the guide done.
