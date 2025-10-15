import React from 'react';
import { motion } from 'framer-motion';
import { Heart, List } from 'lucide-react';

const ListPage = ({ title, items }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
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
          <List className="text-amber-600 mr-3" size={24} />
          <h2 className="text-3xl md:text-4xl font-serif text-amber-900">{title}</h2>
        </div>
        <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
      </motion.div>

      <motion.div 
        className="flex-grow overflow-y-auto"
        variants={containerVariants}
      >
        <div className="space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ x: 5 }}
              className="flex items-start p-4 bg-gradient-to-r from-amber-50 to-white rounded-lg border-l-4 border-amber-400 shadow-sm"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                className="mr-3 mt-1"
              >
                <Heart className="text-red-500" size={18} />
              </motion.div>
              <p className="text-amber-800 font-serif leading-relaxed">{item}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ListPage;