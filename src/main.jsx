// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import ProjectDetail from './ProjectDetail';
import ProjectsPage from './ProjectsPage'; // <--- Import the archive component you will create
import ScrollToTop from './ScrollToTop'; // <-- 1. Import it here
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
	<ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        
        {/* ADD THIS LINE HERE: */}
        <Route path="/projects" element={<ProjectsPage />} /> 
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);