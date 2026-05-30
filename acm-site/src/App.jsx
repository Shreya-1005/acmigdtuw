import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Analytics } from "@vercel/analytics/react"
import SummerInternship2026 from './pages/SummerInternship2026'
import store             from './lib/store'
import Navbar            from './components/Navbar'
import Scene             from './components/3d/Scene'
import HeroSection       from './components/sections/HeroSection'
import AboutSection      from './components/sections/AboutSection'
import EventsSection     from './components/sections/EventsSection'
import ProjectsSection   from './components/sections/ProjectsSection'
import FacultySection    from './components/sections/FacultySection'
import TeamSection       from './components/sections/TeamSection'
import AlumniSection     from './components/sections/AlumniSection'
import CTASection        from './components/sections/CTASection'
import CustomCursor      from './components/ui/CustomCursor'
import ScrollProgress    from './components/ui/ScrollProgress'
import GameOverlay       from './components/ui/GameOverlay'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
const [currentPage, setCurrentPage] = useState(() => {
    let path = window.location.pathname

    const saved = sessionStorage.redirect
    if (saved) {
      delete sessionStorage.redirect
      window.history.replaceState(null, '', saved)
      path = saved
    }

    return path.includes('summer-workshop-2026') ? 'internship' : 'home'
  })

  useEffect(() => {
    const handleRouting = () => {
      const path = window.location.pathname
      const page = path.endsWith('summer-workshop-2026') || path.includes('summer-workshop-2026/') ? 'internship' : 'home'
      setCurrentPage(page)
    }

    window.addEventListener('popstate', handleRouting)
    return () => window.removeEventListener('popstate', handleRouting)
  }, [])

  useEffect(() => {
    const handleClick = (e) => {
      // Find the closest anchor element (handles clicks on text inside the anchor)
      const link = e.target.closest('a')
      if (!link) return
      
      const href = link.getAttribute('href') || ''
      if (href.includes('summer-workshop-2026')) {
        e.preventDefault()
        e.stopPropagation()
        
        // Update state immediately before history push
        setCurrentPage('internship')
        window.history.pushState(null, '', href)
        
        // Scroll to top when navigating
        window.scrollTo(0, 0)
      }
    }
    
    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [])

  useEffect(() => {
    if (currentPage !== 'home') return

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      store.scroll.progress = max > 0 ? window.scrollY / max : 0
      store.scroll.y        = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const onMouse = (e) => {
      store.mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2
      store.mouse.y = (e.clientY / window.innerHeight - 0.5) * -2
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('scroll',    onScroll)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize',    onResize)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [currentPage])

  if (currentPage === 'internship') {
    return <SummerInternship2026 />
  }

  return (
    <div style={{ background: '#04080f', minHeight: '100vh', overflowX: 'hidden' }}>
      <CustomCursor />
      <ScrollProgress />
      <GameOverlay />
      <Navbar />
      <Analytics />

      {/* Fixed 3D universe — pointer-events: none inside Scene */}
      <Scene />

      {/* Scrollable HTML content on top */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection />
        <AboutSection />
        <EventsSection />
        {/* <ProjectsSection /> */}
        <FacultySection />
        <TeamSection />
        <AlumniSection />
        <CTASection />
      </main>
      <Analytics />
    </div>
  )
}
