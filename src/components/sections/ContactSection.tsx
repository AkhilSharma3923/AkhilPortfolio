
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.5, 
        ease: "easeInOut" 
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 10,
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
        variant: "default",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-dark-100 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl"></div>
      
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
              <span className="text-white">Get in </span>
              <span className="text-gradient animate-glow">Touch</span>
            </h2>
            <div className="h-1 w-20 bg-neon-cyan mx-auto rounded-full mb-6"></div>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              Have a project in mind or want to discuss potential opportunities? I'd love to hear from you!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div variants={itemVariants}>
              <div className="glass-panel rounded-lg p-6 md:p-8 h-full">
                <h3 className="text-2xl font-semibold mb-6 text-white">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-dark-300 p-3 rounded-lg mr-4">
                      <Mail className="h-6 w-6 text-neon-cyan" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Email</h4>
                      <a href="mailto:contact@example.com" className="text-white/70 hover:text-neon-cyan transition-colors">
                        contact@example.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-dark-300 p-3 rounded-lg mr-4">
                      <Phone className="h-6 w-6 text-neon-cyan" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Phone</h4>
                      <a href="tel:+1234567890" className="text-white/70 hover:text-neon-cyan transition-colors">
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-dark-300 p-3 rounded-lg mr-4">
                      <MapPin className="h-6 w-6 text-neon-cyan" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Location</h4>
                      <p className="text-white/70">
                        San Francisco, California
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10">
                  <h4 className="text-white font-medium mb-4">Connect with me</h4>
                  <div className="flex space-x-4">
                    <motion.a 
                      href="https://github.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-dark-300 p-3 rounded-lg text-white hover:text-neon-cyan hover:bg-dark-200 transition-colors"
                      aria-label="GitHub"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="h-6 w-6" />
                    </motion.a>
                    <motion.a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-dark-300 p-3 rounded-lg text-white hover:text-neon-cyan hover:bg-dark-200 transition-colors"
                      aria-label="LinkedIn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Linkedin className="h-6 w-6" />
                    </motion.a>
                    <motion.a 
                      href="https://twitter.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-dark-300 p-3 rounded-lg text-white hover:text-neon-cyan hover:bg-dark-200 transition-colors"
                      aria-label="Twitter"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Twitter className="h-6 w-6" />
                    </motion.a>
                  </div>
                </div>
                
                <div className="mt-10">
                  <h4 className="text-white font-medium mb-4">Availability</h4>
                  <p className="text-white/70">
                    Currently available for freelance projects and full-time opportunities. 
                    Feel free to reach out to discuss your needs.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="glass-panel rounded-lg p-6 md:p-8">
                <h3 className="text-2xl font-semibold mb-6 text-white">Send a Message</h3>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-white font-medium mb-2">
                      Name
                    </label>
                    <motion.input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark-300 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent transition-colors"
                      placeholder="Your Name"
                      whileFocus={{ scale: 1.05 }}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-white font-medium mb-2">
                      Email
                    </label>
                    <motion.input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark-300 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent transition-colors"
                      placeholder="your.email@example.com"
                      whileFocus={{ scale: 1.05 }}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-white font-medium mb-2">
                      Subject
                    </label>
                    <motion.input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark-300 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent transition-colors"
                      placeholder="Project Inquiry"
                      whileFocus={{ scale: 1.05 }}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-white font-medium mb-2">
                      Message
                    </label>
                    <motion.textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-dark-300 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent transition-colors resize-none"
                      placeholder="Tell me about your project or inquiry..."
                      whileFocus={{ scale: 1.05 }}
                    />
                  </div>
                  
                  <div>
                    <Button 
                      type="submit" 
                      className="w-full bg-neon-cyan hover:bg-neon-cyan/80 text-dark font-medium py-3"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
