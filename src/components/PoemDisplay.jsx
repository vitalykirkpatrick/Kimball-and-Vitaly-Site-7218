import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import CustomAudioPlayer from './CustomAudioPlayer';
import * as FiIcons from 'react-icons/fi';

const { FiHeart } = FiIcons;

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

  // S3 audio URL for the poem - UPDATED with CDN URL
  const poemAudioUrl = "https://cdn.kimballandvitaly.com/Kimball+and+Vitaly+Website+Content/It+was+Love+Audio+Music.mp3";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden"
    >
      {/* Enhanced Decorative Elements */}
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

      {/* Floating flowers - ADDED MORE */}
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className="absolute opacity-30"
          style={{ top: `${10 + i * 15}%`, left: `${5 + i * 18}%`, width: '30px', height: '30px' }}
          animate={{ rotate: 360, scale: [1, 1.1, 1, 0.9, 1] }}
          transition={{ repeat: Infinity, duration: 20 + i * 5, ease: "linear" }}
        >
          <div className="text-4xl">{i % 2 === 0 ? '🌸' : '🌺'}</div>
        </motion.div>
      ))}

      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i + 5}
          className="absolute opacity-30"
          style={{ bottom: `${10 + i * 15}%`, right: `${5 + i * 16}%`, width: '30px', height: '30px' }}
          animate={{ rotate: -360, scale: [1, 0.9, 1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 25 + i * 3, ease: "linear" }}
        >
          <div className="text-4xl">{i % 2 === 0 ? '🌺' : '🌸'}</div>
        </motion.div>
      ))}

      {/* Wedding rings - ADDED NEW */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-16 h-16 opacity-20"
        animate={{ y: [0, -15, 0, -5, 0], rotate: [0, 5, 0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      >
        <div className="text-5xl">💍</div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-1/5 w-16 h-16 opacity-20"
        animate={{ y: [0, -10, 0, -15, 0], rotate: [0, -5, 0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
      >
        <div className="text-5xl">💍</div>
      </motion.div>

      {/* Wedding bells - ADDED NEW */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-16 h-16 opacity-20"
        animate={{ y: [0, -8, 0, -12, 0], rotate: [0, 10, 0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
      >
        <div className="text-5xl">🔔</div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-1/3 w-16 h-16 opacity-20"
        animate={{ y: [0, -12, 0, -8, 0], rotate: [0, -10, 0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
      >
        <div className="text-5xl">🔔</div>
      </motion.div>

      {/* Rainbow balloon */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-24 h-24 opacity-30"
        animate={{ y: [0, -15, 0, -5, 0], rotate: [0, 5, 0, -5, 0] }}
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

        {/* Poem text with background image - UPDATED: Made consistent width with audio player */}
        <div className="bg-white/90 p-8 rounded-2xl shadow-lg relative overflow-hidden max-w-2xl mx-auto">
          {/* Background image contained within the poem box */}
          <div className="absolute inset-0">
            <picture>
              <source srcSet="https://cdn.kimballandvitaly.com/Kimball+and+Vitaly+Website+Content/Kimball+and+Vitaly+Engagement+2008_21.webp" type="image/webp" />
              <source srcSet="https://cdn.kimballandvitaly.com/Kimball+and+Vitaly+Website+Content/Kimball+and+Vitaly+Engagement+2008_21.jpeg" type="image/jpeg" />
              <img 
                src="https://cdn.kimballandvitaly.com/Kimball+and+Vitaly+Website+Content/Kimball+and+Vitaly+Engagement+2008_21.jpeg" 
                alt="Kimball and Vitaly Engagement"
                className="w-full h-full object-cover opacity-20" 
              />
            </picture>
          </div>

          <div className="prose prose-lg mx-auto text-center text-stone-700 italic relative z-10">
            <p>
              The music of your soul brings us closer,<br />
              Your countenance shines so bright.<br />
              The melody repeats so often,<br />
              A melody of love, of peaceful nights.
            </p>
            <p>
              We met for the first time, somewhat awkward,<br />
              We didn't know we'd fall in love.<br />
              And much of it was so uncertain,<br />
              Until we truly knew t'was love.
            </p>
            <p>
              Your lovely face, your smile, and patience...<br />
              Your understanding, gentle touch...<br />
              Your trust, your look, and your impressions<br />
              Draw us together, it was fun.
            </p>
            <p>
              We've had some falls and winters, coming,<br />
              A few storms and winds, but you believed.<br />
              That life is wonderful and charming,<br />
              And we continued to live.
            </p>
            <p>
              I knew your habits, likes, aversions,<br />
              I knew you loved to play your "WoW".<br />
              And we knew each others' secrets,<br />
              But didn't care much. T'was love.
            </p>
            <p>
              With pure mind, great attitude,<br />
              With peace in heart, big crush on you.<br />
              With strength, possession, gratitude,<br />
              With all I have I come to you.
            </p>
            <p>
              I wish I had more time to spare,<br />
              So I could to everyone declare:<br />
              If someone loves you as much as I do,<br />
              Getting married is the only thing left to do!
            </p>
          </div>
        </div>

        {/* Updated audio player with CDN URL */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-indigo-200">
            <h3 className="font-semibold text-stone-800 mb-4">It Was Love - Musical Version</h3>
            {/* Custom Audio Player component with CDN URL */}
            <CustomAudioPlayer audioSrc={poemAudioUrl} title="It Was Love" subtitle="Poem by Vitaly, 2008" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PoemDisplay;