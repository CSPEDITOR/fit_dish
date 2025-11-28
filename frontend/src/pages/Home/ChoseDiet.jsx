// import React from 'react'

// import diet1 from "../../images/diet1.png"
// import diet2 from "../../images/diet2.png"
// import diet3 from "../../images/diet3.png"
// import "./ChoseDiet.css"
// function ChoseDiet() {

//     let ourCategories = [
//         {
//             title: "Normal Diet",
//             desc: "Balanced food routine for maintaining current weight."
//         },
//         {
//             title: "Weight Loss",
//             desc: "Low-calorie, high-fiber meals for fat burning."
//         },
//         {
//             title: "Weight Gain",
//             desc: "High-protein, calorie-rich foods for muscle and mass gain."
//         },
//         {
//             title: "Detox & Hydration",
//             desc: "Includes detox water, warm water, lemon water, etc."
//         },
//     ]

//     let ourCategoriesList = ourCategories.map(
//         (item, index) => {
//             return (
//                 <div className='w-full flex flex-row justify-center gap-6 mb-2' key={index + "ourCategories"}>
//                     <div className='font-extrabold text-5xl t-4'>{index + 1}.</div>
//                     <div className='w-[70%]'>
//                         <div className='t-4 text-3xl font-semibold'>{item.title}</div>
//                         <div className='t-4 w-[80%]'>{item.desc}</div>
//                     </div>
//                 </div>
//             )
//         }
//     )

//     return (
//         <div className='w-full'>
//             <div className='relative w-full flex flex-row mb-12'>
//                 <div className='w-1/2'></div>
//                 <div className='w-1/2 relative'>
//                     <div className='text-center text-4xl font-bold'>Our Categories</div>
//                     <div className="red-line h-1 w-[35%] bg-[#CC2405] absolute top-11 right-60"></div>
//                 </div>
//             </div>
//             <div className='w-full flex flex-row justify-center items-center'>
//                 <div className="chose-diet-images w-[60%] bg-admber-500 flex flex-row items-center justify-center">
//                     <img src={diet1} className='w-1/2 object-center' alt="" />
//                     <div className='w-1/4 gap-2 flex flex-col '>
//                         <img src={diet2} className='w-full' alt="" />
//                         <img src={diet3} className='w-full' alt="" />
//                     </div>
//                 </div>
//                 <div className='w-1/2 flex flex-col justify-between'>
//                     {ourCategoriesList}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ChoseDiet


// import React, { useState } from "react";

// // import diet1 from "../../images/weightloss1.avif";
// // import diet1 from "../../images/weightloss2.jpg";
// // import diet1 from "../../images/weightloss3.jpg";
// import diet1 from "../../images/diet1.png"
// import diet2 from "../../images/diet2.png"
// import diet3 from "../../images/diet3.png"
// import diet4 from "../../images/diet3.png"
// // add new image if needed
// import "./ChoseDiet.css";

// function ChoseDiet() {
//   const [activeImage, setActiveImage] = useState(diet1);

//   let ourCategories = [
//     {
//       title: "Normal Diet",
//       desc: "Balanced food routine for maintaining current weight.",
//       img: diet1,
//     },
//     {
//       title: "Weight Loss",
//       desc: "Low-calorie, high-fiber meals for fat burning.",
//       img: diet2,
//     },
//     {
//       title: "Weight Gain",
//       desc: "High-protein, calorie-rich foods for muscle and mass gain.",
//       img: diet3,
//     },
//     {
//       title: "Detox & Hydration",
//       desc: "Includes detox water, warm water, lemon water, etc.",
//       img: diet4,
//     },
//   ];

//   let ourCategoriesList = ourCategories.map((item, index) => {
//     return (
//       <div
//         className="w-full flex flex-row justify-center gap-6 mb-4 cursor-pointer"
//         key={index}
//         onMouseEnter={() => setActiveImage(item.img)}
//       >
//         <div className="font-extrabold text-4xl">{index + 1}.</div>

//         <div className="w-[70%]">
//           <div className="text-3xl font-semibold hover:text-[#CC2405] duration-300">
//             {item.title}
//           </div>
//           <div className="w-[80%]">{item.desc}</div>
//         </div>
//       </div>
//     );
//   });

//   return (
//     <div className="w-full">
//       <div className="relative w-full flex flex-row mb-12">
//         <div className="w-1/2"></div>
//         <div className="w-1/2 relative">
//           <div className="text-center text-4xl font-bold">Our Categories</div>
//           <div className="red-line h-1 w-[35%] bg-[#CC2405] absolute top-11 right-60"></div>
//         </div>
//       </div>

//       <div className="w-full flex flex-row justify-center items-center">
//         {/* Image container */}
//         <div className="chose-diet-images w-[60%] flex items-center justify-center">
//           <img
//             key={activeImage} // IMPORTANT → triggers fade animation
//             src={activeImage}
//             className="w-3/4 fade-image"
//             alt=""
//           />
//         </div>

//         <div className="w-1/2 flex flex-col justify-between">
//           {ourCategoriesList}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChoseDiet;


// import React, { useState } from 'react'

// import diet1 from "../../images/diet1.png"
// import diet2 from "../../images/diet2.png"
// import diet3 from "../../images/diet3.png"
// // Import additional images for other categories
// import diet4 from "../../images/weightLoss1.avif"
// import diet5 from "../../images/weightLoss2.jpg"
// import diet6 from "../../images/weightLoss3.jpg"
// // ... and so on for other categories

// import "./ChoseDiet.css"

// function ChoseDiet() {
//     const [activeCategory, setActiveCategory] = useState(0)

//     let ourCategories = [
//         {
//             title: "Normal Diet",
//             desc: "Balanced food routine for maintaining current weight.",
//             images: {
//                 main: diet1,
//                 top: diet2,
//                 bottom: diet3
//             }
//         },
//         {
//             title: "Weight Loss",
//             desc: "Low-calorie, high-fiber meals for fat burning.",
//             images: {
//                 main: diet4, // Replace with weightLoss1
//                 top: diet5,  // Replace with weightLoss2
//                 bottom: diet6 // Replace with weightLoss3
//             }
//         },
//         {
//             title: "Weight Gain",
//             desc: "High-protein, calorie-rich foods for muscle and mass gain.",
//             images: {
//                 main: diet1, // Replace with weightGain1
//                 top: diet2,  // Replace with weightGain2
//                 bottom: diet3 // Replace with weightGain3
//             }
//         },
//         {
//             title: "Detox & Hydration",
//             desc: "Includes detox water, warm water, lemon water, etc.",
//             images: {
//                 main: diet1, // Replace with detox1
//                 top: diet2,  // Replace with detox2
//                 bottom: diet3 // Replace with detox3
//             }
//         },
//     ]

//     let ourCategoriesList = ourCategories.map(
//         (item, index) => {
//             return (
//                 <div 
//                     className='w-full flex flex-row justify-center gap-6 mb-2' 
//                     key={index + "ourCategories"}
//                     onMouseEnter={() => setActiveCategory(index)}
//                 >
//                     <div className='font-extrabold text-5xl t-4'>{index + 1}.</div>
//                     <div className='w-[70%]'>
//                         <div className='t-4 text-3xl font-semibold'>{item.title}</div>
//                         <div className='t-4 w-[80%]'>{item.desc}</div>
//                     </div>
//                 </div>
//             )
//         }
//     )

//     return (
//         <div className='w-full'>
//             <div className='relative w-full flex flex-row mb-12'>
//                 <div className='w-1/2'></div>
//                 <div className='w-1/2 relative'>
//                     <div className='text-center text-4xl font-bold'>Our Categories</div>
//                     <div className="red-line h-1 w-[35%] bg-[#CC2405] absolute top-11 right-60"></div>
//                 </div>
//             </div>
//             <div className='w-full flex flex-row justify-center items-center'>
//                 <div className="chose-diet-images w-[60%] bg-admber-500 flex flex-row items-center justify-center">
//                     <img 
//                         src={ourCategories[activeCategory].images.main} 
//                         className='w-1/2 object-center' 
//                         alt="" 
//                     />
//                     <div className='w-1/4 gap-2 flex flex-col '>
//                         <img 
//                             src={ourCategories[activeCategory].images.top} 
//                             className='w-full' 
//                             alt="" 
//                         />
//                         <img 
//                             src={ourCategories[activeCategory].images.bottom} 
//                             className='w-full' 
//                             alt="" 
//                         />
//                     </div>
//                 </div>
//                 <div className='w-1/2 flex flex-col justify-between'>
//                     {ourCategoriesList}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ChoseDiet


// import React, { useState } from 'react'

// import diet1 from "../../images/diet1.png"
// import diet2 from "../../images/diet2.png"
// import diet3 from "../../images/diet3.png"
// // Import additional images for other categories
// // import weightLoss1 from "../../images/weightLoss1.png"
// // import weightLoss2 from "../../images/weightLoss2.png"
// // import weightLoss3 from "../../images/weightLoss3.png"
// // ... and so on for other categories
// import diet4 from "../../images/weightLoss1.avif"
// import diet5 from "../../images/weightLoss2.jpg"
// import diet6 from "../../images/weightLoss3.jpg"

// import "./ChoseDiet.css"

// function ChoseDiet() {
//     const [activeCategory, setActiveCategory] = useState(0)

//     let ourCategories = [
//         {
//             title: "Normal Diet",
//             desc: "Balanced food routine for maintaining current weight.",
//             images: {
//                 main: diet1,
//                 top: diet2,
//                 bottom: diet3
//             }
//         },
//         {
//             title: "Weight Loss",
//             desc: "Low-calorie, high-fiber meals for fat burning.",
//             images: {
//                 main: diet4, // Replace with weightLoss1
//                 top: diet5,  // Replace with weightLoss2
//                 bottom: diet6 // Replace with weightLoss3
//             }
//         },
//         {
//             title: "Weight Gain",
//             desc: "High-protein, calorie-rich foods for muscle and mass gain.",
//             images: {
//                 main: diet1, // Replace with weightGain1
//                 top: diet2,  // Replace with weightGain2
//                 bottom: diet3 // Replace with weightGain3
//             }
//         },
//         {
//             title: "Detox & Hydration",
//             desc: "Includes detox water, warm water, lemon water, etc.",
//             images: {
//                 main: diet1, // Replace with detox1
//                 top: diet2,  // Replace with detox2
//                 bottom: diet3 // Replace with detox3
//             }
//         },
//     ]

//     let ourCategoriesList = ourCategories.map(
//         (item, index) => {
//             return (
//                 <div 
//                     className='w-full flex flex-row justify-center gap-6 mb-2' 
//                     key={index + "ourCategories"}
//                     onMouseEnter={() => setActiveCategory(index)}
//                 >
//                     <div className='font-extrabold text-5xl t-4'>{index + 1}.</div>
//                     <div className='w-[70%]'>
//                         <div className='t-4 text-3xl font-semibold'>{item.title}</div>
//                         <div className='t-4 w-[80%]'>{item.desc}</div>
//                     </div>
//                 </div>
//             )
//         }
//     )

//     return (
//         <div className='w-full'>
//             <div className='relative w-full flex flex-row mb-12'>
//                 <div className='w-1/2'></div>
//                 <div className='w-1/2 relative'>
//                     <div className='text-center text-4xl font-bold'>Our Categories</div>
//                     <div className="red-line h-1 w-[35%] bg-[#CC2405] absolute top-11 right-60"></div>
//                 </div>
//             </div>
//             <div className='w-full flex flex-row justify-center items-center'>
//                 <div className="chose-diet-images w-[60%] bg-admber-500 flex flex-row items-center justify-center">
//                     <div className='w-1/2 h-full'>
//                         <img 
//                             src={ourCategories[activeCategory].images.main} 
//                             className='w-full h-full object-cover object-center' 
//                             alt="" 
//                         />
//                     </div>
//                     <div className='w-1/4 gap-2 flex flex-col h-full'>
//                         <div className='w-full h-1/2'>
//                             <img 
//                                 src={ourCategories[activeCategory].images.top} 
//                                 className='w-full h-full object-cover' 
//                                 alt="" 
//                             />
//                         </div>
//                         <div className='w-full h-1/2'>
//                             <img 
//                                 src={ourCategories[activeCategory].images.bottom} 
//                                 className='w-full h-full object-cover' 
//                                 alt="" 
//                             />
//                         </div>
//                     </div>
//                 </div>
//                 <div className='w-1/2 flex flex-col justify-between'>
//                     {ourCategoriesList}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ChoseDiet


// import React, { useState } from 'react'
// import diet1 from "../../images/diet1.png"
// import diet2 from "../../images/diet2.png"
// import diet3 from "../../images/diet3.png"
// import "./ChoseDiet.css"

// function ChoseDiet() {
//     const [activeCategory, setActiveCategory] = useState(0);
//     const [currentImages, setCurrentImages] = useState([diet1, diet2, diet3]);

//     let ourCategories = [
//         {
//             title: "Normal Diet",
//             desc: "Balanced food routine for maintaining current weight.",
//             images: [diet1, diet2, diet3]
//         },
//         {
//             title: "Weight Loss",
//             desc: "Low-calorie, high-fiber meals for fat burning.",
//             images: [diet2, diet1, diet3]
//         },
//         {
//             title: "Weight Gain",
//             desc: "High-protein, calorie-rich foods for muscle and mass gain.",
//             images: [diet3, diet1, diet2]
//         },
//         {
//             title: "Detox & Hydration",
//             desc: "Includes detox water, warm water, lemon water, etc.",
//             images: [diet1, diet3, diet2]
//         },
//     ]

//     const handleCategoryHover = (index) => {
//         setActiveCategory(index);
//         setCurrentImages(ourCategories[index].images);
//     }

//     let ourCategoriesList = ourCategories.map(
//         (item, index) => {
//             return (
//                 <div 
//                     className={`w-full flex flex-row justify-center gap-6 mb-2 p-4 rounded-lg transition-all duration-300 cursor-pointer ${
//                         activeCategory === index ? 'bg-gray-100 scale-105 shadow-md' : 'hover:bg-gray-50'
//                     }`}
//                     key={index + "ourCategories"}
//                     onMouseEnter={() => handleCategoryHover(index)}
//                     onMouseLeave={() => handleCategoryHover(0)}
//                 >
//                     <div className='font-extrabold text-5xl t-4'>{index + 1}.</div>
//                     <div className='w-[70%]'>
//                         <div className={`t-4 text-3xl font-semibold transition-all duration-300 ${
//                             activeCategory === index ? 'text-[#CC2405]' : ''
//                         }`}>{item.title}</div>
//                         <div className='t-4 w-[80%]'>{item.desc}</div>
//                     </div>
//                 </div>
//             )
//         }
//     )

//     return (
//         <div className='w-full'>
//             <div className='relative w-full flex flex-row mb-12'>
//                 <div className='w-1/2'></div>
//                 <div className='w-1/2 relative'>
//                     <div className='text-center text-4xl font-bold'>Our Categories</div>
//                     <div className="red-line h-1 w-[35%] bg-[#CC2405] absolute top-11 right-60"></div>
//                 </div>
//             </div>
//             <div className='w-full flex flex-row justify-center items-center'>
//                 <div className="chose-diet-images w-[60%] bg-admber-500 flex flex-row items-center justify-center p-4">
//                     <div className='w-2/3 pr-2'>
//                         <div className="image-container relative w-full h-64 overflow-hidden rounded-lg shadow-md">
//                             <img 
//                                 src={currentImages[0]} 
//                                 className='image-transition w-full h-full object-cover'
//                                 alt={ourCategories[activeCategory].title}
//                             />
//                         </div>
//                     </div>
//                     <div className='w-1/3 gap-2 flex flex-col pl-2'>
//                         <div className="image-container relative w-full h-32 overflow-hidden rounded-lg shadow-md">
//                             <img 
//                                 src={currentImages[1]} 
//                                 className='image-transition w-full h-full object-cover'
//                                 alt={ourCategories[activeCategory].title}
//                             />
//                         </div>
//                         <div className="image-container relative w-full h-32 overflow-hidden rounded-lg shadow-md">
//                             <img 
//                                 src={currentImages[2]} 
//                                 className='image-transition w-full h-full object-cover'
//                                 alt={ourCategories[activeCategory].title}
//                             />
//                         </div>
//                     </div>
//                 </div>
//                 <div className='w-1/2 flex flex-col justify-between'>
//                     {ourCategoriesList}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ChoseDiet

// import React, { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import diet1 from "../../images/diet1.png"
// import diet2 from "../../images/diet2.png"
// import diet3 from "../../images/diet3.png"
// import "./ChoseDiet.css"

// function ChoseDiet() {
//     const [activeCategory, setActiveCategory] = useState(0);

//     let ourCategories = [
//         {
//             title: "Normal Diet",
//             desc: "Balanced food routine for maintaining current weight.",
//             images: [diet1, diet2, diet3]
//         },
//         {
//             title: "Weight Loss",
//             desc: "Low-calorie, high-fiber meals for fat burning.",
//             images: [diet2, diet1, diet3]
//         },
//         {
//             title: "Weight Gain",
//             desc: "High-protein, calorie-rich foods for muscle and mass gain.",
//             images: [diet3, diet1, diet2]
//         },
//         {
//             title: "Detox & Hydration",
//             desc: "Includes detox water, warm water, lemon water, etc.",
//             images: [diet1, diet3, diet2]
//         },
//     ]

//     let ourCategoriesList = ourCategories.map(
//         (item, index) => {
//             return (
//                 <motion.div 
//                     className={`w-full flex flex-row justify-center gap-6 mb-4 p-4 rounded-lg cursor-pointer category-item ${
//                         activeCategory === index ? 'active-category' : ''
//                     }`}
//                     key={index + "ourCategories"}
//                     onMouseEnter={() => setActiveCategory(index)}
//                     whileHover={{ x: 10 }}
//                     transition={{ type: "spring", stiffness: 300 }}
//                 >
//                     <div className='font-extrabold text-5xl t-4'>{index + 1}.</div>
//                     <div className='w-[70%]'>
//                         <div className={`t-4 text-3xl font-semibold transition-colors duration-300 ${
//                             activeCategory === index ? 'text-[#CC2405]' : 'text-gray-800'
//                         }`}>{item.title}</div>
//                         <div className='t-4 w-[80%] text-gray-600'>{item.desc}</div>
//                     </div>
//                 </motion.div>
//             )
//         }
//     )

//     const imageVariants = {
//         initial: { opacity: 0, scale: 0.9 },
//         animate: { opacity: 1, scale: 1 },
//         exit: { opacity: 0, scale: 1.1 }
//     }

//     const transition = {
//         duration: 0.5,
//         ease: "easeInOut"
//     }

//     return (
//         <div className='w-full'>
//             <div className='relative w-full flex flex-row mb-12'>
//                 <div className='w-1/2'></div>
//                 <div className='w-1/2 relative'>
//                     <div className='text-center text-4xl font-bold'>Our Categories</div>
//                     <div className="red-line h-1 w-[35%] bg-[#CC2405] absolute top-11 right-60"></div>
//                 </div>
//             </div>
//             <div className='w-full flex flex-row justify-center items-start gap-8'>
//                 {/* Images Section */}
//                 <div className="chose-diet-images w-[60%] flex flex-row items-start justify-center p-4">
//                     <div className='w-2/3 pr-3'>
//                         <div className="image-container relative w-full h-64 overflow-hidden rounded-lg shadow-lg">
//                             <AnimatePresence mode='wait'>
//                                 <motion.img 
//                                     key={`main-${activeCategory}`}
//                                     src={ourCategories[activeCategory].images[0]} 
//                                     className='w-full h-full object-cover'
//                                     alt={ourCategories[activeCategory].title}
//                                     variants={imageVariants}
//                                     initial="initial"
//                                     animate="animate"
//                                     exit="exit"
//                                     transition={transition}
//                                 />
//                             </AnimatePresence>
//                         </div>
//                     </div>
//                     <div className='w-1/3 gap-3 flex flex-col pl-3'>
//                         <div className="image-container relative w-full h-32 overflow-hidden rounded-lg shadow-lg">
//                             <AnimatePresence mode='wait'>
//                                 <motion.img 
//                                     key={`small1-${activeCategory}`}
//                                     src={ourCategories[activeCategory].images[1]} 
//                                     className='w-full h-full object-cover'
//                                     alt={ourCategories[activeCategory].title}
//                                     variants={imageVariants}
//                                     initial="initial"
//                                     animate="animate"
//                                     exit="exit"
//                                     transition={transition}
//                                 />
//                             </AnimatePresence>
//                         </div>
//                         <div className="image-container relative w-full h-32 overflow-hidden rounded-lg shadow-lg">
//                             <AnimatePresence mode='wait'>
//                                 <motion.img 
//                                     key={`small2-${activeCategory}`}
//                                     src={ourCategories[activeCategory].images[2]} 
//                                     className='w-full h-full object-cover'
//                                     alt={ourCategories[activeCategory].title}
//                                     variants={imageVariants}
//                                     initial="initial"
//                                     animate="animate"
//                                     exit="exit"
//                                     transition={transition}
//                                 />
//                             </AnimatePresence>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Categories List */}
//                 <div className='w-1/2 flex flex-col justify-start'>
//                     {ourCategoriesList}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ChoseDiet
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import diet1 from "../../images/diet1.png"
import diet2 from "../../images/diet2.png"
import diet3 from "../../images/diet3.png"
import "./ChoseDiet.css"

function ChoseDiet() {
    const [activeCategory, setActiveCategory] = useState(0);

    let ourCategories = [
        {
            title: "Normal Diet",
            desc: "Balanced food routine for maintaining current weight.",
            images: [diet1, diet2, diet3],
            imageText: "Maintain Healthy Weight"
        },
        {
            title: "Weight Loss",
            desc: "Low-calorie, high-fiber meals for fat burning.",
            images: [diet2, diet1, diet3],
            imageText: "Burn Fat Effectively"
        },
        {
            title: "Weight Gain",
            desc: "High-protein, calorie-rich foods for muscle and mass gain.",
            images: [diet3, diet1, diet2],
            imageText: "Build Muscle Mass"
        },
        {
            title: "Detox & Hydration",
            desc: "Includes detox water, warm water, lemon water, etc.",
            images: [diet1, diet3, diet2],
            imageText: "Cleanse & Hydrate"
        },
    ]

    let ourCategoriesList = ourCategories.map(
        (item, index) => {
            return (
                <motion.div 
                    className={`w-full flex flex-row justify-center gap-6 mb-4 p-4 rounded-lg cursor-pointer category-item ${
                        activeCategory === index ? 'active-category' : ''
                    }`}
                    key={index + "ourCategories"}
                    onMouseEnter={() => setActiveCategory(index)}
                    whileHover={{ x: 5 }}
                    transition={{ type: "tween", duration: 0.2 }}
                >
                    <div className='font-extrabold text-5xl t-4'>{index + 1}.</div>
                    <div className='w-[70%] '>
                        <div className={`t-4 text-3xl font-semibold transition-colors duration-200 ${
                            activeCategory === index ? 'text-[#CC2405]' : 'text-gray-800'
                        }`}>{item.title}</div>
                        <div className='t-4 w-[80%] text-gray-600'>{item.desc}</div>
                    </div>
                </motion.div>
            )
        }
    )

    const fadeVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
    }

    const transition = {
        duration: 0.3,
        ease: "easeInOut"
    }

    return (
        <div className='w-full'>
            <div className='relative w-full flex flex-row mb-12'>
                <div className='w-1/2'></div>
                <div className='w-1/2 relative'>
                    <div className='text-center text-4xl font-bold'>Our Categories</div>
                    <div className="red-line h-1 w-[35%] bg-[#CC2405] absolute top-11 right-60"></div>
                </div>
            </div>
            <div className='w-full flex flex-row justify-center items-start gap-8'>
                {/* Images Section */}
                <div className="chose-diet-images w-[60%] flex flex-row items-start justify-center p-4">
                    {/* Main Large Image */}
                    <div className='w-2/3 pr-3'>
                        <div className="image-container main-image relative w-full h-64 overflow-hidden rounded-lg shadow-lg">
                            <AnimatePresence mode='wait'>
                                <motion.div
                                    key={`main-${activeCategory}`}
                                    className="relative w-full h-full"
                                    variants={fadeVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={transition}
                                >
                                    <img 
                                        src={ourCategories[activeCategory].images[0]} 
                                        className='w-full h-full object-cover'
                                        alt={ourCategories[activeCategory].title}
                                    />
                                    <div className="image-overlay absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                        <h3 className="text-white text-xl font-bold">
                                            {ourCategories[activeCategory].imageText}
                                        </h3>
                                        <p className="text-white/90 text-sm mt-1">
                                            {ourCategories[activeCategory].desc}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Small Images Column */}
                    <div className='w-1/3 gap-3 flex flex-col pl-3'>
                        {/* Small Image 1 */}
                        <div className="image-container small-image relative w-full h-32 overflow-hidden rounded-lg shadow-lg">
                            <AnimatePresence mode='wait'>
                                <motion.div
                                    key={`small1-${activeCategory}`}
                                    className="relative w-full h-full"
                                    variants={fadeVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={transition}
                                >
                                    <img 
                                        src={ourCategories[activeCategory].images[1]} 
                                        className='w-full h-full object-cover'
                                        alt={ourCategories[activeCategory].title}
                                    />
                                    <div className="image-overlay absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                                        <h4 className="text-white text-sm font-semibold">
                                            {ourCategories[activeCategory].title}
                                        </h4>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Small Image 2 */}
                        <div className="image-container small-image relative w-full h-32 overflow-hidden rounded-lg shadow-lg">
                            <AnimatePresence mode='wait'>
                                <motion.div
                                    key={`small2-${activeCategory}`}
                                    className="relative w-full h-full"
                                    variants={fadeVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={transition}
                                >
                                    <img 
                                        src={ourCategories[activeCategory].images[2]} 
                                        className='w-full h-full object-cover'
                                        alt={ourCategories[activeCategory].title}
                                    />
                                    <div className="image-overlay absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                                        <h4 className="text-white text-sm font-semibold">
                                            Healthy Recipes
                                        </h4>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Categories List */}
                <div className='w-1/2 flex flex-col justify-start'>
                    {ourCategoriesList}
                </div>
            </div>
        </div>
    )
}

export default ChoseDiet