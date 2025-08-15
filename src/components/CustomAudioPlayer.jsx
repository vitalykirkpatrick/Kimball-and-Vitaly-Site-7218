import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlay, FiPause, FiVolume2, FiVolumeX, FiDownload, FiClock } = FiIcons;

const CustomAudioPlayer = ({ audioSrc, title, subtitle }) => {
  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // References
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const volumeBarRef = useRef(null);
  const animationFrameId = useRef(null);

  // Format time (convert seconds to MM:SS format)
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Toggle play/pause
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
        setError(null);
      }
    } catch (err) {
      console.error('Audio playback error:', err);
      setError('Unable to play audio. Please try downloading the file instead.');
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      setIsMuted(!isMuted);
      audioRef.current.muted = !isMuted;
    }
  };

  // Update volume
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  // Handle progress bar click/drag
  const handleProgressChange = (e) => {
    if (!audioRef.current || duration === 0) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    const newTime = position * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(position * 100);
  };

  // Handle volume bar click/drag
  const handleVolumeBarClick = (e) => {
    if (!volumeBarRef.current) return;
    
    const rect = volumeBarRef.current.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    const newVolume = Math.max(0, Math.min(1, position));
    
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  // Download audio - FIXED TO DIRECTLY DOWNLOAD THE FILE
  const downloadAudio = () => {
    // Create an XMLHttpRequest to get the file
    const xhr = new XMLHttpRequest();
    xhr.open('GET', audioSrc, true);
    xhr.responseType = 'blob';
    
    xhr.onload = function() {
      if (this.status === 200) {
        // Create a blob from the response
        const blob = new Blob([this.response], { type: 'audio/mpeg' });
        
        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);
        
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = url;
        link.download = `${title || 'audio'}.mp3`;
        document.body.appendChild(link);
        
        // Trigger the download
        link.click();
        
        // Clean up
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Error downloading audio file');
        // Fallback to opening in new tab if direct download fails
        window.open(audioSrc, '_blank');
      }
    };
    
    xhr.onerror = function() {
      console.error('Error downloading audio file');
      // Fallback to opening in new tab
      window.open(audioSrc, '_blank');
    };
    
    xhr.send();
  };

  // Update audio progress using requestAnimationFrame for better performance
  const updateProgress = useCallback(() => {
    if (!audioRef.current) return;
    
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration;
    
    if (!isNaN(current) && !isNaN(total)) {
      setCurrentTime(current);
      setDuration(total);
      setProgress((current / total) * 100);
    }
    
    animationFrameId.current = requestAnimationFrame(updateProgress);
  }, []);

  // Start/stop the animation frame based on playing state
  useEffect(() => {
    if (isPlaying) {
      animationFrameId.current = requestAnimationFrame(updateProgress);
    } else if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isPlaying, updateProgress]);

  // Event handlers for audio element
  useEffect(() => {
    const audio = audioRef.current;
    
    if (audio) {
      // Set src dynamically to ensure it loads correctly
      audio.src = audioSrc;
      
      // Event listeners
      const handleLoadedData = () => {
        console.log("Audio loaded successfully");
        setIsLoading(false);
        setDuration(audio.duration);
        setError(null);
      };
      
      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        setProgress(0);
      };
      
      const handleError = (e) => {
        console.error('Audio error:', e);
        setError('Failed to load audio file. Please try again later or use the download button.');
        setIsLoading(false);
        setIsPlaying(false);
      };
      
      const handleWaiting = () => {
        setIsLoading(true);
      };
      
      const handlePlaying = () => {
        setIsLoading(false);
      };
      
      audio.addEventListener('loadeddata', handleLoadedData);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);
      audio.addEventListener('waiting', handleWaiting);
      audio.addEventListener('playing', handlePlaying);
      
      // Set initial volume
      audio.volume = volume;
      
      // Preload audio
      audio.preload = "metadata";
      
      // Clean up
      return () => {
        audio.removeEventListener('loadeddata', handleLoadedData);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
        audio.removeEventListener('waiting', handleWaiting);
        audio.removeEventListener('playing', handlePlaying);
      };
    }
  }, [audioSrc]);

  return (
    <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white p-4 w-full">
      <div className="max-w-6xl mx-auto">
        {/* Audio element */}
        <audio ref={audioRef} preload="metadata" className="hidden" />
        
        {/* Player UI */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Play/Pause button */}
          <div className="flex-shrink-0">
            <button 
              onClick={togglePlay} 
              disabled={isLoading || error}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isLoading ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              ) : isPlaying ? (
                <SafeIcon icon={FiPause} className="w-5 h-5" />
              ) : (
                <SafeIcon icon={FiPlay} className="w-5 h-5 ml-0.5" />
              )}
            </button>
          </div>
          
          {/* Title and progress */}
          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mb-1">
              <div className="text-sm font-medium truncate max-w-full">
                {title || "Our Storybook"}
                {subtitle && <span className="text-xs text-indigo-200 ml-2">{subtitle}</span>}
              </div>
              <div className="text-xs text-indigo-200 flex items-center">
                <SafeIcon icon={FiClock} className="w-3 h-3 mr-1" />
                <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
              </div>
            </div>
            
            {/* Progress bar */}
            <div 
              ref={progressBarRef}
              className="h-2 bg-white/20 rounded-full overflow-hidden cursor-pointer" 
              onClick={handleProgressChange}
            >
              <motion.div 
                className="h-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
                style={{ width: `${progress}%` }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
          
          {/* Volume and download controls */}
          <div className="flex items-center space-x-3">
            {/* Volume control */}
            <div className="flex items-center">
              <button 
                onClick={toggleMute}
                className="p-1 hover:text-indigo-300 transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                <SafeIcon icon={isMuted || volume === 0 ? FiVolumeX : FiVolume2} className="w-5 h-5" />
              </button>
              
              <div 
                ref={volumeBarRef}
                className="hidden sm:block w-16 h-1.5 bg-white/20 rounded-full overflow-hidden ml-1 cursor-pointer"
                onClick={handleVolumeBarClick}
              >
                <div 
                  className="h-full bg-white/70" 
                  style={{ width: `${volume * 100}%` }}
                />
              </div>
              
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={volume}
                onChange={handleVolumeChange}
                className="sm:hidden w-16 h-1.5 appearance-none bg-white/20 rounded-full overflow-hidden ml-1"
                style={{ background: `linear-gradient(to right, white 0%, white ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)` }}
              />
            </div>
            
            {/* Download button */}
            <button 
              onClick={downloadAudio}
              className="p-1 hover:text-indigo-300 transition-colors"
              aria-label="Download audio"
            >
              <SafeIcon icon={FiDownload} className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="text-xs text-pink-300 mt-1">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomAudioPlayer;