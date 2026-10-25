// PLACEHOLDER: real Latest Dev content comes next. The anchor is here so the drone has a spot to fly to.
const LatestDev = () => {
  return (
    <section id="latest-dev" className="relative flex min-h-svh items-center py-24">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 sm:px-8 lg:grid-cols-[2fr_1fr]">
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-sky-300 uppercase">Latest Developments</p>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">Latest Dev</h2>
          <p className="mt-4 text-slate-400">Content coming soon.</p>
        </div>
        <div data-drone-anchor="latest-dev" data-drone-yaw="-1.2" data-drone-pitch="0.45" className="order-first h-[24vh] lg:order-last lg:h-[36vh]" aria-hidden="true" />
      </div>
    </section>
  )
}

export default LatestDev
