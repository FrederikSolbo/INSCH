import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// The old site had a page per offering. Send those URLs, and the older Weebly ones, to the matching
// section so existing links and search results keep working. Any other path goes to the page itself.
const legacySections: Record<string, string> = {
  '/team-business-coaching': '#coaching',
  '/wwwinschco.html': '#coaching',
  '/business-consultancy': '#consultancy',
  '/business-consultancy.html': '#consultancy',
}
const { pathname, search, hash } = window.location
if (pathname !== '/') {
  window.history.replaceState(null, '', `/${search}${legacySections[pathname.replace(/\/+$/, '')] ?? hash}`)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
