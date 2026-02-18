import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
      
      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(29,185,84,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-primary mb-4 tracking-widest text-sm"
          >
            SYSTEM STATUS: ONLINE
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white"
          >
            Engineering <br />
            <span className="text-muted-foreground">Intelligent Systems.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            Mechatronic Engineer specializing in <span className="text-white">robotics</span>, <span className="text-white">embedded control</span>, and <span className="text-white">automation</span>. 
            Bridging the gap between hardware and software to build precise, scalable systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button 
              size="lg" 
              onClick={scrollToProjects}
              className="bg-primary text-background hover:bg-primary/90 font-mono text-sm tracking-wider rounded-none border border-primary cursor-pointer"
            >
              VIEW PROJECTS
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white/10 text-white hover:bg-white/5 hover:text-primary font-mono text-sm tracking-wider rounded-none cursor-pointer"
            >
              DOWNLOAD CV
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <ArrowDown className="text-primary/50 w-6 h-6" />
      </motion.div>
    </section>
  );
}
