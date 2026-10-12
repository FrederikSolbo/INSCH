import { coaching, images } from '../content/site'
import { PageHero } from '../components/PageHero'
import { ContactForm } from '../components/ContactForm'

/** Testimonials grouped by kind, in first-appearance order, one column per kind. */
const testimonialGroups = [
  ...coaching.testimonials
    .reduce(
      (groups, t) => groups.set(t.kind, [...(groups.get(t.kind) ?? []), t]),
      new Map<string, typeof coaching.testimonials>(),
    )
    .entries(),
]

export default function Coaching() {
  return (
    <>
      <PageHero title="Team & Business Coaching" image={images.hero.coaching} />

      <section className="band band--dark">
        <div className="container">
          <h2 className="why__title">{coaching.why}</h2>
          <blockquote className="pullquote">
            <p>“{coaching.quote.text}”</p>
            <footer>{coaching.quote.source}</footer>
          </blockquote>

          <div className="columns why__pillars">
            {coaching.pillars.map((pillar) => (
              <div key={pillar.title}>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </div>
            ))}
          </div>

          <h3 className="why__subtitle">{coaching.sustainable.title}</h3>
          {coaching.sustainable.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="aside">{coaching.sustainable.aside}</p>
        </div>
      </section>

      <section className="band band--light">
        <div className="container about">
          <h2 className="about__title">{coaching.about.title}</h2>
          {coaching.about.lead.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {[...coaching.about.sections, coaching.about.closing].map((section) => (
            <div className="about__section" key={section.title}>
              <h3 className="about__heading">{section.title}</h3>
              <p>{section.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="band band--dark">
        <div className="container">
          <h2 className="testimonials__title">Testimonials</h2>
          <div className="testimonials">
            {testimonialGroups.map(([kind, items]) => (
              <div className="testimonial-group" key={kind}>
                <h3 className="testimonial__kind">{kind}</h3>
                {items.map((t) => (
                  <blockquote className="testimonial" key={t.author} lang={t.lang}>
                    {t.quotes.map((q, i) => (
                      <p key={q}>
                        {i === 0 && '“'}
                        {q}
                        {i === t.quotes.length - 1 && '”'}
                      </p>
                    ))}
                    <footer>
                      {t.author}, {t.role}
                    </footer>
                  </blockquote>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactForm source="coaching" />
    </>
  )
}
