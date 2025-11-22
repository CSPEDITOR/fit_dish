import React, { useState } from "react";

function BMI() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    if (!weight || !height) return;

    const heightInMeters = height / 100;
    const result = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(result);

    // BMI Category logic
    if (result < 18.5) setCategory("Underweight");
    else if (result >= 18.5 && result <= 24.9) setCategory("Normal weight");
    else if (result >= 25 && result <= 29.9) setCategory("Overweight");
    else setCategory("Obesity");
  };

  return (
    <div className="ml-20 min-h-screen bg-[#fff7f3] p-10">
      <h1 className="text-3xl font-bold text-[#cc2405] mb-6">BMI Calculator</h1>

      <div className="max-w-md bg-white shadow-lg rounded-xl p-6 space-y-5">
        <div>
          <label className="text-lg font-medium text-gray-700">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full mt-2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#cc2405] outline-none"
            placeholder="Enter weight"
          />
        </div>

        <div>
          <label className="text-lg font-medium text-gray-700">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full mt-2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#cc2405] outline-none"
            placeholder="Enter height"
          />
        </div>

        <button
          onClick={calculateBMI}
          className="w-full bg-[#cc2405] text-white py-3 rounded-lg font-semibold hover:bg-[#a31d04] transition-all duration-200"
        >
          Calculate BMI
        </button>

        {bmi && (
          <div className="text-center mt-5 p-4 bg-[#fff1e7] rounded-lg">
            <h2 className="text-2xl font-bold text-[#cc2405]">BMI: {bmi}</h2>
            <p className="text-lg font-medium text-gray-700 mt-2">
              Category: <span className="font-semibold">{category}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BMI;
