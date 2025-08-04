import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiAlertCircle, FiRefreshCw, FiExternalLink } = FiIcons;

const Book = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  // Direct book URL
  const bookUrl = "http://book.kimballandvitaly.com/vk-misadventures";

  // Handle iframe load events
  const handleIframeLoad = () => {
    setIsLoading(false);
    setLoadError(false);
  };

  // Handle iframe error
  const handleIframeError = () => {
    setIsLoading(false);
    setLoadError(true);
  };

  // Retry loading the iframe
  const retryLoading = () => {
    setIsLoading(true);
    setLoadError(false);
    
    // Force iframe refresh by changing the key
    const iframe = document.getElementById('book-iframe');
    if (iframe) {
      const src = iframe.src;
      iframe.src = '';
      setTimeout(() => {
        iframe.src = src;
      }, 100);
    }
  };

  useEffect(() => {
    // Set a timeout to check if loading takes too long
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        setLoadError(true);
        setIsLoading(false);
      }
    }, 10000); // 10 seconds timeout

    return () => clearTimeout(timeoutId);
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-yellow-100 relative overflow-hidden">
      <Navigation />
      <div className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-['Comic Neue','Comic Sans MS',cursive] text-stone-800">
              THE ADVENTURES OF VITALY & KIMBALL
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto font-['Comic Neue','Comic Sans MS',cursive]">
              A Colorful Storybook Journey Through Our Life Together
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto mb-8">
            <div className="bg-white p-4 rounded-2xl shadow-lg relative min-h-[700px]">
              {/* Loading overlay */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80 z-10 rounded-2xl">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent mb-4"></div>
                    <p className="text-indigo-700 font-medium">Loading our storybook...</p>
                  </div>
                </div>
              )}

              {/* Error message */}
              {loadError && (
                <div className="absolute inset-0 flex items-center justify-center bg-white z-10 rounded-2xl">
                  <div className="text-center max-w-md mx-auto p-6">
                    <SafeIcon icon={FiAlertCircle} className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Having trouble loading our book</h3>
                    <p className="text-gray-600 mb-6">
                      We're having a bit of trouble loading our storybook from the external service. 
                      This could be due to connection issues or browser security settings.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <button 
                        onClick={retryLoading}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                      >
                        <SafeIcon icon={FiRefreshCw} className="w-5 h-5 mr-2" />
                        Try Again
                      </button>
                      <a 
                        href={bookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
                      >
                        <SafeIcon icon={FiExternalLink} className="w-5 h-5 mr-2" />
                        Open Book in New Tab
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* The book iframe with direct URL */}
              <iframe 
                id="book-iframe"
                width="100%" 
                height="700" 
                src={bookUrl}
                frameBorder="0" 
                allowFullScreen
                title="The Misadventures of Vitaly and Kimball"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="origin"
                loading="eager"
                importance="high"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
              ></iframe>
            </div>
            
            <div className="max-w-2xl mx-auto mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border-4 border-amber-200">
              <h2 className="text-xl font-['Comic Neue','Comic Sans MS',cursive] text-amber-800 mb-4">About This Book</h2>
              <p className="text-gray-700 leading-relaxed font-['Comic Neue','Comic Sans MS',cursive]">
                "The Adventures of Vitaly & Kimball" is a fun, illustrated storybook capturing our journey together - from first meeting to building a life together, complete with all the quirks, challenges, and joys along the way. It's our love story told with humor and honesty, celebrating the beautiful chaos that happens when two very different people find home in each other.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Book;