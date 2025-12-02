// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { 
//   FaFire, 
//   FaWeight, 
//   FaAppleAlt, 
//   FaLeaf, 
//   FaDrumstickBite, 
//   FaTint, // Changed from FaGlassWater
//   FaArrowRight,
//   FaUtensils,
//   FaChartLine,
//   FaHeartbeat
// } from "react-icons/fa";

// const Categories = () => {
//   const navigate = useNavigate();
//   const [activeCategory, setActiveCategory] = useState(null);

//   const categories = [
//     {
//       title: "Weight Loss",
//       icon: <FaFire className="text-3xl" />,
//       image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       desc: "Low-calorie, balanced diet plans designed for sustainable fat loss",
//       color: "from-red-500 to-orange-500",
//       features: ["Calorie Deficit", "High Protein", "Meal Timing", "Workout Plans"],
//       plans: ["Basic Plan", "Premium Plan", "Custom Plan"]
//     },
//     {
//       title: "Weight Gain",
//       icon: <FaWeight className="text-3xl" />,
//       image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       desc: "High-calorie healthy meal plans for muscle building",
//       color: "from-blue-500 to-cyan-500",
//       features: ["Calorie Surplus", "Protein Rich", "Bulk Recipes", "Strength Training"],
//       plans: ["Mass Builder", "Lean Bulk", "Extreme Gain"]
//     },
//     {
//       title: "Normal Diet",
//       icon: <FaAppleAlt className="text-3xl" />,
//       image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       desc: "Balanced nutrition for maintaining optimal health",
//       color: "from-green-500 to-emerald-500",
//       features: ["Balanced Meals", "Portion Control", "Nutrition Tracking", "Lifestyle Tips"],
//       plans: ["Maintenance", "Healthy Living", "Family Plan"]
//     },
//     {
//       title: "Vegetarian",
//       icon: <FaLeaf className="text-3xl" />,
//       image: "https://images.unsplash.com/photo-1604908176917-35c9fdfb08b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       desc: "Plant-based clean meals with complete nutrition",
//       color: "from-green-600 to-lime-500",
//       features: ["Plant Protein", "Vegan Recipes", "Iron Sources", "Meal Diversity"],
//       plans: ["Vegan Starter", "Advanced Vegan", "Athlete Vegan"]
//     },
//     {
//       title: "Non-Vegetarian",
//       icon: <FaDrumstickBite className="text-3xl" />,
//       image: "https://images.unsplash.com/photo-1562967916-eb82221dfb36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       desc: "Protein-rich food options for optimal growth",
//       color: "from-amber-600 to-orange-600",
//       features: ["Lean Meats", "Fish & Seafood", "Protein Prep", "Cooking Tips"],
//       plans: ["Protein Focus", "Keto Friendly", "Paleo Diet"]
//     },
//     {
//       title: "Detox / Cleanse",
//       icon: <FaTint className="text-3xl" />, // Changed from FaGlassWater
//       image: "https://images.unsplash.com/photo-1572441710534-68029b6d08e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       desc: "Natural detox drinks & cleansing meal plans",
//       color: "from-purple-500 to-pink-500",
//       features: ["Cleansing Drinks", "Toxin Removal", "Gut Health", "Energy Boost"],
//       plans: ["7-Day Cleanse", "Weekend Detox", "Seasonal Cleanse"]
//     },
//   ];

//   const handlePlanSelect = (category) => {
//     // First set the active category to show details
//     setActiveCategory(category);
//   };

//   const handleGetStarted = () => {
//     // Navigate to signup page with category info
//     if (activeCategory) {
//       navigate('/signup', { state: { selectedPlan: activeCategory.title } });
//     } else {
//       navigate('/signup');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#FEF1E1] to-white">
//       {/* Hero Section */}
//       <motion.div 
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="relative overflow-hidden bg-gradient-to-r from-[#FEF1E1] to-white py-16 px-4 sm:px-6 lg:px-8"
//       >
//         <div className="relative max-w-7xl mx-auto">
//           <div className="text-center">
//             <motion.h1 
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 0.5 }}
//               className="text-5xl font-bold text-gray-900 mb-4"
//             >
//               Transform Your <span className="text-[#CC2405]">Health Journey</span>
//             </motion.h1>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
//               Personalized meal plans tailored to your goals. Whether you want to lose weight, 
//               gain muscle, or maintain a healthy lifestyle, we have the perfect plan for you.
//             </p>
            
//             {/* Stats */}
//             <div className="flex flex-wrap justify-center gap-8 mb-12">
//               {[
//                 { label: "Custom Plans", value: "1000+" },
//                 { label: "Happy Users", value: "5000+" },
//                 { label: "Recipes", value: "2000+" },
//                 { label: "Experts", value: "50+" },
//               ].map((stat, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="text-center"
//                 >
//                   <div className="text-3xl font-bold text-[#CC2405]">{stat.value}</div>
//                   <div className="text-gray-600">{stat.label}</div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Category Grid */}
//         <div className="mb-16">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               Choose Your <span className="text-[#CC2405]">Goal</span>
//             </h2>
//             <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//               Select a category that matches your health and fitness objectives
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {categories.map((cat, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: index * 0.1 }}
//                 whileHover={{ 
//                   scale: 1.05,
//                   boxShadow: "0 20px 40px rgba(204, 36, 5, 0.15)"
//                 }}
//                 onClick={() => handlePlanSelect(cat)}
//                 className={`relative bg-white rounded-2xl overflow-hidden shadow-xl cursor-pointer transform transition-all duration-300 ${
//                   activeCategory?.title === cat.title ? 'ring-4 ring-[#CC2405]' : ''
//                 }`}
//               >
//                 {/* Category Header */}
//                 <div className={`absolute top-4 left-4 z-10 bg-white p-3 rounded-full shadow-lg ${activeCategory?.title === cat.title ? 'bg-[#CC2405] text-white' : ''}`}>
//                   {cat.icon}
//                 </div>
                
//                 {/* Image with Gradient Overlay */}
//                 <div className="relative h-48 overflow-hidden">
//                   <img
//                     src={cat.image}
//                     alt={cat.title}
//                     className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
//                   />
//                   <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-30`} />
//                 </div>

//                 {/* Content */}
//                 <div className="p-6">
//                   <h3 className="text-2xl font-bold text-gray-900 mb-2">{cat.title}</h3>
//                   <p className="text-gray-600 mb-4">{cat.desc}</p>
                  
//                   {/* Features */}
//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {cat.features.map((feature, idx) => (
//                       <span 
//                         key={idx}
//                         className="px-3 py-1 bg-[#FEF1E1] text-[#CC2405] rounded-full text-sm font-medium"
//                       >
//                         {feature}
//                       </span>
//                     ))}
//                   </div>

//                   {/* Available Plans */}
//                   <div className="mb-6">
//                     <h4 className="text-sm font-semibold text-gray-500 mb-2">AVAILABLE PLANS</h4>
//                     <div className="flex flex-wrap gap-2">
//                       {cat.plans.map((plan, idx) => (
//                         <span 
//                           key={idx}
//                           className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm"
//                         >
//                           {plan}
//                         </span>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Action Button */}
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handlePlanSelect(cat);
//                     }}
//                     className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
//                       activeCategory?.title === cat.title 
//                         ? 'bg-[#CC2405] text-white hover:bg-red-700' 
//                         : 'bg-[#FEF1E1] text-[#CC2405] hover:bg-[#fce8d0]'
//                     }`}
//                   >
//                     {activeCategory?.title === cat.title ? 'Selected' : 'Select Plan'}
//                     <FaArrowRight />
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Selected Plan Details */}
//         {activeCategory && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white rounded-2xl shadow-2xl p-8 mb-12 border-2 border-[#CC2405]"
//           >
//             <div className="flex flex-col md:flex-row items-center justify-between mb-6">
//               <div className="mb-4 md:mb-0">
//                 <h2 className="text-3xl font-bold text-gray-900">
//                   Your Selected Plan: <span className="text-[#CC2405]">{activeCategory.title}</span>
//                 </h2>
//                 <p className="text-gray-600 mt-2">{activeCategory.desc}</p>
//               </div>
//               <div>
//                 <div className="p-4 bg-[#FEF1E1] rounded-full">
//                   {activeCategory.icon}
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//               <div className="bg-[#FEF1E1] p-6 rounded-xl">
//                 <FaUtensils className="text-2xl text-[#CC2405] mb-4" />
//                 <h3 className="font-bold text-lg mb-2">What You'll Get</h3>
//                 <ul className="space-y-2">
//                   <li className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-[#CC2405] rounded-full"></div>
//                     Personalized meal plans
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-[#CC2405] rounded-full"></div>
//                     Grocery shopping lists
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-[#CC2405] rounded-full"></div>
//                     Recipe tutorials
//                   </li>
//                 </ul>
//               </div>

//               <div className="bg-[#FEF1E1] p-6 rounded-xl">
//                 <FaChartLine className="text-2xl text-[#CC2405] mb-4" />
//                 <h3 className="font-bold text-lg mb-2">Expected Results</h3>
//                 <ul className="space-y-2">
//                   <li className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-[#CC2405] rounded-full"></div>
//                     Visible changes in 4-6 weeks
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-[#CC2405] rounded-full"></div>
//                     Improved energy levels
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-[#CC2405] rounded-full"></div>
//                     Better sleep & digestion
//                   </li>
//                 </ul>
//               </div>

//               <div className="bg-[#FEF1E1] p-6 rounded-xl">
//                 <FaHeartbeat className="text-2xl text-[#CC2405] mb-4" />
//                 <h3 className="font-bold text-lg mb-2">Health Benefits</h3>
//                 <ul className="space-y-2">
//                   <li className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-[#CC2405] rounded-full"></div>
//                     Weight management
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-[#CC2405] rounded-full"></div>
//                     Reduced health risks
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-[#CC2405] rounded-full"></div>
//                     Enhanced mental clarity
//                   </li>
//                 </ul>
//               </div>
//             </div>

//             <div className="text-center">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleGetStarted}
//                 className="px-8 py-4 bg-gradient-to-r from-[#CC2405] to-red-600 text-white text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-shadow w-full md:w-auto"
//               >
//                 Get Started With {activeCategory.title}
//               </motion.button>
//               <p className="text-gray-500 mt-4 text-sm">
//                 You'll be redirected to sign up for your personalized plan
//               </p>
//             </div>
//           </motion.div>
//         )}

//         {/* CTA Section */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5 }}
//           className="text-center bg-gradient-to-r from-[#FEF1E1] to-white rounded-2xl p-8 md:p-12 shadow-xl"
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//             Ready to Transform Your <span className="text-[#CC2405]">Health</span>?
//           </h2>
//           <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
//             Join thousands of satisfied users who have achieved their fitness goals with our personalized meal plans
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button
//               onClick={() => navigate('/signup')}
//               className="px-6 py-3 md:px-8 md:py-4 bg-[#CC2405] text-white font-bold rounded-full hover:bg-red-700 transition-colors"
//             >
//               Start Free Trial
//             </button>
//             <button
//               onClick={() => navigate('/about')}
//               className="px-6 py-3 md:px-8 md:py-4 bg-white text-[#CC2405] font-bold rounded-full border-2 border-[#CC2405] hover:bg-[#FEF1E1] transition-colors"
//             >
//               Learn More
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Categories;

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { 
//   FaFire, 
//   FaWeight, 
//   FaAppleAlt,
//   FaArrowRight,
//   FaCheck,
//   FaClock,
//   FaCalendar,
//   FaShoppingBasket,
//   FaStar,
//   FaUtensils
// } from "react-icons/fa";

// const Categories = () => {
//   const navigate = useNavigate();
//   const [selectedPlan, setSelectedPlan] = useState(null);

//   const categories = [
//     {
//       title: "Weight Loss",
//       icon: <FaFire className="text-3xl" />,
//       image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       desc: "Calorie-controlled meals for effective fat loss",
//       color: "from-red-500 to-orange-500",
//       features: [
//         "Calorie deficit meals",
//         "High protein content",
//         "Portion control",
//         "Metabolism boosters"
//       ],
//       plans: [
//         {
//           type: "Daily Plan",
//           price: "₹199/day",
//           period: "1 day",
//           features: ["Breakfast, Lunch, Dinner", "Snack options", "Hydration guide"],
//           popular: false
//         },
//         {
//           type: "Weekly Plan",
//           price: "₹1,199/week",
//           period: "7 days",
//           features: ["All meals included", "Grocery list", "Recipe guide", "Progress tracking"],
//           popular: true
//         },
//         {
//           type: "Monthly Plan",
//           price: "₹3,999/month",
//           period: "30 days",
//           features: ["Custom meal plans", "Nutritionist support", "Weekly check-ins", "Exercise tips"],
//           popular: false
//         }
//       ],
//       mealsPerDay: 4,
//       dietType: "Low Carb, High Protein"
//     },
//     {
//       title: "Weight Gain",
//       icon: <FaWeight className="text-3xl" />,
//       image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       desc: "High-calorie nutritious meals for healthy weight gain",
//       color: "from-blue-500 to-cyan-500",
//       features: [
//         "Calorie surplus meals",
//         "Muscle-building nutrients",
//         "Protein-rich recipes",
//         "Healthy fats included"
//       ],
//       plans: [
//         {
//           type: "Daily Plan",
//           price: "₹249/day",
//           period: "1 day",
//           features: ["High-calorie meals", "Protein shakes", "Nutrition timing"],
//           popular: false
//         },
//         {
//           type: "Weekly Plan",
//           price: "₹1,499/week",
//           period: "7 days",
//           features: ["All meals + snacks", "Mass gainer recipes", "Workout nutrition guide"],
//           popular: true
//         },
//         {
//           type: "Monthly Plan",
//           price: "₹4,499/month",
//           period: "30 days",
//           features: ["Personalized calorie plan", "Supplement guide", "Progress monitoring", "Cheat meal planning"],
//           popular: false
//         }
//       ],
//       mealsPerDay: 5,
//       dietType: "High Protein, Calorie Dense"
//     },
//     {
//       title: "Normal Diet",
//       icon: <FaAppleAlt className="text-3xl" />,
//       image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       desc: "Balanced nutrition for maintaining optimal health",
//       color: "from-green-500 to-emerald-500",
//       features: [
//         "Balanced macronutrients",
//         "Whole food focus",
//         "Digestive health",
//         "Energy optimization"
//       ],
//       plans: [
//         {
//           type: "Daily Plan",
//           price: "₹179/day",
//           period: "1 day",
//           features: ["Balanced meals", "Healthy snacks", "Hydration plan"],
//           popular: false
//         },
//         {
//           type: "Weekly Plan",
//           price: "₹999/week",
//           period: "7 days",
//           features: ["Complete nutrition", "Meal prep guide", "Shopping list"],
//           popular: true
//         },
//         {
//           type: "Monthly Plan",
//           price: "₹3,499/month",
//           period: "30 days",
//           features: ["Customized plans", "Nutrition tracking", "Health tips", "Lifestyle guidance"],
//           popular: false
//         }
//       ],
//       mealsPerDay: 3,
//       dietType: "Balanced, Whole Foods"
//     }
//   ];

//   const handleSelectPlan = (category, plan) => {
//     setSelectedPlan({ category: category.title, plan: plan.type, price: plan.price });
//   };

//   const handleGetStarted = () => {
//     if (selectedPlan) {
//       navigate('/signup', { 
//         state: { 
//           selectedCategory: selectedPlan.category,
//           selectedPlan: selectedPlan.plan,
//           price: selectedPlan.price
//         } 
//       });
//     } else {
//       navigate('/signup');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#FEF1E1] to-white">
//       {/* Hero Section */}
//       <motion.div 
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="relative overflow-hidden bg-gradient-to-r from-[#FEF1E1] to-[#FFEDD5] py-16 px-4 sm:px-6 lg:px-8"
//       >
//         <div className="relative max-w-7xl mx-auto">
//           <div className="text-center">
//             <motion.h1 
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 0.5 }}
//               className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
//             >
//               <span className="text-[#CC2405]">fit-dish</span>: Personalized Meal Plans
//             </motion.h1>
//             <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-6">
//               Healthy eating made simple. Choose your goal, pick your plan, and get delicious meals delivered to you.
//             </p>
//             <div className="flex flex-wrap justify-center gap-4 mb-8">
//               <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow">
//                 <FaUtensils className="text-[#CC2405]" />
//                 <span className="font-medium">Fresh Ingredients</span>
//               </div>
//               <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow">
//                 <FaClock className="text-[#CC2405]" />
//                 <span className="font-medium">Daily Delivery</span>
//               </div>
//               <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow">
//                 <FaStar className="text-[#CC2405]" />
//                 <span className="font-medium">Expert Nutritionist</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* Main Categories Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Section Title */}
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//             Choose Your <span className="text-[#CC2405]">Goal</span>
//           </h2>
//           <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//             Select a category and choose a meal plan that fits your schedule and budget
//           </p>
//         </div>

//         {/* Categories Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
//           {categories.map((cat, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.2 }}
//               className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
//             >
//               {/* Category Header */}
//               <div className="relative">
//                 <div className={`absolute top-4 left-4 z-10 bg-white p-3 rounded-full shadow-lg`}>
//                   {cat.icon}
//                 </div>
//                 <img
//                   src={cat.image}
//                   alt={cat.title}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-20`} />
//               </div>

//               {/* Category Info */}
//               <div className="p-6">
//                 <h3 className="text-2xl font-bold text-gray-900 mb-2">{cat.title}</h3>
//                 <p className="text-gray-600 mb-4">{cat.desc}</p>
                
//                 {/* Features */}
//                 <div className="space-y-2 mb-6">
//                   {cat.features.map((feature, idx) => (
//                     <div key={idx} className="flex items-center gap-2">
//                       <FaCheck className="text-green-500" />
//                       <span className="text-gray-700">{feature}</span>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Diet Info */}
//                 <div className="flex items-center justify-between mb-6 p-3 bg-[#FEF1E1] rounded-lg">
//                   <div>
//                     <p className="text-sm text-gray-600">Meals per day</p>
//                     <p className="font-bold text-[#CC2405]">{cat.mealsPerDay} meals</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-600">Diet Type</p>
//                     <p className="font-bold text-gray-800">{cat.dietType}</p>
//                   </div>
//                 </div>

//                 {/* Pricing Plans */}
//                 <div className="space-y-4">
//                   <h4 className="font-bold text-lg text-gray-900 border-b pb-2">Choose Your Plan</h4>
//                   {cat.plans.map((plan, planIndex) => (
//                     <motion.div
//                       key={planIndex}
//                       whileHover={{ scale: 1.02 }}
//                       onClick={() => handleSelectPlan(cat, plan)}
//                       className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
//                         selectedPlan?.category === cat.title && selectedPlan?.plan === plan.type
//                           ? 'border-[#CC2405] bg-red-50'
//                           : 'border-gray-200 hover:border-[#CC2405]'
//                       }`}
//                     >
//                       <div className="flex justify-between items-center mb-2">
//                         <div>
//                           <h5 className="font-bold text-gray-900">{plan.type}</h5>
//                           <p className="text-sm text-gray-600">{plan.period}</p>
//                         </div>
//                         <div className="text-right">
//                           <div className="text-2xl font-bold text-[#CC2405]">{plan.price}</div>
//                           {plan.popular && (
//                             <span className="text-xs bg-[#CC2405] text-white px-2 py-1 rounded-full">
//                               Most Popular
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                       <ul className="space-y-1">
//                         {plan.features.map((feature, featureIdx) => (
//                           <li key={featureIdx} className="text-sm text-gray-600 flex items-center gap-2">
//                             <div className="w-1 h-1 bg-[#CC2405] rounded-full"></div>
//                             {feature}
//                           </li>
//                         ))}
//                       </ul>
//                     </motion.div>
//                   ))}
//                 </div>

//                 {/* Quick Select Button */}
//                 <button
//                   onClick={() => handleSelectPlan(cat, cat.plans.find(p => p.popular) || cat.plans[0])}
//                   className="w-full mt-6 py-3 bg-gradient-to-r from-[#CC2405] to-red-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
//                 >
//                   Select Most Popular Plan
//                   <FaArrowRight />
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Selected Plan Summary */}
//         {selectedPlan && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-gradient-to-r from-[#FEF1E1] to-white rounded-2xl shadow-2xl p-8 mb-12 border-2 border-[#CC2405]"
//           >
//             <div className="flex flex-col md:flex-row justify-between items-center gap-6">
//               <div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-2">
//                   Selected Plan: <span className="text-[#CC2405]">{selectedPlan.category}</span>
//                 </h3>
//                 <div className="flex items-center gap-4">
//                   <div className="text-lg font-bold bg-white px-4 py-2 rounded-lg shadow">
//                     {selectedPlan.plan}
//                   </div>
//                   <div className="text-2xl font-bold text-[#CC2405]">
//                     {selectedPlan.price}
//                   </div>
//                 </div>
//                 <p className="text-gray-600 mt-3">
//                   Complete meal plans delivered daily. Includes breakfast, lunch, dinner, and snacks.
//                 </p>
//               </div>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <button
//                   onClick={() => setSelectedPlan(null)}
//                   className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50"
//                 >
//                   Change Plan
//                 </button>
//                 <button
//                   onClick={handleGetStarted}
//                   className="px-8 py-3 bg-gradient-to-r from-[#CC2405] to-red-600 text-white font-bold rounded-xl hover:shadow-xl flex items-center gap-2"
//                 >
//                   Get Started Now
//                   <FaArrowRight />
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* How It Works */}
//         <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
//           <h3 className="text-3xl font-bold text-center text-gray-900 mb-10">
//             How <span className="text-[#CC2405]">fit-dish</span> Works
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-[#FEF1E1] rounded-full flex items-center justify-center mx-auto mb-4">
//                 <span className="text-2xl font-bold text-[#CC2405]">1</span>
//               </div>
//               <h4 className="font-bold text-lg mb-2">Choose Your Plan</h4>
//               <p className="text-gray-600">Select from Weight Loss, Weight Gain, or Normal Diet plans</p>
//             </div>
//             <div className="text-center">
//               <div className="w-16 h-16 bg-[#FEF1E1] rounded-full flex items-center justify-center mx-auto mb-4">
//                 <span className="text-2xl font-bold text-[#CC2405]">2</span>
//               </div>
//               <h4 className="font-bold text-lg mb-2">Customize Meals</h4>
//               <p className="text-gray-600">Tell us your preferences and dietary restrictions</p>
//             </div>
//             <div className="text-center">
//               <div className="w-16 h-16 bg-[#FEF1E1] rounded-full flex items-center justify-center mx-auto mb-4">
//                 <span className="text-2xl font-bold text-[#CC2405]">3</span>
//               </div>
//               <h4 className="font-bold text-lg mb-2">Get Delivered</h4>
//               <p className="text-gray-600">Fresh, prepared meals delivered to your doorstep daily</p>
//             </div>
//           </div>
//         </div>

//         {/* CTA Section */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5 }}
//           className="text-center bg-gradient-to-r from-[#CC2405] to-red-600 rounded-2xl p-8 md:p-12 shadow-xl"
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//             Ready to Start Your Healthy Journey?
//           </h2>
//           <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
//             Join thousands of satisfied customers who transformed their health with our meal plans
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button
//               onClick={() => navigate('/signup')}
//               className="px-8 py-4 bg-white text-[#CC2405] font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
//             >
//               Start Your Free Trial
//             </button>
//             <button
//               onClick={() => navigate('/contact')}
//               className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
//             >
//               Talk to Nutritionist
//             </button>
//           </div>
//           <p className="text-white/80 text-sm mt-6">
//             *Free trial includes 1-day meal plan sample
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Categories;


import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  FaFire, 
  FaWeight, 
  FaAppleAlt,
  FaArrowRight,
  FaCheck,
  FaBookOpen,
  FaClipboardList,
  FaChartLine,
  FaHeartbeat,
  FaSeedling,
  FaUserMd,
  FaCalendarAlt
} from "react-icons/fa";

const Categories = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const categories = [
    {
      title: "Weight Loss",
      icon: <FaFire className="text-3xl" />,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      desc: "Nutrition plans for sustainable weight loss",
      color: "from-red-500 to-orange-500",
      features: [
        "Calorie deficit meal plans",
        "Portion control guidance",
        "Metabolism-boosting foods",
        "Weekly meal prep strategies"
      ],
      benefits: [
        "1-2 kg weight loss per week",
        "Improved energy levels",
        "Better digestion",
        "Reduced cravings"
      ],
      plans: [
        {
          type: "Weekly Nutrition Plan",
          price: "₹499/week",
          period: "7-day detailed plan",
          includes: [
            "Customized meal plan",
            "Grocery shopping list",
            "Recipe e-book",
            "Nutrition tracking sheet"
          ],
          popular: true
        },
        {
          type: "Monthly Coaching",
          price: "₹1,799/month",
          period: "30 days with support",
          includes: [
            "Weekly meal plans",
            "WhatsApp support",
            "Progress tracking",
            "Recipe adjustments"
          ],
          popular: false
        }
      ],
      whatYouGet: [
        "Personalized calorie target",
        "Meal timing schedule",
        "Healthy snack ideas",
        "Hydration plan"
      ]
    },
    {
      title: "Weight Gain",
      icon: <FaWeight className="text-3xl" />,
      image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      desc: "Nutrition strategies for healthy weight gain",
      color: "from-blue-500 to-cyan-500",
      features: [
        "Calorie surplus meal plans",
        "Protein-rich recipes",
        "Healthy fat sources",
        "Meal frequency planning"
      ],
      benefits: [
        "Muscle gain support",
        "Increased strength",
        "Better recovery",
        "Improved appetite"
      ],
      plans: [
        {
          type: "Weekly Nutrition Plan",
          price: "₹599/week",
          period: "7-day detailed plan",
          includes: [
            "High-calorie meal plan",
            "Supplement guide",
            "Mass gainer recipes",
            "Workout nutrition timing"
          ],
          popular: true
        },
        {
          type: "Monthly Coaching",
          price: "₹1,999/month",
          period: "30 days with support",
          includes: [
            "Weekly calorie adjustments",
            "Protein intake monitoring",
            "Progress photos review",
            "Custom recipe creation"
          ],
          popular: false
        }
      ],
      whatYouGet: [
        "Calorie calculation",
        "Meal prep strategies",
        "Budget-friendly options",
        "Restaurant eating guide"
      ]
    },
    {
      title: "Normal Diet",
      icon: <FaAppleAlt className="text-3xl" />,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      desc: "Balanced nutrition for optimal health",
      color: "from-green-500 to-emerald-500",
      features: [
        "Balanced macronutrients",
        "Whole food recipes",
        "Digestive health focus",
        "Energy optimization"
      ],
      benefits: [
        "Maintain healthy weight",
        "Improved immunity",
        "Better sleep quality",
        "Enhanced mental clarity"
      ],
      plans: [
        {
          type: "Weekly Nutrition Plan",
          price: "₹399/week",
          period: "7-day detailed plan",
          includes: [
            "Balanced meal plan",
            "Seasonal food guide",
            "Meal prep templates",
            "Nutrition education"
          ],
          popular: true
        },
        {
          type: "Monthly Wellness",
          price: "₹1,499/month",
          period: "30 days holistic approach",
          includes: [
            "Weekly meal variations",
            "Health monitoring",
            "Lifestyle tips",
            "Mindful eating guide"
          ],
          popular: false
        }
      ],
      whatYouGet: [
        "Food group balancing",
        "Portion size guide",
        "Healthy cooking methods",
        "Snack alternatives"
      ]
    }
  ];

  const handleSelectPlan = (category, plan) => {
    setSelectedPlan({ 
      category: category.title, 
      plan: plan.type, 
      price: plan.price,
      benefits: category.benefits 
    });
  };

  const handleGetStarted = () => {
    if (selectedPlan) {
      navigate('/signup', { 
        state: { 
          selectedCategory: selectedPlan.category,
          selectedPlan: selectedPlan.plan,
          price: selectedPlan.price
        } 
      });
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF1E1] to-white">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden bg-gradient-to-r from-[#FEF1E1] to-[#FFEDD5] py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Your Personalized <span className="text-[#CC2405]">Nutrition</span> Guide
            </motion.h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-6">
              Get expert nutrition plans, recipes, and guidance tailored to your health goals. 
              We provide the knowledge, you provide the ingredients.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow">
                <FaBookOpen className="text-[#CC2405]" />
                <span className="font-medium">Custom Meal Plans</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow">
                <FaClipboardList className="text-[#CC2405]" />
                <span className="font-medium">Shopping Lists</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow">
                <FaUserMd className="text-[#CC2405]" />
                <span className="font-medium">Nutritionist Support</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your <span className="text-[#CC2405]">Nutrition Plan</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Select a goal and get complete nutrition guidance with recipes and shopping lists
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Category Header */}
              <div className="relative">
                <div className={`absolute top-4 left-4 z-10 bg-white p-3 rounded-full shadow-lg`}>
                  {cat.icon}
                </div>
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-48 object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-20`} />
              </div>

              {/* Category Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{cat.title}</h3>
                <p className="text-gray-600 mb-4">{cat.desc}</p>
                
                {/* Key Features */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FaCheck className="text-green-500" />
                    What You'll Learn
                  </h4>
                  <ul className="space-y-2">
                    {cat.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-700 flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#CC2405] rounded-full mt-2 flex-shrink-0"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Expected Benefits */}
                <div className="mb-6 p-4 bg-[#FEF1E1] rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <FaHeartbeat className="text-[#CC2405]" />
                    Expected Benefits
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {cat.benefits.map((benefit, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Nutrition Plans */}
                <div className="space-y-4">
                  <h4 className="font-bold text-lg text-gray-900 border-b pb-2 flex items-center gap-2">
                    <FaClipboardList className="text-[#CC2405]" />
                    Nutrition Plans
                  </h4>
                  {cat.plans.map((plan, planIndex) => (
                    <motion.div
                      key={planIndex}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleSelectPlan(cat, plan)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedPlan?.category === cat.title && selectedPlan?.plan === plan.type
                          ? 'border-[#CC2405] bg-red-50'
                          : 'border-gray-200 hover:border-[#CC2405]'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h5 className="font-bold text-gray-900">{plan.type}</h5>
                          <p className="text-sm text-gray-600">{plan.period}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#CC2405]">{plan.price}</div>
                          {plan.popular && (
                            <span className="text-xs bg-[#CC2405] text-white px-2 py-1 rounded-full">
                              Most Popular
                            </span>
                          )}
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {plan.includes.map((item, itemIdx) => (
                          <li key={itemIdx} className="text-sm text-gray-600 flex items-center gap-2">
                            <FaCheck className="text-green-500 text-xs" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Select Button */}
                <button
                  onClick={() => handleSelectPlan(cat, cat.plans.find(p => p.popular) || cat.plans[0])}
                  className="w-full mt-6 py-3 bg-gradient-to-r from-[#CC2405] to-red-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
                >
                  Select This Plan
                  <FaArrowRight />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* What You'll Receive Section */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-10">
            What's Included in <span className="text-[#CC2405]">Every Plan</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FaBookOpen className="text-3xl" />,
                title: "Detailed Meal Plans",
                desc: "Day-by-day meal breakdown with recipes and alternatives"
              },
              {
                icon: <FaClipboardList className="text-3xl" />,
                title: "Shopping Lists",
                desc: "Organized grocery lists categorized by store sections"
              },
              {
                icon: <FaSeedling className="text-3xl" />,
                title: "Recipe Guides",
                desc: "Step-by-step cooking instructions with nutritional info"
              },
              {
                icon: <FaChartLine className="text-3xl" />,
                title: "Progress Tracking",
                desc: "Tools to track your nutrition and health improvements"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-[#FEF1E1] rounded-full flex items-center justify-center mb-4 mx-auto">
                  <div className="text-[#CC2405]">
                    {item.icon}
                  </div>
                </div>
                <h4 className="font-bold text-lg text-center mb-2">{item.title}</h4>
                <p className="text-gray-600 text-center text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Plan Summary */}
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-[#FEF1E1] to-white rounded-2xl shadow-2xl p-8 mb-12 border-2 border-[#CC2405]"
          >
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Selected: <span className="text-[#CC2405]">{selectedPlan.category}</span>
                </h3>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="text-xl font-bold bg-white px-4 py-2 rounded-lg shadow">
                    {selectedPlan.plan}
                  </div>
                  <div className="text-2xl font-bold text-[#CC2405]">
                    {selectedPlan.price}
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="font-bold text-gray-900 mb-2">Expected Benefits:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPlan.benefits?.map((benefit, idx) => (
                      <span key={idx} className="px-3 py-1 bg-[#FEF1E1] text-gray-700 rounded-full">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">
                  You'll receive complete nutrition guidance, recipes, shopping lists, and expert support.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50"
                >
                  Change Plan
                </button>
                <button
                  onClick={handleGetStarted}
                  className="px-8 py-3 bg-gradient-to-r from-[#CC2405] to-red-600 text-white font-bold rounded-xl hover:shadow-xl flex items-center gap-2"
                >
                  Get Your Plan Now
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-10">
            How Our <span className="text-[#CC2405]">Nutrition Service</span> Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Choose Your Goal",
                desc: "Select weight loss, gain, or maintenance"
              },
              {
                step: "2",
                title: "Get Your Plan",
                desc: "Receive personalized meal plans and recipes"
              },
              {
                step: "3",
                title: "Shop & Cook",
                desc: "Use our shopping lists and cook delicious meals"
              },
              {
                step: "4",
                title: "Track Progress",
                desc: "Monitor your health improvements"
              }
            ].map((step, idx) => (
              <div key={idx} className="text-center relative">
                <div className="w-16 h-16 bg-[#FEF1E1] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#CC2405]">{step.step}</span>
                </div>
                <h4 className="font-bold text-lg mb-2">{step.title}</h4>
                <p className="text-gray-600">{step.desc}</p>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-8 left-3/4 w-full h-1 bg-[#FEF1E1]"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center bg-gradient-to-r from-[#CC2405] to-red-600 rounded-2xl p-8 md:p-12 shadow-xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Nutrition?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Get expert nutrition guidance, delicious recipes, and personalized support
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/signup')}
              className="px-8 py-4 bg-white text-[#CC2405] font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
            >
              Start Your Nutrition Journey
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
            >
              Free Nutrition Consultation
            </button>
          </div>
          <p className="text-white/80 text-sm mt-6">
            *All plans include 24/7 WhatsApp support and recipe adjustments
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Categories;