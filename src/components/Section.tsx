import type { ReactNode } from 'react'

type Props = {
  id: string
  title: string
  children: ReactNode
}

/**
 * A section of the page. Its title is marked with `data-line-title`, which is what the scroll line
 * underlines and turns at, so keep the title as the section's first child.
 */
export function Section({ id, title, children }: Props) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="section__title" data-line-title>
        {title}
      </h2>
      {children}
    </section>
  )
}
