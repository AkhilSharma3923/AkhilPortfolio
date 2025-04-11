import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Assuming lucide-react is installed: npm install lucide-react
import { Eye, Github, ExternalLink, Code, Layers, Braces, Brain } from 'lucide-react';

// --- Mock Button Component (Replace with your actual UI library Button if available) ---
// This mock tries to respect the className prop for original styling.
// In your real project, import Button from '@/components/ui/button'
const Button = ({ children, variant, size, className = '', ...props }) => {
  // Basic structure, relies heavily on className for specific styling
  const sizeStyle = size === 'lg' ? 'text-lg px-6 py-3' : 'text-sm px-4 py-2'; // Basic size handling
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full font-medium transition-all ${sizeStyle} ${className}`} // Pass through className
      {...props}
    >
      {children}
    </button>
  );
};
// --- End Mock Button ---


// --- Project Data ---
// Includes the added 'saas' project (id: 7) for complete filter demonstration.
const projects = [
  {
    id: 1,
    title: "Doctor Appointment Booking Site",
    description: "Effortlessly manage healthcare appointments. Patients browse doctors, schedule visits, and manage appointments online.",
    image: "https://images.unsplash.com/photo-1655720031554-a929595ffad7?auto=format&fit=crop&q=80&w=500",
    tags: ["React", "Node.js", "MongoDB", "Express", "Framer Motion"],
    category: "fullstack",
    liveLink: "#", // Added dummy link
    githubLink: "#", // Added dummy link
  },
  {
    id: 2,
    title: "Interactive 3D Product Showcase",
    description: "Engage customers with immersive 3D product views. Allows exploration, customization, and interaction.",
    image: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=500",
    tags: ["Three.js", "React", "WebGL", "GSAP", "Tailwind CSS"],
    category: "3d",
    liveLink: "#", // Added dummy link
    githubLink: "#", // Added dummy link
  },
  {
    id: 3,
    title: "Full-Featured E-Commerce Platform",
    description: "Comprehensive online store with product catalogs, cart, secure checkout, and admin dashboard.",
    image: "https://images.unsplash.com/photo-1657812159103-1b2a52a7f5e8?q=80&w=600&auto=format&fit=crop",
    tags: ["React", "Framer Motion", "Node.js", "MongoDB", "Express"],
    category: "fullstack",
    liveLink: "#", // Added dummy link
    githubLink: "#", // Added dummy link
  },
  {
    id: 4,
    title: "Developer Collaboration Hub (DevTinder)",
    description: "Connect student developers! Facilitates networking via profile matching, real-time chat, and premium features.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=500",
    tags: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
    category: "fullstack",
    liveLink: "#", // Added dummy link
    githubLink: "#", // Added dummy link
  },
  {
    id: 5,
    title: "Scalable Real-time Chat Application",
    description: "Feature-rich chat app with real-time messaging, user authentication, and file sharing capabilities.",
    image: "https://images.unsplash.com/photo-1611746869696-d09bce200020?auto=format&fit=crop&q=80&w=500",
    tags: ["React", "Socket.io", "Node.js", "MongoDB", "Express"],
    category: "fullstack",
    liveLink: "https://example.com/realtime-chat", // Kept existing link
    githubLink: "#", // Added dummy link
  },
  {
    id: 6,
    title: "AI Text-to-Image Generation Tool",
    description: "Transform text ideas into visual masterpieces using AI. Features user auth and Stripe integration.",
    image: "https://plus.unsplash.com/premium_photo-1726079248086-ad6bec853f36?w=600&auto=format&fit=crop&q=60",
    tags: ["React", "Clipdrop API", "Node.js", "Express", "Stripe"],
    category: "saas", // Category as provided by you
    liveLink: "#", // Added dummy link
    githubLink: "#", // Added dummy link
  },
];

// You can now use this updated 'projects' array in your component.

// --- Category Type Definition ---
type Category = 'all' | '3d' | 'fullstack' | 'ai';

// --- ProjectsSection Component ---
const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);

  // --- Animation Variants (using original settings) ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2 // Original stagger
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 } // Original duration
    }
  };

  // --- Filter Handler (logic remains the same) ---
  const handleFilter = (category: Category) => {
    setActiveFilter(category);
    if (category === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.category === category);
      setFilteredProjects(filtered);
    }
  };

  // --- IMPORTANT STYLING NOTE ---
  // The following JSX uses class names like 'bg-dark', 'text-neon-yellow', 'glass-card', etc.
  // These **MUST** be defined in your Tailwind config (tailwind.config.js) or your global CSS file
  // for the component to be styled correctly as per your original code.

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-dark to-dark-100"> {/* Original background */}
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }} // Original viewport settings
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-white">My </span>
              {/* Original gradient text class */}
              <span className="text-gradient-yellow animate-glow">Projects</span>
            </h2>
            {/* Original neon line class */}
            <div className="h-1 w-20 bg-neon-yellow mx-auto rounded-full mb-6"></div>
            <p className="text-white/70 text-lg max-w-3xl mx-auto"> {/* Original text style */}
              A selection of my recent work across various domains, from SaaS applications to immersive 3D experiences.
            </p>
          </motion.div>

          {/* Filter Buttons - Using original classes */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
             {[
              { label: 'All Projects', category: 'all', icon: null },
              { label: 'SaaS', category: 'saas', icon: Layers },
              { label: '3D/WebGL', category: '3d', icon: Code },
              { label: 'Full Stack', category: 'fullstack', icon: Braces },
              // { label: 'AI Tools', category: 'ai', icon: Brain },
            ].map(({ label, category, icon: Icon }) => (
              <button
                key={category}
                onClick={() => handleFilter(category as Category)}
                className={`px-4 py-2 rounded-full transition-all text-sm md:text-base ${ // Adjusted padding/text size slightly
                  activeFilter === category
                    ? 'bg-neon-yellow text-dark font-medium' // Original active style
                    : 'bg-dark-200 text-white/70 hover:bg-dark-300' // Original inactive style
                }`}
              >
                <span className="flex items-center">
                  {Icon && <Icon className="w-4 h-4 mr-1.5" />} {/* Adjusted margin */}
                  {label}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            key={activeFilter} // Keep key for potential animation triggering
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" // Original gap
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout // Keep layout animation
                whileHover={{ y: -10, transition: { duration: 0.2 } }} // Original hover effect
                // --- Original Card Styling ---
                className="glass-card overflow-hidden project-card-hover"
              >
                {/* Card Image and Overlay Links */}
                <div className="relative h-48 overflow-hidden group"> {/* Added group for hover effect on links */}
                  <img
                    src={project.image}
                    alt={project.title}
                    // --- Original Image Styling ---
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  {/* --- Original Gradient Overlay --- */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-100 to-transparent opacity-70"></div>

                  {/* --- Original Icon Links Styling (added group-hover effect) --- */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        // --- Original Icon Button Styling ---
                        className="p-2 bg-dark/80 rounded-full hover:bg-neon-cyan/20 transition-colors"
                        aria-label="View Live Site"
                        title="View Live Site"
                      >
                        <Eye className="h-4 w-4 text-white" />
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                         // --- Original Icon Button Styling ---
                        className="p-2 bg-dark/80 rounded-full hover:bg-neon-cyan/20 transition-colors"
                        aria-label="View GitHub Repository"
                        title="View GitHub Repository"
                      >
                        <Github className="h-4 w-4 text-white" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6"> {/* Original padding */}
                  <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3> {/* Original title style */}
                  <p className="text-white/60 mb-4 text-sm min-h-[4rem]"> {/* Original description style, added min-height for consistency */}
                     {project.description}
                  </p>

                  {/* --- Original Tags Styling --- */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 rounded-full bg-dark-300 text-white/70" // Original tag style
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* --- Original Bottom Links Styling --- */}
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10"> {/* Added border top for separation */}
                     {project.liveLink ? (
                       <a
                         href={project.liveLink}
                         target="_blank"
                         rel="noopener noreferrer"
                         // --- Original Live Link Style ---
                         className="text-neon-cyan hover:text-neon-cyan/80 transition-colors flex items-center text-sm"
                       >
                         <ExternalLink className="h-4 w-4 mr-1" /> {/* Removed mb-1 */}
                          View Live
                       </a>
                     ) : <span className="text-sm text-white/40 italic">No Demo</span>}

                    {project.githubLink ? (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        // --- Original Source Code Link Style ---
                        className="text-white/70 hover:text-white transition-colors flex items-center text-sm"
                      >
                        <Github className="h-4 w-4 mr-1" /> Source Code
                      </a>
                     ) : <span className="text-sm text-white/40 italic">Private</span>}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* No Projects Found Message */}
          {filteredProjects.length === 0 && (
            <motion.div
              key="no-projects-message"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 md:py-16" // Increased padding
            >
              {/* Using original text style */}
              <p className="text-white/60 text-lg">
                  No projects found in the "{activeFilter}" category. Check back soon!
              </p>
            </motion.div>
          )}

          {/* View More Button - Using original classes */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-12" // Original margin
          >
            <a
              href="https://github.com/your-github-username" // <<< CHANGE THIS to your actual GitHub profile URL
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block" // Wrapper for Button
            >
               {/* <Button
                 variant="outline" // Use variant prop if your actual Button component supports it
                 size="lg"
                 // --- Original Button Styling ---
                 className="border-neon-yellow text-neon-yellow hover:bg-neon-yellow/10"
               >
                 <Github className="mr-2 h-5 w-5" />
                 View More on GitHub
               </Button> */}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;

// --- To use this component ---
// 1. Make sure you have React, framer-motion, and lucide-react installed.
// 2. Import it: import ProjectsSection from './ProjectsSection';
// 3. Render it: <ProjectsSection />
// 4. *** MOST IMPORTANT ***: Define all the custom classes used (bg-dark, text-neon-yellow,
//    glass-card, text-gradient-yellow, animate-glow, project-card-hover, etc.) in your
//    Tailwind config or global CSS file. Without these definitions, the styling will not work.
// 5. Update the final GitHub link to your profile.