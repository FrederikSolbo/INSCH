import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { SiteHeader } from './components/SiteHeader'
import { SiteFooter } from './components/SiteFooter'
import Home from './pages/Home'
import Coaching from './pages/Coaching'
import Consultancy from './pages/Consultancy'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <SiteHeader />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team-business-coaching" element={<Coaching />} />
          <Route path="/business-consultancy" element={<Consultancy />} />
          {/* Old Weebly URLs, so existing links and search results keep working */}
          <Route path="/wwwinschco.html" element={<Navigate to="/team-business-coaching" replace />} />
          <Route path="/business-consultancy.html" element={<Navigate to="/business-consultancy" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <SiteFooter />
    </>
  )
}
