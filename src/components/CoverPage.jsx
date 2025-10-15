import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Heart, Lock } from 'lucide-react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const CoverPage = ({ title, subtitle, recipientName, onOpenLetter, isTimerComplete }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (isTimerComplete && !showConfetti) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [isTimerComplete, showConfetti]);

  return (
    <>
      <AnimatePresence>
        {showConfetti && (
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={200}
            gravity={0.1}
            colors={['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F']}
          />
        )}
      </AnimatePresence>

      <div className="relative h-full flex flex-col items-center justify-center p-8 overflow-hidden">
        {/* Paper Texture Background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(139, 69, 19, 0.03) 10px,
                rgba(139, 69, 19, 0.03) 20px
              ),
              repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 10px,
                rgba(139, 69, 19, 0.03) 10px,
                rgba(139, 69, 19, 0.03) 20px
              )
            `
          }}
        />

        {/* Decorative Border */}
        <div className="absolute inset-4 border-2 border-amber-200 rounded-lg pointer-events-none" />
        <div className="absolute inset-6 border border-amber-100 rounded-lg pointer-events-none" />

        {/* Wax Seal */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
          className="absolute top-8 right-8"
        >
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full shadow-lg flex items-center justify-center">
              <Heart size={24} className="text-red-100" />
            </div>
            <div className="absolute inset-0 bg-red-600 rounded-full opacity-20 blur-xl" />
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10 max-w-lg mx-auto"
        >
          {/* Sparkles Decoration */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="mb-6"
          >
            <Sparkles size={32} className="mx-auto text-amber-600" />
          </motion.div>

          {/* Birthday Header */}
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl md:text-6xl font-serif text-amber-900 mb-4 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Happy Birthday,
            <br />
            <span className="text-amber-700">{recipientName}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl md:text-2xl text-amber-700 mb-8 font-serif italic"
          >
            {subtitle}
          </motion.p>

          {/* Open Letter Button */}
          <motion.button
            whileHover={{ scale: isTimerComplete ? 1.05 : 1 }}
            whileTap={{ scale: isTimerComplete ? 0.95 : 1 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={isTimerComplete ? onOpenLetter : undefined}
            disabled={!isTimerComplete}
            className={`relative px-8 py-4 rounded-full font-medium transition-all duration-300 ${
              isTimerComplete
                ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span className="flex items-center gap-2">
              {isTimerComplete ? <Gift size={20} /> : <Lock size={20} />}
              <span>{isTimerComplete ? 'Open Letter' : 'Wait for your birthday'}</span>
            </span>
            
            {/* Button Shine Effect */}
            {isTimerComplete && isHovered && (
              <motion.div
                layoutId="shine"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 rounded-full"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            )}
          </motion.button>

          {/* Timer Status Message */}
          {!isTimerComplete && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-6 text-sm text-amber-600 font-medium"
            >
              Wait for the magic moment...
            </motion.p>
          )}
        </motion.div>

        {/* Corner Decorations */}
        <CornerDecoration position="top-left" />
        <CornerDecoration position="top-right" />
        <CornerDecoration position="bottom-left" />
        <CornerDecoration position="bottom-right" />
      </div>
    </>
  );
};

const CornerDecoration = ({ position }) => {
  const positions = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className={`absolute ${positions[position]} w-8 h-8 pointer-events-none`}
    >
      <div className="w-full h-full border-2 border-amber-300" 
           style={{
             borderTop: position.includes('top') ? '2px solid' : 'none',
             borderLeft: position.includes('left') ? '2px solid' : 'none',
             borderRight: position.includes('right') ? '2px solid' : 'none',
             borderBottom: position.includes('bottom') ? '2px solid' : 'none',
             borderColor: '#d97706'
           }}
      />
    </motion.div>
  );
};

export default CoverPage;