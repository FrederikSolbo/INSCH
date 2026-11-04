import { useState, type FormEvent } from 'react'
import { site } from '../content/site'
import { Arrow } from './Icons'

type Status = { state: 'idle' } | { state: 'sending' } | { state: 'sent' } | { state: 'error'; message: string }

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: 'idle' })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    data.set('_subject', 'New message from insch.co')

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
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="contact-first">
            First name <span className="required" aria-hidden="true">*</span>
          </label>
          <input id="contact-first" name="firstName" required autoComplete="given-name" />
        </div>
        <div className="field">
          <label htmlFor="contact-last">
            Last name <span className="required" aria-hidden="true">*</span>
          </label>
          <input id="contact-last" name="lastName" required autoComplete="family-name" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="contact-email">
          Email <span className="required" aria-hidden="true">*</span>
        </label>
        {/* Formspree uses a field named "email" as the reply-to address. */}
        <input id="contact-email" name="email" type="email" required autoComplete="email" />
      </div>

      <div className="field">
        <label htmlFor="contact-comment">
          Comment <span className="required" aria-hidden="true">*</span>
        </label>
        <textarea id="contact-comment" name="message" rows={6} required />
      </div>

      <div className="field field--check">
        <input id="contact-consent" name="marketingConsent" type="checkbox" value="yes" />
        <label htmlFor="contact-consent">I agree to receiving marketing and promotional materials</label>
      </div>

      {/* Honeypot: bots fill it, humans never see it. Formspree drops submissions where it is set. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />

      <button className="button" type="submit" disabled={sending}>
        {sending ? 'Sending…' : 'Send message'} <Arrow />
      </button>

      <div aria-live="polite">
        {status.state === 'sent' ? <p className="form-status">Thank you. Your message has been sent.</p> : null}
        {status.state === 'error' ? <p className="form-status form-status--error">{status.message}</p> : null}
      </div>
    </form>
  )
}
