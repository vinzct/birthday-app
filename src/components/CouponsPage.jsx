import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ticket, CheckCircle, Gift } from 'lucide-react';

const CouponsPage = ({ title, coupons }) => {
  const [usedCoupons, setUsedCoupons] = useState(
    coupons.filter(c => c.used).map(c => c.id)
  );

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

  const handleUseCoupon = (id) => {
    if (!usedCoupons.includes(id)) {
      setUsedCoupons([...usedCoupons, id]);
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
          <Gift className="text-amber-600 mr-3" size={24} />
          <h2 className="text-3xl md:text-4xl font-serif text-amber-900">{title}</h2>
        </div>
        <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
      </motion.div>

      <motion.div 
        className="flex-grow overflow-y-auto"
        variants={containerVariants}
      >
        <div className="space-y-4">
          {coupons.map((coupon) => {
            const isUsed = usedCoupons.includes(coupon.id);
            return (
              <motion.div
                key={coupon.id}
                variants={itemVariants}
                whileHover={!isUsed ? { scale: 1.02 } : {}}
                className={`relative overflow-hidden rounded-lg shadow-md ${
                  isUsed 
                    ? 'bg-gray-100 border border-gray-300' 
                    : 'bg-gradient-to-r from-amber-50 to-white border border-amber-200'
                }`}
              >
                <div className="flex">
                  <div className={`w-16 flex items-center justify-center ${
                    isUsed ? 'bg-gray-300' : 'bg-gradient-to-b from-amber-400 to-amber-500'
                  }`}>
                    <Ticket className="text-white" size={24} />
                  </div>
                  <div className="flex-grow p-4">
                    <h3 className={`text-xl font-serif font-medium mb-1 ${
                      isUsed ? 'text-gray-500 line-through' : 'text-amber-900'
                    }`}>
                      {coupon.title}
                    </h3>
                    <p className={`text-sm mb-3 ${
                      isUsed ? 'text-gray-400' : 'text-amber-700'
                    }`}>
                      {coupon.description}
                    </p>
                    {!isUsed && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleUseCoupon(coupon.id)}
                        className="px-4 py-2 bg-amber-500 text-white rounded-full text-sm font-medium"
                      >
                        Redeem
                      </motion.button>
                    )}
                    {isUsed && (
                      <div className="flex items-center text-gray-500">
                        <CheckCircle size={16} className="mr-1" />
                        <span className="text-sm">Used</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                  <div className={`absolute top-0 right-0 w-16 h-16 transform rotate-45 ${
                    isUsed ? 'bg-gray-300' : 'bg-amber-400'
                  } -mt-2 -mr-2`}></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CouponsPage;