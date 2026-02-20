// src/ProjectDetail.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react'; // Added ArrowRight
import { PORTFOLIO } from './data';

export default function ProjectDetail() {
  const { slug } = useParams();
  
  // 1. Find current project and its index
  const currentIndex = PORTFOLIO.projects.findIndex(p => p.slug === slug);
  const project = PORTFOLIO.projects[currentIndex];

  if (!project) {
    return <div className="p-20 text-center font-mono">Project not found.</div>;
  }

  // 2. Calculate Previous and Next projects (with wrap-around loop)
  const prevProject = PORTFOLIO.projects[(currentIndex - 1 + PORTFOLIO.projects.length) % PORTFOLIO.projects.length];
  const nextProject = PORTFOLIO.projects[(currentIndex + 1) % PORTFOLIO.projects.length];

  return (
    <motion.main 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-white"
    >
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
            to="/projects" 
            className="flex items-center gap-2 text-[10px] font-mono text-gray-400 hover:text-green-600 transition-colors py-1 pr-2"
          >
            <ArrowLeft size={14} /> All Projects
          </Link>
        </div>
        
      </div>

      {/* --- STATIC NAV --- */}
      <nav className="p-8 md:px-24 flex justify-between items-center bg-white relative">
        
        {/* --- ADJUSTED LINE: Changed to w-48 to match Projects page --- */}
        <div className="absolute bottom-0 right-1 w-[192px] md:w-[1360px] h-[1px] bg-gray-100"></div>

        <div className="invisible flex items-center gap-2 text-sm font-mono text-gray-400">
          <ArrowLeft size={16} /> ALL PROJECTS
        </div>
        
        <span className="text-[10px] font-mono text-gray-300 uppercase tracking-widest">
           Project / {project.year || '2026'}
        </span>
      </nav>

      {/* --- CONTENT HEADER (MATCHED STYLE) --- */}
      <div className="max-w-6xl mx-auto px-8 py-16 md:py-24">
        <header className="mb-20">
          <p className="text-green-600 font-mono text-xs uppercase tracking-[0.3em] mb-4">
            {project.category}
          </p>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8">
            {project.title}
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
            {project.shortDescription}
          </p>
        </header>

        {/* Big Hero Image */}
        <div className="rounded-3xl overflow-hidden shadow-2xl mb-16 bg-gray-50">
          <img src={project.image} alt={project.title} className="w-full h-auto" />
        </div>

        {/* Project Details Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 prose prose-lg">
            <h2 className="text-2xl font-bold mb-6">Overview</h2>
            <p className="text-gray-600 whitespace-pre-line leading-relaxed">
              {project.details}
            </p>
          </div>
          
          {/* Sidebar / Meta info */}
          <aside className="border-t border-gray-100 pt-8 lg:border-t-0 lg:pt-0">
             <div className="space-y-8">
                <div>
                  <h4 className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-2">Tools Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {PORTFOLIO.skills.slice(0, 4).map(skill => (
                      <span key={skill} className="px-3 py-1 bg-gray-50 rounded-full text-xs text-gray-600 border border-gray-100">{skill}</span>
                    ))}
                  </div>
                </div>
             </div>
          </aside>
        </div>
      </div>

      {/* --- PREV / NEXT PROJECT NAVIGATION --- */}
      <div className="border-t border-gray-100 mt-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          
          {/* Previous Project Block */}
          <Link 
            to={`/projects/${prevProject.slug}`} 
            className="group p-8 md:p-16 flex flex-col items-start hover:bg-gray-50/50 transition-colors"
          >
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
              Previous Project
            </span>
            <span className="text-2xl md:text-4xl font-bold tracking-tighter text-black group-hover:text-green-600 transition-colors">
              {prevProject.title}
            </span>
          </Link>

          {/* Next Project Block */}
          <Link 
            to={`/projects/${nextProject.slug}`} 
            className="group p-8 md:p-16 flex flex-col items-start md:items-end md:text-right hover:bg-gray-50/50 transition-colors"
          >
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              Next Project
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /> 
            </span>
            <span className="text-2xl md:text-4xl font-bold tracking-tighter text-black group-hover:text-green-600 transition-colors">
              {nextProject.title}
            </span>
          </Link>

        </div>
      </div>

      {/* Simple Footer */}
      <footer className="py-20 text-center border-t border-gray-50 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gray-100"></div>
        <p className="text-[10px] font-mono text-gray-300 uppercase tracking-[0.2em] select-none mt-10">
          © 2026 {PORTFOLIO.name}
        </p>
      </footer>
    </motion.main>
  );
}