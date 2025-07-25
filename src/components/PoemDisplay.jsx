import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiPlay, FiPause, FiVolume2, FiVolumeX, FiDownload } = FiIcons;

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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);

  // Format time helper
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle audio play/pause
  const togglePlay = async () => {
    if (!audioRef.current) return;
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        await audioRef.current.play();
        setIsPlaying(true);
        setAudioError(null);
      }
    } catch (error) {
      console.error("Audio playback failed:", error);
      setAudioError("Unable to play audio. Please try downloading the file instead.");
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle audio mute/unmute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Update progress bar and time
  const updateProgress = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      if (!isNaN(current) && !isNaN(total)) {
        setCurrentTime(current);
        setDuration(total);
        setProgress((current / total) * 100);
      }
    }
  };

  // Handle progress bar click
  const handleProgressClick = (e) => {
    if (audioRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      audioRef.current.currentTime = newTime;
    }
  };

  // Handle audio loaded
  const handleAudioLoaded = () => {
    setAudioLoaded(true);
    setAudioError(null);
    setIsLoading(false);
    console.log("Audio loaded successfully");
  };

  // Handle audio error
  const handleAudioError = (e) => {
    console.error("Audio loading error:", e);
    setAudioError("Unable to load audio. You can try downloading the file instead.");
    setIsLoading(false);
    setIsPlaying(false);
  };

  // Handle audio ended
  const handleAudioEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  // Download audio file
  const downloadAudio = () => {
    const link = document.createElement('a');
    link.href = "https://drive.google.com/uc?export=download&id=1smoGz76hLAm0MbaYJcc54mkhfxRT7P1P";
    link.download = 'it-was-love-vitaly-poem.mp3';
    link.click();
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('loadeddata', handleAudioLoaded);
      audio.addEventListener('error', handleAudioError);
      audio.addEventListener('ended', handleAudioEnded);
      audio.addEventListener('timeupdate', updateProgress);
      return () => {
        audio.removeEventListener('loadeddata', handleAudioLoaded);
        audio.removeEventListener('error', handleAudioError);
        audio.removeEventListener('ended', handleAudioEnded);
        audio.removeEventListener('timeupdate', updateProgress);
      };
    }
  }, []);

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
        <div className="w-full h-full">
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
          style={{ top: `${20 + i * 25}%`, left: `${15 + i * 20}%`, width: '30px', height: '30px' }}
          animate={{ rotate: 360, scale: [1, 1.1, 1, 0.9, 1] }}
          transition={{ repeat: Infinity, duration: 20 + i * 5, ease: "linear" }}
        >
          <div className="text-4xl">🌸</div>
        </motion.div>
      ))}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i + 3}
          className="absolute opacity-30"
          style={{ bottom: `${20 + i * 20}%`, right: `${10 + i * 15}%`, width: '30px', height: '30px' }}
          animate={{ rotate: -360, scale: [1, 0.9, 1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 25 + i * 3, ease: "linear" }}
        >
          <div className="text-4xl">🌺</div>
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

        {/* Google Drive Embedded Player */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-indigo-200">
            <h3 className="font-semibold text-stone-800 mb-4">It Was Love - Musical Version</h3>
            
            {/* Google Drive Player */}
            <iframe
              frameBorder="0"
              width="100%"
              height="60"
              src="https://drive.google.com/file/d/1smoGz76hLAm0MbaYJcc54mkhfxRT7P1P/preview"
              className="rounded-lg shadow-sm mb-4"
            ></iframe>
            
            {/* Download Button */}
            <div className="flex justify-end">
              <button
                onClick={downloadAudio}
                className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-800 px-2 py-1 rounded hover:bg-indigo-50 transition-colors"
                title="Download audio file"
              >
                <SafeIcon icon={FiDownload} className="w-5 h-5" />
                <span>Download Audio</span>
              </button>
            </div>

            {/* Hidden Audio Element (for download functionality) */}
            <audio
              ref={audioRef}
              className="hidden"
              preload="metadata"
            >
              <source src="https://drive.google.com/uc?export=download&id=1smoGz76hLAm0MbaYJcc54mkhfxRT7P1P" type="audio/mpeg" />
              <source src="https://docs.google.com/uc?export=download&id=1smoGz76hLAm0MbaYJcc54mkhfxRT7P1P" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PoemDisplay;