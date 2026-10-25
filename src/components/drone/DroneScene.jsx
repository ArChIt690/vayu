import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
import Drone from './Drone'
import { INTRO_DELAY, INTRO_DURATION } from './timing'

/*
  The drone lives in one fixed, full-screen canvas behind the page.
  Any section can give it a resting spot with an element like:

    <div data-drone-anchor="about" data-drone-yaw="0.6" data-drone-pitch="0.3" />

  The drone sits centred in that box (sized to fit it), and while scrolling
  between two sections it flies from one anchor's spot to the next.
*/

const DRONE_SPAN = 2.5 // rough width of the model in world units
const POSE_KEYS = ['x', 'y', 's', 'yaw', 'pitch']
const { clamp, damp, lerp, smoothstep } = THREE.MathUtils
const easeOutCubic = (t) => 1 - (1 - t) ** 3

// Screen-space anchor boxes -> world-space resting poses
const readAnchors = (viewport) => {
  const vw = window.innerWidth
  const vh = window.innerHeight

  return [...document.querySelectorAll('[data-drone-anchor]')].map((el) => {
    const a = el.getBoundingClientRect()
    const section = (el.closest('section') ?? el).getBoundingClientRect()
    // Where the anchor sits inside its section, as if that section were scrolled to the top
    const cx = a.left + a.width / 2
    const cy = clamp(a.top - section.top + a.height / 2, vh * 0.15, vh * 0.85)
    const size = Math.min(a.width, a.height) / vh

    return {
      x: (cx / vw - 0.5) * viewport.width,
      y: -(cy / vh - 0.5) * viewport.height,
      s: (size * viewport.height * 0.9) / DRONE_SPAN,
      yaw: parseFloat(el.dataset.droneYaw ?? '-0.5'),
      pitch: parseFloat(el.dataset.dronePitch ?? '0.3'),
      // Distance of the section's centre from the viewport's centre
      d: section.top + section.height / 2 - vh / 2,
    }
  })
}

// Blend between the two sections around the viewport centre
const blendAnchors = (anchors) => {
  if (!anchors.length) return null
  const next = anchors.findIndex((a) => a.d > 0)
  if (next === -1) return anchors.at(-1)
  if (next === 0) return anchors[0]

  const from = anchors[next - 1]
  const to = anchors[next]
  const t = smoothstep(-from.d / (to.d - from.d), 0, 1)
  return Object.fromEntries(POSE_KEYS.map((k) => [k, lerp(from[k], to[k], t)]))
}

const FlightRig = () => {
  const group = useRef()
  const speed = useRef(34)
  const pose = useRef(null)
  const lastX = useRef(0)
  const velocityX = useRef(0)
  const startedAt = useRef(null)
  const reduceMotion = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, [])

  useFrame((state, rawDelta) => {
    const target = blendAnchors(readAnchors(state.viewport))
    if (!target) return

    const delta = Math.min(rawDelta, 0.05)
    const t = state.clock.elapsedTime
    if (startedAt.current === null) startedAt.current = t

    // Smoothly chase the scroll-driven target pose
    if (!pose.current) pose.current = { ...target }
    const p = pose.current
    POSE_KEYS.forEach((k) => {
      p[k] = damp(p[k], target[k], 3.2, delta)
    })

    velocityX.current = damp(velocityX.current, (p.x - lastX.current) / delta, 6, delta)
    lastX.current = p.x

    // Intro: fly in from far away, top-right, banked
    const intro = reduceMotion ? 1 : clamp((t - startedAt.current - INTRO_DELAY) / INTRO_DURATION, 0, 1)
    const away = 1 - easeOutCubic(intro)

    const mouseX = reduceMotion ? 0 : state.pointer.x
    const mouseY = reduceMotion ? 0 : state.pointer.y
    const hover = reduceMotion ? 0 : Math.sin(t * 1.6) * 0.06 * p.s

    group.current.position.set(
      p.x + away * state.viewport.width * 0.9 + mouseX * 0.1,
      p.y + away * state.viewport.height * 0.9 + hover + mouseY * 0.06,
      away * -6,
    )
    group.current.rotation.set(
      p.pitch - mouseY * 0.18 + away * 0.35,
      p.yaw + mouseX * 0.35 + away * 0.9,
      clamp(-velocityX.current * 0.12, -0.5, 0.5) + Math.sin(t * 1.3) * 0.025 - away * 0.5,
    )
    group.current.scale.setScalar(p.s)

    speed.current = 34 + away * 20
  })

  return (
    <group ref={group} rotation-order="YXZ">
      <Drone speedRef={speed} />
    </group>
  )
}

const DroneScene = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 35 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true }}
        // Track the mouse across the whole page even though the canvas ignores clicks
        eventSource={document.getElementById('root')}
        eventPrefix="client"
      >
        <hemisphereLight args={['#93c5fd', '#0b1020', 0.9]} />
        <directionalLight position={[4, 6, 5]} intensity={3} />
        <directionalLight position={[-3, 2, -5]} intensity={1.6} color="#7dd3fc" />
        <pointLight position={[-3, 0.5, 3]} intensity={18} color="#38bdf8" />
        <pointLight position={[3, 0.5, -3]} intensity={18} color="#38bdf8" />

        {/* Studio reflections for the glossy carbon and metal (generated locally, no HDR download) */}
        <Environment resolution={256} frames={1}>
          <Lightformer form="rect" intensity={3} position={[0, 5, 2]} scale={[8, 3, 1]} rotation-x={Math.PI / 2} />
          <Lightformer form="rect" intensity={2} color="#7dd3fc" position={[-5, 1, -1]} scale={[3, 6, 1]} rotation-y={Math.PI / 2} />
          <Lightformer form="rect" intensity={1.5} position={[5, 1, 1]} scale={[3, 6, 1]} rotation-y={-Math.PI / 2} />
          <Lightformer form="ring" intensity={1} position={[0, 2, 6]} scale={2} />
        </Environment>

        <FlightRig />
      </Canvas>
    </div>
  )
}

export default DroneScene
