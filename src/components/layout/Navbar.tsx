import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Download, Github, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-scroll';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { name: 'Home', to: 'hero' },
  { name: 'About', to: 'about' },
  { name: 'Services', to: 'services' },
  { name: 'Projects', to: 'projects' },
  { name: 'Skills', to: 'skills' },
  { name: 'Contact', to: 'contact' }
];

const socialLinks = [
  { icon: Github, link: 'https://github.com' },
  { icon: Linkedin, link: 'https://www.linkedin.com/in/akhil-sharma123/' },
  { icon: Instagram, link: 'https://www.instagram.com/bhardwaj_akhil_69/' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('hero');

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for active link detection
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -70% 0px',
        threshold: 0.2
      }
    );
    
    sections.forEach(section => observer.observe(section));
    return () => sections.forEach(section => observer.unobserve(section));
  }, []);

  // Close mobile menu when clicking a link
  const handleNavClick = (to: string) => {
    setActiveLink(to);
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 15, delay: 0.2 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-900/95 backdrop-blur-lg border-b border-white/5 py-2 shadow-lg'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <Avatar className="w-10 h-10 md:w-12 md:h-12 border-2 border-neon-cyan/80 shadow-lg hover:border-neon-cyan transition-all duration-300">
            <AvatarImage
              src="https://i.postimg.cc/BbqKRr6y/Whats-App-Image-2025-04-10-at-05-19-40-8c12eb1d.jpg"
              alt="Akhil Sharma"
              className="object-cover"
            />
            <AvatarFallback className="bg-dark-700 text-neon-cyan">AS</AvatarFallback>
          </Avatar>
          <Link
            to="hero"
            smooth={true}
            duration={800}
            offset={-100}
            className="text-xl md:text-2xl font-mono font-bold cursor-pointer flex items-center gap-1 hover:text-neon-cyan/90 transition-colors duration-300"
            onClick={() => handleNavClick('hero')}
          >
            <span className="text-neon-cyan">{'<'}</span>
            <span className="text-white">AkhilSharma</span>
            <span className="text-neon-cyan">{'/>'}</span>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1 bg-dark-800/60 px-3 py-1.5 rounded-full border border-white/5 backdrop-blur-md shadow-inner">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              smooth={true}
              duration={800}
              spy={true}
              offset={-80}
              activeClass="active"
              onSetActive={() => setActiveLink(item.to)}
              className={`nav-item font-medium cursor-pointer px-4 py-1.5 rounded-full transition-all duration-300 relative group ${
                activeLink === item.to ? 'text-neon-cyan' : 'text-white/80 hover:text-white'
              }`}
            >
              {item.name}
              <span
                className={`absolute bottom-0 left-1/2 w-0 h-0.5 bg-neon-cyan transition-all duration-300 group-hover:w-4/5 group-hover:left-[10%] ${
                  activeLink === item.to ? 'w-4/5 left-[10%]' : ''
                }`}
              ></span>
            </Link>
          ))}
        </div>

        {/* Desktop Social Icons & Resume Button */}
        <div className="hidden md:flex items-center space-x-5">
          {socialLinks.map(({ icon: Icon, link }) => (
            <a key={link} href={link} target="_blank" rel="noopener noreferrer">
              <motion.div
                whileHover={{ y: -2, scale: 1.1 }}
                className="text-white/80 hover:text-neon-cyan transition-colors duration-300"
              >
                <Icon className="w-6 h-6" />
              </motion.div>
            </a>
          ))}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="outline"
              className="ml-3 bg-transparent border-neon-cyan/50 text-neon-cyan hover:bg-transparent hover:text-neon-cyan hover:border-neon-cyan transition-all duration-300 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <Download className="mr-2 h-4 w-4" /> Resume
              </span>
              <span className="absolute inset-0 bg-neon-cyan opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none p-2"
          aria-label="Toggle Menu"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="md:hidden bg-dark-900/95 backdrop-blur-lg border-t border-white/5 overflow-hidden"
        >
          <div className="container mx-auto px-4 py-4">
            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-2 mb-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  smooth={true}
                  duration={800}
                  spy={true}
                  offset={-80}
                  activeClass="active"
                  onSetActive={() => setActiveLink(item.to)}
                  onClick={() => handleNavClick(item.to)}
                  className={`py-3 px-4 rounded-lg font-medium transition-all duration-300 relative group ${
                    activeLink === item.to 
                      ? 'text-neon-cyan bg-dark-700/50' 
                      : 'text-white/80 hover:text-white hover:bg-dark-700/30'
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-2 left-4 w-0 h-0.5 bg-neon-cyan transition-all duration-300 group-hover:w-20 ${
                      activeLink === item.to ? 'w-20' : ''
                    }`}
                  ></span>
                </Link>
              ))}
            </div>

            {/* Mobile Social & Resume */}
            <div className="flex flex-col space-y-4 pt-4 border-t border-white/5">
              <div className="flex justify-center space-x-6">
                {socialLinks.map(({ icon: Icon, link }) => (
                  <a key={link} href={link} target="_blank" rel="noopener noreferrer">
                    <motion.div
                      whileHover={{ y: -2, scale: 1.1 }}
                      className="text-white/80 hover:text-neon-cyan transition-colors duration-300 p-2"
                    >
                      <Icon className="w-6 h-6" />
                    </motion.div>
                  </a>
                ))}
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent border-neon-cyan/50 text-neon-cyan hover:bg-transparent hover:text-neon-cyan hover:border-neon-cyan transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <Download className="mr-2 h-4 w-4" /> Download Resume
                  </span>
                  <span className="absolute inset-0 bg-neon-cyan opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;