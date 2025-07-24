import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart } = FiIcons;

const MessageToKimball = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-blue-50 to-rose-50 p-8 md:p-10 rounded-2xl shadow-lg max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <SafeIcon icon={FiHeart} className="w-10 h-10 text-rose-500 mx-auto mb-4" />
        <h2 className="text-3xl font-serif text-stone-800">
          <span className="text-rose-600 italic">My Dearest Kimball</span>
        </h2>
      </div>
      
      <div className="prose prose-lg mx-auto text-stone-700">
        <p>As winter's embrace draws near, I find myself wrapping this special gift of memories while we prepare for our adventurous journey to Las Vegas, San Diego, and Palm Springs to celebrate Christmas and the 2025 New Year. Do you remember that spring evening in 2006? There I was, stumbling over the word "infatuated" - a word that could barely capture the depth of what I felt for you even then.</p>
        
        <p>That nervous Ukrainian boy who walked into the movie theater had no idea he was walking into the greatest love story of his life. You smiled at my broken English, yet saw the unspoken poetry in my heart. From those first butterflies to our beautiful San Diego wedding in 2008, every moment with you has been a verse in our continuing love song.</p>
        
        <p>Time has painted such beautiful colors across our canvas - your laughter at my misplaced idioms, your patience as I serenaded you with carefully practiced lyrics, your joy when I planned those surprise celebrations. Each memory is a brushstroke in this masterpiece we've created together.</p>
        
        <p>My heart still skips the same beat when you smile, just as it did that summer you were in Colorado Springs and I counted days until your return. Now, nearly two decades later, I still find new ways to fall in love with you.</p>
        
        <p className="font-semibold">With a love that grows deeper each day,<br/>Vitaly</p>
      </div>
    </motion.div>
  );
};

export default MessageToKimball;