import { Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import AltitudeIndicator from './components/AltitudeIndicator'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Fleet from './pages/Fleet'
import Team from './pages/Team'
import SponsorUs from './pages/SponsorUs'

const App = () => {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <Navbar />
      <AltitudeIndicator />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fleet" element={<Fleet />} />
        <Route path="/team" element={<Team />} />
        <Route path="/sponsor" element={<SponsorUs />} />
      </Routes>
      <Footer />
    </MotionConfig>
  )
}

export default App
