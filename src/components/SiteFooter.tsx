import { site } from '../content/site'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>{site.legal}</p>
      </div>
    </footer>
  )
}
