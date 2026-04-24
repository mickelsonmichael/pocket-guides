import { ReactNode } from 'react';

interface BoxProps {
  children: ReactNode;
  className?: string;
}

/** Blue-tinted informational callout. */
export function InfoBox({ children, className = '' }: BoxProps) {
  return <div className={`info-box ${className}`.trim()}>{children}</div>;
}

/** Amber/orange warning callout. */
export function WarnBox({ children, className = '' }: BoxProps) {
  return <div className={`warn-box ${className}`.trim()}>{children}</div>;
}

interface TagProps {
  children: ReactNode;
  className?: string;
}

/** Small inline label/badge (e.g. status indicator on a Pokémon row). */
export function Tag({ children, className = '' }: TagProps) {
  return <span className={`tag ${className}`.trim()}>{children}</span>;
}

interface SectionTitleProps {
  children: ReactNode;
  id?: string;
}

/** `<h2>` section heading with underline. */
export function SectionTitle({ children, id }: SectionTitleProps) {
  return (
    <h2 id={id} className="section-title">
      {children}
    </h2>
  );
}

/** `<h3>` subsection heading. */
export function SubsectionTitle({ children, id }: SectionTitleProps) {
  return (
    <h3 id={id} className="subsection-title">
      {children}
    </h3>
  );
}

interface BulletListProps {
  children: ReactNode;
  className?: string;
}

/** Arrow-prefixed bullet list. */
export function BulletList({ children, className = '' }: BulletListProps) {
  return <ul className={`bullet-list ${className}`.trim()}>{children}</ul>;
}

interface TableWrapProps {
  children: ReactNode;
}

/** Horizontal-scroll wrapper required around all tables. */
export function TableWrap({ children }: TableWrapProps) {
  return <div className="tbl-wrap">{children}</div>;
}
