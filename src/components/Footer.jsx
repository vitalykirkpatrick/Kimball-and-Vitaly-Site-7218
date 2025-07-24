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
    <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-4">
          <div className="flex justify-center space-x-2">
            {heartColors.map((color, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
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
              fontFamily: "'Great Vibes', 'Pacifico', 'Brush Script MT', cursive",
              fontSize: "1.9rem",
              letterSpacing: "0.05em",
              fontWeight: "400"
            }}
          >
            Kimball & Vitaly
          </h3>
          <p className="text-indigo-200">Celebrating our journey of love, resilience, and finding home in each other</p>
          <div className="flex justify-center pt-2">
            <svg width="36" height="24" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
              <rect width="36" height="4" fill="#FF0000"/>
              <rect y="4" width="36" height="4" fill="#FF8000"/>
              <rect y="8" width="36" height="4" fill="#FFFF00"/>
              <rect y="12" width="36" height="4" fill="#008000"/>
              <rect y="16" width="36" height="4" fill="#0000FF"/>
              <rect y="20" width="36" height="4" fill="#800080"/>
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