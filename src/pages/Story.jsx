import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../components/Navigation';
import CountdownTimer from '../components/CountdownTimer';
import SafeIcon from '../common/SafeIcon';
import Footer from '../components/Footer';
import AnniversarySignup from '../components/AnniversarySignup';
import ImageModal from '../components/ImageModal';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiGlobe, FiHome, FiStar, FiCalendar, FiMapPin, FiX, FiArrowDown, FiUsers, FiArrowRight, FiAward, FiBookOpen, FiRefreshCw, FiExternalLink, FiVolume2 } = FiIcons;

const Story = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showBookModal, setShowBookModal] = useState(false);
  const [bookLoading, setBookLoading] = useState(true);
  const [bookError, setBookError] = useState(false);
  const [bookCoverLoaded, setBookCoverLoaded] = useState(false);
  const [bookCoverError, setBookCoverError] = useState(false);
  const [audioPlayerLoaded, setAudioPlayerLoaded] = useState(false);
  const [audioPlayerKey, setAudioPlayerKey] = useState(Date.now()); // Add a key to force remount
  
  const heartColors = [
    'text-red-500',
    'text-orange-500',
    'text-yellow-500',
    'text-green-500',
    'text-blue-500',
    'text-indigo-500',
    'text-violet-500'
  ];

  const handleImageClick = (image) => {
    setSelectedImage({
      src: image,
      title: "Our Journey",
      description: "A special moment in our journey together"
    });
  };

  // Book iframe handling
  const handleBookIframeLoad = () => {
    setBookLoading(false);
    setBookError(false);
  };

  const handleBookIframeError = () => {
    setBookLoading(false);
    setBookError(true);
  };

  const retryBookLoading = () => {
    setBookLoading(true);
    setBookError(false);
    // Force iframe refresh
    const iframe = document.getElementById('book-iframe-modal');
    if (iframe) {
      const src = iframe.src;
      iframe.src = '';
      setTimeout(() => {
        iframe.src = src;
      }, 100);
    }
    // Reset audio player
    setAudioPlayerKey(Date.now());
    setAudioPlayerLoaded(false);
    initializeAudioPlayer();
  };

  // Book cover image handling
  const handleBookCoverLoad = () => {
    setBookCoverLoaded(true);
    setBookCoverError(false);
  };

  const handleBookCoverError = () => {
    setBookCoverError(true);
    // Try to load from S3 backup URL
    const bookCoverImg = document.getElementById('book-cover-img');
    if (bookCoverImg) {
      bookCoverImg.src = "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753956868394-book-cover-kimball-vitaly.jpg";
    }
  };

  // Open book in modal
  const openBookModal = () => {
    setShowBookModal(true);
    setBookLoading(true);
    setBookError(false);
    // Reset audio player whenever modal opens
    setAudioPlayerKey(Date.now());
    setAudioPlayerLoaded(false);
  };

  // Close book modal
  const closeBookModal = () => {
    setShowBookModal(false);
    // Clean up the audio player when closing modal
    cleanupAudioPlayer();
  };

  // Clean up audio player
  const cleanupAudioPlayer = () => {
    // Remove any existing audio player script
    const existingScript = document.getElementById('audio-player-script');
    if (existingScript) {
      existingScript.remove();
    }
    
    // Reset audio player state
    setAudioPlayerLoaded(false);
  };

  // Initialize audio player when modal opens
  const initializeAudioPlayer = () => {
    if (showBookModal) {
      // Give the DOM time to render before trying to initialize the audio player
      setTimeout(() => {
        // Remove any existing scripts first
        const existingScript = document.getElementById('audio-player-script');
        if (existingScript) {
          existingScript.remove();
        }
        
        // Create new script element
        const script = document.createElement('script');
        script.id = 'audio-player-script';
        script.src = "https://elevenlabs.io/player/audioNativeHelper.js";
        script.type = "text/javascript";
        script.onload = () => {
          setAudioPlayerLoaded(true);
          console.log("Audio player script loaded");
          
          // Explicitly initialize the player
          if (window.AudioNative && typeof window.AudioNative.init === 'function') {
            window.AudioNative.init();
          }
        };
        script.onerror = (error) => {
          console.error("Error loading audio player script:", error);
        };
        
        document.body.appendChild(script);
      }, 500);
    }
  };

  useEffect(() => {
    // Set a timeout to check if loading takes too long
    if (showBookModal) {
      const timeoutId = setTimeout(() => {
        if (bookLoading) {
          setBookError(true);
          setBookLoading(false);
        }
      }, 10000); // 10 seconds timeout

      // Initialize audio player when modal opens
      initializeAudioPlayer();

      return () => clearTimeout(timeoutId);
    }
  }, [bookLoading, showBookModal]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showBookModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [showBookModal]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 relative overflow-hidden">
      <Navigation />
      
      {/* Enhanced Decorative Elements */}
      {heartColors.map((color, index) => (
        <motion.div
          key={`heart-${index}`}
          className={`absolute ${index % 2 === 0 ? 'top-1/4' : 'bottom-1/4'} ${index < 3 ? 'left-1/' + (index + 2) : 'right-1/' + (7 - index)} w-16 h-16 ${color} opacity-20 z-10`}
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
      
      <motion.div 
        className="absolute bottom-1/4 right-20 w-16 h-24 opacity-20"
        animate={{ y: [0, -15, 0, -5, 0], rotate: [0, 5, 0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
      >
        <div className="w-full h-full">
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <defs>
              <linearGradient id="rainbow-balloon-story" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF0018" />
                <stop offset="16%" stopColor="#FFA52C" />
                <stop offset="32%" stopColor="#FFFF41" />
                <stop offset="48%" stopColor="#008018" />
                <stop offset="66%" stopColor="#0000F9" />
                <stop offset="83%" stopColor="#86007D" />
                <stop offset="100%" stopColor="#FF0018" />
              </linearGradient>
            </defs>
            <path d="M12,2C8.13,2 5,5.13 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9C19,5.13 15.87,2 12,2Z" fill="url(#rainbow-balloon-story)" />
          </svg>
        </div>
      </motion.div>

      <div className="pt-28 pb-16 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8 mb-8 relative z-40"
          >
            <h1 className="text-4xl md:text-6xl font-serif text-stone-800">
              Our <span className="text-indigo-600 italic">Story</span>
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              A journey of love that transcended continents, cultures, and countless obstacles to find home in each other. 
              (Plus some really questionable fashion choices from the 2000s.)
            </p>
          </motion.div>

          {/* Rings image with decorative lines */}
          <div className="flex items-center justify-center my-8 px-4">
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent max-w-xs"></div>
            <div className="mx-4">
              <div className="w-32 h-32 flex items-center justify-center">
                <img
                  src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753646796996-Wedding%20rings%20%281%29.png"
                  alt="Kimball & Vitaly"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="flex-grow h-px bg-gradient-to-r from-gray-300 via-gray-300 to-transparent max-w-xs"></div>
          </div>

          {/* Story Content */}
          <div className="space-y-16 relative z-40">
            {/* Opening Scene */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/95 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-lg border-2 border-indigo-100 relative z-40"
            >
              <h2 className="text-2xl md:text-3xl font-serif text-stone-800 mb-6">
                From Different Worlds to One Home
              </h2>
              <div className="space-y-6 text-lg text-stone-700 leading-relaxed">
                <p className="italic">
                  <em>Tonight, as the soft glow from Kimball's reading lamp spills across our Salt Lake City living room, I'm reminded of how far we've come. From orphanage to citizenship, from strangers to soulmates, our journey has been anything but ordinary. As Kimball turns another page of his library book—always in bed by 10pm—I smile at our comfortable rhythms, even as I prepare for another late night at my computer.</em>
                </p>
                <p>
                  It started on May 15, 2006. Not the dramatic, movie-script kind of love story, but something quieter, more persistent. A Ukrainian orphan immigrant and returned missionary meeting a BYU student Japanese linguist and returned missionary, connecting online and then going together to our first movie night—"She's the Man" at a $1 theater in Provo, and then to Family Home Evening with Affirmation, finding unexpected connection.
                </p>
                <p>
                  <strong>Love, for us, was not an easy answer.</strong> It meant translating pain into poetry—sometimes in broken English, always from the heart. It meant building a family in the spaces where we were told none could exist.
                </p>
              </div>
            </motion.section>

            {/* Our Book Section - IMPROVED IMPLEMENTATION WITH FULL-SCREEN LIGHTBOX */}
            <section className="space-y-8 relative bg-gradient-to-br from-indigo-50/90 to-purple-50/90 backdrop-blur-sm p-8 rounded-2xl z-40">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-serif text-center text-stone-800"
              >
                Our Book
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative max-w-6xl mx-auto"
              >
                {/* Book Cover Image (Clickable) - FIXED WITH MULTIPLE FALLBACKS */}
                <div 
                  className="bg-white p-4 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  onClick={openBookModal}
                >
                  <div className="relative overflow-hidden rounded-xl">
                    {/* Loading indicator for book cover */}
                    {!bookCoverLoaded && !bookCoverError && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
                      </div>
                    )}
                    
                    {/* The book cover image with multiple fallbacks */}
                    <img 
                      id="book-cover-img"
                      src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753956868394-book-cover-kimball-vitaly.jpg" 
                      alt="The Misadventures of Vitaly and Kimball - Book Cover" 
                      className="w-full object-cover"
                      style={{ 
                        maxHeight: "500px", 
                        objectPosition: "center top",
                        display: bookCoverError ? "none" : "block"
                      }}
                      onLoad={handleBookCoverLoad}
                      onError={handleBookCoverError}
                    />
                    
                    {/* Fallback if image fails to load */}
                    {bookCoverError && (
                      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 py-20">
                        <SafeIcon icon={FiBookOpen} className="w-16 h-16 text-indigo-500 mb-4" />
                        <h3 className="text-2xl font-medium text-indigo-800 mb-2">The Misadventures of Vitaly and Kimball</h3>
                        <p className="text-indigo-600">Two Boys, One Big Closet (and a Whole Lot of Pizza)</p>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-end p-6">
                      <SafeIcon icon={FiBookOpen} className="w-12 h-12 text-white mb-3" />
                      <p className="text-white text-lg font-medium">Click to Open Our Storybook</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-lg text-stone-700">
                    "The Misadventures of Vitaly & Kimball" is a fun, illustrated storybook capturing our journey together - 
                    from first meeting to building a life together, complete with all the quirks, challenges, and joys along the way.
                  </p>
                  
                  <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <button 
                      onClick={openBookModal}
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-6 py-3 rounded-full hover:opacity-90 transition-colors shadow-lg"
                    >
                      <SafeIcon icon={FiBookOpen} className="w-5 h-5" />
                      <span className="font-medium">Read Our Storybook</span>
                    </button>
                    
                    <button 
                      onClick={openBookModal}
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full hover:opacity-90 transition-colors shadow-lg"
                    >
                      <SafeIcon icon={FiVolume2} className="w-5 h-5" />
                      <span className="font-medium">Listen to Audio Version</span>
                    </button>
                  </div>
                </div>
              </motion.div>
              
              {/* Arrow pointing to countdown */}
              <div className="flex justify-center mt-8">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <SafeIcon icon={FiArrowDown} className="w-10 h-10 text-indigo-500" />
                </motion.div>
              </div>
            </section>

            {/* Anniversary Countdown */}
            <section className="py-12 bg-white/95 backdrop-blur-sm rounded-2xl shadow-md relative z-40">
              <CountdownTimer
                targetDate="August 15, 2026"
                title="Celebrating Our 18th Wedding Anniversary"
                showCta={true}
              />
            </section>

            {/* Closing Reflection */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/95 backdrop-blur-sm p-8 md:p-12 rounded-2xl text-center border-2 border-indigo-500 relative z-40"
            >
              <SafeIcon icon={FiHeart} className="w-16 h-16 text-indigo-500 mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-serif mb-6 text-stone-800">
                To Twenty Years & Beyond
              </h2>
              <p className="text-lg leading-relaxed max-w-3xl mx-auto text-stone-700">
                <em>As we celebrate our journey together, we look back with gratitude for every moment—the joyful celebrations, the quiet evenings, and even the challenges that made us stronger. Our story continues to unfold, written day by day in the language of love that transcends borders, barriers, and time itself.</em>
              </p>
              <div className="mt-8">
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
      </div>

      <Footer />

      {/* Anniversary Signup Modal */}
      {showSignup && (
        <AnniversarySignup onClose={() => setShowSignup(false)} />
      )}

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}

      {/* Book Modal - IMPROVED FULL SCREEN IMPLEMENTATION WITH AUDIO PLAYER */}
      <AnimatePresence>
        {showBookModal && (
          <div className="fixed inset-0 bg-black z-50 overflow-hidden">
            {/* Close button - positioned absolutely for better visibility */}
            <button 
              onClick={closeBookModal}
              className="absolute top-4 right-4 z-[60] bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
              aria-label="Close book"
            >
              <SafeIcon icon={FiX} className="w-6 h-6" />
            </button>

            {/* Loading overlay */}
            {bookLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 z-[55]">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mb-4"></div>
                  <p className="text-white text-xl font-medium">Loading our storybook...</p>
                </div>
              </div>
            )}
            
            {/* Error message */}
            {bookError && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90 z-[55]">
                <div className="text-center max-w-md mx-auto p-6 bg-white rounded-xl">
                  <SafeIcon icon={FiBookOpen} className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">Having trouble loading our book</h3>
                  <p className="text-gray-600 mb-8">
                    We're having a bit of trouble loading our storybook. This could be due to connection issues or browser security settings.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                      onClick={retryBookLoading}
                      className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-lg"
                    >
                      <SafeIcon icon={FiRefreshCw} className="w-5 h-5 mr-2" />
                      Try Again
                    </button>
                    <a
                      href="https://book.kimballandvitaly.com/vk-misadventures"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 text-lg"
                    >
                      <SafeIcon icon={FiExternalLink} className="w-5 h-5 mr-2" />
                      Open Book in New Tab
                    </a>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex flex-col h-full">
              {/* The book iframe - RESIZED TO ACCOMMODATE AUDIO PLAYER */}
              <div className="flex-grow" style={{ height: "calc(100% - 90px)" }}>
                <iframe 
                  id="book-iframe-modal"
                  src="https://book.kimballandvitaly.com/vk-misadventures"
                  frameBorder="0" 
                  title="The Misadventures of Vitaly and Kimball"
                  onLoad={handleBookIframeLoad}
                  onError={handleBookIframeError}
                  className="w-full h-full"
                  style={{ zIndex: 50 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                ></iframe>
              </div>
              
              {/* Audio Player - ADDED BELOW THE BOOK with key to force remount */}
              <div className="bg-black/90 border-t border-gray-700 z-[60]" style={{ height: "90px" }}>
                <div 
                  key={audioPlayerKey}
                  id="elevenlabs-audionative-widget" 
                  data-height="90" 
                  data-width="100%" 
                  data-frameborder="no" 
                  data-scrolling="no" 
                  data-publicuserid="63d9bf0e513981988600d7ed35c2494fde5f239a520b229fbd16d4378cf0ff6d" 
                  data-playerurl="https://elevenlabs.io/player/index.html" 
                  data-projectid="5dWlJj3A1ENJJltZfNP8"
                  className="w-full h-full"
                >
                  Loading the Audio Player...
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Story;