import { NavLink } from 'react-router-dom'
import { nav, site } from '../content/site'

export function SiteFooter() {
  return (
    <footer className="colophon">
      <div className="wrap colophon__inner">
        <p style={{ margin: 0 }}>{site.legal}</p>
        <nav aria-label="Footer">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
          <a href={site.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  )
}
