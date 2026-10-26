import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Lightformer, OrbitControls } from '@react-three/drei'
import Drone from './Drone'

// Showroom view of the same drone as on Home: slowly turns on its own, drag to rotate it yourself
const DroneViewer = () => {
  const propSpeed = useRef(34)

  return (
    <Canvas camera={{ position: [0, 1.2, 4.2], fov: 35 }} dpr={[1, 1.75]} gl={{ alpha: true, antialias: true }}>
      <hemisphereLight args={['#93c5fd', '#0b1020', 0.9]} />
      <directionalLight position={[4, 6, 5]} intensity={3} />
      <directionalLight position={[-3, 2, -5]} intensity={1.6} color="#7dd3fc" />
      <pointLight position={[-3, 0.5, 3]} intensity={18} color="#38bdf8" />

      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 5, 2]} scale={[8, 3, 1]} rotation-x={Math.PI / 2} />
        <Lightformer form="rect" intensity={2} color="#7dd3fc" position={[-5, 1, -1]} scale={[3, 6, 1]} rotation-y={Math.PI / 2} />
        <Lightformer form="rect" intensity={1.5} position={[5, 1, 1]} scale={[3, 6, 1]} rotation-y={-Math.PI / 2} />
      </Environment>

      <group scale={1.1}>
        <Drone speedRef={propSpeed} />
      </group>

      <OrbitControls
        autoRotate
        autoRotateSpeed={1.2}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
  )
}

export default DroneViewer
