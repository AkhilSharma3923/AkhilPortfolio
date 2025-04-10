import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Github, ExternalLink, Code, Layers, Braces, Brain } from 'lucide-react';
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "AI Content Platform",
    description: "A SaaS platform that uses AI to generate and optimize content for marketers and bloggers.",
    image: "https://images.unsplash.com/photo-1655720031554-a929595ffad7?auto=format&fit=crop&q=80&w=500",
    tags: ["React", "Node.js", "MongoDB", "Express", "AI API"],
    category: "saas",
    liveLink: "https://example.com",
    githubLink: "https://github.com",
  },
  {
    id: 2,
    title: "3D Product Configurator",
    description: "Interactive 3D product visualization tool allowing users to customize products in real-time.",
    image: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=500",
    tags: ["Three.js", "React", "WebGL", "GSAP", "Tailwind CSS"],
    category: "3d",
    liveLink: "https://example.com",
    githubLink: "https://github.com",
  },
  {
    id: 3,
    title: "E-Commerce Dashboard",
    description: "Full-featured admin dashboard for e-commerce businesses with analytics and order management.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=500",
    tags: ["React", "Chart.js", "Node.js", "MongoDB", "Express"],
    category: "saas",
    liveLink: "https://example.com",
    githubLink: "https://github.com",
  },
  {
    id: 4,
    title: "3D Portfolio Website",
    description: "Immersive portfolio website with interactive 3D elements and smooth animations.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=500",
    tags: ["Three.js", "React", "GSAP", "Framer Motion", "WebGL"],
    category: "3d",
    liveLink: "https://example.com",
    githubLink: "https://github.com",
  },
  {
    id: 5,
    title: "Real-time Chat Application",
    description: "Feature-rich chat platform with real-time messaging, user authentication, and file sharing.",
    image: "https://images.unsplash.com/photo-1611746869696-d09bce200020?auto=format&fit=crop&q=80&w=500",
    tags: ["React", "Socket.io", "Node.js", "MongoDB", "Express"],
    category: "fullstack",
    liveLink: "https://example.com",
    githubLink: "https://github.com",
  },
  {
    id: 6,
    title: "AI Image Generator",
    description: "Web app that uses machine learning to generate and manipulate images based on text prompts.",
    image: "https://images.unsplash.com/photo-1655720033654-52bf5363e68e?auto=format&fit=crop&q=80&w=500",
    tags: ["React", "TensorFlow.js", "Node.js", "Express", "AI API"],
    category: "ai",
    liveLink: "https://example.com",
    githubLink: "https://github.com",
  }
];

type Category = 'all' | 'saas' | '3d' | 'fullstack' | 'ai';

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);

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

  const handleFilter = (category: Category) => {
    setActiveFilter(category);
    
    if (category === 'all') {
      setFilteredProjects(projects);
      return;
    }
    
    const filtered = projects.filter(project => project.category === category);
    setFilteredProjects(filtered);
  };

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-dark to-dark-100">
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
              <span className="text-white">My </span>
              <span className="text-gradient-yellow animate-glow">Projects</span>
            </h2>
            <div className="h-1 w-20 bg-neon-yellow mx-auto rounded-full mb-6"></div>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              A selection of my recent work across various domains, from SaaS applications to immersive 3D experiences.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => handleFilter('all')}
              className={`px-4 py-2 rounded-full transition-all ${activeFilter === 'all' 
                ? 'bg-neon-yellow text-dark font-medium' 
                : 'bg-dark-200 text-white/70 hover:bg-dark-300'}`}
            >
              All Projects
            </button>
            <button
              onClick={() => handleFilter('saas')}
              className={`px-4 py-2 rounded-full transition-all ${activeFilter === 'saas' 
                ? 'bg-neon-yellow text-dark font-medium' 
                : 'bg-dark-200 text-white/70 hover:bg-dark-300'}`}
            >
              <span className="flex items-center">
                <Layers className="w-4 h-4 mr-1" />
                SaaS
              </span>
            </button>
            <button
              onClick={() => handleFilter('3d')}
              className={`px-4 py-2 rounded-full transition-all ${activeFilter === '3d' 
                ? 'bg-neon-yellow text-dark font-medium' 
                : 'bg-dark-200 text-white/70 hover:bg-dark-300'}`}
            >
              <span className="flex items-center">
                <Code className="w-4 h-4 mr-1" />
                3D/WebGL
              </span>
            </button>
            <button
              onClick={() => handleFilter('fullstack')}
              className={`px-4 py-2 rounded-full transition-all ${activeFilter === 'fullstack' 
                ? 'bg-neon-yellow text-dark font-medium' 
                : 'bg-dark-200 text-white/70 hover:bg-dark-300'}`}
            >
              <span className="flex items-center">
                <Braces className="w-4 h-4 mr-1" />
                Full Stack
              </span>
            </button>
            <button
              onClick={() => handleFilter('ai')}
              className={`px-4 py-2 rounded-full transition-all ${activeFilter === 'ai' 
                ? 'bg-neon-yellow text-dark font-medium' 
                : 'bg-dark-200 text-white/70 hover:bg-dark-300'}`}
            >
              <span className="flex items-center">
                <Brain className="w-4 h-4 mr-1" />
                AI Tools
              </span>
            </button>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="glass-card overflow-hidden project-card-hover"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-100 to-transparent opacity-70"></div>
                  
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-dark/80 rounded-full hover:bg-neon-cyan/20 transition-colors"
                      aria-label="View Live Site"
                    >
                      <Eye className="h-4 w-4 text-white" />
                    </a>
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-dark/80 rounded-full hover:bg-neon-cyan/20 transition-colors"
                      aria-label="View GitHub Repository"
                    >
                      <Github className="h-4 w-4 text-white" />
                    </a>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                  <p className="text-white/60 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-2 py-1 rounded-full bg-dark-300 text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-neon-cyan hover:text-neon-cyan/80 transition-colors flex items-center text-sm"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" /> View Live
                    </a>
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors flex items-center text-sm"
                    >
                      <Github className="h-4 w-4 mr-1" /> Source Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {filteredProjects.length === 0 && (
            <motion.div 
              variants={itemVariants} 
              className="text-center py-12"
            >
              <p className="text-white/60 text-lg">No projects found in this category. Check back soon!</p>
            </motion.div>
          )}
          
          <motion.div 
            variants={itemVariants} 
            className="text-center mt-12"
          >
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <Button variant="outline" size="lg" className="border-neon-yellow text-neon-yellow hover:bg-neon-yellow/10">
                <Github className="mr-2 h-5 w-5" />
                View More on GitHub
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
