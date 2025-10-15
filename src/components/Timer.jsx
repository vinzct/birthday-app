import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimer } from '../hooks/useTimer';
import { Clock, Calendar, Cake, Sparkles, PartyPopper, Lock, Gift } from 'lucide-react';

const Timer = ({ targetDate, onComplete }) => {
  const { days, hours, minutes, seconds, isComplete } = useTimer(targetDate);
  const [celebration, setCelebration] = useState(false);
  const [hasTriggeredComplete, setHasTriggeredComplete] = useState(false);

  useEffect(() => {
    if (isComplete && !celebration && !hasTriggeredComplete) {
      setCelebration(true);
      setHasTriggeredComplete(true);
      onComplete?.();
      
      // Trigger celebration animation
      const timer = setTimeout(() => setCelebration(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isComplete, celebration, hasTriggeredComplete, onComplete]);

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center h-full"
      >
        <AnimatePresence>
          {celebration && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <CelebrationAnimation />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0, -5, 0]
          }}
          transition={{ 
            scale: { repeat: Infinity, duration: 2 },
            rotate: { repeat: Infinity, duration: 4 }
          }}
          className="text-center z-10"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="mb-6"
          >
            <Cake size={64} className="mx-auto text-amber-600" />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-amber-900 mb-4 font-serif">
            Happy Birthday!
          </h2>
          <p className="text-lg text-amber-700 font-serif mb-6">
            The moment has arrived!
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-full font-medium shadow-lg"
          >
            <Gift size={20} />
            <span>Your gift is ready!</span>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center mb-8"
      >
        <Calendar className="text-amber-700 mr-2" size={24} />
        <h3 className="text-2xl font-semibold text-amber-900 font-serif">
          Countdown to Your Special Day
        </h3>
      </motion.div>
      
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <TimeUnit value={days} label="Days" delay={0.1} />
        <TimeUnit value={hours} label="Hours" delay={0.2} />
        <TimeUnit value={minutes} label="Minutes" delay={0.3} />
        <TimeUnit value={seconds} label="Seconds" delay={0.4} />
      </div>

      {/* Progress Bar */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-8 w-full max-w-md"
      >
        <div className="h-2 bg-amber-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${100 - (days * 100 / 365)}%` }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
          />
        </div>
      </motion.div>
      
      {/* Lock Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 flex items-center text-amber-600"
      >
        <Lock size={16} className="mr-2" />
        <span className="text-sm font-medium">
          Your birthday message is waiting!
        </span>
      </motion.div>
    </div>
  );
};

const TimeUnit = ({ value, label, delay }) => {
  const [prevValue, setPrevValue] = useState(value);

  useEffect(() => {
    if (value !== prevValue) {
      setPrevValue(value);
    }
  }, [value, prevValue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.05 }}
      className="flex flex-col items-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-md border border-amber-200"
    >
      <div className="flex items-center justify-center mb-2">
        <Clock className="text-amber-600 mr-1" size={20} />
        <motion.span
          key={value}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-3xl font-bold text-amber-800"
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </div>
      <span className="text-sm text-amber-700 font-medium">{label}</span>
    </motion.div>
  );
};

const CelebrationAnimation = () => {
  return (
    <div className="relative">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, rotate: 0 }}
          animate={{ 
            scale: [0, 1.5, 0],
            rotate: [0, 360],
            opacity: [1, 0]
          }}
          transition={{ 
            duration: 2,
            delay: i * 0.1,
            ease: "easeOut"
          }}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `rotate(${i * 45}deg)`
          }}
        >
          <Sparkles 
            size={32} 
            className="text-amber-500"
            style={{
              filter: 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.5))'
            }}
          />
        </motion.div>
      ))}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center"
      >
        <PartyPopper size={48} className="text-amber-600" />
      </motion.div>
    </div>
  );
};

export default Timer;