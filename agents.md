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
│       └── <game>-boxart.{jpg,svg}  # Box-art images (jpg preferred, svg for placeholder)
└── games/
    └── <game-slug>.html           # One HTML file per game guide
```

---

## Creating a New Guide

### 1. File Naming

- Guide files live in `games/` and are named with a kebab-case slug: `pokemon-yellow.html`, `donkey-kong-gb.html`.
- Box art images go in `assets/img/` as `<slug>-boxart.jpg` (or `.svg` for a generated placeholder).

### 2. HTML Skeleton

Every guide must:

1. Link `https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Share+Tech+Mono&display=swap`
2. Link `https://cdn.jsdelivr.net/npm/foundation-sites@6.8.1/dist/css/foundation.min.css`
3. Link `../assets/site.css`
4. Include a `<header>` with `.back-link`, `.game-platform`, `.game-title`, and `.game-subtitle`
5. Use a Foundation `.grid-container` > `.grid-x` layout with a sticky sidebar (`.side-nav`) on large screens and the main content in the remaining columns

```html
<header>
  <div class="grid-container">
    <a href="../index.html" class="back-link">← All Guides</a>
    <p class="game-platform">Platform · Genre · Year</p>
    <h1 class="game-title">Game Name</h1>
    <p class="game-subtitle">Short tagline</p>
  </div>
</header>
```

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

### Preferred: Real Box Art (JPG)

Always try to obtain real box art before falling back to an SVG placeholder. Try these sources in order:

1. **Bulbapedia** — find the File page (e.g. `https://bulbapedia.bulbagarden.net/wiki/File:Yellow_EN_boxart.png`). The HTML will contain the direct image URL from `archives.bulbagarden.net`. Download and resize to ≤300px wide at 85% JPEG quality.
2. **Internet Archive** — scan collections often contain high-res front-of-box JPEGs (search `https://archive.org/` for the game title + "hiresscans" or "box art").
3. **Serebii** — check `https://www.serebii.net/<game>/` for a box cover image.
4. **Wikimedia Commons** — search `https://commons.wikimedia.org/wiki/Category:<GameName>`.

Save the final image as `assets/img/<slug>-boxart.jpg`.

### Fallback: SVG Placeholder

Only create an SVG placeholder if all download attempts fail (domain blocked, image not found). A good placeholder includes:

- Game colour scheme as a gradient background
- A simple silhouette or symbolic shape representing the game
- Game title text in a monospace font
- Platform badge (e.g., "GAME BOY COLOR")
- Keep it simple — 200×280px viewBox

---

## Checklist for a New Guide

- [ ] `games/<slug>.html` created with correct header, nav, and all required sections
- [ ] `assets/img/<slug>-boxart.{jpg,svg}` added
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
