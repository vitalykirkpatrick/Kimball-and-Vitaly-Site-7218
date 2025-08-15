import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import SpamProtection from '../components/SpamProtection';
import Footer from '../components/Footer';
import ImageModal from '../components/ImageModal';
import * as FiIcons from 'react-icons/fi';
import supabase from '../lib/supabase';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isVerified) {
      alert('Please complete the verification first!');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Save to Supabase
      const { data, error: supabaseError } = await supabase
        .from('messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message
          }
        ]);

      if (supabaseError) throw supabaseError;

      // Send notification email to the admin
      const emailParams = {
        to: 'info@kimballandvitaly.com',
        subject: `New Message from ${formData.name}`,
        body: `
          Name: ${formData.name}
          Email: ${formData.email}
          Message: ${formData.message}
        `
      };

      // Use your preferred email service here
      // This is just a placeholder - in real implementation you would call an email service
      console.log('Would send email:', emailParams);
      console.log('Message submitted:', formData);

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '', photos: [] });
      setIsVerified(false);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
      <div className="pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8 mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-serif text-stone-800">
              Share Your <span className="text-indigo-600 italic">Story</span>
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              Tell us how you found your home in love's echo. Your story matters, and we'd love to hear it. (Plus, we love a good story—especially if it involves embarrassing moments we can laugh about later.)
            </p>
          </motion.div>

          {/* Rings image with decorative lines - UPDATED WITH CONSISTENT DIVIDER */}
          <div className="flex items-center justify-center my-8 px-4">
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent max-w-xs"></div>
            <div className="mx-4">
              <div className="w-32 h-32 flex items-center justify-center">
                <img src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753646796996-Wedding%20rings%20%281%29.png" alt="Kimball & Vitaly" className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="flex-grow h-px bg-gradient-to-r from-gray-300 via-gray-300 to-transparent max-w-xs"></div>
          </div>

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
                        <p className="text-xs text-gray-500">
                          Share your favorite memories with us! (Embarrassing photos welcome)
                        </p>
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

                  {error && (
                    <div className="text-red-500 text-sm py-2 px-3 bg-red-50 rounded-md">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!isVerified || isSubmitting}
                    className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg hover:opacity-90 transition-colors flex items-center justify-center space-x-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <>
                        <SafeIcon icon={FiSend} className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Gallery Section - REMOVED HEADING */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div
                className="h-[600px] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden cursor-pointer"
                onClick={() => openImageModal({
                  src: "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753385005494-Wedding.JPG",
                  title: "Kimball & Vitaly",
                  description: "Our wedding rings - a symbol of our commitment and love."
                })}
              >
                <img
                  src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753385005494-Wedding.JPG"
                  alt="Kimball and Vitaly's Wedding Rings"
                  className="w-full h-full object-cover"
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

          {/* Call to Action - UPDATED: Now side by side with animated hearts above, quotes removed */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            {/* Animated hearts above the boxes */}
            <div className="flex justify-center space-x-4 mb-6">
              {heartColors.map((color, index) => (
                <motion.div
                  key={`cta-heart-${index}`}
                  animate={{ y: [0, -10, 0], scale: [1, 1.2, 1], rotate: [0, 10, 0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: index * 0.2 }}
                  className={`${color}`}
                >
                  <SafeIcon icon={FiHeart} className="w-8 h-8" />
                </motion.div>
              ))}
            </div>

            {/* Side by side boxes */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Box 1 */}
              <div className="bg-white p-8 rounded-2xl border-2 border-indigo-100">
                <p className="text-lg text-stone-700 italic leading-relaxed">
                  <em>
                    Maybe you, too, have searched for home in unfamiliar places. Maybe you've loved someone in the shadows, or built something beautiful on broken foundations. Our story is for you—the wanderers, the lovers, the ones still learning that home is what you build when you dare to stay. (And the ones who know that sometimes love means pretending to enjoy your partner's experimental cooking.)
                  </em>
                </p>
              </div>

              {/* Box 2 */}
              <div className="bg-white p-8 rounded-2xl border-2 border-indigo-300">
                <h2 className="text-2xl font-serif mb-4 text-stone-800">
                  Every Love Story Matters
                </h2>
                <p className="text-stone-700 leading-relaxed">
                  Whether your love story is just beginning or has been unfolding for decades, whether it's been easy or filled with obstacles—it matters. Thank you for being part of our extended family of love. (And for putting up with our terrible puns all these years.)
                </p>
              </div>
            </div>
          </motion.section>
        </div>
      </div>

      <Footer />

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </div>
  );
};

export default Messages;