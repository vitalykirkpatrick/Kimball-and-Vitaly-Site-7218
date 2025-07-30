import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../components/Navigation';
import CountdownTimer from '../components/CountdownTimer';
import SafeIcon from '../common/SafeIcon';
import Footer from '../components/Footer';
import AnniversarySignup from '../components/AnniversarySignup';
import ImageModal from '../components/ImageModal';
import { processImageUrl } from '../utils/imageHelper';
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

  // Updated photos array with Google Drive links where provided
  const photos = [
    {
      id: 1,
      src: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753370695404-Kimball%20and%20Vitaly%20Engagement%202008_09.jpg",
      title: "Our Engagement",
      description: "2008 - Engagement photos in preparation for our San Diego ceremony. The excitement and nervousness shows on our faces!",
      year: "2008"
    },
    {
      id: 2,
      src: "https://drive.google.com/file/d/1Nyx2MudXkK2cfmmJ5HK8ieptf9HgM6Bv/view?usp=sharing",
      title: "Moving In Together",
      description: "2006 - I moved into the basement room at 746 E 30 N in Orem while Kimball was away in Colorado for the summer.",
      year: "2006"
    },
    {
      id: 3,
      src: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753370726823-Kimball%20and%20Vitaly%20Engagement%202008_34.jpg",
      title: "Just Us Two",
      description: "2008 - A quiet moment during our engagement photoshoot. Little did we know what adventures lay ahead.",
      year: "2008"
    },
    {
      id: 4,
      src: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753370742843-Kimball%20and%20Vitaly%20Engagement%202008_36.jpg",
      title: "Making Memories",
      description: "2008 - One of our favorite shots from the engagement session, capturing our connection.",
      year: "2008"
    },
    {
      id: 5,
      src: "https://drive.google.com/file/d/1XoKruN86Eih-NwFDS4G7XGz-Eeu2VwfL/view?usp=sharing",
      title: "First Townhome",
      description: "2007 - Our first property at 1174 W 230 S in Orem. Proof that immigrants can achieve the American Dream (one mortgage payment at a time).",
      year: "2007"
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
      src: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753385005494-Wedding.JPG",
      title: "Anniversary Celebration",
      description: "Celebrating another year together - each one more precious than the last.",
      year: "2022"
    },
    {
      id: 8,
      src: "https://drive.google.com/file/d/1PAHeDTKaMls3zvaDeUHM0BGW9_JUDtOR/view?usp=sharing",
      title: "MBA Graduation",
      description: "2016 - Completing my MBA at the University of Utah. This achievement represented not just academic growth but the culmination of years adapting to a new culture and language.",
      year: "2016"
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
          className={`absolute ${index % 2 === 0 ? 'top-1/4' : 'bottom-1/4'} ${index < 3 ? 'left-1/' + (index + 2) : 'right-1/' + (7 - index)} w-16 h-16 ${color} opacity-20`}
          animate={{ rotate: [0, 10, 0, -10, 0], y: [0, -10, 0, 10, 0] }}
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

      {/* Rainbow balloons */}
      <motion.div
        className="absolute bottom-1/4 right-20 w-16 h-24 opacity-20"
        animate={{ y: [0, -15, 0, -5, 0], rotate: [0, 5, 0, -5, 0] }}
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8 mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-serif text-stone-800">
              Our <span className="text-indigo-600 italic">Journey</span>
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              Photos, letters, and kitchen-table memories from twenty years of love, resilience, and finding home in each other.
              (Plus a few embarrassing moments we're brave enough to share.)
            </p>
          </motion.div>

          {/* Rings image with decorative lines */}
          <div className="flex items-center justify-center my-8 px-4">
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent max-w-xs"></div>
            <div className="mx-4">
              <div className="w-32 h-32 flex items-center justify-center">
                <img src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753646796996-Wedding%20rings%20%281%29.png" alt="Kimball & Vitaly" className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="flex-grow h-px bg-gradient-to-r from-gray-300 via-gray-300 to-transparent max-w-xs"></div>
          </div>

          {/* Photo Grid - UPDATED for consistent image sizing and Google Drive support */}
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
                  {/* Fixed size image container - UPDATED with Google Drive support */}
                  <div className="relative bg-gray-100 flex items-center justify-center" style={{ height: "256px" }}>
                    <img
                      src={processImageUrl(photo.src)}
                      alt={photo.title}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                      onError={(e) => { 
                        e.target.onerror = null; 
                        e.target.src = "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753646796996-Wedding%20rings%20%281%29.png"; 
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="font-semibold text-lg">{photo.title}</h3>
                      <p className="text-sm text-stone-200">{photo.year}</p>
                    </div>
                  </div>

                  {/* Text content - UPDATED for consistent sizing */}
                  <div className="p-4" style={{ minHeight: "120px" }}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-stone-800 text-lg truncate">{photo.title}</h3>
                      <span className="text-sm text-indigo-500 border border-indigo-300 px-2 py-1 rounded-full flex-shrink-0">
                        {photo.year}
                      </span>
                    </div>
                    <p className="text-stone-600 text-sm leading-relaxed line-clamp-3">{photo.description}</p>
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
            <CountdownTimer targetDate="August 15, 2026" title="Celebrating Our 18th Wedding Anniversary" showCta={true} />
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

      {/* Image Modal with updated handling for Google Drive links */}
      <AnimatePresence>
        {selectedImage && (
          <ImageModal image={selectedImage} onClose={closeImage} />
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