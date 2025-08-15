import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Story from './pages/Story';
import Messages from './pages/Messages';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopOnMount from './components/ScrollToTopOnMount';
import './App.css';

function App() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const openGalleryLightbox = () => {
    // This function is no longer used but kept for compatibility
    window.open("https://gallery.kimballandvitaly.com/", "_blank");
  };

  const closeGalleryLightbox = () => {
    setIsGalleryOpen(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
        <ScrollToTopOnMount />
        <Navigation openGalleryLightbox={openGalleryLightbox} />
        <Routes>
          <Route path="/" element={<Home openGalleryLightbox={openGalleryLightbox} />} />
          <Route path="/story" element={<Story />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;