import React from 'react';
import { motion } from 'framer-motion';
import { Laugh } from 'lucide-react';

const JokesPage = ({ title, jokes }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, rotate: -2 },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      className="h-full p-8 md:p-12 flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-6">
        <div className="flex items-center mb-4">
          <Laugh className="text-amber-600 mr-3" size={24} />
          <h2 className="text-3xl md:text-4xl font-serif text-amber-900">{title}</h2>
        </div>
        <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
      </motion.div>

      <motion.div 
        className="flex-grow overflow-y-auto"
        variants={containerVariants}
      >
        <div className="space-y-4">
          {jokes.map((joke, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -3 }}
              className="p-4 bg-white rounded-lg shadow-md border border-amber-100"
            >
              <div className="flex items-start">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, 0, -10, 0],
                    scale: [1, 1.1, 1, 1.1, 1]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatDelay: 3 + index,
                    duration: 0.5 
                  }}
                  className="text-3xl mr-3"
                >
                  {joke.emoji}
                </motion.div>
                <p className="text-amber-800 font-serif leading-relaxed flex-grow">{joke.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default JokesPage;