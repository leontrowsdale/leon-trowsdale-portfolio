// src/ProjectPage.jsx
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PORTFOLIO } from './data';

const ProjectPage = () => {
  const { slug } = useParams();
  
  // Find the specific project based on the URL slug
  const project = PORTFOLIO.projects.find(p => p.slug === slug);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) return <div className="p-20 text-center text-2xl">Project not found</div>;

  return (
    <div className="min-h-screen bg-white text-black selection:bg-green-100 selection:text-green-900 pb-32">
      
      {/* Back Button */}
      <nav className="fixed top-0 left-0 p-8 z-50">
        <Link 
          to="/" 
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 backdrop-blur-md border border-gray-200 hover:border-green-500 hover:text-green-700 hover:shadow-[0_0_20px_rgba(74,222,128,0.3)] transition-all text-sm font-medium"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </nav>

      {/* Hero Image */}
      <div className="w-full h-[60vh] md:h-[70vh] relative bg-gray-50">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
        {/* Subtle gradient so the image fades smoothly into the white content below */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 -mt-20 relative z-10">
        <span className="text-green-800 text-xs font-bold tracking-widest uppercase bg-green-50 border border-green-100 px-3 py-1 rounded-full shadow-sm mb-6 inline-block">
          {project.category}
        </span>
        
        <h1 className="text-5xl md:text-7xl font-display font-medium mb-12">
          {project.title}
        </h1>

        <div className="prose prose-lg text-gray-600 leading-relaxed whitespace-pre-wrap">
          {project.details}
        </div>
      </div>

    </div>
  );
};

export default ProjectPage;