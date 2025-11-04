// src/assets/asset.js
import mango from "../images/mango.png"
import banana from "../images/banana.png"
import guava from "../images/guava.png"
import Papaya from "../images/papaya.png"
import Watermelon from "../images/watermelone.png"
import apple from "../images/apple2.png"
import pineapple from "../images/pineapple.png"
import jackfruits from "../images/jackfruits.png"
import lychees from "../images/lychees.png"
import coconut from "../images/coconut.png"
const foodItems = [
  {
    _id: "fruit001",
    name: "Mango",
    type: "Veg",
    category: "Energy Boost",
    description:
      "Sweet and juicy tropical fruit rich in vitamins A and C.",
    price: 80,
    nutrients: {
      calories: 60,
      protein: 0.8,
      carbohydrates: 15,
      fats: 0.4,
      fiber: 1.6,
      sugar: 14,
      vitamins_total: 9.5,
      minerals_total: 2.1,
    },
    vitamins: [
      { name: "Vitamin A", value: 3.0, unit: "mg" },
      { name: "Vitamin C", value: 36.0, unit: "mg" },
      { name: "Vitamin E", value: 1.1, unit: "mg" },
    ],
    minerals: [
      { name: "Potassium", value: 150, unit: "mg" },
      { name: "Magnesium", value: 10, unit: "mg" },
    ],
    best_time: ["Breakfast", "Lunch"],
    avoid_for: ["Diabetes (in excess)"],
    image:
      mango,
    location: "Bhubaneswar, Odisha, India",
  },
  {
    _id: "fruit002",
    name: "Banana",
    type: "Veg",
    category: "Weight Gain",
    description:
      "Soft, sweet fruit rich in potassium and energy — ideal for workouts.",
    price: 40,
    nutrients: {
      calories: 89,
      protein: 1.1,
      carbohydrates: 23,
      fats: 0.3,
      fiber: 2.6,
      sugar: 12,
      vitamins_total: 4.0,
      minerals_total: 3.8,
    },
    vitamins: [
      { name: "Vitamin B6", value: 0.4, unit: "mg" },
      { name: "Vitamin C", value: 9.0, unit: "mg" },
    ],
    minerals: [
      { name: "Potassium", value: 358, unit: "mg" },
      { name: "Magnesium", value: 27, unit: "mg" },
    ],
    best_time: ["Morning", "Evening"],
    avoid_for: ["Kidney disease"],
    image:
      banana,
    location: "Cuttack, Odisha, India",
  },
  {
    _id: "fruit003",
    name: "Guava",
    type: "Veg",
    category: "Immunity Booster",
    description: "Crisp fruit packed with Vitamin C and fiber.",
    price: 60,
    nutrients: {
      calories: 68,
      protein: 2.6,
      carbohydrates: 14,
      fats: 1.0,
      fiber: 5.4,
      sugar: 9,
      vitamins_total: 8.5,
      minerals_total: 3.1,
    },
    vitamins: [
      { name: "Vitamin C", value: 228.0, unit: "mg" },
      { name: "Vitamin A", value: 1.2, unit: "mg" },
    ],
    minerals: [
      { name: "Potassium", value: 417, unit: "mg" },
      { name: "Iron", value: 0.3, unit: "mg" },
    ],
    best_time: ["Morning", "Lunch"],
    avoid_for: ["Acid reflux"],
    image:
      guava,
    location: "Puri, Odisha, India",
  },
  {
    _id: "fruit004",
    name: "Papaya",
    type: "Veg",
    category: "Digestion Support",
    description:
      "Rich in enzymes that support digestion and skin health.",
    price: 50,
    nutrients: {
      calories: 43,
      protein: 0.5,
      carbohydrates: 11,
      fats: 0.3,
      fiber: 1.7,
      sugar: 8,
      vitamins_total: 7.0,
      minerals_total: 2.4,
    },
    vitamins: [
      { name: "Vitamin C", value: 60.9, unit: "mg" },
      { name: "Vitamin A", value: 2.2, unit: "mg" },
    ],
    minerals: [
      { name: "Calcium", value: 20, unit: "mg" },
      { name: "Magnesium", value: 21, unit: "mg" },
    ],
    best_time: ["Morning"],
    avoid_for: ["Pregnancy (raw form)"],
    image:
      Papaya,
    location: "Bhubaneswar, Odisha, India",
  },
  {
    _id: "fruit005",
    name: "Watermelon",
    type: "Veg",
    category: "Hydration",
    description:
      "Refreshing fruit rich in water and Vitamin A, perfect for summer.",
    price: 30,
    nutrients: {
      calories: 30,
      protein: 0.6,
      carbohydrates: 8,
      fats: 0.2,
      fiber: 0.4,
      sugar: 6,
      vitamins_total: 4.0,
      minerals_total: 2.1,
    },
    vitamins: [
      { name: "Vitamin A", value: 2.0, unit: "mg" },
      { name: "Vitamin C", value: 8.1, unit: "mg" },
    ],
    minerals: [
      { name: "Potassium", value: 112, unit: "mg" },
      { name: "Magnesium", value: 10, unit: "mg" },
    ],
    best_time: ["Afternoon"],
    avoid_for: ["Cold and cough"],
    image:
      Watermelon,
    location: "Sambalpur, Odisha, India",
  },
  {
    _id: "fruit006",
    name: "Apple",
    type: "Veg",
    category: "Immunity",
    description: "A crisp fruit that keeps you healthy and strong.",
    price: 120,
    nutrients: {
      calories: 52,
      protein: 0.3,
      carbohydrates: 14,
      fats: 0.2,
      fiber: 2.4,
      sugar: 10,
      vitamins_total: 6.2,
      minerals_total: 2.0,
    },
    vitamins: [{ name: "Vitamin C", value: 4.6, unit: "mg" }],
    minerals: [{ name: "Potassium", value: 107, unit: "mg" }],
    best_time: ["Morning"],
    avoid_for: ["Acid reflux"],
    image:
      apple,
    location: "Balasore, Odisha, India",
  },
  {
    _id: "fruit007",
    name: "Pineapple",
    type: "Veg",
    category: "Digestion",
    description: "Tropical fruit rich in bromelain and Vitamin C.",
    price: 70,
    nutrients: {
      calories: 50,
      protein: 0.5,
      carbohydrates: 13,
      fats: 0.1,
      fiber: 1.4,
      sugar: 10,
      vitamins_total: 7.3,
      minerals_total: 2.5,
    },
    vitamins: [{ name: "Vitamin C", value: 47.8, unit: "mg" }],
    minerals: [{ name: "Manganese", value: 0.9, unit: "mg" }],
    best_time: ["Morning", "Lunch"],
    avoid_for: ["Ulcer"],
    image:
      pineapple,
    location: "Mayurbhanj, Odisha, India",
  },
  {
    _id: "fruit008",
    name: "Jackfruit",
    type: "Veg",
    category: "Weight Gain",
    description:
      "Large tropical fruit rich in carbohydrates and antioxidants.",
    price: 45,
    nutrients: {
      calories: 95,
      protein: 1.7,
      carbohydrates: 24,
      fats: 0.6,
      fiber: 1.5,
      sugar: 19,
      vitamins_total: 7.0,
      minerals_total: 2.8,
    },
    vitamins: [{ name: "Vitamin C", value: 13.7, unit: "mg" }],
    minerals: [{ name: "Potassium", value: 448, unit: "mg" }],
    best_time: ["Lunch"],
    avoid_for: ["Diabetes"],
    image:
      jackfruits,
    location: "Keonjhar, Odisha, India",
  },
  {
    _id: "fruit009",
    name: "Litchi",
    type: "Veg",
    category: "Cooling Fruit",
    description:
      "Sweet juicy fruit popular during summer, high in Vitamin C.",
    price: 150,
    nutrients: {
      calories: 66,
      protein: 0.8,
      carbohydrates: 17,
      fats: 0.4,
      fiber: 1.3,
      sugar: 15,
      vitamins_total: 8.0,
      minerals_total: 2.9,
    },
    vitamins: [{ name: "Vitamin C", value: 71.5, unit: "mg" }],
    minerals: [{ name: "Copper", value: 0.1, unit: "mg" }],
    best_time: ["Afternoon"],
    avoid_for: ["Diabetes"],
    image:
      lychees,
    location: "Kalahandi, Odisha, India",
  },
  {
    _id: "fruit010",
    name: "Coconut",
    type: "Veg",
    category: "Hydration",
    description:
      "Rich in electrolytes and good fats; perfect for hydration.",
    price: 40,
    nutrients: {
      calories: 68,
      protein: 0.7,
      carbohydrates: 6,
      fats: 4,
      fiber: 1,
      sugar: 2,
      vitamins_total: 5.0,
      minerals_total: 3.0,
    },
    vitamins: [{ name: "Vitamin C", value: 3.3, unit: "mg" }],
    minerals: [{ name: "Potassium", value: 250, unit: "mg" }],
    best_time: ["Morning", "Noon"],
    avoid_for: ["High cholesterol"],
    image:
      coconut,
    location: "Ganjam, Odisha, India",
  },
];

export default foodItems;
