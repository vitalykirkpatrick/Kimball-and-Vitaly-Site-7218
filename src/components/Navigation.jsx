import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiX, FiBook } = FiIcons;

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/story', label: 'Our Story' },
    { path: 'https://gallery.kimballandvitaly.com', label: 'Gallery', external: true },
    { path: '/book', label: 'Our Book', icon: FiBook },
    { path: '/messages', label: 'Messages' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4 text-stone-800 hover:text-rose-600 transition-colors">
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753573661471-blob" 
                alt="Kimball & Vitaly Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
            <span 
              className="text-xl font-bold tracking-wider" 
              style={{
                fontFamily: "'Great Vibes','Pacifico','Brush Script MT',cursive",
                fontSize: "1.9rem",
                letterSpacing: "0.05em",
                fontWeight: "400"
              }}
            >
              Kimball & Vitaly
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              if (item.external) {
                return (
                  <a
                    key={item.path}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium transition-colors flex items-center space-x-1 text-stone-600 hover:text-stone-900"
                  >
                    {item.icon && <SafeIcon icon={item.icon} className="w-4 h-4" />}
                    <span>{item.label}</span>
                  </a>
                );
              }
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors flex items-center space-x-1 ${
                    location.pathname === item.path
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {item.icon && <SafeIcon icon={item.icon} className="w-4 h-4" />}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-stone-600 hover:text-stone-900 hover:bg-stone-100"
          >
            <SafeIcon icon={isOpen ? FiX : FiMenu} className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-stone-200"
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => {
                if (item.external) {
                  return (
                    <a
                      key={item.path}
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                    >
                      {item.icon && <SafeIcon icon={item.icon} className="w-5 h-5" />}
                      <span>{item.label}</span>
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'text-indigo-600 bg-indigo-50'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                    }`}
                  >
                    {item.icon && <SafeIcon icon={item.icon} className="w-5 h-5" />}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;