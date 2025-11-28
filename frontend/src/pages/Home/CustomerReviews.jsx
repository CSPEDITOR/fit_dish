import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CustomerReviews = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const customers = [
    {
      name: "Chandra Shekhara Prasad",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop"
    },
    {
      name: "Sofia",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop"
    },
    {
      name: "Aditya",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-[90vw] max-w-7xl flex justify-between">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-6xl font-bold mb-2">
            Our <br />
            Happy <br />
            <span className="text-red-600">Customers</span>
          </h1>
          
          {/* Decorative elements */}
          <div className="flex gap-2 mt-6">
            <motion.div 
              className="w-12 h-1 bg-red-600"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.div 
              className="w-8 h-1 bg-gray-400"
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <motion.div 
              className="w-4 h-1 bg-gray-300"
              initial={{ width: 0 }}
              animate={{ width: 16 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
          </div>
        </div>
        {/* <motion.div 
          className="flex justify-center gap-2 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.svg
              key={i}
              className="w-8 h-8 text-amber-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.9 + i * 0.1 }}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </motion.svg>
          ))}
        </motion.div> */}

        {/* Cards Container */}
        <div className="flex gap-4 justify-center items-end h-[450px]">
          {customers.map((customer, index) => (
            <motion.div
              key={index}
              className="relative rounded-3xl overflow-hidden cursor-pointer"
              style={{
                backgroundImage: `url(${customer.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              initial={{ width: index === 0 ? 340 : 200, height: index === 0 ? 400 : 400 }}
              animate={{
                width: hoveredIndex === index ? 340 : hoveredIndex !== null ? 180 : index === 0 ? 340 : 200,
                height: hoveredIndex === index ? 400 : hoveredIndex !== null ? 400 : index === 0 ? 400 : 400,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Customer Name */}
              <motion.div
                className="absolute bottom-6 left-6 text-white font-bold text-2xl origin-bottom-left"
                animate={{
                  writingMode: hoveredIndex === null && index === 0 
                    ? 'horizontal-tb' 
                    : hoveredIndex === index 
                      ? 'horizontal-tb' 
                      : 'vertical-rl',
                  transform: hoveredIndex === null && index === 0 
                    ? 'rotate(0deg)' 
                    : hoveredIndex === index 
                      ? 'rotate(0deg)' 
                      : 'rotate(180deg)',
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                }}
              >
                {customer.name}
              </motion.div>

              {/* Hover decorative element */}
              <motion.div
                className="absolute top-6 right-6 w-12 h-12 border-2 border-white rounded-full flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  scale: hoveredIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <svg 
                  className="w-6 h-6 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decorative stars */}
        
      </div>
    </div>
  );
};

export default CustomerReviews;