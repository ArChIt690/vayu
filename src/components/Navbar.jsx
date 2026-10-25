import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import logoMark from '../assets/Home/logo-mark.png'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Fleet', to: '/fleet' },
  { label: 'Team', to: '/team' },
]

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
    <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8L12 2.5z" />
  </svg>
)

const Navbar = () => {
  const { pathname } = useLocation()
  const { scrollY, scrollYProgress } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  // Remember which page the menu was opened on, so changing page closes it
  const [menuOpenOn, setMenuOpenOn] = useState(null)
  const menuOpen = menuOpenOn === pathname

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 20))

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKeyDown = (event) => event.key === 'Escape' && setMenuOpenOn(null)
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const solid = scrolled || menuOpen

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid ? 'border-white/10 bg-night-950/85 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-8 lg:h-20">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3" aria-label="Team VAYU home">
          <img src={logoMark} alt="" className="h-6 w-auto lg:h-7" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-sm font-bold tracking-wide whitespace-nowrap text-white lg:text-base">TEAM VAYU</span>
            <span className="mt-1.5 font-mono text-[10px] tracking-[0.3em] text-slate-400">IEM KOLKATA</span>
          </span>
        </Link>

        {/* Desktop links */}
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end
                  className={({ isActive }) =>
                    `relative block border px-4 py-2 font-mono text-sm font-medium transition-colors ${
                      isActive ? 'text-white' : 'text-slate-400'
                    } border-transparent hover:border-white/15 hover:bg-white/5 hover:text-white`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-bar"
                          className="absolute -top-px left-1/2 h-0.5 w-5 -translate-x-1/2 bg-sky-400"
                          aria-hidden="true"
                        />
                      )}
                      {link.label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/sponsor"
            aria-current={pathname === '/sponsor' ? 'page' : undefined}
            className="inline-flex items-center gap-2 rounded-sm bg-sky-400 px-3 py-2.5 font-mono text-sm font-medium whitespace-nowrap text-night-950 transition hover:bg-sky-300 aria-[current=page]:ring-2 aria-[current=page]:ring-sky-200 sm:px-4"
          >
            <StarIcon />
            Sponsor Us
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMenuOpenOn(menuOpen ? null : pathname)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="grid size-10 place-items-center rounded-sm border border-white/15 text-white md:hidden"
          >
            <span className="relative block h-3 w-4" aria-hidden="true">
              <span
                className={`absolute left-0 h-px w-full bg-current transition-all duration-300 ${menuOpen ? 'top-1.5 rotate-45' : 'top-0'}`}
              />
              <span
                className={`absolute left-0 top-1.5 h-px w-full bg-current transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`absolute left-0 h-px w-full bg-current transition-all duration-300 ${menuOpen ? 'top-1.5 -rotate-45' : 'top-3'}`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drop-down panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Main"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 md:hidden"
          >
            <ul className="px-4 py-3">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-3 font-mono text-[15px] font-medium ${
                        isActive ? 'text-white' : 'text-slate-400'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className={`h-px w-4 ${isActive ? 'bg-sky-400' : 'bg-white/15'}`} aria-hidden="true" />
                        {link.label}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Scroll progress (hidden at the top, and on pages too short to scroll, where progress reads as 100%) */}
      {scrolled && (
        <motion.div
          className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-sky-400"
          style={{ scaleX: scrollYProgress }}
          aria-hidden="true"
        />
      )}
    </header>
  )
}

export default Navbar
