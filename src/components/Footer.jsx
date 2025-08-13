import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart } = FiIcons;

const Footer = () => {
  const heartColors = [
    'text-red-500',
    'text-orange-500',
    'text-yellow-500',
    'text-green-500',
    'text-blue-500',
    'text-indigo-500',
    'text-violet-500'
  ];

  return (
    <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-12 relative overflow-hidden">
      {/* Added more decorative elements to footer */}
      {/* Floating hearts */}
      {heartColors.map((color, index) => (
        <motion.div
          key={index}
          className={`absolute ${index % 2 === 0 ? 'top-1/4' : 'bottom-1/4'} ${index < 3 ? 'left-1/' + (index + 2) : 'right-1/' + (7 - index)} w-12 h-12 ${color} opacity-20`}
          animate={{
            rotate: [0, 10, 0, -10, 0],
            y: [0, -10, 0, 10, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 15 + index * 2
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
          </svg>
        </motion.div>
      ))}

      {/* Wedding rings */}
      <motion.div
        className="absolute top-1/4 left-1/6 w-16 h-16 opacity-20"
        animate={{
          y: [0, -15, 0, -5, 0],
          rotate: [0, 5, 0, -5, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "easeInOut"
        }}
      >
        <div className="text-5xl">💍</div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-1/6 w-16 h-16 opacity-20"
        animate={{
          y: [0, -10, 0, -15, 0],
          rotate: [0, -5, 0, 5, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: "easeInOut"
        }}
      >
        <div className="text-5xl">💍</div>
      </motion.div>

      {/* Floating flowers */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-20 h-20 opacity-20"
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1, 0.9, 1]
        }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "linear"
        }}
      >
        <div className="text-4xl">🌸</div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-1/4 w-16 h-16 opacity-20"
        animate={{
          rotate: -360,
          scale: [1, 1.1, 1, 0.9, 1]
        }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "linear"
        }}
      >
        <div className="text-4xl">🌺</div>
      </motion.div>

      {/* Wedding bells */}
      <motion.div
        className="absolute bottom-1/2 right-1/5 w-16 h-16 opacity-20"
        animate={{
          y: [0, -8, 0, -12, 0],
          rotate: [0, 10, 0, -10, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 18,
          ease: "easeInOut"
        }}
      >
        <div className="text-5xl">🔔</div>
      </motion.div>

      {/* Rainbow balloon */}
      <motion.div
        className="absolute top-1/3 left-1/5 w-16 h-24 opacity-20"
        animate={{
          y: [0, -10, 0, -15, 0],
          rotate: [0, -5, 0, 5, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 18,
          ease: "easeInOut"
        }}
      >
        <div className="w-full h-full">
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <defs>
              <linearGradient id="rainbow-balloon-footer" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#86007D" />
                <stop offset="16%" stopColor="#0000F9" />
                <stop offset="32%" stopColor="#008018" />
                <stop offset="48%" stopColor="#FFFF41" />
                <stop offset="66%" stopColor="#FFA52C" />
                <stop offset="83%" stopColor="#FF0018" />
                <stop offset="100%" stopColor="#86007D" />
              </linearGradient>
            </defs>
            <path
              d="M12,2C8.13,2 5,5.13 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9C19,5.13 15.87,2 12,2Z"
              fill="url(#rainbow-balloon-footer)"
            />
          </svg>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="space-y-4">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 flex items-center justify-center">
              <img
                src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753573661471-blob"
                alt="Kimball & Vitaly Logo"
                className="w-full h-full object-contain opacity-90"
              />
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2">
            {heartColors.map((color, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
                className={`w-6 h-6 ${color}`}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                </svg>
              </motion.div>
            ))}
          </div>

          <h3
            className="text-xl font-bold tracking-wider"
            style={{
              fontFamily: "'Great Vibes','Pacifico','Brush Script MT',cursive",
              fontSize: "1.9rem",
              letterSpacing: "0.05em",
              fontWeight: "400"
            }}
          >
            Kimball & Vitaly
          </h3>

          <p className="text-indigo-200">
            Celebrating our journey of love, resilience, and finding home in each other
          </p>

          <div className="flex justify-center pt-2">
            <svg
              width="36"
              height="24"
              viewBox="0 0 36 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-80"
            >
              <rect width="36" height="4" fill="#FF0000" />
              <rect y="4" width="36" height="4" fill="#FF8000" />
              <rect y="8" width="36" height="4" fill="#FFFF00" />
              <rect y="12" width="36" height="4" fill="#008000" />
              <rect y="16" width="36" height="4" fill="#0000FF" />
              <rect y="20" width="36" height="4" fill="#800080" />
            </svg>
          </div>

          <p className="text-sm text-indigo-300 mt-6">May 15, 2006 - Forever</p>
          <p className="text-xs text-indigo-400">© 2025 • Designed with love (and a lot of coffee)</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;