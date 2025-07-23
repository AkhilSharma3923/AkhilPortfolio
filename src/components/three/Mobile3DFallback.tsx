"use client"

import type React from "react"
import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import type * as THREE from "three"

// Simplified particle system for mobile
const MobileParticles = () => {
  const particlesRef = useRef<THREE.Points>(null)

  const particleCount = 200 // Reduced for mobile performance
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 20
    positions[i3 + 1] = (Math.random() - 0.5) * 20
    positions[i3 + 2] = (Math.random() - 0.5) * 10
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#0AEFFF" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

// Simple floating elements for mobile
const MobileFloatingElement = ({ position }: { position: [number, number, number] }) => {
  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.1}>
      <mesh position={position}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshBasicMaterial color="#0AEFFF" transparent opacity={0.3} />
      </mesh>
    </Float>
  )
}

const Mobile3DFallback: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 opacity-50">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{
          antialias: false, // Disabled for performance
          alpha: true,
          powerPreference: "low-power",
        }}
        dpr={1} // Fixed to 1 for mobile
      >
        <ambientLight intensity={0.5} />

        <MobileParticles />

        {/* Simple floating elements */}
        {Array.from({ length: 5 }).map((_, i) => (
          <MobileFloatingElement
            key={i}
            position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5]}
          />
        ))}
      </Canvas>
    </div>
  )
}

export default Mobile3DFallback
