import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiX, FiChevronLeft, FiChevronRight, FiHeart, FiRefreshCw, FiExternalLink } = FiIcons;

const GalleryLightbox = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [iframeKey, setIframeKey] = useState(Date.now());
  
  const galleryUrl = "https://gallery.kimballandvitaly.com/";
  
  const heartColors = [
    'text-red-500',
    'text-orange-500',
    'text-yellow-500',
    'text-green-500',
    'text-blue-500',
    'text-indigo-500',
    'text-violet-500'
  ];

  const handleIframeLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleIframeError = () => {
    setLoading(false);
    setError(true);
  };

  const retryLoading = () => {
    setLoading(true);
    setError(false);
    setIframeKey(Date.now()); // Force iframe refresh with new key
  };

  // Set a timeout for loading
  useEffect(() => {
    if (isOpen && loading) {
      const timeoutId = setTimeout(() => {
        if (loading) {
          setError(true);
          setLoading(false);
        }
      }, 10000); // 10 seconds timeout
      
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, loading]);

  // Lock body scroll when gallery is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 z-50 overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[60] bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
          aria-label="Close gallery"
        >
          <SafeIcon icon={FiX} className="w-6 h-6" />
        </button>

        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 z-[55]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mb-4"></div>
              <p className="text-white text-xl font-medium">Loading our gallery...</p>
            </div>
          </div>
        )}
        
        {/* Error message */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90 z-[55]">
            <div className="text-center max-w-md mx-auto p-6 bg-white rounded-xl">
              <SafeIcon icon={FiHeart} className="w-16 h-16 text-amber-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Having trouble loading our gallery</h3>
              <p className="text-gray-600 mb-8">
                We're having a bit of trouble loading our gallery. This could be due to connection issues or browser security settings.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={retryLoading}
                  className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-lg"
                >
                  <SafeIcon icon={FiRefreshCw} className="w-5 h-5 mr-2" />
                  Try Again
                </button>
                <a
                  href={galleryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 text-lg"
                >
                  <SafeIcon icon={FiExternalLink} className="w-5 h-5 mr-2" />
                  Open Gallery in New Tab
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="w-full h-full">
          <iframe 
            key={iframeKey}
            src={galleryUrl}
            frameBorder="0" 
            title="Kimball and Vitaly Gallery"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            className="w-full h-full"
            style={{ zIndex: 50 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          ></iframe>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GalleryLightbox;