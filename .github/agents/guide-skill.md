# Guide Skill — Pocket Guides

Use this skill whenever you are asked to create, update, or review a game guide in this repository.

---

## Skill Purpose

This skill provides step-by-step instructions and conventions for writing game guides in the Pocket Guides site. The site is a collection of fan-made HTML reference guides for handheld/retro games. Each guide is a self-contained HTML file styled with a shared dark-theme CSS.

---

## Before You Start

1. Read `agents.md` in the repository root for the full conventions reference.
2. Browse one or two existing guides in `games/` to understand the HTML structure (e.g., `games/pokemon-yellow.html` or `games/donkey-kong-gb.html`).
3. Read `assets/site.css` to understand the shared classes available.

---

## Workflow

### Step 1 — Research (before writing any code)

Use authoritative sources. For Pokémon games: Bulbapedia and Serebii. For other games: series wikis, GameFAQs, or official manuals. Verify:
- Version-specific differences (e.g., Yellow vs Red/Blue)
- What is truly in-game vs fan-added lore
- Which content is missable, limited, or trade/link-cable dependent

### Step 2 — Plan the Guide Sections

Typical sections (adapt as needed):

| Section | Content |
|---------|---------|
| Overview | Platform, year, key version differences |
| [Core collectible list] | Pokédex, item list, character roster, etc. |
| Special acquisitions | Gifts, starters, version exclusives |
| [Game-specific systems] | HMs/TMs, crafting, upgrade trees |
| Stats / Mechanics | Stat formulas, type chart quirks, AI behaviour |
| Notable Items | One-time or missable items worth highlighting |
| Secrets / Glitches | Clearly labelled exploits |

### Step 3 — Create the Files

1. **Guide file**: `games/<slug>.html`
   - Use the HTML template below as the starting skeleton
   - Run the **style** skill (`.github/agents/style-skill.md`) to choose the correct accent palette for the game and confirm what may/may not be overridden
   - Add all sections from your plan with proper `id` attributes for the sidebar nav
2. **Box art**: `assets/img/<slug>-boxart.jpg`
   - **Primary source: RetroAchievements** — find the game page at `https://retroachievements.org/game/{id}`, locate the `Images/XXXXXX.png` URL in the page source, download and convert to JPG at ≤300px wide, 85% quality
   - If RetroAchievements is blocked, use the Wayback Machine: `https://web.archive.org/web/2025/https://retroachievements.org/game/{id}`
   - **Do not create SVG placeholders** — always use a real box art image from RetroAchievements
3. **Index card**: Add the `.game-card` div to `index.html` `#game-grid`
   - Include thorough `data-name` keywords for search

### Step 4 — Validate

- Check all nav anchors in `.side-nav` match `id` attributes in the content
- Confirm tables use `.tbl-wrap` with a plain `<table>` (no inline styles on `table`/`th`/`td`)
- Confirm `.warn-box` is used for missable content and irreversible choices
- Confirm glitches are described as glitches, not intended mechanics
- Check the index card renders correctly (1:1 square aspect ratio image)

---

## HTML Template

> **Before customising:** run the style skill (`.github/agents/style-skill.md`) to pick the correct accent palette for the game.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GAME NAME — Pocket Guide</title>
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Share+Tech+Mono&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/foundation-sites@6.8.1/dist/css/foundation.min.css">
  <link rel="stylesheet" href="../assets/site.css">
  <script src="../assets/guide-header.js" defer></script>
  <style>
    /* Accent palette — only these four variables may be overridden */
    :root {
      --accent:  #REPLACE_ME;   /* primary highlight: e.g. #f9c800 for yellow */
      --accent2: #REPLACE_ME;   /* secondary accent  */
      --accent3: #REPLACE_ME;   /* dim/muted accent for headings */
      --glow:    0 0 10px #COLOR55, 0 0 20px #COLOR22;
    }
    /* Add guide-specific component styles here */
  </style>
</head>
<body>
<div class="shell">

  <guide-header
    title="GAME NAME"
    platform="Platform · Genre · Publisher · Year"
    ra-id="RETROACHIEVEMENTS_ID"
    nav='[{"label":"Overview","href":"#overview"},{"label":"Section","href":"#section"}]'
  ></guide-header>

  <section id="overview">
    <h2>Overview</h2>
    <p>...</p>
  </section>

  <!-- Add more sections -->

  <footer>
    <p>GAME NAME &copy; YEAR Developer / Publisher. Fan-made reference only. Information sourced from SOURCE.</p>
  </footer>

</div>
</body>
</html>
```

**For sidebar-nav layouts** (large guides), replace the `nav` attribute with a Foundation grid and `.side-nav`:

```html
<guide-header
  title="GAME NAME"
  platform="Platform · Genre · Publisher · Year"
  ra-id="RETROACHIEVEMENTS_ID"
></guide-header>

<div class="grid-container">
  <div class="grid-x grid-margin-x">
    <div class="cell large-3 show-for-large">
      <nav class="side-nav" style="position:sticky;top:20px;">
        <p class="nav-heading">// CONTENTS</p>
        <ul>
          <li><a href="#overview">Overview</a></li>
          <!-- Add more anchors -->
        </ul>
      </nav>
    </div>
    <div class="cell large-9">
      <section id="overview">
        <h2>Overview</h2>
        <p>...</p>
      </section>
    </div>
  </div>
</div>
```

---

## Common Patterns

### Status Tag (for collectible tables)

```html
<span class="pstatus wild">WILD</span>
```

Define `.pstatus` and variants in the guide's `<style>` block:

```css
.pstatus { display:inline-block; font-size:8px; padding:1px 5px; border-radius:2px;
           font-family:'Share Tech Mono',monospace; font-weight:bold; vertical-align:middle; }
.pstatus.wild   { background:#1a3d1a; color:#5dde5d; border:1px solid #2e6e2e; }
.pstatus.gift   { background:#3d3000; color:#f9c800; border:1px solid #7a6000; }
.pstatus.trade  { background:#3d0a0a; color:#ff6666; border:1px solid #7a1a1a; }
/* Add more variants as needed */
```

### Warning / Info Callout

```html
<div class="warn-box">
  <strong>Missable:</strong> This item is only available before event X.
</div>

<div class="info-box">
  <strong>Tip:</strong> Useful context or optimization advice.
</div>
```

### Standard Data Table

Use `.tbl-wrap` and a plain `<table>` — all styling is provided by `site.css`. Never add inline styles on `table`, `th`, or `td`.

```html
<div class="tbl-wrap">
  <table>
    <thead>
      <tr>
        <th>Column A</th>
        <th>Column B</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Cell content</td>
        <td>Cell content</td>
      </tr>
    </tbody>
  </table>
</div>
```

Only add custom CSS classes for guide-specific column styling (e.g. `.dex-num`, `.tm-move`). See `.github/agents/style-skill.md` for the full table reference.

---

## Pokémon-Specific Notes

- Always specify **Generation** when describing mechanics (DVs ≠ IVs, Stat Exp ≠ EVs)
- Use Bulbapedia as the primary source; cross-check Serebii for location data
- Link back to the **Gen I version** of pages (not FireRed/HeartGold equivalents)
- Note if a mechanic was changed in a later generation (e.g., "Special split into Sp.Atk / Sp.Def in Gen II")
- Pokémon that require a second cartridge/link cable for trade-evolutions or version exclusives must be clearly marked
- Missable gifts (starters in Yellow, Lapras, Hitmonlee vs Hitmonchan, fossil choice) must use `.warn-box`
- Glitches (Mew glitch, MissingNo.) must be clearly labelled as unintended exploits

---

## Sources

| Game Series | Primary Source | Secondary Source |
|-------------|---------------|-----------------|
| Pokémon Gen I/II | Bulbapedia (specify Gen) | Serebii |
| Pokémon Gen III+ | Bulbapedia | Serebii, Smogon |
| Nintendo platformers | GameFAQs, MarioWiki | Nintendo support |
| General | Game-specific wiki | GameFAQs |
