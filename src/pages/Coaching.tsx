import { coaching, images } from '../content/site'
import { PageHero } from '../components/PageHero'
import { ContactForm } from '../components/ContactForm'

export default function Coaching() {
  return (
    <>
      <PageHero title="Team & Business Coaching" image={images.hero.coaching} />

      <section className="band band--dark">
        <div className="container">
          <blockquote className="pullquote">
            <p>“{coaching.quote.text}”</p>
            <footer>{coaching.quote.source}</footer>
          </blockquote>
        </div>
      </section>

      <section className="band band--light">
        <div className="container columns">
          {coaching.pillars.map((pillar) => (
            <div key={pillar.title}>
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="band band--dark">
        <div className="container">
          <h2 className="section-title">{coaching.sustainable.title}</h2>
          {coaching.sustainable.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="aside">{coaching.sustainable.aside}</p>
        </div>
      </section>

      <section className="band band--light">
        <div className="container">
          <h2 className="section-title">{coaching.about.title}</h2>
          {coaching.about.lead.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {coaching.about.sections.map((section) => (
            <div className="subsection" key={section.title}>
              <h3>{section.title}</h3>
              <p>{section.body}</p>
            </div>
          ))}
          <p className="subsection">{coaching.about.closing}</p>
        </div>
      </section>

      <section className="band band--dark">
        <div className="container">
          <h2 className="section-title">Testimonials</h2>
          <div className="testimonials">
            {coaching.testimonials.map((t) => (
              <blockquote className="testimonial" key={t.author} lang={t.lang}>
                <p className="testimonial__kind">{t.kind}</p>
                {t.quotes.map((q) => (
                  <p key={q}>{q}</p>
                ))}
                <footer>
                  {t.author}
                  <span>{t.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <ContactForm source="coaching" />
    </>
  )
}
