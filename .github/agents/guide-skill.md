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
   - Copy the skeleton from an existing guide
   - Override `--accent`, `--accent2`, `--accent3`, `--glow` in `<style>` to match the game's palette
   - Add all sections from your plan with proper `id` attributes for the sidebar nav
2. **Box art**: `assets/img/<slug>-boxart.jpg` (preferred) or `<slug>-boxart.svg` (fallback)
   - **First, attempt to retrieve real box art** from these sources in order:
     1. Bulbapedia archives — file pages at `https://bulbapedia.bulbagarden.net/wiki/File:<name>.png` expose the direct image URL (e.g. `https://archives.bulbagarden.net/media/upload/…`)
     2. Serebii — check `https://www.serebii.net/<game>/` for a cover image
     3. Internet Archive — scan collections (e.g. `https://archive.org/details/<scan-set>`) often contain high-res front-of-box JPEGs
     4. Wikimedia Commons — search `https://commons.wikimedia.org/wiki/Category:<GameName>`
   - Resize the image to ≤300px wide at 85% JPEG quality before committing
   - **Only create an SVG placeholder if all download attempts fail** (DNS blocked, image not found, etc.)
   - SVG placeholder: 200×280px viewBox, game colour gradient, title text, platform badge
3. **Index card**: Add the `.game-card` div to `index.html` `#game-grid`
   - Include thorough `data-name` keywords for search

### Step 4 — Validate

- Check all nav anchors in `.side-nav` match `id` attributes in the content
- Ensure tables have consistent header styles (Press Start 2P, 7–9px, accent3 colour)
- Confirm `.warn-box` is used for missable content and irreversible choices
- Confirm glitches are described as glitches, not intended mechanics
- Check the index card renders correctly (1:1 square aspect ratio image)

---

## HTML Template

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
  <style>
    :root {
      --accent:  #REPLACE_ME;   /* primary highlight: e.g. #f9c800 for yellow */
      --accent2: #REPLACE_ME;   /* lighter variant */
      --accent3: #REPLACE_ME;   /* dim/muted accent for headings */
      --glow:    0 0 10px #COLOR55, 0 0 20px #COLOR22;
    }
    /* Add guide-specific styles here */
  </style>
</head>
<body>

<header>
  <div class="grid-container">
    <a href="../index.html" class="back-link">← All Guides</a>
    <p class="game-platform">Platform · Genre · Year</p>
    <h1 class="game-title">Game Name</h1>
    <p class="game-subtitle">Tagline or subtitle</p>
  </div>
</header>

<div class="grid-container">
  <div class="grid-x grid-margin-x">

    <!-- Sidebar -->
    <div class="cell large-3 show-for-large">
      <nav class="side-nav" style="position:sticky;top:20px;">
        <p class="nav-heading">// CONTENTS</p>
        <ul>
          <li><a href="#overview">Overview</a></li>
          <!-- Add more anchors -->
        </ul>
      </nav>
    </div>

    <!-- Main content -->
    <div class="cell large-9">

      <section id="overview">
        <h2 class="section-title">Overview</h2>
        <p>...</p>
      </section>

      <!-- Add more sections -->

    </div>
  </div>
</div>

<footer>
  <div class="grid-container">
    <p style="font-size:10px;color:var(--text-dim);">
      GAME NAME &copy; YEAR Developer / Publisher.<br>
      Fan-made reference only. Information sourced from SOURCE.
    </p>
  </div>
</footer>

</body>
</html>
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

```html
<table style="width:100%;border-collapse:collapse;font-size:11px;">
  <thead>
    <tr>
      <th style="background:var(--surface2);color:var(--accent3);font-family:'Press Start 2P',monospace;font-size:7px;padding:8px;text-align:left;border-bottom:2px solid var(--accent3);">Column</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:5px 10px;color:var(--text);">Cell content</td>
    </tr>
  </tbody>
</table>
```

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
