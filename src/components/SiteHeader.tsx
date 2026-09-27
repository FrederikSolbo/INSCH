import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { nav, site } from '../content/site'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // close the mobile drawer whenever the route changes
  const [lastPath, setLastPath] = useState(location.pathname)
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname)
    setOpen(false)
  }

  return (
    <header className="masthead">
      <div className="wrap masthead__inner">
        <NavLink to="/" className="brand">
          <span className="brand__mark">INSCH</span>
          <span className="brand__sub">{site.tagline}</span>
        </NavLink>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>

        <nav id="primary-nav" className={open ? 'nav is-open' : 'nav'} aria-label="Primary">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'is-active' : undefined)}
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
