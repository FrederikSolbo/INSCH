import { consultancy, images } from '../content/site'
import { PageHero } from '../components/PageHero'
import { ContactForm } from '../components/ContactForm'
import { Slideshow } from '../components/Slideshow'

export default function Consultancy() {
  return (
    <>
      <PageHero title="Business Consultancy" image={images.hero.consultancy} />

      <section className="band band--dark">
        <div className="container help">
          <h2 className="help__title">How can I help?</h2>
          <p>{consultancy.lead}</p>

          {consultancy.services.map((service) => (
            <div key={service.title}>
              <h3 className="help__heading">{service.title}</h3>
              <p>{service.body}</p>
            </div>
          ))}

          <h3 className="help__heading">{consultancy.strategy.title}</h3>
          <p className="help__intro">{consultancy.strategy.intro}</p>
          <ul className="help__points">
            {consultancy.strategy.points.map((point) => (
              <li key={point.term}>
                <strong>{point.term}</strong>: {point.body}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Slideshow title={consultancy.intro.title} slides={consultancy.intro.slides} />

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
