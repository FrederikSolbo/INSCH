import { useState, type FormEvent } from 'react'
import { site } from '../content/site'

type Values = {
  first: string
  last: string
  email: string
  comment: string
  consent: boolean
}

const empty: Values = { first: '', last: '', email: '', comment: '', consent: false }

type Props = {
  title?: string
  intro?: string
}

export function ContactSection({
  title = 'Interested in knowing more?',
  intro = "Please feel free to reach out for a conversation about unlocking your or your team's full potential. Drop me a note on LinkedIn, by mail, or in the form below.",
}: Props) {
  const [values, setValues] = useState<Values>(empty)
  const [sent, setSent] = useState(false)

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
    setSent(false)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // No backend yet. Swap this for a POST to Formspree, Resend, or your own endpoint.
    console.log('contact submission', values)
    setValues(empty)
    setSent(true)
  }

  return (
    <section className="section section--sunk" id="contact">
      <div className="wrap contact">
        <div>
          <h2>{title}</h2>
          <p style={{ marginTop: '0.85rem', color: 'var(--ink-soft)' }}>{intro}</p>
          <div className="contact-lines">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.linkedin} target="_blank" rel="noreferrer">
              linkedin.com/in/ingvillsolbochristiansen
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate={false}>
          <p className="required-note">Fields marked with an asterisk are required.</p>

          <div className="field field--row">
            <div className="field" style={{ marginBottom: 0 }}>
              <label htmlFor="first">First name *</label>
              <input
                id="first"
                name="first"
                required
                autoComplete="given-name"
                value={values.first}
                onChange={(e) => update('first', e.target.value)}
              />
            </div>
            <div className="field" style={{ marginBottom: 0 }}>
              <label htmlFor="last">Last name *</label>
              <input
                id="last"
                name="last"
                required
                autoComplete="family-name"
                value={values.last}
                onChange={(e) => update('last', e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={values.email}
              onChange={(e) => update('email', e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="comment">Comment *</label>
            <textarea
              id="comment"
              name="comment"
              rows={5}
              required
              value={values.comment}
              onChange={(e) => update('comment', e.target.value)}
            />
          </div>

          <div className="field field--check">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              checked={values.consent}
              onChange={(e) => update('consent', e.target.checked)}
            />
            <label htmlFor="consent">I agree to receiving marketing and promotional materials</label>
          </div>

          <button className="button" type="submit">
            Send message
          </button>

          {sent ? (
            <p className="form-status" role="status">
              Thanks, your message is on its way. I will reply by email.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  )
}
