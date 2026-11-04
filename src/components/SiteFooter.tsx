import { site } from '../content/site'
import { Arrow } from './Icons'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p>{site.legal}</p>
        <a href="#top">
          Back to top <Arrow direction="up" />
        </a>
      </div>
    </footer>
  )
}
