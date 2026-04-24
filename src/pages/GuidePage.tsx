import { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import GuideHeader from '../components/GuideHeader';
import SideNav, { SideNavItem } from '../components/SideNav';
import Footer from '../components/Footer';
import type { GuideMeta } from '../guides/registry';

interface ParsedGuide {
  title: string;
  platform: string;
  raId: string;
  styleCss: string;
  navHeading: string;
  navItems: SideNavItem[];
  mainHtml: string;
  footerHtml: string;
}

/**
 * Parse a raw guide HTML string into the pieces the React layout
 * needs. The existing guides follow a consistent shape:
 *
 *   <head><style>...per-guide...</style></head>
 *   <body>
 *     <div class="grid-container">
 *       <guide-header title=".." platform=".." ra-id=".."></guide-header>
 *     </div>
 *     <div class="grid-container">
 *       <div class="grid-x grid-margin-x">
 *         <div class="cell large-3 show-for-large"><nav class="side-nav">..</nav></div>
 *         <div class="cell large-9">..main content..</div>
 *       </div>
 *     </div>
 *     <footer><div class="grid-container">..</div></footer>
 *   </body>
 *
 * We extract those pieces and re-render them with the React header +
 * sidebar components.
 */
function parseGuide(html: string, baseUrl: string): ParsedGuide {
  const doc = new DOMParser().parseFromString(html, 'text/html');

  const styleEl = doc.querySelector('head style');
  const styleCss = styleEl?.textContent ?? '';

  const gh = doc.querySelector('guide-header');
  const title = gh?.getAttribute('title') ?? '';
  const platform = gh?.getAttribute('platform') ?? '';
  const raId = gh?.getAttribute('ra-id') ?? '';

  const navItems: SideNavItem[] = Array.from(doc.querySelectorAll('.side-nav ul li a')).map(
    (a) => ({
      href: a.getAttribute('href') ?? '',
      label: a.textContent ?? '',
    }),
  );
  const navHeading = doc.querySelector('.side-nav .nav-heading')?.textContent ?? '// CONTENTS';

  const main = doc.querySelector('.cell.large-9');
  let mainHtml = main?.innerHTML ?? '';

  // Rewrite relative asset URLs (e.g. ../assets/img/foo.jpg) to the
  // Vite base URL since the images now live under /public/assets/img.
  mainHtml = mainHtml.replace(/\.\.\/assets\//g, `${baseUrl}assets/`);

  const footerEl = doc.querySelector('body > footer');
  const footerHtml = footerEl
    ? (footerEl.querySelector('.grid-container')?.innerHTML ?? footerEl.innerHTML)
    : '';

  return {
    title,
    platform,
    raId,
    styleCss,
    navHeading,
    navItems,
    mainHtml,
    footerHtml,
  };
}

interface GuidePageProps {
  guide: GuideMeta;
}

export default function GuidePage({ guide }: GuidePageProps) {
  const baseUrl = import.meta.env.BASE_URL;
  const parsed = useMemo(() => parseGuide(guide.html, baseUrl), [guide.html, baseUrl]);

  const mainRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  // Update the document title for each guide.
  useEffect(() => {
    const previous = document.title;
    document.title = `${parsed.title || guide.title} — Pocket Guides`;
    return () => {
      document.title = previous;
    };
  }, [parsed.title, guide.title]);

  // Intercept clicks on intra-page hash links so they scroll smoothly
  // without react-router trying to interpret them as route changes.
  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;

    const onClick = (ev: MouseEvent) => {
      const target = ev.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;

      if (href.startsWith('#')) {
        ev.preventDefault();
        const el = document.getElementById(href.slice(1));
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', href);
      } else if (href === '../index.html' || href === '/' || href === '') {
        ev.preventDefault();
        navigate('/');
      }
    };

    root.addEventListener('click', onClick);
    return () => root.removeEventListener('click', onClick);
  }, [navigate]);

  return (
    <>
      {parsed.styleCss && <style dangerouslySetInnerHTML={{ __html: parsed.styleCss }} />}

      <div className="grid-container">
        <GuideHeader
          title={parsed.title || guide.title}
          platform={parsed.platform || guide.platform}
          raId={parsed.raId || guide.raId || undefined}
        />
      </div>

      <div className="grid-container">
        <div className="grid-x grid-margin-x">
          {parsed.navItems.length > 0 && (
            <div className="cell large-3 show-for-large">
              <SideNav heading={parsed.navHeading} items={parsed.navItems} />
            </div>
          )}
          <div className={parsed.navItems.length > 0 ? 'cell large-9' : 'cell large-12'}>
            <div ref={mainRef} dangerouslySetInnerHTML={{ __html: parsed.mainHtml }} />
          </div>
        </div>
      </div>

      {parsed.footerHtml ? (
        <Footer>
          <div dangerouslySetInnerHTML={{ __html: parsed.footerHtml }} />
        </Footer>
      ) : (
        <Footer />
      )}
    </>
  );
}
