import { home, images, sections } from '../content/site'
import { Section } from '../components/Section'
import { Arrow } from '../components/Icons'

export function Welcome() {
  const [lead, ...body] = home.intro

  return (
    <Section {...sections.welcome}>
      <div className="welcome">
        <img
          className="welcome__portrait"
          src={images.portrait}
          alt="Ingvill Solbø Christiansen"
          width={497}
          height={496}
          loading="lazy"
        />
        <div>
          <p className="lead">{lead}</p>
          {body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="block">
        <p className="offerings__intro">{home.offeringsIntro}</p>
        <ul className="offerings">
          {home.offerings.map((item) => (
            <li className="offering" key={item.title}>
              <img
                className="offering__image"
                src={item.image}
                alt=""
                loading="lazy"
                style={item.focus ? { objectPosition: item.focus } : undefined}
              />
              <div>
                <h3 className="offering__title">
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noreferrer' : undefined}
                  >
                    {item.title}
                    {item.external ? <span className="visually-hidden"> (opens in a new tab)</span> : null}
                  </a>
                </h3>
                <p>{item.body}</p>
              </div>
              <span className="offering__arrow" aria-hidden="true">
                <Arrow direction={item.external ? 'up-right' : 'down'} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
