import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, useTexture, Text3D, Center, Float, PerspectiveCamera } from '@react-three/drei';
import { gsap } from 'gsap';

// Particle field component
const ParticleField = () => {
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (particlesRef.current) {
      gsap.to(particlesRef.current.rotation, {
        y: Math.PI * 2,
        duration: 60,
        repeat: -1,
        ease: 'none'
      });
    }
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position;
      const time = clock.getElapsedTime() * 0.2;
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = positions.getZ(i);
        
        // Add subtle wave motion to particles
        const waveX = Math.sin(x * 0.3 + time) * 0.1;
        const waveY = Math.cos(y * 0.3 + time) * 0.1;
        const waveZ = Math.sin(z * 0.3 + time) * 0.1;
        
        positions.setXYZ(i, x + waveX, y + waveY, z + waveZ);
      }
      
      positions.needsUpdate = true;
    }
  });

  // Create a properly typed buffer attribute
  const particlePositions = React.useMemo(() => {
    return new Float32Array([...Array(5000)].map(() => THREE.MathUtils.randFloatSpread(25)));
  }, []);

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlePositions.length / 3}
          array={particlePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        color="#0AEFFF" 
        sizeAttenuation={true} 
        transparent={true}
        opacity={0.6}
      />
    </points>
  );
};

// Interactive 3D Sphere component
const InteractiveSphere = ({ mousePosition }: { mousePosition: { x: number, y: number } }) => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame(({ clock }) => {
    if (sphereRef.current) {
      // Auto-rotation
      sphereRef.current.rotation.y += 0.005;
      
      // Mouse interaction - subtle movement based on mouse position
      if (!hovered) {
        sphereRef.current.rotation.x = THREE.MathUtils.lerp(
          sphereRef.current.rotation.x,
          mousePosition.y * 0.2,
          0.05
        );
        sphereRef.current.rotation.y = THREE.MathUtils.lerp(
          sphereRef.current.rotation.y,
          mousePosition.x * 0.2,
          0.05
        );
      }
    }
  });
  
  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <mesh
        ref={sphereRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        <sphereGeometry args={[2, 64, 64]} />
        <MeshDistortMaterial
          color="#0AEFFF"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={0.8}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  );
};

// Glowing particles that follow cursor
const CursorParticles = ({ mousePosition }: { mousePosition: { x: number, y: number } }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 50;
  
  const positions = React.useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);
  
  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const time = clock.getElapsedTime();
      const positions = particlesRef.current.geometry.attributes.position;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = positions.getZ(i);
        
        // Create a circular motion around the mouse position
        const angle = time * 0.5 + i * 0.1;
        const radius = 0.5 + Math.sin(time + i) * 0.2;
        
        positions.setXYZ(
          i,
          mousePosition.x * 5 + Math.cos(angle) * radius,
          mousePosition.y * 5 + Math.sin(angle) * radius,
          z + Math.sin(time * 0.5 + i) * 0.1
        );
      }
      
      positions.needsUpdate = true;
    }
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#0AEFFF"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

// Floating spheres component
const FloatingSpheres = () => {
  const group = useRef<THREE.Group>(null);
  
  useEffect(() => {
    if (group.current) {
      // Animate the entire group
      gsap.to(group.current.rotation, {
        y: Math.PI * 2,
        duration: 30,
        repeat: -1,
        ease: 'none'
      });
    }
  }, []);
  
  return (
    <group ref={group}>
      {[...Array(6)].map((_, index) => {
        const radius = 5 + index;
        const speed = 1 / (index + 1);
        const sphereSize = 0.1 + Math.random() * 0.3;
        const offset = Math.random() * Math.PI * 2;
        
        return (
          <AnimatedSphere 
            key={index}
            radius={radius} 
            speed={speed} 
            size={sphereSize}
            offset={offset}
            color={index % 2 === 0 ? '#0AEFFF' : '#FF00FF'}
          />
        );
      })}
    </group>
  );
};

// Animated sphere component
const AnimatedSphere = ({ radius, speed, size, offset, color }: { 
  radius: number, 
  speed: number, 
  size: number, 
  offset: number,
  color: string
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime() * speed + offset;
      meshRef.current.position.x = Math.cos(time) * radius;
      meshRef.current.position.z = Math.sin(time) * radius;
      meshRef.current.position.y = Math.sin(time * 0.5) * 2;
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
};

// Grid component
const Grid = () => {
  return (
    <gridHelper args={[30, 30, '#0AEFFF', '#0AEFFF']} position={[0, -5, 0]} />
  );
};

// Main ThreeCanvas component
interface ThreeCanvasProps {
  mousePosition: { x: number, y: number };
}

const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ mousePosition }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 75 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
      <color attach="background" args={['#0a0a0a']} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF00FF" />
      
      {/* Main interactive sphere */}
      <InteractiveSphere mousePosition={mousePosition} />
      
      {/* Cursor particles */}
      <CursorParticles mousePosition={mousePosition} />
      
      {/* Background elements */}
      <ParticleField />
      <FloatingSpheres />
      <Grid />
      
      {/* Disable orbit controls for better performance */}
      {/* <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} /> */}
    </Canvas>
  );
};

export default ThreeCanvas;