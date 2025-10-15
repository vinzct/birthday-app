import React from 'react';
import { motion } from 'framer-motion';
import { Heart, PenTool } from 'lucide-react';

const MessagePage = ({ title, content }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      className="h-full p-8 md:p-12 flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center mb-4">
          <PenTool className="text-amber-600 mr-3" size={24} />
          <h2 className="text-3xl md:text-4xl font-serif text-amber-900">{title}</h2>
        </div>
        <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
      </motion.div>

      <motion.div 
        className="flex-grow flex items-center justify-center"
        variants={itemVariants}
      >
        <div className="max-w-lg w-full">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-50 rounded-lg transform rotate-1"></div>
            <div className="relative bg-white p-8 rounded-lg shadow-md border border-amber-100">
              <div 
                className="text-amber-800 leading-relaxed font-serif space-y-4"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, duration: 0.5, type: "spring" }}
                className="mt-6 text-right"
              >
                <Heart className="inline text-red-500 mr-2" size={20} />
                <span className="text-amber-700 italic">From your Dinpuru</span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MessagePage;