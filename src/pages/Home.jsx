import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import PoemDisplay from '../components/PoemDisplay';
import CountdownTimer from '../components/CountdownTimer';
import AnniversarySignup from '../components/AnniversarySignup';
import ImageModal from '../components/ImageModal';
import ContentBoxes from '../components/ContentBoxes';
import Footer from '../components/Footer';
import * as FiIcons from 'react-icons/fi';

const { FiArrowRight, FiHeart, FiHome, FiCalendar, FiUsers, FiBookOpen, FiCheckCircle, FiImage, FiGift, FiRefreshCw } = FiIcons;

const Home = ({ openGalleryLightbox }) => {
  const [showSignup, setShowSignup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [videoLoading, setVideoLoading] = useState(true); // State for video loading
  
  const heartColors = [
    'text-red-500',
    'text-orange-500',
    'text-yellow-500',
    'text-green-500',
    'text-blue-500',
    'text-indigo-500',
    'text-violet-500'
  ];

  const openImageModal = (image) => {
    setSelectedImage({
      src: image.src || image,
      title: image.title || "Our Journey",
      description: image.description || "A special moment in our journey together"
    });
  };

  // Updated to open gallery in a new tab
  const handleGalleryClick = (e) => {
    e.preventDefault();
    window.open("https://gallery.kimballandvitaly.com/", "_blank");
  };

  // Function to handle video loaded event
  const handleVideoLoaded = () => {
    setVideoLoading(false);
  };

  // Listen for message from iframe when video is loaded
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === 'video-loaded') {
        setVideoLoading(false);
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    // Set a timeout to hide the loader after a certain time in case the event isn't fired
    const timeoutId = setTimeout(() => {
      setVideoLoading(false);
    }, 10000); // 10 seconds timeout
    
    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <div className="pt-32 pb-16 min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-yellow-50" />
        <div className="absolute inset-0 bg-[url('https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753369491076-blob')] bg-cover bg-center opacity-10" />

        {/* Decorative Elements */}
        {heartColors.map((color, index) => (
          <motion.div
            key={index}
            className={`absolute ${index % 2 === 0 ? 'top-1/4' : 'bottom-1/4'} ${index < 3 ? 'left-1/' + (index + 2) : 'right-1/' + (7 - index)} w-16 h-16 ${color} opacity-20`}
            animate={{ rotate: [0, 10, 0, -10, 0], y: [0, -10, 0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 15 + index * 2 }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
            </svg>
          </motion.div>
        ))}

        {/* Floating flowers */}
        <motion.div
          className="absolute top-60 left-1/4 w-20 h-20 opacity-30"
          animate={{ rotate: 360, scale: [1, 1.1, 1, 0.9, 1] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          <div className="text-4xl">🌸</div>
        </motion.div>

        <motion.div
          className="absolute bottom-40 right-1/5 w-16 h-16 opacity-20"
          animate={{ rotate: -360, scale: [1, 0.9, 1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
          <div className="text-4xl">🌺</div>
        </motion.div>

        {/* Rainbow balloons */}
        <motion.div
          className="absolute top-1/4 right-10 w-16 h-24 opacity-30"
          animate={{ y: [0, -20, 0, -10, 0], rotate: [0, 5, 0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
        >
          <div className="w-full h-full">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <defs>
                <linearGradient id="rainbow-balloon1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF0018" />
                  <stop offset="16%" stopColor="#FFA52C" />
                  <stop offset="32%" stopColor="#FFFF41" />
                  <stop offset="48%" stopColor="#008018" />
                  <stop offset="66%" stopColor="#0000F9" />
                  <stop offset="83%" stopColor="#86007D" />
                  <stop offset="100%" stopColor="#FF0018" />
                </linearGradient>
              </defs>
              <path d="M12,2C8.13,2 5,5.13 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9C19,5.13 15.87,2 12,2Z" fill="url(#rainbow-balloon1)" />
            </svg>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-1/3 left-16 w-20 h-30 opacity-20"
          animate={{ y: [0, -15, 0, -10, 0], rotate: [0, 3, 0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
        >
          <div className="w-full h-full">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <defs>
                <linearGradient id="rainbow-balloon2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#86007D" />
                  <stop offset="16%" stopColor="#0000F9" />
                  <stop offset="32%" stopColor="#008018" />
                  <stop offset="48%" stopColor="#FFFF41" />
                  <stop offset="66%" stopColor="#FFA52C" />
                  <stop offset="83%" stopColor="#FF0018" />
                  <stop offset="100%" stopColor="#86007D" />
                </linearGradient>
              </defs>
              <path d="M12,2C8.13,2 5,5.13 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9C19,5.13 15.87,2 12,2Z" fill="url(#rainbow-balloon2)" />
            </svg>
          </div>
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-serif text-stone-800 leading-tight">
                Finding Home in <span className="block text-indigo-600 italic">Love's Echo</span>
              </h1>
              <div className="flex items-center justify-center space-x-2 text-stone-600">
                <SafeIcon icon={FiCalendar} className="w-5 h-5" />
                <span className="text-lg">May 15, 2006 - Present</span>
              </div>

              {/* Rings image with decorative lines */}
              <div className="flex items-center justify-center my-6 px-4">
                <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent max-w-xs"></div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="mx-4 cursor-pointer"
                  onClick={() => openImageModal("https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753646796996-Wedding%20rings%20%281%29.png")}
                >
                  <div className="w-32 h-32 flex items-center justify-center">
                    <img src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753646796996-Wedding%20rings%20%281%29.png" alt="Kimball & Vitaly" className="w-full h-full object-contain" />
                  </div>
                </motion.div>
                <div className="flex-grow h-px bg-gradient-to-r from-gray-300 via-gray-300 to-transparent max-w-xs"></div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <p className="text-lg md:text-xl text-stone-700 leading-relaxed italic font-light">
                <em>
                  From a $3 first date to visas, vows, and way too many road trips—this is how two stubborn hearts built one address.
                </em>
              </p>
            </motion.div>

            {/* Video Section with Loading Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="relative aspect-w-16 aspect-h-9 max-w-3xl mx-auto rounded-xl overflow-hidden shadow-xl"
            >
              <div style={{ position: 'relative', aspectRatio: '16/9' }}>
                {/* Loading indicator overlay */}
                {videoLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                    <div className="text-center">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent mb-4"></div>
                      <p className="text-indigo-700 font-medium">Loading our love story...</p>
                    </div>
                  </div>
                )}
                <iframe
                  loading="lazy"
                  title="Our Love Story"
                  src="https://play.gumlet.io/embed/6764e9935c9461e1db824f52"
                  style={{
                    border: 'none',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%'
                  }}
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"
                  onLoad={handleVideoLoaded}
                ></iframe>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="space-y-6 mb-12"
            >
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                Inside you'll find the quiet stuff that mattered—visa stamps, late-night edits, sunrise gym runs, kitchen dances, holiday mashups, and a thousand little Tuesdays where we kept choosing each other.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/story" className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-full hover:opacity-90 transition-colors">
                  <SafeIcon icon={FiBookOpen} className="w-5 h-5" />
                  <span className="font-medium">Read Our Story</span>
                  <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
                </Link>
                <a href="https://gallery.kimballandvitaly.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 bg-white text-indigo-600 border-2 border-indigo-500 px-8 py-4 rounded-full hover:bg-indigo-50 transition-colors">
                  <SafeIcon icon={FiImage} className="w-5 h-5" />
                  <span className="font-medium">View Our Gallery</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Countdown Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-4">
            <SafeIcon icon={FiGift} className="w-10 h-10 text-indigo-500 animate-bounce" />
          </div>
          <h3 className="text-xl md:text-2xl font-serif text-center text-stone-800 mb-6">
            Celebrating 18 years of weird, wonderful love
          </h3>
          <CountdownTimer targetDate="August 15, 2026" title="Celebrating Our 18th Wedding Anniversary" showCta={true} />
        </div>
      </section>

      {/* Our Epic Ordinary Love Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-yellow-50 relative overflow-hidden">
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

        {/* Floating flowers */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-24 h-24 opacity-20"
          animate={{ rotate: 360, scale: [1, 1.1, 1, 0.9, 1] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          <div className="text-4xl">🌸</div>
        </motion.div>

        <motion.div
          className="absolute bottom-1/3 left-1/4 w-20 h-20 opacity-20"
          animate={{ rotate: -360, scale: [1, 1.1, 1, 0.9, 1] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
          <div className="text-4xl">🌺</div>
        </motion.div>

        {/* Rainbow balloons */}
        <motion.div
          className="absolute bottom-1/4 left-1/5 w-20 h-30 opacity-20"
          animate={{ y: [0, -15, 0, -10, 0], rotate: [0, 3, 0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
        >
          <div className="w-full h-full">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <defs>
                <linearGradient id="rainbow-balloon3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF0018" />
                  <stop offset="16%" stopColor="#FFA52C" />
                  <stop offset="32%" stopColor="#FFFF41" />
                  <stop offset="48%" stopColor="#008018" />
                  <stop offset="66%" stopColor="#0000F9" />
                  <stop offset="83%" stopColor="#86007D" />
                  <stop offset="100%" stopColor="#FF0018" />
                </linearGradient>
              </defs>
              <path d="M12,2C8.13,2 5,5.13 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9C19,5.13 15.87,2 12,2Z" fill="url(#rainbow-balloon3)" />
            </svg>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-12"
          >
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-serif text-stone-800">
                <strong>Home Was Never a Place—</strong>{' '}
                <span className="block text-indigo-600 italic">It Was a Person (Who Eats All the Ice Cream)</span>
              </h2>
              <p className="text-lg md:text-xl text-stone-600 max-w-4xl mx-auto leading-relaxed">
                A Ukrainian orphan with one emergency potato. A BYU student fluent in Japanese and closet panic. From awkward movie nights to surviving IKEA shelves, this is the tale of how two very different men built something outrageously real. The whole story? You'll have to hear it to believe it.
              </p>
            </div>

            {/* Custom Content Boxes */}
            <ContentBoxes />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl max-w-3xl mx-auto border-2 border-indigo-100"
            >
              <p className="text-lg text-stone-700 italic">
                <em>
                  What no one tells you: Victory isn't always loud. Sometimes it's just showing up, again, with open arms and a soft place to land. Sometimes it's enjoying each other's presence while having separate beds—and Vitaly's cheesy choice of booking hotel rooms with one king bed because he loves cuddles, while Kimball loves independence and quiet sleep without nighttime disturbances.
                </em>
              </p>

              {/* Action buttons */}
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Link to="/story" className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-8 py-4 rounded-full hover:opacity-90 transition-colors shadow-lg">
                  <SafeIcon icon={FiBookOpen} className="w-5 h-5" />
                  <span className="font-medium">Hear the Whole Story</span>
                  <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
                </Link>
                <a href="https://gallery.kimballandvitaly.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-full hover:opacity-90 transition-colors shadow-lg">
                  <SafeIcon icon={FiImage} className="w-5 h-5" />
                  <span className="font-medium">View Our Gallery</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Resilience Section - UPDATED WITH MARRIAGE PHOTO */}
      <section className="py-20 relative overflow-hidden">
        {/* Background image - UPDATED TO NEW MARRIAGE PHOTO */}
        <div className="absolute inset-0 bg-[url('https://vitalybook.s3.us-west-1.amazonaws.com/Kimball+and+Vitaly+Website+Content/Marriage+August+2008.jpg')] bg-cover bg-top opacity-20"></div>
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-white/80"></div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-20 right-20 w-20 h-20 opacity-20"
          animate={{ rotate: 360, scale: [1, 1.1, 1, 0.9, 1] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          <div className="text-4xl">🌸</div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/4 w-16 h-16 opacity-30"
          animate={{ rotate: [0, 10, 0, -10, 0], y: [0, -10, 0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 15 }}
        >
          <SafeIcon icon={FiHeart} className="w-full h-full text-green-500" />
        </motion.div>

        {/* Rainbow balloons */}
        <motion.div
          className="absolute top-1/4 left-20 w-16 h-24 opacity-20"
          animate={{ y: [0, -15, 0, -5, 0], rotate: [0, 5, 0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
        >
          <div className="w-full h-full">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <defs>
                <linearGradient id="rainbow-balloon4" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#86007D" />
                  <stop offset="16%" stopColor="#0000F9" />
                  <stop offset="32%" stopColor="#008018" />
                  <stop offset="48%" stopColor="#FFFF41" />
                  <stop offset="66%" stopColor="#FFA52C" />
                  <stop offset="83%" stopColor="#FF0018" />
                  <stop offset="100%" stopColor="#86007D" />
                </linearGradient>
              </defs>
              <path d="M12,2C8.13,2 5,5.13 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9C19,5.13 15.87,2 12,2Z" fill="url(#rainbow-balloon4)" />
            </svg>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif text-stone-800">
                <strong>We Didn't Just Survive—We Made It Weird</strong>{' '}
                <span className="block text-indigo-600 italic">Choosing each other, over and over, through chaos, glitter, and the occasional therapy bill.</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <p className="text-lg text-stone-700 leading-relaxed">
                  They tried to define us by paperwork and politics. We defined ourselves by late-night pancakes, mismatched furniture, and a shared talent for turning disaster into dinner. We never promised to be perfect—only to keep choosing each other, no matter how bizarre the road got.
                </p>

                <div className="space-y-4 text-lg">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl flex-shrink-0">💃</div>
                    <p className="text-stone-600 italic">
                      The family that learned to dance between cultures, birthdays, and heartbreak—sometimes literally, in the kitchen, wearing socks.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl flex-shrink-0">💸</div>
                    <p className="text-stone-600 italic">
                      Survived financial disasters that would make Dave Ramsey lie down with a cold compress.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl flex-shrink-0">🤣</div>
                    <p className="text-stone-600 italic">
                      Accidentally built a life where every inside joke could be used in court against us.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl flex-shrink-0">💖</div>
                    <p className="text-stone-600 italic">
                      Became proof that broken people can still build something absurdly beautiful together.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                {/* Updated engagement photo with decorative frame */}
                <div className="cursor-pointer" onClick={() => openImageModal({
                  src: "https://vitalybook.s3.us-west-1.amazonaws.com/Kimball+and+Vitaly+Website+Content/Marriage+August+2008.jpg",
                  title: "Our wedding",
                  description: "August 2008 - Our wedding ceremony in San Diego."
                })}>
                  <div className="p-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg">
                    <div className="p-1 bg-white rounded-md">
                      <div className="overflow-hidden rounded-md bg-white flex items-center justify-center" style={{ height: "260px" }}>
                        <img src="https://vitalybook.s3.us-west-1.amazonaws.com/Kimball+and+Vitaly+Website+Content/Marriage+August+2008.jpg" alt="Our wedding ceremony" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="flex justify-center mt-2">
                      <div className="flex space-x-1">
                        {heartColors.slice(0, 5).map((color, i) => (
                          <SafeIcon key={i} icon={FiHeart} className={`w-4 h-4 ${color}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border-2 border-purple-100">
                  <p className="text-lg text-stone-700 leading-relaxed">
                    Our milestones weren't champagne toasts—they were therapy sessions, whispered apologies over cold leftovers, and hand squeezes in hospital waiting rooms. "For better or worse" sometimes just means "you make tea while I doom-scroll" or "you fall asleep, I finish the cookies."
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Poem Section */}
      <PoemDisplay />

      {/* Anniversary Signup - UPDATED with new background image and responsive behavior */}
      <section id="signup-section" className="py-20 relative overflow-hidden w-full">
        {/* Desktop background image - UPDATED with new image */}
        <div className="absolute inset-0 hidden md:block">
          <div className="absolute inset-0 w-full h-full bg-[url('https://vitalybook.s3.us-west-1.amazonaws.com/Kimball+and+Vitaly+Website+Content/Dec_2024_Vitaly_Birthday_Celebration.jpg')] bg-cover bg-center"></div>
        </div>
        
        {/* Mobile gradient background with decorative elements */}
        <div className="absolute inset-0 block md:hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>
          
          {/* Decorative elements for mobile */}
          {heartColors.map((color, index) => (
            <motion.div
              key={`mobile-heart-${index}`}
              className={`absolute opacity-30`}
              style={{
                top: `${10 + index * 15}%`,
                left: `${5 + (index * 12) % 80}%`,
                width: '24px',
                height: '24px'
              }}
              animate={{ 
                rotate: [0, 10, 0, -10, 0], 
                y: [0, -10, 0, 5, 0],
                scale: [1, 1.1, 1, 0.9, 1]
              }}
              transition={{ repeat: Infinity, duration: 4 + index }}
            >
              <svg viewBox="0 0 24 24" className={`w-full h-full ${heartColors[index % heartColors.length]}`} fill="currentColor">
                <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
              </svg>
            </motion.div>
          ))}
          
          {/* Floating flowers for mobile */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={`mobile-flower-${i}`}
              className="absolute text-white opacity-30"
              style={{
                top: `${20 + i * 25}%`,
                left: `${15 + i * 20}%`,
                fontSize: '2rem'
              }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 10, 0, -10, 0]
              }}
              transition={{ repeat: Infinity, duration: 3 + i }}
            >
              {i % 2 === 0 ? '🌸' : '🌺'}
            </motion.div>
          ))}
          
          {/* Rainbow balloon for mobile */}
          <motion.div
            className="absolute bottom-10 right-10 w-16 h-24 opacity-30"
            animate={{ y: [0, -15, 0, -5, 0], rotate: [0, 5, 0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          >
            <div className="w-full h-full">
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <defs>
                  <linearGradient id="rainbow-balloon-mobile" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF0018" />
                    <stop offset="16%" stopColor="#FFA52C" />
                    <stop offset="32%" stopColor="#FFFF41" />
                    <stop offset="48%" stopColor="#008018" />
                    <stop offset="66%" stopColor="#0000F9" />
                    <stop offset="83%" stopColor="#86007D" />
                    <stop offset="100%" stopColor="#FF0018" />
                  </linearGradient>
                </defs>
                <path d="M12,2C8.13,2 5,5.13 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9C19,5.13 15.87,2 12,2Z" fill="url(#rainbow-balloon-mobile)" />
              </svg>
            </div>
          </motion.div>
        </div>
        
        {/* Semi-transparent overlay for text readability */}
        <div className="absolute inset-0 md:bg-black/40"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Content container with proper width */}
          <div className="relative rounded-2xl overflow-hidden text-center">
            <div className="p-8 md:p-12">
              <SafeIcon icon={FiHeart} className="w-16 h-16 text-white mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-serif mb-6 text-white">
                Join Our Celebration
              </h2>
              <p className="text-lg leading-relaxed max-w-3xl mx-auto text-white">
                We're celebrating our 18th wedding anniversary on August 15, 2026. We'd love for you to join us! (Warning: There will be Ukrainian food, terrible dad jokes, and probably someone crying happy tears.)
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
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-stone-700 leading-relaxed italic">
                <em>
                  Maybe you, too, have searched for home in unfamiliar places. Maybe you've loved someone in the shadows, or built something beautiful on broken foundations. Our story is for you—the wanderers, the lovers, the ones still learning that home is what you build when you dare to stay. (And the ones who know that sometimes love means pretending to enjoy your partner's experimental cooking.)
                </em>
              </p>

              <h3 className="text-2xl md:text-3xl font-serif text-stone-800">
                <strong>Join us in celebrating our journey of radical, resilient, ordinary love.</strong>
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <a
                href="https://gallery.kimballandvitaly.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 bg-white rounded-2xl border-2 border-indigo-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <SafeIcon
                    icon={FiImage}
                    className="w-8 h-8 text-indigo-500 mx-auto group-hover:scale-110 transition-transform"
                  />
                  <h4 className="font-semibold text-stone-800">Our Gallery</h4>
                  <p className="text-sm text-stone-600">View our journey in photos, letters, and kitchen-table memories</p>
                </div>
              </a>

              <Link
                to="/story"
                className="group p-6 bg-white rounded-2xl border-2 border-indigo-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <SafeIcon
                    icon={FiBookOpen}
                    className="w-8 h-8 text-indigo-500 mx-auto group-hover:scale-110 transition-transform"
                  />
                  <h4 className="font-semibold text-stone-800">Read Our Story</h4>
                  <p className="text-sm text-stone-600">Dive deeper into our journey of love and resilience</p>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Anniversary Signup Modal */}
      {showSignup && <AnniversarySignup onClose={() => setShowSignup(false)} />}

      {/* Image Modal */}
      {selectedImage && <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />}
    </div>
  );
};

export default Home;