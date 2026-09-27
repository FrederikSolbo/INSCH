import { Link } from 'react-router-dom'
import { home } from '../content/site'
import { ContactSection } from '../components/ContactSection'
import { usePageTitle } from '../usePageTitle'
import image1 from '../assets/ingvill.jpeg'

export default function Home() {
  usePageTitle('Welcome')

  return (
    <>
      <section className="wrap hero">
        <div>
          <p className="hero__eyebrow">Team &amp; Business Coaching</p>
          <h1>{home.headline}</h1>
        </div>
        <img
          className="hero__portrait"
          src={image1}
          alt="Ingvill Solbø Christiansen"
        />
      </section>

      <section className="wrap wrap--narrow prose prose--lead" style={{ paddingBottom: 'var(--section)' }}>
        {home.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </section>

      <section className="section section--sunk">
        <div className="wrap">
          <div className="section-head">
            <h2>What I do</h2>
          </div>
          <div className="cards">
            {home.cards.map((card) =>
              card.external ? (
                <a key={card.title} className="card" href={card.href} target="_blank" rel="noreferrer">
                  <img className="card__media" src={card.image} alt="" />
                  <div className="card__body">
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                    <p className="card__more">Visit Norway House Cambodia</p>
                  </div>
                </a>
              ) : (
                <Link key={card.title} className="card" to={card.href}>
                  <img className="card__media" src={card.image} alt="" />
                  <div className="card__body">
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                    <p className="card__more">Read more</p>
                  </div>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      <ContactSection
        title="Interested in knowing more?"
        intro="Drop me a note on LinkedIn or by email, and we can find a time to talk."
      />
    </>
  )
}
