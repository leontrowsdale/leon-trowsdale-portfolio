// src/ProjectsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { PORTFOLIO } from './data';

export default function ProjectsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // --- INITIALIZATION: ANTI-FLASH SYNC ---
  useEffect(() => {
    // 1. Sync with the Anti-Flash script result from index.html
    const isActuallyDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isActuallyDark);
    
    // 2. Universal Sync: Ensure HTML and BODY match for overscroll consistency
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

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white dark:bg-clean-text transition-colors duration-500"
    >

      {/* --- STICKY NAV GROUP WITH CONTOURED FOG --- */}
      <div className="fixed top-5 left-6 md:top-6 md:left-6 z-[70] flex flex-col items-start gap-1 pointer-events-none">
        
        {/* 1. Mini Brand */}
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
          <Link 
            to="/"
            className="cursor-pointer group outline-none flex items-center gap-2 h-9"
          >
            <div className="h-4 w-1 bg-green-500 rounded-full group-hover:shadow-[0_0_12px_rgba(34,197,94,0.6)] transition-shadow"></div>
            <span className="text-sm md:text-base font-bold tracking-tighter text-black dark:text-white uppercase whitespace-nowrap group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
              Leon Trowsdale
            </span>
          </Link>
        </div>

        {/* 2. Floating Back Button */}
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
          <Link 
            to="/" 
            className="flex items-center gap-2 text-[10px] font-mono text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors py-1 pr-2"
          >
            <ArrowLeft size={14} /> HOME
          </Link>
        </div>
      </div>

      {/* --- STATIC NAV --- */}
      <nav className="p-8 md:px-24 flex justify-between items-center bg-white dark:bg-clean-text relative transition-colors duration-500">
        <div className="absolute bottom-0 right-1 w-[192px] md:w-[1280px] h-[1px] bg-gray-100 dark:bg-neutral-800 transition-colors"></div>

        <div className="invisible flex items-center gap-2 text-sm font-mono text-gray-400">
          <ArrowLeft size={16} /> HOME
        </div>
        
        <span className="text-[10px] font-mono text-gray-300 dark:text-gray-600 uppercase tracking-widest transition-colors">
           Project Index / {PORTFOLIO.projects.filter(p => !p.archived).length} Total
        </span>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-20">
        <header className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-8 w-1 bg-green-500 rounded-full"></div>
            <h1 className="text-sm font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest transition-colors">Project Collection</h1>
          </div>
          <p className="text-5xl md:text-7xl font-bold tracking-tighter text-black dark:text-white max-w-3xl transition-colors">
            A complete index of my technical explorations.
          </p>
        </header>

        {/* Table Header (Desktop Only) */}
        <div className="hidden md:grid grid-cols-12 pb-4 border-b border-gray-100 dark:border-neutral-800 text-[10px] font-mono text-gray-400 dark:text-gray-600 uppercase tracking-widest px-4 transition-colors">
          <div className="col-span-1">Year</div>
          <div className="col-span-5">Project</div>
          <div className="col-span-4">Category</div>
          <div className="col-span-2 text-right">Link</div>
        </div>

        {/* Project List */}
        <div className="flex flex-col">
          {PORTFOLIO.projects
            .filter(project => !project.archived)
            .map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link 
                to={`/projects/${project.slug}`} 
                className="group grid grid-cols-1 md:grid-cols-12 items-center py-8 md:py-6 border-b border-gray-50 dark:border-neutral-800/50 hover:bg-gray-50/50 dark:hover:bg-neutral-900/50 px-4 transition-all"
              >
                <div className="col-span-1 text-xs font-mono text-gray-300 dark:text-gray-600 mb-2 md:mb-0 transition-colors">
                  {project.year || "2026"}
                </div>
                <div className="col-span-5">
                  <h3 className="text-xl font-bold text-black dark:text-white group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                    {project.title}
                  </h3>
                </div>
                <div className="col-span-4 text-sm text-gray-500 dark:text-gray-400 font-medium transition-colors">
                  {project.category}
                </div>
                <div className="col-span-2 flex justify-end">
                  <div className="h-8 w-8 rounded-full border border-gray-100 dark:border-neutral-800 flex items-center justify-center group-hover:bg-green-500 group-hover:border-green-500 transition-all">
                    <ArrowUpRight size={14} className="text-gray-400 dark:text-gray-600 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Simple Footer */}
      <footer className="py-5 text-center relative">
        <p className="text-[10px] font-mono text-gray-300 dark:text-gray-600 uppercase tracking-[0.2em] select-none transition-colors">
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