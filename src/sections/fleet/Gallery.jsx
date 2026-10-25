import CircularCarousel from '../../components/reactbits/CircularCarousel'
import { FLEET } from '../../data/fleet'

// Add more photos here later: { src, title, alt }
const GALLERY = FLEET.map((drone) => ({ src: drone.photo, title: drone.name, alt: `${drone.name} drone` }))

const Gallery = () => (
  <section id="gallery" className="py-20">
    <h2 className="flex items-center gap-4 font-display text-3xl font-bold tracking-tight text-white uppercase sm:text-4xl">
      <span className="h-px w-10 bg-linear-to-r from-transparent to-sky-400" aria-hidden="true" />
      Gallery
    </h2>

    <div className="mt-10 h-[520px] sm:h-[600px]">
      <CircularCarousel items={GALLERY} speed={3} cardWidth={320} autoplay="step" captions fadeColor="#000000" />
    </div>
  </section>
)

export default Gallery
