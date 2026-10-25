import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'

// Scroll position shown as an altitude gauge: top of the page = 0 ft, bottom = MAX_ALTITUDE
const MAX_ALTITUDE = 400
const TICK_STEP = 25
const LABEL_STEP = 100
const TICKS = Array.from({ length: MAX_ALTITUDE / TICK_STEP + 1 }, (_, i) => i * TICK_STEP)

// 250 -> ['0', '250']: leading zeros are shown faded, like a cockpit readout
const splitDigits = (value) => {
  const digits = String(Math.round(value * MAX_ALTITUDE)).padStart(4, '0')
  const firstSignificant = Math.min(digits.search(/[1-9]/) === -1 ? 3 : digits.search(/[1-9]/), 3)
  return [digits.slice(0, firstSignificant), digits.slice(firstSignificant)]
}

const AltitudeIndicator = () => {
  const { pathname } = useLocation()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 32, restDelta: 0.0005 })
  const leadingZeros = useTransform(progress, (v) => splitDigits(v)[0])
  const significant = useTransform(progress, (v) => splitDigits(v)[1])
  const level = useTransform(progress, (v) => `${v * 100}%`)
  const [scrollable, setScrollable] = useState(false)

  // Hide on pages too short to scroll
  useEffect(() => {
    const check = () => setScrollable(document.documentElement.scrollHeight > window.innerHeight + 8)
    const observer = new ResizeObserver(check)
    observer.observe(document.body)
    window.addEventListener('resize', check)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', check)
    }
  }, [pathname])

  return (
    <div
      className={`pointer-events-none fixed top-1/2 right-2 z-40 flex -translate-y-1/2 flex-col items-end gap-3 font-gauge transition-opacity duration-500 sm:right-5 ${
        scrollable ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      <span className="hidden text-[10px] font-bold tracking-[0.2em] text-sky-300 sm:block">ALT</span>

      <div className="relative h-[32vh] sm:h-[40vh]">
        {/* Tick marks, 0 at the bottom; numbers only on bigger screens */}
        {TICKS.map((ft) => {
          const major = ft % LABEL_STEP === 0
          return (
            <div
              key={ft}
              className={`absolute right-full flex translate-y-1/2 items-center gap-1.5 pr-1.5 ${major ? '' : 'max-sm:hidden'}`}
              style={{ bottom: `${(ft / MAX_ALTITUDE) * 100}%` }}
            >
              {major && <span className="hidden text-[10px] text-slate-500 tabular-nums sm:block">{ft}</span>}
              <span className={`h-px ${major ? 'w-3 bg-slate-400' : 'w-1.5 bg-slate-600'}`} />
            </div>
          )
        })}

        {/* Gauge bar filling from the bottom */}
        <div className="relative h-full w-1 overflow-hidden rounded-full bg-white/10 sm:w-1.5">
          <motion.div
            className="absolute inset-x-0 bottom-0 h-full origin-bottom rounded-full bg-linear-to-t from-sky-500 to-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.6)]"
            style={{ scaleY: progress }}
          />
        </div>

        {/* Cockpit-style readout riding on the fill level, with a pointer to the bar */}
        <motion.div className="absolute right-full flex translate-y-1/2 items-center" style={{ bottom: level }}>
          <div className="flex items-baseline gap-1 rounded-sm border border-sky-400/50 bg-night-950/85 px-1.5 py-0.5 backdrop-blur sm:px-2.5 sm:py-1">
            <span className="text-xs font-bold tabular-nums sm:text-base">
              <motion.span className="text-sky-300/30">{leadingZeros}</motion.span>
              <motion.span className="text-sky-200">{significant}</motion.span>
            </span>
            <span className="text-[9px] text-slate-400 sm:text-[10px]">FT</span>
          </div>
          <span className="h-px w-3 bg-sky-400/60 sm:w-10" />
          <span className="mr-0.5 border-y-[4px] border-l-[6px] border-y-transparent border-l-sky-400/80" />
        </motion.div>
      </div>

      <span className="hidden text-[10px] font-bold tracking-[0.2em] text-slate-500 sm:block">FT</span>
    </div>
  )
}

export default AltitudeIndicator
