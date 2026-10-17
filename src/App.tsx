import { useEffect } from 'react'
import { AboutSection } from './components/AboutSection.tsx'
import { ContactSection } from './components/ContactSection.tsx'
import { HeroSection } from './components/HeroSection.tsx'
import { Navbar } from './components/Navbar.tsx'
import { ProjectsSection } from './components/ProjectsSection.tsx'

function App() {
  useEffect(() => {
    const targetId = window.location.hash.slice(1)
    if (!targetId) return
    document.getElementById(targetId)?.scrollIntoView()
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  )
}

export default App
