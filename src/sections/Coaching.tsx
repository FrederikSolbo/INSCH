import { coaching, images, sections } from '../content/site'
import { Section } from '../components/Section'
import { Arrow } from '../components/Icons'

export function Coaching() {
  const { quote, sustainable, about } = coaching

  return (
    <Section {...sections.coaching}>
      <h3 className="subhead">{coaching.why}</h3>
      <figure className="pullquote">
        <blockquote>
          <p>{quote.text}</p>
        </blockquote>
        <figcaption>{quote.source}</figcaption>
      </figure>

      <img
        className="feature-image"
        src={images.hero.coaching}
        alt="A rowing crew pulling their oars in unison"
        width={2280}
        height={1667}
        loading="lazy"
      />

      <ol className="pillars">
        {coaching.pillars.map((pillar) => (
          <li key={pillar.title}>
            <h4>{pillar.title}</h4>
            <p>{pillar.body}</p>
          </li>
        ))}
      </ol>

      <div className="block prose">
        <h3 className="subhead">{sustainable.title}</h3>
        {sustainable.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p className="aside">{sustainable.aside}</p>
      </div>

      <div className="block">
        <h3 className="subhead">{about.title}</h3>
        <div className="prose">
          {about.lead.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <dl className="topics">
          {about.sections.map((section) => (
            <div key={section.title}>
              <dt>{section.title}</dt>
              <dd>{section.body}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="next-step">
        <div>
          <h3 className="subhead">{about.closing.title}</h3>
          <p>{about.closing.body}</p>
        </div>
        <a className="button" href={`#${sections.contact.id}`}>
          Get in touch <Arrow direction="down" />
        </a>
      </div>

      <div className="block">
        <h3 className="subhead">Testimonials</h3>
        <div className="quotes">
          {coaching.testimonials.map((t) => (
            <figure className="quote-card" key={t.author}>
              <p className="quote-card__kind">{t.kind}</p>
              <blockquote lang={t.lang}>
                {t.quotes.map((q) => (
                  <p key={q}>{q}</p>
                ))}
              </blockquote>
              <figcaption>
                <strong>{t.author}</strong>
                <br />
                {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  )
}
