import React, { useState } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useMotionValue, 
  useSpring, 
  useMotionTemplate 
} from 'framer-motion';
import { Linkedin, Download, Copy, Check, ArrowUpRight } from 'lucide-react';

// --- DATA ---
const PORTFOLIO = {
  name: "Leon Trowsdale",
  role: "Mechatronic & Robotic Engineering Student",
  cvLink: "/Leon_Trowsdale_CV.pdf",
  linkedin: "https://linkedin.com/in/leon-trowsdale",
  email: "leon.trowsdale.uk@gmail.com",
  // CHANGE THIS TO YOUR PHOTO in public folder
  headshot: "/Hero_Image.png", 
  projects: [
    {
      title: "Automatic Dartboard",
      category: "Robotics / C++",
      image: "/dartboard.png",
    },
    {
      title: "6-DOF Robotic Arm",
      category: "Hardware / Python",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "IoT Climate Monitor",
      category: "Embedded / ESP32",
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Self-Balancing Robot",
      category: "Control Systems / PID",
      image: "https://images.unsplash.com/photo-1535378437323-9528742d2700?auto=format&fit=crop&q=80&w=800"
    }
  ]
};

const App = () => {
  const { scrollY } = useScroll();
  const [copied, setCopied] = useState(false);
  
  // --- ANIMATION CONTROLS ---
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  // THIS IS THE FIX: Fades the background out so it doesn't show during rubber-band scrolling
  const bgOpacity = useTransform(scrollY, [0, 600], [1, 0]); 

  // --- SPOTLIGHT HOVER EFFECT CONTROLS ---
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Springs make the spotlight smoothly trail behind the cursor
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  
  // Creates a 350px radial gradient mask that follows the smoothed mouse coordinates
  const maskImage = useMotionTemplate`radial-gradient(350px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(PORTFOLIO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const buttonClass = "group px-8 py-4 rounded-xl flex items-center justify-center gap-3 min-w-[200px] transition-all duration-300 border bg-white text-black border-gray-200 hover:border-green-500 hover:text-green-700 hover:shadow-[0_0_25px_rgba(74,222,128,0.3)] hover:scale-105 active:scale-95";

  return (
    <div className="relative w-full bg-white selection:bg-green-100 selection:text-green-900">
      
      {/* --- HEADER (Fixed Top Right) --- */}
      <nav className="fixed top-0 right-0 p-8 z-50 flex gap-4 items-center">
        <a 
          href={PORTFOLIO.linkedin}
          target="_blank"
          rel="noopener noreferrer" 
          className="p-3 rounded-full bg-white/40 backdrop-blur-md border border-white/50 hover:scale-110 hover:border-green-400/50 hover:text-green-700 hover:shadow-[0_0_20px_rgba(74,222,128,0.2)] transition-all text-gray-700 shadow-sm"
        >
          <Linkedin size={20} />
        </a>
        <a 
          href={PORTFOLIO.cvLink}
          download
          className="px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:text-green-700 hover:border-green-500 hover:shadow-[0_0_20px_rgba(74,222,128,0.3)] transition-all flex items-center gap-2 shadow-lg backdrop-blur-sm border border-gray-100"
        >
          <span>Download CV</span>
          <Download size={16} />
        </a>
      </nav>

      {/* --- FIXED BACKGROUND LAYER (The Image) --- */}
      <motion.div 
        style={{ opacity: bgOpacity }}
        className="fixed inset-0 z-0 flex justify-end items-end pointer-events-none md:pr-22"
      >
        
        {/* Interactive Image Container */}
        {/* pointer-events-auto allows this specific box to detect your mouse */}
        <div 
          className="w-full h-[85vh] md:w-[60vw] md:h-[95vh] relative pointer-events-auto cursor-default"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* 1. Base Layer (Greyscale) */}
          <img 
            src={PORTFOLIO.headshot} 
            alt="Leon Profile" 
            className="absolute inset-0 w-full h-full object-cover object-bottom grayscale contrast-125 opacity-90"
          />

          {/* 2. Top Layer (Full Color + Spotlight Mask) */}
          <motion.div 
            className="absolute inset-0 z-10"
            style={{
              WebkitMaskImage: maskImage,
              maskImage: maskImage,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <img 
              src={PORTFOLIO.headshot} 
              alt="Leon Profile" 
              className="w-full h-full object-cover colour object-bottom contrast-125"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* --- HERO TEXT (Fixed Position, Scrolls Away via Opacity) --- */}
      <div className="fixed bottom-0 left-0 w-full z-30 px-6 md:px-10 pb-12 pointer-events-none">
        <motion.div style={{ opacity: textOpacity }}>
          <h1 className="text-7xl md:text-9xl font-display font-medium tracking-tighter text-black mb-6 leading-[0.9] mix-blend-darken flex flex-col">
            <span>Leon</span>
            {/* The -translate-x shifts the text slightly left to optically align the T and the L. 
                Tweak these numbers if you want it to move more or less! */}
            <span className="-translate-x-1 md:translate-x-2">Trowsdale</span>
          </h1>
          <div className="flex items-center gap-4 mix-blend-darken ml-1 md:ml-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]"></span>
            </span>
            <p className="text-lg md:text-2xl text-clean-sub font-light tracking-wide max-w-xl">
              {PORTFOLIO.role}
            </p>
          </div>
        </motion.div>
      </div>

      {/* --- SCROLLABLE CONTENT LAYER --- */}
      {/* Added 'pointer-events-none' so your mouse passes through the empty space and hits the image underneath */}
      <div className="relative z-10 pointer-events-none">
        
        {/* 1. Spacer */}
        <div className="h-[75vh] w-full bg-transparent"></div>

        {/* 2. The Fog Hat */}
        <div 
          className="h-[40vh] w-full -mb-1"
          style={{
            background: 'linear-gradient(to top, white 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            maskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 100%)'
          }}
        ></div>

        {/* 3. Solid White Background */}
        {/* Added 'pointer-events-auto' so you can actually click the links and projects in this section */}
        {/* REMOVED the broken shadow class from this line */}
        <div className="bg-white pb-12 pt-12 relative z-20 pointer-events-auto">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            
            <div className="flex justify-between items-end mb-10 border-b border-gray-100 pb-8">
              <h2 className="text-4xl font-display font-medium">Projects</h2>
              <span className="hidden md:block text-gray-400 text-sm font-mono">2010 — 2026</span>
            </div>
            
            <div className="grid grid-cols-1 gap-10">
              {PORTFOLIO.projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8 }}
                  className="group cursor-pointer grid md:grid-cols-2 gap-12 items-center"
                >
                  <div className="overflow-hidden rounded-sm bg-gray-50 aspect-[16/9] relative transition-all duration-500 group-hover:shadow-[0_20px_40px_-15px_rgba(22,163,74,0.2)]">
                    <div className="absolute inset-0 bg-green-900/0 group-hover:bg-green-900/5 transition-colors z-10 duration-500" />
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
                    />
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <span className="text-green-800 text-xs font-bold tracking-widest uppercase bg-green-50 border border-green-100 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.1)] group-hover:shadow-[0_0_15px_rgba(74,222,128,0.3)] transition-shadow">
                        {project.category.split('/')[0]}
                      </span>
                      <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0 text-green-600 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                    </div>
                    
                    <h3 className="text-4xl font-display font-medium text-black group-hover:text-green-900 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-500 leading-relaxed text-lg group-hover:text-gray-600 transition-colors">
                      Engineered a robust solution integrating {project.category.split('/')[1]} logic. 
                      Focusing on scalability, real-time performance, and clean architecture.
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* FOOTER BUTTONS */}
            <div className="mt-10 border-t border-gray-100 pt-10 flex flex-col items-center">
              <p className="text-gray-400 mb-8 font-mono text-sm tracking-widest">CONNECT WITH ME</p>
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <button onClick={handleCopy} className={buttonClass}>
                  {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                  <span className="font-medium">{copied ? "Copied!" : "Copy Email"}</span>
                </button>
                <a href={PORTFOLIO.linkedin} target="_blank" rel="noopener noreferrer" className={buttonClass}>
                  <Linkedin size={18} />
                  <span className="font-medium">LinkedIn</span>
                </a>
                <a href={PORTFOLIO.cvLink} download className={buttonClass}>
                  <Download size={18} />
                  <span className="font-medium">Download CV</span>
                </a>
              </div>
            </div>

          </div>
        </div>
        
        {/* I REMOVED the broken absolute 100vh buffer from here so it stops infinitely scrolling */}
        
      </div>

    </div>
  );
};

export default App;