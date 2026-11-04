import { useEffect, useRef } from 'react'
import { home } from '../content/site'
import flower from '../assets/flower.png'
import flowerStill from '../assets/flower-still.png'

// How long the flower animation takes to draw the flower; it then stays on its last frame
const FLOWER_MS = 3720

export function Hero() {
  const flowerRef = useRef<HTMLImageElement>(null)

  // Mark the flower drawn once its animation has finished, so the scroll line only grows from a whole stalk.
  // A visitor arriving at a section further down, or who prefers reduced motion (and so gets the still
  // flower), doesn't wait for it.
  useEffect(() => {
    const img = flowerRef.current
    if (!img) return
    const wait = window.location.hash || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : FLOWER_MS
    let timer = 0
    const start = () => {
      timer = window.setTimeout(() => (img.dataset.drawn = ''), wait)
    }
    if (img.complete) start()
    else img.addEventListener('load', start, { once: true })
    return () => {
      window.clearTimeout(timer)
      img.removeEventListener('load', start)
    }
  }, [])

  return (
    <section className="hero">
      <h1>{home.title}</h1>
      {/* The scroll line grows out of this flower's stalk as the page scrolls (see ScrollLine) */}
      <picture>
        <source srcSet={flowerStill} media="(prefers-reduced-motion: reduce)" />
        <img ref={flowerRef} className="hero__flower" src={flower} alt="" width={262} height={600} data-line-flower />
      </picture>
    </section>
  )
}
