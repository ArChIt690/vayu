import { lazy, Suspense } from 'react'
import FluxLines from '../components/reactbits/FluxLines'
import Hero from '../sections/home/Hero'
import AboutUs from '../sections/home/AboutUs'
import LatestDev from '../sections/home/LatestDev'

const DroneScene = lazy(() => import('../components/drone/DroneScene'))

const Home = () => {
  return (
    <>
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
