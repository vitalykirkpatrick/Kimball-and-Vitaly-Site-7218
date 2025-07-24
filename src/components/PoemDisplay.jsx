import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiPlay, FiPause, FiVolume2, FiVolumeX } = FiIcons;

const PoemDisplay = () => {
  const heartColors = [
    'text-red-500',
    'text-orange-500',
    'text-yellow-500',
    'text-green-500',
    'text-blue-500',
    'text-indigo-500',
    'text-violet-500'
  ];

  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const audioRef = useRef(null);
  
  // Primary audio source - directly from Google Drive
  const audioSource = "https://drive.google.com/uc?export=download&id=1smoGz76hLAm0MbaYJcc54mkhfxRT7P1P";

  // Handle audio play/pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Audio playback failed:", error);
            setAudioError("Playback failed. Please try again.");
          });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle audio mute/unmute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Update progress bar
  const updateProgress = () => {
    if (audioRef.current) {
      const value = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(value || 0);
    }
  };

  // Handle audio loaded
  const handleAudioLoaded = () => {
    setAudioLoaded(true);
    setAudioError(null);
    console.log("Audio loaded successfully");
  };

  // Handle audio error
  const handleAudioError = (e) => {
    console.error("Audio loading error:", e);
    setAudioError("Unable to play audio. Please try again later.");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden"
    >
      {/* Decorative Elements */}
      {heartColors.map((color, index) => (
        <motion.div
          key={index}
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

      {/* Rainbow balloon */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-24 h-24 opacity-30"
        animate={{
          y: [0, -15, 0, -5, 0],
          rotate: [0, 5, 0, -5, 0]
        }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
      >
        <div className="w-full h-full balloon">
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <defs>
              <linearGradient id="rainbow-balloon" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF0018" />
                <stop offset="16%" stopColor="#FFA52C" />
                <stop offset="32%" stopColor="#FFFF41" />
                <stop offset="48%" stopColor="#008018" />
                <stop offset="66%" stopColor="#0000F9" />
                <stop offset="83%" stopColor="#86007D" />
                <stop offset="100%" stopColor="#FF0018" />
              </linearGradient>
            </defs>
            <path d="M12,2C8.13,2 5,5.13 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9C19,5.13 15.87,2 12,2Z" fill="url(#rainbow-balloon)" />
          </svg>
        </div>
      </motion.div>

      {/* Floating flowers */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute opacity-30"
          style={{
            top: `${20 + i * 25}%`,
            left: `${15 + i * 20}%`,
            width: '30px',
            height: '30px'
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1, 0.9, 1]
          }}
          transition={{ repeat: Infinity, duration: 20 + i * 5, ease: "linear" }}
        >
          <div className="flower">🌸</div>
        </motion.div>
      ))}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i + 3}
          className="absolute opacity-30"
          style={{
            bottom: `${20 + i * 20}%`,
            right: `${10 + i * 15}%`,
            width: '30px',
            height: '30px'
          }}
          animate={{
            rotate: -360,
            scale: [1, 0.9, 1, 1.1, 1]
          }}
          transition={{ repeat: Infinity, duration: 25 + i * 3, ease: "linear" }}
        >
          <div className="flower">🌺</div>
        </motion.div>
      ))}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex justify-center space-x-2 mb-4">
            {heartColors.map((color, index) => (
              <SafeIcon
                key={index}
                icon={FiHeart}
                className={`w-6 h-6 ${color} ${index % 2 === 0 ? 'animate-bounce' : 'animate-pulse'}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              />
            ))}
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-800">
            <span className="text-indigo-600 italic">It Was Love</span>
          </h2>
          <p className="text-sm text-stone-600 mt-2">Written by Vitaly for Our Wedding, August 2008</p>
        </div>

        <div className="bg-[url('https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80')] bg-cover bg-center p-1 md:p-2 rounded-2xl shadow-lg">
          <div className="bg-white/90 p-8 rounded-xl shadow-inner">
            <div className="prose prose-lg mx-auto text-center text-stone-700 italic">
              <p>
                The music of your soul brings us closer,<br/>
                Your countenance shines so bright.<br/>
                The melody repeats so often,<br/>
                A melody of love, of peaceful nights.
              </p>
              <p>
                We met for the first time, somewhat awkward,<br/>
                We didn't know we'd fall in love.<br/>
                And much of it was so uncertain,<br/>
                Until we truly knew t'was love.
              </p>
              <p>
                Your lovely face, your smile, and patience...<br/>
                Your understanding, gentle touch...<br/>
                Your trust, your look, and your impressions<br/>
                Draw us together, it was fun.
              </p>
              <p>
                We've had some falls and winters, coming,<br/>
                A few storms and winds, but you believed.<br/>
                That life is wonderful and charming,<br/>
                And we continued to live.
              </p>
              <p>
                I knew your habits, likes, aversions,<br/>
                I knew you loved to play your "WoW".<br/>
                And we knew each others' secrets,<br/>
                But didn't care much. T'was love.
              </p>
              <p>
                With pure mind, great attitude,<br/>
                With peace in heart, big crush on you.<br/>
                With strength, possession, gratitude,<br/>
                With all I have I come to you.
              </p>
              <p>
                I wish I had more time to spare,<br/>
                So I could to everyone declare:<br/>
                If someone loves you as much as I do,<br/>
                Getting married is the only thing left to do!
              </p>
            </div>
          </div>
        </div>

        {/* Audio Player */}
        <div className="mt-8 max-w-lg mx-auto">
          <div className="bg-white p-4 rounded-xl shadow-md border-2 border-indigo-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={togglePlay}
                  className={`w-10 h-10 rounded-full ${audioError ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} flex items-center justify-center text-white transition-colors`}
                  disabled={!!audioError}
                >
                  <SafeIcon icon={isPlaying ? FiPause : FiPlay} className="w-5 h-5" />
                </button>
                <div>
                  <h3 className="font-medium text-stone-800">It Was Love - Musical Version</h3>
                  <p className="text-xs text-stone-500">Poem transformed into song</p>
                </div>
              </div>
              <button
                onClick={toggleMute}
                className={`p-2 rounded-full ${audioError ? 'text-gray-400 cursor-not-allowed' : 'text-stone-600 hover:bg-stone-100'} transition-colors`}
                disabled={!!audioError}
              >
                <SafeIcon icon={isMuted ? FiVolumeX : FiVolume2} className="w-5 h-5" />
              </button>
            </div>
            
            <div className="w-full bg-stone-200 rounded-full h-1.5 mb-1">
              <div 
                className="bg-indigo-600 h-1.5 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <audio 
              ref={audioRef}
              src={audioSource}
              onTimeUpdate={updateProgress}
              onEnded={() => setIsPlaying(false)}
              onError={handleAudioError}
              onCanPlayThrough={handleAudioLoaded}
              className="hidden"
              preload="auto"
            ></audio>
            
            <div className="flex justify-between text-xs text-stone-500">
              {audioError ? (
                <span className="text-red-500">{audioError}</span>
              ) : (
                <>
                  <span>{audioLoaded ? "Listen to the musical version" : "Loading audio..."}</span>
                  <span>A special arrangement created for our anniversary</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PoemDisplay;