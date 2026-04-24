import { ReactNode } from 'react';

interface FooterProps {
  children?: ReactNode;
}

/** Shared site footer. */
export default function Footer({
  children = 'Pocket Guides — fan-made reference site. All game content belongs to respective rights holders.',
}: FooterProps) {
  return (
    <footer>
      <div className="grid-container">{children}</div>
    </footer>
  );
}
