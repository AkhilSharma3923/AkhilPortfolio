import React, { useRef, useState, Suspense } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Layout, Globe, Box, ArrowRight } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, PerspectiveCamera, OrbitControls, Environment, useGLTF, MeshDistortMaterial, MeshWobbleMaterial, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";

// Service Cards Data
const services = [
  {
    title: "Full-Stack Development",
    description: "End-to-end web application development using modern JavaScript frameworks, RESTful APIs, and cloud infrastructure.",
    icon: <Code className="h-10 w-10 text-neon-cyan" />,
    color: "cyan",
  },
  {
    title: "UI/UX Design",
    description: "Creating intuitive, elegant user interfaces with a focus on user experience, accessibility, and modern design principles.",
    icon: <Layout className="h-10 w-10 text-neon-purple" />,
    color: "purple",
  },
  {
    title: "WordPress Development",
    description: "Custom WordPress theme and plugin development, optimized for performance, security, and search engine visibility.",
    icon: <Globe className="h-10 w-10 text-neon-yellow" />,
    color: "yellow",
  },
  {
    title: "3D Websites (Three.js / WebGL)",
    description: "Immersive 3D web experiences using Three.js and WebGL for next-generation websites that stand out from the crowd.",
    icon: <Box className="h-10 w-10 text-neon-red" />,
    color: "red",
  },
];

// Interactive Orbiting Sphere
const OrbitingSphere = ({ position = [0, 0, 0] as [number, number, number], color = "#FF00FF" }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<number>(0);

  useFrame((state) => {
    if (meshRef.current) {
      orbitRef.current += 0.02;
      meshRef.current.position.x = position[0] + Math.sin(orbitRef.current) * 2;
      meshRef.current.position.z = position[2] + Math.cos(orbitRef.current) * 2;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <MeshDistortMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={0.4} 
        distort={0.3} 
        speed={2} 
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
};

// Premium Floating Diamond
const PremiumDiamond = ({ position = [0, 0, 0] as [number, number, number], color = "#0AEFFF" }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });
  
  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.7, 0]} />
      <MeshReflectorMaterial 
        color={color} 
        metalness={0.9} 
        roughness={0.1} 
        envMapIntensity={1}
        mirror={0.5}
      />
    </mesh>
  );
};

// Dynamic Particle System
const DynamicParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  // Create particles with color variation
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 30;
    positions[i3 + 1] = (Math.random() - 0.5) * 30;
    positions[i3 + 2] = (Math.random() - 0.5) * 30;
    
    // Color gradient from cyan to purple
    const color = new THREE.Color();
    color.setHSL(Math.random() * 0.2 + 0.5, 1, 0.5);
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.x = time * 0.1;
      pointsRef.current.rotation.y = time * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Premium 3D Text
const PremiumText = () => {
  return (
    <Float speed={4} rotationIntensity={0.2} floatIntensity={1}>
      <Text
        font="/fonts/inter-bold.woff"
        fontSize={1.5}
        position={[0, 0, 0]}
        color="#ffffff"
        maxWidth={8}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#0AEFFF"
      >
        WHAT I OFFER
      </Text>
    </Float>
  );
};

// Premium Background Plane
const PremiumBackground = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, -10]}>
      <planeGeometry args={[50, 50]} />
      <MeshReflectorMaterial
        color="#0a0a0a"
        metalness={0.8}
        roughness={0.2}
        envMapIntensity={0.5}
        mirror={0.3}
      />
    </mesh>
  );
};

// 3D Scene for Background
const ThreeDScene = () => {
  return (
    <Canvas className="absolute inset-0 -z-10" style={{ opacity: 0.8 }}>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[-10, 10, -10]} angle={0.3} penumbra={1} intensity={0.5} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      
      <Suspense fallback={null}>
        <DynamicParticles />
        <PremiumBackground />
        
        {/* Orbiting Spheres */}
        <OrbitingSphere position={[0, 0, -5]} color="#FF00FF" />
        <OrbitingSphere position={[2, 1, -3]} color="#FFFF00" />
        <OrbitingSphere position={[-2, -1, -3]} color="#0AEFFF" />
        
        {/* Premium Diamonds */}
        <PremiumDiamond position={[3, 2, -4]} color="#0AEFFF" />
        <PremiumDiamond position={[-3, -2, -4]} color="#FF00FF" />
        <PremiumDiamond position={[0, 3, -6]} color="#FFFF00" />
        
        <PremiumText />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
};

// Main Services Section Component
const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  
  // Parallax effect for background
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
      },
    },
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden min-h-screen">
      {/* 3D Background Scene */}
      <motion.div style={{ y: backgroundY, opacity }}>
        <ThreeDScene />
      </motion.div>
      
      {/* Premium background gradients */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-neon-cyan/10 rounded-full blur-[150px] -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-neon-purple/10 rounded-full blur-[150px] -z-10"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-neon-yellow/5 rounded-full blur-[200px] -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 120, 
                damping: 10,
                delay: 0.2
              }}
            >
              <span className="text-white">What I </span>
              <span className="text-gradient animate-glow">Offer</span>
            </motion.h2>
            <motion.div 
              className="h-1 w-20 bg-neon-cyan mx-auto rounded-full mb-6"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "5rem", opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            ></motion.div>
            <motion.p 
              className="text-white/70 text-lg max-w-3xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Specialized services tailored to meet your digital needs, from web development to 3D experiences.
            </motion.p>
          </motion.div>

          {/* Services Cards Grid */}
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="h-full"
              >
                <Card
                  className={`glass-card h-full hover:shadow-lg hover:shadow-neon-${service.color}/20 transition-all duration-500 border-neon-${service.color}/30 overflow-hidden group relative`}
                >
                  {/* Premium animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-dark-200/50 to-dark-300/50 z-0 transition-opacity duration-500 ${hoveredIndex === index ? 'opacity-100' : 'opacity-70'}`}></div>
                  
                  {/* Premium glowing border effect */}
                  <div className={`absolute inset-0 border-2 border-neon-${service.color}/30 rounded-lg transition-all duration-500 ${hoveredIndex === index ? 'border-neon-' + service.color + '/70 shadow-lg shadow-neon-' + service.color + '/30' : ''}`}></div>
                  
                  <CardHeader className="relative z-10">
                    <motion.div
                      className={`p-3 rounded-lg bg-dark-300/50 inline-block mb-3 backdrop-blur-sm border border-neon-${service.color}/30`}
                      animate={{
                        rotate: hoveredIndex === index ? [0, -5, 5, 0] : 0,
                        scale: hoveredIndex === index ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {service.icon}
                    </motion.div>
                    <CardTitle className="text-2xl font-bold text-white">{service.title}</CardTitle>
                    <div className={`h-0.5 w-12 bg-neon-${service.color} mt-2 transition-all duration-300 group-hover:w-20`}></div>
                  </CardHeader>
                  
                  <CardContent className="relative z-10">
                    <CardDescription className="text-white/70 text-base">{service.description}</CardDescription>
                    
                    {/* Premium learn more button */}
                    <motion.div 
                      className="mt-4 flex items-center text-neon-cyan font-medium"
                      animate={{ 
                        x: hoveredIndex === index ? 5 : 0,
                        opacity: hoveredIndex === index ? 1 : 0.7
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span>Learn more</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Premium CTA Button */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <motion.a
              href="#contact"
              className="inline-flex items-center px-8 py-4 rounded-md bg-gradient-to-r from-neon-cyan to-neon-purple text-dark font-medium hover:from-neon-purple hover:to-neon-cyan transition-all duration-500 shadow-lg shadow-neon-cyan/20"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(10, 239, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Work Together
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;