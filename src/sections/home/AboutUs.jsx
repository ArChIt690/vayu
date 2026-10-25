// PLACEHOLDER: real About Us content comes next. The anchor is here so the drone has a spot to fly to.
const AboutUs = () => {
  return (
    <section id="about" className="relative flex min-h-svh items-center py-24">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 sm:px-8 lg:grid-cols-2">
        <div data-drone-anchor="about" data-drone-yaw="0.6" className="h-[30vh] lg:h-[60vh]" aria-hidden="true" />
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-sky-300 uppercase">01 // About Us</p>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">About Us</h2>
          <p className="mt-4 text-slate-400">Content coming soon.</p>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
