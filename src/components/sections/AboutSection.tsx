import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code, Cpu, Layers, BrainCircuit, Rocket, CodeXml, Palette } from "lucide-react";
import * as THREE from "three";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const skillBoxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    let renderer: THREE.WebGLRenderer | null = null;
    let composer: EffectComposer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let geometry: THREE.BufferGeometry | null = null;
    let material: THREE.PointsMaterial | null = null;
    let points: THREE.Points | null = null;
    let animationFrameId: number | null = null;

    // Scene initialization
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 15;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      powerPreference: "high-performance",
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Post-processing pipeline
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,  // Increased bloom strength
      0.5,  // Increased radius
      0.85
    );
    composer.addPass(bloomPass);

    // Enhanced particle system for infinite scrolling effect
    const particleCount = isMobile ? 2500 : 6000; // Increased particle count
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Create a wider area for particles
      positions[i3] = (Math.random() - 0.5) * 25;
      positions[i3 + 1] = (Math.random() - 0.5) * 25;
      positions[i3 + 2] = (Math.random() - 0.5) * 25;

      // More vibrant colors
      colors[i3] = 0.2 + Math.random() * 0.8;
      colors[i3 + 1] = 0.2 + Math.random() * 0.5;
      colors[i3 + 2] = 0.5 + Math.random() * 0.5;
      
      // Varied particle sizes
      sizes[i] = Math.random() * 0.15 + 0.05;
      
      // Add velocity for each particle for the infinite scrolling effect
      velocities[i3] = (Math.random() - 0.5) * 0.05;
      velocities[i3 + 1] = -0.05 - Math.random() * 0.1; // Downward velocity for scrolling effect
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.05;
    }

    geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const vertexShader = `
      attribute float size;
      varying vec3 vColor;
      
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      
      void main() {
        float distanceFromCenter = length(gl_PointCoord - vec2(0.5));
        if (distanceFromCenter > 0.5) discard;
        
        gl_FragColor = vec4(vColor, 1.0 - distanceFromCenter * 2.0);
      }
    `;

    material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false
    });

    points = new THREE.Points(geometry, material);
    scene.add(points);

    // Animation loop for infinite scrolling
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      if(points && geometry) {
        const positions = geometry.attributes.position.array as Float32Array;
        
        for(let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          
          // Update positions based on velocities for scrolling effect
          positions[i3] += velocities[i3];
          positions[i3 + 1] += velocities[i3 + 1];
          positions[i3 + 2] += velocities[i3 + 2];
          
          // Reset particles that go out of view (infinite scrolling)
          if(positions[i3 + 1] < -12.5) {
            positions[i3 + 1] = 12.5;
            positions[i3] = (Math.random() - 0.5) * 25;
            positions[i3 + 2] = (Math.random() - 0.5) * 25;
          }
        }
        
        geometry.attributes.position.needsUpdate = true;
      }

      if(composer) composer.render();
    };

    if(containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.top = '0';
      renderer.domElement.style.left = '0';
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.pointerEvents = 'none';
    }
    
    animate();

    // Handle window resize
    const handleResize = () => {
      if (camera && renderer && composer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('resize', handleResize);
      if(animationFrameId) cancelAnimationFrame(animationFrameId);

      if(renderer) {
        renderer.dispose();
        if(composer) composer.dispose();
        if(geometry) geometry.dispose();
        if(material) material.dispose();
        if(scene) {
          scene.remove(points!);
        }
        if(containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }
    };
  }, [isMobile]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const skills = [
    {
      icon: <Code className="h-8 w-8 text-cyan-400" />,
      title: "Full Stack Development",
      description:
        "Designing and delivering scalable, end-to-end web solutions using modern frameworks and cloud-native technologies.",
    },
    {
      icon: <CodeXml className="h-8 w-8 text-fuchsia-400" />,
      title: "3D Web Experiences",
      description:
        "Developing immersive, browser-based 3D experiences with WebGL and WebGPU to enhance interactivity.",
    },
    {
      icon: <Layers className="h-8 w-8 text-amber-400" />,
      title: "MERN Stack Expert",
      description:
        "Engineering enterprise-grade applications using MongoDB, Express.js, React, and Node.js.",
    },
    {
      icon: <BrainCircuit className="h-8 w-8 text-cyan-400" />,
      title: "AI Integration",
      description:
        "Embedding intelligent features using machine learning models and AI-driven automation.",
    },
    {
      icon: <Cpu className="h-8 w-8 text-fuchsia-400" />,
      title: "API Development",
      description:
        "Building secure, scalable, and high-performance RESTful and GraphQL APIs.",
    },
    {
      icon: <Palette className="h-8 w-8 text-amber-400" />,
      title: "UI/UX Design",
      description:
        "Designing intuitive interfaces and seamless user experiences with modern design systems.",
    },
  ];
  return (
    <section id="about" className="py-20 md:py-24 bg-black overflow-hidden relative text-white">
      <div ref={containerRef} className="absolute top-0 left-0 w-full h-full z-0" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">About </span>
              <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
                Me
              </span>
            </h2>
            <div className="h-1 w-16 md:w-20 bg-gradient-to-r from-cyan-400 to-fuchsia-400 mx-auto rounded-full mb-6" />
            
            {/* Terminal-style glass panel for about text */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ 
                boxShadow: "0 0 30px rgba(103, 232, 249, 0.3)", 
                transition: { duration: 0.3 } 
              }}
              className="glass-panel rounded-lg p-4 font-mono text-sm md:text-base text-white leading-relaxed bg-white/5 backdrop-blur-md border border-white/10 max-w-3xl mx-auto mb-8 shadow-lg"
            >
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <p className="text-left">
                I'm <strong>Akhil Sharma</strong>, an innovative Full Stack Developer 💻 specializing in building high-impact digital solutions that not only look exceptional—but perform with purpose. I transform ambitious ideas into scalable, production-ready applications 🚀 designed to elevate engagement, boost growth 📈, and deliver lasting value.
                <br /><br />
                Skilled in the <strong>MERN stack</strong>, <strong>AI integration 🤖</strong>, and <strong>3D web development 🎯</strong> using <strong>WebGL/WebGPU</strong>, I create immersive, high-performance products with clean architecture and intuitive UX at the core.
                <br /><br />
                I thrive on solving complex problems 🧠 and collaborating with forward-thinking teams 🤝. Whether you're a startup or a growing brand, I bring the innovation and technical precision to help you succeed.
                <br /><br />
                Let's create something remarkable together. ✨
              </p>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ background: "rgba(255, 255, 255, 0.03)" }}
                  whileHover={{
                    y: -10,
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(125, 211, 252, 0.5)",
                    borderColor: "rgba(125, 211, 252, 0.8)",
                    transition: { 
                      type: "spring",
                      stiffness: 300,
                      damping: 15
                    }
                  }}
                  className="relative rounded-xl overflow-hidden backdrop-blur-lg border border-white/10 transition-all duration-300"
                  style={{ background: "rgba(255, 255, 255, 0.03)" }}
                  ref={el => skillBoxRefs.current[index] = el}
                >
                  <div className="p-6 flex flex-col items-center text-center h-full group">
                    <motion.div 
                      className="mb-4 p-3 rounded-full bg-gradient-to-br from-cyan-400/10 to-fuchsia-400/10"
                      whileHover={{ 
                        rotate: [0, 5, -5, 0],
                        scale: 1.1,
                        transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse" }
                      }}
                    >
                      {skill.icon}
                    </motion.div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">
                      {skill.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-snug">
                      {skill.description}
                    </p>
                    
                    {/* Adding a radial gradient overlay that appears on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-cyan-400/10 to-fuchsia-400/10 transition-opacity duration-500 pointer-events-none" />
                    
                    {/* Adding shine effect on hover */}
                    <div className="absolute -inset-px opacity-0 group-hover:opacity-100 overflow-hidden rounded-xl pointer-events-none">
                      <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-45 transition-all duration-1000 group-hover:translate-x-full" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;