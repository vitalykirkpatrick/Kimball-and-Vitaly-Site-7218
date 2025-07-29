import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import SafeIcon from '../common/SafeIcon';
import Footer from '../components/Footer';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiArrowRight, FiHome, FiBook, FiHeart, FiMaximize2, FiMinimize2 } = FiIcons;

const Book = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const bookRef = useRef(null);
  const containerRef = useRef(null);

  // Book content pages with cartoon illustrations and colorful backgrounds
  const pages = [
    // Cover Page - FIXED with smaller, centered title box and more decorative layout
    {
      content: (
        <div className="h-full w-full bg-gradient-to-br from-indigo-200 to-purple-200 p-4 md:p-8 flex relative overflow-hidden">
          {/* Enhanced decorative elements */}
          <div className="absolute top-4 left-4 w-12 h-12 text-3xl opacity-60 animate-bounce">🌈</div>
          <div className="absolute bottom-4 right-4 w-12 h-12 text-3xl opacity-60 animate-pulse">🌟</div>
          <div className="absolute top-1/4 right-10 w-12 h-12 text-3xl animate-bounce opacity-40">🎈</div>
          <div className="absolute bottom-1/4 left-10 w-12 h-12 text-3xl animate-spin-slow opacity-40">🎀</div>
          <div className="absolute top-1/2 left-4 w-8 h-8 text-2xl opacity-30 animate-pulse">✨</div>
          <div className="absolute top-1/3 right-4 w-8 h-8 text-2xl opacity-30 animate-bounce">💫</div>
          <div className="absolute bottom-1/3 right-1/4 w-10 h-10 text-2xl opacity-40 animate-spin-slow">🦋</div>
          <div className="absolute top-3/4 left-1/4 w-10 h-10 text-2xl opacity-40 animate-pulse">🌺</div>

          {/* Two-column layout */}
          <div className="flex w-full h-full items-center justify-center">
            {/* Left side - SMALLER title box centered in the middle of the page */}
            <div className="w-1/2 flex items-center justify-center px-4 md:px-6">
              <div className="w-4/5 max-w-sm bg-blue-100/90 backdrop-blur-sm rounded-xl border-4 border-yellow-300 p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                {/* Decorative border inside */}
                <div className="border-2 border-dashed border-indigo-300 rounded-lg p-6 text-center">
                  {/* Main Title */}
                  <h1 
                    className="font-bold text-indigo-700 leading-tight text-center mb-4" 
                    style={{
                      fontFamily: "'Fredoka One','Baloo 2','Bree Serif',cursive",
                      fontSize: "clamp(1.2rem, 4vw, 1.8rem)"
                    }}
                  >
                    THE ADVENTURES OF<br />
                    VITALY & KIMBALL
                  </h1>

                  {/* Subtitle */}
                  <h2 
                    className="italic text-amber-800 leading-relaxed mb-4 text-center" 
                    style={{
                      fontFamily: "'Chewy','Comic Sans MS',cursive",
                      fontSize: "clamp(0.9rem, 2.5vw, 1.3rem)"
                    }}
                  >
                    Two Boys, One Big Closet<br />
                    (And a Whole Lot of Pizza)
                  </h2>

                  {/* Heart icon */}
                  <div className="mb-4">
                    <SafeIcon icon={FiHeart} className="w-8 h-8 text-rose-500 mx-auto animate-pulse" />
                  </div>

                  {/* Tagline */}
                  <h3 
                    className="text-stone-700 leading-relaxed mb-4 text-center" 
                    style={{
                      fontFamily: "'Century Schoolbook','Quicksand',sans-serif",
                      fontSize: "clamp(0.8rem, 2vw, 1rem)"
                    }}
                  >
                    A True Love Story for Anyone Who Knows Home is a Person, Not a Place
                  </h3>

                  {/* Dedication */}
                  <p 
                    className="italic text-gray-600 text-center border-t-2 border-indigo-200 pt-4" 
                    style={{
                      fontFamily: "'Georgia',serif",
                      fontSize: "clamp(0.8rem, 1.8vw, 1rem)",
                      fontStyle: "italic"
                    }}
                  >
                    For Kimball, on our wedding anniversary
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Photo in decorative frame */}
            <div className="w-1/2 flex items-center justify-center p-2">
              <div className="h-full w-full max-w-lg bg-white/90 rounded-2xl border-4 border-blue-300 p-4 shadow-2xl transform hover:scale-105 transition-transform duration-300 overflow-hidden">
                {/* Decorative frame inside */}
                <div className="h-full w-full border-4 border-dashed border-purple-300 rounded-xl p-2 overflow-hidden">
                  {/* New cover image with smart crop to focus on heads and tryzub */}
                  <div className="relative w-full h-full overflow-hidden rounded-lg">
                    <img 
                      src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753679015604-IMG_1882.JPG" 
                      alt="Vitaly and Kimball" 
                      className="object-cover w-full h-full"
                      style={{
                        objectPosition: "center 30%", // Smart crop to focus on heads and tryzub
                      }}
                    />
                    {/* Photo overlay with sparkles */}
                    <div className="absolute top-2 right-2 w-6 h-6 text-xl animate-pulse opacity-80">✨</div>
                    <div className="absolute bottom-2 left-2 w-6 h-6 text-xl animate-bounce opacity-80">💖</div>
                    <div className="absolute top-1/2 left-2 w-5 h-5 text-lg animate-pulse opacity-60">⭐</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    // Dedication Page - Updated with consistent rounded corners styling to match cover
    {
      content: (
        <div className="h-full w-full bg-gradient-to-br from-rose-200 to-pink-200 p-8 flex flex-col items-center justify-center relative">
          {/* Decorative elements */}
          <div className="absolute top-6 left-6 w-20 h-20 text-5xl">🌸</div>
          <div className="absolute bottom-6 right-6 w-20 h-20 text-5xl">🌺</div>
          <div className="absolute top-1/3 right-12 w-16 h-16 text-4xl animate-bounce">💕</div>
          <div className="absolute bottom-1/3 left-12 w-16 h-16 text-4xl animate-spin-slow">🎀</div>

          {/* Container to ensure equal sizing between text and image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
            {/* Left side - Dedication text in matching rounded corners style */}
            <div className="bg-blue-100/90 backdrop-blur-sm rounded-xl p-6 shadow-2xl border-4 border-blue-300 flex flex-col justify-center items-center transform hover:scale-105 transition-transform duration-300">
              {/* Inner decorative border to match cover */}
              <div className="border-2 border-dashed border-purple-300 rounded-lg p-6 w-full">
                {/* FIXED: Dedication title with correct font and styling */}
                <h2 
                  className="font-bold text-center mb-6 text-blue-700" 
                  style={{
                    fontFamily: "'Chewy','Comic Sans MS',cursive",
                    fontSize: "clamp(1.15rem, 4vw, 1.8rem)"
                  }}
                >
                  DEDICATION
                </h2>
                <div className="prose prose-lg max-w-md mx-auto">
                  {/* FIXED: Dedication text with correct font and no bullets */}
                  <div 
                    className="text-center space-y-4 text-gray-700" 
                    style={{
                      fontFamily: "'Comic Neue','Comic Sans MS',Arial,sans-serif",
                      fontSize: "clamp(1.08rem, 3vw, 1.4rem)",
                      lineHeight: "1.6"
                    }}
                  >
                    <p>For Kimball, on our anniversary—</p>
                    <p>the only man who can outlast me in World of Warcraft,</p>
                    <p>out-snore me through a fireworks show in July,</p>
                    <p>and out-eat me… a whole gallon of ice cream in one sitting.</p>
                    <p>A love so competitive, it's only fair we keep score—even when I lose.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Using the old cover illustration with matching styling */}
            <div className="w-full bg-white/90 rounded-xl shadow-2xl border-4 border-blue-300 overflow-hidden flex items-center justify-center p-4 transform hover:scale-105 transition-transform duration-300">
              {/* Inner decorative border */}
              <div className="w-full h-full border-2 border-dashed border-indigo-300 rounded-lg p-2">
                {/* Previous cover illustration now moved to dedication page */}
                <div className="w-full h-full">
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    {/* Background with soft geometric shapes */}
                    <defs>
                      <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFF8DC" />
                        <stop offset="100%" stopColor="#F0E68C" />
                      </linearGradient>
                      <filter id="soft-shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#00000020"/>
                      </filter>
                    </defs>
                    
                    {/* Background - fill entire right side */}
                    <rect x="0" y="0" width="400" height="400" fill="url(#bg-gradient)" />
                    
                    {/* Soft geometric shapes in background */}
                    <circle cx="80" cy="80" r="30" fill="#E6E6FA" opacity="0.3" />
                    <circle cx="320" cy="100" r="25" fill="#FFE4E1" opacity="0.3" />
                    <rect x="300" y="300" width="40" height="40" fill="#F0FFFF" opacity="0.3" rx="8" />
                    <rect x="50" y="320" width="35" height="35" fill="#FFEFD5" opacity="0.3" rx="6" />
                    <path d="M240,60 Q280,80 260,120 Q240,140 200,120 Z" fill="#FFE4E1" opacity="0.2" />
                    <path d="M100,200 Q140,220 120,260 Q100,280 60,260 Z" fill="#E6E6FA" opacity="0.2" />
                    
                    {/* Bench */}
                    <rect x="120" y="280" width="160" height="20" fill="#8B4513" filter="url(#soft-shadow)" rx="4" />
                    <rect x="130" y="300" width="15" height="60" fill="#654321" rx="3" />
                    <rect x="255" y="300" width="15" height="60" fill="#654321" rx="3" />
                    
                    {/* Large pink heart above characters */}
                    <g transform="translate(200,120) scale(1.2)">
                      <path d="M0,20 C-15,-10 -40,5 -15,35 C10,65 0,-10 0,20 Z" fill="#FFB6C1" opacity="0.8" filter="url(#soft-shadow)" />
                      <path d="M0,20 C15,-10 40,5 15,35 C-10,65 0,-10 0,20 Z" fill="#FFB6C1" opacity="0.8" filter="url(#soft-shadow)" />
                    </g>
                    
                    {/* Vitaly - Left character in yellow with trident */}
                    <g transform="translate(160,220)">
                      {/* Head - medium-dark skin, rounded */}
                      <circle cx="0" cy="0" r="30" fill="#D2B48C" stroke="#8B7355" strokeWidth="2" filter="url(#soft-shadow)" />
                      
                      {/* Eyes */}
                      <ellipse cx="-12" cy="-8" rx="4" ry="6" fill="#2F4F4F" />
                      <ellipse cx="12" cy="-8" rx="4" ry="6" fill="#2F4F4F" />
                      <circle cx="-12" cy="-8" r="2" fill="#FFFFFF" />
                      <circle cx="12" cy="-8" r="2" fill="#FFFFFF" />
                      
                      {/* Smile - rounded */}
                      <path d="M-12,8 Q0,18 12,8" fill="none" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" />
                      
                      {/* Body - yellow outfit */}
                      <rect x="-25" y="30" width="50" height="50" rx="8" fill="#FFD700" stroke="#DAA520" strokeWidth="2" filter="url(#soft-shadow)" />
                      
                      {/* Ukrainian Trident (Tryzub) logo centered on chest */}
                      <g transform="translate(0,55) scale(0.8)" fill="#0057B7">
                        <path d="M0,-15 L-8,-5 L-8,5 L-4,5 L-4,15 L4,15 L4,5 L8,5 L8,-5 Z" />
                        <path d="M-12,-10 L-12,0 L-8,0 L-8,-10 Z" />
                        <path d="M12,-10 L12,0 L8,0 L8,-10 Z" />
                      </g>
                      
                      {/* Arms */}
                      <rect x="-45" y="40" width="20" height="12" fill="#D2B48C" stroke="#8B7355" strokeWidth="1" rx="6" />
                      <rect x="25" y="40" width="20" height="12" fill="#D2B48C" stroke="#8B7355" strokeWidth="1" rx="6" />
                      
                      {/* Legs */}
                      <rect x="-20" y="80" width="15" height="35" fill="#B8860B" stroke="#DAA520" strokeWidth="1" rx="4" />
                      <rect x="5" y="80" width="15" height="35" fill="#B8860B" stroke="#DAA520" strokeWidth="1" rx="4" />
                    </g>
                    
                    {/* Kimball - Right character in blue (same as tryzub), lighter skin */}
                    <g transform="translate(240,220)">
                      {/* Head - lighter skin, rounded */}
                      <circle cx="0" cy="0" r="30" fill="#FDBCB4" stroke="#CD853F" strokeWidth="2" filter="url(#soft-shadow)" />
                      
                      {/* Eyes */}
                      <ellipse cx="-12" cy="-8" rx="4" ry="6" fill="#2F4F4F" />
                      <ellipse cx="12" cy="-8" rx="4" ry="6" fill="#2F4F4F" />
                      <circle cx="-12" cy="-8" r="2" fill="#FFFFFF" />
                      <circle cx="12" cy="-8" r="2" fill="#FFFFFF" />
                      
                      {/* Smile */}
                      <path d="M-12,8 Q0,18 12,8" fill="none" stroke="#CD853F" strokeWidth="2" strokeLinecap="round" />
                      
                      {/* Body - blue outfit (same color as tryzub) */}
                      <rect x="-25" y="30" width="50" height="50" rx="8" fill="#0057B7" stroke="#003785" strokeWidth="2" filter="url(#soft-shadow)" />
                      
                      {/* Arms */}
                      <rect x="-45" y="40" width="20" height="12" fill="#FDBCB4" stroke="#CD853F" strokeWidth="1" rx="6" />
                      <rect x="25" y="40" width="20" height="12" fill="#FDBCB4" stroke="#CD853F" strokeWidth="1" rx="6" />
                      
                      {/* Legs */}
                      <rect x="-20" y="80" width="15" height="35" fill="#004494" stroke="#003785" strokeWidth="1" rx="4" />
                      <rect x="5" y="80" width="15" height="35" fill="#004494" stroke="#003785" strokeWidth="1" rx="4" />
                    </g>
                    
                    {/* Small decorative hearts around the couple */}
                    <g fill="#FFB6C1" opacity="0.6">
                      <g transform="translate(120,180) scale(0.3)">
                        <path d="M0,20 C-15,-10 -40,5 -15,35 C10,65 0,-10 0,20 Z" />
                        <path d="M0,20 C15,-10 40,5 15,35 C-10,65 0,-10 0,20 Z" />
                      </g>
                      <g transform="translate(280,180) scale(0.3)">
                        <path d="M0,20 C-15,-10 -40,5 -15,35 C10,65 0,-10 0,20 Z" />
                        <path d="M0,20 C15,-10 40,5 15,35 C-10,65 0,-10 0,20 Z" />
                      </g>
                      <g transform="translate(200,320) scale(0.25)">
                        <path d="M0,20 C-15,-10 -40,5 -15,35 C10,65 0,-10 0,20 Z" />
                        <path d="M0,20 C15,-10 40,5 15,35 C-10,65 0,-10 0,20 Z" />
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    // Chapter One Spread 1 - The Boy With Three Dollars - REDESIGNED
    {
      content: (
        <div className="h-full w-full bg-gradient-to-br from-sky-200 to-blue-200 p-8 flex flex-col items-center justify-center relative">
          {/* Decorative elements matching dedication page */}
          <div className="absolute top-8 right-8 w-16 h-16 text-4xl">✈️</div>
          <div className="absolute bottom-8 left-8 w-16 h-16 text-4xl">🌍</div>
          <div className="absolute top-1/4 left-12 w-12 h-12 text-3xl animate-bounce">💼</div>
          <div className="absolute bottom-1/4 right-12 w-12 h-12 text-3xl animate-spin-slow">🎭</div>

          {/* Container matching dedication page layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
            {/* Left side - Text in matching rounded corners style */}
            <div className="bg-blue-100/90 backdrop-blur-sm rounded-xl p-6 shadow-2xl border-4 border-blue-300 flex flex-col justify-center transform hover:scale-105 transition-transform duration-300">
              {/* Inner decorative border */}
              <div className="border-2 border-dashed border-indigo-300 rounded-lg p-6 w-full">
                {/* Chapter title with correct font and styling */}
                <h2 
                  className="font-bold text-center mb-6 text-blue-700" 
                  style={{
                    fontFamily: "'Chewy','Comic Sans MS',cursive",
                    fontSize: "clamp(1.15rem, 4vw, 1.8rem)"
                  }}
                >
                  CHAPTER 1:<br />THE BOY WITH THREE DOLLARS
                </h2>
                
                {/* Story text with proper styling */}
                <div 
                  className="text-gray-700 text-left space-y-4" 
                  style={{
                    fontFamily: "'Comic Neue','Comic Sans MS',Arial,sans-serif",
                    fontSize: "clamp(1.08rem, 3vw, 1.4rem)",
                    lineHeight: "1.6"
                  }}
                >
                  <p>Once upon a time in Ukraine, a boy named Vitaly dared to dream.</p>
                  <p>He packed two suitcases, three American dollars, and a head full of questions.</p>
                  
                  <div className="space-y-2">
                    <p className="italic">"Will Americans give me food?"</p>
                    <p className="italic">"Will my Bandura survive the flight?"</p>
                    <p className="italic">"Why are all the houses square like math problems?"</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Illustration in matching style */}
            <div className="w-full bg-white/90 rounded-xl shadow-2xl border-4 border-blue-300 overflow-hidden flex items-center justify-center p-4 transform hover:scale-105 transition-transform duration-300">
              {/* Inner decorative border */}
              <div className="w-full h-full border-2 border-dashed border-indigo-300 rounded-lg p-2">
                {/* Illustration of young Vitaly with suitcases and thought bubbles */}
                <div className="w-full h-full">
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    <defs>
                      <linearGradient id="pastel-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#E8F4FD" />
                        <stop offset="100%" stopColor="#B8E6FF" />
                      </linearGradient>
                      <filter id="drop-shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="#00000030"/>
                      </filter>
                    </defs>
                    
                    {/* Flat pastel background */}
                    <rect x="0" y="0" width="400" height="400" fill="url(#pastel-bg)" />
                    
                    {/* Ground line */}
                    <rect x="0" y="320" width="400" height="80" fill="#C8E6C9" opacity="0.6" />
                    
                    {/* Young Vitaly character */}
                    <g transform="translate(200,250)">
                      {/* Head - medium-dark skin, rounded, cheerful */}
                      <circle cx="0" cy="0" r="28" fill="#D2B48C" stroke="#8B7355" strokeWidth="2" filter="url(#drop-shadow)" />
                      
                      {/* Cheerful eyes */}
                      <ellipse cx="-10" cy="-8" rx="3" ry="5" fill="#2F4F4F" />
                      <ellipse cx="10" cy="-8" rx="3" ry="5" fill="#2F4F4F" />
                      <circle cx="-10" cy="-8" r="1.5" fill="#FFFFFF" />
                      <circle cx="10" cy="-8" r="1.5" fill="#FFFFFF" />
                      
                      {/* Big cheerful smile */}
                      <path d="M-15,8 Q0,20 15,8" fill="none" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" />
                      
                      {/* Body - yellow shirt with blue trident */}
                      <rect x="-22" y="28" width="44" height="45" rx="6" fill="#FFD700" stroke="#DAA520" strokeWidth="2" filter="url(#drop-shadow)" />
                      
                      {/* Centered blue trident on chest */}
                      <g transform="translate(0,50) scale(0.7)" fill="#0057B7">
                        <path d="M0,-12 L-6,-4 L-6,4 L-3,4 L-3,12 L3,12 L3,4 L6,4 L6,-4 Z" />
                        <path d="M-9,-8 L-9,0 L-6,0 L-6,-8 Z" />
                        <path d="M9,-8 L9,0 L6,0 L6,-8 Z" />
                      </g>
                      
                      {/* Arms */}
                      <rect x="-35" y="35" width="13" height="8" fill="#D2B48C" stroke="#8B7355" strokeWidth="1" rx="4" />
                      <rect x="22" y="35" width="13" height="8" fill="#D2B48C" stroke="#8B7355" strokeWidth="1" rx="4" />
                      
                      {/* Legs */}
                      <rect x="-15" y="73" width="12" height="30" fill="#4169E1" stroke="#1E3A8A" strokeWidth="1" rx="3" />
                      <rect x="3" y="73" width="12" height="30" fill="#4169E1" stroke="#1E3A8A" strokeWidth="1" rx="3" />
                    </g>
                    
                    {/* Left suitcase */}
                    <rect x="120" y="290" width="35" height="25" fill="#8B4513" stroke="#654321" strokeWidth="2" rx="3" filter="url(#drop-shadow)" />
                    <rect x="125" y="295" width="25" height="15" fill="#A0522D" stroke="#654321" strokeWidth="1" rx="2" />
                    <circle cx="137" cy="302" r="2" fill="#FFD700" />
                    
                    {/* Right suitcase */}
                    <rect x="245" y="290" width="35" height="25" fill="#8B4513" stroke="#654321" strokeWidth="2" rx="3" filter="url(#drop-shadow)" />
                    <rect x="250" y="295" width="25" height="15" fill="#A0522D" stroke="#654321" strokeWidth="1" rx="2" />
                    <circle cx="262" cy="302" r="2" fill="#FFD700" />
                    
                    {/* Bandura (Ukrainian string instrument) */}
                    <g transform="translate(180,280)">
                      <ellipse cx="0" cy="0" rx="18" ry="25" fill="#DEB887" stroke="#8B7355" strokeWidth="2" filter="url(#drop-shadow)" />
                      <rect x="-2" y="-25" width="4" height="20" fill="#654321" />
                      <line x1="-12" y1="-15" x2="12" y2="-15" stroke="#8B7355" strokeWidth="1" />
                      <line x1="-12" y1="-8" x2="12" y2="-8" stroke="#8B7355" strokeWidth="1" />
                      <line x1="-12" y1="-1" x2="12" y2="-1" stroke="#8B7355" strokeWidth="1" />
                      <line x1="-12" y1="6" x2="12" y2="6" stroke="#8B7355" strokeWidth="1" />
                    </g>
                    
                    {/* Thought bubbles */}
                    {/* Bubble 1 - American food */}
                    <g transform="translate(120,120)">
                      <circle cx="0" cy="0" r="35" fill="#FFFFFF" stroke="#000000" strokeWidth="2" opacity="0.9" />
                      <circle cx="-15" cy="25" r="8" fill="#FFFFFF" stroke="#000000" strokeWidth="1" opacity="0.7" />
                      <circle cx="-8" cy="35" r="4" fill="#FFFFFF" stroke="#000000" strokeWidth="1" opacity="0.5" />
                      
                      {/* Hamburger */}
                      <ellipse cx="0" cy="-5" rx="12" ry="4" fill="#D2691E" />
                      <ellipse cx="0" cy="0" rx="15" ry="6" fill="#32CD32" />
                      <ellipse cx="0" cy="5" rx="12" ry="4" fill="#D2691E" />
                      
                      {/* French fries */}
                      <rect x="8" y="-8" width="2" height="12" fill="#FFD700" />
                      <rect x="11" y="-6" width="2" height="10" fill="#FFD700" />
                      <rect x="14" y="-9" width="2" height="13" fill="#FFD700" />
                    </g>
                    
                    {/* Bubble 2 - Bandura on plane */}
                    <g transform="translate(280,100)">
                      <circle cx="0" cy="0" r="32" fill="#FFFFFF" stroke="#000000" strokeWidth="2" opacity="0.9" />
                      <circle cx="15" cy="22" r="6" fill="#FFFFFF" stroke="#000000" strokeWidth="1" opacity="0.7" />
                      <circle cx="8" cy="30" r="3" fill="#FFFFFF" stroke="#000000" strokeWidth="1" opacity="0.5" />
                      
                      {/* Small airplane */}
                      <path d="M-10,-5 L10,-2 L15,2 L10,6 L-10,3 Z" fill="#87CEEB" stroke="#4682B4" strokeWidth="1" />
                      <path d="M-5,-2 L-15,-8 L-10,-2 Z" fill="#87CEEB" stroke="#4682B4" strokeWidth="1" />
                      <path d="M5,2 L8,12 L12,8 Z" fill="#87CEEB" stroke="#4682B4" strokeWidth="1" />
                      
                      {/* Small bandura in plane */}
                      <ellipse cx="0" cy="8" rx="6" ry="8" fill="#DEB887" stroke="#8B7355" strokeWidth="1" />
                    </g>
                    
                    {/* Bubble 3 - Square houses */}
                    <g transform="translate(200,80)">
                      <circle cx="0" cy="0" r="30" fill="#FFFFFF" stroke="#000000" strokeWidth="2" opacity="0.9" />
                      <circle cx="-12" cy="20" r="5" fill="#FFFFFF" stroke="#000000" strokeWidth="1" opacity="0.7" />
                      <circle cx="-6" cy="27" r="2" fill="#FFFFFF" stroke="#000000" strokeWidth="1" opacity="0.5" />
                      
                      {/* Three blocky square houses */}
                      <rect x="-18" y="-5" width="12" height="12" fill="#FFB6C1" stroke="#000000" strokeWidth="1" />
                      <rect x="-6" y="-8" width="12" height="15" fill="#98FB98" stroke="#000000" strokeWidth="1" />
                      <rect x="6" y="-3" width="12" height="10" fill="#87CEEB" stroke="#000000" strokeWidth="1" />
                      
                      {/* Square windows */}
                      <rect x="-15" y="-2" width="3" height="3" fill="#87CEEB" stroke="#000000" strokeWidth="0.5" />
                      <rect x="-10" y="-2" width="3" height="3" fill="#87CEEB" stroke="#000000" strokeWidth="0.5" />
                      <rect x="-3" y="-5" width="3" height="3" fill="#FFB6C1" stroke="#000000" strokeWidth="0.5" />
                      <rect x="2" y="-5" width="3" height="3" fill="#FFB6C1" stroke="#000000" strokeWidth="0.5" />
                      <rect x="9" y="0" width="3" height="3" fill="#98FB98" stroke="#000000" strokeWidth="0.5" />
                      <rect x="14" y="0" width="3" height="3" fill="#98FB98" stroke="#000000" strokeWidth="0.5" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    // Chapter One Spread 2 - UPDATED with new text and Walmart greeter illustration
    {
      content: (
        <div className="h-full w-full bg-gradient-to-br from-green-200 to-emerald-200 p-8 flex flex-col items-center justify-center relative">
          {/* Decorative elements */}
          <div className="absolute top-6 left-10 w-16 h-16 text-4xl">🛬</div>
          <div className="absolute bottom-6 right-10 w-16 h-16 text-4xl">🏠</div>
          <div className="absolute top-1/3 right-6 w-12 h-12 text-3xl animate-bounce">🍽️</div>
          <div className="absolute bottom-1/3 left-6 w-12 h-12 text-3xl animate-spin-slow">🎵</div>

          {/* Container matching dedication page layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
            {/* Left side - Text in matching rounded corners style */}
            <div className="bg-blue-100/90 backdrop-blur-sm rounded-xl p-6 shadow-2xl border-4 border-blue-300 flex flex-col justify-center transform hover:scale-105 transition-transform duration-300">
              {/* Inner decorative border */}
              <div className="border-2 border-dashed border-indigo-300 rounded-lg p-6 w-full">
                {/* Chapter title with correct font and styling */}
                <h2 
                  className="font-bold text-center mb-6 text-blue-700" 
                  style={{
                    fontFamily: "'Chewy','Comic Sans MS',cursive",
                    fontSize: "clamp(1.15rem, 4vw, 1.8rem)"
                  }}
                >
                  CHAPTER 1:<br />THE BOY WITH THREE DOLLARS
                </h2>
                
                {/* UPDATED Story text with proper styling */}
                <div 
                  className="text-gray-700 text-left space-y-4" 
                  style={{
                    fontFamily: "'Comic Neue','Comic Sans MS',Arial,sans-serif",
                    fontSize: "clamp(1.08rem, 3vw, 1.4rem)",
                    lineHeight: "1.6"
                  }}
                >
                  <p>He survived the landing, aced his Computer Science and didn't get deported (thank you, midnight algorithms)... and learned that Walmart greeters treat you like the crowned champion of the snack aisle.</p>
                  <p className="italic">Pro tip: In America, the greeter is paid to smile—you just have to try not to hug them.</p>
                  <p>But the real jackpot? A new nickname! Some kids get "Buddy," some get "Champ."</p>
                  <p>I got "Vittles." Thanks, Kerry and Madds.</p>
                </div>
              </div>
            </div>

            {/* Right side - NEW Walmart greeter illustration */}
            <div className="w-full bg-white/90 rounded-xl shadow-2xl border-4 border-blue-300 overflow-hidden flex items-center justify-center p-4 transform hover:scale-105 transition-transform duration-300">
              {/* Inner decorative border */}
              <div className="w-full h-full border-2 border-dashed border-indigo-300 rounded-lg p-2">
                {/* NEW Walmart greeter illustration */}
                <div className="w-full h-full">
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    <defs>
                      <linearGradient id="store-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F0F9FF" />
                        <stop offset="100%" stopColor="#DCFCE7" />
                      </linearGradient>
                      <filter id="store-shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="#00000030"/>
                      </filter>
                    </defs>
                    
                    {/* Store background */}
                    <rect x="0" y="0" width="400" height="400" fill="url(#store-bg)" />
                    
                    {/* Store floor */}
                    <rect x="0" y="320" width="400" height="80" fill="#E5E7EB" />
                    <line x1="0" y1="320" x2="400" y2="320" stroke="#D1D5DB" strokeWidth="2" />
                    
                    {/* Store shelves in background - snack aisle */}
                    <rect x="20" y="100" width="80" height="220" fill="#94A3B8" stroke="#64748B" strokeWidth="2" />
                    <rect x="30" y="110" width="60" height="30" fill="#FEF3C7" />
                    <rect x="30" y="150" width="60" height="30" fill="#FEE2E2" />
                    <rect x="30" y="190" width="60" height="30" fill="#DBEAFE" />
                    <rect x="30" y="230" width="60" height="30" fill="#D1FAE5" />
                    <rect x="30" y="270" width="60" height="30" fill="#FDE68A" />
                    
                    <rect x="300" y="100" width="80" height="220" fill="#94A3B8" stroke="#64748B" strokeWidth="2" />
                    <rect x="310" y="110" width="60" height="30" fill="#FEF3C7" />
                    <rect x="310" y="150" width="60" height="30" fill="#FEE2E2" />
                    <rect x="310" y="190" width="60" height="30" fill="#DBEAFE" />
                    <rect x="310" y="230" width="60" height="30" fill="#D1FAE5" />
                    <rect x="310" y="270" width="60" height="30" fill="#FDE68A" />
                    
                    {/* Store sign */}
                    <rect x="140" y="40" width="120" height="40" rx="5" fill="#0369A1" filter="url(#store-shadow)" />
                    <text x="200" y="65" fontFamily="Arial" fontSize="16" fill="white" textAnchor="middle" fontWeight="bold">SNACK AISLE</text>
                    
                    {/* Walmart Greeter - older lady with vest */}
                    <g transform="translate(150, 230)">
                      {/* Head */}
                      <circle cx="0" cy="0" r="25" fill="#FFE4C4" stroke="#8B7355" strokeWidth="2" filter="url(#store-shadow)" />
                      
                      {/* Gray hair */}
                      <path d="M-25,-5 Q-20,-25 0,-25 Q20,-25 25,-5" fill="#D3D3D3" stroke="#A9A9A9" strokeWidth="1" />
                      
                      {/* Eyes with glasses */}
                      <rect x="-18" y="-8" width="14" height="8" rx="4" fill="none" stroke="#5D4037" strokeWidth="1.5" />
                      <rect x="4" y="-8" width="14" height="8" rx="4" fill="none" stroke="#5D4037" strokeWidth="1.5" />
                      <line x1="-4" y1="-4" x2="4" y2="-4" stroke="#5D4037" strokeWidth="1.5" />
                      <circle cx="-12" cy="-4" r="3" fill="#2F4F4F" />
                      <circle cx="12" cy="-4" r="3" fill="#2F4F4F" />
                      
                      {/* Big welcoming smile */}
                      <path d="M-15,10 Q0,20 15,10" fill="none" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" />
                      
                      {/* Body with blue vest */}
                      <rect x="-30" y="25" width="60" height="65" rx="10" fill="#0B5CD3" stroke="#083D8F" strokeWidth="2" filter="url(#store-shadow)" />
                      
                      {/* White shirt under vest */}
                      <rect x="-25" y="30" width="50" height="55" rx="8" fill="#FFFFFF" />
                      
                      {/* Name tag */}
                      <rect x="-20" y="35" width="40" height="15" rx="3" fill="#FFEB3B" stroke="#FBC02D" strokeWidth="1" />
                      <text x="0" y="46" fontFamily="Arial" fontSize="10" fill="#000000" textAnchor="middle" fontWeight="bold">GREETER</text>
                      
                      {/* Arms */}
                      <rect x="-45" y="40" width="15" height="10" rx="5" fill="#FFE4C4" stroke="#8B7355" strokeWidth="1" />
                      <rect x="30" y="40" width="15" height="10" rx="5" fill="#FFE4C4" stroke="#8B7355" strokeWidth="1" />
                      
                      {/* Legs */}
                      <rect x="-20" y="90" width="15" height="30" rx="3" fill="#1F2937" stroke="#111827" strokeWidth="1" />
                      <rect x="5" y="90" width="15" height="30" rx="3" fill="#1F2937" stroke="#111827" strokeWidth="1" />
                    </g>
                    
                    {/* Vitaly character - yellow shirt with trident */}
                    <g transform="translate(250, 240)">
                      {/* Head */}
                      <circle cx="0" cy="0" r="22" fill="#D2B48C" stroke="#8B7355" strokeWidth="2" filter="url(#store-shadow)" />
                      
                      {/* Eyes - wide with surprise/excitement */}
                      <circle cx="-8" cy="-4" r="4" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
                      <circle cx="8" cy="-4" r="4" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
                      <circle cx="-8" cy="-4" r="2" fill="#2F4F4F" />
                      <circle cx="8" cy="-4" r="2" fill="#2F4F4F" />
                      
                      {/* Big excited smile */}
                      <path d="M-10,8 Q0,16 10,8" fill="none" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" />
                      
                      {/* Body - yellow shirt with blue trident */}
                      <rect x="-20" y="22" width="40" height="50" rx="6" fill="#FFD700" stroke="#DAA520" strokeWidth="2" filter="url(#store-shadow)" />
                      
                      {/* Ukrainian Trident (Tryzub) logo centered on chest */}
                      <g transform="translate(0,45) scale(0.6)" fill="#0057B7">
                        <path d="M0,-15 L-8,-5 L-8,5 L-4,5 L-4,15 L4,15 L4,5 L8,5 L8,-5 Z" />
                        <path d="M-12,-10 L-12,0 L-8,0 L-8,-10 Z" />
                        <path d="M12,-10 L12,0 L8,0 L8,-10 Z" />
                      </g>
                      
                      {/* Arms */}
                      <rect x="-30" y="35" width="10" height="8" rx="4" fill="#D2B48C" stroke="#8B7355" strokeWidth="1" />
                      <rect x="20" y="35" width="10" height="8" rx="4" fill="#D2B48C" stroke="#8B7355" strokeWidth="1" />
                      
                      {/* Legs */}
                      <rect x="-15" y="72" width="12" height="28" rx="3" fill="#1E40AF" stroke="#1E3A8A" strokeWidth="1" />
                      <rect x="3" y="72" width="12" height="28" rx="3" fill="#1E40AF" stroke="#1E3A8A" strokeWidth="1" />
                    </g>
                    
                    {/* Speech bubble with "Vittles!" */}
                    <g transform="translate(200, 130)">
                      <path d="M0,0 L-40,50 L-30,50 L-10,80 L10,50 L60,50 Z" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
                      <text x="10" y="30" fontFamily="Comic Sans MS, cursive" fontSize="24" fill="#FF0000" fontWeight="bold">Vittles!</text>
                    </g>
                    
                    {/* Shopping cart */}
                    <g transform="translate(310, 310)">
                      <rect x="-20" y="-15" width="40" height="25" rx="2" fill="#9CA3AF" stroke="#6B7280" strokeWidth="1" />
                      <circle cx="-12" cy="15" r="5" fill="#4B5563" stroke="#374151" strokeWidth="1" />
                      <circle cx="12" cy="15" r="5" fill="#4B5563" stroke="#374151" strokeWidth="1" />
                    </g>
                    
                    {/* Store decorations - snack packages */}
                    <g transform="translate(120, 330)">
                      <rect x="-15" y="-10" width="30" height="20" rx="3" fill="#EF4444" stroke="#B91C1C" strokeWidth="1" />
                      <text x="0" y="3" fontFamily="Arial" fontSize="6" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">CHIPS</text>
                    </g>
                    
                    <g transform="translate(280, 330)">
                      <rect x="-15" y="-10" width="30" height="20" rx="3" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1" />
                      <text x="0" y="3" fontFamily="Arial" fontSize="6" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">COOKIES</text>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    // Chapter Two Spread 1 - NEW with theater illustration
    {
      content: (
        <div className="h-full w-full bg-gradient-to-br from-purple-200 to-indigo-200 p-8 flex flex-col items-center justify-center relative">
          {/* Decorative elements */}
          <div className="absolute top-6 left-10 w-16 h-16 text-4xl">🎬</div>
          <div className="absolute bottom-6 right-10 w-16 h-16 text-4xl">🎭</div>
          <div className="absolute top-1/3 right-6 w-12 h-12 text-3xl animate-bounce">🍿</div>
          <div className="absolute bottom-1/3 left-6 w-12 h-12 text-3xl animate-spin-slow">🎞️</div>

          {/* Container matching dedication page layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
            {/* Left side - Text in matching rounded corners style */}
            <div className="bg-blue-100/90 backdrop-blur-sm rounded-xl p-6 shadow-2xl border-4 border-blue-300 flex flex-col justify-center transform hover:scale-105 transition-transform duration-300">
              {/* Inner decorative border */}
              <div className="border-2 border-dashed border-indigo-300 rounded-lg p-6 w-full">
                {/* Chapter title with correct font and styling */}
                <h2 
                  className="font-bold text-center mb-6 text-blue-700" 
                  style={{
                    fontFamily: "'Chewy','Comic Sans MS',cursive",
                    fontSize: "clamp(1.15rem, 4vw, 1.8rem)"
                  }}
                >
                  CHAPTER 2:<br />VITALY MEETS HIS AMERICAN NINJA
                </h2>
                
                {/* Story text with proper styling */}
                <div 
                  className="text-gray-700 text-left space-y-4" 
                  style={{
                    fontFamily: "'Comic Neue','Comic Sans MS',Arial,sans-serif",
                    fontSize: "clamp(1.08rem, 3vw, 1.4rem)",
                    lineHeight: "1.6"
                  }}
                >
                  <p>And then—Kimball logged on: calm, curious, endlessly patient (I did all the talking).</p>
                  <p>Our first meetup was at his old $1 Orem theater. He showed up so early I half-expected him to mop the floors—luckily he left the Swiffer at home and handed me two $1 tickets.</p>
                  <p>A buck might be pocket change for some, but for a new Ukrainian, it felt like gold.</p>
                  <p>We sat. We watched Amanda Bynes in She's the Man. We coded our feelings in awkward jokes.</p>
                </div>
              </div>
            </div>

            {/* Right side - Theater illustration */}
            <div className="w-full bg-white/90 rounded-xl shadow-2xl border-4 border-blue-300 overflow-hidden flex items-center justify-center p-4 transform hover:scale-105 transition-transform duration-300">
              {/* Inner decorative border */}
              <div className="w-full h-full border-2 border-dashed border-indigo-300 rounded-lg p-2">
                {/* Illustration of Vitaly and Kimball at the theater */}
                <div className="w-full h-full">
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    <defs>
                      <linearGradient id="theater-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F5F3FF" />
                        <stop offset="100%" stopColor="#E0E7FF" />
                      </linearGradient>
                      <filter id="theater-shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="#00000030"/>
                      </filter>
                    </defs>
                    
                    {/* Pastel background */}
                    <rect x="0" y="0" width="400" height="400" fill="url(#theater-bg)" />
                    
                    {/* Theater building */}
                    <rect x="100" y="100" width="200" height="180" rx="5" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="2" filter="url(#theater-shadow)" />
                    
                    {/* Theater entrance */}
                    <rect x="150" y="200" width="100" height="80" rx="5" fill="#4B5563" stroke="#374151" strokeWidth="2" />
                    
                    {/* Theater sign */}
                    <rect x="125" y="60" width="150" height="40" rx="5" fill="#6366F1" stroke="#4F46E5" strokeWidth="2" filter="url(#theater-shadow)" />
                    <text x="200" y="85" fontFamily="Arial" fontSize="18" fontWeight="bold" fill="white" textAnchor="middle">$1 THEATER</text>
                    
                    {/* Movie poster */}
                    <rect x="270" y="150" width="40" height="60" rx="2" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
                    <text x="290" y="180" fontFamily="Arial" fontSize="6" fill="#000000" textAnchor="middle" transform="rotate(-90, 290, 180)">SHE'S THE MAN</text>
                    
                    {/* Swiffer leaning against wall */}
                    <line x="310" y1="220" x2="315" y2="280" stroke="#A8A29E" strokeWidth="3" />
                    <rect x="308" y="220" width="8" height="15" fill="#34D399" stroke="#10B981" strokeWidth="1" />
                    
                    {/* Vitaly character - yellow outfit with tryzub */}
                    <g transform="translate(180, 250)">
                      {/* Head - medium-dark skin, rounded */}
                      <circle cx="0" cy="0" r="20" fill="#D2B48C" stroke="#8B7355" strokeWidth="2" filter="url(#theater-shadow)" />
                      
                      {/* Eyes */}
                      <ellipse cx="-8" cy="-5" rx="3" ry="4" fill="#2F4F4F" />
                      <ellipse cx="8" cy="-5" rx="3" ry="4" fill="#2F4F4F" />
                      <circle cx="-8" cy="-5" r="1" fill="#FFFFFF" />
                      <circle cx="8" cy="-5" r="1" fill="#FFFFFF" />
                      
                      {/* Smile */}
                      <path d="M-8,6 Q0,12 8,6" fill="none" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" />
                      
                      {/* Body - yellow outfit */}
                      <rect x="-15" y="20" width="30" height="40" rx="6" fill="#FFD700" stroke="#DAA520" strokeWidth="2" filter="url(#theater-shadow)" />
                      
                      {/* Ukrainian Trident (Tryzub) logo centered on chest */}
                      <g transform="translate(0,40) scale(0.5)" fill="#0057B7">
                        <path d="M0,-15 L-8,-5 L-8,5 L-4,5 L-4,15 L4,15 L4,5 L8,5 L8,-5 Z" />
                        <path d="M-12,-10 L-12,0 L-8,0 L-8,-10 Z" />
                        <path d="M12,-10 L12,0 L8,0 L8,-10 Z" />
                      </g>
                      
                      {/* Arms */}
                      <rect x="-25" y="30" width="10" height="8" rx="4" fill="#D2B48C" stroke="#8B7355" strokeWidth="1" />
                      <rect x="15" y="30" width="10" height="8" rx="4" fill="#D2B48C" stroke="#8B7355" strokeWidth="1" />
                      
                      {/* Legs */}
                      <rect x="-12" y="60" width="10" height="25" rx="3" fill="#4B5563" stroke="#374151" strokeWidth="1" />
                      <rect x="2" y="60" width="10" height="25" rx="3" fill="#4B5563" stroke="#374151" strokeWidth="1" />
                    </g>
                    
                    {/* Kimball character - blue outfit (same as tryzub) */}
                    <g transform="translate(230, 250)">
                      {/* Head - lighter skin, rounded */}
                      <circle cx="0" cy="0" r="20" fill="#FDBCB4" stroke="#CD853F" strokeWidth="2" filter="url(#theater-shadow)" />
                      
                      {/* Eyes */}
                      <ellipse cx="-8" cy="-5" rx="3" ry="4" fill="#2F4F4F" />
                      <ellipse cx="8" cy="-5" rx="3" ry="4" fill="#2F4F4F" />
                      <circle cx="-8" cy="-5" r="1" fill="#FFFFFF" />
                      <circle cx="8" cy="-5" r="1" fill="#FFFFFF" />
                      
                      {/* Smile */}
                      <path d="M-8,6 Q0,10 8,6" fill="none" stroke="#CD853F" strokeWidth="2" strokeLinecap="round" />
                      
                      {/* Body - blue outfit (same color as tryzub) */}
                      <rect x="-15" y="20" width="30" height="40" rx="6" fill="#0057B7" stroke="#003785" strokeWidth="2" filter="url(#theater-shadow)" />
                      
                      {/* Arms */}
                      <rect x="-25" y="30" width="10" height="8" rx="4" fill="#FDBCB4" stroke="#CD853F" strokeWidth="1" />
                      <rect x="15" y="30" width="10" height="8" rx="4" fill="#FDBCB4" stroke="#CD853F" strokeWidth="1" />
                      
                      {/* Legs */}
                      <rect x="-12" y="60" width="10" height="25" rx="3" fill="#4B5563" stroke="#374151" strokeWidth="1" />
                      <rect x="2" y="60" width="10" height="25" rx="3" fill="#4B5563" stroke="#374151" strokeWidth="1" />
                      
                      {/* Tickets in hand */}
                      <g transform="translate(-20, 30)">
                        <rect x="-8" y="0" width="12" height="6" rx="1" fill="#FFFFFF" stroke="#000000" strokeWidth="0.5" />
                        <rect x="-7" y="-1" width="10" height="6" rx="1" fill="#FFFFFF" stroke="#000000" strokeWidth="0.5" />
                        <text x="-2" y="4" fontFamily="Arial" fontSize="4" fill="#FF0000" textAnchor="middle">$1</text>
                      </g>
                    </g>
                    
                    {/* Decorative elements */}
                    <circle cx="120" cy="150" r="10" fill="#FEF3C7" opacity="0.5" />
                    <circle cx="280" cy="120" r="15" fill="#DBEAFE" opacity="0.5" />
                    <rect x="90" y="310" width="20" height="20" rx="4" fill="#F3E8FF" opacity="0.5" />
                    <rect x="300" y="330" width="25" height="25" rx="4" fill="#ECFDF5" opacity="0.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    // Chapter Two Spread 2 - NEW with couch/nose-breathing illustration
    {
      content: (
        <div className="h-full w-full bg-gradient-to-br from-indigo-200 to-pink-200 p-8 flex flex-col items-center justify-center relative">
          {/* Decorative elements */}
          <div className="absolute top-6 right-10 w-16 h-16 text-4xl">💕</div>
          <div className="absolute bottom-6 left-10 w-16 h-16 text-4xl">🦋</div>
          <div className="absolute top-1/3 left-6 w-12 h-12 text-3xl animate-bounce">💘</div>
          <div className="absolute bottom-1/3 right-6 w-12 h-12 text-3xl animate-spin-slow">💫</div>

          {/* Container matching dedication page layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
            {/* Left side - Text in matching rounded corners style */}
            <div className="bg-blue-100/90 backdrop-blur-sm rounded-xl p-6 shadow-2xl border-4 border-blue-300 flex flex-col justify-center transform hover:scale-105 transition-transform duration-300">
              {/* Inner decorative border */}
              <div className="border-2 border-dashed border-indigo-300 rounded-lg p-6 w-full">
                {/* Chapter title with correct font and styling */}
                <h2 
                  className="font-bold text-center mb-6 text-blue-700" 
                  style={{
                    fontFamily: "'Chewy','Comic Sans MS',cursive",
                    fontSize: "clamp(1.15rem, 4vw, 1.8rem)"
                  }}
                >
                  CHAPTER 2:<br />VITALY MEETS HIS AMERICAN NINJA
                </h2>
                
                {/* Story text with proper styling */}
                <div 
                  className="text-gray-700 text-left space-y-4" 
                  style={{
                    fontFamily: "'Comic Neue','Comic Sans MS',Arial,sans-serif",
                    fontSize: "clamp(1.08rem, 3vw, 1.4rem)",
                    lineHeight: "1.6"
                  }}
                >
                  <p>I laughed so hard I nearly cried—Kimball just watched, smiling at every snort.</p>
                  <p>Later at his place, tangled in our first make-out, he murmured, "Just breathe through your nose."</p>
                  <p>I thought it was a kissing trick. Turns out—it was the ultimate marriage survival tip: butterflies fade, but nose-breathing lasts a lifetime.</p>
                  <p>I told him I loved him on that first night.</p>
                  <p>He called it "infatuation."</p>
                  <p>I called it "Ukrainian efficiency."</p>
                </div>
              </div>
            </div>

            {/* Right side - Couch scene with speech bubble */}
            <div className="w-full bg-white/90 rounded-xl shadow-2xl border-4 border-blue-300 overflow-hidden flex items-center justify-center p-4 transform hover:scale-105 transition-transform duration-300">
              {/* Inner decorative border */}
              <div className="w-full h-full border-2 border-dashed border-indigo-300 rounded-lg p-2">
                {/* Illustration of couch scene with speech bubble */}
                <div className="w-full h-full">
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    <defs>
                      <linearGradient id="couch-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#DBEAFE" />
                        <stop offset="100%" stopColor="#FCE7F3" />
                      </linearGradient>
                      <filter id="couch-shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="#00000030"/>
                      </filter>
                    </defs>
                    
                    {/* Pastel gradient background */}
                    <rect x="0" y="0" width="400" height="400" fill="url(#couch-bg)" />
                    
                    {/* Decorative geometric patterns */}
                    <circle cx="80" cy="80" r="20" fill="#E0E7FF" opacity="0.5" />
                    <circle cx="320" cy="100" r="25" fill="#FEE2E2" opacity="0.5" />
                    <rect x="300" y="300" width="30" height="30" fill="#F0FFFF" opacity="0.5" rx="6" />
                    <rect x="70" y="320" width="25" height="25" fill="#FDF2F8" opacity="0.5" rx="5" />
                    
                    {/* Decorative hearts and butterflies */}
                    <g transform="translate(50, 150) rotate(-15)">
                      <path d="M0,0 C-5,-10 -15,-5 -5,10 C5,25 0,-10 0,0 Z" fill="#FDA4AF" opacity="0.6" />
                      <path d="M0,0 C5,-10 15,-5 5,10 C-5,25 0,-10 0,0 Z" fill="#FDA4AF" opacity="0.6" />
                    </g>
                    
                    <g transform="translate(350, 180) rotate(15)">
                      <path d="M0,0 C-5,-10 -15,-5 -5,10 C5,25 0,-10 0,0 Z" fill="#A5B4FC" opacity="0.6" />
                      <path d="M0,0 C5,-10 15,-5 5,10 C-5,25 0,-10 0,0 Z" fill="#A5B4FC" opacity="0.6" />
                    </g>
                    
                    <g transform="translate(330, 250) rotate(30)">
                      <path d="M0,0 C-5,-5 -5,5 0,10 C5,5 5,-5 0,0 Z" fill="#BAE6FD" opacity="0.6" />
                      <path d="M0,0 C-10,0 -10,10 0,10 C10,10 10,0 0,0 Z" fill="#BAE6FD" opacity="0.6" />
                    </g>
                    
                    {/* Couch */}
                    <rect x="100" y="240" width="200" height="80" rx="10" fill="#9CA3AF" stroke="#6B7280" strokeWidth="2" filter="url(#couch-shadow)" />
                    <rect x="90" y="220" width="220" height="40" rx="8" fill="#9CA3AF" stroke="#6B7280" strokeWidth="2" />
                    <rect x="100" y="230" width="200" height="20" rx="5" fill="#6B7280" />
                    <rect x="100" y="250" width="200" height="60" rx="5" fill="#6B7280" />
                    
                    {/* Left side - Vitaly laughing */}
                    <g transform="translate(150, 210)">
                      {/* Head - medium-dark skin, rounded, laughing */}
                      <circle cx="0" cy="0" r="25" fill="#D2B48C" stroke="#8B7355" strokeWidth="2" filter="url(#couch-shadow)" />
                      
                      {/* Eyes - squinting with laughter */}
                      <path d="M-12,-5 Q-8,-10 -4,-5" fill="none" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" />
                      <path d="M4,-5 Q8,-10 12,-5" fill="none" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" />
                      
                      {/* Big laugh */}
                      <path d="M-15,8 Q0,20 15,8" fill="none" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" />
                      
                      {/* Body - yellow shirt with trident */}
                      <rect x="-20" y="25" width="40" height="45" rx="6" fill="#FFD700" stroke="#DAA520" strokeWidth="2" filter="url(#couch-shadow)" />
                      
                      {/* Ukrainian Trident (Tryzub) logo centered on chest */}
                      <g transform="translate(0, 48) scale(0.5)" fill="#0057B7">
                        <path d="M0,-15 L-8,-5 L-8,5 L-4,5 L-4,15 L4,15 L4,5 L8,5 L8,-5 Z" />
                        <path d="M-12,-10 L-12,0 L-8,0 L-8,-10 Z" />
                        <path d="M12,-10 L12,0 L8,0 L8,-10 Z" />
                      </g>
                    </g>
                    
                    {/* Right side - Kimball calm */}
                    <g transform="translate(250, 210)">
                      {/* Head - lighter skin, rounded */}
                      <circle cx="0" cy="0" r="25" fill="#FDBCB4" stroke="#CD853F" strokeWidth="2" filter="url(#couch-shadow)" />
                      
                      {/* Eyes */}
                      <ellipse cx="-10" cy="-5" rx="3" ry="5" fill="#2F4F4F" />
                      <ellipse cx="10" cy="-5" rx="3" ry="5" fill="#2F4F4F" />
                      <circle cx="-10" cy="-5" r="1" fill="#FFFFFF" />
                      <circle cx="10" cy="-5" r="1" fill="#FFFFFF" />
                      
                      {/* Calm smile */}
                      <path d="M-10,8 Q0,12 10,8" fill="none" stroke="#CD853F" strokeWidth="2" strokeLinecap="round" />
                      
                      {/* Body - blue outfit (same color as tryzub) */}
                      <rect x="-20" y="25" width="40" height="45" rx="6" fill="#0057B7" stroke="#003785" strokeWidth="2" filter="url(#couch-shadow)" />
                    </g>
                    
                    {/* Speech bubble with nose-breathing advice */}
                    <g transform="translate(290, 150)">
                      <path d="M0,0 L-20,40 L-10,40 L0,60 L10,40 L40,40 Z" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
                      <text x="10" y="25" fontFamily="Comic Sans MS, cursive" fontSize="10" fill="#000000" textAnchor="middle">Just breathe</text>
                      <text x="10" y="38" fontFamily="Comic Sans MS, cursive" fontSize="10" fill="#000000" textAnchor="middle">through your nose</text>
                    </g>
                    
                    {/* Small floating hearts */}
                    <g transform="translate(200, 140)">
                      <path d="M0,0 C-3,-6 -8,-3 -3,5 C2,13 0,-5 0,0 Z" fill="#FB7185" opacity="0.7" />
                      <path d="M0,0 C3,-6 8,-3 3,5 C-2,13 0,-5 0,0 Z" fill="#FB7185" opacity="0.7" />
                    </g>
                    
                    <g transform="translate(170, 120) scale(0.7)">
                      <path d="M0,0 C-3,-6 -8,-3 -3,5 C2,13 0,-5 0,0 Z" fill="#FB7185" opacity="0.5" />
                      <path d="M0,0 C3,-6 8,-3 3,5 C-2,13 0,-5 0,0 Z" fill="#FB7185" opacity="0.5" />
                    </g>
                    
                    <g transform="translate(230, 130) scale(0.8)">
                      <path d="M0,0 C-3,-6 -8,-3 -3,5 C2,13 0,-5 0,0 Z" fill="#FB7185" opacity="0.6" />
                      <path d="M0,0 C3,-6 8,-3 3,5 C-2,13 0,-5 0,0 Z" fill="#FB7185" opacity="0.6" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    // Chapter Three Spread 1 - NEW with church/hymnbook illustration
    {
      content: (
        <div className="h-full w-full bg-gradient-to-br from-amber-200 to-yellow-200 p-8 flex flex-col items-center justify-center relative">
          {/* Decorative elements */}
          <div className="absolute top-6 left-10 w-16 h-16 text-4xl">🙏</div>
          <div className="absolute bottom-6 right-10 w-16 h-16 text-4xl">📝</div>
          <div className="absolute top-1/3 right-6 w-12 h-12 text-3xl animate-bounce">💌</div>
          <div className="absolute bottom-1/3 left-6 w-12 h-12 text-3xl animate-spin-slow">📆</div>

          {/* Container matching dedication page layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
            {/* Left side - Text in matching rounded corners style */}
            <div className="bg-blue-100/90 backdrop-blur-sm rounded-xl p-6 shadow-2xl border-4 border-blue-300 flex flex-col justify-center transform hover:scale-105 transition-transform duration-300">
              {/* Inner decorative border */}
              <div className="border-2 border-dashed border-indigo-300 rounded-lg p-6 w-full">
                {/* Chapter title with correct font and styling */}
                <h2 
                  className="font-bold text-center mb-6 text-blue-700" 
                  style={{
                    fontFamily: "'Chewy','Comic Sans MS',cursive",
                    fontSize: "clamp(1.15rem, 4vw, 1.8rem)"
                  }}
                >
                  CHAPTER 3:<br />THE GREAT ESCAPE (FROM CLOSET TO BASEMENT)
                </h2>
                
                {/* Story text with proper styling */}
                <div 
                  className="text-gray-700 text-left space-y-4" 
                  style={{
                    fontFamily: "'Comic Neue','Comic Sans MS',Arial,sans-serif",
                    fontSize: "clamp(1.08rem, 3vw, 1.4rem)",
                    lineHeight: "1.6"
                  }}
                >
                  <p>There were:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Secret meetings</li>
                    <li>Coded texts</li>
                    <li>Twice the drama—half the guilt—while sneaking kisses behind hymnbooks. Take that, Joseph Smith.</li>
                    <li>Mormon girls signed up for "Find the One." I signed up for "Already Found!"</li>
                  </ul>
                  <p className="italic">Below: Kimball went to Colorado for church things. We counted weeks with military precision. He quit church. I quit hiding and became his Matthew.</p>
                </div>
              </div>
            </div>

            {/* Right side - Church/hymnbook illustration */}
            <div className="w-full bg-white/90 rounded-xl shadow-2xl border-4 border-blue-300 overflow-hidden flex items-center justify-center p-4 transform hover:scale-105 transition-transform duration-300">
              {/* Inner decorative border */}
              <div className="w-full h-full border-2 border-dashed border-indigo-300 rounded-lg p-2">
                {/* Illustration of church scene with hymnbooks */}
                <div className="w-full h-full">
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    <defs>
                      <linearGradient id="church-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FEF9C3" />
                        <stop offset="100%" stopColor="#FEF3C7" />
                      </linearGradient>
                      <filter id="church-shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="#00000030"/>
                      </filter>
                      <linearGradient id="light-beam" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FEF9C3" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#FEF9C3" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Church background */}
                    <rect x="0" y="0" width="400" height="400" fill="url(#church-bg)" />
                    
                    {/* Church pews */}
                    <rect x="80" y="250" width="240" height="20" rx="2" fill="#8B4513" stroke="#654321" strokeWidth="1" />
                    <rect x="80" y="270" width="240" height="50" rx="2" fill="#A0522D" stroke="#654321" strokeWidth="1" />
                    <rect x="80" y="320" width="240" height="20" rx="2" fill="#8B4513" stroke="#654321" strokeWidth="1" />
                    
                    <rect x="80" y="180" width="240" height="20" rx="2" fill="#8B4513" stroke="#654321" strokeWidth="1" />
                    <rect x="80" y="200" width="240" height="50" rx="2" fill="#A0522D" stroke="#654321" strokeWidth="1" />
                    
                    {/* Church windows with light beams */}
                    <rect x="60" y="60" width="40" height="100" rx="20" fill="#B7E1F3" stroke="#87CEEB" strokeWidth="1" />
                    <path d="M80,60 L120,200" fill="url(#light-beam)" stroke="none" opacity="0.6" />
                    
                    <rect x="300" y="60" width="40" height="100" rx="20" fill="#B7E1F3" stroke="#87CEEB" strokeWidth="1" />
                    <path d="M320,60 L280,200" fill="url(#light-beam)" stroke="none" opacity="0.6" />
                    
                    {/* Vitaly character - yellow outfit with tryzub, peeking behind hymnbook */}
                    <g transform="translate(170, 230)">
                      {/* Head - medium-dark skin, rounded, peeking */}
                      <circle cx="0" cy="0" r="20" fill="#D2B48C" stroke="#8B7355" strokeWidth="2" filter="url(#church-shadow)" />
                      
                      {/* Eyes - looking to the side */}
                      <ellipse cx="-8" cy="-5" rx="3" ry="4" fill="#2F4F4F" />
                      <ellipse cx="8" cy="-5" rx="3" ry="4" fill="#2F4F4F" />
                      <circle cx="-7" cy="-5" r="1" fill="#FFFFFF" />
                      <circle cx="9" cy="-5" r="1" fill="#FFFFFF" />
                      
                      {/* Smirk */}
                      <path d="M-8,6 Q0,10 8,4" fill="none" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" />
                      
                      {/* Body - yellow outfit with tryzub */}
                      <rect x="-15" y="20" width="30" height="40" rx="6" fill="#FFD700" stroke="#DAA520" strokeWidth="2" filter="url(#church-shadow)" />
                      
                      {/* Ukrainian Trident (Tryzub) logo centered on chest */}
                      <g transform="translate(0, 40) scale(0.4)" fill="#0057B7">
                        <path d="M0,-15 L-8,-5 L-8,5 L-4,5 L-4,15 L4,15 L4,5 L8,5 L8,-5 Z" />
                        <path d="M-12,-10 L-12,0 L-8,0 L-8,-10 Z" />
                        <path d="M12,-10 L12,0 L8,0 L8,-10 Z" />
                      </g>
                      
                      {/* Hands holding hymnbook */}
                      <rect x="15" y="30" width="8" height="7" rx="3" fill="#D2B48C" stroke="#8B7355" strokeWidth="1" />
                    </g>
                    
                    {/* Kimball character - blue outfit, peeking behind hymnbook */}
                    <g transform="translate(230, 230)">
                      {/* Head - lighter skin, rounded, peeking */}
                      <circle cx="0" cy="0" r="20" fill="#FDBCB4" stroke="#CD853F" strokeWidth="2" filter="url(#church-shadow)" />
                      
                      {/* Eyes - looking to the side */}
                      <ellipse cx="-8" cy="-5" rx="3" ry="4" fill="#2F4F4F" />
                      <ellipse cx="8" cy="-5" rx="3" ry="4" fill="#2F4F4F" />
                      <circle cx="-9" cy="-5" r="1" fill="#FFFFFF" />
                      <circle cx="7" cy="-5" r="1" fill="#FFFFFF" />
                      
                      {/* Smile */}
                      <path d="M-8,4 Q0,10 8,6" fill="none" stroke="#CD853F" strokeWidth="2" strokeLinecap="round" />
                      
                      {/* Body - blue outfit */}
                      <rect x="-15" y="20" width="30" height="40" rx="6" fill="#0057B7" stroke="#003785" strokeWidth="2" filter="url(#church-shadow)" />
                      
                      {/* Hands holding hymnbook */}
                      <rect x="-23" y="30" width="8" height="7" rx="3" fill="#FDBCB4" stroke="#CD853F" strokeWidth="1" />
                    </g>
                    
                    {/* Hymnbook between them */}
                    <g transform="translate(200, 230)">
                      <rect x="-20" y="25" width="40" height="30" rx="2" fill="#8B0000" stroke="#800000" strokeWidth="2" filter="url(#church-shadow)" />
                      <rect x="-15" y="30" width="30" height="20" rx="1" fill="#F5F5DC" stroke="#800000" strokeWidth="1" />
                      <text x="0" y="43" fontFamily="Arial" fontSize="6" fill="#000000" textAnchor="middle" fontWeight="bold">HYMNS</text>
                    </g>
                    
                    {/* Calendar pages and phone below */}
                    <g transform="translate(120, 330)">
                      <rect x="-30" y="-20" width="60" height="50" rx="2" fill="#FFFFFF" stroke="#000000" strokeWidth="1" filter="url(#church-shadow)" />
                      <line x1="-30" y1="-5" x2="30" y2="-5" stroke="#000000" strokeWidth="1" />
                      <text x="0" y="-10" fontFamily="Arial" fontSize="8" fill="#000000" textAnchor="middle" fontWeight="bold">JULY</text>
                      <text x="0" y="15" fontFamily="Arial" fontSize="20" fill="#FF0000" textAnchor="middle" fontWeight="bold">14</text>
                      <circle cx="-15" cy="-12" r="3" fill="#FF0000" />
                    </g>
                    
                    <g transform="translate(280, 330)">
                      <rect x="-20" y="-25" width="40" height="60" rx="5" fill="#000000" stroke="#333333" strokeWidth="1" filter="url(#church-shadow)" />
                      <rect x="-17" y="-22" width="34" height="45" rx="2" fill="#87CEEB" />
                      <circle cx="0" cy="30" r="5" fill="#FFFFFF" stroke="#333333" strokeWidth="1" />
                      <text x="0" y="0" fontFamily="Arial" fontSize="6" fill="#FFFFFF" textAnchor="middle">❤️ MSG</text>
                    </g>
                    
                    {/* Small heart between them */}
                    <g transform="translate(200, 210)">
                      <path d="M0,0 C-3,-6 -8,-3 -3,5 C2,13 0,-5 0,0 Z" fill="#FF6B6B" opacity="0.8" />
                      <path d="M0,0 C3,-6 8,-3 3,5 C-2,13 0,-5 0,0 Z" fill="#FF6B6B" opacity="0.8" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    // Chapter Three Spread 2 - NEW with borscht cooking illustration
    {
      content: (
        <div className="h-full w-full bg-gradient-to-br from-red-200 to-rose-200 p-8 flex flex-col items-center justify-center relative">
          {/* Decorative elements */}
          <div className="absolute top-6 left-10 w-16 h-16 text-4xl">🍲</div>
          <div className="absolute bottom-6 right-10 w-16 h-16 text-4xl">🏡</div>
          <div className="absolute top-1/3 right-6 w-12 h-12 text-3xl animate-bounce">❤️</div>
          <div className="absolute bottom-1/3 left-6 w-12 h-12 text-3xl animate-spin-slow">🌿</div>

          {/* Container matching dedication page layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
            {/* Left side - Text in matching rounded corners style */}
            <div className="bg-blue-100/90 backdrop-blur-sm rounded-xl p-6 shadow-2xl border-4 border-blue-300 flex flex-col justify-center transform hover:scale-105 transition-transform duration-300">
              {/* Inner decorative border */}
              <div className="border-2 border-dashed border-indigo-300 rounded-lg p-6 w-full">
                {/* Chapter title with correct font and styling */}
                <h2 
                  className="font-bold text-center mb-6 text-blue-700" 
                  style={{
                    fontFamily: "'Chewy','Comic Sans MS',cursive",
                    fontSize: "clamp(1.15rem, 4vw, 1.8rem)"
                  }}
                >
                  CHAPTER 3:<br />THE GREAT ESCAPE (FROM CLOSET TO BASEMENT)
                </h2>
                
                {/* Story text with proper styling */}
                <div 
                  className="text-gray-700 text-left space-y-4" 
                  style={{
                    fontFamily: "'Comic Neue','Comic Sans MS',Arial,sans-serif",
                    fontSize: "clamp(1.08rem, 3vw, 1.4rem)",
                    lineHeight: "1.6"
                  }}
                >
                  <p>He led, I followed, and somewhere along the line, we both lost our reservations (and our good standing).</p>
                  <p>We made borscht bold enough to cure homesickness and ward off judgmental neighbors.</p>
                </div>
              </div>
            </div>

            {/* Right side - Borscht cooking illustration */}
            <div className="w-full bg-white/90 rounded-xl shadow-2xl border-4 border-blue-300 overflow-hidden flex items-center justify-center p-4 transform hover:scale-105 transition-transform duration-300">
              {/* Inner decorative border */}
              <div className="w-full h-full border-2 border-dashed border-indigo-300 rounded-lg p-2">
                {/* Illustration of cooking borscht */}
                <div className="w-full h-full">
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    <defs>
                      <linearGradient id="kitchen-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FEE2E2" />
                        <stop offset="100%" stopColor="#FECDD3" />
                      </linearGradient>
                      <filter id="kitchen-shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="#00000030"/>
                      </filter>
                      <radialGradient id="steam-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    
                    {/* Kitchen background */}
                    <rect x="0" y="0" width="400" height="400" fill="url(#kitchen-bg)" />
                    
                    {/* Kitchen counter */}
                    <rect x="50" y="250" width="300" height="150" fill="#E5E7EB" />
                    <rect x="50" y="250" width="300" height="20" fill="#D1D5DB" />
                    
                    {/* Kitchen wall tiles */}
                    <rect x="50" y="50" width="300" height="200" fill="#F9FAFB" />
                    <line x1="50" y1="100" x2="350" y2="100" stroke="#E5E7EB" strokeWidth="1" />
                    <line x1="50" y1="150" x2="350" y2="150" stroke="#E5E7EB" strokeWidth="1" />
                    <line x1="50" y1="200" x2="350" y2="200" stroke="#E5E7EB" strokeWidth="1" />
                    <line x1="100" y1="50" x2="100" y2="250" stroke="#E5E7EB" strokeWidth="1" />
                    <line x1="150" y1="50" x2="150" y2="250" stroke="#E5E7EB" strokeWidth="1" />
                    <line x1="200" y1="50" x2="200" y2="250" stroke="#E5E7EB" strokeWidth="1" />
                    <line x1="250" y1="50" x2="250" y2="250" stroke="#E5E7EB" strokeWidth="1" />
                    <line x1="300" y1="50" x2="300" y2="250" stroke="#E5E7EB" strokeWidth="1" />
                    
                    {/* Stove */}
                    <rect x="120" y="250" width="160" height="10" fill="#9CA3AF" />
                    <rect x="130" y="260" width="140" height="40" rx="5" fill="#4B5563" stroke="#374151" strokeWidth="2" />
                    
                    {/* Borscht pot with steam */}
                    <ellipse cx="200" cy="260" rx="50" ry="10" fill="#4B5563" filter="url(#kitchen-shadow)" />
                    <rect x="155" y="210" width="90" height="50" rx="5" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="2" filter="url(#kitchen-shadow)" />
                    <ellipse cx="200" cy="210" rx="45" ry="10" fill="#EC4899" />
                    
                    {/* Steam */}
                    <g opacity="0.7">
                      <path d="M180,200 Q175,180 185,170 Q195,160 190,150 Q185,140 195,135" fill="none" stroke="url(#steam-gradient)" strokeWidth="8" strokeLinecap="round" />
                      <path d="M200,195 Q205,175 195,160 Q185,145 200,130" fill="none" stroke="url(#steam-gradient)" strokeWidth="8" strokeLinecap="round" />
                      <path d="M220,200 Q230,180 225,165 Q220,150 230,140" fill="none" stroke="url(#steam-gradient)" strokeWidth="8" strokeLinecap="round" />
                    </g>
                    
                    {/* Vitaly character - yellow outfit with tryzub, in apron */}
                    <g transform="translate(150, 180)">
                      {/* Head - medium-dark skin, rounded */}
                      <circle cx="0" cy="0" r="20" fill="#D2B48C" stroke="#8B7355" strokeWidth="2" filter="url(#kitchen-shadow)" />
                      
                      {/* Eyes */}
                      <ellipse cx="-8" cy="-5" rx="3" ry="4" fill="#2F4F4F" />
                      <ellipse cx="8" cy="-5" rx="3" ry="4" fill="#2F4F4F" />
                      <circle cx="-8" cy="-5" r="1" fill="#FFFFFF" />
                      <circle cx="8" cy="-5" r="1" fill="#FFFFFF" />
                      
                      {/* Smile */}
                      <path d="M-8,6 Q0,12 8,6" fill="none" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" />
                      
                      {/* Body - yellow with apron */}
                      <rect x="-15" y="20" width="30" height="40" rx="6" fill="#FFD700" stroke="#DAA520" strokeWidth="2" filter="url(#kitchen-shadow)" />
                      <rect x="-12" y="20" width="24" height="35" rx="2" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
                      
                      {/* Ukrainian Trident (Tryzub) logo visible under apron */}
                      <g transform="translate(0, 40) scale(0.3)" fill="#0057B7">
                        <path d="M0,-15 L-8,-5 L-8,5 L-4,5 L-4,15 L4,15 L4,5 L8,5 L8,-5 Z" />
                        <path d="M-12,-10 L-12,0 L-8,0 L-8,-10 Z" />
                        <path d="M12,-10 L12,0 L8,0 L8,-10 Z" />
                      </g>
                      
                      {/* Arms */}
                      <rect x="-25" y="30" width="10" height="8" rx="4" fill="#D2B48C" stroke="#8B7355" strokeWidth="1" />
                      <rect x="15" y="30" width="10" height="8" rx="4" fill="#D2B48C" stroke="#8B7355" strokeWidth="1" />
                      
                      {/* Legs */}
                      <rect x="-12" y="60" width="10" height="20" rx="3" fill="#1E40AF" stroke="#1E3A8A" strokeWidth="1" />
                      <rect x="2" y="60" width="10" height="20" rx="3" fill="#1E40AF" stroke="#1E3A8A" strokeWidth="1" />
                    </g>
                    
                    {/* Kimball character - blue outfit, in apron */}
                    <g transform="translate(250, 180)">
                      {/* Head - lighter skin, rounded */}
                      <circle cx="0" cy="0" r="20" fill="#FDBCB4" stroke="#CD853F" strokeWidth="2" filter="url(#kitchen-shadow)" />
                      
                      {/* Eyes */}
                      <ellipse cx="-8" cy="-5" rx="3" ry="4" fill="#2F4F4F" />
                      <ellipse cx="8" cy="-5" rx="3" ry="4" fill="#2F4F4F" />
                      <circle cx="-8" cy="-5" r="1" fill="#FFFFFF" />
                      <circle cx="8" cy="-5" r="1" fill="#FFFFFF" />
                      
                      {/* Smile */}
                      <path d="M-8,6 Q0,10 8,6" fill="none" stroke="#CD853F" strokeWidth="2" strokeLinecap="round" />
                      
                      {/* Body - blue with apron */}
                      <rect x="-15" y="20" width="30" height="40" rx="6" fill="#0057B7" stroke="#003785" strokeWidth="2" filter="url(#kitchen-shadow)" />
                      <rect x="-12" y="20" width="24" height="35" rx="2" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
                      
                      {/* Arms */}
                      <rect x="-25" y="30" width="10" height="8" rx="4" fill="#FDBCB4" stroke="#CD853F" strokeWidth="1" />
                      <rect x="15" y="30" width="10" height="8" rx="4" fill="#FDBCB4" stroke="#CD853F" strokeWidth="1" />
                      
                      {/* Legs */}
                      <rect x="-12" y="60" width="10" height="20" rx="3" fill="#1F2937" stroke="#111827" strokeWidth="1" />
                      <rect x="2" y="60" width="10" height="20" rx="3" fill="#1F2937" stroke="#111827" strokeWidth="1" />
                    </g>
                    
                    {/* Neighbor peeking through window */}
                    <rect x="330" y="100" width="40" height="60" rx="2" fill="#B7E1F3" stroke="#87CEEB" strokeWidth="1" />
                    <g transform="translate(350, 120)">
                      <circle cx="0" cy="0" r="15" fill="#FDBCB4" stroke="#CD853F" strokeWidth="1" />
                      <ellipse cx="-5" cy="-2" rx="2" ry="3" fill="#2F4F4F" />
                      <ellipse cx="5" cy="-2" rx="2" ry="3" fill="#2F4F4F" />
                      <path d="M-7,5 Q0,2 7,5" fill="none" stroke="#CD853F" strokeWidth="1" strokeLinecap="round" />
                      <path d="M-8,-8 Q0,-12 8,-8" fill="none" stroke="#CD853F" strokeWidth="1" strokeLinecap="round" />
                    </g>
                    
                    {/* Hearts and steam swirls */}
                    <g transform="translate(200, 120)">
                      <path d="M0,0 C-5,-10 -15,-5 -5,10 C5,25 0,-10 0,0 Z" fill="#FB7185" opacity="0.6" />
                      <path d="M0,0 C5,-10 15,-5 5,10 C-5,25 0,-10 0,0 Z" fill="#FB7185" opacity="0.6" />
                    </g>
                    
                    <g transform="translate(150, 100) scale(0.7)">
                      <path d="M0,0 C-5,-10 -15,-5 -5,10 C5,25 0,-10 0,0 Z" fill="#FB7185" opacity="0.5" />
                      <path d="M0,0 C5,-10 15,-5 5,10 C-5,25 0,-10 0,0 Z" fill="#FB7185" opacity="0.5" />
                    </g>
                    
                    <g transform="translate(250, 90) scale(0.8)">
                      <path d="M0,0 C-5,-10 -15,-5 -5,10 C5,25 0,-10 0,0 Z" fill="#FB7185" opacity="0.7" />
                      <path d="M0,0 C5,-10 15,-5 5,10 C-5,25 0,-10 0,0 Z" fill="#FB7185" opacity="0.7" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    // Remaining pages would continue here...
  ];

  // Calculate dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (bookRef.current) {
        const width = Math.min(window.innerWidth * 0.9, 1200);
        const height = Math.min(window.innerHeight * 0.8, 800);
        setDimensions({ width, height });
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const goToNextPage = () => {
    if (currentPage < pages.length - 1 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsFlipping(false);
      }, 500);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsFlipping(false);
      }, 500);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft') {
        goToPrevPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, isFlipping]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-yellow-100 relative overflow-hidden">
      <Navigation />

      <div className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <SafeIcon icon={FiBook} className="w-10 h-10 text-amber-600" />
              <h1 className="text-4xl md:text-5xl font-['Comic Neue','Comic Sans MS',cursive] text-stone-800">
                THE ADVENTURES OF VITALY & KIMBALL
              </h1>
            </div>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto font-['Comic Neue','Comic Sans MS',cursive]">
              A Colorful Storybook Journey Through Our Life Together
            </p>
          </motion.div>

          {/* Book Container */}
          <div ref={containerRef} className="flex flex-col items-center justify-center">
            {/* Book Navigation Controls */}
            <div className="flex items-center justify-between w-full max-w-5xl mb-6">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 0 || isFlipping}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full ${
                  currentPage === 0 ? 'text-gray-400 cursor-not-allowed' : 'bg-amber-500 text-white hover:bg-amber-600'
                }`}
              >
                <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
                <span className="font-['Comic Neue','Comic Sans MS',cursive]">Previous Page</span>
              </button>

              <div className="flex items-center space-x-4">
                <span className="text-gray-600 bg-white px-4 py-2 rounded-lg shadow-md font-['Comic Neue','Comic Sans MS',cursive]">
                  Page {currentPage + 1} of {pages.length}
                </span>
                <button
                  onClick={toggleFullscreen}
                  className="p-3 rounded-full bg-indigo-500 text-white hover:bg-indigo-600"
                  title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  <SafeIcon icon={isFullscreen ? FiMinimize2 : FiMaximize2} className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={goToNextPage}
                disabled={currentPage === pages.length - 1 || isFlipping}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full ${
                  currentPage === pages.length - 1 ? 'text-gray-400 cursor-not-allowed' : 'bg-amber-500 text-white hover:bg-amber-600'
                }`}
              >
                <span className="font-['Comic Neue','Comic Sans MS',cursive]">Next Page</span>
                <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
              </button>
            </div>

            {/* Book */}
            <div
              className={`relative overflow-hidden bg-transparent shadow-2xl rounded-2xl ${
                isFullscreen ? 'w-full h-full' : ''
              }`}
              style={!isFullscreen ? { width: dimensions.width, height: dimensions.height } : {}}
              ref={bookRef}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  className="w-full h-full overflow-hidden rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.2)]"
                  key={`page-${currentPage}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  {pages[currentPage]?.content}
                </motion.div>
              </AnimatePresence>

              {/* Page turn buttons */}
              {currentPage > 0 && (
                <button
                  onClick={goToPrevPage}
                  disabled={isFlipping}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-4 bg-white/70 hover:bg-white/90 rounded-full shadow-lg"
                >
                  <SafeIcon icon={FiArrowLeft} className="w-6 h-6 text-gray-700" />
                </button>
              )}

              {currentPage < pages.length - 1 && (
                <button
                  onClick={goToNextPage}
                  disabled={isFlipping}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-4 bg-white/70 hover:bg-white/90 rounded-full shadow-lg"
                >
                  <SafeIcon icon={FiArrowRight} className="w-6 h-6 text-gray-700" />
                </button>
              )}
            </div>

            {/* Mobile-friendly page navigation */}
            <div className="flex justify-center space-x-4 mt-8 md:hidden">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 0 || isFlipping}
                className={`p-4 rounded-full ${
                  currentPage === 0 ? 'bg-gray-100 text-gray-400' : 'bg-amber-500 text-white'
                }`}
              >
                <SafeIcon icon={FiArrowLeft} className="w-6 h-6" />
              </button>
              <button
                onClick={goToNextPage}
                disabled={currentPage === pages.length - 1 || isFlipping}
                className={`p-4 rounded-full ${
                  currentPage === pages.length - 1 ? 'bg-gray-100 text-gray-400' : 'bg-amber-500 text-white'
                }`}
              >
                <SafeIcon icon={FiArrowRight} className="w-6 h-6" />
              </button>
            </div>

            {/* Book description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-2xl mx-auto mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border-4 border-amber-200"
            >
              <h2 className="text-xl font-['Comic Neue','Comic Sans MS',cursive] text-amber-800 mb-4">About This Book</h2>
              <p className="text-gray-700 leading-relaxed font-['Comic Neue','Comic Sans MS',cursive]">
                "The Adventures of Vitaly & Kimball" is a fun, illustrated storybook capturing our journey together - from first meeting to building a life together, complete with all the quirks, challenges, and joys along the way. It's our love story told with humor and honesty, celebrating the beautiful chaos that happens when two very different people find home in each other.
              </p>
              <div className="mt-6 flex justify-center">
                <Link
                  to="/"
                  className="inline-flex items-center space-x-2 bg-amber-500 text-white px-6 py-3 rounded-full hover:bg-amber-600 transition-colors font-['Comic Neue','Comic Sans MS',cursive]"
                >
                  <SafeIcon icon={FiHome} className="w-5 h-5" />
                  <span>Return to our home page</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Book;