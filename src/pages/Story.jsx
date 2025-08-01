import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import CountdownTimer from '../components/CountdownTimer';
import SafeIcon from '../common/SafeIcon';
import Footer from '../components/Footer';
import AnniversarySignup from '../components/AnniversarySignup';
import ImageModal from '../components/ImageModal';
import { processImageUrl } from '../utils/imageHelper';
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

  // Updated milestone images with new uploaded photos for first 8 entries
  const milestones = [
    {
      year: "2006",
      date: "May 15, 2006",
      title: "The Beginning",
      description: "We met online and then went together to our first movie night—'She's the Man' at a $1 theater in Provo (because we were broke college students). We also attended Family Home Evening with Affirmation, a group for gay Mormon people navigating faith and identity.",
      icon: FiHeart,
      color: "red",
      image: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753866313344-The%20Beginning%20May%2015%202006.JPG"
    },
    {
      year: "2006",
      date: "June 2006",
      title: "Moving In Together",
      description: "I moved into the basement room at 746 E 30 N in Orem while Kimball was away in Colorado for the summer. When he returned, we officially began living together. (And learned that sharing a bathroom requires serious negotiation skills.)",
      icon: FiHome,
      color: "orange",
      image: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753866553631-blob"
    },
    {
      year: "2007",
      date: "October 2007",
      title: "First Townhome",
      description: "We bought our first townhome together at 1174 W 230 S in Orem, building equity and establishing our future. It was a huge step for me as an immigrant on an H-1B visa. (And we learned that homeownership means everything breaks at the worst possible time.)",
      icon: FiHome,
      color: "yellow",
      image: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753866596762-blob"
    },
    {
      year: "2008",
      date: "February 14, 2008",
      title: "The Proposal",
      description: "On Valentine's Day, Kimball proposed. Despite the legal barriers at the time, we committed to building a life together. (I said yes, obviously, though I was so nervous I probably said it in Ukrainian first.)",
      icon: FiHeart,
      color: "yellow",
      image: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753866637834-The%20Proposal%20Feb%202008.jpg"
    },
    {
      year: "2008",
      date: "August 15, 2008",
      title: "Our Wedding",
      description: "On August 15, 2008, we held our commitment ceremony in San Diego. Though not legally recognized at the time, we exchanged vows and rings in front of our closest friends. (And I managed to get through my poem without crying... much.)",
      icon: FiStar,
      color: "green",
      image: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753866867732-Marriage%20August%202008.jpg"
    },
    {
      year: "2009",
      date: "April 2009",
      title: "Computer Science Degree",
      description: "A major milestone for me: graduating from Utah Valley University with a degree in Computer Science. Kimball supported me through endless late-night coding sessions and practice presentations. This degree opened doors that seemed impossible for an orphan immigrant.",
      icon: FiBookOpen,
      color: "blue",
      image: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753866912501-blob"
    },
    {
      year: "2011",
      date: "May 2011",
      title: "Universal Studios Orlando",
      description: "Our first Universal Studios trip in Orlando! Two grown adults racing through The Wizarding World of Harry Potter, fighting over who gets to cast spells first. Turns out adulthood is just childhood with a credit card and no one to tell you 'that's enough butterbeer for today.'",
      icon: FiStar,
      color: "purple",
      image: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753866953088-blob"
    },
    {
      year: "2011",
      date: "September 2011",
      title: "San Francisco Adventure",
      description: "Our first San Francisco trip! We crossed the Golden Gate Bridge three times because we kept missing exits, toured Alcatraz where Kimball suspiciously knew too much about escape routes, and discovered that what they call 'a slight hill' in San Francisco travel guides is actually a vertical wall disguised as a street.",
      icon: FiMapPin,
      color: "indigo",
      image: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753867099515-San%20Francisco%20Trip%202011-09-23%2016.52.20.jpg"
    },
    {
      year: "2012",
      date: "September 2012",
      title: "Timpanogos Mountain Quest",
      description: "We tackled Timpanogos believing Kimball's 'just four hours' hiking wisdom, but nine hours and four waterfalls later, I was still carrying all the gear while Kimball was out of breath—so much for his famous first-kiss breathing lesson. (Turns out, neither Google nor romance prepares you for hauling snacks and a boyfriend up a mountain.)",
      icon: FiMapPin,
      color: "green",
      image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
    },
    {
      year: "2013",
      date: "July 2013",
      title: "Family Reunion in Colorado",
      description: "We survived a classic Mormon family reunion in Colorado with Kimball's clan—roughly the size (and volume) of a BYU freshman orientation. There were cousins galore, Jell-O salads in neon shades, and enough family photos to qualify as cardio. I lost count of the blonde children somewhere between the blessing on the food and our six-hour round of Mormon Uno. (Apparently, in this tribe, 'multiply and replenish' isn't just scripture—it's a group sport.)",
      icon: FiUsers,
      color: "yellow",
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
    },
    {
      year: "2013",
      date: "November 2013",
      title: "First Trip to NYC",
      description: "We saw New York for the first time in 2013, two wide-eyed dreamers dropped right into Times Square—thanks to Kary, our fairy godparent with better flight deals than Travelocity. Neon lights, Broadway dreams, and enough honking to trigger Mormon guilt (even for just crossing the street on red). We got lost, held hands, and wondered how many hot dogs one man (Kimball) could eat in a weekend. NYC: proof that a good friend and sturdy shoes are all you need for adventure.",
      icon: FiMapPin,
      color: "blue",
      image: "https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80"
    },
    {
      year: "2014",
      date: "April 2014",
      title: "Vitaly in Russia",
      description: "Visiting Russia in 2014 as a Ukrainian felt a bit like sneaking a borscht recipe past border patrol—equal parts gutsy, curious, and hoping nobody asked too many questions. I stood by the Kremlin, arms crossed, practicing my best 'just a tourist' smile while the Dnipro and Moscow rivers argued in my DNA. (Spoiler: I survived, no international incidents—just some confused stares and a stubborn craving for real salo.)",
      icon: FiGlobe,
      color: "red",
      image: "https://images.unsplash.com/photo-1513326738677-b964603b9061?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80"
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
      image: "https://drive.google.com/file/d/1PAHeDTKaMls3zvaDeUHM0BGW9_JUDtOR/view?usp=sharing"
    },
    {
      year: "2016",
      date: "November 2016",
      title: "Salt Lake City Home Move",
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
      image: "https://images.unsplash.com/photo-1572363420552-058bd41af8c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80"
    },
    {
      year: "2020",
      date: "March 2020",
      title: "Weathering Storms",
      description: "Through financial crises, pandemic isolation, and personal setbacks, our bond grew even stronger as we faced challenges together. As the world locked down during COVID-19, we found ourselves playing the actual Pandemic board game while living through a real one - a strange coincidence that became our coping mechanism during those uncertain times.",
      icon: FiGlobe,
      color: "red",
      image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      year: "2026",
      date: "May 15, 2026",
      title: "20 Years Together",
      description: "We'll be celebrating two decades of choosing each other every day, through every triumph and challenge. (And we're still not tired of each other's company. Much.)",
      icon: FiHeart,
      color: "red",
      image: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753646796996-Wedding%20rings%20%281%29.png"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 relative overflow-hidden">
      <Navigation />

      {/* Enhanced Decorative Elements */}
      {heartColors.map((color, index) => (
        <motion.div
          key={`heart-${index}`}
          className={`absolute ${index % 2 === 0 ? 'top-1/4' : 'bottom-1/4'} ${index < 3 ? 'left-1/' + (index + 2) : 'right-1/' + (7 - index)} w-16 h-16 ${color} opacity-20 z-10`}
          animate={{ rotate: [0, 10, 0, -10, 0], y: [0, -10, 0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 15 + index * 2 }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
          </svg>
        </motion.div>
      ))}

      {/* Additional decorative elements */}
      <motion.div
        className="absolute top-1/3 left-20 w-24 h-24 opacity-20"
        animate={{ rotate: 360, scale: [1, 1.1, 1, 0.9, 1] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        <div className="text-4xl">🌸</div>
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 right-20 w-20 h-20 opacity-20"
        animate={{ rotate: -360, scale: [1, 1.1, 1, 0.9, 1] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      >
        <div className="text-4xl">🌺</div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-20 w-16 h-24 opacity-20"
        animate={{ y: [0, -15, 0, -5, 0], rotate: [0, 5, 0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
      >
        <div className="w-full h-full">
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <defs>
              <linearGradient id="rainbow-balloon-story" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF0018" />
                <stop offset="16%" stopColor="#FFA52C" />
                <stop offset="32%" stopColor="#FFFF41" />
                <stop offset="48%" stopColor="#008018" />
                <stop offset="66%" stopColor="#0000F9" />
                <stop offset="83%" stopColor="#86007D" />
                <stop offset="100%" stopColor="#FF0018" />
              </linearGradient>
            </defs>
            <path d="M12,2C8.13,2 5,5.13 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9C19,5.13 15.87,2 12,2Z" fill="url(#rainbow-balloon-story)" />
          </svg>
        </div>
      </motion.div>

      <div className="pt-28 pb-16 relative z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8 mb-8 relative z-40"
          >
            <h1 className="text-4xl md:text-6xl font-serif text-stone-800">
              Our <span className="text-indigo-600 italic">Story</span>
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              A journey of love that transcended continents, cultures, and countless obstacles to find home in each other.
              (Plus some really questionable fashion choices from the 2000s.)
            </p>
          </motion.div>

          {/* Rings image with decorative lines */}
          <div className="flex items-center justify-center my-8 px-4">
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent max-w-xs"></div>
            <div className="mx-4">
              <div className="w-32 h-32 flex items-center justify-center">
                <img src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753646796996-Wedding%20rings%20%281%29.png" alt="Kimball & Vitaly" className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="flex-grow h-px bg-gradient-to-r from-gray-300 via-gray-300 to-transparent max-w-xs"></div>
          </div>

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
                {/* Center line - LGBTQ+ flag colors */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-violet-500 rounded-full z-10"></div>

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
                          className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl text-center cursor-pointer transform transition-all hover:-translate-y-1 hover:shadow-md border-2 border-indigo-100 relative z-40 flex flex-col"
                          style={{ minHeight: "360px" }}
                        >
                          {/* Fixed size image container - UPDATED for consistent sizing */}
                          <div 
                            className="relative overflow-hidden rounded-lg cursor-pointer bg-gray-100 flex items-center justify-center mb-4" 
                            style={{ height: "180px", minHeight: "180px" }}
                            onClick={(e) => { e.stopPropagation(); handleImageClick(milestone.image); }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                            <img 
                              src={processImageUrl(milestone.image)} 
                              alt={milestone.title} 
                              className="w-full h-full object-contain" 
                              style={{ maxWidth: "100%", maxHeight: "100%" }}
                              onError={(e) => { e.target.onerror = null; e.target.src = "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753646796996-Wedding%20rings%20%281%29.png"; }}
                            />
                            <div className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md z-20">
                              <SafeIcon icon={milestone.icon} className="w-4 h-4 text-indigo-500" />
                            </div>
                          </div>

                          {/* Text content - UPDATED for consistent sizing */}
                          <div className="flex-grow flex flex-col justify-between">
                            <div>
                              <h3 className="text-lg font-bold text-stone-800 mb-1">{milestone.date}</h3>
                              <h4 className="text-md font-semibold text-stone-700 mb-2">{milestone.title}</h4>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="z-20 flex items-center justify-center">
                        {/* LGBTQ+ flag color dots */}
                        <div
                          className="w-12 h-12 rounded-full bg-white border-2 border-indigo-400 flex items-center justify-center shadow-lg"
                          style={{
                            background: `linear-gradient(135deg, ${
                              index < 7
                                ? ['#FF0018', '#FFA52C', '#FFFF41', '#008018', '#0000F9', '#86007D', '#FF0018'][index]
                                : ['#FFA52C', '#FFFF41', '#008018', '#0000F9', '#86007D'][index - 7]
                            }, rgba(255,255,255,0.8))`
                          }}
                        >
                          <SafeIcon icon={milestone.icon} className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      <div className="md:w-1/2">
                        <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-md border-2 border-indigo-100 relative z-40">
                          <p className="text-stone-700 leading-relaxed text-sm">{milestone.description}</p>
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
                className="relative rounded-lg overflow-hidden cursor-pointer bg-gray-100 flex items-center justify-center" 
                style={{ height: "256px" }}
                onClick={() => handleImageClick(selectedMilestone.image)}
              >
                <img 
                  src={processImageUrl(selectedMilestone.image)} 
                  alt={selectedMilestone.title} 
                  className="w-full h-full object-contain"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753646796996-Wedding%20rings%20%281%29.png"; }}
                />
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
      {showSignup && <AnniversarySignup onClose={() => setShowSignup(false)} />}

      {/* Image Modal */}
      {selectedImage && <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />}
    </div>
  );
};

export default Story;