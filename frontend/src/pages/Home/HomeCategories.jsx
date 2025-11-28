// // Categories.jsx
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import cat from "../../images/cat.png"
// import cat2 from "../../images/cat2.png"
// import { Link } from "react-router";
// import img1 from "../../images/1.png"
// import img2 from "../../images/2.png"
// import img3 from "../../images/3.png"
// import img4 from "../../images/4.png"
// import veg from "../../images/veg.png"
// import nveg from "../../images/nveg.png"
// import "./homeCategories.css"
// import { FaArrowRight } from "react-icons/fa";

// export const HomeCategories = () => {

//   let categories = [
//     {
//       title: "Healthy Salad",
//       time: "Breakfast",
//       img_link: img1,
//       veg: true,
//       color: "#ED7B7E",
//       link: ""
//     },
//     {
//       title: "Oatsmeal",
//       time: "Lunch",
//       img_link: img2,
//       veg: true,
//       color: "#F98B3D",
//       link: ""
//     },
//     {
//       title: "Sprout Salad",
//       time: "Breakfast",
//       img_link: img3,
//       veg: true,
//       color: "#6EDA49",
//       link: ""
//     },
//     {
//       title: "Grilled Chicken",
//       time: "Lunch",
//       img_link: img4,
//       veg: false,
//       color: "#7B79F5",
//       link: ""
//     },
//   ]

//   let categoriesCards = categories.map(
//     (item, index) => {
//       return (
//         <Link to={item.link} key={index + "kcfbwe"} className="relative rounded-2xl aspect-28/32 w-[20%] shadow-xl" style={{ backgroundColor: item.color }}>
//           <img src={item.img_link} className="absolute category-card-img" alt="" />
//           <div className="desc absolute bottom-0 h-[60%] bg-amgber-500 w-full">
//             <h1 className="t-3 text-white text-center text-2xl">{item.title}</h1>
//             <h2 className="t-3 text-white text-center">{item.time}</h2>

//             <div className="mt-4 w-[60%] mx-auto flex items-center justify-center flex-row gap-[15%]">
//               <div className="view-category px-8 py-2 w-[70%] rounded-full bg-white flex items-center justify-center gap-[1vmin]">
//                 <p className="t-3 text-sm">View</p>
//                 <div className="aspect-square rounded-full p-[20%]" style={{backgroundColor:item.color}}><FaArrowRight color="white" /></div>
//               </div>
//               <img src={item.veg ? veg : nveg} className="w-[25%] aspect-square object-cover" alt="" />
//             </div>
//           </div>
//         </Link>
//       )
//     }
//   )

//   return (
//     <div className='main-page  relative top-20 sm:top-0'>
//       <div className="container-categories w-full bg-amvvber-400 bg-center aspect-[26/9] bg-contain bg-no-repeat mb-8 flex items-center justify-center categorybg">
//         <div className="categories w-[70%] mt-10 flex items-center justify-around">
//           {categoriesCards}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomeCategories;

// import React, { useState, useEffect, useRef } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const HomeCategories = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoPlay, setIsAutoPlay] = useState(true);
//   const autoPlayRef = useRef();

//   const categories = [
//     {
//       title: "Healthy Salad",
//       time: "Breakfast",
//       img_link: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
//       veg: true,
//       color: "#ED7B7E",
//       link: ""
//     },
//     {
//       title: "Oatsmeal",
//       time: "Lunch",
//       img_link: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400",
//       veg: true,
//       color: "#F98B3D",
//       link: ""
//     },
//     {
//       title: "Sprout Salad",
//       time: "Breakfast",
//       img_link: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
//       veg: true,
//       color: "#6EDA49",
//       link: ""
//     },
//     {
//       title: "Grilled Chicken",
//       time: "Lunch",
//       img_link: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400",
//       veg: false,
//       color: "#7B79F5",
//       link: ""
//     },
//     {
//       title: "Fruit Bowl",
//       time: "Breakfast",
//       img_link: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400",
//       veg: true,
//       color: "#FF6B9D",
//       link: ""
//     },
//     {
//       title: "Pasta Delight",
//       time: "Dinner",
//       img_link: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400",
//       veg: true,
//       color: "#FFA726",
//       link: ""
//     }
//   ];

//   const [cardsToShow, setCardsToShow] = useState(4);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth <= 480) {
//         setCardsToShow(2);
//       } else if (window.innerWidth <= 768) {
//         setCardsToShow(3);
//       } else {
//         setCardsToShow(4);
//       }
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const maxIndex = categories.length - cardsToShow;

//   useEffect(() => {
//     if (isAutoPlay) {
//       autoPlayRef.current = setInterval(() => {
//         setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
//       }, 3000);
//     }

//     return () => {
//       if (autoPlayRef.current) {
//         clearInterval(autoPlayRef.current);
//       }
//     };
//   }, [isAutoPlay, maxIndex]);

//   const handlePrev = () => {
//     setIsAutoPlay(false);
//     setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
//     setTimeout(() => setIsAutoPlay(true), 5000);
//   };

//   const handleNext = () => {
//     setIsAutoPlay(false);
//     setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
//     setTimeout(() => setIsAutoPlay(true), 5000);
//   };

//   const [touchStart, setTouchStart] = useState(0);
//   const [touchEnd, setTouchEnd] = useState(0);

//   const handleTouchStart = (e) => {
//     setTouchStart(e.targetTouches[0].clientX);
//   };

//   const handleTouchMove = (e) => {
//     setTouchEnd(e.targetTouches[0].clientX);
//   };

//   const handleTouchEnd = () => {
//     if (!touchStart || !touchEnd) return;

//     const distance = touchStart - touchEnd;
//     const isLeftSwipe = distance > 50;
//     const isRightSwipe = distance < -50;

//     if (isLeftSwipe) {
//       handleNext();
//     }
//     if (isRightSwipe) {
//       handlePrev();
//     }

//     setTouchStart(0);
//     setTouchEnd(0);
//   };

//   return (
//     <div className="w-full py-4 sm:py-8 md:py-16">
//       <style>{`
//         @keyframes slideIn {
//           from {
//             opacity: 0;
//             transform: translateX(100px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         .category-card {
//           animation: slideIn 0.5s ease-out;
//         }

//         .category-card-img {
//           top: -15%;
//           left: 50%;
//           transform: translate(-50%, 0);
//           width: 85%;
//           object-fit: cover;
//           aspect-ratio: 1/1;
//           border-radius: 50%;
//           box-shadow: 0 10px 30px rgba(0,0,0,0.1);
//         }

//         @media (max-width: 640px) {
//           .category-card-img {
//             width: 80%;
//             top: -12%;
//           }
//         }

//         @media (max-width: 480px) {
//           .category-card-img {
//             width: 75%;
//             top: -10%;
//           }
//         }

//         .view-btn {
//           transition: all 0.3s ease;
//         }

//         .view-btn:hover {
//           transform: scale(1.05);
//         }

//         .nav-btn {
//           transition: all 0.3s ease;
//         }

//         .nav-btn:hover {
//           transform: scale(1.1);
//           box-shadow: 0 8px 20px rgba(0,0,0,0.15);
//         }

//         .nav-btn:active {
//           transform: scale(0.95);
//         }

//         /* Desktop curved background */
//         @media (min-width: 769px) {
//           .categorybg {
//             background: linear-gradient(180deg, transparent 0%, transparent 40%, #f8f5f0 40%, #f8f5f0 100%);
//             border-radius: 0 0 50% 50% / 0 0 15% 15%;
//           }
//         }

//         /* Tablet curved background */
//         @media (min-width: 481px) and (max-width: 768px) {
//           .categorybg {
//             background: linear-gradient(180deg, transparent 0%, transparent 35%, #f8f5f0 35%, #f8f5f0 100%);
//             border-radius: 0 0 40% 40% / 0 0 12% 12%;
//           }
//         }

//         /* Mobile rectangular background */
//         @media (max-width: 480px) {
//           .categorybg {
//             background: #f8f5f0;
//             border-radius: 0;
//             padding: 1rem 0.5rem;
//           }
//         }
//       `}</style>

//       <div className="relative categorybg px-4 md:px-8 py-8 md:py-12">
//         {/* Navigation Buttons */}
//         <button
//           onClick={handlePrev}
//           className="nav-btn absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 md:p-3 shadow-lg"
//           aria-label="Previous"
//         >
//           <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
//         </button>

//         <button
//           onClick={handleNext}
//           className="nav-btn absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 md:p-3 shadow-lg"
//           aria-label="Next"
//         >
//           <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
//         </button>

//         {/* Carousel Container */}
//         <div className="max-w-7xl mx-auto overflow-hidden">
//           <div
//             className="flex transition-transform duration-500 ease-in-out gap-4 md:gap-6"
//             style={{
//               transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`
//             }}
//           >
//             {categories.map((item, index) => (
//               <div
//                 key={index}
//                 className="category-card flex-shrink-0 w-[calc(50%-8px)] md:w-[calc(25%-18px)]"
//               >
//                 <div
//                   className="relative rounded-2xl shadow-xl overflow-visible pt-16 md:pt-20 pb-6 md:pb-8"
//                   style={{ backgroundColor: item.color, aspectRatio: '28/32' }}
//                 >
//                   <img
//                     src={item.img_link}
//                     className="category-card-img absolute"
//                     alt={item.title}
//                   />

//                   <div className="absolute bottom-0 w-full px-4 pb-4">
//                     <h1 className="text-white text-center text-lg md:text-2xl font-bold mb-1">
//                       {item.title}
//                     </h1>
//                     <h2 className="text-white text-center text-sm md:text-base opacity-90 mb-4">
//                       {item.time}
//                     </h2>

//                     <div className="flex items-center justify-center gap-2 md:gap-3">
//                       <button
//                         className="view-btn px-4 md:px-6 py-2 rounded-full bg-white flex items-center justify-center gap-2 flex-1 max-w-[120px]"
//                         onClick={() => console.log(`View ${item.title}`)}
//                       >
//                         <span className="text-xs md:text-sm font-medium">View</span>
//                         <div
//                           className="rounded-full p-1.5 md:p-2"
//                           style={{ backgroundColor: item.color }}
//                         >
//                           <svg
//                             className="w-2 h-2 md:w-3 md:h-3"
//                             fill="white"
//                             viewBox="0 0 16 16"
//                           >
//                             <path d="M8 0l8 8-8 8V0z" />
//                           </svg>
//                         </div>
//                       </button>

//                       <div
//                         className={`w-6 h-6 md:w-8 md:h-8 rounded border-2 flex items-center justify-center ${
//                           item.veg ? 'border-green-600' : 'border-red-600'
//                         }`}
//                       >
//                         <div
//                           className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${
//                             item.veg ? 'bg-green-600' : 'bg-red-600'
//                           }`}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Pagination Dots */}
//         <div className="flex justify-center gap-2 mt-6 md:mt-8">
//           {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
//             <button
//               key={idx}
//               onClick={() => {
//                 setIsAutoPlay(false);
//                 setCurrentIndex(idx);
//                 setTimeout(() => setIsAutoPlay(true), 5000);
//               }}
//               className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all ${
//                 currentIndex === idx ? 'bg-gray-800 w-6 md:w-8' : 'bg-gray-400'
//               }`}
//               aria-label={`Go to slide ${idx + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomeCategories;

// import React, { useState, useEffect, useRef } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const HomeCategories = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoPlay, setIsAutoPlay] = useState(true);
//   const [cardsToShow, setCardsToShow] = useState(4);
//   const [isMobile, setIsMobile] = useState(false);
//   const autoPlayRef = useRef();
//   const scrollContainerRef = useRef(null);

//   const categories = [
//     {
//       title: "Healthy Salad",
//       time: "Breakfast",
//       img_link: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
//       veg: true,
//       color: "#ED7B7E",
//       link: ""
//     },
//     {
//       title: "Oatsmeal",
//       time: "Lunch",
//       img_link: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400",
//       veg: true,
//       color: "#F98B3D",
//       link: ""
//     },
//     {
//       title: "Sprout Salad",
//       time: "Breakfast",
//       img_link: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
//       veg: true,
//       color: "#6EDA49",
//       link: ""
//     },
//     {
//       title: "Grilled Chicken",
//       time: "Lunch",
//       img_link: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400",
//       veg: false,
//       color: "#7B79F5",
//       link: ""
//     },
//     {
//       title: "Fruit Bowl",
//       time: "Breakfast",
//       img_link: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400",
//       veg: true,
//       color: "#FF6B9D",
//       link: ""
//     },
//     {
//       title: "Pasta Delight",
//       time: "Dinner",
//       img_link: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400",
//       veg: true,
//       color: "#FFA726",
//       link: ""
//     }
//   ];

//   // Check if mobile on mount and resize
//   useEffect(() => {
//     const checkMobile = () => {
//       const mobile = window.innerWidth <= 768;
//       setIsMobile(mobile);

//       if (window.innerWidth <= 480) {
//         setCardsToShow(2);
//       } else if (window.innerWidth <= 768) {
//         setCardsToShow(3);
//       } else {
//         setCardsToShow(4);
//       }
//     };

//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   const maxIndex = categories.length - cardsToShow;

//   // Desktop carousel auto-play
//   useEffect(() => {
//     if (!isMobile && isAutoPlay) {
//       autoPlayRef.current = setInterval(() => {
//         setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
//       }, 3000);
//     }

//     return () => {
//       if (autoPlayRef.current) {
//         clearInterval(autoPlayRef.current);
//       }
//     };
//   }, [isAutoPlay, maxIndex, isMobile]);

//   // Mobile scroll auto-play
//   useEffect(() => {
//     if (!isMobile || !isAutoPlay || !scrollContainerRef.current) return;

//     const interval = setInterval(() => {
//       const container = scrollContainerRef.current;
//       if (!container) return;

//       const cardWidth = container.scrollWidth / categories.length;
//       const maxScroll = container.scrollWidth - container.clientWidth;

//       if (container.scrollLeft >= maxScroll - 10) {
//         container.scrollTo({ left: 0, behavior: 'smooth' });
//       } else {
//         container.scrollBy({ left: cardWidth, behavior: 'smooth' });
//       }
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [isMobile, isAutoPlay, categories.length]);

//   const handleScroll = () => {
//     if (isMobile) {
//       setIsAutoPlay(false);
//       setTimeout(() => setIsAutoPlay(true), 5000);
//     }
//   };

//   const handlePrev = () => {
//     setIsAutoPlay(false);
//     setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
//     setTimeout(() => setIsAutoPlay(true), 5000);
//   };

//   const handleNext = () => {
//     setIsAutoPlay(false);
//     setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
//     setTimeout(() => setIsAutoPlay(true), 5000);
//   };

//   return (
//     <div className="w-full py-4 sm:py-8 md:py-16">
//       <style>{`
//         @keyframes slideIn {
//           from {
//             opacity: 0;
//             transform: translateX(100px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         .category-card {
//           animation: slideIn 0.5s ease-out;
//         }

//         .category-card-img {
//           top: -15%;
//           left: 50%;
//           transform: translate(-50%, 0);
//           width: 85%;
//           object-fit: cover;
//           aspect-ratio: 1/1;
//           border-radius: 50%;
//           box-shadow: 0 10px 30px rgba(0,0,0,0.1);
//         }

//         @media (max-width: 640px) {
//           .category-card-img {
//             width: 80%;
//             top: -12%;
//           }
//         }

//         @media (max-width: 480px) {
//           .category-card-img {
//             width: 75%;
//             top: -10%;
//           }
//         }

//         .view-btn {
//           transition: all 0.3s ease;
//         }

//         .view-btn:hover {
//           transform: scale(1.05);
//         }

//         .nav-btn {
//           transition: all 0.3s ease;
//         }

//         .nav-btn:hover {
//           transform: scale(1.1);
//           box-shadow: 0 8px 20px rgba(0,0,0,0.15);
//         }

//         .nav-btn:active {
//           transform: scale(0.95);
//         }

//         /* Hide scrollbar for mobile */
//         .mobile-scroll::-webkit-scrollbar {
//           display: none;
//         }

//         .mobile-scroll {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//           scroll-snap-type: x mandatory;
//           scroll-behavior: smooth;
//         }

//         .mobile-scroll-item {
//           scroll-snap-align: start;
//         }

//         /* Desktop curved background */
//         @media (min-width: 769px) {
//           .categorybg {
//             background: linear-gradient(180deg, transparent 0%, transparent 40%, #f8f5f0 40%, #f8f5f0 100%);
//             border-radius: 0 0 50% 50% / 0 0 15% 15%;
//           }
//         }

//         /* Tablet curved background */
//         @media (min-width: 481px) and (max-width: 768px) {
//           .categorybg {
//             background: linear-gradient(180deg, transparent 0%, transparent 35%, #f8f5f0 35%, #f8f5f0 100%);
//             border-radius: 0 0 40% 40% / 0 0 12% 12%;
//           }
//         }

//         /* Mobile rectangular background */
//         @media (max-width: 480px) {
//           .categorybg {
//             background: #f8f5f0;
//             border-radius: 0;
//             padding: 1rem 0.5rem;
//           }
//         }
//       `}</style>

//       <div className="relative categorybg px-2 sm:px-4 md:px-8 py-6 sm:py-8 md:py-12">
//         {/* Navigation Buttons - Hidden on Mobile and Tablet */}
//         {!isMobile && (
//           <>
//             <button
//               onClick={handlePrev}
//               className="nav-btn absolute left-8 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg"
//               aria-label="Previous"
//             >
//               <ChevronLeft className="w-6 h-6 text-gray-700" />
//             </button>

//             <button
//               onClick={handleNext}
//               className="nav-btn absolute right-8 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg"
//               aria-label="Next"
//             >
//               <ChevronRight className="w-6 h-6 text-gray-700" />
//             </button>
//           </>
//         )}

//         {/* Carousel Container */}
//         <div className="max-w-7xl mx-auto">
//           {isMobile ? (
//             /* Mobile/Tablet: Scrollable Container */
//             <div
//               ref={scrollContainerRef}
//               className="mobile-scroll flex overflow-x-auto gap-3 px-2"
//               onScroll={handleScroll}
//             >
//               {categories.map((item, index) => (
//                 <div
//                   key={index}
//                   className="mobile-scroll-item flex-shrink-0 w-[45%] sm:w-[32%]"
//                 >
//                   <div
//                     className="relative rounded-xl shadow-xl overflow-visible pt-12 sm:pt-14 pb-4 sm:pb-5"
//                     style={{ backgroundColor: item.color, aspectRatio: '28/32' }}
//                   >
//                     <img
//                       src={item.img_link}
//                       className="category-card-img absolute"
//                       alt={item.title}
//                     />

//                     <div className="absolute bottom-0 w-full px-2 sm:px-3 pb-3 sm:pb-4">
//                       <h1 className="text-white text-center text-sm sm:text-base font-bold mb-0.5 sm:mb-1">
//                         {item.title}
//                       </h1>
//                       <h2 className="text-white text-center text-xs sm:text-sm opacity-90 mb-2 sm:mb-3">
//                         {item.time}
//                       </h2>

//                       <div className="flex items-center justify-center gap-1.5 sm:gap-2">
//                         <button
//                           className="view-btn px-2 sm:px-3 py-1.5 sm:py-2 rounded-full bg-white flex items-center justify-center gap-1 flex-1 max-w-[80px] sm:max-w-[90px]"
//                           onClick={() => console.log(`View ${item.title}`)}
//                         >
//                           <span className="text-[10px] sm:text-xs font-medium">View</span>
//                           <div
//                             className="rounded-full p-1"
//                             style={{ backgroundColor: item.color }}
//                           >
//                             <svg
//                               className="w-1.5 h-1.5 sm:w-2 sm:h-2"
//                               fill="white"
//                               viewBox="0 0 16 16"
//                             >
//                               <path d="M8 0l8 8-8 8V0z" />
//                             </svg>
//                           </div>
//                         </button>

//                         <div
//                           className={`w-5 h-5 sm:w-6 sm:h-6 rounded border-2 flex items-center justify-center ${
//                             item.veg ? 'border-green-600' : 'border-red-600'
//                           }`}
//                         >
//                           <div
//                             className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
//                               item.veg ? 'bg-green-600' : 'bg-red-600'
//                             }`}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             /* Desktop: Carousel with transitions */
//             <div
//               className="flex transition-transform duration-500 ease-in-out gap-6"
//               style={{
//                 transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`
//               }}
//             >
//               {categories.map((item, index) => (
//                 <div
//                   key={index}
//                   className="category-card flex-shrink-0 w-[calc(25%-18px)]"
//                 >
//                   <div
//                     className="relative rounded-2xl shadow-xl overflow-visible pt-20 pb-8"
//                     style={{ backgroundColor: item.color, aspectRatio: '28/32' }}
//                   >
//                     <img
//                       src={item.img_link}
//                       className="category-card-img absolute"
//                       alt={item.title}
//                     />

//                     <div className="absolute bottom-0 w-full px-4 pb-4">
//                       <h1 className="text-white text-center text-2xl font-bold mb-1">
//                         {item.title}
//                       </h1>
//                       <h2 className="text-white text-center text-base opacity-90 mb-4">
//                         {item.time}
//                       </h2>

//                       <div className="flex items-center justify-center gap-3">
//                         <button
//                           className="view-btn px-6 py-2 rounded-full bg-white flex items-center justify-center gap-2 flex-1 max-w-[120px]"
//                           onClick={() => console.log(`View ${item.title}`)}
//                         >
//                           <span className="text-sm font-medium">View</span>
//                           <div
//                             className="rounded-full p-2"
//                             style={{ backgroundColor: item.color }}
//                           >
//                             <svg
//                               className="w-3 h-3"
//                               fill="white"
//                               viewBox="0 0 16 16"
//                             >
//                               <path d="M8 0l8 8-8 8V0z" />
//                             </svg>
//                           </div>
//                         </button>

//                         <div
//                           className={`w-8 h-8 rounded border-2 flex items-center justify-center ${
//                             item.veg ? 'border-green-600' : 'border-red-600'
//                           }`}
//                         >
//                           <div
//                             className={`w-4 h-4 rounded-full ${
//                               item.veg ? 'bg-green-600' : 'bg-red-600'
//                             }`}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Pagination Dots - Only show on desktop */}
//         {!isMobile && (
//           <div className="flex justify-center gap-2 mt-8">
//             {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => {
//                   setIsAutoPlay(false);
//                   setCurrentIndex(idx);
//                   setTimeout(() => setIsAutoPlay(true), 5000);
//                 }}
//                 className={`h-2.5 rounded-full transition-all ${
//                   currentIndex === idx
//                     ? 'bg-gray-800 w-8'
//                     : 'bg-gray-400 w-2.5'
//                 }`}
//                 aria-label={`Go to slide ${idx + 1}`}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomeCategories;

// import React, { useState, useEffect, useRef } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import "./homeCategories.css"
// import { FaArrowRight } from "react-icons/fa";
// import veg from "../../images/veg.png"
// import nveg from "../../images/nveg.png"
// const HomeCategories = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoPlay, setIsAutoPlay] = useState(true);
//   const [cardsToShow, setCardsToShow] = useState(4);
//   const [isMobile, setIsMobile] = useState(false);
//   const autoPlayRef = useRef();
//   const scrollContainerRef = useRef(null);

//   const categories = [
//     {
//       title: "Healthy Salad",
//       time: "Breakfast",
//       img_link: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
//       veg: true,
//       color: "#ED7B7E",
//       link: ""
//     },
//     {
//       title: "Oatsmeal",
//       time: "Lunch",
//       img_link: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400",
//       veg: true,
//       color: "#F98B3D",
//       link: ""
//     },
//     {
//       title: "Sprout Salad",
//       time: "Breakfast",
//       img_link: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
//       veg: true,
//       color: "#6EDA49",
//       link: ""
//     },
//     {
//       title: "Grilled Chicken",
//       time: "Lunch",
//       img_link: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400",
//       veg: false,
//       color: "#7B79F5",
//       link: ""
//     },
//     {
//       title: "Fruit Bowl",
//       time: "Breakfast",
//       img_link: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400",
//       veg: true,
//       color: "#FF6B9D",
//       link: ""
//     },
//     {
//       title: "Pasta Delight",
//       time: "Dinner",
//       img_link: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400",
//       veg: true,
//       color: "#FFA726",
//       link: ""
//     },
//     {
//       title: "Greek Salad",
//       time: "Lunch",
//       img_link: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400",
//       veg: true,
//       color: "#4CAF50",
//       link: ""
//     },
//     {
//       title: "Smoothie Bowl",
//       time: "Breakfast",
//       img_link: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400",
//       veg: true,
//       color: "#9C27B0",
//       link: ""
//     }
//   ];

//   useEffect(() => {
//     const checkMobile = () => {
//       const mobile = window.innerWidth <= 768;
//       setIsMobile(mobile);

//       if (window.innerWidth <= 480) {
//         setCardsToShow(2);
//       } else if (window.innerWidth <= 768) {
//         setCardsToShow(3);
//       } else {
//         setCardsToShow(4);
//       }
//     };

//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   const maxIndex = categories.length - cardsToShow;

//   useEffect(() => {
//     if (!isMobile && isAutoPlay) {
//       autoPlayRef.current = setInterval(() => {
//         setCurrentIndex((prev) => {
//           if (prev >= maxIndex) {
//             return 0;
//           }
//           return prev + 1;
//         });
//       }, 3000);
//     }

//     return () => {
//       if (autoPlayRef.current) {
//         clearInterval(autoPlayRef.current);
//       }
//     };
//   }, [isAutoPlay, maxIndex, isMobile]);

//   useEffect(() => {
//     if (!isMobile || !isAutoPlay || !scrollContainerRef.current) return;

//     const interval = setInterval(() => {
//       const container = scrollContainerRef.current;
//       if (!container) return;

//       const cardWidth = container.children[0]?.offsetWidth || 0;
//       const gap = 12;
//       const scrollAmount = cardWidth + gap;
//       const maxScroll = container.scrollWidth - container.clientWidth;

//       if (container.scrollLeft >= maxScroll - 10) {
//         container.scrollTo({ left: 0, behavior: 'smooth' });
//       } else {
//         container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//       }
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [isMobile, isAutoPlay]);

//   const handleScroll = () => {
//     if (isMobile) {
//       setIsAutoPlay(false);
//       setTimeout(() => setIsAutoPlay(true), 5000);
//     }
//   };

//   const handlePrev = () => {
//     setIsAutoPlay(false);
//     setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
//     setTimeout(() => setIsAutoPlay(true), 5000);
//   };

//   const handleNext = () => {
//     setIsAutoPlay(false);
//     setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
//     setTimeout(() => setIsAutoPlay(true), 5000);
//   };

//   const getTransform = () => {
//     // Fixed calculation for proper scrolling
//     const gapInPx = 24; // gap-6 = 24px
//     const containerWidth = 1090; // Your fixed container width
//     const totalGapWidth = (cardsToShow - 1) * gapInPx; // Total gap for visible cards
//     const cardWidth = (containerWidth - totalGapWidth) / cardsToShow; // Actual card width in px

//     // Calculate translation: move by (card width + gap) for each index
//     const translatePx = currentIndex * (cardWidth + gapInPx);

//     return `translateX(-${translatePx}px)`;
//   };

//   return (
//     <div className="w-full py-4 sm:py-8 md:py-16 flex justify-center items-center h-[85vh]">
//       <style>{`
//         .category-card-img {
//           top: -30%;
//           left: 50%;
//           transform: translate(-50%, 0);
//           width: 70%;
//           object-fit: cover;
//           aspect-ratio: 1/1;
//           border-radius: 50%;
//           box-shadow: 5px 7px 10px rgba(0,0,0,0.3);
//         }

//         @keyframes slideIn {
//           from {
//             opacity: 0;
//             transform: translateX(100px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         .category-card {
//           animation: slideIn 0.5s ease-out;
//         }

//         @media (max-width: 640px) {
//           .category-card-img {
//             width: 80%;
//             top: -12%;
//           }
//         }

//         @media (max-width: 480px) {
//           .category-card-img {
//             width: 75%;
//             top: -10%;
//           }
//         }

//         .view-btn {
//           transition: all 0.3s ease;
//         }

//         .view-btn:hover {
//           transform: scale(1.05);
//         }

//         .nav-btn {
//           transition: all 0.3s ease;
//         }

//         .nav-btn:hover {
//           transform: scale(1.1);
//           box-shadow: 0 8px 20px rgba(0,0,0,0.15);
//         }

//         .nav-btn:active {
//           transform: scale(0.95);
//         }

//         .mobile-scroll::-webkit-scrollbar {
//           display: none;
//         }

//         .mobile-scroll {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//           scroll-snap-type: x mandatory;
//           scroll-behavior: smooth;
//         }

//         .mobile-scroll-item {
//           scroll-snap-align: start;
//         }

//         .carousel-wrapper {
//           position: relative;
//           width: 980px;
//           height: 400px;
//           margin: 0 auto;
//         }

//         @media (max-width: 480px) {
//           .carousel-wrapper {
//             width: 380px;
//           }
//         }

//         .categorybg {
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//           height: 550px;
//         }

//         @media (max-width: 480px) {
//           .categorybg {

//             height: 330px;
//           }
//         }
//       `}</style>

//       <div className="relative categorybg px-2 sm:px-4 md:px-8 py-6 sm:py-8 md:py-12">
//         {!isMobile && (
//           <>
//             <button
//               onClick={handlePrev}
//               className="nav-btn absolute left-8 top-65 -translate-y-1/2 z-10 bg-white rounded-full p-10 shadow-lg"
//               aria-label="Previous"
//             >
//               <ChevronLeft className="w-6 h-6 text-gray-700" />
//             </button>

//             <button
//               onClick={handleNext}
//               className="nav-btn absolute right-8 top-65 -translate-y-1/2 z-10 bg-white rounded-full p-10 shadow-lg"
//               aria-label="Next"
//             >
//               <ChevronRight className="w-6 h-6 text-gray-700" />
//             </button>
//           </>
//         )}

//         <div className="carousel-wrapper overflow-hidden flex items-end">
//           {isMobile ? (
//             <div
//               ref={scrollContainerRef}
//               className="mobile-scroll flex overflow-x-auto gap-3 px-2"
//               onScroll={handleScroll}
//             >
//               {categories.map((item, index) => (
//                 <div
//                   key={index}
//                   className="mobile-scroll-item flex-shrink-0 w-[45%] sm:w-[32%]"
//                 >
//                   <div
//                     className="relative rounded-xl shadow-xl overflow-visible pt-12 sm:pt-14 pb-4 sm:pb-5"
//                     style={{ backgroundColor: item.color, aspectRatio: '28/32' }}
//                   >
//                     <img
//                       src={item.img_link}
//                       className="category-card-img absolute"
//                       alt={item.title}
//                     />

//                     <div className="absolute bottom-0 w-full px-2 sm:px-3 pb-3 sm:pb-4">
//                       <h1 className="text-white text-center text-sm sm:text-base font-bold mb-0.5 sm:mb-1">
//                         {item.title}
//                       </h1>
//                       <h2 className="text-white text-center text-xs sm:text-sm opacity-90 mb-2 sm:mb-3">
//                         {item.time}
//                       </h2>

//                       <div className="flex items-center justify-center gap-1.5 sm:gap-2">
//                         <button
//                           className="view-btn px-2 sm:px-3 py-1.5 sm:py-2 rounded-full bg-white flex items-center justify-center gap-1 flex-1 max-w-[80px] sm:max-w-[90px]"
//                           onClick={() => console.log(`View ${item.title}`)}
//                         >
//                           <span className="text-[10px] sm:text-xs font-medium">View</span>
//                           <div
//                             className="rounded-full p-1"
//                             style={{ backgroundColor: item.color }}
//                           >
//                            <FaArrowRight color="white" />
//                           </div>
//                         </button>

//                         <div
//                           className={`w-5 h-5 sm:w-6 sm:h-6 rounded border-2 flex items-center justify-center ${
//                             item.veg ? 'border-green-600' : 'border-red-600'
//                           }`}
//                         >
//                           <div
//                             className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
//                               item.veg ? 'bg-green-600' : 'bg-red-600'
//                             }`}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div
//               className="flex transition-transform duration-500 ease-in-out gap-6 bg-amber-800"
//               style={{
//                 transform: getTransform()
//               }}
//             >
//               {categories.map((item, index) => {
//                 const gapInPx = 24;
//                 const containerWidth = 980;
//                 const totalGapWidth = (cardsToShow - 1) * gapInPx;
//                 const cardWidth = (containerWidth - totalGapWidth) / cardsToShow;

//                 return (
//                   <div
//                     key={index}
//                     className="category-card flex-shrink-0 bg-amber-200"
//                     style={{ width: `${cardWidth}px` }}
//                   >
//                     <div
//                       className="relative rounded-2xl  overflow-visible pt-20 pb-8"
//                       style={{ backgroundColor: item.color, aspectRatio: '8/10', boxShadow:" 12px 12px 10px 1px rgb(0 0 0 / 0.2)", marginBottom:"20px", marginRight:"20px", marginLeft:"10px" }}
//                     >
//                       <img
//                         src={item.img_link}
//                         className="category-card-img absolute"
//                         alt={item.title}
//                       />

//                       <div className="absolute bottom-0 w-full px-4 pb-4">
//                         <h1 className="text-white text-center text-2xl font-bold mb-1">
//                           {item.title}
//                         </h1>
//                         <h2 className="text-white text-center text-base opacity-90 mb-4">
//                           {item.time}
//                         </h2>

//                         <div className="flex items-center justify-center gap-3">
//                           <button
//                             className="view-btn px-6 py-2 rounded-full bg-white flex items-center justify-center gap-2 flex-1 max-w-[120px]"
//                             onClick={() => console.log(`View ${item.title}`)}
//                           >
//                             <span className="text-sm font-medium">View</span>
//                             <div
//                               className="rounded-full p-2"
//                               style={{ backgroundColor: item.color }}
//                             >
//                              <FaArrowRight color="white" />
//                             </div>
//                           </button>

//                           <div
//                             className={`w-8 h-8 rounded border-2 flex items-center justify-center ${
//                               item.veg ? 'border-green-600' : 'border-red-600'
//                             }`}
//                           >
//                             <div
//                               className={`w-4 h-4 rounded-full ${
//                                 item.veg ? 'bg-green-600' : 'bg-red-600'
//                               }`}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         {!isMobile && (
//           <div className="flex justify-center gap-2 mt-2 mb-10">
//             {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => {
//                   setIsAutoPlay(false);
//                   setCurrentIndex(idx);
//                   setTimeout(() => setIsAutoPlay(true), 5000);
//                 }}
//                 className={`h-2.5 rounded-full transition-all ${
//                   currentIndex === idx
//                     ? 'bg-gray-800 w-8'
//                     : 'bg-gray-400 w-2.5'
//                 }`}
//                 aria-label={`Go to slide ${idx + 1}`}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomeCategories;

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import "./homeCategories.css";
import img1 from "../../images/1.png";
import img2 from "../../images/2.png";
import img3 from "../../images/3.png";
import img4 from "../../images/4.png";
import veg from "../../images/veg.png";
import nveg from "../../images/nveg.png";
const HomeCategories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [cardsToShow, setCardsToShow] = useState(4);
  const [isMobile, setIsMobile] = useState(false);
  const autoPlayRef = useRef();
  const scrollContainerRef = useRef(null);
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const categories = [
    {
      title: "Healthy Salad",
      time: "Breakfast",
      img_link: img1,
      veg: true,
      color: "#ED7B7E",
      link: "",
    },
    {
      title: "Oatsmeal",
      time: "Lunch",
      img_link: img2,
      veg: true,
      color: "#F98B3D",
      link: "",
    },
    {
      title: "Sprout Salad",
      time: "Breakfast",
      img_link: img3,
      veg: true,
      color: "#6EDA49",
      link: "",
    },
    {
      title: "Grilled Chicken",
      time: "Lunch",
      img_link: img4,
      veg: false,
      color: "#7B79F5",
      link: "",
    },
    {
      title: "Fruit Bowl",
      time: "Breakfast",
      img_link:
        "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400",
      veg: true,
      color: "#FF6B9D",
      link: "",
    },
    {
      title: "Pasta Delight",
      time: "Dinner",
      img_link:
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400",
      veg: true,
      color: "#FFA726",
      link: "",
    },
    {
      title: "Greek Salad",
      time: "Lunch",
      img_link:
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400",
      veg: true,
      color: "#4CAF50", 
      link: "",
    },
    {
      title: "Smoothie Bowl",
      time: "Breakfast",
      img_link:
        "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400",
      veg: true,
      color: "#9C27B0",
      link: "",
    },
  ];
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
        });
      },
      {
        threshold: 0.25, // Trigger when 20% of section is visible
        rootMargin: "-100px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      if (window.innerWidth <= 480) {
        setCardsToShow(2);
      } else if (window.innerWidth <= 768) {
        setCardsToShow(3);
      } else {
        setCardsToShow(4);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const maxIndex = categories.length - cardsToShow;

  useEffect(() => {
    if (!isMobile && isAutoPlay) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= maxIndex) {
            return 0;
          }
          return prev + 1;
        });
      }, 3000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlay, maxIndex, isMobile]);

  useEffect(() => {
    if (!isMobile || !isAutoPlay || !scrollContainerRef.current) return;

    const interval = setInterval(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const cardWidth = container.children[0]?.offsetWidth || 0;
      const gap = 12;
      const scrollAmount = cardWidth + gap;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isMobile, isAutoPlay]);

  const handleScroll = () => {
    if (isMobile) {
      setIsAutoPlay(false);
      setTimeout(() => setIsAutoPlay(true), 5000);
    }
  };

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setTimeout(() => setIsAutoPlay(true), 5000);
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setTimeout(() => setIsAutoPlay(true), 5000);
  };

  const getTransform = () => {
    // Fixed calculation for proper scrolling
    const gapInPx = 24; // gap-6 = 24px
    const containerWidth = 980; // Your fixed container width
    const totalGapWidth = (cardsToShow - 1) * gapInPx; // Total gap for visible cards
    const cardWidth = (containerWidth - totalGapWidth) / cardsToShow; // Actual card width in px

    // Calculate translation: move by (card width + gap) for each index
    const translatePx = currentIndex * (cardWidth + gapInPx);

    return `translateX(-${translatePx}px)`;
  };

  return (
    <div
      ref={sectionRef}
      className="w-full py-4 sm:py-8 md:py-16 flex justify-center items-center  parent"
    >
      <style>{`
        .category-card-img {
          top: -30%;
          left: 50%;
          transform: translate(-50%, 0);
          width: 70%;
          object-fit: cover;
          aspect-ratio: 1/1;
          border-radius: 50%;
          box-shadow: 5px 7px 10px rgba(0,0,0,0.3);
        }
        
        @keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-up-card {
  opacity: 0;
  animation: fadeUp 1s ease-out forwards;
}

.fade-up-card:nth-child(1) { animation-delay: 0.1s; }
.fade-up-card:nth-child(2) { animation-delay: 0.2s; }
.fade-up-card:nth-child(3) { animation-delay: 0.3s; }
.fade-up-card:nth-child(4) { animation-delay: 0.4s; }
.fade-up-card:nth-child(5) { animation-delay: 0.5s; }
.fade-up-card:nth-child(6) { animation-delay: 0.6s; }
.fade-up-card:nth-child(7) { animation-delay: 0.7s; }
.fade-up-card:nth-child(8) { animation-delay: 0.8s; }

        @media (max-width: 640px) {
          .category-card-img {
            width: 80%;
            top: -12%;
          }
        }

        @media (max-width: 480px) {
          .category-card-img {
            width: 75%;
            top: -10%;
          }
        }

        .view-btn {
          transition: all 0.3s ease;
        }

        .view-btn:hover {
          transform: scale(1.05);
        }

        .nav-btn {
          transition: all 0.3s ease;
        }

        .nav-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        .nav-btn:active {
          transform: scale(0.95);
        }

        .mobile-scroll::-webkit-scrollbar {
          display: none;
        }
        
        .mobile-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          display: flex;
          height:100%;
          justify-content: center;
          align-items: center;
        }

        .mobile-scroll-item {
          scroll-snap-align: start;
        }

        .carousel-wrapper {
          position: relative;
          width: 980px;
          height: 400px;
          margin: 0 auto;
        }
        
        @media (max-width: 480px) {
          .carousel-wrapper {
             width: 304px;
    height: 280px;
          }
        }

        .categorybg {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 550px;
        }
        
       
      `}</style>

      <div className="relative categorybg px-2 sm:px-4 md:px-8 py-6 sm:py-8 md:py-12">
        {!isMobile && (
          <>
            <button
              onClick={handlePrev}
              className="nav-btn absolute left-8 top-54 -translate-y-1/2 z-10 bg-white rounded-full p-10 shadow-lg"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            <button
              onClick={handleNext}
              className="nav-btn absolute right-3 top-56 -translate-y-1/2 z-10 bg-white rounded-full p-10 shadow-lg"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </>
        )}

        <div className="carousel-wrapper overflow-hidden flex items-end">
          {isMobile ? (
            <div
              ref={scrollContainerRef}
              className="mobile-scroll flex overflow-x-auto gap-3 px-4 w-full "
              onScroll={handleScroll}
            >
              {categories.map((item, index) => {
                // Same logic as desktop for mobile
                const gapInPx = 12; // gap-3 = 12px
                const containerWidth = 304; // Mobile container width
                const mobileCardsToShow = 2; // Show 2 cards on mobile
                const totalGapWidth = (mobileCardsToShow - 1) * gapInPx; // 1 gap = 12px
                const cardWidth =
                  (containerWidth - totalGapWidth) / mobileCardsToShow; // (304 - 12) / 2 = 146px

                return (
                  <div
                    key={index}
                    className={`mobile-scroll-item flex-shrink-0 ${
                      hasAnimated ? "fade-up-card" : ""
                    }`}
                    style={{ width: `${cardWidth}px` }}
                  >
                    <div
                      className="relative rounded-xl shadow-xl pt-12 sm:pt-14 pb-4 sm:pb-5"
                      style={{
                        backgroundColor: item.color,
                        aspectRatio: "22/32",
                      }}
                    >
                      <img
                        src={item.img_link}
                        className="category-card-img absolute"
                        alt={item.title}
                      />

                      <div className="absolute bottom-0 w-full px-2 sm:px-3 pb-3 sm:pb-4">
                        <h1 className="text-white text-center text-md sm:text-base font-bold mb-0.5 sm:mb-1">
                          {item.title}
                        </h1>
                        <h2 className="text-white text-center text-sm sm:text-sm opacity-90 mb-2 sm:mb-3">
                          {item.time}
                        </h2>

                        <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                          <button
                            className="view-btn px-2 sm:px-3 py-1.5 sm:py-2 rounded-full bg-white flex items-center justify-center gap-1 flex-1 max-w-[80px] sm:max-w-[90px]"
                            onClick={() => console.log(`View ${item.title}`)}
                          >
                            <span className="text-[10px] sm:text-xs font-medium">
                              View
                            </span>
                            <div
                              className="rounded-full p-1"
                              style={{ backgroundColor: item.color }}
                            >
                              <FaArrowRight color="white" />
                            </div>
                          </button>

                          <div
                            className={`w-5 h-5 sm:w-6 sm:h-6 rounded border-2 flex items-center justify-center ${
                              item.veg ? "border-green-600" : "border-red-600"
                            }`}
                          >
                            <div
                              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
                                item.veg ? "bg-green-600" : "bg-red-600"
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{
                transform: getTransform(),
              }}
            >
              {categories.map((item, index) => {
                const gapInPx = 24;
                const containerWidth = 980;
                const totalGapWidth = (cardsToShow - 1) * gapInPx;
                const cardWidth =
                  (containerWidth - totalGapWidth) / cardsToShow;

                return (
                  <div
                    key={index}
                    className={`flex-shrink-0 ${
                      hasAnimated ? "fade-up-card" : ""
                    }`} // ✅ Added animation class
                    style={{ width: `${cardWidth}px` }}
                  >
                    <div
                      className="relative rounded-2xl shadow-xl overflow-visible pt-20 pb-8"
                      style={{
                        backgroundColor: item.color,
                        aspectRatio: "19/20",
                        boxShadow: " 12px 12px 10px 1px rgb(0 0 0 / 0.2)",
                        marginBottom: "20px",
                        marginRight: "0px",
                        marginLeft: "16px",
                      }}
                    >
                      <img
                        src={item.img_link}
                        className="category-card-img absolute"
                        alt={item.title}
                      />

                      <div className="absolute bottom-0 w-full px-4 pb-4">
                        <h1 className="text-white text-center text-2xl font-bold mb-1">
                          {item.title}
                        </h1>
                        <h2 className="text-white text-center text-base opacity-90 mb-4">
                          {item.time}
                        </h2>

                        <div className="flex items-center justify-center gap-3">
                          <button
                            className="view-btn px-6 py-2 rounded-full bg-white flex items-center justify-center gap-2 flex-1 max-w-[120px]"
                            onClick={() => console.log(`View ${item.title}`)}
                          >
                            <span className="text-sm font-medium">View</span>
                            <div
                              className="rounded-full p-2"
                              style={{ backgroundColor: item.color }}
                            >
                              <FaArrowRight color="white" />
                            </div>
                          </button>

                          <div
                            className={`w-8 h-8 rounded border-2 flex items-center justify-center ${
                              item.veg ? "border-green-600" : "border-red-600"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded-full ${
                                item.veg ? "bg-green-600" : "bg-red-600"
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {!isMobile && (
          <div className="flex justify-center gap-2 mt-2 mb-5">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsAutoPlay(false);
                  setCurrentIndex(idx);
                  setTimeout(() => setIsAutoPlay(true), 5000);
                }}
                className={`h-2.5 rounded-full transition-all ${
                  currentIndex === idx ? "bg-gray-800 w-8" : "bg-gray-400 w-2.5"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeCategories;
