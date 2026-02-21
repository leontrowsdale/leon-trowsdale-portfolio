// src/ProjectDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Maximize2, X, ExternalLink, Sun, Moon } from 'lucide-react';
import { PORTFOLIO } from './data';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [isPdfFull, setIsPdfFull] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 1. Filter out archived projects BEFORE finding the current one or building nav
  const visibleProjects = PORTFOLIO.projects.filter(p => !p.archived);

  // 2. Find current project and its index within the VISIBLE list
  const currentIndex = visibleProjects.findIndex(p => p.slug === slug);
  const project = visibleProjects[currentIndex];

  // --- THEME INITIALIZATION: ANTI-FLASH SYNC ---
  useEffect(() => {
    // Sync with the Anti-Flash script from index.html
    const isActuallyDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isActuallyDark);
    
    // Force background sync for overscroll areas immediately
    const themeColor = isActuallyDark ? '#111111' : '#ffffff';
    document.documentElement.style.backgroundColor = themeColor;
    document.body.style.backgroundColor = themeColor;
  }, []);

  // --- THEME TOGGLE: UNIVERSAL SYNC ---
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

    // LOCK: Update BOTH tags to the same hex code to fix overscroll white-space
    document.documentElement.style.backgroundColor = themeColor;
    document.body.style.backgroundColor = themeColor;
  };

  // Scroll lock when PDF is fullscreen
  useEffect(() => {
    if (isPdfFull) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isPdfFull]);

  // --- HANDLE ARCHIVED OR MISSING PROJECTS ---
  if (!project) {
    return (
      <div className="min-h-screen bg-white dark:bg-clean-text flex flex-col items-center justify-center p-10 text-center font-mono transition-colors duration-500">
        <h2 className="text-black dark:text-white text-xl mb-4 font-bold uppercase tracking-tighter">
          Project Unavailable
        </h2>
        <p className="text-gray-400 dark:text-gray-500 text-sm mb-8 max-w-xs">
          This project is currently archived or does not exist.
        </p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-black dark:bg-neutral-800 text-white rounded-xl text-xs uppercase tracking-widest hover:bg-green-600 transition-colors"
        >
          Return Home
        </Link>
      </div>
    );
  }

  const prevProject = visibleProjects[(currentIndex - 1 + visibleProjects.length) % visibleProjects.length];
  const nextProject = visibleProjects[(currentIndex + 1) % visibleProjects.length];

  return (
    <motion.main 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-white dark:bg-clean-text transition-colors duration-500"
    >
      {/* --- STICKY NAV GROUP --- */}
      <div className="fixed top-5 left-6 md:top-6 md:left-6 z-[70] flex flex-col items-start gap-1 pointer-events-none">
        <div className="relative pointer-events-auto">
          <div 
            className="absolute inset-0 z-[-1] -m-5 transition-colors duration-500" 
            style={{
              background: isDarkMode 
                ? 'radial-gradient(ellipse at center, #111111 0%, rgba(17,17,17,0.9) 40%, transparent 80%)'
                : 'radial-gradient(ellipse at center, white 0%, rgba(255,255,255,0.9) 40%, transparent 80%)',
              filter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          />
          <Link to="/" className="cursor-pointer group outline-none flex items-center gap-2 h-9">
            <div className="h-4 w-1 bg-green-500 rounded-full group-hover:shadow-[0_0_12px_rgba(34,197,94,0.6)] transition-shadow"></div>
            <span className="text-sm md:text-base font-bold tracking-tighter text-black dark:text-white uppercase whitespace-nowrap group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
              Leon Trowsdale
            </span>
          </Link>
        </div>

        <div className="relative pointer-events-auto pl-1">
          <div 
            className="absolute inset-0 z-[-1] -m-5 transition-colors duration-500" 
            style={{
              background: isDarkMode 
                ? 'radial-gradient(ellipse at center, #111111 0%, rgba(17,17,17,0.9) 40%, transparent 80%)'
                : 'radial-gradient(ellipse at center, white 0%, rgba(255,255,255,0.9) 40%, transparent 80%)',
              filter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          />
          <Link to="/projects" className="flex items-center gap-2 text-[10px] font-mono text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors py-1 pr-2">
            <ArrowLeft size={14} /> All Projects
          </Link>
        </div>
      </div>

      {/* --- STATIC NAV --- */}
      <nav className="p-8 md:px-24 flex justify-between items-center bg-white dark:bg-clean-text relative transition-colors duration-500">
        <div className="absolute bottom-0 right-1 w-[192px] md:w-[1280px] h-[1px] bg-gray-100 dark:bg-neutral-800"></div>
        <div className="invisible flex items-center gap-2 text-sm font-mono text-gray-400">
          <ArrowLeft size={16} /> ALL PROJECTS
        </div>
        <span className="text-[10px] font-mono text-gray-300 dark:text-gray-600 uppercase tracking-widest">
           Project / {project.year || '2026'}
        </span>
      </nav>

      {/* --- PREV / NEXT NAVIGATION --- */}
      <div className="mt-5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-neutral-800">
          <Link to={`/projects/${prevProject.slug}`} className="group p-8 md:p-15 flex flex-col items-start hover:bg-gray-50/50 dark:hover:bg-neutral-900/50 transition-colors">
            <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
              Previous Project
            </span>
            <span className="text-2xl md:text-4xl font-bold tracking-tighter text-black dark:text-white group-hover:text-green-600 transition-colors">
              {prevProject.title}
            </span>
          </Link>

          <Link to={`/projects/${nextProject.slug}`} className="group p-8 md:p-15 flex flex-col items-start md:items-end md:text-right hover:bg-gray-50/50 dark:hover:bg-neutral-900/50 transition-colors">
            <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              Next Project
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /> 
            </span>
            <span className="text-2xl md:text-4xl font-bold tracking-tighter text-black dark:text-white group-hover:text-green-600 transition-colors">
              {nextProject.title}
            </span>
          </Link>
        </div>
      </div>

      {/* --- CONTENT HEADER --- */}
      <div className="max-w-6xl mx-auto px-8 py-16 md:py-10">
        <header className="mb-20">
          <p className="text-green-600 dark:text-green-500 font-mono text-xs uppercase tracking-[0.3em] mb-4">
            {project.category}
          </p>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 text-black dark:text-white">
            {project.title}
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
            {project.shortDescription}
          </p>
        </header>

        <div className="rounded-3xl overflow-hidden shadow-2xl mb-16 bg-gray-50 dark:bg-neutral-900">
          <img src={project.image} alt={project.title} className="w-full h-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 prose prose-lg dark:prose-invert">
            <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Overview</h2>
            <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line leading-relaxed">
              {project.details}
            </p>
          </div>
          
          <aside className="border-t border-gray-100 dark:border-neutral-800 pt-8 lg:border-t-0 lg:pt-0">
             <div className="space-y-8">
                <div>
                  <h4 className="text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Tools Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {PORTFOLIO.skills.slice(0, 4).map(skill => (
                      <span key={skill} className="px-3 py-1 bg-gray-50 dark:bg-neutral-900 rounded-full text-xs text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-neutral-800 transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
             </div>
          </aside>
        </div>
      </div>

      {/* --- PRESENTATION SECTION --- */}
      {project.pdfLink && (
        <div className="w-full max-w-6xl mx-auto mt-10 mb-24 px-6 md:px-12 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1 bg-green-500 rounded-full"></div>
              <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white uppercase tracking-wide">
                Project Presentation
              </h3>
            </div>
            
            <button 
              onClick={() => setIsPdfFull(true)}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm font-bold shadow-lg"
            >
              <Maximize2 size={16} />
              <span>Fullscreen</span>
            </button>
          </div>
          
          <div className="hidden md:block w-full aspect-[14/9] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-neutral-800 bg-gray-100 dark:bg-neutral-900 transition-colors">
            <iframe 
              src={`${project.pdfLink}#toolbar=0&navpanes=0`} 
              title={`${project.title} Presentation`}
              className="w-full h-full border-0"
            />
          </div>

          <div className="md:hidden w-full p-6 rounded-3xl border-2 border-dashed border-gray-200 dark:border-neutral-800 flex flex-col items-center text-center">
            <button 
              onClick={() => setIsPdfFull(true)}
              className="w-full py-5 bg-gray-900 dark:bg-neutral-900 text-white rounded-2xl font-bold flex justify-center items-center gap-3 shadow-xl active:scale-95 transition-transform border border-transparent dark:border-neutral-800"
            >
              <ExternalLink size={20} />
              Open Presentation
            </button>
          </div>
        </div>
      )}

      {/* --- FULLSCREEN POPUP MODAL --- */}
      {isPdfFull && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col animate-in fade-in duration-300">
          <div className="flex items-center justify-between p-4 bg-black text-white border-b border-white/10">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">{project.title}</span>
            <button 
              onClick={() => setIsPdfFull(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-grow w-full h-full bg-neutral-900 overflow-hidden">
            {window.innerWidth < 768 ? (
              <object
                data={`${project.pdfLink}#view=FitW`}
                type="application/pdf"
                className="w-full h-full"
              >
                <div className="flex flex-col items-center justify-center h-full text-white p-10 text-center">
                  <a href={project.pdfLink} className="px-8 py-4 bg-green-500 rounded-xl font-bold">
                    Download & View PDF
                  </a>
                </div>
              </object>
            ) : (
              <iframe 
                src={`${project.pdfLink}#toolbar=0&navpanes=0&view=FitW`} 
                className="w-full h-full border-0"
                title="Fullscreen Viewer"
              />
            )}
          </div>
        </div>
      )}

      <footer className="py-5 text-center relative">
        <p className="text-[10px] font-mono text-gray-300 dark:text-gray-600 uppercase tracking-[0.2em] select-none">
          © 2026 {PORTFOLIO.name}
        </p>
      </footer>

      {/* --- DARK MODE TOGGLE --- */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-5 right-5 md:bottom-10 md:right-10 z-[100] p-3 rounded-full bg-white dark:bg-neutral-900 text-black dark:text-white shadow-lg border border-gray-200 dark:border-neutral-800 transition-all hover:scale-110 active:scale-95 group"
        aria-label="Toggle Dark Mode"
      >
        {isDarkMode ? (
          <Sun size={20} className="group-hover:text-green-500 transition-colors" />
        ) : (
          <Moon size={20} className="group-hover:text-green-500 transition-colors" />
        )}
      </button>

    </motion.main>
  );
}