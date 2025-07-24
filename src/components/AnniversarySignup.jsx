import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import SpamProtection from './SpamProtection';
import * as FiIcons from 'react-icons/fi';

const { FiX, FiUser, FiMail, FiCalendar, FiMessageSquare, FiCheck, FiUsers, FiPlus, FiMinus, FiImage } = FiIcons;

const AnniversarySignup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    willAttend: 'yes',
    message: '',
    additionalGuests: 0,
    photos: []
  });
  const [submitted, setSubmitted] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
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

  const adjustGuests = (amount) => {
    setFormData(prevData => ({
      ...prevData,
      additionalGuests: Math.max(0, parseInt(prevData.additionalGuests) + amount)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isVerified) {
      alert('Please verify you are human');
      return;
    }
    
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <SafeIcon icon={FiX} className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiCalendar} className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-serif text-gray-800">Join Our Celebration</h3>
            <p className="text-gray-600">August 15, 2026</p>
            <p className="text-sm text-gray-500 mt-2">Warning: May contain excessive Ukrainian food and dad jokes</p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 rounded-full border-2 border-green-500 flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiCheck} className="w-8 h-8 text-green-500" />
              </div>
              <h4 className="text-xl text-gray-800 mb-2">Thank You!</h4>
              <p className="text-gray-600">We've added you to our guest list and will be in touch with more details. Prepare your appetite for borscht!</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <div className="relative">
                  <SafeIcon icon={FiUser} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <SafeIcon icon={FiMail} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Will you be attending?
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="willAttend"
                      value="yes"
                      checked={formData.willAttend === 'yes'}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-indigo-600"
                    />
                    <span className="ml-2 text-gray-700">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="willAttend"
                      value="no"
                      checked={formData.willAttend === 'no'}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-indigo-600"
                    />
                    <span className="ml-2 text-gray-700">No</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="willAttend"
                      value="maybe"
                      checked={formData.willAttend === 'maybe'}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-indigo-600"
                    />
                    <span className="ml-2 text-gray-700">Maybe</span>
                  </label>
                </div>
              </div>

              {formData.willAttend === 'yes' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Guests
                  </label>
                  <div className="flex items-center space-x-3">
                    <div className="relative flex items-center border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => adjustGuests(-1)}
                        className="px-3 py-2 text-gray-500 hover:bg-gray-100"
                      >
                        <SafeIcon icon={FiMinus} className="w-5 h-5" />
                      </button>
                      <div className="px-3 py-2 flex items-center">
                        <SafeIcon icon={FiUsers} className="w-5 h-5 text-gray-400 mr-2" />
                        <span>{formData.additionalGuests}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => adjustGuests(1)}
                        className="px-3 py-2 text-gray-500 hover:bg-gray-100"
                      >
                        <SafeIcon icon={FiPlus} className="w-5 h-5" />
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formData.additionalGuests === 0
                        ? 'Just yourself?'
                        : `You + ${formData.additionalGuests} ${formData.additionalGuests === 1 ? 'guest' : 'guests'}`}
                    </span>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message (Optional)
                </label>
                <div className="relative">
                  <SafeIcon icon={FiMessageSquare} className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Share a memory or message... (or just tell us your favorite Ukrainian dish)"
                    rows="3"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Share Photos (Optional, max 5)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <SafeIcon icon={FiImage} className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
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
                    <p className="text-xs text-gray-500">Share your favorite memories with us!</p>
                  </div>
                </div>

                {formData.photos.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img
                          src={photo.preview}
                          alt={`Preview ${index + 1}`}
                          className="h-20 w-full object-cover rounded-md"
                        />
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
                className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-3 rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Join Our Celebration
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnniversarySignup;