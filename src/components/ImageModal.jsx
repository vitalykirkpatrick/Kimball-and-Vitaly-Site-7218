import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiX } = FiIcons;

const ImageModal = ({ image, onClose }) => {
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative max-w-4xl max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={getProcessedImageSrc(image.src)}
          alt={image.title || "Image"}
          className="max-w-full max-h-[80vh] object-contain rounded-lg"
        />
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