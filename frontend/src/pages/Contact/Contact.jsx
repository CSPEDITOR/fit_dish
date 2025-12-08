

import React, { useState } from "react";
import logo from "../../images/logo.png";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message submitted!");
    console.log(formData);
  };

  return (
    <div>
      <section className="py-24 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-[#cc2405]"
        >
          Contact <span className="text-black">Us</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 max-w-2xl mx-auto text-lg text-gray-700"
        >
          Have questions or feedback? We’re here to help you stay on track with your healthy lifestyle.
        </motion.p>
      </section>

      <div className="min-h-screen min-w-screen flex justify-center pb-16">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* LEFT DIV — Form */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}     
            animate={{ opacity: 1, x: 0 }}        // moves to center
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="bg-white p-8 rounded-3xl shadow-lg border"
          >
            <h2 className="text-2xl font-bold mb-6 text-[#CC2405]">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#CC2405]"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#CC2405]"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Your Message</label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#CC2405]"
                  placeholder="Write your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#CB3432] hover:bg-[#FBEBEB] text-white hover:text-black py-3 rounded-xl text-lg font-semibold transition-all"
              >
                Submit
              </button>
            </form>
          </motion.div>

          {/* RIGHT DIV — Logo */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}       // comes from right
            animate={{ opacity: 1, x: 0 }}        // moves to center
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.1,
            }}
            className="flex items-center justify-center bg-[#CB3432] hover:bg-[#FBEBEB] text-white hover:text-black p-8 rounded-3xl shadow-lg"
          >
            <div>
              <div className="flex  items-center gap-3 mb-6">
                <img className="w-12 h-12" src={logo} alt="FitDish" />
                <h2 className="text-3xl font-bold tracking-widest">FitDish</h2>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
