
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Layout, Globe, Cube } from "lucide-react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";

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
    icon: <Cube className="h-10 w-10 text-neon-red" />,
    color: "red",
  },
];

// 3D Floating Particles Component
const ParticleField = () => {
  const points = useRef();
  
  // Create particles
  const particleCount = 300;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 15;
    positions[i3 + 1] = (Math.random() - 0.5) * 15;
    positions[i3 + 2] = (Math.random() - 0.5) * 15;
  }
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 0.1;
    
    if (points.current) {
      points.current.rotation.x = time * 0.05;
      points.current.rotation.y = time * 0.08;
    }
  });
  
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        color="#0AEFFF" 
        transparent 
        opacity={0.6} 
        sizeAttenuation 
      />
    </points>
  );
};

// Main Services Section Component
const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

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
        damping: 15
      },
    },
  };

  // 3D Text component for Services title
  const ThreeDTitle = () => {
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
        >
          WHAT I OFFER
        </Text>
      </Float>
    );
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-neon-cyan/10 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-neon-purple/10 rounded-full blur-[100px] -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          {/* Section Title */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">What I </span>
              <span className="text-gradient animate-glow">Offer</span>
            </h2>
            <div className="h-1 w-20 bg-neon-cyan mx-auto rounded-full mb-6"></div>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              Specialized services tailored to meet your digital needs, from web development to 3D experiences.
            </p>
          </motion.div>

          {/* Services Cards Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {services.map((service, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 } 
                }}
                className="h-full"
              >
                <Card className={`glass-card h-full hover:shadow-lg hover:shadow-neon-${service.color}/20 transition-all duration-500 border-neon-${service.color}/30 overflow-hidden group`}>
                  <div className={`absolute inset-0 bg-gradient-to-br from-dark-200/50 to-dark-300/50 z-0`}></div>
                  
                  <CardHeader className="relative z-10">
                    <div className={`p-3 rounded-lg bg-dark-300/50 inline-block mb-3 backdrop-blur-sm border border-neon-${service.color}/30`}>
                      {service.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">{service.title}</CardTitle>
                    <div className={`h-0.5 w-12 bg-neon-${service.color} mt-2 transition-all duration-300 group-hover:w-20`}></div>
                  </CardHeader>
                  
                  <CardContent className="relative z-10">
                    <CardDescription className="text-white/70 text-base">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <a 
              href="#contact" 
              className="inline-flex items-center px-6 py-3 rounded-md bg-neon-cyan text-dark font-medium hover:bg-neon-cyan/90 transition-colors duration-300"
            >
              Let's Work Together
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
