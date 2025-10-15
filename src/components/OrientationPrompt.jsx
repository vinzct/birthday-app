import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCw } from 'lucide-react';

const OrientationPrompt = () => {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    // Initial check
    checkOrientation();

    // Add event listener for orientation change
    window.addEventListener('resize', checkOrientation);
    
    return () => {
      window.removeEventListener('resize', checkOrientation);
    };
  }, []);

  if (!isPortrait) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-gradient-to-br from-amber-100 to-amber-200 z-50 flex flex-col items-center justify-center p-8"
    >
      <motion.div
        animate={{ rotate: 90 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="mb-8"
      >
        <RotateCw size={64} className="text-amber-700" />
      </motion.div>
      
      <h2 className="text-2xl font-bold text-amber-900 mb-4 text-center">
        Please Rotate Your Device
      </h2>
      
      <p className="text-amber-700 text-center max-w-md">
        This birthday book is best experienced in landscape mode. 
        Please rotate your device to continue.
      </p>
      
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-8 px-6 py-3 bg-amber-600 text-white rounded-full shadow-lg"
      >
        <span className="flex items-center gap-2">
          <RotateCw size={20} />
          <span>Rotate to Landscape</span>
        </span>
      </motion.div>
    </motion.div>
  );
};

export default OrientationPrompt;