import React, { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { TextureLoader, Vector3, Group, BufferGeometry, Float32BufferAttribute, PointsMaterial, Points, Color } from "three";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

interface Skill {
  name: string;
  icon: string;
}

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

  // Create a circular orbit position
  const angle = (index / total) * Math.PI * 2;
  const initialPosition = new Vector3(
    Math.cos(angle) * orbitRadius,
    0,
    Math.sin(angle) * orbitRadius
  );

  useFrame((state) => {
    if (!mesh.current || !group.current) return;

    // Orbit animation
    const time = state.clock.elapsedTime;
    const orbitSpeed = 0.2;
    const orbitAngle = angle + time * orbitSpeed;

    group.current.position.x = Math.cos(orbitAngle) * orbitRadius;
    group.current.position.z = Math.sin(orbitAngle) * orbitRadius;

    // Always face the camera
    mesh.current.lookAt(0, 0, 0);

    // Subtle floating animation
    mesh.current.position.y = Math.sin(time * 0.5 + index) * 0.3;

    // Gentle pulsing scale
    mesh.current.scale.setScalar(1 + Math.sin(time * 2 + index) * 0.1);
  });

  return (
    <group ref={group} position={initialPosition}>
      <mesh ref={mesh}>
        <planeGeometry args={[1, 1]} />
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
  const particles = useRef<Points>(null);
  const count = 1000;

  const particleData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
      colors[i] = Math.random() * 0.5 + 0.5; // Pastel colors
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));

    const material = new PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    return { geometry, material };
  }, [count]);

  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.y += 0.001;
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
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1;
      mesh.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.5, 3]} />
      <meshStandardMaterial
        color={new Color(0x00ffff)}
        emissive={new Color(0x00ffff)}
        emissiveIntensity={0.5}
        transparent
        opacity={0.8}
        wireframe
      />
    </mesh>
  );
};

const SkillsSection = () => {
  const skillImages = [
    "https://i.ibb.co/k2qMX6Q/Vector.png",
    "https://i.ibb.co/jv7bwcfJ/Vector-1.png",
    "https://i.ibb.co/N64t3nvS/Vector-2.png",
    "https://i.ibb.co/WpWNHSVc/Vector-3.png",
    "https://i.ibb.co/YTD2mv94/Vector-4.png",
    "https://i.ibb.co/yBfcsSXh/Vector-5.png",
    "https://i.ibb.co/1JfTGyC3/Vector-6.png",
    "https://i.ibb.co/Q3rxqxMq/Vector-7.png",
    "https://i.ibb.co/7dm1nbZW/Vector-8.png",
    "https://i.ibb.co/R5vx7Nq/Vector-9.png",
    "https://i.ibb.co/N2fk0NPS/Vector-10.png",
    "https://i.ibb.co/n8wbyHbX/Vector-11.png",
    "https://i.ibb.co/7tqPpz8d/Vector-12.png",
    "https://i.ibb.co/HDn16kjL/Vector-13.png",
    "https://i.ibb.co/n8wbyHbX/Vector-11.png",
    "https://i.ibb.co/1fKQVX54/Vector-15.png",
    "https://i.ibb.co/jvqxM5By/Vector-16.png",
    "https://i.ibb.co/m5NXzZdq/Vector-17.png",
  ];

  const skills: Skill[] = skillImages.map((link, index) => ({
    name: `Skill-${index + 1}`,
    icon: link,
  }));

  return (
    <section id="skills" className="py-24 bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 to-dark-950"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-b from-purple-500/30 to-transparent blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-t from-cyan-500/30 to-transparent blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-white">Technical </span>
            <span className="text-gradient animate-glow">Skills</span>
          </h2>
          <div className="h-1 w-20 bg-neon-cyan mx-auto rounded-full mb-6"></div>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            My expertise visualized in a dynamic 3D constellation. Each technology orbits the core, representing my full-stack capabilities.
          </p>
        </div>

        <div className="w-full h-[600px] rounded-xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,255,255,0.1)]">
          <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color={0x00ffff} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color={0xa855f7} />
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={8}
              maxDistance={20}
              autoRotate
              autoRotateSpeed={0.5}
            />

            <CentralCore />
            <BackgroundParticles />

            {skills.map((skill, index) => (
              <SkillLogo
                key={skill.name}
                skill={skill}
                index={index}
                total={skills.length}
                orbitRadius={5 + Math.random() * 2} // Slightly varied orbits
              />
            ))}
          </Canvas>
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm">
            Drag to rotate • Scroll to zoom • Hover over elements for details
          </p>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;