// src/ProjectDetail.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { PORTFOLIO } from './data';

export default function ProjectDetail() {
  const { slug } = useParams();
  
  // Find project by slug
  const project = PORTFOLIO.projects.find(p => p.slug === slug);

  if (!project) {
    return <div className="p-20 text-center font-mono">Project not found.</div>;
  }

  return (
    <motion.main 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-white"
    >
      {/* Back Nav */}
      <nav className="p-8 md:px-24 border-b border-gray-100 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-green-600 transition-colors">
          <ArrowLeft size={16} /> BACK TO INDEX
        </Link>
        <span className="text-[10px] font-mono text-gray-300 uppercase tracking-widest">Project / {project.year || '2026'}</span>
      </nav>

      <div className="max-w-5xl mx-auto px-8 py-16 md:py-24">
        <header className="mb-12">
          <p className="text-green-600 font-mono text-xs uppercase tracking-[0.3em] mb-4">{project.category}</p>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8">{project.title}</h1>
          <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">{project.shortDescription}</p>
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
    </motion.main>
  );
}