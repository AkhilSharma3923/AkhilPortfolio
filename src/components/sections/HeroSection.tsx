import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ThreeCanvas from '../three/ThreeCanvas';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { TypeAnimation } from 'react-type-animation';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showQuote, setShowQuote] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;
    setMousePosition({ x, y });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <ThreeCanvas mousePosition={mousePosition} />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col space-y-5"
          >
            <div className="inline-flex items-center space-x-2 bg-dark-100/80 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full">
              <div className="flex space-x-1">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              </div>
              <span className="font-mono text-xs text-white/70">Portfolio Terminal</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold">
              <motion.span className="text-white">Akhil </motion.span>
              <motion.span className="text-gradient animate-glow">Sharma</motion.span>
            </h1>

            <div className="py-1 text-2xl md:text-3xl">
              <span className="text-neon-yellow">
                I'm a{' '}
                <TypeAnimation
                  sequence={['Backend Developer', 2000, 'Frontend Developer', 2000, 'Full Stack Developer', 2000]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="text-neon-cyan"
                />
              </span>
            </div>

            <div className="flex flex-wrap gap-2 text-white font-mono text-xs">
              <span className="bg-[#00ffff1a] px-2 py-1 rounded-full">React</span>
              <span className="bg-[#ffff001a] px-2 py-1 rounded-full">Tailwind CSS</span>
              <span className="bg-[#a855f71a] px-2 py-1 rounded-full">UI</span>
              <span className="bg-[#22c55e1a] px-2 py-1 rounded-full">Node.js</span>
              <span className="bg-[#f973161a] px-2 py-1 rounded-full">MongoDB</span>
            </div>

            <div className="glass-panel rounded-lg p-3 font-mono text-sm text-white leading-relaxed bg-white/5 backdrop-blur-md border border-white/10">
              <div className="flex gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <p>
                Hey! I'm <span className="text-neon-yellow font-semibold">Akhil Sharma</span>, a creative <span className="text-neon-cyan font-semibold">Full Stack Developer</span> who transforms bold ideas into seamless, high-performing web experiences.
                I specialize in crafting clean, responsive apps with <span className="text-neon-cyan">React</span>, blending design and logic to build digital products that connect, convert, and inspire.
                <br /><br />
                Take a scroll through my portfolio—let's create something extraordinary together. 🚀
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {/* View Projects Button with Simple Smooth Scrolling */}
              <Link 
                to="projects" 
                smooth={true}
                duration={500}
                offset={-80}
                className="cursor-pointer"
              >
                <Button>
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              {/* Contact Me Button with Simple Smooth Scrolling */}
              <Link 
                to="contact" 
                smooth={true}
                duration={500}
                offset={-80}
                className="cursor-pointer"
              >
                <Button variant="outline">
                  Contact Me
                  <span className="ml-2">👋</span>
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Enhanced Avatar Section with 3D Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative"
          >
            <div 
              className="relative w-full aspect-square max-w-md mx-auto"
              onMouseEnter={() => setShowQuote(true)}
              onMouseLeave={() => setShowQuote(false)}
            >
              {/* Floating 3D Elements */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                {/* Floating Cubes */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={`cube-${i}`}
                    className="absolute border-2 border-neon-cyan/50 rounded-lg"
                    style={{
                      width: `${30 + i * 8}px`,
                      height: `${30 + i * 8}px`,
                      left: `${15 + i * 12}%`,
                      top: `${10 + i * 8}%`,
                    }}
                    animate={{
                      y: [0, 15, 0],
                      rotate: [0, 360],
                      opacity: [0.6, 0.9, 0.6],
                    }}
                    transition={{
                      duration: 8 + i * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5
                    }}
                  />
                ))}

                {/* Floating Spheres */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={`sphere-${i}`}
                    className="absolute rounded-full bg-gradient-to-br from-neon-purple/30 to-neon-cyan/30 shadow-lg"
                    style={{
                      width: `${25 + i * 12}px`,
                      height: `${25 + i * 12}px`,
                      right: `${10 + i * 10}%`,
                      bottom: `${15 + i * 5}%`,
                      filter: 'blur(1px)'
                    }}
                    animate={{
                      y: [0, -25, 0],
                      x: [0, 15, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 10 + i * 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.7
                    }}
                  />
                ))}

                {/* Floating Triangles */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`triangle-${i}`}
                    className="absolute w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[24px] border-b-neon-yellow/40"
                    style={{
                      left: `${60 + i * 10}%`,
                      top: `${70 - i * 15}%`,
                    }}
                    animate={{
                      rotate: [0, 180, 360],
                      y: [0, -20, 0],
                    }}
                    transition={{
                      duration: 7 + i * 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>

              {/* Pulsing Connection Lines */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {[...Array(8)].map((_, i) => {
                  const angle = (i / 8) * Math.PI * 2;
                  const cx = 50 + Math.cos(angle) * 35;
                  const cy = 50 + Math.sin(angle) * 35;
                  return (
                    <motion.line
                      key={`line-${i}`}
                      x1="50%"
                      y1="50%"
                      x2={`${cx}%`}
                      y2={`${cy}%`}
                      stroke="url(#lineGradient)"
                      strokeWidth="1"
                      strokeDasharray="0 1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: [0, 0.5, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  );
                })}
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.7" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Quote Bubble */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: showQuote ? 1 : 0,
                  y: showQuote ? 0 : 20
                }}
                transition={{ duration: 0.3 }}
                className="absolute top-[-60px] left-1/2 transform -translate-x-1/2 z-20 w-[90%] md:w-[80%]"
              >
                <div className="relative bg-white dark:bg-black border-2 border-yellow-400 rounded-xl p-3 text-center shadow-lg">
                  <p className="text-black dark:text-white font-medium text-sm">
                    "Welcome! 🚀 You've just landed in a space where imagination meets logic — where every click transforms ideas into reality."
                  </p>
                  <div className="absolute bottom-[-8px] left-1/2 w-4 h-4 bg-white dark:bg-black border-r-2 border-b-2 border-yellow-400 transform -translate-x-1/2 rotate-45"></div>
                </div>
              </motion.div>

              {/* Enhanced Rotating Dots */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 15,
                  ease: 'linear',
                }}
              >
                <div className="relative w-[350px] h-[350px]">
                  {Array.from({ length: 16 }).map((_, i) => {
                    const angle = (i / 16) * 2 * Math.PI;
                    const x = 150 * Math.cos(angle);
                    const y = 150 * Math.sin(angle);
                    return (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-neon-cyan rounded-full shadow-lg"
                        style={{
                          left: `calc(50% + ${x}px - 4px)`,
                          top: `calc(50% + ${y}px - 4px)`,
                        }}
                        animate={{
                          opacity: [0.4, 1, 0.4],
                          boxShadow: [
                            '0 0 3px #0ff',
                            '0 0 10px #0ff',
                            '0 0 3px #0ff'
                          ],
                          scale: [1, 1.3, 1]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                      />
                    );
                  })}
                </div>
              </motion.div>

              {/* Enhanced Glow Effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 rounded-full blur-2xl"
                animate={{ 
                  opacity: [0.4, 0.7, 0.4],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Avatar Image with 3D Parallax */}
              <motion.div
                className="relative z-20 flex items-center justify-center h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  style={{
                    perspective: '1000px',
                    transformStyle: 'preserve-3d'
                  }}
                  animate={{
                    rotateY: [0, 5, 0, -5, 0],
                    rotateX: [0, -3, 0, 3, 0]
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Avatar className="w-72 h-72 border-4 border-white/10 shadow-[0_0_30px_rgba(0,255,255,0.4)] transition-all duration-300 ease-in-out">
                    <AvatarImage
                      src="https://i.postimg.cc/BbqKRr6y/Whats-App-Image-2025-04-10-at-05-19-40-8c12eb1d.jpg"
                      alt="Akhil Sharma"
                      className="rounded-full object-cover"
                    />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;