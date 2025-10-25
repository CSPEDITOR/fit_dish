// Categories.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

// --- SVG Path Definitions for two different curved shapes ---
// These paths now both represent curved shapes.
// The key is that they have the same number and type of commands for smooth morphing.

// Initial curved shape (closer to the input image, but perhaps a bit more defined)
const pathCurvedInitial =
  "M 10 0 L 290 0 C 295 0, 300 5, 300 10 C 275 30, 275 70, 300 90 C 300 95, 295 100, 290 100 L 10 100 C 5 100, 0 95, 0 90 C 25 70, 25 30, 0 10 C 0 5, 5 0, 10 0 Z";

// A slightly different, perhaps more exaggerated, curved shape for the animation target
// The side control points are moved further inward to create a deeper curve.
const pathCurvedTarget =
  "M 10 0 L 290 0 C 295 0, 300 5, 300 10 C 250 30, 250 70, 300 90 C 300 95, 295 100, 290 100 L 10 100 C 5 100, 0 95, 0 90 C 50 70, 50 30, 0 10 C 0 5, 5 0, 10 0 Z";


// --- Animation Variants ---
const pathVariants = {
  initialCurve: {
    d: pathCurvedInitial,
  },
  targetCurve: {
    d: pathCurvedTarget,
  },
};

// --- Styles ---
const containerStyle = {
  display: "grid",
  placeItems: "center",
  height: "100vh",
  background: "#f0f0f0",
};

const svgStyle = {
  width: "300px",
  cursor: "pointer",
};

// --- The Component ---
export const Categories = () => {
  const [isTargetCurved, setIsTargetCurved] = useState(false);

  return (
    <div style={containerStyle}>
      <motion.svg
        viewBox="0 0 300 100"
        style={svgStyle}
        onClick={() => setIsTargetCurved(!isTargetCurved)} // Toggle state on click
      >
        <motion.path
          fill="white"
          stroke="#333"
          strokeWidth="2"
          variants={pathVariants}
          // Set initial to 'initialCurve' and animate to 'targetCurve'
          initial="initialCurve"
          animate={isTargetCurved ? "targetCurve" : "initialCurve"}
          transition={{
            duration: 0.7,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </div>
  );
};

export default Categories;