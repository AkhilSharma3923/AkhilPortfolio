
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Github, ExternalLink } from 'lucide-react';

// Skills data with icons and names
const skills = [
  { name: 'React.js', icon: '/images/icons/react.svg' },
  { name: 'Node.js', icon: '/images/icons/nodejs.svg' },
  { name: 'MongoDB', icon: '/images/icons/mongodb.svg' },
  { name: 'Express.js', icon: '/images/icons/express.svg' },
  { name: 'Three.js / WebGL', icon: '/images/icons/three.svg' },
  { name: 'Tailwind CSS', icon: '/images/icons/tailwind.svg' },
  { name: 'Stripe API', icon: '/images/icons/stripe.svg' },
  { name: 'REST APIs', icon: '/images/icons/api.svg' },
  { name: 'Git & GitHub', icon: '/images/icons/github.svg' },
  { name: 'Clipdrop API', icon: '/images/icons/clipdrop.svg' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const ConnectSection = () => {
  return (
    <section id="connect" className="py-24 bg-dark-100 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute top-20 left-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-white">Let's </span>
              <span className="text-gradient animate-glow">Connect</span>
            </h2>
            <div className="h-1 w-20 bg-neon-cyan mx-auto rounded-full mb-6"></div>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              Interested in working together or have a project in mind? Let's make it happen!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div variants={itemVariants}>
              <div className="glass-panel rounded-lg p-6 md:p-8 h-full">
                <div className="space-y-6">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Akhil Sharma</h3>
                    <p className="text-neon-cyan font-medium">Full Stack Developer | Three.js Enthusiast | AI SaaS Builder</p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-dark-300 p-3 rounded-lg mr-4">
                      <Mail className="h-6 w-6 text-neon-cyan" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Email</h4>
                      <a 
                        href="mailto:akhilsharma.work@gmail.com" 
                        className="text-white/70 hover:text-neon-cyan transition-colors"
                      >
                        akhilsharma.work@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-dark-300 p-3 rounded-lg mr-4">
                      <Phone className="h-6 w-6 text-neon-cyan" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Phone</h4>
                      <a 
                        href="tel:+919356369310" 
                        className="text-white/70 hover:text-neon-cyan transition-colors"
                      >
                        +91 93563 69310
                      </a>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="text-white font-medium mb-4">Find me on</h4>
                    <div className="flex space-x-4">
                      <a 
                        href="https://github.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-dark-300 p-3 rounded-lg text-white hover:text-neon-cyan hover:bg-dark-200 transition-colors"
                        aria-label="GitHub"
                      >
                        <Github className="h-6 w-6" />
                      </a>
                      <a 
                        href="https://linkedin.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-dark-300 p-3 rounded-lg text-white hover:text-neon-cyan hover:bg-dark-200 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect x="2" y="9" width="4" height="12" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      </a>
                      <a 
                        href="https://twitter.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-dark-300 p-3 rounded-lg text-white hover:text-neon-cyan hover:bg-dark-200 transition-colors"
                        aria-label="Twitter"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                        </svg>
                      </a>
                      <a 
                        href="#" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-dark-300 p-3 rounded-lg text-white hover:text-neon-cyan hover:bg-dark-200 transition-colors"
                        aria-label="Portfolio"
                      >
                        <ExternalLink className="h-6 w-6" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <div className="glass-panel rounded-lg p-6 md:p-8 h-full">
                <h3 className="text-2xl font-semibold mb-6 text-white">Skills & Technologies</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      className="bg-dark-200 rounded-lg p-4 flex items-center hover:bg-dark-300 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="w-8 h-8 mr-3 flex-shrink-0 flex items-center justify-center">
                        {/* Using placeholders since we don't have the actual SVG icons */}
                        <div className="w-6 h-6 bg-neon-cyan/20 rounded-full flex items-center justify-center">
                          <span className="text-neon-cyan text-xs font-bold">{skill.name.slice(0, 2)}</span>
                        </div>
                      </div>
                      <span className="text-white/90 text-sm">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-white/70">
                    Always exploring new technologies and methodologies to create exceptional digital experiences.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConnectSection;
