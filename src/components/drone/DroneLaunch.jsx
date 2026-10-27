import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Drone from './Drone'
import { DRONE_SCALE, LandingPad, PadSceneLights } from './DroneViewer'

const { damp } = THREE.MathUtils
const HOVER_HEIGHT = 1.1 // above the pad, in scene units
const CRUISE_PROP_SPEED = 34
const LIFT_AT_PROP_SPEED = 22 // props must spin up this far before the drone leaves the pad

// Parked on the pad until `launched` turns true, then: props spin up, lift off, hover
const LaunchRig = ({ launched }) => {
  const group = useRef()
  const propSpeed = useRef(0)
  const height = useRef(0)
  const reduceMotion = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, [])

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05)
    const t = state.clock.elapsedTime

    propSpeed.current = damp(propSpeed.current, launched ? CRUISE_PROP_SPEED : 0, 1.8, delta)
    const airborne = launched && (reduceMotion || propSpeed.current > LIFT_AT_PROP_SPEED)
    height.current = damp(height.current, airborne ? HOVER_HEIGHT : 0, 1.6, delta)

    // Gentle bob and drift only once it's up
    const up = height.current / HOVER_HEIGHT
    const bob = reduceMotion ? 0 : Math.sin(t * 1.6) * 0.05 * up
    group.current.position.y = height.current + bob
    group.current.rotation.z = reduceMotion ? 0 : Math.sin(t * 1.3) * 0.03 * up
    group.current.rotation.x = reduceMotion ? 0 : Math.sin(t * 0.9) * 0.02 * up
  })

  return (
    <group ref={group}>
      <group scale={DRONE_SCALE}>
        <Drone speedRef={propSpeed} />
      </group>
    </group>
  )
}

const DroneLaunch = ({ launched }) => (
  <Canvas
    camera={{ position: [0, 1.9, 5.6], fov: 35 }}
    dpr={[1, 1.75]}
    gl={{ alpha: true, antialias: true }}
    onCreated={({ camera }) => camera.lookAt(0, 0.45, 0)}
  >
    <PadSceneLights />
    {/* Turned slightly so the drone doesn't face the camera head-on */}
    <group rotation-y={-0.5}>
      <LaunchRig launched={launched} />
      <LandingPad />
    </group>
  </Canvas>
)

export default DroneLaunch
