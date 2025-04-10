
import React from 'react';
import { Link } from 'react-scroll';
import { ArrowUp, Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark-200 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link 
              to="hero" 
              smooth={true} 
              duration={500} 
              className="text-2xl font-mono font-bold cursor-pointer mb-4 inline-block"
            >
              <span className="text-neon-cyan">{'<'}</span>
              <span className="text-white">Code</span>
              <span className="text-neon-cyan">{'/>'}</span>
            </Link>
            <p className="text-white/60 max-w-md mb-6">
              Creating exceptional digital experiences through innovative full-stack development and immersive 3D web technologies.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-dark-300 p-2 rounded-lg text-white/70 hover:text-neon-cyan hover:bg-dark-100 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-dark-300 p-2 rounded-lg text-white/70 hover:text-neon-cyan hover:bg-dark-100 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-dark-300 p-2 rounded-lg text-white/70 hover:text-neon-cyan hover:bg-dark-100 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="mailto:akhilsharma.work@gmail.com" 
                className="bg-dark-300 p-2 rounded-lg text-white/70 hover:text-neon-cyan hover:bg-dark-100 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="hero" 
                  smooth={true} 
                  duration={500} 
                  className="text-white/60 hover:text-neon-cyan transition-colors cursor-pointer"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="about" 
                  smooth={true} 
                  duration={500} 
                  className="text-white/60 hover:text-neon-cyan transition-colors cursor-pointer"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="projects" 
                  smooth={true} 
                  duration={500} 
                  className="text-white/60 hover:text-neon-cyan transition-colors cursor-pointer"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link 
                  to="skills" 
                  smooth={true} 
                  duration={500} 
                  className="text-white/60 hover:text-neon-cyan transition-colors cursor-pointer"
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link 
                  to="contact" 
                  smooth={true} 
                  duration={500} 
                  className="text-white/60 hover:text-neon-cyan transition-colors cursor-pointer"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <span className="text-white/60">Full Stack Development</span>
              </li>
              <li>
                <span className="text-white/60">3D Web Experiences</span>
              </li>
              <li>
                <span className="text-white/60">SaaS Development</span>
              </li>
              <li>
                <span className="text-white/60">API Development</span>
              </li>
              <li>
                <span className="text-white/60">AI Integration</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} Akhil Sharma. All rights reserved.
          </p>
          
          <Link 
            to="hero" 
            smooth={true} 
            duration={800} 
            className="mt-4 md:mt-0 bg-dark-300 p-3 rounded-full text-white hover:text-neon-cyan hover:bg-dark-100 transition-all hover:-translate-y-1 cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
