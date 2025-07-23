import React from "react";
import { motion } from "framer-motion";
import { 
  Code, 
  Cpu, 
  Layers, 
  BrainCircuit, 
  CodeXml, 
  Palette,
  GraduationCap,
  BookOpen,
  Paintbrush,
  Globe,
  Cog
} from "lucide-react";

const AboutSection = () => {
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
      description: "Designing and delivering scalable, end-to-end web solutions using modern frameworks and cloud-native technologies.",
    },
    {
      icon: <CodeXml className="h-8 w-8 text-fuchsia-400" />,
      title: "3D Web Experiences",
      description: "Developing immersive, browser-based 3D experiences with WebGL and WebGPU to enhance interactivity.",
    },
    {
      icon: <Layers className="h-8 w-8 text-amber-400" />,
      title: "MERN Stack Expert",
      description: "Engineering enterprise-grade applications using MongoDB, Express.js, React, and Node.js.",
    },
    {
      icon: <BrainCircuit className="h-8 w-8 text-cyan-400" />,
      title: "AI Integration",
      description: "Embedding intelligent features using machine learning models and AI-driven automation.",
    },
    {
      icon: <Cpu className="h-8 w-8 text-fuchsia-400" />,
      title: "API Development",
      description: "Building secure, scalable, and high-performance RESTful and GraphQL APIs.",
    },
    {
      icon: <Palette className="h-8 w-8 text-amber-400" />,
      title: "UI/UX Design",
      description: "Designing intuitive interfaces and seamless user experiences with modern design systems.",
    },
  ];

  const timelineItems = [
    {
      year: "2022 – 2026",
      title: "B.Tech in Computer Science",
      description: "Currently pursuing B.Tech with a strong foundation in web technologies, data structures, and software development principles.",
      color: "#67E8F9",
      icon: <GraduationCap className="h-4 w-4" />
    },
    {
      year: "2022",
      title: "Began Coding Journey",
      description: "Started learning programming and web development fundamentals. Built mini-projects and explored core computer science concepts.",
      color: "#E879F9",
      icon: <BookOpen className="h-4 w-4" />
    },
    {
      year: "2023",
      title: "Frontend Developer",
      description: "Focused on creating responsive and user-friendly interfaces using HTML, CSS, JavaScript, and React.js. Gained hands-on experience through multiple projects.",
      color: "#FCD34D",
      icon: <Paintbrush className="h-4 w-4" />
    },
    {
      year: "2024",
      title: "Full Stack Developer & Freelancer",
      description: "Transitioned to full stack development. Delivered complete web solutions using MERN stack. Freelanced for clients, building static and dynamic websites.",
      color: "#67E8F9",
      icon: <Globe className="h-4 w-4" />
    },
    {
      year: "2025",
      title: "Specializing in Three.js, AI, and Advanced UI/UX",
      description: "Actively learning and experimenting with Three.js for immersive interfaces, exploring AI integration in real-world projects, and refining UI/UX skills to craft intuitive digital experiences.",
      color: "#E879F9",
      icon: <Cog className="h-4 w-4" />
    }
  ];

  return (
    <div className="min-h-screen w-full bg-black overflow-hidden relative">
      {/* About section content */}
      <section id="about" className="relative z-10 min-h-screen w-full py-20 md:py-24 text-white">
        <div className="container mx-auto px-4 md:px-6">
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
                  I'm <strong>Akhil Sharma</strong>, an innovative Full Stack Developer specializing in building high-impact digital solutions that not only look exceptional—but perform with purpose. I transform ambitious ideas into scalable, production-ready applications designed to elevate engagement, boost growth, and deliver lasting value.
                  <br /><br />
                  Skilled in the <strong>MERN stack</strong>, <strong>AI integration</strong>, and <strong>3D web development</strong> using <strong>WebGL/WebGPU</strong>, I create immersive, high-performance products with clean architecture and intuitive UX at the core.
                  <br /><br />
                  I thrive on solving complex problems and collaborating with forward-thinking teams. Whether you're a startup or a growing brand, I bring the innovation and technical precision to help you succeed.
                  <br /><br />
                  Let's create something remarkable together.
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
                      boxShadow: "0 0 30px rgba(125, 211, 252, 0.7)",
                      transition: { 
                        type: "spring",
                        stiffness: 300,
                        damping: 15
                      }
                    }}
                    className="relative rounded-xl overflow-hidden backdrop-blur-lg transition-all duration-300 group"
                    style={{ 
                      background: "rgba(255, 255, 255, 0.03)",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)"
                    }}
                  >
                    <div className="absolute inset-0 rounded-xl p-[1px] pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 via-fuchsia-400/30 to-amber-400/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    
                    <div className="absolute -inset-[1px] rounded-xl overflow-hidden pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/30 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:animate-[shimmer_2s_infinite]"></div>
                    </div>
                    
                    <div className="p-6 flex flex-col items-center text-center h-full">
                      <motion.div 
                        className="mb-4 p-3 rounded-full bg-gradient-to-br from-cyan-400/10 to-fuchsia-400/10 relative overflow-hidden"
                        whileHover={{ 
                          rotate: [0, 5, -5, 0],
                          scale: 1.1,
                          transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse" }
                        }}
                      >
                        {skill.icon}
                        <div className="absolute inset-0 rounded-full bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </motion.div>
                      <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">
                        {skill.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-snug">
                        {skill.description}
                      </p>
                      
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-cyan-400/10 to-fuchsia-400/10 transition-opacity duration-500 pointer-events-none" />
                      
                      <div className="absolute -inset-px opacity-0 group-hover:opacity-100 overflow-hidden rounded-xl pointer-events-none">
                        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent transform rotate-45 transition-all duration-1000 group-hover:translate-x-full" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              variants={containerVariants}
              className="mt-32"
            >
              <motion.h2 
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold text-center mb-16 text-white"
              >
                <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
                  My Professional Journey
                </span>
              </motion.h2>
                      
              <motion.div 
                className="relative max-w-4xl mx-auto"
                variants={containerVariants}
              >
                {timelineItems.map((item, index) => (
                  <motion.div
                    key={index}
                    className={`flex relative mb-16 last:mb-0 group ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                  >
                    <div className="hidden md:block w-1/2"></div>
                                    
                    <motion.div 
                      className="timeline-dot absolute left-0 md:left-1/2 top-0 w-6 h-6 rounded-full bg-white transform md:-translate-x-1/2 z-10 flex items-center justify-center"
                      style={{ backgroundColor: item.color }}
                      whileHover={{ scale: 1.2 }}
                    >
                      {item.icon}
                      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                        style={{ boxShadow: `0 0 15px ${item.color}` }}></div>
                    </motion.div>
                                    
                    {index < timelineItems.length - 1 && (
                      <div className="timeline-connector absolute left-[11px] md:left-1/2 top-6 w-[2px] h-[calc(100%+2rem)] transform md:-translate-x-1/2 bg-gradient-to-b from-white/50 to-white/10"></div>
                    )}
                                    
                    <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12"}`}>
                      <motion.div 
                        className="dark-glass-effect p-6 rounded-xl border border-white/10 relative overflow-hidden group-hover:border-transparent"
                        style={{ 
                          boxShadow: `0 4px 25px ${item.color}30`,
                          borderColor: `${item.color}40`
                        }}
                        whileHover={{
                          y: -8,
                          boxShadow: `0 10px 40px ${item.color}70`,
                          transition: { duration: 0.4 }
                        }}
                      >
                        <div className="absolute -inset-[1px] rounded-xl overflow-hidden pointer-events-none">
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-fuchsia-400/30 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-[shimmer_3s_infinite]"></div>
                        </div>
                        
                        <motion.span 
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-3 relative overflow-hidden"
                          style={{
                            backgroundColor: `${item.color}20`,
                            color: item.color,
                          }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {item.icon}
                          {item.year}
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-full group-hover:translate-x-full"></span>
                        </motion.span>
                        <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: item.color }}>{item.title}</h3>
                        <p className="text-white/80 text-sm md:text-base">{item.description}</p>
                        
                        <div className="absolute -z-10 inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10"></div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default AboutSection;