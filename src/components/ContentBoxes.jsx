import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiRefreshCw } = FiIcons;

const ContentBoxes = () => {
  // Content sets that will rotate
  const contentSets = [
    // Set 1
    [
      {
        icon: "🍳",
        title: "When All You Have is an Emergency Potato",
        content: "A Ukrainian orphan with one emergency potato. A BYU student fluent in Japanese and modesty rules. From awkward movie nights to surviving IKEA meltdowns, this is the story of how two very different men learned that something outrageously real is the whole story. You'll have to hear it to believe it.",
        color: "red",
        emoji: "🍳",
      },
      {
        icon: "🛏️",
        title: "Love, Flatulence, and Other Escape Plans",
        content: "Love is not candlelit dinners—it's surviving the smoke alarm at midnight and living with the consequences of that one trip to Costco. It's finding someone whose weird matches yours and who laughs with you in the middle of the mess.",
        color: "yellow",
        emoji: "🛏️",
      },
      {
        icon: "📉",
        title: "How to Lose Six Figures and Still Get a Lift",
        content: "We've had our share of bad investments—crypto, cats, and a timeshare presentation that felt like a hostage situation. But we've also learned that love can pay dividends that no bank could match. The punchline? We're still laughing.",
        color: "blue",
        emoji: "📉",
      }
    ],
    // Set 2 - "Quiet Chaos, Loud Love"
    [
      {
        icon: "🥔",
        title: "The Potato That Started a War",
        content: "It began with one suspicious potato, a suitcase that barely closed, and two stubborn men trying to share a life without killing each other. We didn't know if we were building a love story or a crime scene. Somehow, we ended up with both—and neither of us will admit who started it.",
        color: "red",
        emoji: "🥔",
      },
      {
        icon: "🎾",
        title: "Marriage, Murder, and the Tennis Score",
        content: "Every serve became a test of endurance—emotional, physical, and marital. Kimball claimed \"love\" on the scoreboard; I called it psychological warfare. By the end, we'd invented our own version of tennis, complete with sabotage, snacks, and a loser who always ends up doing the dishes.",
        color: "yellow",
        emoji: "🎾",
      },
      {
        icon: "🧾",
        title: "Turning Debt Into a Love Story",
        content: "We flirted with bankruptcy, wrestled bad investments, and tested the limits of credit card companies' patience. Somewhere in the chaos, we learned financial ruin is survivable—if your partner brings snacks, laughter, and just enough denial to make it feel like an adventure instead of a disaster.",
        color: "blue",
        emoji: "🧾",
      }
    ],
    // Set 3 - "Emotions in Disguise"
    [
      {
        icon: "📦",
        title: "The Suitcase That Nearly Killed Me",
        content: "Fifty pounds of chaos, an \"emergency\" potato, and a bandura that could double as medieval weaponry—that's how my fresh start began. Between luggage fees, awkward stares, and cultural whiplash, I learned that survival means traveling light… but also never letting go of the one thing that makes you feel at home.",
        color: "red",
        emoji: "📦",
      },
      {
        icon: "🥞",
        title: "Pancakes, Therapy, and Other Weapons",
        content: "We've survived couples therapy, suspicious mattress purchases, and breakfast food sabotage. In our house, the real war isn't over bills—it's over the last pancake. Whoever wins gets bragging rights, whoever loses gets the syrup… and sometimes, the syrup is the real trophy.",
        color: "yellow",
        emoji: "🥞",
      },
      {
        icon: "💸",
        title: "How to Fail Big and Stay Married",
        content: "We lost six figures, gained a collection of inside jokes, and somehow didn't kill each other. Some call it financial disaster. We call it Tuesday. And the only thing better than surviving it once… is realizing you'll probably survive it again.",
        color: "blue",
        emoji: "💸",
      }
    ],
    // Set 4 - "The Wild & The Weird"
    [
      {
        icon: "🚪",
        title: "Finding Home in Strange Places",
        content: "From borrowed couches to mortgage paperwork nightmares, we built a home out of the least romantic ingredients possible. It wasn't always pretty, but somewhere between IKEA despair and mismatched paint samples, we found something that sparkled—mostly because glitter is impossible to clean up.",
        color: "red",
        emoji: "🚪",
      },
      {
        icon: "🐈",
        title: "Cats, Snacks, and Midnight Treaties",
        content: "We never kept a cat, but we kept the snack wars going strong. Love, it turns out, is knowing your partner's hiding spot and raiding it anyway. Midnight treaties were signed in cookies, and peace was broken over ice cream—every single time.",
        color: "yellow",
        emoji: "🐈",
      },
      {
        icon: "💌",
        title: "Love Notes We Never Delivered",
        content: "Some words are too ridiculous, too sweet, or too incriminating to send. Lucky for you, we kept them all—scribbled on receipts, takeout menus, and the backs of grocery lists. They're proof that sometimes the funniest, rawest truths are the ones that never leave your kitchen drawer.",
        color: "blue",
        emoji: "💌",
      }
    ]
  ];

  // State for current content set
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [isRotatingAll, setIsRotatingAll] = useState(false);
  const [backgroundAssignments, setBackgroundAssignments] = useState([0, 1, 2]);

  // Choose a random content set on initial load and randomize backgrounds
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * contentSets.length);
    setCurrentSetIndex(randomIndex);
    randomizeBackgrounds();
  }, []);

  // Function to randomize background patterns
  const randomizeBackgrounds = () => {
    const indices = [0, 1, 2];
    // Fisher-Yates shuffle algorithm
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setBackgroundAssignments(indices);
  };

  // Function to manually rotate through content sets
  const rotateContentSet = () => {
    setIsRotatingAll(true);
    
    setTimeout(() => {
      setCurrentSetIndex((prevIndex) => (prevIndex + 1) % contentSets.length);
      randomizeBackgrounds(); // Randomize backgrounds on rotation
      setIsRotatingAll(false);
    }, 300);
  };

  // Get the current content set
  const currentSet = contentSets[currentSetIndex];

  // Background patterns for the boxes
  const backgroundPatterns = [
    // First box - Confetti pattern
    `
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="confetti-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <g class="confetti-group">
            <circle cx="15" cy="25" r="3" fill="#FF0018" opacity="0.5">
              <animate attributeName="cy" values="25;35;25" dur="4s" repeatCount="indefinite" />
            </circle>
            <rect x="45" y="15" width="5" height="5" fill="#FFA52C" opacity="0.5" transform="rotate(30 45 15)">
              <animate attributeName="y" values="15;25;15" dur="5s" repeatCount="indefinite" />
            </rect>
            <circle cx="65" cy="65" r="4" fill="#FFFF41" opacity="0.5">
              <animate attributeName="cy" values="65;75;65" dur="3s" repeatCount="indefinite" />
            </circle>
            <rect x="85" y="35" width="4" height="4" fill="#008018" opacity="0.5" transform="rotate(45 85 35)">
              <animate attributeName="y" values="35;45;35" dur="6s" repeatCount="indefinite" />
            </rect>
            <circle cx="25" cy="75" r="3" fill="#0000F9" opacity="0.5">
              <animate attributeName="cy" values="75;85;75" dur="5s" repeatCount="indefinite" />
            </circle>
            <rect x="55" y="55" width="6" height="6" fill="#86007D" opacity="0.5" transform="rotate(60 55 55)">
              <animate attributeName="y" values="55;65;55" dur="4s" repeatCount="indefinite" />
            </rect>
            <circle cx="35" cy="45" r="2" fill="#FF0018" opacity="0.5">
              <animate attributeName="cy" values="45;55;45" dur="7s" repeatCount="indefinite" />
            </circle>
            <rect x="75" y="85" width="3" height="3" fill="#FFA52C" opacity="0.5" transform="rotate(15 75 85)">
              <animate attributeName="y" values="85;95;85" dur="3s" repeatCount="indefinite" />
            </rect>
          </g>
        </pattern>
        <linearGradient id="bg-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FF0018" stop-opacity="0.7" />
          <stop offset="50%" stop-color="#FFA52C" stop-opacity="0.7" />
          <stop offset="100%" stop-color="#FFFF41" stop-opacity="0.7" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-gradient-1)" />
      <rect width="100%" height="100%" fill="url(#confetti-pattern)" />
      <g class="floating-circles">
        <circle cx="20%" cy="20%" r="40" fill="#FF0018" opacity="0.2">
          <animate attributeName="cy" values="20%;25%;20%" dur="7s" repeatCount="indefinite" />
        </circle>
        <circle cx="80%" cy="60%" r="60" fill="#FFA52C" opacity="0.2">
          <animate attributeName="cy" values="60%;65%;60%" dur="8s" repeatCount="indefinite" />
        </circle>
        <circle cx="40%" cy="80%" r="50" fill="#FFFF41" opacity="0.2">
          <animate attributeName="cy" values="80%;85%;80%" dur="6s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
    `,
    // Second box - Flowing ribbons
    `
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#008018" stop-opacity="0.7" />
          <stop offset="50%" stop-color="#0000F9" stop-opacity="0.7" />
          <stop offset="100%" stop-color="#86007D" stop-opacity="0.7" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-gradient-2)" />
      <g class="flowing-ribbons">
        <path d="M-100,100 C50,80 100,150 300,100 S400,150 600,100" stroke="#0000F9" stroke-width="15" fill="none" opacity="0.3">
          <animate attributeName="d" values="M-100,100 C50,80 100,150 300,100 S400,150 600,100;M-100,120 C50,100 100,170 300,120 S400,170 600,120;M-100,100 C50,80 100,150 300,100 S400,150 600,100" dur="10s" repeatCount="indefinite" />
        </path>
        <path d="M-100,200 C100,150 200,250 300,200 S500,150 600,200" stroke="#86007D" stroke-width="20" fill="none" opacity="0.3">
          <animate attributeName="d" values="M-100,200 C100,150 200,250 300,200 S500,150 600,200;M-100,220 C100,170 200,270 300,220 S500,170 600,220;M-100,200 C100,150 200,250 300,200 S500,150 600,200" dur="12s" repeatCount="indefinite" />
        </path>
        <path d="M-100,300 C50,270 150,330 300,300 S450,270 600,300" stroke="#008018" stroke-width="25" fill="none" opacity="0.3">
          <animate attributeName="d" values="M-100,300 C50,270 150,330 300,300 S450,270 600,300;M-100,320 C50,290 150,350 300,320 S450,290 600,320;M-100,300 C50,270 150,330 300,300 S450,270 600,300" dur="14s" repeatCount="indefinite" />
        </path>
      </g>
      <g class="floating-shapes">
        <circle cx="30%" cy="30%" r="30" fill="#008018" opacity="0.2">
          <animate attributeName="cy" values="30%;35%;30%" dur="9s" repeatCount="indefinite" />
        </circle>
        <rect x="70%" y="20%" width="60" height="60" fill="#0000F9" opacity="0.2" rx="10">
          <animate attributeName="y" values="20%;25%;20%" dur="8s" repeatCount="indefinite" />
        </rect>
        <circle cx="20%" cy="70%" r="40" fill="#86007D" opacity="0.2">
          <animate attributeName="cy" values="70%;75%;70%" dur="7s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
    `,
    // Third box - Abstract waves
    `
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-gradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FF0018" stop-opacity="0.7" />
          <stop offset="33%" stop-color="#0000F9" stop-opacity="0.7" />
          <stop offset="66%" stop-color="#86007D" stop-opacity="0.7" />
          <stop offset="100%" stop-color="#FFA52C" stop-opacity="0.7" />
        </linearGradient>
        <pattern id="dots-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="2" fill="#FFFFFF" opacity="0.2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-gradient-3)" />
      <rect width="100%" height="100%" fill="url(#dots-pattern)" />
      <g class="wave-group">
        <path d="M0,50 Q60,100 120,50 T240,50 T360,50 T480,50 T600,50" stroke="#FFFFFF" stroke-width="8" fill="none" opacity="0.2">
          <animate attributeName="d" values="M0,50 Q60,100 120,50 T240,50 T360,50 T480,50 T600,50;M0,50 Q60,0 120,50 T240,50 T360,50 T480,50 T600,50;M0,50 Q60,100 120,50 T240,50 T360,50 T480,50 T600,50" dur="10s" repeatCount="indefinite" />
        </path>
        <path d="M0,150 Q60,200 120,150 T240,150 T360,150 T480,150 T600,150" stroke="#FFFFFF" stroke-width="8" fill="none" opacity="0.2">
          <animate attributeName="d" values="M0,150 Q60,200 120,150 T240,150 T360,150 T480,150 T600,150;M0,150 Q60,100 120,150 T240,150 T360,150 T480,150 T600,150;M0,150 Q60,200 120,150 T240,150 T360,150 T480,150 T600,150" dur="12s" repeatCount="indefinite" />
        </path>
        <path d="M0,250 Q60,300 120,250 T240,250 T360,250 T480,250 T600,250" stroke="#FFFFFF" stroke-width="8" fill="none" opacity="0.2">
          <animate attributeName="d" values="M0,250 Q60,300 120,250 T240,250 T360,250 T480,250 T600,250;M0,250 Q60,200 120,250 T240,250 T360,250 T480,250 T600,250;M0,250 Q60,300 120,250 T240,250 T360,250 T480,250 T600,250" dur="14s" repeatCount="indefinite" />
        </path>
      </g>
      <g class="floating-elements">
        <circle cx="25%" cy="25%" r="20" fill="#FFFFFF" opacity="0.2">
          <animate attributeName="cy" values="25%;30%;25%" dur="7s" repeatCount="indefinite" />
        </circle>
        <circle cx="75%" cy="65%" r="30" fill="#FFFFFF" opacity="0.2">
          <animate attributeName="cy" values="65%;70%;65%" dur="9s" repeatCount="indefinite" />
        </circle>
        <circle cx="50%" cy="85%" r="25" fill="#FFFFFF" opacity="0.2">
          <animate attributeName="cy" values="85%;90%;85%" dur="8s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
    `
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {currentSet.map((item, index) => (
        <motion.div
          key={`${currentSetIndex}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 * index, duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-2xl shadow-md border-2 border-indigo-100 flex flex-col overflow-hidden cursor-pointer relative"
          style={{ height: "500px" }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Rainbow-inspired animated background - use randomized assignment */}
          <div
            className="absolute inset-0 z-0"
            dangerouslySetInnerHTML={{ __html: backgroundPatterns[backgroundAssignments[index]] }}
          />
          
          {/* Card content */}
          <div className="p-6 flex flex-col flex-grow relative z-10 items-center justify-center h-full">
            <div className="bg-white p-6 rounded-xl flex flex-col items-center w-full max-w-md mx-auto shadow-lg h-full">
              <div className="text-4xl mb-4">{item.emoji}</div>
              <div className="flex-grow flex flex-col justify-between">
                <div className="text-center">
                  <h3 className={`text-xl font-medium mb-3 text-stone-800`}>
                    {item.title}
                  </h3>
                  <p className="text-stone-700 leading-relaxed text-sm">
                    {item.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Button to rotate all cards at once */}
      <div className="md:col-span-3 flex justify-center mt-4">
        <button
          onClick={rotateContentSet}
          className="flex items-center space-x-2 text-sm text-indigo-600 hover:text-indigo-800 bg-white border border-indigo-300 rounded-full px-4 py-2 transition-colors"
        >
          <SafeIcon icon={FiRefreshCw} className="w-4 h-4" />
          <span>Show different stories</span>
        </button>
      </div>
    </div>
  );
};

export default ContentBoxes;