import { useState } from 'react'

type Props = {
  title: string
  slides: { src: string; alt: string }[]
}

/** Presentation viewer: one large slide, back/forward buttons and a clickable thumbnail strip. */
export function Slideshow({ title, slides }: Props) {
  const [index, setIndex] = useState(0)
  const go = (next: number) => setIndex((next + slides.length) % slides.length)

  return (
    <section className="band slideshow" aria-roledescription="carousel" aria-label={title}>
      <div className="container">
        <h2 className="slideshow__title">{title}</h2>

        <div
          className="slideshow__stage"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') go(index - 1)
            if (e.key === 'ArrowRight') go(index + 1)
          }}
        >
          {slides.map((s, i) => (
            <img
              key={s.src}
              className={i === index ? 'slideshow__slide active' : 'slideshow__slide'}
              src={s.src}
              alt={i === index ? s.alt : ''}
              aria-hidden={i !== index}
            />
          ))}
          <button
            type="button"
            className="slideshow__arrow slideshow__arrow--prev"
            onClick={() => go(index - 1)}
            aria-label="Previous slide"
          >
            <Chevron direction="left" />
          </button>
          <button
            type="button"
            className="slideshow__arrow slideshow__arrow--next"
            onClick={() => go(index + 1)}
            aria-label="Next slide"
          >
            <Chevron direction="right" />
          </button>
        </div>

        <p className="slideshow__count">
          {index + 1} / {slides.length}
        </p>

        <div className="slideshow__thumbs">
          {slides.map((s, i) => (
            <button
              type="button"
              key={s.src}
              className={i === index ? 'slideshow__thumb active' : 'slideshow__thumb'}
              onClick={() => setIndex(i)}
              aria-label={`Slide ${i + 1}: ${s.alt}`}
              aria-current={i === index}
            >
              <img src={s.src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={direction === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
    </svg>
  )
}
