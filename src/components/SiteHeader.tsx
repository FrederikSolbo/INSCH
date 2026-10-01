import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { images, nav, site } from '../content/site'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Close the mobile menu on navigation (derived-state pattern, no effect needed).
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-header__logo" aria-label={`${site.name} home`}>
          <img src={images.logo} alt={`INSCH, ${site.tagline}`} />
        </Link>

        <nav id="site-nav" className={open ? 'site-nav open' : 'site-nav'} aria-label="Primary">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
