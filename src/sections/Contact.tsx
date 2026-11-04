import { contact, sections, site } from '../content/site'
import { Section } from '../components/Section'
import { ContactForm } from '../components/ContactForm'
import { LinkedInMark, MailIcon } from '../components/Icons'

export function Contact() {
  return (
    <Section {...sections.contact}>
      <div className="contact">
        <div>
          <p className="lead">{contact.lead}</p>
          <p>{contact.body}</p>
          <ul className="contact__links">
            <li>
              <a href={`mailto:${site.email}`}>
                <span className="contact__icon">
                  <MailIcon />
                </span>
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.linkedin} target="_blank" rel="noreferrer">
                <span className="contact__icon">
                  <LinkedInMark />
                </span>
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </Section>
  )
}
