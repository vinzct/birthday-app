import React from 'react';
import { motion } from 'framer-motion';

const Page = ({ children, position, pageNumber }) => {
  const isLeft = position === 'left';
  
  return (
    <motion.div
      className={`absolute inset-0 bg-gradient-to-br ${
        isLeft 
          ? 'from-amber-50 to-amber-100' 
          : 'from-amber-100 to-amber-50'
      } shadow-2xl overflow-hidden`}
      style={{
        backgroundImage: `
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            rgba(139, 69, 19, 0.03) 2px,
            rgba(139, 69, 19, 0.03) 4px
          ),
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(139, 69, 19, 0.03) 2px,
            rgba(139, 69, 19, 0.03) 4px
          )
        `,
        boxShadow: isLeft 
          ? 'inset -10px 0 30px -10px rgba(0,0,0,0.1)'
          : 'inset 10px 0 30px -10px rgba(0,0,0,0.1)'
      }}
    >
      {/* Page Number */}
      <div className={`absolute bottom-4 ${
        isLeft ? 'left-4' : 'right-4'
      } text-amber-800/40 text-sm font-serif`}>
        {pageNumber}
      </div>
      
      {/* Page Content */}
      <div className="h-full p-8 md:p-12 overflow-y-auto">
        <div className="max-w-none">
          {children}
        </div>
      </div>
      
      {/* Page Edge Shadow */}
      <div className={`absolute top-0 bottom-0 w-2 ${
        isLeft ? 'right-0' : 'left-0'
      } bg-gradient-to-r ${
        isLeft 
          ? 'from-transparent to-amber-900/10' 
          : 'from-amber-900/10 to-transparent'
      }`} />
    </motion.div>
  );
};

export default Page;