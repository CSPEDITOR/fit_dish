// import React, { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import diet1 from "../../images/diet1.png"
// import diet2 from "../../images/diet2.png"
// import diet3 from "../../images/diet3.png"
// import diet4 from "../../images/weightloss1.avif"
// import diet5 from "../../images/weightloss2.jpg"
// import diet6 from "../../images/weightloss3.jpg"
// import diet7 from "../../images/weightgain.jpg"
// import diet8 from "../../images/weightgain1.jpg"
// import diet9 from "../../images/weightgain3.jpg"
// import diet10 from "../../images/ditox.jpg"
// import diet11 from "../../images/ditox1.jpg"
// import diet12 from "../../images/ditox2.jpg"
// import "./ChoseDiet.css"

// function ChoseDiet() {
//     const [activeCategory, setActiveCategory] = useState(0);

//     let ourCategories = [
//         {
//             title: "Normal Diet",
//             desc: "Balanced food routine for maintaining current weight.",
//             images: [diet1, diet2, diet3],
//             imageText: "Maintain Healthy Weight"
//         },
//         {
//             title: "Weight Loss",
//             desc: "Low-calorie, high-fiber meals for fat burning.",
//             images: [diet4, diet5, diet6],
//             imageText: "Burn Fat Effectively"
//         },
//         {
//             title: "Weight Gain",
//             desc: "High-protein, calorie-rich foods for muscle and mass gain.",
//             images: [diet7, diet8, diet9],
//             imageText: "Build Muscle Mass"
//         },
//         {
//             title: "Detox & Hydration",
//             desc: "Includes detox water, warm water, lemon water, etc.",
//             images: [diet10, diet11, diet12],
//             imageText: "Cleanse & Hydrate"
//         },
//     ]

//     let ourCategoriesList = ourCategories.map(
//         (item, index) => {
//             return (
//                 <motion.div 
//                     className={`w-160 flex flex-row justify-center gap-6 mb-4 p-4 rounded-lg cursor-pointer category-item ${
//                         activeCategory === index ? 'active-category' : ''
//                     }`}
//                     key={index + "ourCategories"}
//                     onMouseEnter={() => setActiveCategory(index)}
//                     whileHover={{ x: 5 }}
//                     transition={{ type: "tween", duration: 0.2 }}
//                 >
//                     <div className='font-extrabold text-5xl t-4'>{index + 1}.</div>
//                     <div className='w-[90%]'>
//                         <div className={`t-4 text-3xl font-semibold transition-colors duration-200  ${
//                             activeCategory === index ? 'text-[#CC2405]' : 'text-gray-800'
//                         }`}>{item.title}</div>
//                         <div className='t-4 w-[80%] text-gray-600'>{item.desc}</div>
//                     </div>
//                 </motion.div>
//             )
//         }
//     )
//     const fadeVariants = {
//         initial: { opacity: 0 },
//         animate: { opacity: 1 },
//         exit: { opacity: 0 }
//     }

//     const transition = {
//         duration: 0.1,
//         ease: "easeInOut"
//     }

//     return (
//         <div className='w-[90%]'>
//             <div className='relative w-full flex flex-row mb-12'>
//                 <div className='w-1/2'></div>
//                 <div className='w-1/2 relative'>
//                     <div className='text-center text-4xl font-bold'>Our Categories</div>
//                     <div className="red-line h-1 w-[35%] bg-[#CC2405] absolute top-11 right-60"></div>
//                 </div>
//             </div>
//             <div className='w-full flex flex-row justify-center items-start gap-8'>
//                 {/* Images Section */}
//                 <div className="chose-diet-images w-[60%] h-full flex flex-row items-start justify-center p-4">
//                     {/* Main Large Image */}
//                     <div className='w-2/3 pr-3'>
//                         <div className="image-container main-image relative w-full h-100 overflow-hidden rounded-lg shadow-lg">
//                             <AnimatePresence mode='wait'>
//                                 <motion.div
//                                     key={`main-${activeCategory}`}
//                                     className="relative w-full h-full"
//                                     variants={fadeVariants}
//                                     initial="initial"
//                                     animate="animate"
//                                     exit="exit"
//                                     transition={transition}
//                                 >
//                                     <img 
//                                         src={ourCategories[activeCategory].images[0]} 
//                                         className='w-full h-full object-cover'
//                                         alt={ourCategories[activeCategory].title}
//                                     />
//                                     <div className="image-overlay absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
//                                         <h3 className="text-white text-4xl font-bold">
//                                             {ourCategories[activeCategory].imageText}
//                                         </h3>
//                                         <p className="text-white/90 text-md mt-1">
//                                             {ourCategories[activeCategory].desc}
//                                         </p>
//                                     </div>
//                                 </motion.div>
//                             </AnimatePresence>
//                         </div>
//                     </div>

//                     {/* Small Images Column */}
//                     <div className='w-1/3 gap-3 flex flex-col h-100 justify-center'>
//                         {/* Small Image 1 */}
//                         <div className="image-container small-image relative w-full h-50 overflow-hidden rounded-lg shadow-lg">
//                             <AnimatePresence mode='wait'>
//                                 <motion.div
//                                     key={`small1-${activeCategory}`}
//                                     className="relative w-full h-full"
//                                     variants={fadeVariants}
//                                     initial="initial"
//                                     animate="animate"
//                                     exit="exit"
//                                     transition={transition}
//                                 >
//                                     <img 
//                                         src={ourCategories[activeCategory].images[1]} 
//                                         className='w-full h-full object-cover'
//                                         alt={ourCategories[activeCategory].title}
//                                     />
//                                     <div className="image-overlay absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
//                                         <h4 className="text-white text-md font-semibold">
//                                             {ourCategories[activeCategory].title}
//                                         </h4>
//                                     </div>
//                                 </motion.div>
//                             </AnimatePresence>
//                         </div>

//                         {/* Small Image 2 */}
//                         <div className="image-container small-image relative w-full h-50 overflow-hidden rounded-lg shadow-lg">
//                             <AnimatePresence mode='wait'>
//                                 <motion.div
//                                     key={`small2-${activeCategory}`}
//                                     className="relative w-full h-full"
//                                     variants={fadeVariants}
//                                     initial="initial"
//                                     animate="animate"
//                                     exit="exit"
//                                     transition={transition}
//                                 >
//                                     <img 
//                                         src={ourCategories[activeCategory].images[2]} 
//                                         className='w-full h-full object-cover'
//                                         alt={ourCategories[activeCategory].title}
//                                     />
//                                     <div className="image-overlay absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
//                                         <h4 className="text-white text-md font-semibold">
//                                             Healthy Recipes
//                                         </h4>
//                                     </div>
//                                 </motion.div>
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
import diet4 from "../../images/weightloss1.avif"
import diet5 from "../../images/weightloss2.jpg"
import diet6 from "../../images/weightloss3.jpg"
import diet7 from "../../images/weightgain.jpg"
import diet8 from "../../images/weightgain1.jpg"
import diet9 from "../../images/weightgain3.jpg"
import diet10 from "../../images/ditox.jpg"
import diet11 from "../../images/ditox1.jpg"
import diet12 from "../../images/ditox2.jpg"
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
            images: [diet4, diet5, diet6],
            imageText: "Burn Fat Effectively"
        },
        {
            title: "Weight Gain",
            desc: "High-protein, calorie-rich foods for muscle and mass gain.",
            images: [diet7, diet8, diet9],
            imageText: "Build Muscle Mass"
        },
        {
            title: "Detox & Hydration",
            desc: "Includes detox water, warm water, lemon water, etc.",
            images: [diet10, diet11, diet12],
            imageText: "Cleanse & Hydrate"
        },
    ]

    let ourCategoriesList = ourCategories.map(
        (item, index) => {
            return (
                <motion.div 
                    className={`flex flex-row justify-center gap-6 mb-4 p-4 rounded-lg cursor-pointer category-item
                        md:w-160 md:flex-row
                        w-full flex-row
                        ${activeCategory === index ? 'active-category' : ''
                    }`}
                    key={index + "ourCategories"}
                    onMouseEnter={() => setActiveCategory(index)}
                    onClick={() => setActiveCategory(index)}
                    whileHover={{ x: 5 }}
                    transition={{ type: "tween", duration: 0.2 }}
                >
                    <div className='font-extrabold text-4xl md:text-5xl t-4 flex-shrink-0'>{index + 1}.</div>
                    <div className='w-[90%]'>
                        <div className={`t-4 text-2xl md:text-3xl font-semibold transition-colors duration-200  ${
                            activeCategory === index ? 'text-[#CC2405]' : 'text-gray-800'
                        }`}>{item.title}</div>
                        <div className='t-4 w-full md:w-[80%] text-sm md:text-base text-gray-600'>{item.desc}</div>
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
        duration: 0.1,
        ease: "easeInOut"
    }

    return (
        <div className='w-[90%] mx-auto'>
            <div className='relative w-full flex flex-col md:flex-row mb-8 md:mb-12'>
                <div className='w-full md:w-1/2'></div>
                <div className='w-full md:w-1/2 relative'>
                    <div className='text-center text-2xl md:text-4xl font-bold'>Our Categories</div>
                    <div className="red-line h-1 w-[50%] md:w-[35%] bg-[#CC2405] absolute top-10 md:top-11 left-1/2 md:left-auto md:right-60 -translate-x-1/2 md:translate-x-0"></div>
                </div>
            </div>

            {/* Mobile: Vertical Stack, Desktop: Horizontal */}
            <div className='w-full flex flex-col md:flex-row justify-center items-start gap-4 md:gap-8'>
                {/* Images Section */}
                <div className="chose-diet-images w-full md:w-[60%] h-full flex flex-col md:flex-row items-start justify-center p-2 md:p-4">
                    {/* Main Large Image */}
                    <div className='w-full md:w-2/3 md:pr-3 mb-4 md:mb-0'>
                        <div className="image-container main-image relative w-full h-64 md:h-100 overflow-hidden rounded-lg shadow-lg">
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
                                    <div className="image-overlay absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 md:p-4">
                                        <h3 className="text-white text-2xl md:text-4xl font-bold">
                                            {ourCategories[activeCategory].imageText}
                                        </h3>
                                        <p className="text-white/90 text-xs md:text-md mt-1">
                                            {ourCategories[activeCategory].desc}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Small Images Column */}
                    <div className='w-full md:w-1/3 gap-3 flex flex-row md:flex-col h-auto md:h-100 justify-center md:justify-center'>
                        {/* Small Image 1 */}
                        <div className="image-container small-image relative w-1/2 md:w-full h-32 md:h-50 overflow-hidden rounded-lg shadow-lg">
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
                                        <h4 className="text-white text-xs md:text-md font-semibold">
                                            {ourCategories[activeCategory].title}
                                        </h4>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Small Image 2 */}
                        <div className="image-container small-image relative w-1/2 md:w-full h-32 md:h-50 overflow-hidden rounded-lg shadow-lg">
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
                                        <h4 className="text-white text-xs md:text-md font-semibold">
                                            Healthy Recipes
                                        </h4>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Categories List */}
                <div className='w-full md:w-1/2 flex flex-col justify-start'>
                    {ourCategoriesList}
                </div>
            </div>
        </div>
    )
}

export default ChoseDiet