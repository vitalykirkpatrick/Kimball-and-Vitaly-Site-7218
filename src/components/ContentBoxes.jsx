import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import ImageModal from './ImageModal';
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
        image: "https://vitalybook.s3.us-west-1.amazonaws.com/KV+Book+Stories+Images/When+All+You+Have+is+an+Emergency+Potato.png"
      },
      {
        icon: "🛏️",
        title: "Love, Flatulence, and Other Escape Plans",
        content: "Love is not candlelit dinners—it's surviving the smoke alarm at midnight and living with the consequences of that one trip to Costco. It's finding someone whose weird matches yours and who laughs with you in the middle of the mess.",
        color: "yellow",
        emoji: "🛏️",
        image: "https://vitalybook.s3.us-west-1.amazonaws.com/KV+Book+Stories+Images/Love%2C+Flatulence%2C+and+Other+Escape+Plans.png"
      },
      {
        icon: "📉",
        title: "How to Lose Six Figures and Still Get a Lift",
        content: "We've had our share of bad investments—crypto, cats, and a timeshare presentation that felt like a hostage situation. But we've also learned that love can pay dividends that no bank could match. The punchline? We're still laughing.",
        color: "blue",
        emoji: "📉",
        image: "https://vitalybook.s3.us-west-1.amazonaws.com/KV+Book+Stories+Images/How+to+Lose+Six+Figures+and+Still+Get+a+Lift.png"
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
        image: "https://vitalybook.s3.us-west-1.amazonaws.com/KV+Book+Stories+Images/The+Potato+That+Started+a+War.png"
      },
      {
        icon: "🎾",
        title: "Marriage, Murder, and the Tennis Score",
        content: "Every serve became a test of endurance—emotional, physical, and marital. Kimball claimed \"love\" on the scoreboard; I called it psychological warfare. By the end, we'd invented our own version of tennis, complete with sabotage, snacks, and a loser who always ends up doing the dishes.",
        color: "yellow",
        emoji: "🎾",
        image: "https://vitalybook.s3.us-west-1.amazonaws.com/KV+Book+Stories+Images/Marriage%2C+Murder%2C+and+the+Tennis+Score.png"
      },
      {
        icon: "🧾",
        title: "Turning Debt Into a Love Story",
        content: "We flirted with bankruptcy, wrestled bad investments, and tested the limits of credit card companies' patience. Somewhere in the chaos, we learned financial ruin is survivable—if your partner brings snacks, laughter, and just enough denial to make it feel like an adventure instead of a disaster.",
        color: "blue",
        emoji: "🧾",
        image: "https://vitalybook.s3.us-west-1.amazonaws.com/KV+Book+Stories+Images/Turning+Debt+Into+a+Love+Story.png"
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
        image: "https://vitalybook.s3.us-west-1.amazonaws.com/KV+Book+Stories+Images/The+Suitcase+That+Nearly+Killed+Me.png"
      },
      {
        icon: "🥞",
        title: "Pancakes, Therapy, and Other Weapons",
        content: "We've survived couples therapy, suspicious mattress purchases, and breakfast food sabotage. In our house, the real war isn't over bills—it's over the last pancake. Whoever wins gets bragging rights, whoever loses gets the syrup… and sometimes, the syrup is the real trophy.",
        color: "yellow",
        emoji: "🥞",
        image: "https://vitalybook.s3.us-west-1.amazonaws.com/KV+Book+Stories+Images/Pancakes%2C+Therapy%2C+and+Other+Weapons.png"
      },
      {
        icon: "💸",
        title: "How to Fail Big and Stay Married",
        content: "We lost six figures, gained a collection of inside jokes, and somehow didn't kill each other. Some call it financial disaster. We call it Tuesday. And the only thing better than surviving it once… is realizing you'll probably survive it again.",
        color: "blue",
        emoji: "💸",
        image: "https://vitalybook.s3.us-west-1.amazonaws.com/KV+Book+Stories+Images/How+to+Fail+Big+and+Stay+Married.png"
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
        image: "https://vitalybook.s3.us-west-1.amazonaws.com/KV+Book+Stories+Images/Finding+Home+in+Strange+Places.png"
      },
      {
        icon: "🐈",
        title: "Cats, Snacks, and Midnight Treaties",
        content: "We never kept a cat, but we kept the snack wars going strong. Love, it turns out, is knowing your partner's hiding spot and raiding it anyway. Midnight treaties were signed in cookies, and peace was broken over ice cream—every single time.",
        color: "yellow",
        emoji: "🐈",
        image: "https://vitalybook.s3.us-west-1.amazonaws.com/KV+Book+Stories+Images/Cats%2C+Snacks%2C+and+Midnight+Treaties.png"
      },
      {
        icon: "💌",
        title: "Love Notes We Never Delivered",
        content: "Some words are too ridiculous, too sweet, or too incriminating to send. Lucky for you, we kept them all—scribbled on receipts, takeout menus, and the backs of grocery lists. They're proof that sometimes the funniest, rawest truths are the ones that never leave your kitchen drawer.",
        color: "blue",
        emoji: "💌",
        image: "https://vitalybook.s3.us-west-1.amazonaws.com/KV+Book+Stories+Images/Love+Notes+We+Never+Delivered.png"
      }
    ]
  ];

  // State for current content set and selected image for modal
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [isRotatingAll, setIsRotatingAll] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Choose a random content set on initial load
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * contentSets.length);
    setCurrentSetIndex(randomIndex);
  }, []);

  // Function to manually rotate through content sets
  const rotateContentSet = () => {
    setIsRotatingAll(true);
    setTimeout(() => {
      setCurrentSetIndex((prevIndex) => (prevIndex + 1) % contentSets.length);
      setIsRotatingAll(false);
    }, 300);
  };

  // Function to open image in modal
  const openImageModal = (item) => {
    setSelectedImage({
      src: item.image,
      title: item.title,
      description: item.content
    });
  };

  // Function to close image modal
  const closeImageModal = () => {
    setSelectedImage(null);
  };

  // Get the current content set
  const currentSet = contentSets[currentSetIndex];

  return (
    <>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {currentSet.map((item, index) => {
          return (
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
              onClick={() => openImageModal(item)}
            >
              {/* Background image */}
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              />

              {/* Card content with more transparent overlay */}
              <div className="p-6 flex flex-col flex-grow relative z-10 items-center justify-center h-full">
                <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center w-full max-w-md mx-auto shadow-lg h-full">
                  <div className="text-4xl mb-4">{item.emoji}</div>
                  <div className="flex-grow flex flex-col justify-between">
                    <div className="text-center">
                      <h3 className="text-xl font-medium mb-3 text-stone-800">
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
          );
        })}

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

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal 
          image={selectedImage} 
          onClose={closeImageModal}
        />
      )}
    </>
  );
};

export default ContentBoxes;