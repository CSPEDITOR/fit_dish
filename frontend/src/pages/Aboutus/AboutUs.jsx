import React from "react";
import { motion } from "framer-motion";
import { Leaf, HeartPulse, Users, Sprout } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="w-full text-gray-800">
      {/* HERO */}
      <section className="py-24 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-[#cc2405]"
        >
          About <span className="text-black">FitDish</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 max-w-2xl mx-auto text-lg text-gray-700"
        >
          Your personal health companion—discover dishes tailored to your diet,
          lifestyle, and body needs.
        </motion.p>
      </section>

      {/* WHY FITDISH */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12 text-[#cc2405]">
          Why Choose FitDish?
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition">
            <Leaf className="w-12 h-12 text-[#cc2405] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Healthy Choices</h3>
            <p className="text-gray-700">
              Get dish recommendations based on your health profile and diet
              preferences.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition">
            <HeartPulse className="w-12 h-12 text-[#cc2405] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Disease-Aware Diet</h3>
            <p className="text-gray-700">
              FitDish suggests foods to eat or avoid depending on your medical
              conditions.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition">
            <Users className="w-12 h-12 text-[#cc2405] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Personalised for You</h3>
            <p className="text-gray-700">
              Tailored diet plans built dynamically based on your goals and BMI.
            </p>
          </div>
        </div>
      </section>

      {/* IMAGE + TEXT */}
      <section className="py-16 px-6 ">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <motion.img
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1"
            alt="Healthy Food"
            className="rounded-2xl shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          />

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl font-semibold mb-4 text-[#cc2405]">
              The Story Behind FitDish
            </h2>
            <p className="text-gray-700 leading-relaxed">
              FitDish was created with a mission to make healthy eating simple.
              Instead of guessing what foods are good or bad for you, FitDish
              analyzes your health profile and instantly gives dish suggestions.
            </p>

            <p className="text-gray-700 mt-4 leading-relaxed">
              Built with nutrition science + AI, FitDish guides you toward
              better daily choices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Sprout className="mx-auto w-14 h-14 text-[#cc2405] mb-4" />
          <h2 className="text-3xl font-semibold mb-4 text-[#cc2405]">
            Our Mission
          </h2>
          <p className="text-gray-700 text-lg">
            To help every individual live healthier by understanding their body,
            their diet, and their needs—without confusion or misinformation.
          </p>
        </div>
      </section>
    </div>
  );
}
