import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, Cpu, Layers, BrainCircuit, Rocket, CodeXml } from "lucide-react";
import * as THREE from "three";

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const skillBoxRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Set up the scene
    const scene = new THREE.Scene();

    // Set up the camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Set up the renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    // Create particles
    const particleCount = 1000;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.05,
      transparent: true,
    });

    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Interactive mouse movement
    const mouse = new THREE.Vector2();
    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      particles.rotation.x = mouse.y * 0.5;
      particles.rotation.y = mouse.x * 0.5;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Handle window resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onWindowResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    // RGB Border Animation for Skill Boxes
    const animateBorders = () => {
      skillBoxRefs.current.forEach((box, index) => {
        if (box) {
          const time = Date.now() * 0.001;
          const hue = (time * 0.1 + index * 0.2) % 1;
          const color1 = `hsl(${hue * 360}, 100%, 50%)`;
          const color2 = `hsl(${(hue + 0.3) * 360}, 100%, 50%)`;
          const color3 = `hsl(${(hue + 0.6) * 360}, 100%, 50%)`;
          
          box.style.backgroundImage = `
            linear-gradient(
              45deg,
              ${color1} 0%,
              ${color2} 50%,
              ${color3} 100%
            )
          `;
          box.style.backgroundSize = `200% 200%`;
          box.style.animation = `gradientMove 3s ease infinite`;
        }
      });
      requestAnimationFrame(animateBorders);
    };
    animateBorders();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onWindowResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const skills = [
    {
      icon: <Code className="h-8 w-8 text-neon-cyan" />,
      title: "Full Stack Development",
      description:
        "Building complete web applications from front-end to back-end with modern JavaScript frameworks.",
    },
    {
      icon: <CodeXml className="h-8 w-8 text-neon-purple" />,
      title: "3D Web Experiences",
      description:
        "Creating immersive 3D experiences using Three.js and WebGL for next-gen web applications.",
    },
    {
      icon: <Layers className="h-8 w-8 text-neon-yellow" />,
      title: "MERN Stack Expert",
      description:
        "Specializing in MongoDB, Express.js, React.js, and Node.js for scalable web applications.",
    },
    {
      icon: <BrainCircuit className="h-8 w-8 text-neon-cyan" />,
      title: "AI Integration",
      description:
        "Implementing AI-powered features and tools to enhance application functionality.",
    },
    {
      icon: <Cpu className="h-8 w-8 text-neon-purple" />,
      title: "API Development",
      description:
        "Designing and implementing robust RESTful and GraphQL APIs for seamless data exchange.",
    },
    {
      icon: <Rocket className="h-8 w-8 text-neon-yellow" />,
      title: "Performance Optimization",
      description:
        "Optimizing web applications for speed, responsiveness, and user experience.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-dark overflow-hidden relative">
      {/* Hero Lighting Effect */}
      <div
        ref={containerRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      ></div>

      {/* Add CSS for the gradient animation */}
      <style jsx global>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-white">About </span>
              <span className="text-gradient animate-glow">Me</span>
            </h2>
            <div className="h-1 w-20 bg-neon-cyan mx-auto rounded-full mb-6"></div>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              I'm a passionate Full Stack Developer specializing in building
              exceptional digital experiences. With a focus on the MERN stack
              and 3D web technologies, I create immersive, innovative
              applications that push the boundaries of what's possible on the
              web.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="relative rounded-xl p-[2px] overflow-hidden"
                  ref={el => skillBoxRefs.current[index] = el}
                >
                  <div className="absolute inset-0 rounded-xl animate-gradientMove" />
                  <div className="relative bg-gray-900/80 backdrop-blur-md p-6 flex flex-col items-center text-center rounded-[10px] border border-white/10 z-10 h-full">
                    <div className="mb-4 p-3 rounded-full bg-gray-800/60 shadow-md">
                      {skill.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      {skill.title}
                    </h3>
                    <p className="text-white/60">{skill.description}</p>
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