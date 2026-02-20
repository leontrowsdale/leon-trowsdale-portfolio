import React, { useState, useEffect } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useMotionValue, 
  useSpring, 
  useMotionTemplate,
  animate // <--- Make sure 'animate' is here!
} from 'framer-motion';
import { Linkedin, Download, Copy, Check, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PORTFOLIO } from './data'; 

const App = () => {
  const { scrollY } = useScroll();
  const [copied, setCopied] = useState(false);

// Animation Transforms
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // RESTORED & SLOWED DOWN:
  // We changed [0, 600] to [0, 1500]. This means it takes 1500px of scrolling
  // to fade completely, making it much slower and subtler.
  const bgOpacity = useTransform(scrollY, [0, 1500], [1, 0]);
  
  // Spotlight Controls
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const maskImage = useMotionTemplate`radial-gradient(350px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

// Add these two pieces of state/refs near your other hooks
  const [controls, setControls] = useState(null);

const startIdleAnimation = () => {
    const isMobile = window.innerWidth < 768;
    const winW = window.innerWidth;
    const winH = window.innerHeight;

    let cXValues, cYValues;

    if (isMobile) {
      // MOBILE: Full bounds
      cXValues = [winW * 0.1, winW * 0.9, winW * 0.2, winW * 0.8, winW * 0.1];
      cYValues = [winH * 0.1, winH * 0.9, winH * 0.3, winH * 0.7, winH * 0.1];
    } else {
      // DESKTOP: Constrained to the right-side image container
      // If the image is md:w-[60vw] and aligned right:
      const containerW = winW * 0.6;
      
      // We keep the cursor between 10% and 90% of the CONTAINER'S width
      // so it never flies off the actual screen edge.
      cXValues = [
        containerW * 0.2, 
        containerW * 0.8, 
        containerW * 0.4, 
        containerW * 0.7, 
        containerW * 0.2
      ];
      cYValues = [winH * 0.1, winH * 0.9, winH * 0.2, winH * 0.8, winH * 0.1];
    }

    const cX = animate(mouseX, cXValues, { duration: 30, repeat: Infinity, ease: "easeInOut" });
    const cY = animate(mouseY, cYValues, { duration: 35, repeat: Infinity, ease: "easeInOut" });

    setControls({ x: cX, y: cY });
  };

  useEffect(() => {
    setIsHovered(true);
    startIdleAnimation();
    
    // Cleanup on unmount
    return () => {
      controls?.x.stop();
      controls?.y.stop();
    };
  }, []);
// --- IDLE ANIMATION (Now for both Desktop & Mobile) ---
  useEffect(() => {
    setIsHovered(true);
    startIdleAnimation();
    return () => {
      controls?.x.stop();
      controls?.y.stop();
    };
  }, []);

const handleMouseMove = (e) => {
    // 1. Force stop the idle animation if it's running
    if (controls) {
      controls.x.stop();
      controls.y.stop();
    }
    
    // 2. Map the mouse position to the container
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
const handleCopy = () => {
    // navigator.clipboard is sometimes restricted on mobile if not on HTTPS
    // but this is the standard way to do it
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(PORTFOLIO.email).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      // Fallback for older mobile browsers
      const textArea = document.createElement("textarea");
      textArea.value = PORTFOLIO.email;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Fallback copy failed', err);
      }
      document.body.removeChild(textArea);
    }
  };

  const buttonClass = "group px-8 py-4 rounded-xl flex items-center justify-center gap-3 min-w-[200px] transition-all duration-300 border bg-white text-black border-gray-200 hover:border-green-500 hover:text-green-700 hover:shadow-[0_0_25px_rgba(74,222,128,0.3)] hover:scale-105 active:scale-95";

  return (
    <div className="relative w-full bg-white selection:bg-green-100 selection:text-green-900">
      
{/* --- HEADER --- */}
      <nav className="fixed top-0 right-0 p-8 z-50 flex gap-4 items-center">
        {/* LinkedIn Button */}
        <a 
          href={PORTFOLIO.linkedin} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="p-3 rounded-full bg-white/40 backdrop-blur-md border border-white/50 hover:scale-110 text-gray-700 shadow-sm transition-all"
        >
          <Linkedin size={20} />
        </a>

        {/* REPLICATED: Download CV Button */}
        <a 
          href={PORTFOLIO.cvLink} 
          download 
          className="px-6 py-3 rounded-full bg-white/40 backdrop-blur-md border border-white/50 hover:scale-110 text-gray-700 shadow-sm flex items-center gap-2 transition-all"
        >
          <Download size={16} />
          <span className="text-sm font-medium">CV</span>
        </a>
      </nav>

{/* --- FIXED BACKGROUND LAYER --- */}
      <motion.div 
        // RESTORED: This connects the fade logic to the image container
        style={{ opacity: bgOpacity }}
        className="fixed inset-0 z-0 flex justify-end items-end pointer-events-none md:pr-22"
      >
<div 
  className="w-full h-full max-h-[100dvh] md:w-[60vw] md:h-[95vh] relative pointer-events-auto cursor-default overflow-hidden"
  onMouseMove={handleMouseMove}
  onMouseEnter={() => {
    // Kill the drift immediately on entry
    controls?.x?.stop();
    controls?.y?.stop();
    setIsHovered(true);
  }}
  onMouseLeave={() => {
    // Resume the drift when the mouse leaves
    startIdleAnimation();
  }}
  onTouchStart={() => {
    // Mobile fix: kill drift on tap
    controls?.x?.stop();
    controls?.y?.stop();
  }}
  onTouchEnd={() => {
    // Resume drift after a short delay on mobile
    setTimeout(startIdleAnimation, 500);
  }}
>
          {/* Base Layer (Greyscale) */}
          <img 
            src={PORTFOLIO.headshot} 
            alt="Leon Profile" 
            // Added 'h-[110%]' to give the image a little "bleed" 
            // so it doesn't show white space if the browser shifts
            className="absolute inset-0 w-full h-[110%] object-cover object-bottom grayscale contrast-125 opacity-90"
          />

          {/* Top Layer (Full Color + Spotlight Mask) */}
          <motion.div 
            className="absolute inset-0 z-10"
            style={{
              WebkitMaskImage: maskImage,
              maskImage: maskImage,
            }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <img 
              src={PORTFOLIO.headshot} 
              alt="Leon Profile Color" 
              className="w-full h-[110%] object-cover object-bottom contrast-125" 
            />
          </motion.div>
        </div>
      </motion.div>

      {/* --- HERO TEXT --- */}
      <div className="fixed bottom-0 left-0 w-full z-30 px-6 md:px-10 pb-12 pointer-events-none">
        <motion.div style={{ opacity: textOpacity }}>
          <h1 className="text-7xl md:text-9xl font-display font-medium tracking-tighter text-black mb-6 leading-[0.9] mix-blend-darken flex flex-col">
            <span>Leon</span>
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
      <div className="relative z-10 pointer-events-none">
        
        <div className="h-[75vh] w-full bg-transparent"></div>

        <div 
          className="h-[38vh] w-full -mb-1"
          style={{
            background: 'linear-gradient(to top, white 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            maskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 100%)'
          }}
        ></div>

        <div className="bg-white pb-10 pt-12 relative z-20 pointer-events-auto">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            
{/* --- SECTIONED CONTENT GRID --- */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-t border-gray-100 pt-16 mb-24">
  
  {/* Column 2: Experience (Top on Mobile, Right on Desktop) */}
  <section className="bg-gray-50/50 rounded-3xl p-8 border border-gray-100 shadow-sm h-full lg:order-2 lg:row-span-2">
    <div className="flex items-center gap-3 mb-8">
      <div className="h-8 w-1 bg-green-500 rounded-full"></div>
      <h2 className="text-sm font-mono text-gray-400 uppercase tracking-widest">Experience</h2>
    </div>
    <div className="space-y-10">
      {PORTFOLIO.experience?.map((exp, i) => (
        <motion.div key={i} whileHover={{ x: 4 }} className="group">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-bold text-black group-hover:text-green-700 transition-colors">{exp.role}</h3>
              <p className="text-green-700 font-medium">{exp.company}</p>
            </div>
            <span className="text-sm font-mono text-gray-400 italic">{exp.year}</span>
          </div>
          <p className="text-gray-500 leading-relaxed border-l-2 border-gray-100 pl-4 ml-1">{exp.description}</p>
        </motion.div>
      ))}
    </div>
  </section>

  {/* Left Container: Education and Skills */}
  <div className="flex flex-col gap-8 lg:order-1">
    
    {/* Education Card (Moves below Experience on mobile) */}
    <section className="bg-gray-50/50 rounded-3xl p-8 border border-gray-100 shadow-sm order-1 lg:order-none">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-8 w-1 bg-green-500 rounded-full"></div>
        <h2 className="text-sm font-mono text-gray-400 uppercase tracking-widest">Education</h2>
      </div>
      <div className="space-y-6">
        {PORTFOLIO.education?.map((edu, i) => (
          <motion.div key={i} whileHover={{ x: 4 }} className="relative pl-6 border-l border-gray-200">
            <div className="absolute -left-[5px] top-2 h-2 w-2 rounded-full bg-gray-300"></div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-lg font-bold text-black">{edu.degree}</h3>
              <span className="text-xs font-mono text-gray-400 bg-white px-2 py-1 rounded border border-gray-100">{edu.year}</span>
            </div>
            <p className="text-green-700 font-medium text-sm mb-2">{edu.school}</p>
            <p className="text-gray-500 text-sm leading-relaxed">{edu.description}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Skills Card (Bottom of the stack) */}
    <section className="bg-gray-50/50 rounded-3xl p-8 border border-gray-100 shadow-sm order-2 lg:order-none">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-8 w-1 bg-green-500 rounded-full"></div>
        <h2 className="text-sm font-mono text-gray-400 uppercase tracking-widest">Technical Skills</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {PORTFOLIO.skills?.map((skill, i) => (
          <motion.span 
            key={i} 
            whileHover={{ y: -3, backgroundColor: '#fff' }} 
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 shadow-sm hover:border-green-300 hover:text-green-700 transition-all cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </section>
  </div>
</div>
            {/* --- PROJECTS SECTION --- */}
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
                >
                  <Link 
                    to={`/project/${project.slug}`} 
                    className="group cursor-pointer grid md:grid-cols-2 gap-12 items-center block"
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
                        {project.shortDescription || "Click to view project details and architecture."}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* --- FOOTER --- */}
            <div className="mt-8 border-t border-gray-100 pt-10 flex flex-col items-center">
              <p className="text-gray-400 mb-8 font-mono text-sm tracking-widest">CONNECT WITH ME</p>
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
<button 
  onClick={handleCopy} 
  className={buttonClass}
>
  {/* We use the simple ternary here like you had before */}
  {copied ? <Check size={18} /> : <Copy size={18} />}
  <span>{copied ? "Copied!" : "Email"}</span>
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
        
      </div>

{/* --- FOOTER --- */}


              <div className="flex flex-wrap justify-center gap-4 mb-12">


              
              {/* NEW: 2026 LEON SMALL TEXT */}
              <div className="pb-8">
                <p className="text-[10px] font-mono text-gray-300 uppercase tracking-[0.2em] select-none">
                  © 2026 Leon Trowsdale
                </p>
              </div>
            </div>

    </div>
  );
};

export default App;