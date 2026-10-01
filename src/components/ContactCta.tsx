import { site } from '../content/site'
import { LinkedInMark, MailIcon } from './Icons'

/** The dark "Interested in knowing more?" band from the bottom of the home page. */
export function ContactCta() {
  return (
    <section className="cta">
      <div className="container">
        <h2>Interested in knowing more?</h2>
        <p className="cta__subtitle">
          Drop me a note on <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a> or via{' '}
          <a href={`mailto:${site.email}`}>email</a>:
        </p>
        <div className="cta__icons">
          <a href={`mailto:${site.email}`} aria-label={`Email ${site.email}`}>
            <MailIcon />
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
            <LinkedInMark />
          </a>
        </div>
      </div>
    </section>
  )
}
