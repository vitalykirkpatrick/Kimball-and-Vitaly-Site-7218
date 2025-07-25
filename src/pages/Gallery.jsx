import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../components/Navigation';
import CountdownTimer from '../components/CountdownTimer';
import SafeIcon from '../common/SafeIcon';
import Footer from '../components/Footer';
import AnniversarySignup from '../components/AnniversarySignup';
import ImageModal from '../components/ImageModal';
import * as FiIcons from 'react-icons/fi';

const { FiX, FiChevronLeft, FiChevronRight, FiHeart, FiHome, FiCalendar, FiMapPin, FiUsers, FiArrowRight } = FiIcons;

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSignup, setShowSignup] = useState(false);

  const heartColors = [
    'text-red-500',
    'text-orange-500',
    'text-yellow-500',
    'text-green-500',
    'text-blue-500',
    'text-indigo-500',
    'text-violet-500'
  ];

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

  const photos = [
    {
      id: 1,
      src: getProcessedImageSrc("https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753370695404-Kimball%20and%20Vitaly%20Engagement%202008_09.jpg"),
      title: "Our Engagement",
      description: "2008 - Engagement photos in preparation for our San Diego ceremony. The excitement and nervousness shows on our faces!",
      year: "2008"
    },
    {
      id: 2,
      src: getProcessedImageSrc("https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753370717696-Kimball%20and%20Vitaly%20Engagement%202008_28.jpg"),
      title: "Forever Together",
      description: "2008 - Another shot from our engagement photoshoot. We were still learning how to pose naturally for photos.",
      year: "2008"
    },
    {
      id: 3,
      src: getProcessedImageSrc("https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753370726823-Kimball%20and%20Vitaly%20Engagement%202008_34.jpg"),
      title: "Just Us Two",
      description: "2008 - A quiet moment during our engagement photoshoot. Little did we know what adventures lay ahead.",
      year: "2008"
    },
    {
      id: 4,
      src: getProcessedImageSrc("https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753370742843-Kimball%20and%20Vitaly%20Engagement%202008_36.jpg"),
      title: "Making Memories",
      description: "2008 - One of our favorite shots from the engagement session, capturing our connection.",
      year: "2008"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "First Townhome",
      description: "Our first property at 1174 W 230 S in Orem. Proof that immigrants can achieve the American Dream (one mortgage payment at a time).",
      year: "2008"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Salt Lake City Move",
      description: "Our move to Salt Lake City opened a new chapter. Bigger city, bigger dreams, same terrible jokes.",
      year: "2016"
    },
    {
      id: 7,
      src: getProcessedImageSrc("https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753369491076-blob"),
      title: "Anniversary Celebration",
      description: "Celebrating another year together - each one more precious than the last.",
      year: "2022"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "18th Wedding Anniversary",
      description: "Celebrating 18 years of marriage and resilience. Still going strong (and still arguing about dishwasher loading techniques).",
      year: "2026"
    }
  ];

  const openImage = (photo, index) => {
    setSelectedImage(photo);
    setCurrentIndex(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % photos.length;
    setSelectedImage(photos[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const prevImage = () => {
    const prevIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
    setSelectedImage(photos[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 relative overflow-hidden">
      <Navigation />

      {/* Decorative Elements */}
      {heartColors.map((color, index) => (
        <motion.div
          key={`heart-${index}`}
          className={`absolute ${index % 2 === 0 ? 'top-1/4' : 'bottom-1/4'} ${
            index < 3 ? 'left-1/' + (index + 2) : 'right-1/' + (7 - index)
          } w-16 h-16 ${color} opacity-20`}
          animate={{
            rotate: [0, 10, 0, -10, 0],
            y: [0, -10, 0, 10, 0]
          }}
          transition={{ repeat: Infinity, duration: 15 + index * 2 }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
          </svg>
        </motion.div>
      ))}

      {/* Additional decorative elements */}
      <motion.div
        className="absolute top-1/3 left-20 w-24 h-24 opacity-20"
        animate={{ rotate: 360, scale: [1, 1.1, 1, 0.9, 1] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        <div className="text-4xl">🌸</div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-20 w-20 h-20 opacity-20"
        animate={{ rotate: -360, scale: [1, 1.1, 1, 0.9, 1] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      >
        <div className="text-4xl">🌺</div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-20 w-16 h-24 opacity-20"
        animate={{
          y: [0, -15, 0, -5, 0],
          rotate: [0, 5, 0, -5, 0]
        }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
      >
        <div className="w-full h-full">
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <defs>
              <linearGradient id="rainbow-balloon-gallery" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF0018" />
                <stop offset="16%" stopColor="#FFA52C" />
                <stop offset="32%" stopColor="#FFFF41" />
                <stop offset="48%" stopColor="#008018" />
                <stop offset="66%" stopColor="#0000F9" />
                <stop offset="83%" stopColor="#86007D" />
                <stop offset="100%" stopColor="#FF0018" />
              </linearGradient>
            </defs>
            <path d="M12,2C8.13,2 5,5.13 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9C19,5.13 15.87,2 12,2Z" fill="url(#rainbow-balloon-gallery)" />
          </svg>
        </div>
      </motion.div>

      <div className="pt-28 pb-16">
        {/* Profile Image */}
        <div className="flex justify-center mb-12">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg flex items-center justify-center">
            <img
              src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753369491076-blob"
              alt="Kimball & Vitaly"
              className="w-full h-full object-cover"
              style={{
                maskImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"50\" cy=\"50\" r=\"50\" /></svg>')",
                WebkitMaskImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"50\" cy=\"50\" r=\"50\" /></svg>')"
              }}
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8 mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-serif text-stone-800">
              Our <span className="text-indigo-600 italic">Journey</span>
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              Photos, letters, and kitchen-table memories from twenty years of love, resilience, and finding home in each other. (Plus a few embarrassing moments we're brave enough to share.)
            </p>
          </motion.div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => openImage(photo, index)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 border-2 border-indigo-100">
                  <div className="aspect-w-4 aspect-h-3 relative">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-64 object-contain md:object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="font-semibold text-lg">{photo.title}</h3>
                      <p className="text-sm text-stone-200">{photo.year}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-stone-800 text-lg">{photo.title}</h3>
                      <span className="text-sm text-indigo-500 border border-indigo-300 px-2 py-1 rounded-full">
                        {photo.year}
                      </span>
                    </div>
                    <p className="text-stone-600 text-sm leading-relaxed">{photo.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Anniversary Countdown */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <CountdownTimer
              targetDate="August 15, 2026"
              title="Celebrating Our 18th Wedding Anniversary"
              showCta={true}
            />
          </motion.section>

          {/* Memory Cards */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-center text-stone-800 mb-12">
              Kitchen-Table <span className="text-indigo-600 italic">Memories</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-indigo-100">
                <SafeIcon icon={FiHeart} className="w-8 h-8 text-red-500 mb-4" />
                <h3 className="text-xl font-semibold text-stone-800 mb-4">The Recipe Book</h3>
                <p className="text-stone-700 leading-relaxed">
                  <em>"Our old recipe book, pages stained with years of experiments. Half the notes are in Ukrainian, half in English, all written with love. The borscht recipe on page three has been modified so many times it's barely recognizable from the original—just like us. (And yes, we still argue about the proper amount of dill.)"</em>
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-indigo-100">
                <SafeIcon icon={FiCalendar} className="w-8 h-8 text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold text-stone-800 mb-4">The Wedding Photo</h3>
                <p className="text-stone-700 leading-relaxed">
                  <em>"Still tacked to the fridge after all these years, slightly faded but never forgotten. Two young faces full of hope, not knowing the journey ahead but ready for anything as long as we were together. (We look so young! When did we get so old?)"</em>
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-indigo-100">
                <SafeIcon icon={FiHome} className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold text-stone-800 mb-4">The First Townhome</h3>
                <p className="text-stone-700 leading-relaxed">
                  <em>"Our first townhome at 1174 W 230 S in Orem wasn't just a property—it was a declaration of permanence. As an immigrant on an H-1B visa, owning a piece of America felt like an impossible dream. But together, we made it happen. (And learned that homeownership means fixing things constantly.)"</em>
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-indigo-100">
                <SafeIcon icon={FiMapPin} className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-stone-800 mb-4">The Late-Night Conversations</h3>
                <p className="text-stone-700 leading-relaxed">
                  <em>"In bed before I fall asleep, while Kimball cuddles me like a baby, we've shared our deepest stories, made life decisions, and dreamed about our future together. It's where we've solved the world's problems and our own, one whispered conversation at a time."</em>
                </p>
              </div>
            </div>
            <div className="text-center mt-12">
              <button
                onClick={() => setShowSignup(true)}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-full hover:opacity-90 transition-colors"
              >
                <SafeIcon icon={FiUsers} className="w-5 h-5" />
                <span className="font-medium">Join Our Celebration</span>
                <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
              </button>
            </div>
          </motion.section>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeImage}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-white text-xl font-semibold mb-2">{selectedImage.title}</h3>
                <p className="text-stone-200">{selectedImage.description}</p>
                <span className="inline-block mt-2 text-sm text-stone-300 bg-white/20 px-2 py-1 rounded-full">
                  {selectedImage.year}
                </span>
              </div>

              {/* Navigation */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
              >
                <SafeIcon icon={FiChevronLeft} className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
              >
                <SafeIcon icon={FiChevronRight} className="w-6 h-6" />
              </button>

              {/* Close Button */}
              <button
                onClick={closeImage}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
              >
                <SafeIcon icon={FiX} className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />

      {/* Anniversary Signup Modal */}
      {showSignup && (
        <AnniversarySignup onClose={() => setShowSignup(false)} />
      )}
    </div>
  );
};

export default Gallery;