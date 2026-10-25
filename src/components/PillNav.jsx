import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'



const VARS = {
  // Colours (dark glass theme)
  '--pn-surface': 'rgba(38, 35, 46, 0.66)',
  '--pn-blur': 'blur(20px) saturate(1.6)',
  '--pn-edge': 'rgba(255, 255, 255, 0.08)',
  '--pn-rim': 'rgba(255, 255, 255, 0.07)',
  '--pn-shadow': '0 22px 44px -20px rgba(0, 0, 0, 0.8), 0 6px 16px -8px rgba(0, 0, 0, 0.5)',
  '--pn-text': 'rgba(244, 244, 245, 0.64)',
  '--pn-strong': '#f4f4f5',
  '--pn-pill': 'linear-gradient(180deg, #ffffff 0%, #ebebf0 100%)',
  '--pn-pill-ink': '#121016',
  '--pn-pill-shadow': 'inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 6px 16px -6px rgba(0, 0, 0, 0.6)',
  '--pn-dot': '#f4f4f5',
  '--pn-ring': 'rgba(244, 244, 245, 0.55)',
  '--pn-row-hover': 'rgba(255, 255, 255, 0.06)',
  // Sizes
  '--pn-h': '44px',
  '--pn-pad': '4px',
  '--pn-inner': '36px',
  '--pn-x': '16px',
  '--pn-font': '14px',
  '--pn-gap': '8px',
  '--pn-mark': '22px',
}

const ROOT =
  'group/nav relative inline-flex max-w-full items-center gap-[var(--pn-gap)] text-[length:var(--pn-font)] leading-none [-webkit-tap-highlight-color:transparent] [--pn-roll:calc(var(--pn-inner)/2_+_0.7em)] data-[collapsed]:flex data-[collapsed]:w-full data-[collapsed]:justify-between'
const SURFACE =
  '[background:var(--pn-surface)] [box-shadow:var(--pn-shadow)] [-webkit-backdrop-filter:var(--pn-blur)] [backdrop-filter:var(--pn-blur)]'
const RIM =
  'pointer-events-none absolute inset-0 z-[4] rounded-[inherit] [box-shadow:inset_0_0_0_1px_var(--pn-edge),inset_0_1px_0_var(--pn-rim)]'
const LOGO = 'relative z-[2] inline-grid h-[var(--pn-h)] w-[var(--pn-h)] flex-none place-items-center rounded-full'
const LOGO_LINK =
  'absolute inset-0 grid place-items-center rounded-[inherit] text-[var(--pn-strong)] no-underline outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--pn-ring)]'
const MARK =
  'grid h-[var(--pn-mark)] w-[var(--pn-mark)] place-items-center [&_img]:block [&_img]:h-full [&_img]:w-full [&_img]:object-contain'
const BAR = 'relative z-[1] box-border flex h-[var(--pn-h)] min-w-0 items-center rounded-full p-[var(--pn-pad)]'
const TRACK = 'relative h-full'
const LIST = 'm-0 flex h-full list-none items-stretch gap-[2px] p-0'
const SLOT = 'group/slot flex'
const ITEM =
  'relative isolate inline-flex h-full cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap rounded-full border-0 px-[var(--pn-x)] [background:none] [font-family:inherit] [font-size:inherit] [line-height:inherit] font-medium tracking-[-0.005em] text-[var(--pn-text)] no-underline outline-none transition-[color] duration-[250ms] ease-[ease] group-data-[hover]/slot:text-[var(--pn-strong)] aria-[current=page]:text-[var(--pn-strong)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color:var(--pn-ring)] motion-reduce:transition-none'
// Label rolls up on hover while a second copy (dark ink) rolls in from below
const FACE =
  'inline-flex items-center gap-[0.45em] transition-transform duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)] [&_svg]:h-[1.15em] [&_svg]:w-[1.15em] [&_svg]:flex-none group-data-[hover]/slot:-translate-y-[var(--pn-roll)] group-data-[hover]/slot:duration-500 motion-reduce:transition-none'
const FACE_ALT =
  'absolute inset-0 inline-flex translate-y-[var(--pn-roll)] items-center justify-center gap-[0.45em] text-[var(--pn-pill-ink)] transition-transform duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)] [&_svg]:h-[1.15em] [&_svg]:w-[1.15em] [&_svg]:flex-none group-data-[hover]/slot:translate-y-0 group-data-[hover]/slot:duration-500 motion-reduce:transition-none'
// Circle that grows up from below the item on hover
const FILL =
  'pointer-events-none absolute left-1/2 top-full z-[-1] h-[var(--pn-fill,200%)] w-[var(--pn-fill,200%)] scale-0 rounded-full [background:var(--pn-pill)] [margin:calc(var(--pn-fill,200%)/-2)_0_0_calc(var(--pn-fill,200%)/-2)] transition-transform duration-[360ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-data-[hover]/slot:scale-100 group-data-[hover]/slot:duration-[550ms] group-data-[hover]/slot:ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none'
const DOT =
  'pointer-events-none absolute bottom-[calc((var(--pn-inner)_-_var(--pn-font))/4_-_2px)] left-0 -ml-[2px] h-[4px] w-[4px] rounded-full opacity-0 [background:var(--pn-dot)] transition-[background-color] duration-300 ease-[ease] will-change-[transform,opacity] group-data-[dot-lit]/nav:[background:var(--pn-pill-ink)]'
const TOGGLE =
  'relative z-[3] inline-grid h-[var(--pn-h)] w-[var(--pn-h)] flex-none cursor-pointer place-items-center rounded-full border-0 p-0 text-[var(--pn-strong)] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--pn-ring)]'
const BURGER = 'relative h-[10px] w-[16px]'
const LINE_TOP =
  'absolute left-0 top-[1.5px] h-[1.5px] w-full rounded-[2px] bg-current transition-[top,rotate] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[open]/nav:top-[4.25px] group-data-[open]/nav:rotate-45 motion-reduce:transition-none'
const LINE_BOTTOM =
  'absolute left-0 top-[7px] h-[1.5px] w-full rounded-[2px] bg-current transition-[top,rotate] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[open]/nav:top-[4.25px] group-data-[open]/nav:-rotate-45 motion-reduce:transition-none'
const PANEL = 'absolute inset-x-0 top-0 z-[1] box-border rounded-[24px] px-[6px] pb-[6px] pt-[calc(var(--pn-h)_+_10px)]'
const MENU = 'm-0 flex list-none flex-col gap-[2px] p-0'
const ROW =
  'box-border flex h-[calc(var(--pn-h)_+_2px)] w-full cursor-pointer items-center gap-[10px] rounded-[18px] border-0 px-[16px] text-left [background:none] [font-family:inherit] text-[length:calc(var(--pn-font)_+_1px)] leading-none font-medium text-[var(--pn-strong)] no-underline outline-none transition-[background-color] duration-200 ease-[ease] [&_svg]:h-[1.15em] [&_svg]:w-[1.15em] [&_svg]:flex-none hover:[background:var(--pn-row-hover)] aria-[current=page]:[background:var(--pn-pill)] aria-[current=page]:[box-shadow:var(--pn-pill-shadow)] aria-[current=page]:text-[var(--pn-pill-ink)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color:var(--pn-ring)] motion-reduce:transition-none'
// Invisible copy of the links, used to measure whether they fit
const MEASURE = 'pointer-events-none invisible absolute left-0 top-0 flex gap-[2px]'
const MEASURE_ITEM =
  'inline-flex h-full items-center justify-center gap-[0.45em] whitespace-nowrap px-[var(--pn-x)] font-medium tracking-[-0.005em] [&_svg]:h-[1.15em] [&_svg]:w-[1.15em] [&_svg]:flex-none'

const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
const readVar = (element, name) => parseFloat(getComputedStyle(element).getPropertyValue(name)) || 0

const PillNav = ({ logo, logoAlt = 'Logo', logoHref = '/', items, activeHref, linkComponent: LinkComponent = 'a', bounce = 0.3 }) => {
  const panelId = useId()
  const rootRef = useRef(null)
  const barRef = useRef(null)
  const trackRef = useRef(null)
  const dotRef = useRef(null)
  const logoRef = useRef(null)
  const markRef = useRef(null)
  const toggleRef = useRef(null)
  const panelRef = useRef(null)
  const measureRef = useRef(null)
  const measureListRef = useRef(null)
  const slotRefs = useRef([])
  const engineRef = useRef(null)
  const introRef = useRef(true)
  const slideRef = useRef(false)
  const pendingRef = useRef(null)
  const [collapsed, setCollapsed] = useState(false)
  const [open, setOpen] = useState(false)
  const [panelShown, setPanelShown] = useState(false)

  const activeIndex = items.findIndex((item) => item.href === activeHref)

  // Latest values for the animation loop, which runs outside React renders
  const settingsRef = useRef({ activeIndex, bounce })
  useLayoutEffect(() => {
    settingsRef.current = { activeIndex, bounce: clamp(bounce, 0, 1) }
  })

  // Hover state + springy dot under the active link
  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined
    const reduce = prefersReducedMotion()
    const state = { dotX: 0, dotVelocity: 0, dotAlpha: 0, hover: -1, waiting: slideRef.current && !reduce }
    slideRef.current = false
    const rects = []
    let raf = 0
    let last = 0

    const measure = () => {
      slotRefs.current.forEach((slot, index) => {
        if (!slot) return
        rects[index] = { left: slot.offsetLeft, width: slot.offsetWidth }
        // The hover circle must be big enough to cover the whole item
        const reach = Math.ceil(2 * Math.sqrt((slot.offsetWidth / 2) ** 2 + slot.offsetHeight ** 2)) + 2
        slot.style.setProperty('--pn-fill', `${reach}px`)
      })
    }

    const sync = () => {
      slotRefs.current.forEach((slot, index) => slot?.toggleAttribute('data-hover', state.hover === index))
      root.toggleAttribute('data-dot-lit', state.hover >= 0 && state.hover === settingsRef.current.activeIndex)
    }

    const tick = (now) => {
      raf = 0
      const { activeIndex: active, bounce: springiness } = settingsRef.current
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60
      last = now
      const target = rects[active]
      let busy = false

      if (target && !state.waiting) {
        const center = target.left + target.width / 2
        if (reduce || state.dotAlpha < 0.02) {
          state.dotX = center
          state.dotVelocity = 0
        } else {
          // Damped spring, sub-stepped so it stays stable at low frame rates
          const k = 360
          const steps = Math.ceil(dt / (1 / 240))
          const h = dt / steps
          for (let i = 0; i < steps; i++) {
            state.dotVelocity += (-k * (state.dotX - center) - 2 * (1 - 0.5 * springiness) * Math.sqrt(k) * state.dotVelocity) * h
            state.dotX += state.dotVelocity * h
          }
        }
        state.dotAlpha += (1 - state.dotAlpha) * (reduce ? 1 : 1 - Math.exp(-dt / 0.1))
        busy = Math.abs(state.dotX - center) > 0.05 || Math.abs(state.dotVelocity) > 0.5 || state.dotAlpha < 0.999
      } else {
        state.dotAlpha += (0 - state.dotAlpha) * (reduce ? 1 : 1 - Math.exp(-dt / 0.1))
        if (state.dotAlpha > 0.002) busy = true
        else state.dotAlpha = 0
      }

      const dot = dotRef.current
      if (dot) {
        const pull = clamp(Math.abs(state.dotVelocity) / 700, 0, 2.2)
        dot.style.transform = `translate3d(${state.dotX}px, 0, 0) scaleX(${1 + pull})`
        dot.style.opacity = `${state.dotAlpha}`
      }
      if (busy) raf = requestAnimationFrame(tick)
    }

    const wake = () => {
      if (!raf) {
        last = 0
        raf = requestAnimationFrame(tick)
      }
    }

    const setHover = (index) => {
      state.hover = index
      sync()
      wake()
    }

    engineRef.current = {
      enter: (index, event) => event?.pointerType !== 'touch' && setHover(index),
      leave: () => setHover(-1),
      // Keyboard focus shows the same hover fill
      focus: (index, event) => event?.target?.matches?.(':focus-visible') && setHover(index),
      blur: () => setHover(-1),
      refresh: () => {
        measure()
        sync()
        wake()
      },
    }

    measure()
    sync()
    wake()

    // During the intro, wait for the bar to unroll before showing the dot
    let timer = 0
    if (state.waiting) {
      timer = window.setTimeout(() => {
        state.waiting = false
        wake()
      }, 420)
    }

    const resizeObserver = new ResizeObserver(() => {
      measure()
      wake()
    })
    if (trackRef.current) resizeObserver.observe(trackRef.current)
    document.fonts?.ready?.then(() => engineRef.current?.refresh()).catch(() => {})

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(timer)
      resizeObserver.disconnect()
      engineRef.current = null
    }
  }, [collapsed, items.length])

  // Re-measure after every render (e.g. the active page changed)
  useEffect(() => {
    engineRef.current?.refresh()
  })

  // Switch to the hamburger menu when the links don't fit next to the logo
  useLayoutEffect(() => {
    const root = rootRef.current
    const measureEl = measureRef.current
    if (!root || !measureEl) return undefined
    const evaluate = () => {
      const parent = root.parentElement
      if (!parent) return
      const styles = getComputedStyle(parent)
      const available = parent.clientWidth - (parseFloat(styles.paddingLeft) || 0) - (parseFloat(styles.paddingRight) || 0)
      const listWidth = measureListRef.current?.offsetWidth ?? 0
      const need = (logo ? readVar(root, '--pn-h') + readVar(root, '--pn-gap') : 0) + listWidth + readVar(root, '--pn-pad') * 2
      const next = need > available + 0.5
      if (introRef.current && next !== collapsed) pendingRef.current = next
      if (!next) {
        setOpen(false)
        setPanelShown(false)
      }
      setCollapsed(next)
    }
    evaluate()
    const observer = new ResizeObserver(evaluate)
    if (root.parentElement) observer.observe(root.parentElement)
    observer.observe(measureEl)
    return () => observer.disconnect()
  }, [collapsed, logo])

  // Intro: logo pops in, bar unrolls, links slide in one by one
  useLayoutEffect(() => {
    if (!rootRef.current || !introRef.current) return
    if (pendingRef.current !== null && pendingRef.current !== collapsed) return
    pendingRef.current = null
    introRef.current = false
    if (prefersReducedMotion()) return

    const pop = (element, delay) =>
      element?.animate(
        [
          { opacity: 0, transform: 'scale(0.6)' },
          { opacity: 1, transform: 'scale(1)' },
        ],
        { duration: 700, delay, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'backwards' },
      )
    pop(logoRef.current, 0)
    if (collapsed) {
      pop(toggleRef.current, 120)
      return
    }

    slideRef.current = true
    const bar = barRef.current
    if (bar) {
      const { offsetWidth: width, offsetHeight: height } = bar
      bar.animate(
        [
          { clipPath: `inset(0px ${Math.max(0, width - height)}px 0px 0px round ${height / 2}px)` },
          { clipPath: `inset(0px 0px 0px 0px round ${height / 2}px)` },
        ],
        { duration: 760, delay: 90, easing: EASE_OUT, fill: 'backwards' },
      )
    }
    slotRefs.current.forEach((slot, index) => {
      slot?.animate(
        [
          { opacity: 0, transform: 'translateX(-10px)' },
          { opacity: 1, transform: 'translateX(0)' },
        ],
        { duration: 560, delay: 200 + index * 50, easing: EASE_OUT, fill: 'backwards' },
      )
    })
  }, [collapsed])

  // Mobile menu panel open/close animation
  useLayoutEffect(() => {
    const panel = panelRef.current
    if (!panel || prefersReducedMotion()) return undefined
    const { offsetWidth: width, offsetHeight: height } = panel
    const header = toggleRef.current?.offsetHeight ?? 44
    const start = `inset(0px 0px ${Math.max(0, height - header)}px ${Math.max(0, width - header)}px round ${header / 2}px)`
    const end = 'inset(0px 0px 0px 0px round 24px)'
    const rows = panel.querySelectorAll('li')
    const running = []

    if (open) {
      running.push(panel.animate([{ clipPath: start }, { clipPath: end }], { duration: 560, easing: EASE_OUT }))
      rows.forEach((row, index) => {
        running.push(
          row.animate(
            [
              { opacity: 0, transform: 'translateY(-8px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            { duration: 420, delay: 90 + index * 40, easing: EASE_OUT, fill: 'backwards' },
          ),
        )
      })
    } else {
      const morph = panel.animate([{ clipPath: end }, { clipPath: start }], {
        duration: 380,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards',
      })
      morph.onfinish = () => setPanelShown(false)
      running.push(morph)
      rows.forEach((row) => running.push(row.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, fill: 'forwards' })))
    }

    return () => {
      running.forEach((animation) => {
        animation.onfinish = null
        animation.cancel()
      })
    }
  }, [open, panelShown])

  const closeMenu = () => {
    setOpen(false)
    // With reduced motion there's no closing animation to wait for
    if (prefersReducedMotion()) setPanelShown(false)
  }

  // Close the menu on outside tap or Esc
  useEffect(() => {
    if (!open) return undefined
    const onPointerDown = (event) => {
      if (event.target instanceof Node && rootRef.current?.contains(event.target)) return
      closeMenu()
    }
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      closeMenu()
      toggleRef.current?.focus()
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const toggleMenu = () => {
    if (open) {
      closeMenu()
    } else {
      setPanelShown(true)
      setOpen(true)
    }
  }

  // Logo spins once on hover
  const spin = (event) => {
    const mark = markRef.current
    if (!mark || event.pointerType === 'touch' || mark.getAnimations().length || prefersReducedMotion()) return
    mark.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], {
      duration: 900,
      easing: 'cubic-bezier(0.65, 0, 0.25, 1)',
    })
  }

  const face = (item) => (
    <>
      {item.icon}
      {item.label}
    </>
  )

  return (
    <nav
      ref={rootRef}
      className={ROOT}
      data-collapsed={collapsed ? '' : undefined}
      data-open={open ? '' : undefined}
      style={VARS}
      aria-label="Main"
    >
      {logo && (
        <span ref={logoRef} className={`${LOGO} ${SURFACE}`}>
          <LinkComponent href={logoHref} className={LOGO_LINK} aria-label={logoAlt} onPointerEnter={spin}>
            <span ref={markRef} className={MARK}>
              <img src={logo} alt="" draggable={false} />
            </span>
          </LinkComponent>
          <span className={RIM} />
        </span>
      )}

      {!collapsed && (
        <div ref={barRef} className={`${BAR} ${SURFACE}`}>
          <div ref={trackRef} className={TRACK} onPointerLeave={() => engineRef.current?.leave()}>
            <ul className={LIST}>
              {items.map((item, index) => (
                <li
                  key={item.href}
                  ref={(element) => {
                    slotRefs.current[index] = element
                  }}
                  className={SLOT}
                  onPointerEnter={(event) => engineRef.current?.enter(index, event)}
                  onFocus={(event) => engineRef.current?.focus(index, event)}
                  onBlur={() => engineRef.current?.blur()}
                >
                  <LinkComponent href={item.href} className={ITEM} aria-current={index === activeIndex ? 'page' : undefined}>
                    <span className={FILL} aria-hidden="true" />
                    <span className={FACE}>{face(item)}</span>
                    <span className={FACE_ALT} aria-hidden="true">
                      {face(item)}
                    </span>
                  </LinkComponent>
                </li>
              ))}
            </ul>
            <span ref={dotRef} className={DOT} aria-hidden="true" />
          </div>
          <span className={RIM} />
        </div>
      )}

      {collapsed && (
        <button
          ref={toggleRef}
          type="button"
          className={`${TOGGLE} ${SURFACE}`}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={toggleMenu}
        >
          <span className={BURGER} aria-hidden="true">
            <span className={LINE_TOP} />
            <span className={LINE_BOTTOM} />
          </span>
          <span className={RIM} />
        </button>
      )}

      {collapsed && panelShown && (
        <div ref={panelRef} id={panelId} className={`${PANEL} ${SURFACE}`}>
          <ul className={MENU}>
            {items.map((item, index) => (
              <li key={item.href}>
                <LinkComponent
                  href={item.href}
                  className={ROW}
                  aria-current={index === activeIndex ? 'page' : undefined}
                  tabIndex={open ? undefined : -1}
                  onClick={closeMenu}
                >
                  {face(item)}
                </LinkComponent>
              </li>
            ))}
          </ul>
          <span className={RIM} />
        </div>
      )}

      <div ref={measureRef} className={MEASURE} aria-hidden="true">
        <div ref={measureListRef} className={LIST}>
          {items.map((item) => (
            <span key={item.href} className={MEASURE_ITEM}>
              {face(item)}
            </span>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default PillNav
