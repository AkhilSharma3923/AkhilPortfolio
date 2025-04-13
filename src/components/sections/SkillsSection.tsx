import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture, Float, Environment, Stars, Text } from "@react-three/drei";
import * as THREE from "three";
import { Link } from 'react-scroll';

const skills = [
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", color: "#E34F26" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", color: "#1572B6" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "#F7DF1E" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "#3178C6" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "#61DAFB" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", color: "#000000" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "#68A063" },
  { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", color: "#000000" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "#47A248" },
  // { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg", color: "#06B6D4" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "#F05032" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", color: "#181717" },
  { name: "Vite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg", color: "#646CFF" },
  { name: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg", color: "#764ABC" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", color: "#F24E1E" },
];

const ThreeJSBackground = () => {
  const meshRef = useRef();
  const count = 200;
  const positions = new Float32Array(count * 3);
  
  useEffect(() => {
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }
  }, []);

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.05;
    meshRef.current.rotation.y += delta * 0.03;
  });

  return (
    <group ref={meshRef}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            itemSize={3}
            array={positions}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#61DAFB"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    </group>
  );
};

const TechCarousel = () => {
  const carouselRef = useRef();
  const [animationProgress, setAnimationProgress] = useState(0);

  useFrame((state, delta) => {
    if (carouselRef.current) {
      // Rotate the carousel
      carouselRef.current.rotation.y += delta * 0.5;
      
      // Animate the expansion from center
      if (animationProgress < 1) {
        setAnimationProgress(Math.min(animationProgress + delta * 0.5, 1));
      }
    }
  });

  return (
    <group ref={carouselRef} position={[0, 0, -10]}>
      {skills.map((skill, i) => {
        const angle = (i * Math.PI * 2) / skills.length;
        const radius = 8 * animationProgress; // Animate the radius from 0 to 8
        const height = 4 * animationProgress; // Animate the height from 0 to 4
        const depth = 8 * animationProgress; // Animate the depth from 0 to 8
        
        return (
          <Float 
            key={i} 
            speed={3} 
            rotationIntensity={0.8} 
            floatIntensity={1.5}
          >
            <mesh
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle * 0.5) * height,
                Math.sin(angle) * depth
              ]}
            >
              <sphereGeometry args={[0.6, 32, 32]} />
              <meshStandardMaterial
                color={skill.color}
                emissive={skill.color}
                emissiveIntensity={1.5}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
};


const SkillsSection = () => {
  const duplicatedSkills = Array(3).fill(skills).flat();
  
  const marqueeVariantsLeft = {
    initial: { x: 0 },
    animate: { x: `-${(duplicatedSkills.length / 2) * 100}px` },
  };
  
  const marqueeVariantsRight = {
    initial: { x: `-${(duplicatedSkills.length / 2) * 100}px` },
    animate: { x: 0 },
  };
  
  const transitionSettings = {
    repeat: Infinity,
    duration: 30,
    ease: "linear",
  };

  return (
    <section id="skills"
     className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Three.js Background */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
          <Environment preset="dawn" />
          <ThreeJSBackground />
          <TechCarousel />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Masterful Tech Stack
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
        I specialize in a powerful suite of modern technologies to deliver scalable, high-performance solutions. From intuitive frontends to robust backends, I craft exceptional digital experiences with the right tools—no overengineering, just clean, efficient, and impactful results tailored to real-world needs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link 
              to="contact" 
              smooth={true} 
              duration={500} 
              spy={true}
              offset={-80}
              className="inline-block"
            >
              <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-medium text-white shadow-lg hover:shadow-xl transition-all hover:scale-105">
                Let's Build Something
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Marquee Rows */}
        <div className="space-y-12">
          <motion.div
            className="flex py-4"
            variants={marqueeVariantsLeft}
            initial="initial"
            animate="animate"
            transition={{ ...transitionSettings, duration: transitionSettings.duration * 0.8 }}
            style={{ willChange: 'transform' }}
          >
            {duplicatedSkills.map((skill, index) => (
              <PremiumSkillCard key={`top-${index}`} skill={skill} index={index} />
            ))}
          </motion.div>

          <motion.div
            className="flex py-4"
            variants={marqueeVariantsRight}
            initial="initial"
            animate="animate"
            transition={{ ...transitionSettings, duration: transitionSettings.duration * 0.8 }}
            style={{ willChange: 'transform' }}
          >
            {duplicatedSkills.map((skill, index) => (
              <PremiumSkillCard key={`bottom-${index}`} skill={skill} index={index} reverse />
            ))}
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-20 flex flex-wrap justify-center gap-8 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-white">10+</div>
            <div className="text-gray-400">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white">100%</div>
            <div className="text-gray-400">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white">2+</div>
            <div className="text-gray-400">Years Experience</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const PremiumSkillCard = ({ skill, index, reverse = false }) => {
  return (
    <motion.div
      className="flex flex-col items-center mx-6 shrink-0 w-24 md:w-28"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.03 }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.2,
        transition: { duration: 0.2 }
      }}
    >
      <div className="relative group">
        <div
          className="absolute -inset-2 rounded-xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"
          style={{ backgroundColor: skill.color }}
        />
        <div
          className="relative w-24 h-24 flex items-center justify-center p-5 rounded-xl bg-gray-800/80 backdrop-blur-lg border border-gray-700/30 group-hover:border-transparent transition-all duration-300 hover:shadow-lg"
          style={{
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
          }}
        >
          <img
            src={skill.icon}
            alt={skill.name}
            className="w-full h-full object-contain transition-transform group-hover:scale-110"
            style={{ filter: `drop-shadow(0 0 12px ${skill.color}60)` }}
          />
        </div>
      </div>
      <motion.p
        className="mt-4 text-gray-300 font-medium text-base text-center"
        whileHover={{ color: skill.color }}
      >
        {skill.name}
      </motion.p>
    </motion.div>
  );
};

export default SkillsSection;