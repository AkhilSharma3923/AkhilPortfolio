
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "CTO",
    company: "TechNova",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "Working with this developer was a game-changer for our project. Their expertise in MERN stack and 3D web technologies helped us create an innovative product that exceeded our expectations. They consistently delivered high-quality code and were proactive in suggesting improvements."
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Project Manager",
    company: "DigitalCraft",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "An exceptional full-stack developer who consistently delivered beyond our expectations. Their ability to translate complex requirements into elegant solutions while maintaining clear communication made our project a success. The 3D visualizations they created became the highlight of our application."
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Founder",
    company: "WebVision",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    quote: "I've worked with many developers, but few match the technical skill and creativity this developer brings to projects. They transformed our concept into a stunning web application with immersive 3D elements that our users love. Their code is clean, well-documented, and impressively organized."
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "UI/UX Designer",
    company: "CreativeEdge",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    quote: "As a designer, I appreciate working with developers who care about the details. They expertly implemented all my designs with precision, suggesting improvements that enhanced both aesthetics and functionality. Their knowledge of animation and 3D web effects elevated our project to another level."
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

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

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-dark-100 to-dark relative overflow-hidden">
      {/* Background decor */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-white">Client </span>
              <span className="text-gradient-yellow animate-glow">Testimonials</span>
            </h2>
            <div className="h-1 w-20 bg-neon-yellow mx-auto rounded-full mb-6"></div>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              Feedback from clients and collaborators who have experienced my work firsthand.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="relative"
          >
            <div className="glass-panel rounded-lg p-6 md:p-8 relative overflow-hidden">
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-neon-yellow/20">
                <Quote className="w-20 h-20" />
              </div>
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-neon-yellow/30 flex-shrink-0">
                    <img 
                      src={testimonials[activeIndex].image} 
                      alt={testimonials[activeIndex].name}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="mb-4 md:mb-6">
                      <p className="text-white/90 text-lg italic leading-relaxed">
                        "{testimonials[activeIndex].quote}"
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-semibold text-xl">
                        {testimonials[activeIndex].name}
                      </h4>
                      <p className="text-neon-yellow">
                        {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8 space-x-4">
              <Button 
                variant="outline" 
                size="icon"
                onClick={handlePrev}
                className="bg-dark-200 border-neon-yellow/30 hover:bg-dark-300 hover:border-neon-yellow"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === activeIndex ? 'bg-neon-yellow' : 'bg-dark-300 hover:bg-neon-yellow/50'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleNext}
                className="bg-dark-200 border-neon-yellow/30 hover:bg-dark-300 hover:border-neon-yellow"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
