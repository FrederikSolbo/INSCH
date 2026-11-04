import { consultancy, images, sections } from '../content/site'
import { Section } from '../components/Section'
import { Slideshow } from '../components/Slideshow'

export function Consultancy() {
  const { strategy } = consultancy

  return (
    <Section {...sections.consultancy}>
      <div className="prose">
        <h3 className="subhead">{consultancy.help}</h3>
        <p className="prose-large">{consultancy.lead}</p>
      </div>

      <img
        className="feature-image"
        src={images.hero.consultancy}
        alt="Hand-drawn business strategy sketches around a cup of coffee"
        width={2280}
        height={1667}
        loading="lazy"
      />

      <ol className="pillars">
        {consultancy.services.map((service) => (
          <li key={service.title}>
            <h4>{service.title}</h4>
            <p>{service.body}</p>
          </li>
        ))}
      </ol>

      <div className="block">
        <h3 className="subhead">{strategy.title}</h3>
        <p className="prose">{strategy.intro}</p>
        <dl className="points">
          {strategy.points.map((point) => (
            <div key={point.term}>
              <dt>{point.term}</dt>
              <dd>{point.body}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Slideshow title={consultancy.intro.title} slides={consultancy.intro.slides} />

      <div className="block">
        <h3 className="subhead">Testimonials</h3>
        <div className="quotes">
          {consultancy.testimonials.map((t) => (
            <figure className="quote-card quote-card--client" key={t.author}>
              <img
                className="quote-card__logo"
                src={t.logo}
                alt={t.company?.name ?? ''}
                width={400}
                height={400}
                loading="lazy"
              />
              <blockquote>
                <p>{t.quote}</p>
              </blockquote>
              <figcaption>
                <strong>
                  {t.authorHref ? (
                    <a href={t.authorHref} target="_blank" rel="noreferrer">
                      {t.author}
                    </a>
                  ) : (
                    t.author
                  )}
                </strong>
                <br />
                {t.role}
                {t.company && (
                  <>
                    {' at '}
                    <a href={t.company.href} target="_blank" rel="noreferrer">
                      {t.company.name}
                    </a>
                  </>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  )
}
