import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiX, FiChevronLeft, FiChevronRight, FiCalendar } = FiIcons;

const ImageModal = ({ image, onClose, onNext, onPrevious, hasNavigation = false }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(null);
  
  // Process image source if it's a Google Photos or Drive link
  const getProcessedImageSrc = (src) => {
    // For Google Photos links
    if (typeof src === 'string' && src.includes('photos.app.goo.gl')) {
      // Return a placeholder image until user provides direct URLs
      return "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753369491076-blob";
    } 
    // For Google Drive links
    else if (typeof src === 'string' && src.includes('drive.google.com/file')) {
      // Extract file ID
      const fileIdMatch = src.match(/\/d\/([^/]+)/);
      if (fileIdMatch && fileIdMatch[1]) {
        const fileId = fileIdMatch[1];
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
      }
      return "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753369491076-blob";
    }
    // Return the original URL for other cases
    return src;
  };

  useEffect(() => {
    if (image && image.src) {
      setIsLoading(true);
      const processed = getProcessedImageSrc(image.src);
      setImageSrc(processed);
    }
  }, [image]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    // Could set a fallback image here
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && hasNavigation && onNext) {
        onNext();
      } else if (e.key === 'ArrowLeft' && hasNavigation && onPrevious) {
        onPrevious();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onNext, onPrevious, hasNavigation]);

  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative w-full max-w-7xl max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-center h-full">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
              </div>
            )}
            <img 
              src={imageSrc} 
              alt={image.title || "Image"} 
              className={`max-w-full max-h-[80vh] object-contain rounded-lg ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </div>

          {/* Info overlay at bottom */}
          {(image.title || image.description || image.date) && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              {image.date && (
                <div className="flex items-center space-x-2 text-white/80 mb-2">
                  <SafeIcon icon={FiCalendar} className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{image.date}</span>
                </div>
              )}
              {image.title && <h3 className="text-white text-xl md:text-2xl font-semibold mb-2">{image.title}</h3>}
              {image.description && <p className="text-stone-200 md:text-lg">{image.description}</p>}
            </div>
          )}

          {/* Navigation arrows */}
          {hasNavigation && (
            <>
              <button 
                onClick={(e) => {e.stopPropagation(); onPrevious();}} 
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
                aria-label="Previous image"
              >
                <SafeIcon icon={FiChevronLeft} className="w-6 h-6" />
              </button>
              <button 
                onClick={(e) => {e.stopPropagation(); onNext();}} 
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
                aria-label="Next image"
              >
                <SafeIcon icon={FiChevronRight} className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Close Button */}
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
            aria-label="Close image"
          >
            <SafeIcon icon={FiX} className="w-6 h-6" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageModal;