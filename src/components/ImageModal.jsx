import React from 'react';
import {motion} from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import {processImageUrl} from '../utils/imageHelper';
import * as FiIcons from 'react-icons/fi';

const {FiX, FiExternalLink} = FiIcons;

const ImageModal = ({image, onClose}) => {
  // Process image source if it's a Google Drive link
  const getProcessedImageSrc = (src) => {
    return processImageUrl(src);
  };

  // Determine if this is a Google Drive link
  const isGoogleDriveLink = typeof image?.src === 'string' && image.src.includes('drive.google.com');
  
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{scale: 0.8, opacity: 0}}
        animate={{scale: 1, opacity: 1}}
        exit={{scale: 0.8, opacity: 0}}
        className="relative max-w-4xl max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={getProcessedImageSrc(image.src)} 
          alt={image.title || "Image"} 
          className="max-w-full max-h-[80vh] object-contain rounded-lg"
          onError={(e) => {
            e.target.src = "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753646796996-Wedding%20rings%20%281%29.png";
            e.target.onerror = null;
          }}
        />
        
        {/* Special handling for Google Drive links */}
        {isGoogleDriveLink && (
          <div className="absolute top-4 left-4 z-20">
            <a 
              href={image.src} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/80 text-indigo-600 px-3 py-1 rounded-full flex items-center space-x-1 hover:bg-white transition-colors text-sm"
              onClick={e => e.stopPropagation()}
            >
              <SafeIcon icon={FiExternalLink} className="w-4 h-4" />
              <span>Open in Drive</span>
            </a>
          </div>
        )}

        {(image.title || image.description) && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
            {image.title && <h3 className="text-white text-xl font-semibold mb-2">{image.title}</h3>}
            {image.description && <p className="text-stone-200">{image.description}</p>}
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        >
          <SafeIcon icon={FiX} className="w-6 h-6" />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ImageModal;