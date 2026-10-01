import { Link } from 'react-router-dom'
import { home, images } from '../content/site'
import { PageHero } from '../components/PageHero'
import { ContactCta } from '../components/ContactCta'

export default function Home() {
  return (
    <>
      <PageHero title="Welcome" />

      <section className="band band--dark">
        <div className="container">
          <h1 className="intro__title">{home.title}</h1>
          <h2 className="intro__subtitle">{home.subtitle}</h2>

          <div className="intro__grid">
            <img src={images.portrait} alt="Ingvill Solbø Christiansen" />
            <div>
              {home.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="band band--light">
        <div className="container">
          {home.offerings.map((item) => (
            <article className="offering" key={item.title}>
              <h2>{item.title}</h2>
              {item.external ? (
                <>
                  <p>{item.body} Read more:</p>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    <img className="offering__image" src={item.image} alt={item.title} />
                  </a>
                </>
              ) : (
                <>
                  <p>
                    {item.body} Read more <Link to={item.href}>here</Link>.
                  </p>
                  <Link to={item.href}>
                    <img className="offering__image" src={item.image} alt={item.title} />
                  </Link>
                </>
              )}
            </article>
          ))}
        </div>
      </section>

      <ContactCta />
    </>
  )
}
