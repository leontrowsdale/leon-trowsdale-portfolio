import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO } from './data';

export default function ProjectsPage() {
  return (
    <motion.main className="min-h-screen bg-white">

{/* --- STICKY NAV GROUP WITH CONTOURED FOG --- */}
      <div className="fixed top-5 left-6 md:top-11 md:left-10 z-[70] flex flex-col items-start gap-1 pointer-events-none">
        
        {/* 1. Mini Brand (Wider Fog) */}
        <div className="relative pointer-events-auto">
          {/* Fog tailored to the brand width */}
          <div 
            className="absolute inset-0 z-[-1] -m-5" 
            style={{
              background: 'radial-gradient(ellipse at center, white 0%, rgba(255,255,255,0.9) 40%, transparent 80%)',
              filter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          />
          <Link 
            to="/"
            className="cursor-pointer group outline-none flex items-center gap-2 h-9"
          >
            <div className="h-4 w-1 bg-green-500 rounded-full group-hover:shadow-[0_0_12px_rgba(34,197,94,0.6)] transition-shadow"></div>
            <span className="text-sm md:text-base font-bold tracking-tighter text-black uppercase whitespace-nowrap group-hover:text-green-700 transition-colors">
              Leon Trowsdale
            </span>
          </Link>
        </div>

        {/* 2. Floating Back Button (Narrower Fog) */}
        <div className="relative pointer-events-auto pl-1">
          {/* Fog tailored to the shorter button width */}
          <div 
            className="absolute inset-0 z-[-1] -m-5" 
            style={{
              background: 'radial-gradient(ellipse at center, white 0%, rgba(255,255,255,0.9) 40%, transparent 80%)',
              filter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          />
          <Link 
            to="/" 
            className="flex items-center gap-2 text-[10px] font-mono text-gray-400 hover:text-green-600 transition-colors py-1 pr-2"
          >
            <ArrowLeft size={14} /> HOME
          </Link>
        </div>
        
      </div>
{/* --- STATIC NAV --- */}
      <nav className="p-8 md:px-24 flex justify-between items-center bg-white relative">
        
        {/* --- ADJUSTED LINE: Changed w-24 to w-48 --- */}
        <div className="absolute bottom-0 right-1 w-[192px] md:w-[1360px] h-[1px] bg-gray-100"></div>

        <div className="invisible flex items-center gap-2 text-sm font-mono text-gray-400">
          <ArrowLeft size={16} /> HOME
        </div>
        
        <span className="text-[10px] font-mono text-gray-300 uppercase tracking-widest">
           Project Index / {PORTFOLIO.projects.length} Total
        </span>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-20">
        <header className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-8 w-1 bg-green-500 rounded-full"></div>
            <h1 className="text-sm font-mono text-gray-400 uppercase tracking-widest">Project Collection</h1>
          </div>
          <p className="text-5xl md:text-7xl font-bold tracking-tighter text-black max-w-3xl">
            A complete index of my technical explorations.
          </p>
        </header>

        {/* Table Header (Desktop Only) */}
        <div className="hidden md:grid grid-cols-12 pb-4 border-b border-gray-100 text-[10px] font-mono text-gray-400 uppercase tracking-widest px-4">
          <div className="col-span-1">Year</div>
          <div className="col-span-5">Project</div>
          <div className="col-span-4">Category</div>
          <div className="col-span-2 text-right">Link</div>
        </div>

        {/* Project List */}
        <div className="flex flex-col">
          {PORTFOLIO.projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link 
                to={`/projects/${project.slug}`} 
                className="group grid grid-cols-1 md:grid-cols-12 items-center py-8 md:py-6 border-b border-gray-50 hover:bg-gray-50/50 px-4 transition-all"
              >
                <div className="col-span-1 text-xs font-mono text-gray-300 mb-2 md:mb-0">
                  {project.year || "2026"}
                </div>
                <div className="col-span-5">
                  <h3 className="text-xl font-bold text-black group-hover:text-green-700 transition-colors">
                    {project.title}
                  </h3>
                </div>
                <div className="col-span-4 text-sm text-gray-500 font-medium">
                  {project.category}
                </div>
                <div className="col-span-2 flex justify-end">
                  <div className="h-8 w-8 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-green-500 group-hover:border-green-500 transition-all">
                    <ArrowUpRight size={14} className="text-gray-400 group-hover:text-white" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      
      <footer className="py-20 text-center">
        <p className="text-[10px] font-mono text-gray-300 uppercase tracking-[0.2em] select-none">
          © 2026 {PORTFOLIO.name}
        </p>
      </footer>
    </motion.main>
  );
}