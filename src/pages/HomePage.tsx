import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { guides, type GuideMeta } from '../guides/registry';
import Footer from '../components/Footer';

function GameCard({ guide }: { guide: GuideMeta }) {
  return (
    <div className="cell small-6 medium-4 large-3 game-card">
      <Link to={`/games/${guide.slug}`}>
        <img src={guide.boxArt} alt={guide.alt} />
        <div className="game-card-info">
          <div className="game-card-title" dangerouslySetInnerHTML={{ __html: guide.title }} />
          <div className="game-card-meta">{guide.meta}</div>
        </div>
      </Link>
    </div>
  );
}

export default function HomePage() {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const previous = document.title;
    document.title = 'Pocket Guides';
    return () => {
      document.title = previous;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return guides;
    return guides.filter((g) => g.searchTerms.toLowerCase().includes(q));
  }, [query]);

  return (
    <>
      <header className="home-header">
        <div className="grid-container">
          <p className="site-label">Retro Game Guides</p>
          <div className="site-title-wrap">
            <img
              src={`${import.meta.env.BASE_URL}favicon.svg`}
              alt=""
              className="site-logo"
              width="40"
              height="40"
            />
            <h1 className="site-title">Pocket Guides</h1>
          </div>
          <p className="site-subtitle">Cleaned-up, searchable guides for handheld classics.</p>
        </div>
      </header>

      <main className="grid-container">
        <div className="search-wrap">
          <input
            type="search"
            id="game-search"
            placeholder="⌕ Search games..."
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <p className="section-heading">{'// GAMES'}</p>

        <div className="grid-x grid-margin-x" id="game-grid">
          {filtered.map((g) => (
            <GameCard key={g.slug} guide={g} />
          ))}
        </div>

        {filtered.length === 0 && <p id="no-results">No games match your search.</p>}
      </main>

      <Footer />
    </>
  );
}
