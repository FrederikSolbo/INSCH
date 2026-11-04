import { useState } from 'react'
import { Arrow } from './Icons'

type Props = {
  title: string
  slides: { src: string; alt: string }[]
}

/** Presentation viewer: one large slide, back/forward buttons and a clickable thumbnail strip. */
export function Slideshow({ title, slides }: Props) {
  const [index, setIndex] = useState(0)
  const go = (next: number) => setIndex((next + slides.length) % slides.length)

  return (
    <div className="block slideshow" role="region" aria-roledescription="carousel" aria-label={title}>
      <h3 className="subhead">{title}</h3>

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
            width={1100}
            height={619}
            loading="lazy"
          />
        ))}
        <button
          type="button"
          className="slideshow__arrow slideshow__arrow--prev"
          onClick={() => go(index - 1)}
          aria-label="Previous slide"
        >
          <Arrow direction="left" />
        </button>
        <button
          type="button"
          className="slideshow__arrow slideshow__arrow--next"
          onClick={() => go(index + 1)}
          aria-label="Next slide"
        >
          <Arrow direction="right" />
        </button>
      </div>

      <div className="slideshow__bar">
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
              <img src={s.src} alt="" width={1100} height={619} loading="lazy" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
