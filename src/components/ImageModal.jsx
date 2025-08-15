import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiX, FiChevronLeft, FiChevronRight, FiCalendar } = FiIcons;

const ImageModal = ({ image, onClose, onNext, onPrevious, hasNavigation = false }) => {
  // Process image source if it's an object with webp/jpeg URLs or a string
  const renderOptimizedImage = (imageSrc) => {
    // If image source is an object with webp/jpeg properties
    if (imageSrc && typeof imageSrc === 'object' && (imageSrc.webp || imageSrc.jpeg)) {
      return (
        <picture>
          {imageSrc.webp && <source srcSet={imageSrc.webp} type="image/webp" />}
          {imageSrc.jpeg && <source srcSet={imageSrc.jpeg} type="image/jpeg" />}
          <img 
            src={imageSrc.jpeg || imageSrc.original || ''} 
            alt={image.title || "Image"}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />
        </picture>
      );
    }

    // For Google Photos links
    if (typeof imageSrc === 'string' && imageSrc.includes('photos.app.goo.gl')) {
      // Return a placeholder image until user provides direct URLs
      return (
        <img 
          src="https://cdn.kimballandvitaly.com/placeholder-image.jpeg" 
          alt={image.title || "Image"}
          className="max-w-full max-h-[80vh] object-contain rounded-lg"
        />
      );
    } 
    // For Google Drive links
    else if (typeof imageSrc === 'string' && imageSrc.includes('drive.google.com/file')) {
      // Extract file ID
      const fileIdMatch = imageSrc.match(/\/d\/([^/]+)/);
      if (fileIdMatch && fileIdMatch[1]) {
        const fileId = fileIdMatch[1];
        return (
          <img 
            src={`https://drive.google.com/uc?export=view&id=${fileId}`} 
            alt={image.title || "Image"}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />
        );
      } 
      return (
        <img 
          src="https://cdn.kimballandvitaly.com/placeholder-image.jpeg" 
          alt={image.title || "Image"}
          className="max-w-full max-h-[80vh] object-contain rounded-lg"
        />
      );
    }
    
    // Handle CDN URL conversion for string URLs
    if (typeof imageSrc === 'string') {
      // Replace the base URL
      let newUrl = imageSrc.replace('https://vitalybook.s3.us-west-1.amazonaws.com/', 'https://cdn.kimballandvitaly.com/');
      
      // Replace the folder path for slideshow images
      if (newUrl.includes('Our+Story+Page+Slideshow/')) {
        newUrl = newUrl.replace('Our+Story+Page+Slideshow/', 'Slideshow-Converted-Images/');
        
        // Replace the extension (remove .JPG, .jpg, etc.)
        const baseUrl = newUrl.replace(/\.(jpg|jpeg|JPG|JPEG|png|PNG)$/, '');
        
        return (
          <picture>
            <source srcSet={`${baseUrl}.webp`} type="image/webp" />
            <source srcSet={`${baseUrl}.jpeg`} type="image/jpeg" />
            <img 
              src={`${baseUrl}.jpeg`} 
              alt={image.title || "Image"}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
              onError={(e) => {
                // If optimized image fails, fall back to original
                e.target.onerror = null;
                e.target.src = imageSrc;
              }}
            />
          </picture>
        );
      }
      
      // Update wedding ring images
      if (newUrl.includes('Wedding%20rings%20%281%29.png')) {
        return (
          <picture>
            <source srcSet="https://cdn.kimballandvitaly.com/Kimball+and+Vitaly+Website+Content/Wedding-Rings.webp" type="image/webp" />
            <source srcSet="https://cdn.kimballandvitaly.com/Kimball+and+Vitaly+Website+Content/Wedding-Rings.jpeg" type="image/jpeg" />
            <img 
              src="https://cdn.kimballandvitaly.com/Kimball+and+Vitaly+Website+Content/Wedding-Rings.jpeg" 
              alt={image.title || "Wedding Rings"}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
          </picture>
        );
      }
      
      // For other website content
      if (newUrl.includes('Kimball+and+Vitaly+Website+Content/')) {
        // Try to convert to optimized version while keeping the same path
        const baseUrl = newUrl.replace(/\.(jpg|jpeg|JPG|JPEG|png|PNG)$/, '');
        
        return (
          <picture>
            <source srcSet={`${baseUrl}.webp`} type="image/webp" />
            <source srcSet={`${baseUrl}.jpeg`} type="image/jpeg" />
            <img 
              src={`${baseUrl}.jpeg`} 
              alt={image.title || "Image"}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
              onError={(e) => {
                // If optimized image fails, fall back to original
                e.target.onerror = null;
                e.target.src = imageSrc;
              }}
            />
          </picture>
        );
      }
      
      // For all other images, use as-is
      return (
        <img 
          src={newUrl} 
          alt={image.title || "Image"}
          className="max-w-full max-h-[80vh] object-contain rounded-lg"
          onError={(e) => {
            // If CDN URL fails, fall back to original
            e.target.onerror = null;
            e.target.src = imageSrc;
          }}
        />
      );
    }

    // Fallback for any other case
    return (
      <img 
        src="https://cdn.kimballandvitaly.com/placeholder-image.jpeg" 
        alt={image.title || "Image"}
        className="max-w-full max-h-[80vh] object-contain rounded-lg"
      />
    );
  };

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
            {renderOptimizedImage(image.src)}
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
                onClick={(e) => { e.stopPropagation(); onPrevious(); }} 
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
                aria-label="Previous image"
              >
                <SafeIcon icon={FiChevronLeft} className="w-6 h-6" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onNext(); }} 
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