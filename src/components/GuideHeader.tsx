import { Link } from 'react-router-dom';

export interface GuideHeaderProps {
  /** Game title (required). */
  title: string;
  /** Single metadata line shown under the title, e.g. "Game Boy · Platformer · 1994". */
  platform?: string;
  /** RetroAchievements game ID; renders the RA trophy button when supplied. */
  raId?: string | number;
  /** Optional sticky top-nav bar. Prefer the sidebar layout — only use for simple guides. */
  nav?: { label: string; href: string }[];
}

/**
 * Shared page header used by every guide. Replaces the old
 * `<guide-header>` web component (see assets/guide-header.js).
 */
export default function GuideHeader({ title, platform, raId, nav }: GuideHeaderProps) {
  return (
    <>
      <header className="gh-header">
        <div className="gh-topbar">
          <Link to="/" className="gh-back">
            <i className="fa-solid fa-arrow-left" aria-hidden="true" /> Pocket Guides
          </Link>
        </div>
        <h1>{title}</h1>
        <div className="gh-header-footer">
          {platform && <p className="gh-meta">{platform}</p>}
          {raId && (
            <a
              href={`https://retroachievements.org/game/${raId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="gh-btn-ra"
            >
              <i className="fa-solid fa-trophy" aria-hidden="true" /> RetroAchievements
            </a>
          )}
        </div>
      </header>
      {nav && nav.length > 0 && (
        <nav className="gh-nav">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </>
  );
}
