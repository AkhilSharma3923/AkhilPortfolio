import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Github, Linkedin, Twitter, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const TypewriterEffect = () => {
  const phrases = [
    "Have a project in mind?",
    "Looking to collaborate?",
    "Want to work together?",
    "Let's make something amazing!"
  ];
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isDeleting) {
      if (subIndex === 0) {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % phrases.length);
        return;
      }

      const timeout = setTimeout(() => {
        setText(phrases[index].substring(0, subIndex - 1));
        setSubIndex((prev) => prev - 1);
      }, 30);

      return () => clearTimeout(timeout);
    } else {
      if (subIndex === phrases[index].length) {
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      }

      const timeout = setTimeout(() => {
        setText(phrases[index].substring(0, subIndex + 1));
        setSubIndex((prev) => prev + 1);
      }, 100 + Math.random() * 50);

      return () => clearTimeout(timeout);
    }
  }, [subIndex, index, isDeleting]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">
      {text}
      <motion.span 
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="text-white"
      >
        |
      </motion.span>
    </span>
  );
};

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] 
      }
    }
  };

  // Enhanced card hover variants with consistent styling
  const cardHoverVariants = {
    rest: {
      scale: 1,
      boxShadow: "0px 0px 0px rgba(0, 255, 255, 0)",
      borderColor: "rgba(255, 255, 255, 0.1)"
    },
    hover: {
      scale: 1.02,
      boxShadow: [
        "0px 5px 15px rgba(0, 255, 255, 0.1)",
        "0px 10px 30px rgba(0, 255, 255, 0.3)",
        "0px 5px 15px rgba(0, 255, 255, 0.1)"
      ],
      borderColor: [
        "rgba(0, 255, 255, 0.2)",
        "rgba(0, 255, 255, 0.6)",
        "rgba(0, 255, 255, 0.2)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
      variant: "default",
    });

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const contactMethods = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: 'Email',
      value: 'contact@example.com',
      href: 'mailto:contact@example.com'
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: 'Phone',
      value: '+1 (234) 567-890',
      href: 'tel:+1234567890'
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: 'Location',
      value: 'San Francisco, California'
    }
  ];

  const socialLinks = [
    {
      href: "https://github.com",
      icon: <Github className="h-5 w-5" />,
      name: "GitHub"
    },
    {
      href: "https://linkedin.com",
      icon: <Linkedin className="h-5 w-5" />,
      name: "LinkedIn"
    },
    {
      href: "https://twitter.com",
      icon: <Twitter className="h-5 w-5" />,
      name: "Twitter"
    }
  ];

  return (
    <section id="contact" className="relative py-24 bg-dark overflow-hidden isolate">
      {/* Floating gradient elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl" />
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]">
          <div className="absolute inset-0 [background:radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent">
            <svg
              aria-hidden="true"
              className="absolute inset-0 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
            >
              <defs>
                <pattern
                  id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
                  width={40}
                  height={40}
                  patternUnits="userSpaceOnUse"
                  patternTransform="scale(1.5)"
                >
                  <rect width={40} height={40} fill="none" />
                  <path d="M0 40L40 0" strokeWidth={0.5} />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" />
            </svg>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-white">Get in </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">
                Touch
              </span>
            </motion.h2>
            
            <motion.div 
              className="h-1 w-24 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto rounded-full mb-8"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
            
            <motion.p 
              className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <TypewriterEffect />
            </motion.p>
          </motion.div>

          {/* Two equal-sized boxes with matching heights and hover effects */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Info Card */}
            <motion.div variants={itemVariants} className="h-full flex">
              <motion.div 
                className="relative bg-gradient-to-br from-dark-300/50 to-dark-400/30 backdrop-blur-sm border border-white/10 rounded-xl p-8 w-full overflow-hidden flex flex-col"
                initial="rest"
                whileHover="hover"
                variants={cardHoverVariants}
                style={{ 
                  minHeight: "600px",
                  borderWidth: "1px" 
                }}
              >
                {/* Animated gradient border */}
                <motion.div 
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ 
                    opacity: 1,
                    background: [
                      "linear-gradient(to right, rgba(0, 255, 255, 0) 0%, rgba(0, 255, 255, 0.5) 50%, rgba(0, 255, 255, 0) 100%)"
                    ]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut"
                  }}
                  style={{
                    backgroundSize: "200% 100%",
                    backgroundPosition: "left -100% top 0%"
                  }}
                />
                
                <h3 className="text-2xl font-semibold mb-8 text-white relative z-10">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-white">
                    Contact Information
                  </span>
                </h3>

                <div className="space-y-6 relative z-10">
                  {contactMethods.map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className="relative">
                        <div className="bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10 p-3 rounded-lg mr-4 group-hover:bg-neon-cyan/20 transition-colors">
                          {React.cloneElement(item.icon, { className: "h-5 w-5 text-neon-cyan" })}
                        </div>
                        <motion.div 
                          className="absolute inset-0 rounded-lg border border-neon-cyan/30 pointer-events-none"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">{item.label}</h4>
                        {item.href ? (
                          <a 
                            href={item.href} 
                            className="text-white/70 hover:text-neon-cyan transition-colors duration-300 flex items-center"
                          >
                            {item.value}
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 20 20" 
                              fill="currentColor" 
                              className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                            </svg>
                          </a>
                        ) : (
                          <p className="text-white/70">{item.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 relative z-10">
                  <h4 className="text-white font-medium mb-6">Connect with me</h4>
                  <div className="flex space-x-3">
                    {socialLinks.map((item, i) => (
                      <motion.a
                        key={i}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative mb-4 bg-dark-300/50 hover:bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10 p-3 rounded-lg text-white hover:text-neon-cyan transition-all duration-300 border border-white/5 group"
                        aria-label={item.name}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 * i }}
                        whileHover={{ 
                          y: -5,
                          scale: 1.1,
                          boxShadow: "0 5px 15px rgba(0, 255, 255, 0.2)"
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.icon}
                        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-dark-200 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                          {item.name}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </div>

                <div className="mt-12 pt-6 border-t border-white/5 relative z-10 mt-auto">
                  <h4 className="text-white font-medium mb-4">Availability</h4>
                  <p className="text-white/70 leading-relaxed">
                    Currently available for freelance projects and full-time opportunities. 
                    Feel free to reach out to discuss your needs.
                  </p>
                  <div className="mt-4 flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse" />
                    <span className="text-sm text-green-400">Available for work</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form - Matching height with the info card */}
            <motion.div variants={itemVariants} className="h-full flex">
              <motion.form 
                onSubmit={handleSubmit} 
                className="relative bg-gradient-to-br from-dark-300/50 to-dark-400/30 backdrop-blur-sm border border-white/10 rounded-xl p-8 w-full overflow-hidden flex flex-col"
                initial="rest"
                whileHover="hover"
                variants={cardHoverVariants}
                style={{ 
                  minHeight: "600px",
                  borderWidth: "1px" 
                }}
              >
                {/* Animated gradient border - matching the Contact Info Card */}
                <motion.div 
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ 
                    opacity: 1,
                    background: [
                      "linear-gradient(to right, rgba(0, 255, 255, 0) 0%, rgba(0, 255, 255, 0.5) 50%, rgba(0, 255, 255, 0) 100%)"
                    ]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut"
                  }}
                  style={{
                    backgroundSize: "200% 100%",
                    backgroundPosition: "left -100% top 0%"
                  }}
                />
                
                <h3 className="text-2xl font-semibold mb-8 text-white relative z-10">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-white">
                    Send a Message
                  </span>
                </h3>

                <div className="space-y-6 relative z-10 flex-grow">
                  {[
                    { id: "name", type: "text", placeholder: "Your Name", label: "Name" },
                    { id: "email", type: "email", placeholder: "your.email@example.com", label: "Email" },
                    { id: "subject", type: "text", placeholder: "Project Inquiry", label: "Subject" }
                  ].map((field) => (
                    <div key={field.id} className="relative">
                      <label 
                        htmlFor={field.id} 
                        className={`absolute left-4 transition-all duration-300 ${
                          activeField === field.id || (formData as any)[field.id] 
                            ? "top-0 text-xs text-neon-cyan" 
                            : "top-4 text-sm text-white/70"
                        }`}
                      >
                        {field.label}
                      </label>
                      <motion.input
                        type={field.type}
                        id={field.id}
                        name={field.id}
                        value={(formData as any)[field.id]}
                        onChange={handleChange}
                        onFocus={() => setActiveField(field.id)}
                        onBlur={() => setActiveField(null)}
                        required
                        className="w-full px-4 pt-6 pb-2 bg-dark-300/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent transition-all duration-300"
                        placeholder={activeField === field.id ? field.placeholder : ''}
                        whileFocus={{ 
                          scale: 1.01,
                          boxShadow: "0 0 0 2px rgba(0, 255, 255, 0.3)"
                        }}
                      />
                    </div>
                  ))}

                  <div className="relative">
                    <label 
                      htmlFor="message" 
                      className={`absolute left-4 transition-all duration-300 ${
                        activeField === "message" || formData.message 
                          ? "top-0 text-xs text-neon-cyan" 
                          : "top-4 text-sm text-white/70"
                      }`}
                    >
                      Message
                    </label>
                    <motion.textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setActiveField("message")}
                      onBlur={() => setActiveField(null)}
                      required
                      rows={5}
                      className="w-full px-4 pt-6 pb-2 bg-dark-300/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent transition-all duration-300 resize-none"
                      placeholder={activeField === "message" ? "Tell me about your project or inquiry..." : ''}
                      whileFocus={{ 
                        scale: 1.01,
                        boxShadow: "0 0 0 2px rgba(0, 255, 255, 0.3)"
                      }}
                    />
                  </div>

                  <div className="pt-2 mt-auto">
                    <Button
                      type="submit"
                      className="w-full group relative overflow-hidden bg-gradient-to-r from-neon-cyan to-neon-purple hover:from-neon-cyan/90 hover:to-neon-purple/90 text-dark font-medium py-6 rounded-lg transition-all duration-300"
                      disabled={isSubmitting}
                    >
                      <span className="absolute inset-0 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                          {isSubmitting ? (
                            <motion.span
                              key="loading"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="flex items-center"
                            >
                              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                              Sending...
                            </motion.span>
                          ) : (
                            <motion.span
                              key="send"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="flex items-center"
                            >
                              <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                              Send Message
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                    </Button>
                  </div>
                </div>
              </motion.form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;