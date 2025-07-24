import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCalendar, FiHeart, FiArrowRight } = FiIcons;

const CountdownTimer = ({ targetDate, title, showCta = false }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDateTime = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = targetDateTime - now;

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        };
      } else {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [targetDate]);

  // Pride colors for the hearts
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
    <div className="relative p-8 md:p-10 rounded-2xl text-center shadow-lg overflow-hidden bg-white border-2 border-indigo-300">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Floating hearts */}
        {heartColors.map((color, index) => (
          <div 
            key={index}
            className={`absolute animate-float-${index % 3 === 0 ? 'slow' : index % 3 === 1 ? 'medium' : 'fast'} opacity-10 ${
              index % 2 === 0 ? 'top-' + (index + 1) * 5 : 'bottom-' + (index + 1) * 5
            } ${
              index < 3 ? 'left-1/' + (index + 2) : 'right-1/' + (7 - index)
            }`}
          >
            <SafeIcon icon={FiHeart} className={`w-10 h-10 ${color}`} />
          </div>
        ))}

        {/* Floating flowers */}
        <div className="absolute animate-spin-slow opacity-10 top-10 right-10">
          <div className="w-16 h-16 text-4xl">🌸</div>
        </div>
        <div className="absolute animate-spin-medium opacity-10 bottom-20 left-20">
          <div className="w-14 h-14 text-4xl">🌺</div>
        </div>

        {/* Floating balloons */}
        {[1, 2].map((i) => (
          <div 
            key={i}
            className="absolute animate-float-slow opacity-10"
            style={{
              top: i === 1 ? '5%' : 'auto',
              bottom: i === 2 ? '5%' : 'auto',
              right: i === 1 ? '33%' : 'auto',
              left: i === 2 ? '25%' : 'auto'
            }}
          >
            <div className="w-20 h-28">
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <defs>
                  <linearGradient id={`rainbow-balloon-ct-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={i === 1 ? "#FF0018" : "#86007D"} />
                    <stop offset="16%" stopColor={i === 1 ? "#FFA52C" : "#0000F9"} />
                    <stop offset="32%" stopColor={i === 1 ? "#FFFF41" : "#008018"} />
                    <stop offset="48%" stopColor={i === 1 ? "#008018" : "#FFFF41"} />
                    <stop offset="66%" stopColor={i === 1 ? "#0000F9" : "#FFA52C"} />
                    <stop offset="83%" stopColor={i === 1 ? "#86007D" : "#FF0018"} />
                    <stop offset="100%" stopColor={i === 1 ? "#FF0018" : "#86007D"} />
                  </linearGradient>
                </defs>
                <path d="M12,2C8.13,2 5,5.13 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9C19,5.13 15.87,2 12,2Z" fill={`url(#rainbow-balloon-ct-${i})`} />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <SafeIcon icon={FiCalendar} className="w-6 h-6 text-indigo-500" />
          <h2 className="text-2xl md:text-3xl font-serif text-stone-800">{title}</h2>
        </div>
        <p className="text-lg mb-8 text-stone-600">
          Join us in honoring our journey of love on {targetDate}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="border-2 border-indigo-300 p-4 rounded-lg bg-gradient-to-b from-white to-blue-50">
            <div className="text-4xl font-bold text-stone-800">{timeLeft.days}</div>
            <div className="text-sm text-stone-600">Days</div>
          </div>
          <div className="border-2 border-indigo-300 p-4 rounded-lg bg-gradient-to-b from-white to-purple-50">
            <div className="text-4xl font-bold text-stone-800">{timeLeft.hours}</div>
            <div className="text-sm text-stone-600">Hours</div>
          </div>
          <div className="border-2 border-indigo-300 p-4 rounded-lg bg-gradient-to-b from-white to-yellow-50">
            <div className="text-4xl font-bold text-stone-800">{timeLeft.minutes}</div>
            <div className="text-sm text-stone-600">Minutes</div>
          </div>
          <div className="border-2 border-indigo-300 p-4 rounded-lg bg-gradient-to-b from-white to-pink-50">
            <div className="text-4xl font-bold text-stone-800">{timeLeft.seconds}</div>
            <div className="text-sm text-stone-600">Seconds</div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center">
          <div className="flex space-x-1">
            {heartColors.map((color, index) => (
              <SafeIcon 
                key={index}
                icon={FiHeart} 
                className={`w-5 h-5 ${color} animate-pulse`} 
                style={{ animationDelay: `${index * 0.2}s` }}
              />
            ))}
          </div>
          <span className="ml-2 text-stone-600 italic">Until our anniversary celebration</span>
        </div>

        {showCta && (
          <div className="mt-8">
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('signup-section').scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-8 py-3 rounded-full hover:opacity-90 transition-colors"
            >
              <span className="font-medium">Join Our Celebration</span>
              <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;