import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO } from './data'; //

export default function ProjectsPage() {
  return (
    <motion.main className="min-h-screen bg-white">
      <nav className="p-8 md:px-24 border-b border-gray-100 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-green-600 transition-colors">
          <ArrowLeft size={16} /> HOME
        </Link>
        <span className="text-[10px] font-mono text-gray-300 uppercase tracking-widest">
           Project Index / {PORTFOLIO.projects.length} Total
        </span>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-20"> {/* Standardized py-20 */}
        <header className="mb-20"> {/* Standardized mb-20 */}
          <div className="flex items-center gap-3 mb-10"> {/* Standardized mb-10 */}
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
                {/* Year */}
                <div className="col-span-1 text-xs font-mono text-gray-300 mb-2 md:mb-0">
                  {project.year || "2026"}
                </div>

                {/* Title */}
                <div className="col-span-5">
                  <h3 className="text-xl font-bold text-black group-hover:text-green-700 transition-colors">
                    {project.title}
                  </h3>
                </div>

                {/* Category */}
                <div className="col-span-4 text-sm text-gray-500 font-medium">
                  {project.category}
                </div>

                {/* Action Icon */}
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
      
      {/* Simple Footer */}
      <footer className="py-20 text-center">
        <p className="text-[10px] font-mono text-gray-300 uppercase tracking-[0.2em] select-none">
          © 2026 {PORTFOLIO.name}
        </p>
      </footer>
    </motion.main>
  );
}