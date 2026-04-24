export interface SideNavItem {
  href: string;
  label: string;
}

export interface SideNavProps {
  heading?: string;
  items: SideNavItem[];
}

/** Sticky sidebar nav used by most guides. */
export default function SideNav({ heading = '// CONTENTS', items }: SideNavProps) {
  return (
    <nav className="side-nav">
      <p className="nav-heading">{heading}</p>
      <ul>
        {items.map((item) => (
          <li key={item.href}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
