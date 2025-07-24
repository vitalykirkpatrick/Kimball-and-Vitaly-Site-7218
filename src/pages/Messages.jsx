import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import SafeIcon from '../common/SafeIcon';
import SpamProtection from '../components/SpamProtection';
import Footer from '../components/Footer';
import ImageModal from '../components/ImageModal';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiSend, FiUser, FiMail, FiImage, FiX, FiUsers, FiArrowRight } = FiIcons;

const Messages = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    photos: []
  });
  const [submitted, setSubmitted] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.photos.length > 5) {
      alert('Maximum 5 photos allowed (we only have so much server space!)');
      return;
    }
    
    const newPhotos = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setFormData(prevData => ({
      ...prevData,
      photos: [...prevData.photos, ...newPhotos]
    }));
  };

  const removePhoto = (index) => {
    setFormData(prevData => ({
      ...prevData,
      photos: prevData.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isVerified) {
      alert('Please complete the verification first!');
      return;
    }
    
    console.log('Message submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '', photos: [] });
    setIsVerified(false);
  };
  
  const openImageModal = (image) => {
    setSelectedImage({
      src: image.src || image,
      title: image.title || "Our Journey",
      description: image.description || "A special moment in our journey together"
    });
  };

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 relative overflow-hidden">
      <Navigation />
      
      {/* Decorative Elements */}
      {heartColors.map((color, index) => (
        <motion.div
          key={`heart-${index}`}
          className={`absolute ${index % 2 === 0 ? 'top-1/4' : 'bottom-1/4'} ${
            index < 3 ? 'left-1/' + (index + 2) : 'right-1/' + (7 - index)
          } w-16 h-16 ${color} opacity-20`}
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
      
      {/* Floating flowers */}
      <motion.div
        className="absolute top-1/3 left-20 w-24 h-24 opacity-20"
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1, 0.9, 1]
        }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        <div className="text-4xl">🌸</div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-20 w-20 h-20 opacity-20"
        animate={{
          rotate: -360,
          scale: [1, 1.1, 1, 0.9, 1]
        }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      >
        <div className="text-4xl">🌺</div>
      </motion.div>
      
      {/* Rainbow balloons */}
      <motion.div
        className="absolute bottom-1/4 right-20 w-16 h-24 opacity-20"
        animate={{
          y: [0, -15, 0, -5, 0],
          rotate: [0, 5, 0, -5, 0]
        }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
      >
        <div className="w-full h-full">
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <defs>
              <linearGradient id="rainbow-balloon-msg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF0018" />
                <stop offset="16%" stopColor="#FFA52C" />
                <stop offset="32%" stopColor="#FFFF41" />
                <stop offset="48%" stopColor="#008018" />
                <stop offset="66%" stopColor="#0000F9" />
                <stop offset="83%" stopColor="#86007D" />
                <stop offset="100%" stopColor="#FF0018" />
              </linearGradient>
            </defs>
            <path d="M12,2C8.13,2 5,5.13 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9C19,5.13 15.87,2 12,2Z" fill="url(#rainbow-balloon-msg)" />
          </svg>
        </div>
      </motion.div>
      
      <motion.div
        className="absolute top-1/4 left-1/4 w-20 h-30 opacity-20"
        animate={{
          y: [0, -10, 0, -5, 0],
          rotate: [0, 3, 0, -3, 0]
        }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
      >
        <div className="w-full h-full">
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <defs>
              <linearGradient id="rainbow-balloon-msg2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#86007D" />
                <stop offset="16%" stopColor="#0000F9" />
                <stop offset="32%" stopColor="#008018" />
                <stop offset="48%" stopColor="#FFFF41" />
                <stop offset="66%" stopColor="#FFA52C" />
                <stop offset="83%" stopColor="#FF0018" />
                <stop offset="100%" stopColor="#86007D" />
              </linearGradient>
            </defs>
            <path d="M12,2C8.13,2 5,5.13 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9C19,5.13 15.87,2 12,2Z" fill="url(#rainbow-balloon-msg2)" />
          </svg>
        </div>
      </motion.div>

      <div className="pt-32 pb-16">
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
            className="text-center space-y-8 mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-serif text-stone-800">
              Share Your <span className="text-indigo-600 italic">Story</span>
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              Tell us how you found your home in love's echo. Your story matters, and we'd love to hear it. (Plus, we love a good story—especially if it involves embarrassing moments we can laugh about later.)
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Message Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-indigo-100">
                <h2 className="text-2xl font-serif text-stone-800 mb-6 flex items-center">
                  <div className="flex space-x-1 mr-3">
                    {heartColors.map((color, index) => (
                      <SafeIcon key={index} icon={FiHeart} className={`w-5 h-5 ${color}`} />
                    ))}
                  </div>
                  Leave a Note
                </h2>
                
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-lg mb-6"
                  >
                    Thank you for sharing! Your message means the world to us. We'll treasure it alongside our collection of terrible puns and dad jokes.
                  </motion.div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                        Name
                      </label>
                      <div className="relative">
                        <SafeIcon icon={FiUser} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Your name"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                        Email (optional)
                      </label>
                      <div className="relative">
                        <SafeIcon icon={FiMail} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                      placeholder="Tell us how you found your home in love's echo... or just share your favorite memory of us being ridiculous"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Share Photos (Optional, max 5)
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                      <div className="space-y-1 text-center">
                        <SafeIcon icon={FiImage} className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <span>Upload photos</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              multiple
                              accept="image/*"
                              onChange={handleFileChange}
                              disabled={formData.photos.length >= 5}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        <p className="text-xs text-gray-500">Share your favorite memories with us! (Embarrassing photos welcome)</p>
                      </div>
                    </div>
                    
                    {formData.photos.length > 0 && (
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {formData.photos.map((photo, index) => (
                          <div key={index} className="relative">
                            <img src={photo.preview} alt={`Preview ${index + 1}`} className="h-20 w-full object-cover rounded-md" />
                            <button
                              type="button"
                              className="absolute top-1 right-1 bg-black/50 rounded-full p-1"
                              onClick={() => removePhoto(index)}
                            >
                              <SafeIcon icon={FiX} className="w-3 h-3 text-white" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <SpamProtection onVerify={setIsVerified} isVerified={isVerified} />
                  
                  <button
                    type="submit"
                    disabled={!isVerified}
                    className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg hover:opacity-90 transition-colors flex items-center justify-center space-x-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <SafeIcon icon={FiSend} className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="bg-white p-8 rounded-2xl border-2 border-indigo-100"
              >
                <p className="text-lg text-stone-700 italic leading-relaxed">
                  <em>"Maybe you, too, have searched for home in unfamiliar places. Maybe you've loved someone in the shadows, or built something beautiful on broken foundations. Our story is for you—the wanderers, the lovers, the ones still learning that home is what you build when you dare to stay. (And the ones who know that sometimes love means pretending to enjoy your partner's experimental cooking.)"</em>
                </p>
              </motion.div>
            </motion.div>
            
            {/* Gallery Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-serif text-stone-800 mb-6">
                Photo Gallery
              </h2>
              <div 
                className="h-[600px] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden cursor-pointer"
                onClick={() => openImageModal({
                  src: "https://photos.google.com/share/AF1QipMCXarRpg2hMw7wy7QRbAwp8Ky9QvbO7D-us2YJNlYEzqMOuqgjQBwG-fvnpB-Fgw/photo/AF1QipNktBGAbUBvKuF8Hh7o_LXIx5Iq-nkpVfNADpqq?key=UGZ0eG1rbmFSdXRkZVFwTUthTi1BaUhOcGlPZHVR",
                  title: "Kimball & Vitaly",
                  description: "A special moment from our journey together."
                })}
              >
                <img 
                  src="https://photos.google.com/share/AF1QipMCXarRpg2hMw7wy7QRbAwp8Ky9QvbO7D-us2YJNlYEzqMOuqgjQBwG-fvnpB-Fgw/photo/AF1QipNktBGAbUBvKuF8Hh7o_LXIx5Iq-nkpVfNADpqq?key=UGZ0eG1rbmFSdXRkZVFwTUthTi1BaUhOcGlPZHVR" 
                  alt="Kimball and Vitaly" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if Google Photos link doesn't work
                    e.target.onerror = null;
                    e.target.src = "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753381025367-blob";
                  }}
                />
              </div>
              <div className="bg-white p-6 rounded-2xl text-center border-2 border-indigo-100">
                <div className="flex justify-center space-x-2 mb-3">
                  {heartColors.map((color, index) => (
                    <SafeIcon key={index} icon={FiHeart} className={`w-5 h-5 ${color}`} />
                  ))}
                </div>
                <p className="text-stone-600">
                  <strong>Want to share your story?</strong><br />
                  Use the form to send us your thoughts, memories, and photos. We promise to read every single one (and probably cry happy tears).
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* Call to Action */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <div className="bg-white p-12 rounded-2xl border-2 border-indigo-300">
              <div className="flex justify-center space-x-2 mb-6">
                {heartColors.map((color, index) => (
                  <SafeIcon key={index} icon={FiHeart} className={`w-6 h-6 ${color}`} />
                ))}
              </div>
              <h2 className="text-2xl md:text-3xl font-serif mb-6 text-stone-800">
                Every Love Story Matters
              </h2>
              <p className="text-lg text-stone-700 max-w-2xl mx-auto leading-relaxed mb-8">
                Whether your love story is just beginning or has been unfolding for decades, whether it's been easy or filled with obstacles—it matters. Thank you for being part of our extended family of love. (And for putting up with our terrible puns all these years.)
              </p>
              <button
                onClick={() => {
                  const signupSection = document.getElementById('signup-section');
                  if (signupSection) {
                    signupSection.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/#signup-section';
                  }
                }}
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
      
      <Footer />
      
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

export default Messages;