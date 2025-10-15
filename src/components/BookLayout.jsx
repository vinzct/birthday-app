import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import Page from './Page';

const BookLayout = ({ children, currentPage, onPageChange, isTimerComplete }) => {
  // Get pages from children
  const pages = React.Children.toArray(children);
  const totalPages = pages.length;
  
  // Create pairs for two-page spread
  const pagePairs = [];
  for (let i = 0; i < totalPages; i += 2) {
    pagePairs.push({
      left: pages[i],
      right: pages[i + 1] || null
    });
  }
  
  const currentSpread = Math.floor(currentPage / 2);
  const canGoNext = Math.min(currentPage + 2, totalPages) != totalPages;
  const canGoPrevious = currentPage > 0;

  console.log(currentPage);
  console.log(totalPages);

  const handleNext = () => {
    if (!canGoNext) return;
    
    // Check if trying to access content pages before timer completes
    if (!isTimerComplete && currentPage >= 1) {
      return; // Prevent navigation to content pages
    }
    
    onPageChange(currentPage + 2);
  };

  const handlePrevious = () => {
    if (!canGoPrevious) return;
    onPageChange(currentPage - 2);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[600px] md:h-[700px] perspective-1000">
      {/* Book Container */}
      <div className="relative w-full h-full">
        {/* Book Spine */}
        <div className="absolute left-1/2 top-0 bottom-0 w-4 bg-gradient-to-r from-amber-900 to-amber-800 transform -translate-x-1/2 z-20 shadow-inner" />
        
        {/* Pages Container */}
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              {/* Left Page */}
              {pagePairs[currentSpread]?.left && (
                <motion.div
                  initial={{ rotateY: -30, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: -30, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute left-0 top-0 w-1/2 h-full origin-right"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Page position="left" pageNumber={currentPage + 1}>
                    {pagePairs[currentSpread].left}
                  </Page>
                </motion.div>
              )}
              
              {/* Right Page */}
              {pagePairs[currentSpread]?.right && (
                <motion.div
                  initial={{ rotateY: 30, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: 30, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute right-0 top-0 w-1/2 h-full origin-left"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Page position="right" pageNumber={currentPage + 2}>
                    {pagePairs[currentSpread].right}
                  </Page>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Navigation Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-30">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevious}
            disabled={!canGoPrevious}
            className={`p-3 rounded-full transition-all ${
              canGoPrevious 
                ? 'bg-amber-600 text-white shadow-lg hover:bg-amber-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ChevronLeft size={24} />
          </motion.button>
          
          <div className="px-4 py-2 bg-white/90 backdrop-blur rounded-full shadow-md flex items-center">
            <span className="text-sm font-medium text-gray-700">
              Page {Math.min(currentPage + 1, totalPages)} - {Math.min(currentPage + 2, totalPages)} of {totalPages}
            </span>
            {!isTimerComplete && currentPage >= 1 && (
              <Lock size={14} className="ml-2 text-amber-600" />
            )}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            disabled={!canGoNext || (!isTimerComplete && currentPage >= 1)}
            className={`p-3 rounded-full transition-all ${
              canGoNext && (isTimerComplete || currentPage < 1)
                ? 'bg-amber-600 text-white shadow-lg hover:bg-amber-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentPage >= 1 && !isTimerComplete ? <Lock size={24} /> : <ChevronRight size={24} />}
          </motion.button>
        </div>
        
        {/* Lock Indicator for Content Pages */}
        {!isTimerComplete && currentPage >= 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-8 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-amber-100 rounded-full shadow-md flex items-center"
          >
            <Lock size={16} className="mr-2 text-amber-600" />
            <span className="text-sm font-medium text-amber-700">
              Content unlocks on your birthday!
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BookLayout;