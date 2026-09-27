import { coaching, site } from '../content/site'
import { ContactSection } from '../components/ContactSection'
import { usePageTitle } from '../usePageTitle'

export default function Coaching() {
  usePageTitle('Team & Business Coaching')

  return (
    <>
      <section className="wrap" style={{ paddingBlock: 'clamp(3rem, 8vw, 5.5rem)' }}>
        <p className="hero__eyebrow">Why team coaching?</p>
        <blockquote className="pullquote">
          <p>{coaching.quote.text}</p>
          <footer>{coaching.quote.source}</footer>
        </blockquote>
      </section>

      <section className="section section--sunk">
        <div className="wrap pillars">
          {coaching.pillars.map((pillar) => (
            <div className="pillar" key={pillar.title}>
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="wrap wrap--narrow prose">
          <h2>{coaching.sustainable.title}</h2>
          <div style={{ marginTop: '1.5rem' }}>
            {coaching.sustainable.body.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
            <p style={{ fontStyle: 'italic', color: 'var(--ink-soft)' }}>{coaching.sustainable.aside}</p>
          </div>

          <hr className="rule" />

          <h2>{coaching.about.title}</h2>
          <div className="prose--lead" style={{ marginTop: '1.5rem' }}>
            {coaching.about.lead.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          {coaching.about.sections.map((block) => (
            <div key={block.title} style={{ marginTop: '2.25rem' }}>
              <h3>{block.title}</h3>
              <p style={{ marginTop: '0.65rem', color: 'var(--ink-soft)' }}>{block.body}</p>
            </div>
          ))}

          <p style={{ marginTop: '2.25rem' }}>
            Ready to take the next step? Connect with me on{' '}
            <a href={site.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>{' '}
            or reach out via the form below to learn how I can help you and your team create sustainable strategies for
            long-term success.
          </p>
        </div>
      </section>

      <section className="section section--sunk">
        <div className="wrap">
          <div className="section-head">
            <h2>Testimonials</h2>
          </div>
          <div className="quotes">
            {coaching.testimonials.map((item) => (
              <blockquote className="quote" key={item.author} lang={'lang' in item ? item.lang : undefined}>
                <p className="quote__kind">{item.kind}</p>
                {item.quotes.map((quote) => (
                  <p key={quote.slice(0, 24)}>{quote}</p>
                ))}
                <footer>
                  {item.author}
                  <span>{item.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
