import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { SiteHeader } from './components/SiteHeader'
import { SiteFooter } from './components/SiteFooter'
import { ScrollLine } from './components/ScrollLine'
import { Hero } from './sections/Hero'
import { Welcome } from './sections/Welcome'
import { Coaching } from './sections/Coaching'
import { Consultancy } from './sections/Consultancy'
import { Contact } from './sections/Contact'

export default function App() {
  // Wheel and trackpad scrolling glide, a little slower than the browser's own. Touch scrolling stays native,
  // and Lenis leaves scrolling alone for visitors who prefer reduced motion.
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, wheelMultiplier: 0.8 })
    return () => lenis.destroy()
  }, [])

  // The page renders after the browser has looked for the URL's #section, so jump to it here.
  useEffect(() => {
    const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)))
    if (!target) return
    const jump = () => target.scrollIntoView({ behavior: 'instant' })
    jump()
    // The web fonts can still reflow the page above the section, so jump again once they are in,
    // unless the visitor has started scrolling by then.
    const input = new AbortController()
    let pending = true
    const cancel = () => {
      pending = false
      input.abort()
    }
    for (const type of ['wheel', 'touchstart', 'keydown', 'mousedown']) {
      window.addEventListener(type, cancel, { passive: true, signal: input.signal })
    }
    document.fonts.ready.then(() => {
      if (pending) jump()
      cancel()
    })
    return cancel
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Welcome />
        <Coaching />
        <Consultancy />
        <Contact />
      </main>
      <SiteFooter />
      <ScrollLine />
    </>
  )
}
