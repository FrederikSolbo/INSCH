import { useState, type FormEvent } from 'react'
import { site } from '../content/site'
import { LinkedInMark, MailIcon } from './Icons'

type Status = { state: 'idle' } | { state: 'sending' } | { state: 'sent' } | { state: 'error'; message: string }

type Props = {
  title?: string
  intro?: string
  tone?: 'dark' | 'light'
  /** Shown as the email subject in Formspree so you can tell which page it came from. */
  source: string
}

export function ContactForm({
  title = 'Interested in knowing more?',
  intro = "Please feel free to reach out for a conversation about unlocking your or your team's full potential. Drop me a note on LinkedIn, by mail, or in the form below.",
  tone = 'light',
  source,
}: Props) {
  const [status, setStatus] = useState<Status>({ state: 'idle' })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    data.set('_subject', `New message from insch.co (${source})`)

    setStatus({ state: 'sending' })
    try {
      const res = await fetch(site.formspree, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        form.reset()
        setStatus({ state: 'sent' })
        return
      }
      const body: { errors?: { message: string }[] } = await res.json().catch(() => ({}))
      setStatus({
        state: 'error',
        message: body.errors?.map((e) => e.message).join(', ') || 'Something went wrong. Please try again.',
      })
    } catch {
      setStatus({ state: 'error', message: 'Could not reach the server. Check your connection and try again.' })
    }
  }

  const sending = status.state === 'sending'

  return (
    <section className={`band band--${tone}`} id="contact">
      <div className="container">
        <h2 className="section-title" style={{ textAlign: 'center' }}>
          {title}
        </h2>
        <p className="form-intro">{intro}</p>

        <div className="cta__icons" style={{ marginTop: 0, marginBottom: 36 }}>
          <a href={`mailto:${site.email}`} aria-label={`Email ${site.email}`} style={{ color: 'inherit' }}>
            <MailIcon />
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" style={{ color: 'inherit' }}>
            <LinkedInMark />
          </a>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="field">
              <label htmlFor={`${source}-first`}>
                First name <span className="required">*</span>
              </label>
              <input id={`${source}-first`} name="firstName" required autoComplete="given-name" />
            </div>
            <div className="field">
              <label htmlFor={`${source}-last`}>
                Last name <span className="required">*</span>
              </label>
              <input id={`${source}-last`} name="lastName" required autoComplete="family-name" />
            </div>
          </div>

          <div className="field">
            <label htmlFor={`${source}-email`}>
              Email <span className="required">*</span>
            </label>
            {/* Formspree uses a field named "email" as the reply-to address. */}
            <input id={`${source}-email`} name="email" type="email" required autoComplete="email" />
          </div>

          <div className="field">
            <label htmlFor={`${source}-comment`}>
              Comment <span className="required">*</span>
            </label>
            <textarea id={`${source}-comment`} name="message" rows={6} required />
          </div>

          <div className="field field--check">
            <input id={`${source}-consent`} name="marketingConsent" type="checkbox" value="yes" />
            <label htmlFor={`${source}-consent`}>I agree to receiving marketing and promotional materials</label>
          </div>

          {/* Honeypot: bots fill it, humans never see it. Formspree drops submissions where it is set. */}
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />

          <button className="form-submit" type="submit" disabled={sending}>
            {sending ? 'Sending…' : 'Submit'}
          </button>

          <div aria-live="polite">
            {status.state === 'sent' ? (
              <p className="form-status">Thank you. Your message has been sent.</p>
            ) : null}
            {status.state === 'error' ? (
              <p className="form-status form-status--error">{status.message}</p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  )
}
