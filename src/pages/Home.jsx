import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import PoemDisplay from '../components/PoemDisplay';
import CountdownTimer from '../components/CountdownTimer';
import AnniversarySignup from '../components/AnniversarySignup';
import ImageModal from '../components/ImageModal';
import Footer from '../components/Footer';
import * as FiIcons from 'react-icons/fi';

const { FiArrowRight, FiHeart, FiHome, FiCalendar, FiUsers, FiBookOpen, FiCheckCircle, FiImage } = FiIcons;

const Home = ({ openGalleryLightbox }) => {
  const [showSignup, setShowSignup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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
                  The low hum of the city beyond our window fades into the background as midnight settles over Salt Lake. I glance over my shoulder: the faint glow of Kimball's screen, our old wedding photo tacked to the fridge, and the kitchen filled with the scent of leftover borscht—a recipe from home, as battered and beloved as our story.
                </em>
              </p>
            </motion.div>

            {/* Video Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="relative aspect-w-16 aspect-h-9 max-w-3xl mx-auto rounded-xl overflow-hidden shadow-xl"
            >
              <div style={{ position: 'relative', aspectRatio: '16/9' }}>
                <iframe
                  loading="lazy"
                  title="Our Love Story"
                  src="https://play.gumlet.io/embed/6764e9935c9461e1db824f52"
                  style={{ border: 'none', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"
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
                Nearly 20 years ago, we met online and then went together to our first movie night—"She's the Man" at a $1 theater in Provo (because we were broke college students who knew how to budget for romance). We also attended Family Home Evening with Affirmation, a group for gay Mormon people navigating faith and identity. That connection on May 15, 2006 would become the foundation of our journey together.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/story"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-full hover:opacity-90 transition-colors"
                >
                  <SafeIcon icon={FiBookOpen} className="w-5 h-5" />
                  <span className="font-medium">Read Our Story</span>
                  <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
                </Link>
                
                <a
                  href="https://gallery.kimballandvitaly.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-white text-indigo-600 border-2 border-indigo-500 px-8 py-4 rounded-full hover:bg-indigo-50 transition-colors"
                >
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
          <CountdownTimer targetDate="August 15, 2026" title="Celebrating Our 18th Wedding Anniversary" showCta={true} />
        </div>
      </section>

      {/* Our Epic Ordinary Love Section - UPDATED with consistent image sizing */}
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
                <span className="block text-indigo-600 italic">It Was a Person</span>
              </h2>
              <p className="text-lg md:text-xl text-stone-600 max-w-4xl mx-auto leading-relaxed">
                From a Ukrainian orphanage to the mountains of Utah, ours is a story of slow-building, everyday courage. Love, for us, was not an easy answer. It meant translating pain into poetry—sometimes in broken English, always from the heart. (And yes, we still argue about proper Ukrainian pronunciation.)
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Card 1 - UPDATED with fixed height and consistent image sizing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-md border-2 border-indigo-100 flex flex-col overflow-hidden"
                style={{ height: "500px" }}
              >
                <div className="p-6 flex flex-col flex-grow">
                  <SafeIcon icon={FiHeart} className="w-8 h-8 text-red-500 mx-auto mb-4" />
                  <div className="flex-grow flex flex-col justify-between">
                    <p className="text-stone-700 italic text-center leading-relaxed text-sm mb-4">
                      In the silent echoes of the orphanage, I learned that survival meant invisibility. But with Kimball, I discovered the courage to be seen. He celebrated my voice—first halting, then confident—and created space for the stories I'd never told anyone. Together we crafted a language of belonging that transcended words.
                    </p>
                    <div
                      className="rounded-lg overflow-hidden cursor-pointer bg-gray-100 flex items-center justify-center"
                      style={{ height: "160px", minHeight: "160px" }}
                      onClick={() => openImageModal({
                        src: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753370695404-Kimball%20and%20Vitaly%20Engagement%202008_09.jpg",
                        title: "Finding Courage Together",
                        description: "2008 - From strangers to soulmates, our journey has been anything but ordinary."
                      })}
                    >
                      <img
                        src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753370695404-Kimball%20and%20Vitaly%20Engagement%202008_09.jpg"
                        alt="Engagement photo"
                        className="w-full h-full object-contain"
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 - UPDATED with fixed height and consistent image sizing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-md border-2 border-indigo-100 flex flex-col overflow-hidden"
                style={{ height: "500px" }}
              >
                <div className="p-6 flex flex-col flex-grow">
                  <SafeIcon icon={FiHome} className="w-8 h-8 text-yellow-500 mx-auto mb-4" />
                  <div className="flex-grow flex flex-col justify-between">
                    <p className="text-stone-700 italic text-center leading-relaxed text-sm mb-4">
                      When we first met, I was still writing poems in Ukrainian and translating them awkwardly into English. Kimball would listen intently, finding beauty in my stumbling words. When I first said "Я тебя люблю" to him, he surprised me by saying it back in Russian. Now we share a vocabulary of inside jokes and half-sentences that need no translation.
                    </p>
                    <div
                      className="rounded-lg overflow-hidden cursor-pointer bg-gray-100 flex items-center justify-center"
                      style={{ height: "160px", minHeight: "160px" }}
                      onClick={() => openImageModal({
                        src: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753370717696-Kimball%20and%20Vitaly%20Engagement%202008_28.jpg",
                        title: "Our Shared Language",
                        description: "2008 - Building a vocabulary of love that transcends borders and languages."
                      })}
                    >
                      <img
                        src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753370717696-Kimball%20and%20Vitaly%20Engagement%202008_28.jpg"
                        alt="Engagement photo"
                        className="w-full h-full object-contain"
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 3 - UPDATED with fixed height and consistent image sizing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-md border-2 border-indigo-100 flex flex-col overflow-hidden"
                style={{ height: "500px" }}
              >
                <div className="p-6 flex flex-col flex-grow">
                  <SafeIcon icon={FiHeart} className="w-8 h-8 text-blue-500 mx-auto mb-4" />
                  <div className="flex-grow flex flex-col justify-between">
                    <p className="text-stone-700 italic text-center leading-relaxed text-sm mb-4">
                      There's a Ukrainian proverb: "When you're drowning, you'll clutch at a straw." But we never just clutched—we built. From fragile beginnings came something sturdy enough to shelter us through immigration battles, health crises, and the daily weight of being outsiders. Our love wasn't just salvation; it was creation.
                    </p>
                    <div
                      className="rounded-lg overflow-hidden cursor-pointer bg-gray-100 flex items-center justify-center"
                      style={{ height: "160px", minHeight: "160px" }}
                      onClick={() => openImageModal({
                        src: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753370726823-Kimball%20and%20Vitaly%20Engagement%202008_34.jpg",
                        title: "Building Together",
                        description: "2008 - From fragile beginnings came something sturdy enough to shelter us through life's challenges."
                      })}
                    >
                      <img
                        src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753370726823-Kimball%20and%20Vitaly%20Engagement%202008_34.jpg"
                        alt="Engagement photo"
                        className="w-full h-full object-contain"
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

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
                <Link
                  to="/story"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-8 py-4 rounded-full hover:opacity-90 transition-colors shadow-lg"
                >
                  <SafeIcon icon={FiBookOpen} className="w-5 h-5" />
                  <span className="font-medium">Read Our Story</span>
                  <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
                </Link>
                
                <a
                  href="https://gallery.kimballandvitaly.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-full hover:opacity-90 transition-colors shadow-lg"
                >
                  <SafeIcon icon={FiImage} className="w-5 h-5" />
                  <span className="font-medium">View Our Gallery</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Resilience Section - UPDATED with consistent image sizing */}
      <section className="py-20 bg-white relative overflow-hidden">
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

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif text-stone-800">
                <strong>We Did Not Just Survive—</strong>{' '}
                <span className="block text-indigo-600 italic">We Chose Each Other, Again and Again</span>
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
                  The world tried to define us by its politics and paperwork. We were the couple whose love was once illegal, then invisible, then unstoppable. We became experts at explaining ourselves—though we still haven't figured out how to explain why Kimball would choose pizza for every meal if he could, and how he uses guilt to convince me to make his favorite thick-crust pizzas loaded with pepperoni and mushrooms.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-3 flex-shrink-0" />
                    <p className="text-stone-600 italic">
                      The family that learned to dance between languages, holidays, and heartbreak, choosing authenticity over acceptance every time. Always looking for new reasons to vacation together at least twice a year—maybe on a cruise and then a city retreat.
                    </p>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0" />
                    <p className="text-stone-600 italic">
                      Wounded, and then stronger—weathering surgeries, betrayals, bankruptcies, and the creeping loneliness that comes with living in translation. We survived financial disasters that would make Dave Ramsey weep.
                    </p>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0" />
                    <p className="text-stone-600 italic">
                      Once Vitaly mastered English, his quick wit and clever jokes brought vibrant life to Kimball's world. There's a reason Kimball calls him "Witty" or "Wisey" (a name that stuck after a misread MBA nametag led to the question: "What does Wisey mean?")
                    </p>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mt-3 flex-shrink-0" />
                    <p className="text-stone-600 italic">
                      We became the safe harbor for friends and family navigating their own storms, proving that broken people can still build beautiful things together. In bed before I fall asleep, while Kimball cuddles me like a baby until I'm in deep sleep, we share our deepest stories and make life decisions together.
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
                <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-purple-100">
                  <p className="text-lg text-stone-700 leading-relaxed">
                    Our greatest milestones were not always victory parades. Sometimes they were therapy sessions, forgiveness over cold leftovers, and hands clasped tight in hospital waiting rooms—celebrating that we still had each other. We learned that "for better or worse" sometimes means "for better or for when Vitaly decides to stay up all night at the computer while Kimball goes to bed at 10pm sharp with his library book."
                  </p>
                </div>

                <div
                  className="rounded-lg overflow-hidden cursor-pointer bg-gray-100 flex items-center justify-center"
                  style={{ height: "256px" }}
                  onClick={() => openImageModal({
                    src: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753370742843-Kimball%20and%20Vitaly%20Engagement%202008_36.jpg",
                    title: "Everyday Victories",
                    description: "2008 - Our greatest milestones were not always victory parades, but the quiet moments of choosing each other again and again."
                  })}
                >
                  <img
                    src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753370742843-Kimball%20and%20Vitaly%20Engagement%202008_36.jpg"
                    alt="Engagement photo"
                    className="w-full h-full object-contain"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Poem Section */}
      <PoemDisplay />

      {/* Anniversary Signup */}
      <section id="signup-section" className="py-20 bg-gradient-to-br from-blue-50 to-yellow-50 relative overflow-hidden">
        {/* Decorative Elements */}
        {heartColors.map((color, index) => (
          <motion.div
            key={`signup-heart-${index}`}
            className={`absolute ${index % 2 === 0 ? 'top-1/4' : 'bottom-1/4'} ${index < 3 ? 'left-1/' + (index + 2) : 'right-1/' + (7 - index)} w-16 h-16 ${color} opacity-20`}
            animate={{ rotate: [0, 10, 0, -10, 0], y: [0, -10, 0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 15 + index * 2 }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
            </svg>
          </motion.div>
        ))}

        <motion.div
          className="absolute bottom-20 right-20 w-20 h-20 opacity-20"
          animate={{ rotate: 360, scale: [1, 1.1, 1, 0.9, 1] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          <div className="text-4xl">🌸</div>
        </motion.div>

        {/* Rainbow balloon */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-16 h-24 opacity-20"
          animate={{ y: [0, -10, 0, -5, 0], rotate: [0, 3, 0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
        >
          <div className="w-full h-full">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <defs>
                <linearGradient id="rainbow-balloon5" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF0018" />
                  <stop offset="16%" stopColor="#FFA52C" />
                  <stop offset="32%" stopColor="#FFFF41" />
                  <stop offset="48%" stopColor="#008018" />
                  <stop offset="66%" stopColor="#0000F9" />
                  <stop offset="83%" stopColor="#86007D" />
                  <stop offset="100%" stopColor="#FF0018" />
                </linearGradient>
              </defs>
              <path d="M12,2C8.13,2 5,5.13 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9C19,5.13 15.87,2 12,2Z" fill="url(#rainbow-balloon5)" />
            </svg>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-stone-800">
              <span className="text-indigo-600 italic">Join Our Celebration</span>
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              We're celebrating our 18th wedding anniversary on August 15, 2026. We'd love for you to join us! (Warning: There will be Ukrainian food, terrible dad jokes, and probably someone crying happy tears.)
            </p>
            <button
              onClick={() => setShowSignup(true)}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-full hover:opacity-90 transition-colors"
            >
              <SafeIcon icon={FiUsers} className="w-5 h-5" />
              <span className="font-medium">Sign Up for Our Guest List</span>
              <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
            </button>
          </motion.div>
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
                  <SafeIcon icon={FiImage} className="w-8 h-8 text-indigo-500 mx-auto group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold text-stone-800">Our Gallery</h4>
                  <p className="text-sm text-stone-600">View our journey in photos, letters, and kitchen-table memories</p>
                </div>
              </a>

              <Link
                to="/story"
                className="group p-6 bg-white rounded-2xl border-2 border-indigo-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <SafeIcon icon={FiBookOpen} className="w-8 h-8 text-indigo-500 mx-auto group-hover:scale-110 transition-transform" />
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