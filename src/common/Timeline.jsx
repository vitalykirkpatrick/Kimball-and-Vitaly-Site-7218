import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from './SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiHome, FiGlobe, FiStar, FiCalendar } = FiIcons;

const Timeline = () => {
  const events = [
    {
      date: "May 16, 2006",
      title: "First Meeting",
      description: "We met at the LDS Institute in Orem, discussing Russian literature. Hours of conversation revealed an unexpected connection.",
      icon: FiHeart,
      color: "rose"
    },
    {
      date: "June 2006",
      title: "Moving In Together",
      description: "I moved into the basement room at 746 E 30 N in Orem while Kimball was away for the summer.",
      icon: FiHome,
      color: "amber"
    },
    {
      date: "August 15, 2008",
      title: "Our Wedding Day",
      description: "We held our commitment ceremony in San Diego, surrounded by chosen family.",
      icon: FiStar,
      color: "emerald"
    },
    {
      date: "November 2008",
      title: "First Townhome",
      description: "We purchased our first property at 1174 W 230 S in Orem, building equity and a future together.",
      icon: FiHome,
      color: "blue"
    },
    {
      date: "June 26, 2015",
      title: "Legal Marriage",
      description: "The Supreme Court decision finally recognized our marriage legally after years of waiting.",
      icon: FiCalendar,
      color: "purple"
    },
    {
      date: "March 2016",
      title: "Salt Lake City Move",
      description: "We bought a townhome in Salt Lake City, expanding our horizons beyond Utah County.",
      icon: FiHome,
      color: "indigo"
    },
    {
      date: "August 15, 2025",
      title: "20th Anniversary",
      description: "Celebrating two decades of love, resilience, and building a home in each other.",
      icon: FiHeart,
      color: "rose"
    }
  ];

  return (
    <div className="py-10">
      <h2 className="text-3xl font-serif text-center text-stone-800 mb-12">
        Our <span className="text-rose-600 italic">Timeline</span>
      </h2>
      
      <div className="relative">
        {/* Center line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-rose-400 via-blue-400 to-purple-500 rounded-full"></div>
        
        <div className="space-y-12">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <h3 className={`text-lg font-bold text-${event.color}-600 mb-1`}>{event.title}</h3>
                  <p className="text-sm text-stone-500 mb-3">{event.date}</p>
                  <p className="text-stone-700">{event.description}</p>
                </div>
              </div>
              
              <div className="z-10 flex items-center justify-center">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-${event.color}-400 to-${event.color}-600 flex items-center justify-center shadow-lg`}>
                  <SafeIcon icon={event.icon} className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="w-1/2"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;