import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../components/Navigation';
import CountdownTimer from '../components/CountdownTimer';
import SafeIcon from '../common/SafeIcon';
import Footer from '../components/Footer';
import AnniversarySignup from '../components/AnniversarySignup';
import ImageModal from '../components/ImageModal';
import CustomAudioPlayer from '../components/CustomAudioPlayer';
import Slideshow from '../components/Slideshow';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiGlobe, FiHome, FiStar, FiCalendar, FiMapPin, FiX, FiArrowDown, FiUsers, FiArrowRight, FiAward, FiBookOpen, FiRefreshCw, FiExternalLink, FiVolume2, FiChevronLeft, FiChevronRight, FiGift, FiVolumeX, FiMusic, FiPlay, FiPause } = FiIcons;

const Story = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showBookModal, setShowBookModal] = useState(false);
  const [bookLoading, setBookLoading] = useState(true);
  const [bookError, setBookError] = useState(false);
  const [bookCoverLoaded, setBookCoverLoaded] = useState(false);
  const [bookCoverError, setBookCoverError] = useState(false);

  // Background music player state
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMusicMuted, setIsMusicMuted] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.15); // Starting at lower volume (15%)
  const [showMusicControls, setShowMusicControls] = useState(false);
  const [musicLoaded, setMusicLoaded] = useState(false);
  const [musicError, setMusicError] = useState(false);
  const [audioLoading, setAudioLoading] = useState(true);
  const [previousMusicVolume, setPreviousMusicVolume] = useState(0.15); // Remember volume before narration
  const backgroundMusicRef = useRef(null);

  // Audio player ref and state for narration
  const [showNarration, setShowNarration] = useState(false);
  const [narrationHeight, setNarrationHeight] = useState(0);

  // Audio source URL - using direct S3 audio URL
  const audioSrc = "https://vitalybook.s3.us-west-1.amazonaws.com/Kimball+and+Vitaly+Book+Narration/ElevenLabs_Kimball_and_Vitaly_Anniversary_Story.mp3";

  // Background music URL - using the provided S3 URL
  const backgroundMusicSrc = "https://vitalybook.s3.us-west-1.amazonaws.com/13-A-Lifetime-of-Love-FULL-SM372.mp3";

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

  // Book iframe handling with improved loading detection
  const handleBookIframeLoad = () => {
    // Add a small delay to ensure the iframe content is fully rendered
    setTimeout(() => {
      setBookLoading(false);
      setBookError(false);
    }, 500);
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
      bookCoverImg.src = "https://vitalybook.s3.us-west-1.amazonaws.com/Kimball+and+Vitaly+Website+Content/Book+Cover.jpg";
    }
  };

  // Handle music loading events
  const handleMusicLoaded = () => {
    console.log("Background music loaded successfully");
    setMusicLoaded(true);
    setMusicError(false);
    setAudioLoading(false);
    // Set initial volume
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = musicVolume;
    }
  };

  const handleMusicError = (error) => {
    console.error("Error loading background music:", error);
    setMusicError(true);
    setMusicLoaded(false);
    setAudioLoading(false);
  };

  // Toggle narration visibility - UPDATED to lower music volume instead of pausing
  const toggleNarration = () => {
    if (!showNarration) {
      // When enabling narration, lower music volume but don't pause
      if (backgroundMusicRef.current && isMusicPlaying) {
        // Remember current volume before lowering it
        setPreviousMusicVolume(backgroundMusicRef.current.volume);
        // Lower the volume for narration
        backgroundMusicRef.current.volume = 0.15;
        setMusicVolume(0.15);
      }
      setShowNarration(true);
      setNarrationHeight(140);
    } else {
      // When disabling narration, restore previous music volume
      if (backgroundMusicRef.current && isMusicPlaying) {
        backgroundMusicRef.current.volume = previousMusicVolume;
        setMusicVolume(previousMusicVolume);
      }
      setShowNarration(false);
      setNarrationHeight(0);
    }
  };

  // Open book in modal and start background music - UPDATED to show narration by default when coming from link
  const openBookModal = (showNarrationOnOpen = false) => {
    setShowBookModal(true);
    setBookLoading(true);
    setBookError(false);
    setAudioLoading(true);

    // Set narration state based on parameter
    if (showNarrationOnOpen) {
      setShowNarration(true);
      setNarrationHeight(140);
    } else {
      setShowNarration(false);
      setNarrationHeight(0);
    }

    // Create a new audio element each time to avoid stale state
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.pause();
      backgroundMusicRef.current = null;
    }

    const audioElement = new Audio(backgroundMusicSrc);
    audioElement.volume = musicVolume;
    audioElement.loop = true;
    audioElement.preload = "auto";

    // Add event listeners
    audioElement.addEventListener('loadeddata', handleMusicLoaded);
    audioElement.addEventListener('error', handleMusicError);
    audioElement.addEventListener('canplaythrough', () => {
      setAudioLoading(false);
      audioElement.play()
        .then(() => {
          setIsMusicPlaying(true);
          setMusicError(false);
        })
        .catch(err => {
          console.error("Error playing background music:", err);
          setMusicError(true);
        });
    });

    // Store the new audio element
    backgroundMusicRef.current = audioElement;
  };

  // Close book modal and stop background music
  const closeBookModal = () => {
    setShowBookModal(false);
    // Stop background music when modal closes
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.pause();
      backgroundMusicRef.current = null;
      setIsMusicPlaying(false);
    }
  };

  // Toggle background music play/pause
  const toggleBackgroundMusic = () => {
    if (backgroundMusicRef.current) {
      if (isMusicPlaying) {
        backgroundMusicRef.current.pause();
        setIsMusicPlaying(false);
      } else {
        backgroundMusicRef.current.play()
          .then(() => {
            setIsMusicPlaying(true);
            setMusicError(false);
          })
          .catch(err => {
            console.error("Error playing background music:", err);
            setMusicError(true);
          });
      }
    }
  };

  // Toggle background music mute
  const toggleMusicMute = () => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.muted = !isMusicMuted;
      setIsMusicMuted(!isMusicMuted);
    }
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setMusicVolume(newVolume);
    setPreviousMusicVolume(newVolume);
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = newVolume;
      setIsMusicMuted(newVolume === 0);
    }
  };

  // Set a timeout to check if loading takes too long
  useEffect(() => {
    if (showBookModal) {
      const timeoutId = setTimeout(() => {
        if (bookLoading) {
          setBookError(true);
          setBookLoading(false);
        }
      }, 8000); // Reduced timeout to 8 seconds
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

  // Cleanup function for audio element
  useEffect(() => {
    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current = null;
      }
    };
  }, []);

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
      <motion.div className="absolute top-1/3 left-20 w-24 h-24 opacity-20"
        animate={{ rotate: 360, scale: [1, 1.1, 1, 0.9, 1] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        <div className="text-4xl">🌸</div>
      </motion.div>

      <motion.div className="absolute bottom-1/3 right-20 w-20 h-20 opacity-20"
        animate={{ rotate: -360, scale: [1, 1.1, 1, 0.9, 1] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      >
        <div className="text-4xl">🌺</div>
      </motion.div>

      {/* ADDED MORE DECORATIVE ELEMENTS */}
      {/* Wedding rings */}
      <motion.div className="absolute top-1/6 right-1/6 w-16 h-16 opacity-20"
        animate={{ y: [0, -15, 0, -5, 0], rotate: [0, 5, 0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      >
        <div className="text-5xl">💍</div>
      </motion.div>

      <motion.div className="absolute bottom-1/6 left-1/6 w-16 h-16 opacity-20"
        animate={{ y: [0, -10, 0, -15, 0], rotate: [0, -5, 0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
      >
        <div className="text-5xl">💍</div>
      </motion.div>

      {/* Wedding bells */}
      <motion.div className="absolute top-1/2 left-10 w-16 h-16 opacity-20"
        animate={{ y: [0, -8, 0, -12, 0], rotate: [0, 10, 0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
      >
        <div className="text-5xl">🔔</div>
      </motion.div>

      <motion.div className="absolute bottom-1/4 right-10 w-16 h-16 opacity-20"
        animate={{ y: [0, -12, 0, -8, 0], rotate: [0, -10, 0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
      >
        <div className="text-5xl">🔔</div>
      </motion.div>

      {/* Floating flowers - ADDED MORE */}
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={`flower-${i}`}
          className="absolute opacity-30"
          style={{ top: `${10 + i * 20}%`, left: `${10 + i * 18}%`, width: '30px', height: '30px' }}
          animate={{ rotate: 360, scale: [1, 1.1, 1, 0.9, 1] }}
          transition={{ repeat: Infinity, duration: 20 + i * 5, ease: "linear" }}
        >
          <div className="text-4xl">{i % 2 === 0 ? '🌸' : '🌺'}</div>
        </motion.div>
      ))}

      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={`flower-${i + 4}`}
          className="absolute opacity-30"
          style={{ bottom: `${10 + i * 20}%`, right: `${10 + i * 18}%`, width: '30px', height: '30px' }}
          animate={{ rotate: -360, scale: [1, 0.9, 1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 25 + i * 3, ease: "linear" }}
        >
          <div className="text-4xl">{i % 2 === 0 ? '🌺' : '🌸'}</div>
        </motion.div>
      ))}

      {/* Rainbow balloon */}
      <motion.div className="absolute bottom-1/4 right-20 w-16 h-24 opacity-20"
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

      {/* Second rainbow balloon - ADDED NEW */}
      <motion.div className="absolute top-1/3 left-1/5 w-16 h-24 opacity-20"
        animate={{ y: [0, -10, 0, -15, 0], rotate: [0, -5, 0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
      >
        <div className="w-full h-full">
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <defs>
              <linearGradient id="rainbow-balloon-story-2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#86007D" />
                <stop offset="16%" stopColor="#0000F9" />
                <stop offset="32%" stopColor="#008018" />
                <stop offset="48%" stopColor="#FFFF41" />
                <stop offset="66%" stopColor="#FFA52C" />
                <stop offset="83%" stopColor="#FF0018" />
                <stop offset="100%" stopColor="#86007D" />
              </linearGradient>
            </defs>
            <path d="M12,2C8.13,2 5,5.13 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9C19,5.13 15.87,2 12,2Z" fill="url(#rainbow-balloon-story-2)" />
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
              Two husbands. One potato. And a journey that's part rom-com, part survival guide. From immigration interviews to disco balls gone rogue—we learned love is built in the weirdest places.
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
                  <em>
                    Tonight, as the soft glow from Kimball's reading lamp spills across our Salt Lake City living room, I'm reminded of how far we've come. From orphanage to citizenship, from strangers to soulmates, our journey has been anything but ordinary. As Kimball turns another page of his library book—always in bed by 10pm—I smile at our comfortable rhythms, even as I prepare for another late night at my computer.
                  </em>
                </p>
                <p>
                  It started on May 15, 2006. Not the dramatic, movie-script kind of love story, but something quieter, more persistent. A Ukrainian orphan immigrant and returned missionary meeting a BYU student Japanese linguist and returned missionary, connecting online and then going together to our first movie night—"She's the Man" at a $1 theater in Provo, and then to Family Home Evening with Affirmation, finding unexpected connection.
                </p>
                <p>
                  <strong>Love, for us, was not an easy answer.</strong> It meant translating pain into poetry—sometimes in broken English, always from the heart. It meant building a family in the spaces where we were told none could exist.
                </p>
              </div>
            </motion.section>

            {/* REPLACED: Timeline section with Slideshow */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/95 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-lg border-2 border-indigo-100 relative z-40"
            >
              <Slideshow />
            </motion.section>

            {/* KV Logo separator - ADDED NEW SEPARATOR HERE */}
            <div className="flex items-center justify-center my-8 px-4">
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent max-w-xs"></div>
              <div className="mx-4">
                <div className="w-32 h-32 flex items-center justify-center">
                  <img src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753573661471-blob" alt="Kimball & Vitaly Logo" className="w-full h-full object-contain" />
                </div>
              </div>
              <div className="flex-grow h-px bg-gradient-to-r from-gray-300 via-gray-300 to-transparent max-w-xs"></div>
            </div>

            {/* Our Book Section - IMPROVED WITH EMBEDDED IFRAME PREVIEW */}
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

              <p className="text-lg text-stone-700 text-center">
                "The Misadventures of Vitaly & Kimball" is a fun, illustrated storybook capturing our journey together - from first meeting to building a life together, complete with all the quirks, challenges, and joys along the way.
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative max-w-6xl mx-auto"
              >
                {/* Book Cover with embedded preview iframe */}
                <div
                  className="bg-white p-4 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  onClick={() => openBookModal(false)}
                >
                  <div className="relative overflow-hidden rounded-xl">
                    {/* Loading indicator for book cover */}
                    {!bookCoverLoaded && !bookCoverError && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
                      </div>
                    )}

                    {/* Embedded book preview iframe */}
                    <div className="w-full" style={{ height: "400px", position: "relative" }}>
                      <iframe
                        src="https://book.kimballandvitaly.com/vk-misadventures?preview=true"
                        frameBorder="0"
                        title="The Misadventures of Vitaly and Kimball - Preview"
                        className="w-full h-full"
                        onLoad={handleBookCoverLoad}
                        onError={handleBookCoverError}
                        style={{ display: bookCoverError ? "none" : "block" }}
                        sandbox="allow-scripts allow-same-origin"
                      ></iframe>
                    </div>

                    {/* Fallback if iframe fails to load */}
                    {bookCoverError && (
                      <div className="w-full" style={{ height: "400px" }}>
                        <img
                          id="book-cover-img"
                          src="https://vitalybook.s3.us-west-1.amazonaws.com/Kimball+and+Vitaly+Website+Content/Book+Cover.jpg"
                          alt="The Misadventures of Vitaly and Kimball - Book Cover"
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://vitalybook.s3.us-west-1.amazonaws.com/Kimball+and+Vitaly+Website+Content/Book+Cover.jpg";
                          }}
                        />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-end p-6">
                      <SafeIcon icon={FiBookOpen} className="w-12 h-12 text-white mb-3" />
                      <p className="text-white text-lg font-medium">Click to Open Our Storybook</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <button
                      onClick={() => openBookModal(false)}
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-6 py-3 rounded-full hover:opacity-90 transition-colors shadow-lg"
                    >
                      <SafeIcon icon={FiBookOpen} className="w-5 h-5" />
                      <span className="font-medium">Read Our Storybook</span>
                    </button>
                    <button
                      onClick={() => openBookModal(true)} // Open with narration enabled
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

            {/* Anniversary Countdown - UPDATED to match the Home page countdown */}
            <section className="relative z-40 rounded-2xl overflow-hidden">
              <div className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-center mb-4">
                    <SafeIcon icon={FiGift} className="w-10 h-10 text-indigo-500 animate-bounce" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-center text-stone-800 mb-6">
                    Celebrating 18 years of weird, wonderful love
                  </h3>
                  <CountdownTimer
                    targetDate="August 15, 2026"
                    title="Celebrating Our 18th Wedding Anniversary"
                    showCta={true}
                  />
                </div>
              </div>
            </section>

            {/* Closing Reflection - UPDATED with engagement photo background and top alignment */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden text-center z-40"
            >
              {/* Background image - UPDATED to engagement photo with top alignment */}
              <div className="absolute inset-0 bg-[url('https://vitalybook.s3.us-west-1.amazonaws.com/Kimball+and+Vitaly+Website+Content/Kimball+and+Vitaly+Engagement+2008_09.jpg')] bg-cover bg-top"></div>

              {/* Semi-transparent overlay for text readability */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Content with proper padding and spacing */}
              <div className="relative z-10 p-8 md:p-12">
                <SafeIcon icon={FiHeart} className="w-16 h-16 text-white mx-auto mb-6" />
                <h2 className="text-2xl md:text-3xl font-serif mb-6 text-white">
                  To Twenty Years & Beyond
                </h2>
                <p className="text-lg leading-relaxed max-w-3xl mx-auto text-white">
                  <em>
                    As we celebrate our journey together, we look back with gratitude for every moment—the joyful celebrations, the quiet evenings, and even the challenges that made us stronger. Our story continues to unfold, written day by day in the language of love that transcends borders, barriers, and time itself.
                  </em>
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
              </div>
            </motion.section>
          </div>
        </div>
      </div>

      <Footer />

      {/* Anniversary Signup Modal */}
      {showSignup && <AnniversarySignup onClose={() => setShowSignup(false)} />}

      {/* Image Modal */}
      {selectedImage && <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />}

      {/* Book Modal with CustomAudioPlayer */}
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

            {/* Music control button - new addition */}
            <div className="absolute top-4 left-4 z-[60] flex items-center">
              <button
                onClick={() => setShowMusicControls(!showMusicControls)}
                className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                aria-label="Music controls"
              >
                <SafeIcon icon={FiMusic} className="w-6 h-6" />
              </button>

              {/* Expanded music controls */}
              {showMusicControls && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="flex items-center bg-black/50 ml-2 p-2 rounded-full"
                >
                  <button
                    onClick={toggleBackgroundMusic}
                    className="text-white p-2 hover:bg-white/10 rounded-full"
                    aria-label={isMusicPlaying ? "Pause music" : "Play music"}
                  >
                    <SafeIcon icon={isMusicPlaying ? FiPause : FiPlay} className="w-5 h-5" />
                  </button>

                  <button
                    onClick={toggleMusicMute}
                    className="text-white p-2 hover:bg-white/10 rounded-full ml-1"
                    aria-label={isMusicMuted ? "Unmute music" : "Mute music"}
                  >
                    <SafeIcon icon={isMusicMuted ? FiVolumeX : FiVolume2} className="w-5 h-5" />
                  </button>

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={musicVolume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1.5 bg-white/20 rounded-full overflow-hidden ml-2"
                    style={{
                      background: `linear-gradient(to right, white 0%, white ${musicVolume * 100}%, rgba(255,255,255,0.2) ${
                        musicVolume * 100
                      }%, rgba(255,255,255,0.2) 100%)`
                    }}
                  />
                </motion.div>
              )}

              {/* Loading indicator */}
              {audioLoading && !musicError && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="ml-2 bg-blue-800/50 px-2 py-1 rounded text-xs text-white"
                >
                  Loading music...
                </motion.div>
              )}

              {/* Music error message */}
              {musicError && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="ml-2 bg-red-800/50 px-2 py-1 rounded text-xs text-white"
                >
                  Music error
                </motion.div>
              )}
            </div>

            {/* Toggle narration button */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[60]">
              <button
                onClick={toggleNarration}
                className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full hover:opacity-90 transition-colors"
              >
                <SafeIcon icon={FiVolume2} className="w-5 h-5" />
                <span className="font-medium">{showNarration ? "Hide Narration" : "Listen to Narration"}</span>
              </button>
            </div>

            {/* Loading overlay - only shows during initial loading */}
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
              {/* The book iframe */}
              <div className="flex-grow" style={{ height: `calc(100% - ${narrationHeight}px)` }}>
                <iframe
                  id="book-iframe-modal"
                  src="https://book.kimballandvitaly.com/vk-misadventures"
                  frameBorder="0"
                  title="The Misadventures of Vitaly and Kimball"
                  onLoad={handleBookIframeLoad}
                  onError={handleBookIframeError}
                  className="w-full h-full"
                  style={{ zIndex: 50 }}
                  allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                ></iframe>
              </div>

              {/* Custom Audio Player - Appears when narration is toggled */}
              <AnimatePresence>
                {showNarration && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="z-[60] bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900"
                  >
                    <CustomAudioPlayer
                      audioSrc={audioSrc}
                      title="The Misadventures of Kimball & Vitaly"
                      subtitle="Narrated by Vitaly"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Story;