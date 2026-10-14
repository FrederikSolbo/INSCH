type Props = {
  title: string
  image: string
}

/** Full-width banner with the translucent title box, as on the live site. */
export function PageHero({ title, image }: Props) {
  return (
    <section className="hero" style={{ backgroundImage: `url(${image})` }}>
      <div className="hero__box">
        <h1>{title}</h1>
      </div>
    </section>
  )
}
