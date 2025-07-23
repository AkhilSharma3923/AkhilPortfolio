"use client"

import type React from "react"
import { useRef, useEffect, useState, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Text, Float, Environment, useProgress } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import * as THREE from "three"
import { gsap } from "gsap"

// Configuration object for easy customization
const PRELOADER_CONFIG = {
  colors: {
    primary: "#0AEFFF",
    secondary: "#9B5DE5",
    accent: "#FFDE03",
    background: "#121212",
  },
  text: {
    main: "AKHIL SHARMA",
    subtitle: "Full Stack Developer",
  },
  timing: {
    minDuration: 3000, // Minimum loading time for smooth experience
    animationSpeed: 1.2,
  },
}

// Animated 3D Logo Component
const AnimatedLogo = ({ progress }: { progress: number }) => {
  const logoRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)

  // Create particle system
  const particleCount = 200
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  const sizes = new Float32Array(particleCount)

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3
    // Create particles in a sphere formation
    const radius = 2 + Math.random() * 3
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i3 + 2] = radius * Math.cos(phi)

    // Color gradient based on position
    const color = new THREE.Color()
    color.setHSL(0.5 + Math.random() * 0.3, 1, 0.5 + Math.random() * 0.3)
    colors[i3] = color.r
    colors[i3 + 1] = color.g
    colors[i3 + 2] = color.b

    sizes[i] = Math.random() * 0.1 + 0.05
  }

  useFrame((state) => {
    if (logoRef.current) {
      // Rotate logo based on progress
      logoRef.current.rotation.y = progress * Math.PI * 2
      logoRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1

      // Scale animation
      const scale = 0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      logoRef.current.scale.setScalar(scale)
    }

    if (particlesRef.current) {
      // Animate particles
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      const time = state.clock.elapsedTime

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        const originalY = positions[i3 + 1]
        positions[i3 + 1] = originalY + Math.sin(time * 2 + i * 0.1) * 0.02
        positions[i3] += Math.sin(time + i * 0.05) * 0.001
        positions[i3 + 2] += Math.cos(time + i * 0.05) * 0.001
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true

      // Rotate particle system
      particlesRef.current.rotation.y = time * 0.1
    }
  })

  return (
    <group ref={logoRef}>
      {/* Main Logo Text */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <Text
          font="/fonts/Inter-Bold.ttf"
          fontSize={0.8}
          color={PRELOADER_CONFIG.colors.primary}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor={PRELOADER_CONFIG.colors.secondary}
        >
          {PRELOADER_CONFIG.text.main}
        </Text>
      </Float>

      {/* Subtitle */}
      <Text
        font="/fonts/Inter-Regular.ttf"
        fontSize={0.2}
        color={PRELOADER_CONFIG.colors.accent}
        anchorX="center"
        anchorY="middle"
        position={[0, -1.2, 0]}
        opacity={progress * 0.8}
      >
        {PRELOADER_CONFIG.text.subtitle}
      </Text>

      {/* Particle System */}
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
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

// Progress Ring Component
const ProgressRing = ({ progress }: { progress: number }) => {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z = -Math.PI / 2 + progress * Math.PI * 2
    }
  })

  return (
    <group position={[0, -3, 0]}>
      {/* Background Ring */}
      <mesh>
        <ringGeometry args={[1.8, 2, 64]} />
        <meshBasicMaterial color={PRELOADER_CONFIG.colors.background} transparent opacity={0.3} />
      </mesh>

      {/* Progress Ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[1.8, 2, 64, undefined, 0, progress * Math.PI * 2]} />
        <meshBasicMaterial color={PRELOADER_CONFIG.colors.primary} />
      </mesh>

      {/* Glow Effect */}
      <mesh>
        <ringGeometry args={[1.7, 2.1, 64, undefined, 0, progress * Math.PI * 2]} />
        <meshBasicMaterial
          color={PRELOADER_CONFIG.colors.primary}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

// Dynamic Lighting Component
const DynamicLighting = ({ progress }: { progress: number }) => {
  const lightRef = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    if (lightRef.current) {
      // Change light color based on progress
      const hue = progress * 0.6 // From cyan to purple
      lightRef.current.color.setHSL(hue, 1, 0.5)

      // Animate light position
      lightRef.current.position.x = Math.sin(state.clock.elapsedTime) * 3
      lightRef.current.position.z = Math.cos(state.clock.elapsedTime) * 3
    }
  })

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight ref={lightRef} position={[0, 5, 5]} intensity={2} distance={20} decay={2} />
      <pointLight position={[-5, -5, -5]} intensity={1} color={PRELOADER_CONFIG.colors.secondary} />
    </>
  )
}

// Mouse Interactive Particles
const InteractiveParticles = () => {
  const { mouse, viewport } = useThree()
  const particlesRef = useRef<THREE.Points>(null)

  const particleCount = 100
  const positions = new Float32Array(particleCount * 3)
  const originalPositions = new Float32Array(particleCount * 3)

  // Initialize particles
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3
    positions[i3] = originalPositions[i3] = (Math.random() - 0.5) * 20
    positions[i3 + 1] = originalPositions[i3 + 1] = (Math.random() - 0.5) * 20
    positions[i3 + 2] = originalPositions[i3 + 2] = (Math.random() - 0.5) * 10
  }

  useFrame(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3

        // Mouse interaction
        const mouseX = (mouse.x * viewport.width) / 2
        const mouseY = (mouse.y * viewport.height) / 2

        const dx = positions[i3] - mouseX
        const dy = positions[i3 + 1] - mouseY
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 3) {
          const force = (3 - distance) / 3
          positions[i3] += (dx / distance) * force * 0.1
          positions[i3 + 1] += (dy / distance) * force * 0.1
        }

        // Return to original position
        positions[i3] += (originalPositions[i3] - positions[i3]) * 0.02
        positions[i3 + 1] += (originalPositions[i3 + 1] - positions[i3 + 1]) * 0.02
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color={PRELOADER_CONFIG.colors.accent} transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

// Loading Progress Component
const LoadingProgress = ({ progress }: { progress: number }) => {
  const [displayProgress, setDisplayProgress] = useState(0)

  useEffect(() => {
    gsap.to(
      { value: displayProgress },
      {
        value: progress,
        duration: 0.5,
        ease: "power2.out",
        onUpdate: function () {
          setDisplayProgress(Math.round(this.targets()[0].value))
        },
      },
    )
  }, [progress, displayProgress])

  return (
    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
      {/* Progress Bar */}
      <div className="w-80 h-1 bg-white/10 rounded-full mb-4 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full"
          style={{ width: `${progress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        {/* Glow effect */}
        <motion.div
          className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full blur-sm opacity-50 -mt-1"
          style={{ width: `${progress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Percentage Counter */}
      <motion.div
        className="text-2xl font-mono font-bold text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {displayProgress}%
      </motion.div>

      {/* Loading Text */}
      <motion.div
        className="text-sm text-white/60 mt-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        Loading Experience...
      </motion.div>
    </div>
  )
}

// Skip Button Component
const SkipButton = ({ onSkip }: { onSkip: () => void }) => {
  return (
    <motion.button
      className="absolute top-8 right-8 px-4 py-2 border border-white/20 rounded-full text-white/60 hover:text-white hover:border-white/40 transition-all duration-300 backdrop-blur-sm"
      onClick={onSkip}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Skip Intro
    </motion.button>
  )
}

// Main Preloader Component
interface PreloaderProps {
  onComplete: () => void
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const { active, progress: loadProgress, errors, item, loaded, total } = useProgress()

  useEffect(() => {
    // Simulate loading progress with minimum duration
    const startTime = Date.now()
    const minDuration = PRELOADER_CONFIG.timing.minDuration

    const updateProgress = () => {
      const elapsed = Date.now() - startTime
      const timeProgress = Math.min(elapsed / minDuration, 1)
      const assetProgress = total > 0 ? loaded / total : 0

      // Combine time-based and asset-based progress
      const combinedProgress = Math.max(timeProgress, assetProgress) * 100
      setProgress(combinedProgress)

      if (combinedProgress >= 100 && elapsed >= minDuration) {
        setTimeout(() => {
          setIsComplete(true)
          setTimeout(onComplete, 1000) // Allow exit animation to complete
        }, 500)
      } else {
        requestAnimationFrame(updateProgress)
      }
    }

    updateProgress()
  }, [loaded, total, onComplete])

  const handleSkip = () => {
    setIsComplete(true)
    setTimeout(onComplete, 500)
  }

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-50 bg-dark overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
        >
          <Canvas
            camera={{ position: [0, 0, 8], fov: 45 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            dpr={[1, 2]}
          >
            <Suspense fallback={null}>
              <DynamicLighting progress={progress / 100} />
              <AnimatedLogo progress={progress / 100} />
              <ProgressRing progress={progress / 100} />
              <InteractiveParticles />
              <Environment preset="night" />
            </Suspense>
          </Canvas>

          <LoadingProgress progress={progress} />
          <SkipButton onSkip={handleSkip} />

          {/* Error Display */}
          {errors.length > 0 && (
            <div className="absolute bottom-4 left-4 text-red-400 text-sm">Error loading: {errors[0]}</div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Preloader

