
import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ContactSection from '@/components/sections/ContactSection';
import Preloader from '@/components/three/Preloader';
import Enhanced3DCanvas from '@/components/three/Enhanced3DCanvas';
import Mobile3DFallback from '@/components/three/Mobile3DFallback';
import PerformanceMonitor from '@/components/three/PerformanceMonitor';
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';

// Mock data for 3D elements
const projects = [
  { id: 1, title: "Doctor Appointment System", description: "Full-stack healthcare management platform", tags: ["React", "Node.js", "MongoDB"] },
  { id: 2, title: "3D Product Showcase", description: "Interactive WebGL product visualization", tags: ["Three.js", "React", "WebGL"] },
  { id: 3, title: "E-Commerce Platform", description: "Complete online shopping solution", tags: ["React", "Express", "MongoDB"] },
  { id: 4, title: "DevTinder", description: "Developer networking platform", tags: ["React", "Node.js", "Socket.io"] },
  { id: 5, title: "Chat Application", description: "Real-time messaging system", tags: ["React", "Socket.io", "Express"] },
  { id: 6, title: "AI Image Generator", description: "Text-to-image generation tool", tags: ["React", "AI API", "Stripe"] },
];
const skills = [
  { name: "React", color: "#61DAFB" },
  { name: "Node.js", color: "#68A063" },
  { name: "MongoDB", color: "#47A248" },
  { name: "Three.js", color: "#000000" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Next.js", color: "#000000" },
  { name: "Express", color: "#000000" },
  { name: "WebGL", color: "#990000" },
];

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false);
  const capabilities = useDeviceCapabilities();

  useEffect(() => {
    document.title = "Akhil Sharma | Full Stack & 3D Web Developer";
    if (process.env.NODE_ENV === "development") {
      setShowPerformanceMonitor(true);
    }
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  const handlePerformanceChange = (stats) => {
    if (stats.fps < 30) {
      // Optionally handle low FPS
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="preloader" onComplete={handlePreloaderComplete} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Suspense and 3D background temporarily removed for debugging */}
            {/* <Suspense fallback={<div className="fixed inset-0 bg-dark -z-10" />}> */}
            {/*   {capabilities.isLowEnd ? <Mobile3DFallback /> : <Enhanced3DCanvas projects={projects} skills={skills} />} */}
            {/* </Suspense> */}
            <Navbar />
            <main className="relative z-10">
              <HeroSection />
              <AboutSection />
              <ServicesSection />
              <ProjectsSection />
              <SkillsSection />
              <ContactSection />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
