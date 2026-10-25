import { lazy, Suspense } from 'react'
import FluxLines from '../components/FluxLines'
import Hero from '../sections/home/Hero'
import AboutUs from '../sections/home/AboutUs'
import LatestDev from '../sections/home/LatestDev'

// three.js is large, so load the 3D scene separately; the text renders without waiting for it
const DroneScene = lazy(() => import('../components/drone/DroneScene'))

const Home = () => {
  return (
    <>
      {/* Animated background, fixed behind the whole Home page */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <FluxLines />
      </div>
      <Suspense fallback={null}>
        <DroneScene />
      </Suspense>
      <main className="relative z-10">
        <Hero />
        <AboutUs />
        <LatestDev />
      </main>
    </>
  )
}

export default Home
