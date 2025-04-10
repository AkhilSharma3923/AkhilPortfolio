
import React, { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { TextureLoader, Vector3, Color } from "three";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

interface Skill {
  name: string;
  icon: string;
}

// Icon paths for various technologies
const techIcons = [
  { name: "JavaScript", icon: "/icons/javascript.svg" },
  { name: "React", icon: "/icons/react.svg" },
  { name: "Node.js", icon: "/icons/nodejs.svg" },
  { name: "MongoDB", icon: "/public/lovable-uploads/1feb6093-86ee-446c-a1d3-b1290ea6e3ed.png" },
  { name: "Express", icon: "/icons/express.svg" },
  { name: "TypeScript", icon: "/icons/typescript.svg" },
  { name: "Next.js", icon: "/icons/next.svg" },
  { name: "Vite", icon: "/icons/vite.svg" },
  { name: "Three.js", icon: "/icons/threejs.svg" },
];

interface SkillLogoProps {
  skill: Skill;
  index: number;
  total: number;
  orbitRadius: number;
}

const SkillLogo: React.FC<SkillLogoProps> = ({ skill, index, total, orbitRadius }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const group = useRef<THREE.Group>(null);
  const texture = useMemo(() => new TextureLoader().load(skill.icon), [skill.icon]);

  // Create a more dynamic orbit position with random heights
  const angle = (index / total) * Math.PI * 2;
  const yOffset = (Math.random() - 0.5) * 5; 
  const initialPosition = new Vector3(
    Math.cos(angle) * orbitRadius,
    yOffset,
    Math.sin(angle) * orbitRadius
  );
  
  // Randomize speeds slightly for more natural movement
  const orbitSpeed = 0.1 + Math.random() * 0.1;
  const floatSpeed = 0.5 + Math.random() * 0.3;
  const rotationSpeed = 0.2 + Math.random() * 0.3;

  useFrame((state) => {
    if (!mesh.current || !group.current) return;

    // Orbit animation with variable speeds
    const time = state.clock.elapsedTime;
    const orbitAngle = angle + time * orbitSpeed;

    group.current.position.x = Math.cos(orbitAngle) * orbitRadius;
    group.current.position.z = Math.sin(orbitAngle) * orbitRadius;

    // Always face the camera
    mesh.current.lookAt(state.camera.position);

    // Subtle floating animation with unique pattern per icon
    mesh.current.position.y = Math.sin(time * floatSpeed + index) * 0.5;

    // Gentle rotation
    mesh.current.rotation.z = Math.sin(time * rotationSpeed) * 0.1;

    // Scale breathing effect
    const scale = 1 + Math.sin(time * 1 + index * 0.5) * 0.1;
    mesh.current.scale.setScalar(scale);
  });

  const iconSize = 0.8; // Smaller icon size as requested

  return (
    <group ref={group} position={initialPosition}>
      <mesh ref={mesh}>
        <planeGeometry args={[iconSize, iconSize]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={0.9}
          alphaTest={0.1}
        />
      </mesh>
    </group>
  );
};

const BackgroundParticles = () => {
  const particles = useRef<THREE.Points>(null);
  const count = 1000;

  const particleData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
      colors[i] = Math.random() * 0.3 + 0.2; // Subtle colors
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    return { geometry, material };
  }, [count]);

  useFrame((state) => {
    if (particles.current) {
      const time = state.clock.elapsedTime;
      particles.current.rotation.y = time * 0.02;
      particles.current.rotation.x = time * 0.01;
    }
  });

  return (
    <points ref={particles} geometry={particleData.geometry} material={particleData.material} />
  );
};

const CentralCore = () => {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.005;
      const pulse = Math.sin(state.clock.elapsedTime * 1.5) * 0.1 + 1;
      mesh.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1, 2]} />
      <meshStandardMaterial
        color={new Color(0x00ffff)}
        emissive={new Color(0x00ffff)}
        emissiveIntensity={0.5}
        transparent
        opacity={0.7}
        wireframe
      />
    </mesh>
  );
};

const SkillsScene = () => {
  const { camera } = useThree();
  
  // Move camera back a bit for a better view of the centered animation
  useEffect(() => {
    camera.position.set(0, 0, 13);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  const skills: Skill[] = techIcons.map((tech) => ({
    name: tech.name,
    icon: tech.icon,
  }));

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color={0x00ffff} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color={0xa855f7} />
      
      <CentralCore />
      <BackgroundParticles />

      {skills.map((skill, index) => (
        <SkillLogo
          key={skill.name}
          skill={skill}
          index={index}
          total={skills.length}
          orbitRadius={5} // Slightly smaller orbit for more centered view
        />
      ))}
    </>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 to-dark-950"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-b from-purple-500/30 to-transparent blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-t from-cyan-500/30 to-transparent blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-white">Technical </span>
            <span className="text-gradient animate-glow">Skills</span>
          </h2>
          <div className="h-1 w-20 bg-neon-cyan mx-auto rounded-full mb-6"></div>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            A constellation of technologies that I've mastered on my journey as a developer.
          </p>
        </div>

        <div className="w-full h-[600px] rounded-xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,255,255,0.1)]">
          <Canvas>
            <SkillsScene />
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={8}
              maxDistance={20}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Canvas>
        </div>

        <div className="mt-6 text-center">
          <p className="text-white/60 text-sm">
            Drag to explore • Scroll to zoom • Icons represent technologies I use
          </p>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
