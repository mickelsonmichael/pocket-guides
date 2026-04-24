// Raw HTML imports of the original guide files.
// Vite's `?raw` suffix returns the file contents as a string. This
// lets us preserve the very large existing guide bodies (tables,
// custom per-guide sections, etc.) exactly while still running them
// inside React routing with shared components.
import dkGb from '../../games/donkey-kong-gb.html?raw';
import digimon from '../../games/digimon-battle-spirit.html?raw';
import mms from '../../games/mms-minis-madness.html?raw';
import pokemonYellow from '../../games/pokemon-yellow.html?raw';
import dbz from '../../games/dbz-legendary-super-warriors.html?raw';

export interface GuideMeta {
  slug: string;
  title: string;
  platform: string;
  meta: string;
  year: number;
  searchTerms: string;
  boxArt: string;
  alt: string;
  raId: string;
  /** Raw HTML content of the original guide file. */
  html: string;
}

// Resolve the public URL for box-art assets. In Vite, files under
// /assets (outside /public) need to be imported to be included in the
// build; easier here is to treat /assets/img as copy-through via
// `public/`. We just reference them by the base-relative path.
const baseUrl = import.meta.env.BASE_URL;
const img = (name: string) => `${baseUrl}assets/img/${name}`;

export const guides: GuideMeta[] = [
  {
    slug: 'dbz-legendary-super-warriors',
    title: 'DBZ: Legendary Super Warriors',
    platform: 'Game Boy Color · RPG · Infogrames · 2002',
    meta: 'GBC · RPG · 2002',
    year: 2002,
    searchTerms: 'dragon ball z legendary super warriors game boy color rpg gbc dbz',
    boxArt: img('dbz-lsw-boxart.jpg'),
    alt: 'Dragon Ball Z: Legendary Super Warriors box art',
    raId: '5594',
    html: dbz,
  },
  {
    slug: 'mms-minis-madness',
    title: "M&M's Minis Madness",
    platform: 'Game Boy Color · Platformer · Majesco · 2000',
    meta: 'GBC · Platformer · 2000',
    year: 2000,
    searchTerms: 'm&ms mms minis madness game boy color gbc platformer 2000 candy',
    boxArt: img('mms-minis-madness-boxart.jpg'),
    alt: "M&M's Minis Madness box art",
    raId: '3625',
    html: mms,
  },
  {
    slug: 'donkey-kong-gb',
    title: 'Donkey Kong',
    platform: 'Game Boy · Platformer · Nintendo · 1994',
    meta: 'GB · Platformer · 1994',
    year: 1994,
    searchTerms: 'donkey kong game boy gb platformer nintendo dk 1994',
    boxArt: img('donkey-kong-gb-boxart.jpg'),
    alt: 'Donkey Kong Game Boy box art',
    raId: '692',
    html: dkGb,
  },
  {
    slug: 'digimon-battle-spirit',
    title: 'Digimon Battle Spirit',
    platform: 'Game Boy Advance · Fighting · Bandai / Dimps · 2002',
    meta: 'GBA · Fighting · 2002',
    year: 2002,
    searchTerms:
      'digimon battle spirit gba game boy advance fighting bandai dimps 2002 agumon guilmon renamon',
    boxArt: img('digimon-battle-spirit-boxart.jpg'),
    alt: 'Digimon Battle Spirit box art',
    raId: '5030',
    html: digimon,
  },
  {
    slug: 'pokemon-yellow',
    title: 'Pokémon Yellow',
    platform: 'Game Boy Color · RPG · Nintendo · 1999',
    meta: 'GBC · RPG · 1999',
    year: 1999,
    searchTerms:
      'pokemon yellow pikachu special edition game boy color gbc rpg nintendo 1999 gba pokedex',
    boxArt: img('pokemon-yellow-boxart.jpg'),
    alt: 'Pokémon Yellow: Special Pikachu Edition box art',
    raId: '723',
    html: pokemonYellow,
  },
];

export function findGuide(slug: string): GuideMeta | undefined {
  return guides.find((g) => g.slug === slug);
}
