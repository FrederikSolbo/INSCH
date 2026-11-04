export function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="M3.5 6l8.5 7 8.5-7" />
    </svg>
  )
}

/** Plain "in" wordmark set in type, matching the glyph on the live site. */
export function LinkedInMark() {
  return (
    <span className="icon-in" aria-hidden="true">
      in
    </span>
  )
}

const turns = { right: 0, down: 90, left: 180, up: -90, 'up-right': -45 } as const

/** A thin arrow. Buttons and links nudge it on hover, see `.arrow--*` in index.css. */
export function Arrow({ direction = 'right' }: { direction?: keyof typeof turns }) {
  return (
    <svg
      className={`arrow arrow--${direction}`}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" transform={`rotate(${turns[direction]} 8 8)`} />
    </svg>
  )
}
