import React, { useState, useEffect } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useMotionValue, 
  useSpring, 
  useMotionTemplate,
  animate 
} from 'framer-motion';
import { Linkedin, Download, Copy, Check, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PORTFOLIO } from './data'; 

const MotionLink = motion.create(Link);

const App = () => {
  const { scrollY } = useScroll();
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [controls, setControls] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSafari, setIsSafari] = useState(false);

  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const bgOpacity = useTransform(scrollY, [0, 1500], [1, 0]);
  const miniOpacity = useTransform(scrollY, [300, 500], [0, 1]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const maskImage = useMotionTemplate`radial-gradient(350px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

  useEffect(() => {
    window.scrollTo(0, 0);
    const userAgent = window.navigator.userAgent.toLowerCase();
    const safari = userAgent.indexOf('safari') !== -1 && userAgent.indexOf('chrome') === -1;
    setIsSafari(safari);

    const isActuallyDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isActuallyDark);
    const themeColor = isActuallyDark ? '#111111' : '#ffffff';
    document.documentElement.style.backgroundColor = themeColor;
    document.body.style.backgroundColor = themeColor;
  }, []);

  const toggleTheme = () => {
    const newDarkState = !isDarkMode;
    setIsDarkMode(newDarkState);
    const themeColor = newDarkState ? '#111111' : '#ffffff';
    if (newDarkState) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
    document.documentElement.style.backgroundColor = themeColor;
    document.body.style.backgroundColor = themeColor;
  };

  const startIdleAnimation = () => {
    const isMobile = window.innerWidth < 768;
    const winW = window.innerWidth;
    const winH = window.innerHeight;
    let cXValues, cYValues;
    if (isMobile) {
      cXValues = [winW * 0.1, winW * 0.9, winW * 0.2, winW * 0.8, winW * 0.1];
      cYValues = [winH * 0.1, winH * 0.9, winH * 0.3, winH * 0.7, winH * 0.1];
    } else {
      const containerW = winW * 0.6;
      cXValues = [containerW * 0.2, containerW * 0.8, containerW * 0.4, containerW * 0.7, containerW * 0.2];
      cYValues = [winH * 0.1, winH * 0.9, winH * 0.2, winH * 0.8, winH * 0.1];
    }
    const cX = animate(mouseX, cXValues, { duration: 15, repeat: Infinity, ease: "easeInOut" });
    const cY = animate(mouseY, cYValues, { duration: 20, repeat: Infinity, ease: "easeInOut" });
    setControls({ x: cX, y: cY });
  };

  useEffect(() => {
    setIsHovered(true);
    startIdleAnimation();
    return () => {
      controls?.x?.stop();
      controls?.y?.stop();
    };
  }, []);

  const handleMouseMove = (e) => {
    if (controls) {
      controls.x.stop();
      controls.y.stop();
    }
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(PORTFOLIO.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const buttonClass = "group px-8 py-4 rounded-xl flex items-center justify-center gap-3 min-w-[200px] transition-all duration-300 border bg-white dark:bg-neutral-900 text-black dark:text-white border-gray-200 dark:border-neutral-800 hover:border-green-500 hover:text-green-700 dark:hover:text-green-400 hover:shadow-[0_0_25px_rgba(74,222,128,0.3)] hover:scale-105 active:scale-95";

  return (
    <div className="relative w-full bg-white dark:bg-clean-text transition-colors duration-500 selection:bg-green-100 selection:text-green-900">
      
      {/* --- STICKY MINI BRAND WITH FOG --- */}
      <motion.button 
        style={{ opacity: miniOpacity }}
        className="fixed top-5 left-6 md:top-6 md:left-6 z-[60] pointer-events-auto cursor-pointer group outline-none"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
      >
        <div 
          className="absolute inset-0 z-[-1] -m-4 transition-colors duration-500" 
          style={{
            background: isDarkMode 
              ? 'radial-gradient(circle at 0% 0%, #111111 0%, rgba(17,17,17,0.7) 40%, transparent 80%)'
              : 'radial-gradient(circle at 0% 0%, white 0%, rgba(255,255,255,0.7) 40%, transparent 80%)',
            filter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
        />
        <div className="flex items-center gap-2 h-9 relative">
          <div className="h-4 w-1 bg-green-500 rounded-full group-hover:shadow-[0_0_12px_rgba(34,197,94,0.6)] transition-shadow"></div>
          <span className="text-sm md:text-base font-bold tracking-tighter text-black dark:text-white uppercase whitespace-nowrap group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
            Leon Trowsdale
          </span>
        </div>
      </motion.button>

      {/* --- HEADER NAV --- */}
      <nav className="fixed z-50 flex items-center top-5 right-4 gap-2 md:top-5 md:right-18 md:gap-4">
        <a href={PORTFOLIO.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/40 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-neutral-800 shadow-sm transition-all hover:scale-110 text-gray-700 dark:text-gray-300 p-2 md:p-3">
          <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
        </a>
        <a href={PORTFOLIO.cvLink} download className="rounded-full bg-white/40 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-neutral-800 shadow-sm flex items-center transition-all hover:scale-110 text-gray-700 dark:text-gray-300 px-3 py-2 gap-1.5 md:px-6 md:py-3 md:gap-2">
          <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span className="font-bold uppercase tracking-wider text-[10px] md:text-sm">CV</span>
        </a>
      </nav>

      {/* --- FIXED BACKGROUND LAYER --- */}
      <motion.div style={{ opacity: bgOpacity }} className="fixed inset-0 z-0 flex justify-end items-end pointer-events-none md:pr-22">
        <div className="w-full h-full max-h-[100dvh] md:w-[60vw] md:h-[95vh] relative pointer-events-auto cursor-default overflow-hidden" onMouseMove={handleMouseMove} onMouseEnter={() => { controls?.x?.stop(); controls?.y?.stop(); setIsHovered(true); }} onMouseLeave={startIdleAnimation}>
          <img src={PORTFOLIO.headshot} alt="Leon Profile" className={`absolute inset-0 w-full object-cover object-bottom grayscale contrast-125 opacity-90 transition-all duration-500 ${isSafari ? 'h-[115%] min-h-[105svh]' : 'h-[110%]'}`} />
          <motion.div className="absolute inset-0 z-10" style={{ WebkitMaskImage: maskImage, maskImage: maskImage }} animate={{ opacity: isHovered ? 1 : 0 }} transition={{ duration: 1 }}>
            <img src={PORTFOLIO.headshot} alt="Leon Profile Color" className={`w-full object-cover object-bottom contrast-125 transition-all duration-500 ${isSafari ? 'h-[115%] min-h-[105svh]' : 'h-[110%]'}`} />
          </motion.div>
        </div>
      </motion.div>

      {/* --- HERO TEXT --- */}
      <div className="fixed bottom-0 left-0 w-full z-30 px-6 md:px-10 pb-6 md:pb-12 pointer-events-none">
        <motion.div style={{ opacity: textOpacity }}>
          <h1 className="text-7xl md:text-9xl font-display font-medium tracking-tighter text-white md:text-black dark:md:text-white mb-2 leading-[0.9] flex flex-col transition-colors duration-500" style={{ filter: window.innerWidth < 768 ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' : 'none' }}>
            <span>Leon</span>
            <span className="-translate-x-1 md:translate-x-2">Trowsdale</span>
          </h1>
          <div className="flex items-center gap-4 ml-1 md:ml-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]"></span>
            </span>
            <p className="text-lg md:text-2xl font-light tracking-wide max-w-xl text-white md:text-gray-500 dark:md:text-gray-400 transition-colors duration-500">
              {PORTFOLIO.role}
            </p>
          </div>
        </motion.div>
      </div>

      {/* --- SCROLLABLE CONTENT --- */}
      <div className="relative z-10 pointer-events-none">
        <div className="h-[75vh] w-full bg-transparent"></div>
        <div className="h-[38vh] w-full -mb-1 transition-colors duration-500" style={{
          background: isDarkMode 
            ? 'linear-gradient(to top, #111111 0%, rgba(17,17,17,0.8) 50%, rgba(17,17,17,0) 100%)'
            : 'linear-gradient(to top, white 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          maskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 100%)'
        }}></div>

        <div className={`bg-white dark:bg-clean-text transition-colors duration-500 pb-10 pt-12 relative z-20 pointer-events-auto ${isSafari ? '-mt-[2px]' : ''}`}>
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            
            {/* --- EXPERIENCE & EDUCATION GRID --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-20 mb-20 items-start">
              
              {/* LEFT COLUMN: Education then Technical Skills */}
              <div className="flex flex-col gap-10">
                <section className="bg-gray-50/50 dark:bg-neutral-900/50 rounded-3xl p-8 border border-gray-100 dark:border-neutral-800 shadow-sm transition-colors">
                  <div className="flex items-center gap-3 mb-10">
                    <div className="h-8 w-1 bg-green-500 rounded-full"></div>
                    <h2 className="text-sm font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest">Education</h2>
                  </div>
                  <div className="space-y-4">
                    {PORTFOLIO.education?.map((edu, i) => (
                      <motion.div key={i} whileHover={{ x: 6 }} className="relative pl-6 border-l border-gray-200 dark:border-neutral-800 py-4 rounded-xl cursor-pointer group will-change-transform">
                        <div className="absolute -left-[5px] top-7 h-2.5 w-2.5 rounded-full bg-gray-300 dark:bg-neutral-700 group-hover:bg-green-500 transition-colors duration-300 shadow-sm"></div>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-lg font-bold text-black dark:text-white transition-colors">{edu.degree}</h3>
                          <span className="text-xs font-mono text-gray-400 dark:text-gray-500 bg-white dark:bg-neutral-900 px-2 py-1 rounded border border-gray-100 dark:border-neutral-800 transition-colors">{edu.year}</span>
                        </div>
                        <p className="text-green-700 dark:text-green-500 font-medium text-sm mb-2 transition-colors">{edu.school}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed transition-colors">{edu.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </section>

                <section className="bg-gray-50/50 dark:bg-neutral-900/50 rounded-3xl p-8 border border-gray-100 dark:border-neutral-800 shadow-sm transition-colors">
                  <div className="flex items-center gap-3 mb-10">
                    <div className="h-8 w-1 bg-green-500 rounded-full"></div>
                    <h2 className="text-sm font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest">Technical Skills</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {PORTFOLIO.skills?.map((skill, i) => (
                      <motion.span 
                        key={i} 
                        initial={{ borderColor: 'var(--pill-border)', boxShadow: '0 0 0px rgba(34, 197, 94, 0)' }} 
                        whileHover={{ y: -5, borderColor: '#22c55e', boxShadow: '0 0 15px rgba(34, 197, 94, 0.2)', transition: { duration: 0.2 } }} 
                        whileTap={{ scale: 0.95, borderColor: '#16a34a', boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)', transition: { duration: 0.1 } }}
                        className="px-4 py-2 bg-white dark:bg-neutral-900 border rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 cursor-default select-none touch-manipulation will-change-transform shadow-sm"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </section>
              </div>

              {/* RIGHT COLUMN: Experience */}
              <section className="bg-gray-50/50 dark:bg-neutral-900/50 rounded-3xl p-8 border border-gray-100 dark:border-neutral-800 shadow-sm h-full transition-colors">
                <div className="flex items-center gap-3 mb-10">
                  <div className="h-8 w-1 bg-green-500 rounded-full"></div>
                  <h2 className="text-sm font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest">Experience</h2>
                </div>
                <div className="space-y-4">
                  {PORTFOLIO.experience?.map((exp, i) => (
                    <motion.div key={i} whileHover={{ x: 6 }} className="relative pl-6 border-l border-gray-200 dark:border-neutral-800 py-4 rounded-xl cursor-pointer group will-change-transform">
                      <div className="absolute -left-[5px] top-7 h-2.5 w-2.5 rounded-full bg-gray-300 dark:bg-neutral-700 group-hover:bg-green-500 transition-colors duration-300 shadow-sm"></div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-lg font-bold text-black dark:text-white transition-colors">{exp.role}</h3>
                        <span className="text-xs font-mono text-gray-400 dark:text-gray-500 bg-white dark:bg-neutral-900 px-2 py-1 rounded border border-gray-100 dark:border-neutral-800 transition-colors">{exp.year}</span>
                      </div>
                      <p className="text-green-700 dark:text-green-500 font-medium text-sm mb-2 transition-colors">{exp.company}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed transition-colors">{exp.description}</p>
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>

            {/* --- PROJECTS SECTION --- */}
            <section className="mb-10 px-4 md:px-0 border-t border-gray-100 dark:border-neutral-800 pt-10 transition-colors">
              <div className="flex items-baseline justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1 bg-green-500 rounded-full"></div>
                  <h2 className="text-sm font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest">Featured Works</h2>
                </div>
                <span className="text-xs font-mono text-gray-300 dark:text-gray-600 uppercase tracking-widest">
                  {PORTFOLIO.projects.filter(p => p.featured && !p.archived).length} Featured
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {PORTFOLIO.projects.filter(project => project.featured && !project.archived).map((project, i) => (
                  <MotionLink key={i} to={`/projects/${project.slug}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }} className="group block relative cursor-pointer pointer-events-auto">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-gray-100 dark:bg-neutral-900 shadow-sm transition-all group-hover:shadow-[0_20px_40px_rgba(34,197,94,0.15)]">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-8 text-center">
                        <p className="text-white text-sm md:text-base leading-relaxed mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{project.shortDescription}</p>
                        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full scale-75 group-hover:scale-100 transition-transform duration-300 shadow-xl"><ArrowUpRight size={20} className="text-black" /></div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-start px-2">
                      <div>
                        <h3 className="text-xl font-bold text-black dark:text-white group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">{project.title}</h3>
                        <p className="text-xs font-mono text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-1 transition-colors">{project.category}</p>
                      </div>
                      <span className="text-xs font-mono text-gray-300 dark:text-gray-600 mt-1 transition-colors">{project.year}</span>
                    </div>
                  </MotionLink>
                ))}
              </div>
              <div className="mt-10 flex justify-center">
                <Link to="/projects" className="group flex items-center gap-3 px-10 py-4 rounded-xl border border-gray-200 dark:border-neutral-800 font-mono text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]">View All Projects <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></Link>
              </div>
            </section>

            <footer className="mt-20 border-t border-gray-100 dark:border-neutral-800 pt-5 transition-colors flex flex-col items-center">
              <p className="text-gray-400 dark:text-gray-500 mb-5 font-mono text-sm tracking-widest">CONNECT WITH ME</p>
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto mb-10">
                <button onClick={handleCopy} className={buttonClass}>{copied ? <Check size={18} /> : <Copy size={18} />}<span>{copied ? "Copied!" : "Email"}</span></button>
                <a href={PORTFOLIO.linkedin} target="_blank" rel="noopener noreferrer" className={buttonClass}><Linkedin size={18} /><span className="font-medium">LinkedIn</span></a>
                <a href={PORTFOLIO.cvLink} download className={buttonClass}><Download size={18} /><span className="font-medium">Download CV</span></a>
              </div>
              <div className="pb-2"><p className="text-[10px] font-mono text-gray-300 dark:text-gray-600 uppercase tracking-[0.2em] select-none transition-colors">© 2026 Leon Trowsdale</p></div>
            </footer>
          </div>
        </div>
      </div>

      <button onClick={toggleTheme} className="fixed bottom-5 right-5 md:bottom-10 md:right-10 z-[100] p-3 rounded-full bg-white dark:bg-neutral-900 text-black dark:text-white shadow-lg border border-gray-200 dark:border-neutral-800 transition-all hover:scale-110 active:scale-95 group" aria-label="Toggle Dark Mode">{isDarkMode ? <Sun size={20} className="group-hover:text-green-500 transition-colors" /> : <Moon size={20} className="group-hover:text-green-500 transition-colors" />}</button>

    </div>
  );
};

export default App;