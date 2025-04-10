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
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-dark-100/80 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full">
              <div className="flex space-x-1">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              </div>
              <span className="font-mono text-sm text-white/70">Portfolio Terminal</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold">
              <motion.span className="text-white">Akhil </motion.span>
              <motion.span className="text-gradient animate-glow">Sharma</motion.span>
            </h1>

            <div className="py-1 text-4xl">
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

            <div className="flex flex-wrap gap-3 text-white font-mono text-sm">
              <span className="bg-[#00ffff1a] px-3 py-1 rounded-full">React</span>
              <span className="bg-[#ffff001a] px-3 py-1 rounded-full">Tailwind CSS</span>
              <span className="bg-[#a855f71a] px-3 py-1 rounded-full">Flutter</span>
              <span className="bg-[#22c55e1a] px-3 py-1 rounded-full">Node.js</span>
              <span className="bg-[#f973161a] px-3 py-1 rounded-full">MongoDB</span>
            </div>

         {/* New About Text replacing glass panel */}
         <div className="glass-panel rounded-lg p-4 font-mono text-sm md:text-base text-white leading-relaxed bg-white/5 backdrop-blur-md border border-white/10">
  <div className="flex gap-2 mb-4">
    <div className="w-3 h-3 rounded-full bg-red-500"></div>
    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
    <div className="w-3 h-3 rounded-full bg-green-500"></div>
  </div>
  <p>
    Hey! I’m <span className="text-neon-yellow font-semibold">Akhil Sharma</span>, a creative <span className="text-neon-cyan font-semibold">Full Stack Developer</span> who transforms bold ideas into seamless, high-performing web experiences.
    I specialize in crafting clean, responsive apps with <span className="text-neon-cyan">React</span>, blending design and logic to build digital products that connect, convert, and inspire.
    <br /><br />
    Take a scroll through my portfolio—let’s create something extraordinary together. 🚀
  </p>
</div>



            <div className="flex flex-wrap gap-4">
              <Link to="projects" smooth duration={500}>
                <Button className="bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-black font-semibold shadow-md transition-all">
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="contact" smooth duration={500}>
                <Button
                  variant="outline"
                  className="border-[#a855f7] text-[#a855f7] hover:bg-[#a855f71a] transition-all font-semibold"
                >
                  Contact Me
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Avatar Section */}
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
              {/* Quote Bubble */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: showQuote ? 1 : 0,
                  y: showQuote ? 0 : 20
                }}
                transition={{ duration: 0.3 }}
                className="absolute top-[-120px] left-1/2 transform -translate-x-1/2 z-20 w-[90%] md:w-[80%]"
              >
                <div className="relative bg-white dark:bg-black border-2 border-yellow-400 rounded-2xl p-4 text-center shadow-lg">
                  <p className="text-black dark:text-white font-medium text-lg">
                    "Welcome! 🚀 You've just landed in a space where imagination meets logic — where every click transforms ideas into reality, and every line of code brings a story to life."
                  </p>
                  {/* Triangle pointer */}
                  <div className="absolute bottom-[-10px] left-1/2 w-6 h-6 bg-white dark:bg-black border-r-2 border-b-2 border-yellow-400 transform -translate-x-1/2 rotate-45"></div>
                </div>
              </motion.div>

              {/* Rotating Dots */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 12,
                  ease: 'linear',
                }}
              >
                <div className="relative w-[350px] h-[350px]">
                  {Array.from({ length: 12 }).map((_, i) => {
                    const angle = (i / 12) * 2 * Math.PI;
                    const x = 160 * Math.cos(angle);
                    const y = 160 * Math.sin(angle);
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
                            '0 0 4px #0ff',
                            '0 0 8px #0ff',
                            '0 0 4px #0ff'
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                      />
                    );
                  })}
                </div>
              </motion.div>

              {/* Background Glow */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 rounded-full blur-3xl"
                animate={{ 
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Avatar Image */}
              <div className="relative z-10 flex items-center justify-center h-full">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Avatar className="w-80 h-80 border-4 border-white/10 shadow-[0_0_40px_rgba(0,255,255,0.5)] transition-all duration-300 ease-in-out">
                    <AvatarImage
                      src="https://i.postimg.cc/BbqKRr6y/Whats-App-Image-2025-04-10-at-05-19-40-8c12eb1d.jpg"
                      alt="Akhil Sharma"
                      className="rounded-full object-cover"
                    />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
