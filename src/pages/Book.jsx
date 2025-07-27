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
    // Cover Page - UPDATED with Ukrainian and American flags
    {
      content: (
        <div className="h-full w-full bg-gradient-to-br from-indigo-200 to-purple-200 p-8 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-4 left-4 w-16 h-16 text-4xl">🌈</div>
          <div className="absolute bottom-4 right-4 w-16 h-16 text-4xl">🌟</div>
          <div className="absolute top-1/4 right-10 w-16 h-16 text-4xl animate-bounce">🎈</div>
          <div className="absolute bottom-1/4 left-10 w-16 h-16 text-4xl animate-spin-slow">🎀</div>
          
          {/* Cover content - with Ukrainian and American flags */}
          <div className="absolute inset-0 z-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
            {/* Custom cartoon illustration for cover with flags */}
            <svg viewBox="0 0 800 600" className="w-full h-full">
              {/* Sky background */}
              <defs>
                <linearGradient id="sky-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#C7D2FE" />
                  <stop offset="100%" stopColor="#E0E7FF" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="800" height="600" fill="url(#sky-gradient)" />
              
              {/* Sun */}
              <circle cx="650" cy="100" r="60" fill="#FFD700" />
              <circle cx="650" cy="100" r="45" fill="#FFF176" />
              
              {/* Clouds */}
              <g opacity="0.8">
                <ellipse cx="200" cy="120" rx="70" ry="40" fill="white" />
                <ellipse cx="250" cy="100" rx="60" ry="35" fill="white" />
                <ellipse cx="300" cy="130" rx="65" ry="30" fill="white" />
                
                <ellipse cx="600" cy="150" rx="70" ry="30" fill="white" />
                <ellipse cx="550" cy="140" rx="50" ry="25" fill="white" />
                <ellipse cx="650" cy="160" rx="60" ry="20" fill="white" />
              </g>
              
              {/* Ukrainian Flag - Left Side */}
              <rect x="50" y="150" width="300" height="100" fill="#0057B7" /> {/* Blue */}
              <rect x="50" y="250" width="300" height="100" fill="#FFD700" /> {/* Yellow */}
              
              {/* American Flag - Right Side */}
              <rect x="450" y="150" width="300" height="200" fill="#B22234" /> {/* Red */}
              
              {/* White stripes on American flag */}
              <rect x="450" y="150" width="300" height="15.38" fill="#FFFFFF" />
              <rect x="450" y="180.76" width="300" height="15.38" fill="#FFFFFF" />
              <rect x="450" y="211.52" width="300" height="15.38" fill="#FFFFFF" />
              <rect x="450" y="242.28" width="300" height="15.38" fill="#FFFFFF" />
              <rect x="450" y="273.04" width="300" height="15.38" fill="#FFFFFF" />
              <rect x="450" y="303.8" width="300" height="15.38" fill="#FFFFFF" />
              <rect x="450" y="334.56" width="300" height="15.38" fill="#FFFFFF" />
              
              {/* Blue field on American flag */}
              <rect x="450" y="150" width="120" height="107.66" fill="#3C3B6E" />
              
              {/* Stars on American flag (simplified) */}
              <g fill="#FFFFFF">
                <circle cx="460" cy="160" r="3" />
                <circle cx="480" cy="160" r="3" />
                <circle cx="500" cy="160" r="3" />
                <circle cx="520" cy="160" r="3" />
                <circle cx="540" cy="160" r="3" />
                <circle cx="560" cy="160" r="3" />
                
                <circle cx="470" cy="175" r="3" />
                <circle cx="490" cy="175" r="3" />
                <circle cx="510" cy="175" r="3" />
                <circle cx="530" cy="175" r="3" />
                <circle cx="550" cy="175" r="3" />
                
                <circle cx="460" cy="190" r="3" />
                <circle cx="480" cy="190" r="3" />
                <circle cx="500" cy="190" r="3" />
                <circle cx="520" cy="190" r="3" />
                <circle cx="540" cy="190" r="3" />
                <circle cx="560" cy="190" r="3" />
                
                <circle cx="470" cy="205" r="3" />
                <circle cx="490" cy="205" r="3" />
                <circle cx="510" cy="205" r="3" />
                <circle cx="530" cy="205" r="3" />
                <circle cx="550" cy="205" r="3" />
                
                <circle cx="460" cy="220" r="3" />
                <circle cx="480" cy="220" r="3" />
                <circle cx="500" cy="220" r="3" />
                <circle cx="520" cy="220" r="3" />
                <circle cx="540" cy="220" r="3" />
                <circle cx="560" cy="220" r="3" />
                
                <circle cx="470" cy="235" r="3" />
                <circle cx="490" cy="235" r="3" />
                <circle cx="510" cy="235" r="3" />
                <circle cx="530" cy="235" r="3" />
                <circle cx="550" cy="235" r="3" />
              </g>
              
              {/* Rainbow connecting the flags */}
              <path d="M150,500 Q400,300 650,500" fill="none" stroke="#FF0000" strokeWidth="15" strokeOpacity="0.7" />
              <path d="M170,500 Q400,320 630,500" fill="none" stroke="#FF7F00" strokeWidth="15" strokeOpacity="0.7" />
              <path d="M190,500 Q400,340 610,500" fill="none" stroke="#FFFF00" strokeWidth="15" strokeOpacity="0.7" />
              <path d="M210,500 Q400,360 590,500" fill="none" stroke="#00FF00" strokeWidth="15" strokeOpacity="0.7" />
              <path d="M230,500 Q400,380 570,500" fill="none" stroke="#0000FF" strokeWidth="15" strokeOpacity="0.7" />
              <path d="M250,500 Q400,400 550,500" fill="none" stroke="#4B0082" strokeWidth="15" strokeOpacity="0.7" />
              
              {/* Ground */}
              <rect x="0" y="500" width="800" height="100" fill="#8BC34A" />
              
              {/* Character 1 - Vitaly - positioned in the center-left */}
              <g transform="translate(320,420)">
                <circle cx="0" cy="0" r="40" fill="#FFE0B2" stroke="#E65100" strokeWidth="2" /> {/* Head */}
                <ellipse cx="-15" cy="-10" rx="5" ry="7" fill="#3E2723" /> {/* Left eye */}
                <ellipse cx="15" cy="-10" rx="5" ry="7" fill="#3E2723" /> {/* Right eye */}
                <path d="M-15,10 Q0,25 15,10" fill="none" stroke="#E65100" strokeWidth="3" strokeLinecap="round" /> {/* Smile */}
                <rect x="-30" y="40" width="60" height="60" rx="10" fill="#3F51B5" stroke="#1A237E" strokeWidth="2" /> {/* Body */}
                <rect x="-30" y="100" width="25" height="40" fill="#7986CB" stroke="#1A237E" strokeWidth="2" /> {/* Left leg */}
                <rect x="5" y="100" width="25" height="40" fill="#7986CB" stroke="#1A237E" strokeWidth="2" /> {/* Right leg */}
                <rect x="-60" y="50" width="30" height="10" fill="#FFE0B2" stroke="#E65100" strokeWidth="2" /> {/* Left arm */}
                <rect x="30" y="50" width="30" height="20" fill="#FFE0B2" stroke="#E65100" strokeWidth="2" /> {/* Right arm extended to hold hands */}
              </g>
              
              {/* Character 2 - Kimball - positioned in the center-right */}
              <g transform="translate(480,420)">
                <circle cx="0" cy="0" r="40" fill="#FFECB3" stroke="#E65100" strokeWidth="2" /> {/* Head */}
                <ellipse cx="-15" cy="-10" rx="5" ry="7" fill="#3E2723" /> {/* Left eye */}
                <ellipse cx="15" cy="-10" rx="5" ry="7" fill="#3E2723" /> {/* Right eye */}
                <path d="M-15,15 Q0,25 15,15" fill="none" stroke="#E65100" strokeWidth="3" strokeLinecap="round" /> {/* Smile */}
                <rect x="-30" y="40" width="60" height="60" rx="10" fill="#4CAF50" stroke="#1B5E20" strokeWidth="2" /> {/* Body */}
                <rect x="-30" y="100" width="25" height="40" fill="#81C784" stroke="#1B5E20" strokeWidth="2" /> {/* Left leg */}
                <rect x="5" y="100" width="25" height="40" fill="#81C784" stroke="#1B5E20" strokeWidth="2" /> {/* Right leg */}
                <rect x="-60" y="50" width="30" height="20" fill="#FFECB3" stroke="#E65100" strokeWidth="2" /> {/* Left arm extended to hold hands */}
                <rect x="30" y="50" width="30" height="10" fill="#FFECB3" stroke="#E65100" strokeWidth="2" /> {/* Right arm */}
              </g>
              
              {/* Holding hands in the middle */}
              <circle cx="400" cy="470" r="15" fill="#FFE0B2" stroke="#E65100" strokeWidth="2" /> {/* Joined hands */}
              
              {/* Hearts around the couple */}
              <g transform="translate(350,350) scale(0.6)">
                <path d="M-30,0 C-40,-20 -70,0 -30,40 C10,0 -20,-20 -30,0 Z" fill="#E91E63" fillOpacity="0.7" />
              </g>
              <g transform="translate(450,350) scale(0.6)">
                <path d="M30,0 C40,-20 70,0 30,40 C-10,0 20,-20 30,0 Z" fill="#E91E63" fillOpacity="0.7" />
              </g>
              <g transform="translate(400,300) scale(0.6)">
                <path d="M0,0 C-10,-20 -40,0 0,40 C40,0 10,-20 0,0 Z" fill="#E91E63" fillOpacity="0.7" />
              </g>
            </svg>
          </div>
          
          {/* More transparent overlay with text - positioned to not obscure faces */}
          <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 shadow-lg border-4 border-pink-300 relative z-10 max-w-md mt-32">
            <div className="mx-auto mb-4 w-24 h-24">
              <img 
                src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753573661471-blob" 
                alt="KV Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-4xl font-bold text-center mb-4 text-indigo-700 font-['Comic Neue','Comic Sans MS',cursive] text-shadow-lg">THE ADVENTURES OF</h1>
            <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600 font-['Comic Neue','Comic Sans MS',cursive] text-shadow-lg">VITALY & KIMBALL</h2>
            <h3 className="text-xl italic text-center mb-6 text-amber-800 font-['Comic Neue','Comic Sans MS',cursive] text-shadow-sm">Two Boys, One Big Closet<br />(And a Whole Lot of Pizza)</h3>
            <p className="italic text-sm text-center mt-6 text-gray-600 font-['Comic Neue','Comic Sans MS',cursive]">For Kimball, on our wedding anniversary</p>
            <div className="mt-4 flex justify-center">
              <SafeIcon icon={FiHeart} className="w-12 h-12 text-rose-500" />
            </div>
          </div>
        </div>
      )
    },
    
    // Dedication Page
    {
      content: (
        <div className="h-full w-full bg-gradient-to-br from-rose-200 to-pink-200 p-8 flex flex-col items-center justify-center relative">
          {/* Decorative elements */}
          <div className="absolute top-6 left-6 w-20 h-20 text-5xl">🌸</div>
          <div className="absolute bottom-6 right-6 w-20 h-20 text-5xl">🌺</div>
          <div className="absolute top-1/3 right-12 w-16 h-16 text-4xl animate-bounce">💕</div>
          <div className="absolute bottom-1/3 left-12 w-16 h-16 text-4xl animate-spin-slow">🎀</div>
          
          {/* Container to ensure equal sizing between image and text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
            {/* Updated dedication image - square format with cartoon style */}
            <div className="w-full aspect-square bg-white rounded-2xl shadow-xl border-4 border-rose-300 overflow-hidden flex items-center justify-center">
              {/* Custom cartoon illustration for dedication - matching the style of other chapters */}
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {/* Background */}
                <rect x="0" y="0" width="400" height="400" fill="#FFF8E1" />
                
                {/* Table with ice cream and donuts */}
                <rect x="50" y="250" width="300" height="20" fill="#8D6E63" /> {/* Table top */}
                <rect x="70" y="270" width="20" height="100" fill="#6D4C41" /> {/* Table leg left */}
                <rect x="310" y="270" width="20" height="100" fill="#6D4C41" /> {/* Table leg right */}
                
                {/* Ice cream in bowl */}
                <ellipse cx="150" cy="230" rx="40" ry="15" fill="#BCAAA4" /> {/* Bowl rim */}
                <ellipse cx="150" cy="235" rx="35" ry="12" fill="#EFEBE9" /> {/* Bowl inside */}
                <path d="M120,230 Q150,180 180,230" fill="#F48FB1" /> {/* Ice cream scoop */}
                <circle cx="150" cy="210" r="25" fill="#F8BBD0" /> {/* Ice cream scoop */}
                <circle cx="130" cy="200" r="8" fill="#E91E63" /> {/* Cherry */}
                <rect x="127" y="185" width="5" height="15" fill="#795548" /> {/* Cherry stem */}
                
                {/* Donuts */}
                <circle cx="250" cy="220" r="30" fill="#FFB74D" /> {/* Donut base */}
                <circle cx="250" cy="220" r="15" fill="#FFF8E1" /> {/* Donut hole */}
                <path d="M230,210 Q250,200 270,210" stroke="#C2185B" strokeWidth="4" fill="none" /> {/* Frosting */}
                <circle cx="240" cy="205" r="3" fill="#EC407A" /> {/* Sprinkle */}
                <circle cx="260" cy="205" r="3" fill="#42A5F5" /> {/* Sprinkle */}
                <circle cx="250" cy="200" r="3" fill="#FBC02D" /> {/* Sprinkle */}
                <circle cx="235" cy="215" r="3" fill="#7CB342" /> {/* Sprinkle */}
                <circle cx="265" cy="215" r="3" fill="#5E35B1" /> {/* Sprinkle */}
                
                {/* Character 1 - Vitaly */}
                <g transform="translate(130,120)">
                  <circle cx="0" cy="0" r="40" fill="#FFE0B2" stroke="#E65100" strokeWidth="2" /> {/* Head */}
                  <ellipse cx="-15" cy="-10" rx="5" ry="7" fill="#3E2723" /> {/* Left eye */}
                  <ellipse cx="15" cy="-10" rx="5" ry="7" fill="#3E2723" /> {/* Right eye */}
                  <path d="M-15,10 Q0,25 15,10" fill="none" stroke="#E65100" strokeWidth="3" strokeLinecap="round" /> {/* Smile */}
                  <rect x="-30" y="40" width="60" height="60" rx="10" fill="#3F51B5" stroke="#1A237E" strokeWidth="2" /> {/* Body */}
                  <rect x="-30" y="100" width="25" height="40" fill="#7986CB" stroke="#1A237E" strokeWidth="2" /> {/* Left leg */}
                  <rect x="5" y="100" width="25" height="40" fill="#7986CB" stroke="#1A237E" strokeWidth="2" /> {/* Right leg */}
                  <rect x="-60" y="50" width="30" height="10" fill="#FFE0B2" stroke="#E65100" strokeWidth="2" /> {/* Left arm */}
                  <rect x="30" y="50" width="30" height="10" fill="#FFE0B2" stroke="#E65100" strokeWidth="2" /> {/* Right arm */}
                </g>
                
                {/* Character 2 - Kimball */}
                <g transform="translate(270,120)">
                  <circle cx="0" cy="0" r="40" fill="#FFECB3" stroke="#E65100" strokeWidth="2" /> {/* Head */}
                  <ellipse cx="-15" cy="-10" rx="5" ry="7" fill="#3E2723" /> {/* Left eye */}
                  <ellipse cx="15" cy="-10" rx="5" ry="7" fill="#3E2723" /> {/* Right eye */}
                  <path d="M-15,15 Q0,25 15,15" fill="none" stroke="#E65100" strokeWidth="3" strokeLinecap="round" /> {/* Smile */}
                  <rect x="-30" y="40" width="60" height="60" rx="10" fill="#4CAF50" stroke="#1B5E20" strokeWidth="2" /> {/* Body */}
                  <rect x="-30" y="100" width="25" height="40" fill="#81C784" stroke="#1B5E20" strokeWidth="2" /> {/* Left leg */}
                  <rect x="5" y="100" width="25" height="40" fill="#81C784" stroke="#1B5E20" strokeWidth="2" /> {/* Right leg */}
                  <rect x="-60" y="50" width="30" height="10" fill="#FFECB3" stroke="#E65100" strokeWidth="2" /> {/* Left arm */}
                  <rect x="30" y="50" width="30" height="10" fill="#FFECB3" stroke="#E65100" strokeWidth="2" /> {/* Right arm */}
                </g>
                
                {/* Heart between them */}
                <g transform="translate(200,80) scale(0.8)">
                  <path d="M0,40 C-40,-20 -80,20 -20,60 C40,100 0,-20 0,40 Z" fill="#E91E63" fillOpacity="0.7" />
                  <path d="M0,40 C40,-20 80,20 20,60 C-40,100 0,-20 0,40 Z" fill="#E91E63" fillOpacity="0.7" />
                </g>
              </svg>
            </div>
            
            {/* Dedication text box - matching dimensions with the image */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-4 border-rose-300 w-full aspect-square flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-center mb-6 text-rose-700 font-['Comic Neue','Comic Sans MS',cursive]">DEDICATION</h2>
              <div className="prose prose-lg max-w-md mx-auto">
                <p className="text-center italic text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">
                  For Kimball, on our anniversary—<br /><br />
                  the only man who can outlast me in World of Warcraft,<br />
                  out-snore me through a fireworks show in July,<br />
                  and out-eat me… a whole gallon of ice cream in one sitting.<br />
                  A love so competitive, it's only fair we keep score—even when I lose.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    
    // Chapter One - The Boy With Three Dollars
    {
      content: (
        <div className="h-full w-full bg-gradient-to-br from-sky-200 to-blue-200 p-8 flex flex-col items-center justify-center relative">
          {/* Decorative elements */}
          <div className="absolute top-8 right-8 w-16 h-16 text-4xl">✈️</div>
          <div className="absolute bottom-8 left-8 w-16 h-16 text-4xl">🌍</div>
          <div className="absolute top-1/4 left-12 w-12 h-12 text-3xl animate-bounce">💼</div>
          <div className="absolute bottom-1/4 right-12 w-12 h-12 text-3xl animate-spin-slow">🎭</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* Left side - Text */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border-4 border-blue-300 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-center mb-4 text-blue-700 font-['Comic Neue','Comic Sans MS',cursive]">
                CHAPTER ONE:<br />THE BOY WITH THREE DOLLARS
              </h2>
              <div className="prose prose-md max-w-md mx-auto">
                <p className="text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">
                  Once upon a time, in a country far, far away (Ukraine!), there lived a boy named Vitaly who dreamed of freedom.
                </p>
                <p className="text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">He packed his life into:</p>
                <ul className="list-disc pl-6 font-['Comic Neue','Comic Sans MS',cursive]">
                  <li>Two suitcases</li>
                  <li>Three American dollars</li>
                  <li>A head full of questions</li>
                </ul>
                <p className="italic text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">
                  "Will Americans give me food?"<br />
                  "Will my Bandura survive the airport?"<br />
                  "Why are all the houses square and lined up like math class?"
                </p>
              </div>
            </div>
            
            {/* Right side - Cartoon illustration */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-full h-80">
                {/* Cartoon drawing of a boy with suitcases looking at an airplane */}
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  <defs>
                    <radialGradient id="sky" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
                      <stop offset="0%" stopColor="#87CEEB" />
                      <stop offset="100%" stopColor="#1E90FF" />
                    </radialGradient>
                  </defs>
                  
                  {/* Background */}
                  <rect x="0" y="0" width="400" height="300" fill="url(#sky)" />
                  
                  {/* Sun */}
                  <circle cx="350" cy="50" r="30" fill="#FFD700" />
                  
                  {/* Airplane */}
                  <path d="M320,100 L250,120 L260,130 L320,120 L350,110 Z" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
                  <path d="M250,120 L230,140 L260,130 Z" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
                  <path d="M270,125 L260,150 L280,145 Z" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
                  
                  {/* Ground */}
                  <rect x="0" y="230" width="400" height="70" fill="#8B4513" />
                  <rect x="0" y="220" width="400" height="10" fill="#228B22" />
                  
                  {/* Character */}
                  <circle cx="100" cy="180" r="25" fill="#FFE7D6" stroke="#000000" strokeWidth="2" /> {/* Head */}
                  <path d="M90,170 L95,170" stroke="#000000" strokeWidth="2" /> {/* Left eye */}
                  <path d="M110,170 L105,170" stroke="#000000" strokeWidth="2" /> {/* Right eye */}
                  <path d="M95,190 L105,190" stroke="#000000" strokeWidth="2" /> {/* Smile */}
                  <path d="M100,195 L100,220" stroke="#000000" strokeWidth="2" /> {/* Neck */}
                  <path d="M70,220 L130,220 L120,270 L80,270 Z" fill="#4169E1" stroke="#000000" strokeWidth="2" /> {/* Body */}
                  
                  {/* Arms */}
                  <path d="M70,230 L50,250" stroke="#000000" strokeWidth="2" />
                  <path d="M130,230 L150,250" stroke="#000000" strokeWidth="2" />
                  
                  {/* Legs */}
                  <path d="M90,270 L85,300" stroke="#000000" strokeWidth="2" />
                  <path d="M110,270 L115,300" stroke="#000000" strokeWidth="2" />
                  
                  {/* Suitcases */}
                  <rect x="30" y="250" width="30" height="25" fill="#8B4513" stroke="#000000" strokeWidth="2" />
                  <rect x="150" y="250" width="30" height="25" fill="#8B4513" stroke="#000000" strokeWidth="2" />
                  
                  {/* Money */}
                  <rect x="100" cy="150" width="20" height="10" fill="#90EE90" stroke="#000000" strokeWidth="1" transform="rotate(15, 100, 150)" />
                  
                  {/* Thought bubble */}
                  <circle cx="150" cy="100" r="5" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
                  <circle cx="160" cy="90" r="8" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
                  <circle cx="175" cy="75" r="15" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
                  <path d="M165,70 L185,70" stroke="#000000" strokeWidth="1" /> {/* Question mark */}
                  <path d="M185,70 L185,80" stroke="#000000" strokeWidth="1" />
                  <circle cx="185" cy="85" r="1" fill="#000000" />
                </svg>
              </div>
              
              <p className="text-center text-gray-700 mt-4 font-['Comic Neue','Comic Sans MS',cursive]">
                He survived the landing, mastered pancakes (sort of—Deb helped), 
                and learned Walmart was not, in fact, a wonderland.
              </p>
            </div>
          </div>
        </div>
      )
    },
    
    // Chapter Two - American Ninja (UPDATED TITLE)
    {
      content: (
        <div className="h-full w-full bg-gradient-to-br from-purple-200 to-indigo-200 p-8 flex flex-col items-center justify-center relative">
          {/* Decorative elements */}
          <div className="absolute top-6 right-10 w-16 h-16 text-4xl">🎬</div>
          <div className="absolute bottom-6 left-10 w-16 h-16 text-4xl">🍿</div>
          <div className="absolute top-1/3 left-6 w-12 h-12 text-3xl animate-bounce">💌</div>
          <div className="absolute bottom-1/3 right-6 w-12 h-12 text-3xl animate-spin-slow">❤️</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* Left side - Cartoon illustration */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-full h-80">
                {/* Cartoon drawing of two people at a movie theater */}
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  {/* Theater background */}
                  <rect x="0" y="0" width="400" height="300" fill="#1A0536" />
                  
                  {/* Movie screen */}
                  <rect x="50" y="30" width="300" height="150" fill="#FFFFFF" />
                  <rect x="70" y="50" width="260" height="110" fill="#ADD8E6" />
                  
                  {/* Theater seats */}
                  <rect x="50" y="200" width="300" height="80" fill="#8B0000" />
                  <rect x="80" y="210" width="40" height="60" fill="#A52A2A" />
                  <rect x="130" y="210" width="40" height="60" fill="#A52A2A" />
                  <rect x="180" y="210" width="40" height="60" fill="#A52A2A" />
                  <rect x="230" y="210" width="40" height="60" fill="#A52A2A" />
                  <rect x="280" y="210" width="40" height="60" fill="#A52A2A" />
                  
                  {/* Characters */}
                  {/* Character 1 - Vitaly */}
                  <circle cx="150" cy="230" r="15" fill="#FFE7D6" stroke="#000000" strokeWidth="1" />
                  <path d="M145,225 L148,225" stroke="#000000" strokeWidth="1" />
                  <path d="M155,225 L152,225" stroke="#000000" strokeWidth="1" />
                  <path d="M145,235 L155,235" stroke="#000000" strokeWidth="1" transform="translate(150, 235) scale(1, 0.5) rotate(180) translate(-150, -235)" />
                  <rect x="135" y="245" width="30" height="25" rx="5" fill="#4169E1" stroke="#000000" strokeWidth="1" />
                  
                  {/* Character 2 - Kimball */}
                  <circle cx="200" cy="230" r="15" fill="#FFE7D6" stroke="#000000" strokeWidth="1" />
                  <path d="M195,225 L198,225" stroke="#000000" strokeWidth="1" />
                  <path d="M205,225 L202,225" stroke="#000000" strokeWidth="1" />
                  <path d="M195,235 L205,235" stroke="#000000" strokeWidth="1" />
                  <rect x="185" y="245" width="30" height="25" rx="5" fill="#228B22" stroke="#000000" strokeWidth="1" />
                  
                  {/* Popcorn */}
                  <path d="M175,260 L185,260 L183,270 L177,270 Z" fill="#F5DEB3" stroke="#000000" strokeWidth="1" />
                  
                  {/* Hearts */}
                  <path d="M170,200 C173,195 180,195 180,202 C180,208 170,215 170,215 C170,215 160,208 160,202 C160,195 167,195 170,200 Z" fill="#FF69B4" opacity="0.6" />
                </svg>
              </div>
              
              <p className="text-center text-gray-700 mt-4 font-['Comic Neue','Comic Sans MS',cursive]">
                Our first meeting was at a movie theater. Naturally, Kimball arrived 17 minutes early to disinfect every surface in a 12-mile radius.
              </p>
            </div>
            
            {/* Right side - Text */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border-4 border-purple-300 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-center mb-4 text-purple-700 font-['Comic Neue','Comic Sans MS',cursive]">
                CHAPTER TWO:<br />VITALY MEETS HIS U.S. SAMURAI
              </h2>
              <div className="prose prose-md max-w-md mx-auto">
                <p className="text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">
                  And then—a wild Kimball appeared in the digital ether!
                </p>
                <p className="text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">
                  He was cool, quiet, suspiciously punctual, and had an aura of gymnastic mystery.
                </p>
                <p className="italic text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">
                  I thought: <em>Who is this blue-jacketed American sealing my fate?</em>
                </p>
                <p className="italic text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">
                  He thought: <em>Who is this Ukrainian with enough emotional energy to power a Tesla?</em>
                </p>
                <p className="text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">
                  I told him <em>I loved him</em> on the first night.<br />
                  He called it "infatuation."<br />
                  I called it "Ukrainian efficiency."
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    
    // Chapter Three - The Great Escape
    {
      content: (
        <div className="h-full w-full bg-gradient-to-br from-green-200 to-emerald-200 p-8 flex flex-col items-center justify-center relative">
          {/* Decorative elements */}
          <div className="absolute top-6 left-10 w-16 h-16 text-4xl">🏠</div>
          <div className="absolute bottom-6 right-10 w-16 h-16 text-4xl">📱</div>
          <div className="absolute top-1/3 right-6 w-12 h-12 text-3xl animate-bounce">🔑</div>
          <div className="absolute bottom-1/3 left-6 w-12 h-12 text-3xl animate-spin-slow">📝</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* Left side - Text */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border-4 border-green-300 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-center mb-4 text-green-700 font-['Comic Neue','Comic Sans MS',cursive]">
                CHAPTER THREE:<br />THE GREAT ESCAPE<br />(FROM CLOSET TO BASEMENT)
              </h2>
              <div className="prose prose-md max-w-md mx-auto">
                <p className="text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">There were:</p>
                <ul className="list-disc pl-6 font-['Comic Neue','Comic Sans MS',cursive]">
                  <li>Secret meetings</li>
                  <li>Coded texts</li>
                  <li>Mormon Family Home Evenings (twice the drama, half the fun)</li>
                  <li>Long Sunday nights where the phone was lifeline, confession booth, and proof of love</li>
                </ul>
                <p className="italic text-gray-700 mt-4 font-['Comic Neue','Comic Sans MS',cursive]">
                  Kimball went to Colorado for church things.<br />
                  We counted weeks with military precision.<br />
                  He quit church.<br />
                  I quit hiding.<br />
                  Together we unlearned shame, one world-class borscht at a time.
                </p>
              </div>
            </div>
            
            {/* Right side - Cartoon illustration */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-full h-80">
                {/* Cartoon drawing of two people on phone and moving in */}
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  {/* House background with basement */}
                  <rect x="50" y="50" width="300" height="150" fill="#D2B48C" stroke="#000000" strokeWidth="2" />
                  <rect x="50" y="200" width="300" height="80" fill="#A0522D" stroke="#000000" strokeWidth="2" />
                  <line x1="50" y1="200" x2="350" y2="200" stroke="#000000" strokeWidth="3" />
                  
                  {/* Door */}
                  <rect x="175" y="120" width="50" height="80" fill="#8B4513" stroke="#000000" strokeWidth="2" />
                  <circle cx="215" cy="160" r="5" fill="#FFD700" />
                  
                  {/* Windows */}
                  <rect x="80" y="80" width="40" height="40" fill="#87CEEB" stroke="#000000" strokeWidth="2" />
                  <line x1="100" y1="80" x2="100" y2="120" stroke="#000000" strokeWidth="2" />
                  <line x1="80" y1="100" x2="120" y2="100" stroke="#000000" strokeWidth="2" />
                  
                  <rect x="280" y="80" width="40" height="40" fill="#87CEEB" stroke="#000000" strokeWidth="2" />
                  <line x1="300" y1="80" x2="300" y2="120" stroke="#000000" strokeWidth="2" />
                  <line x1="280" y1="100" x2="320" y2="100" stroke="#000000" strokeWidth="2" />
                  
                  {/* Basement window */}
                  <rect x="100" y="220" width="30" height="20" fill="#87CEEB" stroke="#000000" strokeWidth="2" />
                  <rect x="270" y="220" width="30" height="20" fill="#87CEEB" stroke="#000000" strokeWidth="2" />
                  
                  {/* Characters */}
                  {/* Character with suitcase */}
                  <circle cx="150" cy="240" r="15" fill="#FFE7D6" stroke="#000000" strokeWidth="1" />
                  <rect x="135" y="255" width="30" height="25" rx="5" fill="#4169E1" stroke="#000000" strokeWidth="1" />
                  <rect x="120" y="250" width="20" height="25" fill="#8B4513" stroke="#000000" strokeWidth="1" />
                  
                  {/* Character on phone */}
                  <circle cx="250" cy="240" r="15" fill="#FFE7D6" stroke="#000000" strokeWidth="1" />
                  <rect x="235" y="255" width="30" height="25" rx="5" fill="#228B22" stroke="#000000" strokeWidth="1" />
                  <rect x="260" y="235" width="10" height="20" fill="#000000" stroke="#000000" strokeWidth="1" />
                  
                  {/* Hearts */}
                  <path d="M200,230 C203,225 210,225 210,232 C210,238 200,245 200,245 C200,245 190,238 190,232 C190,225 197,225 200,230 Z" fill="#FF69B4" opacity="0.6" />
                </svg>
              </div>
              
              <p className="text-center text-gray-700 mt-4 font-['Comic Neue','Comic Sans MS',cursive]">
                Secret phone calls, basement moves, and a journey toward authentic living together.
              </p>
            </div>
          </div>
        </div>
      )
    },
    
    // Chapter Four - Things No One Tells You
    {
      content: (
        <div className="h-full w-full bg-gradient-to-br from-red-200 to-rose-200 p-8 flex flex-col items-center justify-center relative">
          {/* Decorative elements */}
          <div className="absolute top-6 right-10 w-16 h-16 text-4xl">🍕</div>
          <div className="absolute bottom-6 left-10 w-16 h-16 text-4xl">🍦</div>
          <div className="absolute top-1/3 left-6 w-12 h-12 text-3xl animate-bounce">😴</div>
          <div className="absolute bottom-1/3 right-6 w-12 h-12 text-3xl animate-spin-slow">💤</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* Left side - Cartoon illustration */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-full h-80">
                {/* Cartoon drawing of pizza and ice cream scene */}
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  {/* Kitchen background */}
                  <rect x="0" y="0" width="400" height="300" fill="#F5F5DC" />
                  
                  {/* Kitchen counter */}
                  <rect x="50" y="150" width="300" height="50" fill="#8B4513" stroke="#000000" strokeWidth="2" />
                  <rect x="50" y="200" width="300" height="100" fill="#A0522D" stroke="#000000" strokeWidth="2" />
                  
                  {/* Pizza */}
                  <circle cx="150" cy="130" r="50" fill="#FFA500" stroke="#8B0000" strokeWidth="3" />
                  <circle cx="150" cy="130" r="45" fill="#FF6347" stroke="#8B0000" strokeWidth="1" />
                  <circle cx="130" cy="120" r="8" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
                  <circle cx="160" cy="110" r="8" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
                  <circle cx="170" cy="140" r="8" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
                  <circle cx="140" cy="150" r="8" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
                  
                  {/* Ice cream */}
                  <rect x="250" y="120" width="50" height="70" rx="5" fill="#B0E0E6" stroke="#000000" strokeWidth="2" />
                  <path d="M250,120 Q275,80 300,120" fill="#FFC0CB" stroke="#000000" strokeWidth="2" />
                  <circle cx="275" cy="100" r="10" fill="#FF0000" />
                  
                  {/* Character 1 with pizza */}
                  <circle cx="100" cy="250" r="20" fill="#FFE7D6" stroke="#000000" strokeWidth="1" />
                  <rect x="80" y="270" width="40" height="30" rx="5" fill="#4169E1" stroke="#000000" strokeWidth="1" />
                  <path d="M105,240 L108,240" stroke="#000000" strokeWidth="1" />
                  <path d="M95,240 L92,240" stroke="#000000" strokeWidth="1" />
                  <path d="M95,250 L105,250" stroke="#000000" strokeWidth="1" transform="translate(100, 250) scale(1, 0.5) rotate(180) translate(-100, -250)" />
                  <path d="M90,260 L110,260" stroke="#000000" strokeWidth="2" />
                  <path d="M90,260 Q100,270 110,260" fill="none" stroke="#FF0000" strokeWidth="2" />
                  
                  {/* Character 2 with ice cream */}
                  <circle cx="300" cy="250" r="20" fill="#FFE7D6" stroke="#000000" strokeWidth="1" />
                  <rect x="280" y="270" width="40" height="30" rx="5" fill="#228B22" stroke="#000000" strokeWidth="1" />
                  <path d="M305,240 L308,240" stroke="#000000" strokeWidth="1" />
                  <path d="M295,240 L292,240" stroke="#000000" strokeWidth="1" />
                  <path d="M295,255 L305,255" stroke="#000000" strokeWidth="1" />
                  <path d="M290,260 L310,260" stroke="#000000" strokeWidth="2" />
                </svg>
              </div>
              
              <p className="text-center text-gray-700 mt-4 font-['Comic Neue','Comic Sans MS',cursive]">
                If one spouse loves pizza, the other becomes a master of dough—flour on the ceiling, sweat on the brow.
              </p>
            </div>
            
            {/* Right side - Text */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border-4 border-red-300 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-center mb-4 text-red-700 font-['Comic Neue','Comic Sans MS',cursive]">
                CHAPTER FOUR:<br />THE THINGS NO ONE TELLS YOU<br />ABOUT GAY MARRIAGE
              </h2>
              <div className="prose prose-md max-w-md mx-auto">
                <p className="text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">
                  <strong>If one spouse loves pizza</strong>, the other becomes a master of dough. Behind Costco bags of broccoli and beef (Kimball's daily power-up), there's always a secret stash: ice cream hiding behind the frozen peas, and the Costco chocolate chip cookies tucked away on the highest shelf.
                </p>
                <p className="text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">
                  <strong>Kimball once ate an entire gallon of ice cream</strong> in one glorious, heroic sitting. No regrets, just a perfectly chilled stomachache and a look of triumph as he collapsed on the couch.
                </p>
                <p className="text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">
                  <strong>If one snores</strong>, you invest in an Intellibed. One for sex, two for sleep, three for those nights when a pizza party turns the bedroom into a "guess who farted?" arena.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    
    // Chapter Five - The Epic Battles
    {
      content: (
        <div className="h-full w-full bg-gradient-to-br from-amber-200 to-yellow-200 p-8 flex flex-col items-center justify-center relative">
          {/* Decorative elements */}
          <div className="absolute top-6 left-10 w-16 h-16 text-4xl">🎾</div>
          <div className="absolute bottom-6 right-10 w-16 h-16 text-4xl">🎮</div>
          <div className="absolute top-1/3 right-6 w-12 h-12 text-3xl animate-bounce">🏆</div>
          <div className="absolute bottom-1/3 left-6 w-12 h-12 text-3xl animate-spin-slow">⚔️</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* Left side - Text */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border-4 border-amber-300 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-center mb-4 text-amber-700 font-['Comic Neue','Comic Sans MS',cursive]">
                CHAPTER FIVE:<br />THE EPIC BATTLES
              </h2>
              <div className="prose prose-md max-w-md mx-auto">
                <p className="text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">
                  <strong>On the tennis court</strong>, every serve is a test of marriage.
                </p>
                <p className="text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">
                  If it's below 60 degrees, Kimball won't play, citing Utah law.
                </p>
                <p className="text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">
                  He claims victory, but I know the scoring system (and his calculator watch) are rigged.
                </p>
                <p className="text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">
                  <strong>In World of Warcraft</strong>, Kimball raids dungeons, I raid his attention.
                </p>
                <p className="text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">
                  He knows every expansion release date; he does not know his parents' birthdays.
                </p>
              </div>
            </div>
            
            {/* Right side - Cartoon illustration */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-full h-80">
                {/* Split illustration: Tennis court and WoW gaming */}
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  {/* Top half - Tennis */}
                  <rect x="0" y="0" width="400" height="150" fill="#90EE90" />
                  
                  {/* Tennis court */}
                  <rect x="50" y="20" width="300" height="110" fill="#228B22" stroke="#FFFFFF" strokeWidth="2" />
                  <line x1="200" y1="20" x2="200" y2="130" stroke="#FFFFFF" strokeWidth="2" />
                  <rect x="195" y="65" width="10" height="20" fill="none" stroke="#FFFFFF" strokeWidth="1" />
                  
                  {/* Tennis net */}
                  <line x1="200" y1="20" x2="200" y2="130" stroke="#000000" strokeWidth="1" />
                  <line x1="200" y1="40" x2="200" y2="120" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="5,5" />
                  
                  {/* Character 1 with racket */}
                  <circle cx="100" cy="80" r="15" fill="#FFE7D6" stroke="#000000" strokeWidth="1" />
                  <rect x="85" y="95" width="30" height="25" rx="5" fill="#4169E1" stroke="#000000" strokeWidth="1" />
                  <path d="M70,80 Q60,70 70,60 Q80,50 90,60 Q100,70 90,80 Q80,90 70,80 Z" fill="#D2B48C" stroke="#000000" strokeWidth="1" />
                  <line x1="85" y1="70" x2="65" y2="90" stroke="#000000" strokeWidth="1" />
                  <line x1="65" y1="70" x2="85" y2="90" stroke="#000000" strokeWidth="1" />
                  
                  {/* Character 2 with racket */}
                  <circle cx="300" cy="80" r="15" fill="#FFE7D6" stroke="#000000" strokeWidth="1" />
                  <rect x="285" y="95" width="30" height="25" rx="5" fill="#228B22" stroke="#000000" strokeWidth="1" />
                  <path d="M330,80 Q340,70 330,60 Q320,50 310,60 Q300,70 310,80 Q320,90 330,80 Z" fill="#D2B48C" stroke="#000000" strokeWidth="1" />
                  <line x1="315" y1="70" x2="335" y2="90" stroke="#000000" strokeWidth="1" />
                  <line x1="335" y1="70" x2="315" y2="90" stroke="#000000" strokeWidth="1" />
                  
                  {/* Tennis ball */}
                  <circle cx="200" cy="80" r="5" fill="#FFFF00" stroke="#000000" strokeWidth="1" />
                  
                  {/* Bottom half - Gaming */}
                  <rect x="0" y="150" width="400" height="150" fill="#1A0536" />
                  
                  {/* Computer screen */}
                  <rect x="150" y="170" width="100" height="80" fill="#000000" stroke="#333333" strokeWidth="2" />
                  <rect x="160" y="180" width="80" height="60" fill="#0000CD" stroke="#333333" strokeWidth="1" />
                  
                  {/* WoW character on screen */}
                  <circle cx="200" cy="210" r="10" fill="#FFD700" stroke="#000000" strokeWidth="1" />
                  <rect x="195" y="220" width="10" height="15" fill="#FF0000" stroke="#000000" strokeWidth="1" />
                  <path d="M190,220 L210,220" stroke="#000000" strokeWidth="1" />
                  <path d="M200,225 L190,235" stroke="#000000" strokeWidth="1" />
                  <path d="M200,225 L210,235" stroke="#000000" strokeWidth="1" />
                  
                  {/* Character at computer */}
                  <circle cx="250" cy="210" r="15" fill="#FFE7D6" stroke="#000000" strokeWidth="1" />
                  <rect x="235" y="225" width="30" height="25" rx="5" fill="#228B22" stroke="#000000" strokeWidth="1" />
                  
                  {/* Character watching */}
                  <circle cx="300" cy="210" r="15" fill="#FFE7D6" stroke="#000000" strokeWidth="1" />
                  <rect x="285" y="225" width="30" height="25" rx="5" fill="#4169E1" stroke="#000000" strokeWidth="1" />
                  <path d="M305,205 L308,205" stroke="#000000" strokeWidth="1" />
                  <path d="M295,205 L292,205" stroke="#000000" strokeWidth="1" />
                  <path d="M295,215 L305,215" stroke="#000000" strokeWidth="1" transform="translate(300, 215) scale(1, 0.5) rotate(180) translate(-300, -215)" />
                  
                  {/* ZZZ from watching character */}
                  <text x="320" y="195" fill="#FFFFFF" fontSize="15" fontWeight="bold">💤</text>
                </svg>
              </div>
              
              <p className="text-center text-gray-700 mt-4 font-['Comic Neue','Comic Sans MS',cursive]">
                On tennis courts and in Azeroth, our battles are legendary (and hilarious).
              </p>
            </div>
          </div>
        </div>
      )
    },
    
    // Chapter Six - The Great Animal Scam
    {
      content: (
        <div className="h-full w-full bg-gradient-to-br from-blue-200 to-cyan-200 p-8 flex flex-col items-center justify-center relative">
          {/* Decorative elements */}
          <div className="absolute top-6 right-10 w-16 h-16 text-4xl">🐱</div>
          <div className="absolute bottom-6 left-10 w-16 h-16 text-4xl">🐶</div>
          <div className="absolute top-1/3 left-6 w-12 h-12 text-3xl animate-bounce">🧶</div>
          <div className="absolute bottom-1/3 right-6 w-12 h-12 text-3xl animate-spin-slow">🐾</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* Left side - Cartoon illustration */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-full h-80">
                {/* Cartoon drawing of cat adoption and return */}
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  {/* Living room background */}
                  <rect x="0" y="0" width="400" height="300" fill="#F5F5DC" />
                  
                  {/* Couch */}
                  <rect x="50" y="150" width="300" height="100" rx="10" fill="#A0522D" stroke="#000000" strokeWidth="2" />
                  <rect x="50" y="150" width="300" height="30" rx="5" fill="#8B4513" stroke="#000000" strokeWidth="2" />
                  <rect x="60" y="160" width="280" height="10" rx="5" fill="#D2B48C" stroke="#000000" strokeWidth="1" />
                  
                  {/* Window */}
                  <rect x="150" y="50" width="100" height="80" fill="#87CEEB" stroke="#000000" strokeWidth="2" />
                  <line x1="200" y1="50" x2="200" y2="130" stroke="#000000" strokeWidth="2" />
                  <line x1="150" y1="90" x2="250" y2="90" stroke="#000000" strokeWidth="2" />
                  
                  {/* Cats */}
                  <ellipse cx="100" cy="200" rx="20" ry="15" fill="#808080" stroke="#000000" strokeWidth="1" />
                  <circle cx="85" cy="190" r="10" fill="#808080" stroke="#000000" strokeWidth="1" />
                  <path d="M80,185 L85,180" stroke="#000000" strokeWidth="1" />
                  <path d="M90,185 L95,180" stroke="#000000" strokeWidth="1" />
                  <ellipse cx="82" cy="187" rx="2" ry="3" fill="#000000" />
                  <ellipse cx="88" cy="187" rx="2" ry="3" fill="#000000" />
                  
                  <ellipse cx="150" cy="200" rx="20" ry="15" fill="#D2B48C" stroke="#000000" strokeWidth="1" />
                  <circle cx="135" cy="190" r="10" fill="#D2B48C" stroke="#000000" strokeWidth="1" />
                  <path d="M130,185 L135,180" stroke="#000000" strokeWidth="1" />
                  <path d="M140,185 L145,180" stroke="#000000" strokeWidth="1" />
                  <ellipse cx="132" cy="187" rx="2" ry="3" fill="#000000" />
                  <ellipse cx="138" cy="187" rx="2" ry="3" fill="#000000" />
                  
                  {/* Scratches on couch */}
                  <path d="M250,170 L270,190" stroke="#8B4513" strokeWidth="2" />
                  <path d="M260,170 L280,190" stroke="#8B4513" strokeWidth="2" />
                  <path d="M270,170 L290,190" stroke="#8B4513" strokeWidth="2" />
                  
                  {/* Characters */}
                  <circle cx="320" cy="220" r="15" fill="#FFE7D6" stroke="#000000" strokeWidth="1" />
                  <rect x="305" y="235" width="30" height="25" rx="5" fill="#4169E1" stroke="#000000" strokeWidth="1" />
                  <path d="M315,215 L318,215" stroke="#000000" strokeWidth="1" />
                  <path d="M325,215 L322,215" stroke="#000000" strokeWidth="1" />
                  <path d="M315,225 L325,225" stroke="#000000" strokeWidth="1" transform="translate(320, 225) scale(1, 0.5) rotate(180) translate(-320, -225)" />
                  
                  {/* Speech bubble */}
                  <path d="M320,190 Q330,180 340,190 Q350,200 340,210 Q330,220 320,210 Q310,200 320,190 Z" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
                  <text x="320" y="205" fill="#000000" fontSize="12" fontWeight="bold" textAnchor="middle">🐶❓</text>
                </svg>
              </div>
              
              <p className="text-center text-gray-700 mt-4 font-['Comic Neue','Comic Sans MS',cursive]">
                We don't have animals, just the <em>idea</em> of animals. The kittens left their mark on our precious leather couch.
              </p>
            </div>
            
            {/* Right side - Text */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border-4 border-blue-300 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-center mb-4 text-blue-700 font-['Comic Neue','Comic Sans MS',cursive]">
                CHAPTER SIX:<br />THE GREAT ANIMAL SCAM
              </h2>
              <div className="prose prose-md max-w-md mx-auto">
                <p className="text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">
                  We don't have animals, just the <em>idea</em> of animals.
                </p>
                <p className="text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">
                  We adopted adult cats more than once—and, yes, even brother kittens one time.
                </p>
                <p className="text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">
                  Proud for six days, twelve days, two weeks.
                </p>
                <p className="text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">
                  The kittens left their mark: tiny claw signatures on our precious leather couch
                  (but nobody ever peed—blessed be the patron saint of Macy's).
                </p>
                <p className="text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">
                  Vitaly still dreams of a wild, muddy, loyal dog.
                  Kimball, caretaker of clean floors and balance sheets, replies:
                  <br /><em>"Only if it can file taxes and never poop."</em>
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    
    // Chapter Seven - Troubles Turned Upside Down
    {
      content: (
        <div className="h-full w-full bg-gradient-to-br from-indigo-200 to-violet-200 p-8 flex flex-col items-center justify-center relative">
          {/* Decorative elements */}
          <div className="absolute top-6 left-10 w-16 h-16 text-4xl">💼</div>
          <div className="absolute bottom-6 right-10 w-16 h-16 text-4xl">💰</div>
          <div className="absolute top-1/3 right-6 w-12 h-12 text-3xl animate-bounce">📊</div>
          <div className="absolute bottom-1/3 left-6 w-12 h-12 text-3xl animate-spin-slow">🔄</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* Left side - Text */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border-4 border-indigo-300 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-center mb-4 text-indigo-700 font-['Comic Neue','Comic Sans MS',cursive]">
                CHAPTER SEVEN:<br />TROUBLES TURNED UPSIDE DOWN
              </h2>
              <div className="prose prose-md max-w-md mx-auto">
                <p className="text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">
                  Some couples scrapbook joyful memories.
                  Our scrapbook is a stand-up comedy set.
                </p>
                <p className="text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">
                  <strong>Therapy sessions?</strong> We showed up, armed for battle. But it wasn't about "winning" the homework. It was about learning (slowly, painfully, finally) that sometimes, Vitaly just needed to listen when Kimball speaks.
                </p>
                <p className="text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">
                  <strong>A failed startup</strong>—six figures lost, not in hryvnias, because in hryvnias it would be seven figures. Turns out, the American Dream can bounce a check.
                </p>
              </div>
            </div>
            
            {/* Right side - Cartoon illustration */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-full h-80">
                {/* Cartoon drawing of therapy session and business troubles */}
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  {/* Top half - Therapy */}
                  <rect x="0" y="0" width="400" height="150" fill="#F0F8FF" />
                  
                  {/* Therapy office */}
                  <rect x="50" y="20" width="300" height="110" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
                  <rect x="100" y="50" width="200" height="60" rx="10" fill="#F5F5DC" stroke="#000000" strokeWidth="1" />
                  
                  {/* Therapist */}
                  <circle cx="200" cy="70" r="15" fill="#FFE7D6" stroke="#000000" strokeWidth="1" />
                  <rect x="185" y="85" width="30" height="25" rx="5" fill="#800080" stroke="#000000" strokeWidth="1" />
                  <path d="M195,65 L198,65" stroke="#000000" strokeWidth="1" />
                  <path d="M205,65 L202,65" stroke="#000000" strokeWidth="1" />
                  <path d="M195,75 L205,75" stroke="#000000" strokeWidth="1" />
                  <ellipse cx="200" cy="100" rx="40" ry="5" fill="#333333" opacity="0.3" />
                  
                  {/* Character 1 */}
                  <circle cx="150" cy="70" r="15" fill="#FFE7D6" stroke="#000000" strokeWidth="1" />
                  <rect x="135" y="85" width="30" height="25" rx="5" fill="#4169E1" stroke="#000000" strokeWidth="1" />
                  <path d="M145,65 L148,65" stroke="#000000" strokeWidth="1" />
                  <path d="M155,65 L152,65" stroke="#000000" strokeWidth="1" />
                  <path d="M145,75 L155,75" stroke="#000000" strokeWidth="1" transform="translate(150, 75) scale(1, 0.5) rotate(180) translate(-150, -75)" />
                  <ellipse cx="150" cy="100" rx="40" ry="5" fill="#333333" opacity="0.3" />
                  
                  {/* Character 2 */}
                  <circle cx="250" cy="70" r="15" fill="#FFE7D6" stroke="#000000" strokeWidth="1" />
                  <rect x="235" y="85" width="30" height="25" rx="5" fill="#228B22" stroke="#000000" strokeWidth="1" />
                  <path d="M245,65 L248,65" stroke="#000000" strokeWidth="1" />
                  <path d="M255,65 L252,65" stroke="#000000" strokeWidth="1" />
                  <path d="M245,75 L255,75" stroke="#000000" strokeWidth="1" />
                  <ellipse cx="250" cy="100" rx="40" ry="5" fill="#333333" opacity="0.3" />
                  
                  {/* Bottom half - Business troubles */}
                  <rect x="0" y="150" width="400" height="150" fill="#F5F5F5" />
                  
                  {/* Office desk */}
                  <rect x="100" y="200" width="200" height="60" fill="#8B4513" stroke="#000000" strokeWidth="2" />
                  <rect x="150" y="170" width="100" height="30" fill="#A9A9A9" stroke="#000000" strokeWidth="1" />
                  
                  {/* Computer screen with declining chart */}
                  <rect x="160" y="175" width="80" height="20" fill="#000000" stroke="#333333" strokeWidth="1" />
                  <path d="M165,185 L175,180 L185,190 L195,185 L205,187 L215,180 L225,195" fill="none" stroke="#FF0000" strokeWidth="2" />
                  
                  {/* Character with hands on head */}
                  <circle cx="200" cy="240" r="15" fill="#FFE7D6" stroke="#000000" strokeWidth="1" />
                  <rect x="185" y="255" width="30" height="25" rx="5" fill="#4169E1" stroke="#000000" strokeWidth="1" />
                  <path d="M185,235 L175,225" stroke="#000000" strokeWidth="1" />
                  <path d="M215,235 L225,225" stroke="#000000" strokeWidth="1" />
                  <path d="M195,240 L205,240" stroke="#000000" strokeWidth="1" transform="translate(200, 240) scale(1, -0.5) rotate(180) translate(-200, -240)" />
                  
                  {/* Money flying away */}
                  <text x="240" y="200" fill="#000000" fontSize="20" fontWeight="bold">💸</text>
                  <text x="270" y="180" fill="#000000" fontSize="20" fontWeight="bold">💸</text>
                  <text x="300" y="210" fill="#000000" fontSize="20" fontWeight="bold">💸</text>
                </svg>
              </div>
              
              <p className="text-center text-gray-700 mt-4 font-['Comic Neue','Comic Sans MS',cursive]">
                From therapy battles to financial misadventures, we've weathered it all together.
              </p>
            </div>
          </div>
        </div>
      )
    },
    
    // Chapter Eight - Gratitude
    {
      content: (
        <div className="h-full w-full bg-gradient-to-br from-green-200 to-emerald-200 p-8 flex flex-col items-center justify-center relative">
          {/* Decorative elements */}
          <div className="absolute top-6 right-10 w-16 h-16 text-4xl">🙏</div>
          <div className="absolute bottom-6 left-10 w-16 h-16 text-4xl">💝</div>
          <div className="absolute top-1/3 left-6 w-12 h-12 text-3xl animate-bounce">✨</div>
          <div className="absolute bottom-1/3 right-6 w-12 h-12 text-3xl animate-spin-slow">🌟</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* Left side - Cartoon illustration */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-full h-80">
                {/* Cartoon drawing of gratitude moments */}
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  {/* Background with divided panels */}
                  <rect x="0" y="0" width="200" height="150" fill="#FFE4E1" />
                  <rect x="200" y="0" width="200" height="150" fill="#E0FFFF" />
                  <rect x="0" y="150" width="200" height="150" fill="#FAFAD2" />
                  <rect x="200" y="150" width="200" height="150" fill="#E6E6FA" />
                  
                  {/* Panel 1: Washing pans */}
                  <rect x="20" y="20" width="160" height="110" rx="10" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
                  <rect x="60" y="50" width="80" height="40" rx="5" fill="#C0C0C0" stroke="#000000" strokeWidth="1" />
                  <ellipse cx="100" cy="50" rx="30" ry="10" fill="#87CEEB" stroke="#000000" strokeWidth="1" />
                  
                  {/* Character washing */}
                  <circle cx="50" cy="80" r="15" fill="#FFE7D6" stroke="#000000" strokeWidth="1" />
                  <rect x="35" y="95" width="30" height="25" rx="5" fill="#228B22" stroke="#000000" strokeWidth="1" />
                  
                  {/* Panel 2: Ketchup on face */}
                  <rect x="220" y="20" width="160" height="110" rx="10" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
                  <circle cx="300" cy="70" r="15" fill="#FFE7D6" stroke="#000000" strokeWidth="1" />
                  <rect x="285" y="85" width="30" height="25" rx="5" fill="#4169E1" stroke="#000000" strokeWidth="1" />
                  <path d="M295,65 L298,65" stroke="#000000" strokeWidth="1" />
                  <path d="M305,65 L302,65" stroke="#000000" strokeWidth="1" />
                  <path d="M295,75 L305,75" stroke="#000000" strokeWidth="1" />
                  <path d="M290,70 L295,70" stroke="#FF0000" strokeWidth="4" strokeLinecap="round" />
                  
                  {/* Pizza slice */}
                  <path d="M320,80 L330,100 L310,100 Z" fill="#FFA500" stroke="#8B0000" strokeWidth="1" />
                  <path d="M320,80 L330,100 L310,100 Z" fill="#FF6347" stroke="none" strokeWidth="0" />
                  
                  {/* Panel 3: Tank tops */}
                  <rect x="20" y="170" width="160" height="110" rx="10" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
                  <path d="M70,200 Q100,190 130,200 L130,250 L70,250 Z" fill="#1E90FF" stroke="#000000" strokeWidth="1" />
                  
                  {/* Characters with tank top */}
                  <circle cx="150" cy="220" r="15" fill="#FFE7D6" stroke="#000000" strokeWidth="1" />
                  <path d="M145,215 L148,215" stroke="#000000" strokeWidth="1" />
                  <path d="M155,215 L152,215" stroke="#000000" strokeWidth="1" />
                  <path d="M145,225 L155,225" stroke="#000000" strokeWidth="1" transform="translate(150, 225) scale(1, 0.5) rotate(180) translate(-150, -225)" />
                  
                  {/* Panel 4: Pizza and sushi */}
                  <rect x="220" y="170" width="160" height="110" rx="10" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
                  <circle cx="260" cy="210" r="30" fill="#FFA500" stroke="#8B0000" strokeWidth="2" />
                  <circle cx="260" cy="210" r="25" fill="#FF6347" stroke="#8B0000" strokeWidth="1" />
                  
                  {/* Sushi */}
                  <rect x="320" y="200" width="40" height="20" rx="5" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
                  <rect x="325" y="205" width="30" height="10" fill="#FFE4B5" stroke="#000000" strokeWidth="1" />
                  <rect x="335" y="205" width="10" height="10" fill="#90EE90" stroke="#000000" strokeWidth="1" />
                  
                  {/* $5 sign */}
                  <circle cx="340" cy="190" r="10" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
                  <text x="340" y="195" fill="#000000" fontSize="15" fontWeight="bold" textAnchor="middle">$5</text>
                </svg>
              </div>
              
              <p className="text-center text-gray-700 mt-4 font-['Comic Neue','Comic Sans MS',cursive]">
                The little things we're grateful for: clean pans, ketchup warnings, borrowed tank tops, and $5 sushi bars.
              </p>
            </div>
            
            {/* Right side - Text */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border-4 border-green-300 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-center mb-4 text-green-700 font-['Comic Neue','Comic Sans MS',cursive]">
                CHAPTER EIGHT:<br />GRATITUDE (AND ABSURDITIES)
              </h2>
              <div className="prose prose-md max-w-md mx-auto">
                <p className="text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">Thank you for—</p>
                <ul className="list-disc pl-6 font-['Comic Neue','Comic Sans MS',cursive]">
                  <li>washing my pans when I make a mess.</li>
                  <li>telling me I have ketchup from eating pizza or ice cream on my face, like a baby racing a half-gallon to catch up with Kimball.</li>
                  <li>stealing my tank tops and saying they're too tight—when really, they just look better on a two-time Classic Physique 1st Place medalist (me, not you!).</li>
                  <li>occasional pizza nights and $5 sushi bars.</li>
                </ul>
                <p className="text-gray-700 mt-4 font-['Comic Neue','Comic Sans MS',cursive]">
                  Thank you for every wild therapy session, pandemic night game, and all the financial messes we unknotted—sometimes wielding sarcasm, sometimes just brute force.
                </p>
                <p className="text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">
                  And for laughter: every time you laugh at my jokes, science says we're both getting healthier—because even one good laugh can send stress packing and add real minutes to your life.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    
    // Conclusion with updated HAPPY COUPLE and logo - UPDATED
    {
      content: (
        <div className="h-full w-full bg-gradient-to-br from-indigo-200 to-purple-200 p-8 flex flex-col items-center justify-center relative">
          {/* Decorative elements */}
          <div className="absolute top-6 left-10 w-16 h-16 text-4xl">🌈</div>
          <div className="absolute bottom-6 right-10 w-16 h-16 text-4xl">🎊</div>
          <div className="absolute top-1/3 right-6 w-12 h-12 text-3xl animate-bounce">💖</div>
          <div className="absolute bottom-1/3 left-6 w-12 h-12 text-3xl animate-spin-slow">🌟</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* Left side - Text */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border-4 border-indigo-300 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-center mb-4 text-indigo-700 font-['Comic Neue','Comic Sans MS',cursive]">
                TOGETHER, WE WON
              </h2>
              <div className="prose prose-lg max-w-md mx-auto text-center">
                <p className="text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">
                  Not at tennis.<br />
                  Not in World of Warcraft.<br />
                  Not at fashion (let's be honest).
                </p>
                <p className="text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">But at the only game that matters.</p>
                <p className="text-2xl font-bold text-indigo-600 font-['Comic Neue','Comic Sans MS',cursive]">
                  Love is love.
                </p>
                <p className="text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">
                  And that's something worth celebrating, every day.
                </p>
                <div className="mt-6 flex justify-center">
                  <SafeIcon icon={FiHeart} className="w-12 h-12 text-rose-500" />
                </div>
              </div>
            </div>
            
            {/* Right side - Final illustration with happy gay couple and rainbow */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-full h-80">
                {/* Final illustration with rainbow hearts and logo */}
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  {/* Sky background */}
                  <defs>
                    <linearGradient id="sky-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#87CEEB" />
                      <stop offset="100%" stopColor="#E0FFFF" />
                    </linearGradient>
                    <linearGradient id="rainbow-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF0018" />
                      <stop offset="16.6%" stopColor="#FFA52C" />
                      <stop offset="33.3%" stopColor="#FFFF00" />
                      <stop offset="50%" stopColor="#00FF00" />
                      <stop offset="66.6%" stopColor="#0000FF" />
                      <stop offset="83.3%" stopColor="#4B0082" />
                      <stop offset="100%" stopColor="#9400D3" />
                    </linearGradient>
                    <linearGradient id="rainbow-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FF0018" />
                      <stop offset="16.6%" stopColor="#FFA52C" />
                      <stop offset="33.3%" stopColor="#FFFF00" />
                      <stop offset="50%" stopColor="#00FF00" />
                      <stop offset="66.6%" stopColor="#0000FF" />
                      <stop offset="83.3%" stopColor="#4B0082" />
                      <stop offset="100%" stopColor="#9400D3" />
                    </linearGradient>
                  </defs>
                  
                  {/* Sky */}
                  <rect x="0" y="0" width="400" height="300" fill="url(#sky-grad)" />
                  
                  {/* Sun */}
                  <circle cx="350" cy="50" r="30" fill="#FFD700" />
                  
                  {/* Grass */}
                  <rect x="0" y="250" width="400" height="50" fill="#228B22" />
                  
                  {/* Rainbow */}
                  <path d="M50,250 Q200,100 350,250" fill="none" stroke="url(#rainbow-grad-1)" strokeWidth="10" strokeLinecap="round" />
                  
                  {/* Home */}
                  <path d="M50,200 L50,150 L100,120 L150,150 L150,200 Z" fill="#D2B48C" stroke="#000000" strokeWidth="2" />
                  <rect x="85" y="170" width="30" height="30" fill="#8B4513" stroke="#000000" strokeWidth="1" />
                  
                  {/* Happy gay couple holding hands */}
                  {/* Character 1 - Vitaly */}
                  <g transform="translate(160, 220)">
                    <circle cx="0" cy="0" r="25" fill="#FFE0B2" stroke="#E65100" strokeWidth="2" /> {/* Head */}
                    <ellipse cx="-10" cy="-5" rx="3" ry="4" fill="#3E2723" /> {/* Left eye */}
                    <ellipse cx="10" cy="-5" rx="3" ry="4" fill="#3E2723" /> {/* Right eye */}
                    <path d="M-10,5 Q0,15 10,5" fill="none" stroke="#E65100" strokeWidth="2" strokeLinecap="round" /> {/* Smile */}
                    <rect x="-20" y="25" width="40" height="50" rx="8" fill="#3F51B5" stroke="#1A237E" strokeWidth="2" /> {/* Body */}
                    <rect x="-20" y="75" width="17" height="30" fill="#7986CB" stroke="#1A237E" strokeWidth="2" /> {/* Left leg */}
                    <rect x="3" y="75" width="17" height="30" fill="#7986CB" stroke="#1A237E" strokeWidth="2" /> {/* Right leg */}
                    <rect x="-40" y="35" width="20" height="8" fill="#FFE0B2" stroke="#E65100" strokeWidth="2" /> {/* Left arm */}
                    <rect x="20" y="35" width="25" height="8" fill="#FFE0B2" stroke="#E65100" strokeWidth="2" /> {/* Right arm extended */}
                  </g>
                  
                  {/* Character 2 - Kimball */}
                  <g transform="translate(240, 220)">
                    <circle cx="0" cy="0" r="25" fill="#FFECB3" stroke="#E65100" strokeWidth="2" /> {/* Head */}
                    <ellipse cx="-10" cy="-5" rx="3" ry="4" fill="#3E2723" /> {/* Left eye */}
                    <ellipse cx="10" cy="-5" rx="3" ry="4" fill="#3E2723" /> {/* Right eye */}
                    <path d="M-10,5 Q0,15 10,5" fill="none" stroke="#E65100" strokeWidth="2" strokeLinecap="round" /> {/* Smile */}
                    <rect x="-20" y="25" width="40" height="50" rx="8" fill="#4CAF50" stroke="#1B5E20" strokeWidth="2" /> {/* Body */}
                    <rect x="-20" y="75" width="17" height="30" fill="#81C784" stroke="#1B5E20" strokeWidth="2" /> {/* Left leg */}
                    <rect x="3" y="75" width="17" height="30" fill="#81C784" stroke="#1B5E20" strokeWidth="2" /> {/* Right leg */}
                    <rect x="-45" y="35" width="25" height="8" fill="#FFECB3" stroke="#E65100" strokeWidth="2" /> {/* Left arm extended */}
                    <rect x="20" y="35" width="20" height="8" fill="#FFECB3" stroke="#E65100" strokeWidth="2" /> {/* Right arm */}
                  </g>
                  
                  {/* Joined hands in the middle */}
                  <circle cx="200" cy="255" r="10" fill="#FFE0B2" stroke="#E65100" strokeWidth="2" />
                  
                  {/* Hearts around the couple */}
                  <g transform="translate(160, 180) scale(0.5)">
                    <path d="M0,0 C-10,-20 -40,0 0,40 C40,0 10,-20 0,0 Z" fill="#E91E63" fillOpacity="0.7" />
                  </g>
                  <g transform="translate(240, 180) scale(0.5)">
                    <path d="M0,0 C10,-20 40,0 0,40 C-40,0 -10,-20 0,0 Z" fill="#E91E63" fillOpacity="0.7" />
                  </g>
                  <g transform="translate(200, 150) scale(0.5)">
                    <path d="M0,0 C-10,-20 -40,0 0,40 C40,0 10,-20 0,0 Z" fill="#E91E63" fillOpacity="0.7" />
                  </g>
                  
                  {/* Stars */}
                  <text x="70" y="100" fill="#FFD700" fontSize="20">★</text>
                  <text x="300" y="120" fill="#FFD700" fontSize="20">★</text>
                  <text x="320" y="180" fill="#FFD700" fontSize="20">★</text>
                </svg>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border-4 border-purple-300">
                <p className="text-center text-gray-700 font-['Comic Neue','Comic Sans MS',cursive]">
                  The end.<br />
                  <em>(Until the next craving—for pizza, or kittens, or just a little more laughter together.)</em>
                </p>
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto mt-4">
                  <img
                    src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753573661471-blob"
                    alt="KV Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
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
                  currentPage === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'bg-amber-500 text-white hover:bg-amber-600'
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
                  currentPage === pages.length - 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'bg-amber-500 text-white hover:bg-amber-600'
                }`}
              >
                <span className="font-['Comic Neue','Comic Sans MS',cursive]">Next Page</span>
                <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
              </button>
            </div>

            {/* Book */}
            <div 
              className={`relative overflow-hidden bg-transparent shadow-2xl rounded-2xl ${isFullscreen ? 'w-full h-full' : ''}`}
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
                  currentPage === 0
                    ? 'bg-gray-100 text-gray-400'
                    : 'bg-amber-500 text-white'
                }`}
              >
                <SafeIcon icon={FiArrowLeft} className="w-6 h-6" />
              </button>
              
              <button
                onClick={goToNextPage}
                disabled={currentPage === pages.length - 1 || isFlipping}
                className={`p-4 rounded-full ${
                  currentPage === pages.length - 1
                    ? 'bg-gray-100 text-gray-400'
                    : 'bg-amber-500 text-white'
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
                <Link to="/" className="inline-flex items-center space-x-2 bg-amber-500 text-white px-6 py-3 rounded-full hover:bg-amber-600 transition-colors font-['Comic Neue','Comic Sans MS',cursive]">
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