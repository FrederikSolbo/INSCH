import { consultancy } from '../content/site'
import { ContactSection } from '../components/ContactSection'
import { usePageTitle } from '../usePageTitle'

export default function Consultancy() {
  usePageTitle('Business Consultancy')

  return (
    <>
      <section className="wrap" style={{ paddingBlock: 'clamp(3rem, 8vw, 5.5rem)' }}>
        <p className="hero__eyebrow">Business consultancy</p>
        <h1 style={{ maxWidth: '20ch' }}>How can I help?</h1>
        <p className="prose--lead" style={{ marginTop: '1.75rem', fontSize: '1.1875rem' }}>
          {consultancy.lead}
        </p>
      </section>

      <section className="section section--sunk">
        <div className="wrap pillars">
          {consultancy.services.map((service) => (
            <div className="pillar" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="wrap wrap--narrow">
          <h2>{consultancy.strategy.title}</h2>
          <p style={{ marginTop: '1.25rem', color: 'var(--ink-soft)' }}>{consultancy.strategy.intro}</p>
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

      <section className="section section--sunk">
        <div className="wrap">
          <div className="section-head">
            <h2>Testimonials</h2>
          </div>
          <div className="quotes">
            {consultancy.testimonials.map((item) => (
              <blockquote className="quote" key={item.author}>
                <p>{item.quote}</p>
                <footer>
                  {item.author}
                  <span>
                    {item.role},{' '}
                    <a href={item.company.href} target="_blank" rel="noreferrer">
                      {item.company.name}
                    </a>
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <ContactSection
        title="Let's meet"
        intro="Interested in knowing more? Drop me a note on LinkedIn, by email, or in the form below."
      />
    </>
  )
}
