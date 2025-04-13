import React, { useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { ArrowUp, Github, Linkedin, Instagram } from 'lucide-react';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

const Footer = () => {
  const { scrollYProgress } = useScroll();
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: false, amount: 0.2 });
  const controls = useAnimation();
  const canvasRef = useRef(null);

  // Parallax effect for the gradient line
  const gradientLineX = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // Initialize Three.js Scene (particles only)
  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      alpha: true,
      antialias: true
    });

    // Responsive renderer setup
    const setRendererSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    setRendererSize();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Add Particles (optimized for mobile)
    const particleCount = window.innerWidth < 768 ? 800 : 1500;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x2dd4bf,
      size: window.innerWidth < 768 ? 0.015 : 0.02,
      transparent: true,
      opacity: 0.6,
    });

    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Add ambient light only
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    camera.position.z = 5;
    animate();

    // Handle Resize
    const handleResize = () => {
      setRendererSize();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  // Animation Variants (unchanged from your original)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const socialIconVariants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      backgroundColor: "rgba(30, 41, 59, 0.8)",
      boxShadow: "0 0 15px rgba(45, 212, 191, 0.5)",
      transition: { duration: 0.2 }
    }
  };

  const linkVariants = {
    hover: {
      x: 5,
      color: "rgb(45, 212, 191)",
      transition: { duration: 0.2 }
    }
  };

  const backToTopVariants = {
    initial: { y: 0 },
    hover: {
      y: -5,
      backgroundColor: "rgba(30, 41, 59, 0.8)",
      boxShadow: "0 0 15px rgba(45, 212, 191, 0.5)",
      transition: {
        y: { type: "spring", stiffness: 300 },
        duration: 0.2
      }
    }
  };

  return (
    <footer className="bg-[#121212] relative overflow-hidden" ref={footerRef}>
      {/* Three.js Canvas (particles only) */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 w-full h-full"
      />

      {/* Animated Gradient Border */}
      <motion.div
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(45, 212, 191, 0.3) 25%, rgba(255, 255, 255, 0.1) 50%, rgba(45, 212, 191, 0.3) 75%, transparent 100%)',
          backgroundSize: '200% 100%',
          x: gradientLineX,
        }}
      />

      <div className="container mx-auto px-4 md:px-6 py-12 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div className="col-span-1 md:col-span-2" variants={itemVariants}>
            <motion.div variants={logoVariants} whileHover="hover">
              <Link
                to="hero"
                smooth={true}
                duration={500}
                className="text-2xl font-mono font-bold cursor-pointer mb-4 inline-block"
              >
                <motion.span
                  className="text-neon-cyan"
                  animate={{
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {'<'}
                </motion.span>
                <span className="text-white">Akhil Sharma</span>
                <motion.span
                  className="text-neon-cyan"
                  animate={{
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                  }}
                >
                  {'/>'}
                </motion.span>
              </Link>
            </motion.div>

            <motion.p
              className="text-white/60 max-w-md mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Creating exceptional digital experiences through innovative full-stack development and immersive 3D web technologies.
            </motion.p>
            <motion.div
              className="flex space-x-4"
              variants={itemVariants}
            >
              {[
                { Icon: Github, href: "https://github.com", label: "GitHub" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/akhil-sharma123/", label: "LinkedIn" },
                { Icon: Instagram, href: "https://www.instagram.com/bhardwaj_akhil_69/", label: "Instagram" }
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-dark-300 p-2 rounded-lg text-white/70 hover:text-neon-cyan transition-colors"
                  aria-label={item.label}
                  variants={socialIconVariants}
                  whileHover="hover"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { delay: 0.3 + (index * 0.1), duration: 0.3 }
                  }}
                >
                  <item.Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold text-lg mb-4 relative">
              Quick Links
              <motion.span
                className="absolute bottom-0 left-0 h-px bg-neon-cyan/50"
                initial={{ width: 0 }}
                animate={{ width: '40%' }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              />
            </h3>
            <ul className="space-y-3">
              {['hero', 'about', 'projects', 'skills', 'contact'].map((link, index) => (
                <motion.li key={index} variants={itemVariants}>
                  <motion.div whileHover="hover">
                    <Link
                      to={link}
                      smooth={true}
                      duration={500}
                      className="text-white/60 hover:text-neon-cyan transition-colors cursor-pointer flex items-center"
                    >
                      <motion.span variants={linkVariants} className="relative">
                        {link.charAt(0).toUpperCase() + link.slice(1)}
                        <motion.span
                          className="absolute bottom-0 left-0 w-full h-px bg-neon-cyan/50"
                          initial={{ scaleX: 0, originX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.span>
                    </Link>
                  </motion.div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold text-lg mb-4 relative">
              Services
              <motion.span
                className="absolute bottom-0 left-0 h-px bg-neon-cyan/50"
                initial={{ width: 0 }}
                animate={{ width: '40%' }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              />
            </h3>
            <ul className="space-y-3">
              {[
                'Full Stack Development',
                '3D Web Experiences',
                'SaaS Development',
                'API Development',
                'AI Integration'
              ].map((service, index) => (
                <motion.li key={index} variants={itemVariants}>
                  <motion.span
                    className="text-white/60 flex items-center"
                    whileHover={{ x: 5, color: "rgb(45, 212, 191)" }}
                  >
                    <motion.span
                      className="w-1 h-1 rounded-full bg-neon-cyan/70 mr-2 inline-block"
                      animate={{
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5,
                        ease: "easeInOut"
                      }}
                    />
                    {service}
                  </motion.span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} Akhil Sharma. All rights reserved.
          </p>
          <motion.div
            className="fixed bottom-8 right-8 z-50"
            variants={backToTopVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <Link
              to="hero"
              smooth={true}
              duration={800}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-dark-300 text-white hover:text-neon-cyan transition-all cursor-pointer shadow-lg"
              aria-label="Back to top"
            >
              <ArrowUp className="h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;