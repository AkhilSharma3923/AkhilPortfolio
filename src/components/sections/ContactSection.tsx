import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Github, Linkedin, Instagram, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Swal from 'sweetalert2';

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

  React.useEffect(() => {
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
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple md:text-sm lg:text-base">
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
  const [result, setResult] = useState("");

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const cardHoverVariants = {
    rest: {
      scale: 1,
      boxShadow: "0px 0px 0px rgba(0, 255, 255, 0)",
      borderColor: "rgba(255, 255, 255, 0.1)",
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
      },
    },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult("Sending...");

    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("email", formData.email);
    formDataObj.append("subject", formData.subject);
    formDataObj.append("message", formData.message);
    formDataObj.append("access_key", "7dfa8c60-64f9-4ec4-b549-844587316c2d"); // Replace with your actual access key

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataObj
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          title: 'Success!',
          text: 'Your message has been sent successfully! I will get back to you soon.',
          icon: 'success',
          confirmButtonText: 'Awesome',
          background: '#18181b',
          color: '#0AEFFF',
          confirmButtonColor: '#0AEFFF',
          customClass: {
            popup: 'rounded-xl',
            confirmButton: 'px-6 py-2 text-lg font-semibold',
          },
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error('Form submission error:', error);
      Swal.fire({
        title: 'Error!',
        text: error.message || 'There was an error sending your message. Please try again later.',
        icon: 'error',
        confirmButtonText: 'Try Again',
        background: '#18181b',
        color: '#ff5555',
        confirmButtonColor: '#ff5555',
        customClass: {
          popup: 'rounded-xl',
          confirmButton: 'px-6 py-2 text-lg font-semibold',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: 'Email',
      value: 'bhardwajakhil3923@gmail.com',
      href: 'mailto:bhardwajakhil3923@gmail.com'
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: 'Phone',
      value: '+91 79733-10877',
      href: 'tel:+917973310877'
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: 'Location',
      value: 'Mohali, Chandigarh, India',
    }
  ];

  const socialLinks = [
    {
      href: "https://github.com",
      icon: <Github className="h-5 w-5" />,
      name: "GitHub"
    },
    {
      href: "https://www.linkedin.com/in/akhil-sharma123/",
      icon: <Linkedin className="h-5 w-5" />,
      name: "LinkedIn"
    },
    {
      href: "https://www.instagram.com/bhardwaj_akhil_69/",
      icon: <Instagram className="h-5 w-5" />,
      name: "Instagram"
    }
  ];

  return (
    <section id="contact" className="relative py-20 md:py-24 bg-black overflow-hidden isolate">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-72 h-72 md:w-96 md:h-96 bg-neon-purple/10 rounded-full blur-2xl md:blur-3xl" />
        <div className="absolute bottom-1/3 -right-20 w-72 h-72 md:w-96 md:h-96 bg-neon-cyan/10 rounded-full blur-2xl md:blur-3xl" />

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
          <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 md:mb-6"
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
              className="h-0.5 w-16 md:w-24 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto rounded-full mb-6 md:mb-8"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />

            <motion.p
              className="text-white/80 text-lg md:text-base max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <TypewriterEffect />
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <motion.div variants={itemVariants} className="h-full flex justify-center lg:justify-start">
              <motion.div
                className="relative bg-gradient-to-br from-dark-300/50 to-dark-400/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 w-full overflow-hidden flex flex-col max-w-md"
                initial="rest"
                whileHover="hover"
                variants={cardHoverVariants}
                style={{
                  minHeight: "500px",
                  borderWidth: "1px"
                }}
              >
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

                <h3 className="text-xl md:text-2xl font-semibold mb-6 text-white relative z-10">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-white">
                    Contact Information
                  </span>
                </h3>

                <div className="space-y-4 md:space-y-6 relative z-10">
                  {contactMethods.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className="relative">
                        <div className="bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10 p-2.5 md:p-3 rounded-lg mr-3 md:mr-4 group-hover:bg-neon-cyan/20 transition-colors">
                          {React.cloneElement(item.icon, { className: "h-4 w-4 md:h-5 md:w-5 text-neon-cyan" })}
                        </div>
                        <motion.div
                          className="absolute inset-0 rounded-lg border border-neon-cyan/30 pointer-events-none"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-0.5 md:mb-1 text-sm md:text-base">{item.label}</h4>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-white/70 hover:text-neon-cyan transition-colors duration-300 flex items-center text-xs md:text-sm"
                          >
                            {item.value}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="w-3 h-3 md:w-4 md:h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                            </svg>
                          </a>
                        ) : (
                          <p className="text-white/70 text-xs md:text-sm">{item.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 md:mt-12 relative z-10">
                  <h4 className="text-white font-medium mb-4 text-sm md:text-base">Connect with me</h4>
                  <div className="flex space-x-2 md:space-x-3">
                    {socialLinks.map((item, i) => (
                      <motion.a
                        key={i}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative mb-2 md:mb-4 bg-dark-300/50 hover:bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10 p-2 md:p-3 rounded-lg text-white hover:text-neon-cyan transition-all duration-300 border border-white/5 group"
                        aria-label={item.name}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 * i }}
                        whileHover={{
                          y: -3,
                          scale: 1.05,
                          boxShadow: "0 3px 10px rgba(0, 255, 255, 0.2)"
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.icon}
                        <span className="absolute -bottom-6 md:-bottom-8 left-1/2 transform -translate-x-1/2 text-[0.6rem] md:text-xs bg-dark-200 text-white px-1.5 md:px-2 py-0.5 md:py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                          {item.name}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </div>

                <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/5 relative z-10 mt-auto">
                  <h4 className="text-white font-medium mb-2 md:mb-4 text-sm md:text-base">Availability</h4>
                  <p className="text-white/70 leading-relaxed text-xs md:text-sm">
                    Currently available for freelance projects and full-time opportunities.
                    Feel free to reach out to discuss your needs.
                  </p>
                  <div className="mt-2 md:mt-4 flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-400 mr-2 animate-pulse" />
                    <span className="text-xs text-green-400">Available for work</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>



            <div className="h-full flex justify-center lg:justify-start">
  <motion.form
    onSubmit={handleSubmit}
    className="relative bg-gradient-to-br from-dark-300/50 to-dark-400/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 w-full overflow-hidden flex flex-col max-w-md"
    style={{
      minHeight: "500px",
      borderWidth: "1px"
    }}
    initial="rest"
    whileHover="hover"
    variants={cardHoverVariants}
  >
    <input type="hidden" name="access_key" value="7dfa8c60-64f9-4ec4-b549-844587316c2d" />
    <input type="hidden" name="redirect" value="https://yourdomain.com/thank-you" />
    <input type="text" name="botcheck" className="hidden" />
    
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

    <h3 className="text-xl md:text-2xl font-semibold mb-6 text-white relative z-10">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-white">
        Send a Message
      </span>
    </h3>

    <div className="space-y-4 md:space-y-6 relative z-10 flex-grow">
      {[
        { id: "name", type: "text", placeholder: "Your Name" },
        { id: "email", type: "email", placeholder: "your.email@example.com" },
        { id: "subject", type: "text", placeholder: "Project Inquiry" }
      ].map((field) => (
        <div key={field.id} className="relative">
          <input
            type={field.type}
            id={field.id}
            name={field.id}
            value={(formData as any)[field.id]}
            onChange={handleChange}
            required
            className="w-full px-3 md:px-4 py-3 md:py-4 bg-dark-300/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent transition-all duration-300 text-sm md:text-base hover:scale-[1.01] hover:shadow-[0_0_0_2px_rgba(0,255,255,0.3)]"
            placeholder={field.placeholder}
          />
        </div>
      ))}

      <div className="relative">
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-3 md:px-4 py-3 md:py-4 bg-dark-300/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent transition-all duration-300 resize-none text-sm md:text-base hover:scale-[1.01] hover:shadow-[0_0_0_2px_rgba(0,255,255,0.3)]"
          placeholder="Tell me about your project or inquiry..."
        />
      </div>

      <div>
        <div className="hover:scale-[1.03] hover:shadow-[0_4px_24px_rgba(0,255,255,0.15)] transition-all duration-300">
          <Button
            type="submit"
            className="w-full group relative overflow-hidden bg-gradient-to-r from-neon-cyan to-neon-purple hover:from-neon-cyan/90 hover:to-neon-purple/90 text-dark font-medium py-4 md:py-6 rounded-lg transition-all duration-300 text-sm md:text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader2 className="h-4 w-4 md:h-5 md:w-5 mr-2 animate-spin" />
                Sending...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <Send className="h-4 w-4 md:h-5 md:w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                Send Message
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  </motion.form>
</div>

          
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;