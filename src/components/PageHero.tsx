import { useEffect } from 'react'

type Props = {
  title: string
  image: string
}

/** Full-width banner with the translucent title box, as on the live site. Also sets the tab title. */
export function PageHero({ title, image }: Props) {
  useEffect(() => {
    document.title = `${title.toUpperCase()} | INSCH APS TEAM & BUSINESS COACHING`
  }, [title])

  return (
    <section className="hero" style={{ backgroundImage: `url(${image})` }}>
      <div className="hero__box">
        <h1>{title}</h1>
      </div>
    </section>
  )
}
