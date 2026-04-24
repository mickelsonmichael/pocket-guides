---
name: style
description: Guides style decisions for Pocket Guides — accent colour selection, CSS variable overrides, and shared component usage. Use this skill whenever choosing accent colours, using tables, info/warn boxes, or status tags in a guide.
---

# Style Skill — Pocket Guides

Use this skill whenever you are making style decisions, choosing accent colours, or using shared CSS components in a guide.

---

## What This Skill Covers

- Which CSS variables you **may** override per-guide (accent colours only)
- Which CSS variables you **must not** override (backgrounds, surfaces, borders, text)
- How to use shared components correctly (tables, info/warn boxes, status tags, bullet lists)

---

## CSS Variable Rules

### ✅ Override these per guide (accent colours)

These variables define the game's colour identity. Override all four together in the guide's `<style>` block inside `:root {}`.

| Variable  | Purpose                                         | Default      |
|-----------|-------------------------------------------------|--------------|
| `--accent`  | Primary highlight — headings, borders, bullets | `#f4a800`    |
| `--accent2` | Secondary accent — used for warnings/tags      | `#ff4444`    |
| `--accent3` | Muted accent — h3 headings, RA button, code    | `#4fc3f7`    |
| `--glow`    | `box-shadow` / `text-shadow` glow effect        | amber glow   |

**Template:**
```css
<style>
  :root {
    --accent:  #XXXXXX;   /* primary highlight */
    --accent2: #XXXXXX;   /* secondary accent  */
    --accent3: #XXXXXX;   /* muted/dim accent  */
    --glow:    0 0 10px #XXXXXX55, 0 0 20px #XXXXXX22;
  }
  /* Guide-specific component styles below */
</style>
```

### ❌ Never override these per guide

These form the shared dark-theme foundation. Changing them would break visual consistency across guides.

| Variable     | Value     | Purpose                     |
|--------------|-----------|-----------------------------|
| `--bg`       | `#0a0c10` | Page background              |
| `--surface`  | `#111318` | Card / panel background      |
| `--surface2` | `#181c24` | Lighter surface / table rows |
| `--border`   | `#2a3040` | Borders and dividers         |
| `--text`     | `#d8dde8` | Primary text colour          |
| `--text-dim` | `#7a8599` | Muted / secondary text       |

---

## Accent Colour Palettes by Theme

Choose an accent palette that fits the game's visual identity. Keep the palette warm or cool — do not mix warm and cool hues across the three variables.

| Game theme          | `--accent`  | `--accent2` | `--accent3` |
|---------------------|-------------|-------------|-------------|
| Yellow / Pikachu    | `#f9c800`   | `#ffdd55`   | `#e69500`   |
| Orange / Fire       | `#ff7c00`   | `#ffaa44`   | `#cc5500`   |
| Cyan / Blue sci-fi  | `#4fc3f7`   | `#81d4fa`   | `#0288d1`   |
| Red / Action        | `#ff5555`   | `#ff8888`   | `#cc2222`   |
| Green / Nature      | `#66bb6a`   | `#a5d6a7`   | `#388e3c`   |
| Purple / Fantasy    | `#ce93d8`   | `#f48fb1`   | `#9c27b0`   |
| Default (no change) | `#f4a800`   | `#ff4444`   | `#4fc3f7`   |

> Keep `--accent2` notably lighter/brighter than `--accent`, and `--accent3` notably darker/dimmer than `--accent`. `--accent3` is used for subheadings and muted decorative elements.

---

## Shared Components

### Tables

Always wrap tables in `.tbl-wrap`. Never add inline styles — `site.css` handles all table styling.

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

**Provided by `site.css` automatically:**
- Dark background (`var(--surface)`) on the table
- `var(--surface2)` on `<th>` cells and alternating even rows
- `var(--accent)` colour on header text
- `var(--border)` cell borders
- Hover highlight on rows

**Only add custom styles for guide-specific columns** (e.g. a `.dex-num` class for a Pokédex number cell). Do not re-declare `border-collapse`, `font-family`, `background`, or `color` on the base `table`, `th`, or `td` elements.

### Info and Warning Boxes

```html
<div class="info-box">
  <p><strong>Tip:</strong> Useful context or optimization advice.</p>
</div>

<div class="warn-box">
  <p><strong>Missable:</strong> This item is only available before event X.</p>
</div>
```

- `.info-box` — blue left border, used for tips and neutral callouts
- `.warn-box` — amber left border, used for missable content, irreversible decisions, and bugs

### Bullet Lists

```html
<ul class="bullet-list">
  <li>First item</li>
  <li>Second item</li>
</ul>
```

### Tags / Badges

```html
<span class="tag">TAG</span>
```

For guide-specific status tags (e.g. Pokédex availability), define a `.pstatus` class in the guide's `<style>` block:

```css
.pstatus {
  display: inline-block;
  font-size: 8px;
  padding: 1px 5px;
  border-radius: 2px;
  font-family: 'Share Tech Mono', monospace;
  font-weight: bold;
  vertical-align: middle;
  white-space: nowrap;
}
.pstatus.wild   { background: #1a3d1a; color: #5dde5d; border: 1px solid #2e6e2e; }
.pstatus.gift   { background: #3d3000; color: #f9c800; border: 1px solid #7a6000; }
.pstatus.trade  { background: #3d0a0a; color: #ff6666; border: 1px solid #7a1a1a; }
/* Add more variants as needed */
```

**Consistent status colour conventions:**

| Meaning                  | Background  | Foreground      |
|--------------------------|-------------|-----------------|
| In wild / available      | dark green  | bright green    |
| Gift / event             | dark amber  | yellow          |
| Evolve only              | dark blue   | bright blue     |
| Trade required           | dark red    | red             |
| Fossil / special method  | dark purple | lavender        |
| Game Corner              | dark cyan   | cyan            |
| In-game trade            | dark orange | orange          |
| Legendary / static       | dark gold   | yellow          |

### Side Navigation (sidebar layout)

Used in guides with a sidebar instead of a sticky top-nav. Provide no `nav` attribute to `<guide-header>` and render the sidebar manually:

```html
<div class="cell large-3 show-for-large">
  <nav class="side-nav" style="position:sticky;top:20px;">
    <p class="nav-heading">// CONTENTS</p>
    <ul>
      <li><a href="#overview">Overview</a></li>
    </ul>
  </nav>
</div>
```

---

## What NOT to Do

- ❌ Do not set `background`, `font-family`, `border-collapse`, or `color` on `table`, `th`, or `td` via inline styles
- ❌ Do not override `--bg`, `--surface`, `--surface2`, `--border`, `--text`, or `--text-dim`
- ❌ Do not write a raw `<header>` element — always use `<guide-header>`
- ❌ Do not add a RetroAchievements link in the Overview `.info-box` or `<footer>` — the `<guide-header ra-id="...">` attribute renders it automatically
- ❌ Do not mix warm and cool accent colours (e.g. orange `--accent` with blue `--accent3`)
