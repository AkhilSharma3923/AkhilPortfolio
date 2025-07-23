"use client"

import type React from "react"
import { useRef, useState, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, Text3D, Environment, Html, useScroll, ScrollControls, Scroll } from "@react-three/drei"
import * as THREE from "three"

// Enhanced Floating Project Cards
const FloatingProjectCard = ({
  position,
  project,
  index,
}: {
  position: [number, number, number]
  project: any
  index: number
}) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.2

      // Hover effects
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1)
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
        meshRef.current.rotation.y = 0
      }
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[2, 1.2, 0.1]} />
        <meshStandardMaterial
          color={hovered ? "#0AEFFF" : "#2D2D2D"}
          metalness={0.8}
          roughness={0.2}
          emissive={hovered ? "#0AEFFF" : "#000000"}
          emissiveIntensity={hovered ? 0.2 : 0}
        />

        {/* Project Info Overlay */}
        <Html
          transform
          occlude
          position={[0, 0, 0.06]}
          style={{
            width: "200px",
            height: "120px",
            pointerEvents: "none",
          }}
        >
          <div className="bg-dark-200/90 backdrop-blur-sm rounded-lg p-3 text-white text-xs">
            <h3 className="font-bold text-neon-cyan mb-1">{project.title}</h3>
            <p className="text-white/70 text-[10px] leading-tight">{project.description}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {project.tags.slice(0, 3).map((tag: string, i: number) => (
                <span key={i} className="bg-neon-purple/20 px-1 py-0.5 rounded text-[8px]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Html>
      </mesh>
    </Float>
  )
}

// 3D Skill Models
const SkillModel = ({
  position,
  skill,
  index,
}: {
  position: [number, number, number]
  skill: { name: string; color: string }
  index: number
}) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5 + index
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + index) * 0.1
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position} castShadow>
        <icosahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color={skill.color}
          metalness={0.7}
          roughness={0.3}
          emissive={skill.color}
          emissiveIntensity={0.1}
        />

        {/* Skill Label */}
        <Html position={[0, -0.8, 0]} center>
          <div className="text-white text-xs font-mono bg-dark-300/80 px-2 py-1 rounded backdrop-blur-sm">
            {skill.name}
          </div>
        </Html>
      </mesh>
    </Float>
  )
}

// Advanced Particle System
const AdvancedParticleSystem = () => {
  const { mouse, viewport } = useThree()
  const particlesRef = useRef<THREE.Points>(null)

  const particleCount = 1000
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  const sizes = new Float32Array(particleCount)
  const velocities = new Float32Array(particleCount * 3)

  // Initialize particles
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3

    positions[i3] = (Math.random() - 0.5) * 50
    positions[i3 + 1] = (Math.random() - 0.5) * 50
    positions[i3 + 2] = (Math.random() - 0.5) * 50

    const color = new THREE.Color()
    color.setHSL(Math.random() * 0.3 + 0.5, 1, 0.5)
    colors[i3] = color.r
    colors[i3 + 1] = color.g
    colors[i3 + 2] = color.b

    sizes[i] = Math.random() * 0.1 + 0.05

    velocities[i3] = (Math.random() - 0.5) * 0.02
    velocities[i3 + 1] = (Math.random() - 0.5) * 0.02
    velocities[i3 + 2] = (Math.random() - 0.5) * 0.02
  }

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      const time = state.clock.elapsedTime

      // Mouse interaction
      const mouseX = (mouse.x * viewport.width) / 2
      const mouseY = (mouse.y * viewport.height) / 2

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3

        // Update positions with velocities
        positions[i3] += velocities[i3]
        positions[i3 + 1] += velocities[i3 + 1]
        positions[i3 + 2] += velocities[i3 + 2]

        // Mouse attraction
        const dx = mouseX - positions[i3]
        const dy = mouseY - positions[i3 + 1]
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 5) {
          const force = ((5 - distance) / 5) * 0.001
          velocities[i3] += dx * force
          velocities[i3 + 1] += dy * force
        }

        // Boundary wrapping
        if (positions[i3] > 25) positions[i3] = -25
        if (positions[i3] < -25) positions[i3] = 25
        if (positions[i3 + 1] > 25) positions[i3 + 1] = -25
        if (positions[i3 + 1] < -25) positions[i3 + 1] = 25
        if (positions[i3 + 2] > 25) positions[i3 + 2] = -25
        if (positions[i3 + 2] < -25) positions[i3 + 2] = 25

        // Damping
        velocities[i3] *= 0.99
        velocities[i3 + 1] *= 0.99
        velocities[i3 + 2] *= 0.99
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={particleCount} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// 3D Typography Hero
const Hero3DText = () => {
  const textRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      textRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
      <Text3D
        ref={textRef}
        font="/fonts/Inter_Bold.json"
        size={1.5}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        position={[-4, 2, 0]}
      >
        AKHIL SHARMA
        <meshStandardMaterial
          color="#0AEFFF"
          metalness={0.8}
          roughness={0.2}
          emissive="#0AEFFF"
          emissiveIntensity={0.1}
        />
      </Text3D>
    </Float>
  )
}

// Camera Controller for Scroll
const CameraController = () => {
  const { camera } = useThree()
  const scroll = useScroll()

  useFrame(() => {
    const offset = scroll.offset

    // Move camera based on scroll
    camera.position.y = -offset * 20
    camera.lookAt(0, -offset * 20, 0)
  })

  return null
}

// Main Enhanced 3D Canvas
interface Enhanced3DCanvasProps {
  projects: any[]
  skills: { name: string; color: string }[]
}

const Enhanced3DCanvas: React.FC<Enhanced3DCanvasProps> = ({ projects, skills }) => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        shadows
      >
        <Suspense fallback={null}>
          <ScrollControls pages={5} damping={0.1}>
            <Scroll>
              {/* Lighting */}
              <ambientLight intensity={0.3} />
              <pointLight position={[10, 10, 10]} intensity={1} castShadow />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9B5DE5" />

              {/* 3D Hero Text */}
              <Hero3DText />

              {/* Floating Project Cards */}
              {projects.slice(0, 6).map((project, index) => (
                <FloatingProjectCard
                  key={project.id}
                  position={[((index % 3) - 1) * 4, -5 - Math.floor(index / 3) * 3, Math.random() * 2 - 1]}
                  project={project}
                  index={index}
                />
              ))}

              {/* 3D Skill Models */}
              {skills.slice(0, 8).map((skill, index) => (
                <SkillModel
                  key={skill.name}
                  position={[
                    Math.cos((index * Math.PI) / 4) * 6,
                    -15 + Math.sin((index * Math.PI) / 4) * 2,
                    Math.sin((index * Math.PI) / 4) * 6,
                  ]}
                  skill={skill}
                  index={index}
                />
              ))}

              {/* Advanced Particle System */}
              <AdvancedParticleSystem />

              {/* Camera Controller */}
              <CameraController />
            </Scroll>
          </ScrollControls>

          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Enhanced3DCanvas
