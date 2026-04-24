/**
 * <guide-header> — Pocket Guides shared header web component.
 *
 * Attributes:
 *   title      Game title text (required)
 *   platform   Single metadata line shown below the title, e.g. "Game Boy · Platformer · 1994"
 *   ra-id      RetroAchievements game ID; if provided a "RetroAchievements" button is rendered
 *   nav        JSON array of {label, href} objects for the sticky top-nav bar (omit for sidebar-nav layouts)
 *
 * Example:
 *   <guide-header
 *     title="Donkey Kong"
 *     platform="Game Boy · Platformer · Nintendo · 1994"
 *     ra-id="692"
 *     nav='[{"label":"Overview","href":"#overview"},{"label":"Controls","href":"#controls"}]'
 *   ></guide-header>
 */
class GuideHeader extends HTMLElement {
  connectedCallback() {
    const title    = this.getAttribute('title')    || '';
    const platform = this.getAttribute('platform') || '';
    const raId     = this.getAttribute('ra-id')    || '';
    const navJson  = this.getAttribute('nav')      || '';

    let navLinks = [];
    if (navJson) {
      try { navLinks = JSON.parse(navJson); } catch (err) {
        console.warn('<guide-header>: Invalid nav JSON — nav bar will not be rendered.', err.message, navJson);
      }
    }

    /* ── Header ─────────────────────────────────────────────── */
    const header = document.createElement('header');
    header.className = 'gh-header';

    // Top bar: back link (left) + action buttons (right)
    const topbar = document.createElement('div');
    topbar.className = 'gh-topbar';

    const backLink = document.createElement('a');
    backLink.href = '../index.html';
    backLink.className = 'gh-back';
    backLink.textContent = '← Pocket Guides';
    topbar.appendChild(backLink);

    const actions = document.createElement('div');
    actions.className = 'gh-actions';

    if (raId) {
      const raBtn = document.createElement('a');
      raBtn.href = `https://retroachievements.org/game/${raId}`;
      raBtn.target = '_blank';
      raBtn.rel = 'noopener noreferrer';
      raBtn.className = 'gh-btn-ra';
      raBtn.textContent = '🏆 RetroAchievements';
      actions.appendChild(raBtn);
    }

    topbar.appendChild(actions);
    header.appendChild(topbar);

    // Game title
    const h1 = document.createElement('h1');
    h1.textContent = title;
    header.appendChild(h1);

    // Single metadata line
    if (platform) {
      const meta = document.createElement('p');
      meta.className = 'gh-meta';
      meta.textContent = platform;
      header.appendChild(meta);
    }

    this.appendChild(header);

    /* ── Sticky nav bar (optional) ──────────────────────────── */
    if (navLinks.length) {
      const nav = document.createElement('nav');
      nav.className = 'gh-nav';
      navLinks.forEach(({ label, href }) => {
        const a = document.createElement('a');
        a.href = href;
        a.textContent = label;
        nav.appendChild(a);
      });
      this.appendChild(nav);
    }
  }
}

customElements.define('guide-header', GuideHeader);
