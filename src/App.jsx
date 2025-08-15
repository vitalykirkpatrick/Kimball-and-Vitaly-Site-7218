import React, { useState, lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopOnMount from './components/ScrollToTopOnMount';
import './App.css';

// Lazy load page components
const Home = lazy(() => import('./pages/Home'));
const Story = lazy(() => import('./pages/Story'));
const Messages = lazy(() => import('./pages/Messages'));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[70vh]">
    <div className="w-16 h-16 border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin"></div>
  </div>
);

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
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home openGalleryLightbox={openGalleryLightbox} />} />
            <Route path="/story" element={<Story />} />
            <Route path="/messages" element={<Messages />} />
          </Routes>
        </Suspense>
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;