
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import user1 from '../../images/user1.jpg'
import user2 from '../../images/user2.jpg'
import user3 from '../../images/user3.jpg'
const CustomerReviews = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const allCustomers = [
    {
      name: "Chandra",
      image: user1,
      rating: 5,
      review: "Amazing food and service!"
    },
    {
      name: "sofia",
      image: user2,
      rating: 5,
      review: "Best dining experience ever!"
    },
    {
      name: "Aditya",
      image: user3,
      rating: 4,
      review: "Delicious food, great ambiance!"
    },
    {
      name: "Emma",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
      rating: 5,
      review: "Absolutely wonderful experience!"
    },
    {
      name: "Michael",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
      rating: 5,
      review: "Highly recommended restaurant!"
    },
    {
      name: "Priya",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop",
      rating: 4,
      review: "Great food and atmosphere!"
    }
  ];

  const getVisibleCustomers = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(allCustomers[(currentIndex + i) % allCustomers.length]);
    }
    return visible;
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allCustomers.length);
    setHoveredIndex(null);
    setClickedIndex(null);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + allCustomers.length) % allCustomers.length);
    setHoveredIndex(null);
    setClickedIndex(null);
  };

  const handleCardClick = (index) => {
    if (clickedIndex === index) {
      setClickedIndex(null);
    } else {
      setClickedIndex(index);
    }
  };

  const visibleCustomers = getVisibleCustomers();

  return (
    <div ref={sectionRef} className="min-h-screen bg-[#f5e6d3] flex items-center justify-center p-4 md:p-8 rounded-tr-full mt-10 md:mt-20 mb-10 md:mb-20">
      <motion.div 
        className="w-full md:w-[90vw] max-w-7xl"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-8">
          {/* Header */}
          <div className="mb-6 md:mb-12 flex-shrink-0 w-full lg:w-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 leading-tight">
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

            {/* Description Text */}
            <motion.p 
              className="mt-4 md:mt-6 text-gray-700 text-base md:text-lg max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Discover what our valued customers have to say about their delightful experiences. 
              Their satisfaction is our greatest achievement.
            </motion.p>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              <motion.button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              <motion.button
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>

            {/* Carousel Indicators */}
            <div className="flex gap-2 mt-6">
              {allCustomers.map((_, idx) => (
                <motion.div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'w-8 bg-red-600' : 'w-2 bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Cards Container */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-end min-h-[450px] md:h-[450px] relative w-full lg:w-auto">
            <AnimatePresence mode="wait">
              {visibleCustomers.map((customer, index) => {
                // On desktop: expand on click, on mobile: expand on click
                // clickedIndex takes priority over hover
                const isExpanded = clickedIndex === index;
                const isHovered = hoveredIndex === index && clickedIndex === null;
                const defaultExpanded = index === 0 && clickedIndex === null && hoveredIndex === null;
                
                return (
                <motion.div
                  key={`${currentIndex}-${index}`}
                  className="relative rounded-3xl overflow-hidden cursor-pointer w-full lg:w-auto"
                  style={{
                    boxShadow:"5px 5px 10px 5px rgba(0,0,0,0.2)",
                    backgroundImage: `url(${customer.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  initial={{ 
                    width: isMobile ? '100%' : (defaultExpanded ? 340 : 200),
                    height: isMobile ? (isExpanded ? 400 : 300) : 400,
                    opacity: 0,
                    x: isMobile ? 0 : 100,
                    y: isMobile ? 20 : 0
                  }}
                  animate={{
                    width: isMobile 
                      ? '100%'
                      : (isExpanded ? 340 : isHovered ? 340 : clickedIndex !== null && clickedIndex !== index ? 180 : defaultExpanded ? 340 : 200),
                    height: isMobile 
                      ? (isExpanded ? 400 : 300)
                      : 400,
                    opacity: 1,
                    x: 0,
                    y: 0
                  }}
                  exit={{
                    opacity: 0,
                    x: isMobile ? 0 : -100,
                    y: isMobile ? -20 : 0
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                  onHoverStart={() => {
                    // Only show hover effect if no card is clicked
                    if (!isMobile && clickedIndex === null) {
                      setHoveredIndex(index);
                    }
                  }}
                  onHoverEnd={() => {
                    if (!isMobile && clickedIndex === null) {
                      setHoveredIndex(null);
                    }
                  }}
                  onClick={() => handleCardClick(index)}
                >
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Customer Name */}
                  <motion.div
                    className="absolute bottom-4 md:bottom-6 left-4 md:left-8 text-white font-bold text-xl md:text-2xl origin-bottom-left whitespace-nowrap"
                    animate={{
                      rotate: isMobile 
                        ? 0
                        : ((isExpanded || isHovered) ? 0 : -90),
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25
                    }}
                  >
                    {customer.name}
                  </motion.div>

                  {/* Rating - Shows on hover/click */}
                  <motion.div
                    className="absolute bottom-16 md:bottom-20 left-4 md:left-6 flex gap-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: (isExpanded || isHovered) ? 1 : 0,
                      y: (isExpanded || isHovered) ? 0 : 10
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 md:w-5 md:h-5 ${i < customer.rating ? 'text-amber-400' : 'text-gray-400'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </motion.div>

                  {/* Review Text - Shows on hover/click */}
                  <motion.div
                    className="absolute bottom-24 md:bottom-32 left-4 md:left-6 right-4 md:right-6 text-white text-xs md:text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: (isExpanded || isHovered) ? 1 : 0,
                      y: (isExpanded || isHovered) ? 0 : 10
                    }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <p className="italic">"{customer.review}"</p>
                  </motion.div>

                  {/* Hover/Click decorative element */}
                  <motion.div
                    className="absolute top-4 md:top-6 right-4 md:right-6 w-10 h-10 md:w-12 md:h-12 border-2 border-white rounded-full flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: (isExpanded || isHovered) ? 1 : 0,
                      scale: (isExpanded || isHovered) ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg 
                      className="w-5 h-5 md:w-6 md:h-6 text-white" 
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
              )})}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomerReviews;