import { consultancy, images } from '../content/site'
import { PageHero } from '../components/PageHero'
import { ContactForm } from '../components/ContactForm'

export default function Consultancy() {
  return (
    <>
      <PageHero title="Business Consultancy" image={images.hero.consultancy} />

      <section className="band band--dark">
        <div className="container">
          <h2 className="section-title">How can I help?</h2>
          <p className="lead">{consultancy.lead}</p>
        </div>
      </section>

      <section className="band band--light">
        <div className="container columns">
          {consultancy.services.map((service) => (
            <div key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="band band--dark">
        <div className="container">
          <h2 className="section-title">{consultancy.strategy.title}</h2>
          <p>{consultancy.strategy.intro}</p>
          <dl className="terms">
            {consultancy.strategy.points.map((point) => (
              <div key={point.term}>
                <dt>{point.term}</dt>
                <dd>{point.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="band band--light">
        <div className="container">
          <h2 className="section-title">Testimonials</h2>
          <div className="testimonials">
            {consultancy.testimonials.map((t) => (
              <blockquote className="testimonial" key={t.author}>
                <p>{t.quote}</p>
                <footer>
                  {t.author}
                  <span>
                    {t.role},{' '}
                    <a href={t.company.href} target="_blank" rel="noreferrer">
                      {t.company.name}
                    </a>
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <ContactForm
        source="consultancy"
        tone="dark"
        title="Let's meet"
        intro="Interested in knowing more? Drop me a note on LinkedIn, by mail, or in the form below."
      />
    </>
  )
}
