import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import CountdownTimer from '../components/CountdownTimer';
import SafeIcon from '../common/SafeIcon';
import Footer from '../components/Footer';
import AnniversarySignup from '../components/AnniversarySignup';
import ImageModal from '../components/ImageModal';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiGlobe, FiHome, FiStar, FiCalendar, FiMapPin, FiX, FiArrowDown, FiUsers, FiArrowRight, FiAward, FiBookOpen } = FiIcons;

const Story = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  const heartColors = [
    'text-red-500',
    'text-orange-500',
    'text-yellow-500',
    'text-green-500',
    'text-blue-500',
    'text-indigo-500',
    'text-violet-500'
  ];

  const milestones = [
    {
      year: "2006",
      date: "May 15, 2006",
      title: "The Beginning",
      description: "We met online and then went together to our first movie night—'She's the Man' at a $1 theater in Provo (because we were broke college students). We also attended Family Home Evening with Affirmation, a group for gay Mormon people navigating faith and identity.",
      icon: FiHeart,
      color: "red",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      year: "2006",
      date: "June 2006",
      title: "Moving In Together",
      description: "I moved into the basement room at 746 E 30 N in Orem while Kimball was away in Colorado for the summer. When he returned, we officially began living together. (And learned that sharing a bathroom requires serious negotiation skills.)",
      icon: FiHome,
      color: "orange",
      image: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753370717696-Kimball%20and%20Vitaly%20Engagement%202008_28.jpg"
    },
    {
      year: "2008",
      date: "February 14, 2008",
      title: "The Proposal",
      description: "On Valentine's Day, Kimball proposed. Despite the legal barriers at the time, we committed to building a life together. (I said yes, obviously, though I was so nervous I probably said it in Ukrainian first.)",
      icon: FiHeart,
      color: "yellow",
      image: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753370695404-Kimball%20and%20Vitaly%20Engagement%202008_09.jpg"
    },
    {
      year: "2008",
      date: "August 15, 2008",
      title: "Our Wedding",
      description: "On August 15, 2008, we held our commitment ceremony in San Diego. Though not legally recognized at the time, we exchanged vows and rings in front of our closest friends. (And I managed to get through my poem without crying... much.)",
      icon: FiStar,
      color: "green",
      image: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753370726823-Kimball%20and%20Vitaly%20Engagement%202008_34.jpg"
    },
    {
      year: "2009",
      date: "April 2009",
      title: "Computer Science Degree",
      description: "A major milestone for me: graduating from Utah Valley University with a degree in Computer Science. Kimball supported me through endless late-night coding sessions and practice presentations. This degree opened doors that seemed impossible for an orphan immigrant.",
      icon: FiBookOpen,
      color: "blue",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      year: "2008",
      date: "November 2008",
      title: "First Home Purchase",
      description: "We bought our first townhome together at 1174 W 230 S in Orem, building equity and establishing our future. It was a huge step for me as an immigrant on an H-1B visa. (And we learned that homeownership means everything breaks at the worst possible time.)",
      icon: FiHome,
      color: "blue",
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      year: "2015",
      date: "June 26, 2015",
      title: "Legal Marriage",
      description: "When the Supreme Court legalized same-sex marriage nationwide, our commitment was finally recognized legally after years of fighting for equal rights. (Only took the government 7 years to catch up to what we already knew.)",
      icon: FiHeart,
      color: "indigo",
      image: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753370742843-Kimball%20and%20Vitaly%20Engagement%202008_36.jpg"
    },
    {
      year: "2016",
      date: "August 2016",
      title: "MBA Graduation",
      description: "Another educational milestone: completing my MBA at the University of Utah. This achievement represented not just academic growth but the culmination of years adapting to a new culture and language. It was during this program that my nickname 'Wisey' was born from a misread nametag.",
      icon: FiAward,
      color: "red",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      year: "2016",
      date: "March 2016",
      title: "Salt Lake City Move",
      description: "We purchased a townhome in Salt Lake City, marking a new chapter in our lives and expanding our horizons beyond Utah County. (Bigger city, bigger dreams, same terrible jokes.)",
      icon: FiMapPin,
      color: "violet",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      year: "2017",
      date: "November 2017",
      title: "U.S. Citizenship",
      description: "After years of paperwork, interviews, and uncertainty, I finally became a U.S. citizen. From orphan to immigrant to citizen - a journey made possible by love, perseverance, and Kimball's unwavering support through the complex immigration process.",
      icon: FiGlobe,
      color: "indigo",
      image: "https://images.unsplash.com/photo-1531953736293-0119c712d84a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      year: "2020",
      date: "March 2020",
      title: "Weathering Storms",
      description: "Through financial crises, pandemic isolation, and personal setbacks, our bond grew even stronger as we faced challenges together. (We survived being stuck in the house together for months. That's true love.)",
      icon: FiGlobe,
      color: "red",
      image: "https://images.unsplash.com/photo-1542596594-649edbc13630?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      year: "2026",
      date: "May 15, 2026",
      title: "20 Years Together",
      description: "We'll be celebrating two decades of choosing each other every day, through every triumph and challenge. (And we're still not tired of each other's company. Much.)",
      icon: FiHeart,
      color: "red",
      image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    }
  ];

  const handleMilestoneClick = (milestone) => {
    setSelectedMilestone(milestone);
  };

  const handleImageClick = (image) => {
    setSelectedImage({
      src: image,
      title: "Our Journey",
      description: "A special moment in our journey together"
    });
  };

  // Enhanced decorative elements for more visual interest throughout the page
  const decorativeElements = [
    // Right side elements (added more)
    { type: "flower", position: "top-1/6 right-1/12", size: "w-16 h-16", rotation: 45, emoji: "🌸" },
    { type: "flower", position: "top-1/4 right-1/8", size: "w-20 h-20", rotation: 60, emoji: "🌸" },
    { type: "flower", position: "top-1/3 right-1/6", size: "w-18 h-18", rotation: 90, emoji: "🌸" },
    { type: "flower", position: "top-1/2 right-1/8", size: "w-16 h-16", rotation: 30, emoji: "🌸" },
    { type: "flower", position: "top-2/3 right-1/12", size: "w-14 h-14", rotation: 120, emoji: "🌸" },
    { type: "flower", position: "bottom-1/4 right-1/6", size: "w-18 h-18", rotation: -60, emoji: "🌺" },
    { type: "flower", position: "bottom-1/3 right-1/8", size: "w-14 h-14", rotation: 30, emoji: "🌸" },
    
    // Left side elements
    { type: "flower", position: "top-1/5 left-1/12", size: "w-14 h-14", rotation: -30, emoji: "🌺" },
    { type: "flower", position: "top-2/5 left-1/10", size: "w-12 h-12", rotation: -45, emoji: "🌺" },
    { type: "flower", position: "top-3/5 left-1/12", size: "w-16 h-16", rotation: -60, emoji: "🌺" },
    { type: "flower", position: "bottom-1/4 left-1/8", size: "w-20 h-20", rotation: -90, emoji: "🌺" },
    { type: "flower", position: "bottom-1/6 left-1/16", size: "w-16 h-16", rotation: -120, emoji: "🌺" },
    
    // Hearts (added more)
    { type: "heart", position: "top-1/4 left-1/20", color: "text-red-500", size: "w-10 h-10" },
    { type: "heart", position: "top-1/3 right-1/20", color: "text-pink-500", size: "w-12 h-12" },
    { type: "heart", position: "top-1/2 left-1/16", color: "text-purple-500", size: "w-8 h-8" },
    { type: "heart", position: "top-2/3 right-1/16", color: "text-blue-500", size: "w-14 h-14" },
    { type: "heart", position: "bottom-1/3 left-1/20", color: "text-green-500", size: "w-10 h-10" },
    { type: "heart", position: "bottom-1/4 right-1/20", color: "text-yellow-500", size: "w-12 h-12" },
    { type: "heart", position: "top-3/4 right-1/8", color: "text-indigo-500", size: "w-9 h-9" },
    { type: "heart", position: "bottom-1/2 right-1/12", color: "text-rose-500", size: "w-11 h-11" },
    { type: "heart", position: "top-2/5 right-1/5", color: "text-emerald-500", size: "w-10 h-10" },
    { type: "heart", position: "bottom-3/5 left-1/8", color: "text-amber-500", size: "w-13 h-13" },
    
    // Balloons (distributed evenly)
    { type: "balloon", position: "top-1/8 right-1/6", gradient: "rainbow-balloon-story1", size: "w-16 h-24" },
    { type: "balloon", position: "top-1/4 left-1/6", gradient: "rainbow-balloon-story2", size: "w-14 h-20" },
    { type: "balloon", position: "top-3/8 right-1/8", gradient: "rainbow-balloon-story3", size: "w-18 h-26" },
    { type: "balloon", position: "top-1/2 left-1/8", gradient: "rainbow-balloon-story4", size: "w-12 h-18" },
    { type: "balloon", position: "top-5/8 right-1/6", gradient: "rainbow-balloon-story5", size: "w-16 h-24" },
    { type: "balloon", position: "bottom-1/3 left-1/6", gradient: "rainbow-balloon-story6", size: "w-14 h-20" },
    { type: "balloon", position: "bottom-1/4 right-1/8", gradient: "rainbow-balloon-story7", size: "w-18 h-26" },
    { type: "balloon", position: "bottom-1/6 left-1/8", gradient: "rainbow-balloon-story8", size: "w-12 h-18" },
    { type: "balloon", position: "top-2/3 right-1/4", gradient: "rainbow-balloon-story9", size: "w-15 h-22" },
    { type: "balloon", position: "bottom-2/5 right-1/5", gradient: "rainbow-balloon-story10", size: "w-13 h-19" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 relative overflow-hidden">
      <Navigation />
      
      {/* Enhanced Decorative Elements */}
      {heartColors.map((color, index) => (
        <motion.div
          key={`heart-${index}`}
          className={`absolute ${index % 2 === 0 ? 'top-1/4' : 'bottom-1/4'} ${
            index < 3 ? 'left-1/' + (index + 2) : 'right-1/' + (7 - index)
          } w-16 h-16 ${color} opacity-20 z-10`}
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

      {/* Additional enhanced decorative elements */}
      {decorativeElements.map((elem, idx) => {
        if (elem.type === "flower") {
          return (
            <motion.div
              key={`decor-${idx}`}
              className={`absolute ${elem.position} ${elem.size} opacity-25 z-20`}
              style={{ transform: `rotate(${elem.rotation}deg)` }}
              animate={{
                rotate: [elem.rotation, elem.rotation + 360],
                scale: [1, 1.15, 1, 0.85, 1]
              }}
              transition={{ repeat: Infinity, duration: 25 + idx * 3, ease: "linear" }}
            >
              <div className="text-4xl drop-shadow-sm">{elem.emoji}</div>
            </motion.div>
          );
        } else if (elem.type === "heart") {
          return (
            <motion.div
              key={`decor-${idx}`}
              className={`absolute ${elem.position} ${elem.size} ${elem.color} opacity-25 z-15`}
              animate={{
                rotate: [0, 15, 0, -15, 0],
                y: [0, -12, 0, 12, 0],
                scale: [1, 1.1, 1, 0.9, 1]
              }}
              transition={{ repeat: Infinity, duration: 18 + idx, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="drop-shadow-sm">
                <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
              </svg>
            </motion.div>
          );
        } else if (elem.type === "balloon") {
          return (
            <motion.div
              key={`decor-${idx}`}
              className={`absolute ${elem.position} ${elem.size} opacity-25 z-10`}
              animate={{
                y: [0, -12, 0, -8, 0],
                rotate: [0, 8, 0, -8, 0]
              }}
              transition={{ repeat: Infinity, duration: 20 + idx, ease: "easeInOut" }}
            >
              <div className="w-full h-full drop-shadow-sm">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <defs>
                    <linearGradient id={elem.gradient} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#86007D" />
                      <stop offset="16%" stopColor="#0000F9" />
                      <stop offset="32%" stopColor="#008018" />
                      <stop offset="48%" stopColor="#FFFF41" />
                      <stop offset="66%" stopColor="#FFA52C" />
                      <stop offset="83%" stopColor="#FF0018" />
                      <stop offset="100%" stopColor="#86007D" />
                    </linearGradient>
                  </defs>
                  <path d="M12,2C8.13,2 5,5.13 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9C19,5.13 15.87,2 12,2Z" fill={`url(#${elem.gradient})`} />
                </svg>
              </div>
            </motion.div>
          );
        }
        return null;
      })}

      <div className="pt-32 pb-16 relative z-30">
        {/* Gold rings separator */}
        <div className="flex justify-center mb-8">
          <div className="relative w-40 h-20 opacity-80">
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2 w-20 h-20 rounded-full border-4 border-yellow-500 shadow-lg" style={{
              background: "linear-gradient(135deg, #ffd700, #b8860b)",
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.3), 0 0 15px rgba(255,215,0,0.5)",
              transform: "perspective(500px) rotateY(20deg)"
            }}></div>
            <div className="absolute right-5 top-1/2 transform -translate-y-1/2 w-20 h-20 rounded-full border-4 border-yellow-500 shadow-lg" style={{
              background: "linear-gradient(135deg, #ffd700, #b8860b)",
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.3), 0 0 15px rgba(255,215,0,0.5)",
              transform: "perspective(500px) rotateY(-20deg)"
            }}></div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8 mb-16 relative z-40"
          >
            <h1 className="text-4xl md:text-6xl font-serif text-stone-800">
              Our <span className="text-indigo-600 italic">Story</span>
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              A journey of love that transcended continents, cultures, and countless obstacles to find home in each other. (Plus some really questionable fashion choices from the 2000s.)
            </p>
          </motion.div>

          {/* Story Content */}
          <div className="space-y-16 relative z-40">
            {/* Opening Scene */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/95 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-lg border-2 border-indigo-100 relative z-40"
            >
              <h2 className="text-2xl md:text-3xl font-serif text-stone-800 mb-6">
                From Different Worlds to One Home
              </h2>
              <div className="space-y-6 text-lg text-stone-700 leading-relaxed">
                <p className="italic">
                  <em>Tonight, as the soft glow from Kimball's reading lamp spills across our Salt Lake City living room, I'm reminded of how far we've come. From orphanage to citizenship, from strangers to soulmates, our journey has been anything but ordinary. As Kimball turns another page of his library book—always in bed by 10pm—I smile at our comfortable rhythms, even as I prepare for another late night at my computer.</em>
                </p>
                <p>
                  It started on May 15, 2006. Not the dramatic, movie-script kind of love story, but something quieter, more persistent. A Ukrainian orphan immigrant and returned missionary meeting a BYU student Japanese linguist and returned missionary, connecting online and then going together to our first movie night—"She's the Man" at a $1 theater in Provo, and then to Family Home Evening with Affirmation, finding unexpected connection.
                </p>
                <p>
                  <strong>Love, for us, was not an easy answer.</strong> It meant translating pain into poetry—sometimes in broken English, always from the heart. It meant building a family in the spaces where we were told none could exist.
                </p>
              </div>
            </motion.section>

            {/* Timeline */}
            <section className="space-y-12 relative bg-gradient-to-br from-indigo-50/90 to-purple-50/90 backdrop-blur-sm p-8 rounded-2xl z-40">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-serif text-center text-stone-800"
              >
                Our Journey Through Time
              </motion.h2>
              <div className="relative">
                {/* Center line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-400 rounded-full z-10"></div>
                <div className="space-y-16">
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={milestone.date}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} relative z-30`}
                    >
                      <div className="md:w-1/2 relative">
                        <div
                          onClick={() => handleMilestoneClick(milestone)}
                          className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl text-center cursor-pointer transform transition-all hover:-translate-y-1 hover:shadow-md border-2 border-indigo-100 relative z-40"
                        >
                          <div 
                            className="relative h-48 mb-4 overflow-hidden rounded-lg cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleImageClick(milestone.image);
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                            <img src={milestone.image} alt={milestone.title} className="w-full h-full object-cover" />
                            <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md z-20">
                              <SafeIcon icon={milestone.icon} className="w-6 h-6 text-indigo-500" />
                            </div>
                          </div>
                          <h3 className="text-2xl font-bold text-stone-800 mb-2">{milestone.date}</h3>
                          <h4 className="text-lg font-semibold text-stone-700">{milestone.title}</h4>
                        </div>
                      </div>
                      <div className="z-20 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white border-2 border-indigo-400 flex items-center justify-center shadow-lg">
                          <SafeIcon icon={milestone.icon} className="w-6 h-6 text-indigo-500" />
                        </div>
                      </div>
                      <div className="md:w-1/2">
                        <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-md border-2 border-indigo-100 relative z-40">
                          <p className="text-stone-700 leading-relaxed">{milestone.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Arrow pointing to countdown */}
              <div className="flex justify-center mt-8">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <SafeIcon icon={FiArrowDown} className="w-10 h-10 text-indigo-500" />
                </motion.div>
              </div>
            </section>

            {/* Anniversary Countdown */}
            <section className="py-12 bg-white/95 backdrop-blur-sm rounded-2xl shadow-md relative z-40">
              <CountdownTimer targetDate="August 15, 2026" title="Celebrating Our 18th Wedding Anniversary" showCta={true} />
            </section>

            {/* Closing Reflection */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/95 backdrop-blur-sm p-8 md:p-12 rounded-2xl text-center border-2 border-indigo-500 relative z-40"
            >
              <SafeIcon icon={FiHeart} className="w-16 h-16 text-indigo-500 mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-serif mb-6 text-stone-800">
                To Twenty Years & Beyond
              </h2>
              <p className="text-lg leading-relaxed max-w-3xl mx-auto text-stone-700">
                <em>As we celebrate our journey together, we look back with gratitude for every moment—the joyful celebrations, the quiet evenings, and even the challenges that made us stronger. Our story continues to unfold, written day by day in the language of love that transcends borders, barriers, and time itself.</em>
              </p>
              <div className="mt-8">
                <button
                  onClick={() => setShowSignup(true)}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-full hover:opacity-90 transition-colors"
                >
                  <SafeIcon icon={FiUsers} className="w-5 h-5" />
                  <span className="font-medium">Join Our Celebration</span>
                  <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
                </button>
              </div>
            </motion.section>
          </div>
        </div>
      </div>

      {/* Milestone Modal */}
      {selectedMilestone && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedMilestone(null)}
        >
          <div
            className="bg-white rounded-xl max-w-2xl w-full p-6 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setSelectedMilestone(null)}
            >
              <SafeIcon icon={FiX} className="w-5 h-5" />
            </button>
            <div className="space-y-4">
              <div 
                className="h-64 relative rounded-lg overflow-hidden cursor-pointer"
                onClick={() => handleImageClick(selectedMilestone.image)}
              >
                <img src={selectedMilestone.image} alt={selectedMilestone.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white text-2xl font-bold">{selectedMilestone.title}</h3>
                  <p className="text-white/90">{selectedMilestone.date}</p>
                </div>
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white flex items-center justify-center">
                  <SafeIcon icon={selectedMilestone.icon} className="w-6 h-6 text-indigo-500" />
                </div>
              </div>
              <p className="text-gray-700 text-lg">{selectedMilestone.description}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
      
      {/* Anniversary Signup Modal */}
      {showSignup && (
        <AnniversarySignup onClose={() => setShowSignup(false)} />
      )}
      
      {/* Image Modal */}
      {selectedImage && (
        <ImageModal 
          image={selectedImage} 
          onClose={() => setSelectedImage(null)} 
        />
      )}
    </div>
  );
};

export default Story;