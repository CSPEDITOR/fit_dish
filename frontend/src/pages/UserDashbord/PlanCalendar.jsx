// pages/PlanCategory.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TrendingDown, 
  TrendingUp, 
  Apple, 
  Plus,
  Sparkles,
  CheckCircle,
  Clock,
  Users,
  Target
} from 'lucide-react';

const PlanCalendar = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = [
    {
      id: 1,
      title: "Weight Loss",
      description: "Achieve your weight loss goals with balanced, calorie-controlled meals",
      icon: <TrendingDown className="w-12 h-12" />,
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
      features: [
        "Calorie deficit meals",
        "High protein recipes",
        "Sugar-free options",
        "Weekly progress tracking"
      ],
      duration: "4-8 weeks",
      popular: true
    },
    {
      id: 2,
      title: "Weight Gain",
      description: "Healthy weight gain plan with nutrient-dense meals and protein focus",
      icon: <TrendingUp className="w-12 h-12" />,
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50",
      textColor: "text-amber-700",
      features: [
        "Calorie surplus meals",
        "High protein intake",
        "Healthy fats",
        "Muscle building focus"
      ],
      duration: "6-12 weeks",
      popular: false
    },
    {
      id: 3,
      title: "Normal Diet",
      description: "Maintain optimal health with balanced nutrition and portion control",
      icon: <Apple className="w-12 h-12" />,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      features: [
        "Balanced nutrition",
        "Portion control",
        "Varied food groups",
        "Sustainable habits"
      ],
      duration: "Ongoing",
      popular: false
    },
    {
      id: 4,
      title: "Create Your Plan",
      description: "Design a completely custom diet plan tailored to your unique needs",
      icon: <Plus className="w-12 h-12" />,
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      features: [
        "Custom meal preferences",
        "Personal budget",
        "Specific dietary needs",
        "Flexible scheduling"
      ],
      duration: "Custom",
      popular: true
    }
  ];

  const handleCategoryClick = (category) => {
    if (category.title === "Weight Loss") {
      navigate('/plan/weight-loss');
    } else if (category.title === "Weight Gain") {
      // Add navigation for weight gain
      navigate('/plan/weight-gain');
    } else if (category.title === "Normal Diet") {
      // Add navigation for normal diet
      navigate('/plan/normal-diet');
    } else if (category.title === "Create Your Plan") {
      navigate('/plan/create');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FBEBEB] to-[#F5D0D0] p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="inline-flex items-center justify-center mb-4"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#CB3432] to-[#E74C3C] blur-xl opacity-30 rounded-full"></div>
              <div className="relative bg-gradient-to-r from-[#CB3432] to-[#E74C3C] w-16 h-16 rounded-full flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
            </div>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your <span className="text-[#CB3432]">Diet Plan</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Transform your health journey with personalized meal plans designed by nutrition experts
          </p>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12"
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <Users className="w-5 h-5 text-[#CB3432]" />
                <span className="text-3xl font-bold text-gray-900">10,000+</span>
              </div>
              <span className="text-gray-600">Happy Members</span>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-3xl font-bold text-gray-900">95%</span>
              </div>
              <span className="text-gray-600">Success Rate</span>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                <span className="text-3xl font-bold text-gray-900">24/7</span>
              </div>
              <span className="text-gray-600">Support</span>
            </div>
          </motion.div>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setHoveredCard(category.id)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => handleCategoryClick(category)}
              className="relative group cursor-pointer"
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-3xl`}></div>
              
              {/* Card */}
              <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:border-transparent transition-all duration-300 h-full">
                
                {/* Popular Badge */}
                {category.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
                    >
                      <Sparkles className="w-3 h-3" />
                      Most Popular
                    </motion.div>
                  </div>
                )}

                {/* Card Header */}
                <div className={`relative h-40 ${category.bgColor} flex items-center justify-center overflow-hidden`}>
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-white to-transparent rounded-full"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-white to-transparent rounded-full"></div>
                  </div>
                  
                  {/* Icon Container */}
                  <motion.div
                    animate={hoveredCard === category.id ? 
                      { rotate: [0, 10, -10, 0] } : 
                      { rotate: 0 }
                    }
                    transition={{ duration: 0.5 }}
                    className={`relative z-10 bg-gradient-to-br ${category.color} w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg`}
                  >
                    <div className="text-white">
                      {category.icon}
                    </div>
                    
                    {/* Icon Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} blur-lg opacity-50`}></div>
                  </motion.div>
                </div>

                {/* Card Content */}
                <div className="p-6 md:p-8">
                  <motion.h3 
                    className={`text-2xl font-bold mb-3 ${category.textColor}`}
                    animate={hoveredCard === category.id ? 
                      { x: 5 } : 
                      { x: 0 }
                    }
                  >
                    {category.title}
                  </motion.h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Duration */}
                  <div className="flex items-center gap-2 mb-6">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-500">
                      Duration: <span className="text-gray-900">{category.duration}</span>
                    </span>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {category.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        variants={featureVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center gap-3"
                      >
                        <div className={`w-2 h-2 rounded-full ${category.bgColor} ${category.textColor.replace('text-', 'bg-')} opacity-50`}></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <motion.div
                    className="mt-8"
                    animate={hoveredCard === category.id ? 
                      { y: -5 } : 
                      { y: 0 }
                    }
                  >
                    <button
                      className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform ${category.bgColor} ${category.textColor} hover:shadow-lg hover:scale-[1.02] active:scale-95`}
                    >
                      {category.title === "Create Your Plan" ? "Design Custom Plan" : "View Plan Details"}
                    </button>
                  </motion.div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-lg"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-lg"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Comparison Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
            Why Choose Our Plans?
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
            Each plan is crafted by certified nutritionists and tailored to your lifestyle
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Expert Designed</h3>
              <p className="text-gray-600">Created by certified nutritionists with proven results</p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Personalized</h3>
              <p className="text-gray-600">Customized based on your goals, preferences, and budget</p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Flexible Schedule</h3>
              <p className="text-gray-600">Adjust meals based on your daily routine and preferences</p>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-4">
            Need help choosing the right plan?
          </p>
          <button className="bg-gradient-to-r from-[#CB3432] to-[#E74C3C] text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Talk to a Nutrition Expert
          </button>
        </motion.div>
      </motion.div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-pink-200 to-transparent rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-emerald-200 to-transparent rounded-full blur-3xl opacity-20"></div>
        <div className="absolute top-3/4 left-1/3 w-48 h-48 bg-gradient-to-tr from-amber-200 to-transparent rounded-full blur-3xl opacity-20"></div>
      </div>
    </div>
  );
};

export default PlanCalendar;