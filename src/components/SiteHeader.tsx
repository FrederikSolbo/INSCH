import { useEffect, useState } from 'react'
import { images, nav, sections, site } from '../content/site'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  // Highlight the link of the section being read, and draw the header's edge once the page has moved.
  useEffect(() => {
    const ids = [...nav.map((item) => item.id), sections.contact.id]
    let frame = 0
    const update = () => {
      frame = 0
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      let id: string | null = null
      for (const candidate of ids) {
        const top = document.getElementById(candidate)?.getBoundingClientRect().top
        if (top !== undefined && (atBottom || top <= window.innerHeight * 0.4)) id = candidate
      }
      setCurrent(id)
      setScrolled(window.scrollY > 0)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className="site-header" data-scrolled={scrolled || undefined}>
      <div className="site-header__inner">
        <a href="#top" className="site-header__logo" aria-label={`${site.name} home`} onClick={close}>
          <img src={images.logo} alt={`INSCH, ${site.tagline}`} width={268} height={100} />
        </a>

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
        </button>

        <nav id="site-nav" className="site-nav" data-open={open || undefined} aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={current === item.id ? 'true' : undefined}
              onClick={close}
            >
              {item.title}
            </a>
          ))}
        </nav>

        <a className="button site-header__cta" href={`#${sections.contact.id}`} onClick={close}>
          Get in touch
        </a>
      </div>
    </header>
  )
}
