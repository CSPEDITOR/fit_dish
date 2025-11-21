// // import { useState } from "react";
// // import API from "../api/admin";
// // import { useEffect } from "react";
// // import axios from "axios";
// // export default function AddFood() {
// //   const [form, setForm] = useState({
// //     name: "",
// //     type: "",
// //     category: "",
// //     description: "",
// //     price: "",
// //     location: "",
// //     calories: "",
// //     protein: "",
// //     carbohydrates: "",
// //     fats: "",
// //     fiber: "",
// //     sugar: "",
// //     vitamins_total: "",
// //     minerals_total: "",
// //     best_time: "",
// //     diseases: "",
// //   });

// //   const [image, setImage] = useState(null);
// //   const [diseases, setDiseases] = useState([]);
// //   const [selectedDiseases, setSelectedDiseases] = useState([]);
// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const [vitamins, setVitamins] = useState([
// //   { name: "", value: "", unit: "" }
// // ]);

// // const [minerals, setMinerals] = useState([
// //   { name: "", value: "", unit: "" }
// // ]);

// //   useEffect(() => {
// //     const fetchDiseases = async () => {
// //       try {
// //         const res = await axios.get("http://localhost:5000/api/diseases");
// //         setDiseases(res.data);
// //       } catch (error) {
// //         console.log(error);
// //       }
// //     };
// //     fetchDiseases();
// //   }, []);
// //   useEffect(() => {
// //     setForm((prev) => ({
// //       ...prev,
// //       diseases: selectedDiseases,
// //     }));
// //   }, [selectedDiseases]);

// //   const addVitamin = () => {
// //   setVitamins([...vitamins, { name: "", value: "", unit: "" }]);
// // };

// // const addMineral = () => {
// //   setMinerals([...minerals, { name: "", value: "", unit: "" }]);
// // };
// // const handleVitaminChange = (index, field, value) => {
// //   const updated = [...vitamins];
// //   updated[index][field] = value;
// //   setVitamins(updated);
// // };

// // const handleMineralChange = (index, field, value) => {
// //   const updated = [...minerals];
// //   updated[index][field] = value;
// //   setMinerals(updated);
// // };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const fd = new FormData();

// //     // BASIC FIELDS
// //     fd.append("name", form.name);
// //     fd.append("type", form.type);
// //     fd.append("category", form.category);
// //     fd.append("description", form.description);
// //     fd.append("price", Number(form.price));
// //     fd.append("location", form.location);

// //     // NUTRIENTS object
// //     const nutrients = {
// //       calories: Number(form.calories),
// //       protein: Number(form.protein),
// //       carbohydrates: Number(form.carbohydrates),
// //       fats: Number(form.fats),
// //       fiber: Number(form.fiber),
// //       sugar: Number(form.sugar),
// //       vitamins_total: Number(form.vitamins_total),
// //       minerals_total: Number(form.minerals_total),
// //     };

// //     fd.append("nutrients", JSON.stringify(nutrients));

// //     // BEST TIME (comma separated → array)
// //     fd.append(
// //       "best_time",
// //       JSON.stringify(form.best_time.split(",").map((t) => t.trim()))
// //     );

// //     // DISEASES (multi-select → array)
// //     //   fd.append("diseases", JSON.stringify(selectedDiseases));
// //     selectedDiseases.forEach((id) => {
// //       fd.append("diseases[]", id);
// //     });
// //     const vitaminsArray = [];
// //     const mineralsArray = [];
// //     fd.append("vitamins", JSON.stringify(vitaminsArray)); // send array-of-objects as JSON string
// //     fd.append("minerals", JSON.stringify(mineralsArray));

// //     // IMAGE
// //     if (image) {
// //       fd.append("image", image);
// //     }

// //     // Empty vitamins & minerals for now
// //     //   fd.append("vitamins", "[]");
// //     // fd.append("minerals", "[]");

// //     try {
// //       const res = await API.post("/api/foods/create", fd, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });

// //       alert("Food Added Successfully!");
// //     } catch (err) {
// //       console.log(err);
// //       alert(err.response?.data?.msg || "Error adding food");
// //     }
// //   };

// //   return (
// //     <div className="p-10">
// //       <h1 className="text-xl font-bold mb-5">Add Food</h1>

// //       <form
// //         onSubmit={handleSubmit}
// //         className="grid grid-cols-2 gap-4 max-w-4xl"
// //       >
// //         <input
// //           name="name"
// //           placeholder="Name"
// //           className="p-2 border rounded"
// //           onChange={handleChange}
// //         />

// //         <input
// //           name="type"
// //           placeholder="Type (Veg / Non-Veg)"
// //           className="p-2 border rounded"
// //           onChange={handleChange}
// //         />

// //         <input
// //           name="category"
// //           placeholder="Category"
// //           className="p-2 border rounded"
// //           onChange={handleChange}
// //         />

// //         <input
// //           name="price"
// //           placeholder="Price"
// //           type="number"
// //           className="p-2 border rounded"
// //           onChange={handleChange}
// //         />

// //         <input
// //           name="location"
// //           placeholder="Location"
// //           className="p-2 border rounded"
// //           onChange={handleChange}
// //         />

// //         <textarea
// //           name="description"
// //           placeholder="Description"
// //           className="p-2 border rounded col-span-2"
// //           onChange={handleChange}
// //         />

// //         {/* Nutrients */}
// //         <input
// //           name="calories"
// //           placeholder="Calories"
// //           step="any"
// //           type="number"
// //           className="p-2 border rounded"
// //           onChange={handleChange}
// //         />
// //         <input
// //           name="protein"
// //           placeholder="Protein"
// //           step="any"
// //           type="number"
// //           className="p-2 border rounded"
// //           onChange={handleChange}
// //         />
// //         <input
// //           name="carbohydrates"
// //           placeholder="Carbohydrates"
// //           step="any"
// //           type="number"
// //           className="p-2 border rounded"
// //           onChange={handleChange}
// //         />
// //         <input
// //           name="fats"
// //           placeholder="Fats"
// //           step="any"
// //           type="number"
// //           className="p-2 border rounded"
// //           onChange={handleChange}
// //         />
// //         <input
// //           name="fiber"
// //           placeholder="Fiber"
// //           step="any"
// //           type="number"
// //           className="p-2 border rounded"
// //           onChange={handleChange}
// //         />
// //         <input
// //           name="sugar"
// //           placeholder="Sugar"
// //           step="any"
// //           type="number"
// //           className="p-2 border rounded"
// //           onChange={handleChange}
// //         />
// //         <h3>Minerals</h3>
// //         {minerals.map((min, index) => (
// //           <div key={index} className="flex gap-3 mb-2">
// //             <input
// //               type="text"
// //               placeholder="Name"
// //               value={min.name}
// //               onChange={(e) =>
// //                 handleMineralChange(index, "name", e.target.value)
// //               }
// //             />

// //             <input
// //               type="number"
// //               placeholder="Value"
// //               value={min.value}
// //               onChange={(e) =>
// //                 handleMineralChange(index, "value", e.target.value)
// //               }
// //             />

// //             <input
// //               type="text"
// //               placeholder="Unit"
// //               value={min.unit}
// //               onChange={(e) =>
// //                 handleMineralChange(index, "unit", e.target.value)
// //               }
// //             />
// //           </div>
// //         ))}
// //         <button onClick={addMineral}>Add Mineral</button>

// //         {/* <input
// //           name="vitamins_total"
// //           placeholder="Vitamins Total"
// //           step="any"
// //           type="number"
// //           className="p-2 border rounded"
// //           onChange={handleChange}
// //         /> */}
// //         {/* <input
// //           name="minerals_total"
// //           placeholder="Minerals Total"
// //           step="any"
// //           type="number"
// //           className="p-2 border rounded"
// //           onChange={handleChange}
// //         /> */}

// //         <h3>Vitamins</h3>
// //         {vitamins.map((vit, index) => (
// //           <div key={index} className="flex gap-3 mb-2">
// //             <input
// //               type="text"
// //               placeholder="Name"
// //               value={vit.name}
// //               onChange={(e) =>
// //                 handleVitaminChange(index, "name", e.target.value)
// //               }
// //             />

// //             <input
// //               type="number"
// //               placeholder="Value"
// //               value={vit.value}
// //               onChange={(e) =>
// //                 handleVitaminChange(index, "value", e.target.value)
// //               }
// //             />

// //             <input
// //               type="text"
// //               placeholder="Unit"
// //               value={vit.unit}
// //               onChange={(e) =>
// //                 handleVitaminChange(index, "unit", e.target.value)
// //               }
// //             />
// //           </div>
// //         ))}
// //         <button onClick={addVitamin}>Add Vitamin</button>

// //         {/* Vitamins & Minerals will be added later as dynamic fields */}

// //         <input
// //           name="best_time"
// //           placeholder="Best Time (comma separated)"
// //           className="p-2 border rounded col-span-2"
// //           onChange={handleChange}
// //         />
// //         <label>Disease (Multi Select)</label>
// //         <select
// //           name="diseases"
// //           multiple
// //           value={selectedDiseases}
// //           onChange={(e) => {
// //             const values = [...e.target.selectedOptions].map((o) => o.value);
// //             setSelectedDiseases(values);
// //           }}
// //           className="p-2 border rounded col-span-2"
// //           required
// //         >
// //           {diseases.map((d) => (
// //             <option key={d._id} value={d._id}>
// //               {d.name}
// //             </option>
// //           ))}
// //         </select>

// //         <input
// //           type="file"
// //           className="p-2 border rounded col-span-2"
// //           onChange={(e) => setImage(e.target.files[0])}
// //         />

// //         <button className="bg-blue-600 text-white py-2 rounded col-span-2">
// //           Add Food
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }
// import { useState, useEffect } from "react";
// import API from "../api/admin";
// import axios from "axios";

// export default function AddFood() {
//   const [form, setForm] = useState({
//     name: "",
//     type: "",
//     category: "",
//     description: "",
//     price: "",
//     location: "",
//     calories: "",
//     protein: "",
//     carbohydrates: "",
//     fats: "",
//     fiber: "",
//     sugar: "",
//     vitamins_total: "",
//     minerals_total: "",
//     best_time: "",
//     diseases: "",
//   });

//   const [image, setImage] = useState(null);
//   const [diseases, setDiseases] = useState([]);
//   const [selectedDiseases, setSelectedDiseases] = useState([]);

//   const [vitamins, setVitamins] = useState([{ name: "", value: "", unit: "" }]);

//   const [minerals, setMinerals] = useState([{ name: "", value: "", unit: "" }]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   useEffect(() => {
//     const fetchDiseases = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/diseases");
//         setDiseases(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchDiseases();
//   }, []);

//   useEffect(() => {
//     setForm((prev) => ({
//       ...prev,
//       diseases: selectedDiseases,
//     }));
//   }, [selectedDiseases]);

//   // Add new vitamin row
//   const addVitamin = () => {
//     setVitamins([...vitamins, { name: "", value: "", unit: "" }]);
//   };

//   // Add new mineral row
//   const addMineral = () => {
//     setMinerals([...minerals, { name: "", value: "", unit: "" }]);
//   };
//   // REMOVE VITAMIN
//   const removeVitamin = (index) => {
//     const updated = vitamins.filter((_, i) => i !== index);
//     setVitamins(updated);
//   };

//   // REMOVE MINERAL
//   const removeMineral = (index) => {
//     const updated = minerals.filter((_, i) => i !== index);
//     setMinerals(updated);
//   };

//   // Update vitamin input
//   const handleVitaminChange = (index, field, value) => {
//     const updated = [...vitamins];
//     updated[index][field] = value;
//     setVitamins(updated);
//   };

//   // Update mineral input
//   const handleMineralChange = (index, field, value) => {
//     const updated = [...minerals];
//     updated[index][field] = value;
//     setMinerals(updated);
//   };

//   // Submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const fd = new FormData();

//     // Basic fields
//     fd.append("name", form.name);
//     fd.append("type", form.type);
//     fd.append("category", form.category);
//     fd.append("description", form.description);
//     fd.append("price", Number(form.price));
//     fd.append("location", form.location);

//     // Nutrients object
//     const nutrients = {
//       calories: Number(form.calories),
//       protein: Number(form.protein),
//       carbohydrates: Number(form.carbohydrates),
//       fats: Number(form.fats),
//       fiber: Number(form.fiber),
//       sugar: Number(form.sugar),
//       vitamins_total: Number(form.vitamins_total),
//       minerals_total: Number(form.minerals_total),
//     };

//     fd.append("nutrients", JSON.stringify(nutrients));

//     // Best time → array
//     fd.append(
//       "best_time",
//       JSON.stringify(form.best_time.split(",").map((t) => t.trim()))
//     );

//     // Diseases → array
//     selectedDiseases.forEach((id) => {
//       fd.append("diseases[]", id);
//     });

//     // Vitamins & Minerals (THIS WAS THE MAIN FIX)
//     fd.append("vitamins", JSON.stringify(vitamins));
//     fd.append("minerals", JSON.stringify(minerals));

//     // Image
//     if (image) {
//       fd.append("image", image);
//     }

//     try {
//       const res = await API.post("/api/foods/create", fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert("Food Added Successfully!");
//     } catch (err) {
//       console.log(err);
//       alert(err.response?.data?.msg || "Error adding food");
//     }
//   };

//   return (
//     <div className="p-10">
//       <h1 className="text-xl font-bold mb-5">Add Food</h1>

//       <form
//         onSubmit={handleSubmit}
//         className="grid grid-cols-2 gap-4 max-w-4xl"
//       >
//         {/* --- Basic inputs --- */}
//         <input
//           name="name"
//           placeholder="Name"
//           className="p-2 border rounded"
//           onChange={handleChange}
//         />
//         <input
//           name="type"
//           placeholder="Type (Veg / Non-Veg)"
//           className="p-2 border rounded"
//           onChange={handleChange}
//         />
//         <input
//           name="category"
//           placeholder="Category"
//           className="p-2 border rounded"
//           onChange={handleChange}
//         />
//         <input
//           name="price"
//           placeholder="Price"
//           type="number"
//           className="p-2 border rounded"
//           onChange={handleChange}
//         />
//         <input
//           name="location"
//           placeholder="Location"
//           className="p-2 border rounded"
//           onChange={handleChange}
//         />

//         <textarea
//           name="description"
//           placeholder="Description"
//           className="p-2 border rounded col-span-2"
//           onChange={handleChange}
//         />

//         {/* --- Nutrients --- */}
//         <input
//           name="calories"
//           placeholder="Calories"
//           step="any"
//           type="number"
//           className="p-2 border rounded"
//           onChange={handleChange}
//         />
//         <input
//           name="protein"
//           placeholder="Protein"
//           step="any"
//           type="number"
//           className="p-2 border rounded"
//           onChange={handleChange}
//         />
//         <input
//           name="carbohydrates"
//           placeholder="Carbohydrates"
//           step="any"
//           type="number"
//           className="p-2 border rounded"
//           onChange={handleChange}
//         />
//         <input
//           name="fats"
//           placeholder="Fats"
//           step="any"
//           type="number"
//           className="p-2 border rounded"
//           onChange={handleChange}
//         />
//         <input
//           name="fiber"
//           placeholder="Fiber"
//           step="any"
//           type="number"
//           className="p-2 border rounded"
//           onChange={handleChange}
//         />
//         <input
//           name="sugar"
//           placeholder="Sugar"
//           step="any"
//           type="number"
//           className="p-2 border rounded"
//           onChange={handleChange}
//         />

//         {/* --- Minerals --- */}
//         {/* <h3 className="font-bold col-span-2">Minerals</h3>
//         {minerals.map((min, i) => (
//           <div key={i} className="flex gap-3 col-span-2">
//             <input type="text" placeholder="Name" value={min.name} onChange={(e) => handleMineralChange(i, "name", e.target.value)} />
//             <input type="number" placeholder="Value" value={min.value} onChange={(e) => handleMineralChange(i, "value", e.target.value)} />
//             <input type="text" placeholder="Unit" value={min.unit} onChange={(e) => handleMineralChange(i, "unit", e.target.value)} />
//           </div>
//         ))}
//         <button type="button" onClick={addMineral} className="bg-gray-300 p-1 rounded col-span-2">Add Mineral</button> */}
//         <h3 className="font-bold mt-4">Minerals</h3>

//         {minerals.map((min, index) => (
//           <div key={index} className="flex gap-3 mb-2 items-center">
//             <input
//               type="text"
//               placeholder="Name"
//               step="any"
//               value={min.name}
//               onChange={(e) =>
//                 handleMineralChange(index, "name", e.target.value)
//               }
//               className="border p-2 rounded"
//             />

//             <input
//               type="number"
//               placeholder="Value"
//               step="any"
//               value={min.value}
//               onChange={(e) =>
//                 handleMineralChange(index, "value", e.target.value)
//               }
//               className="border p-2 rounded"
//             />

//             <input
//               type="text"
//               placeholder="Unit"
              
//               value={min.unit}
//               onChange={(e) =>
//                 handleMineralChange(index, "unit", e.target.value)
//               }
//               className="border p-2 rounded"
//             />

//             {/* REMOVE BUTTON */}
//             <button
//               type="button"
//               onClick={() => removeMineral(index)}
//               className="bg-red-500 text-white px-2 py-1 rounded"
//             >
//               Remove
//             </button>
//           </div>
//         ))}

//         <button
//           type="button"
//           onClick={addMineral}
//           className="bg-green-600 text-white px-3 py-1 rounded"
//         >
//           + Add Mineral
//         </button>

//         {/* --- Vitamins --- */}
//         {/* <h3 className="font-bold col-span-2">Vitamins</h3>
//         {vitamins.map((vit, i) => (
//           <div key={i} className="flex gap-3 col-span-2">
//             <input type="text" placeholder="Name" value={vit.name} onChange={(e) => handleVitaminChange(i, "name", e.target.value)} />
//             <input type="number" placeholder="Value" value={vit.value} onChange={(e) => handleVitaminChange(i, "value", e.target.value)} />
//             <input type="text" placeholder="Unit" value={vit.unit} onChange={(e) => handleVitaminChange(i, "unit", e.target.value)} />
//           </div>
//         ))}
//         <button type="button" onClick={addVitamin} className="bg-gray-300 p-1 rounded col-span-2">Add Vitamin</button> */}

//         <h3 className="font-bold mt-4">Vitamins</h3>

//         {vitamins.map((vit, index) => (
//           <div key={index} className="flex gap-3 mb-2 items-center">
//             <input
//               type="text"
//               placeholder="Name"
//               step="any"
//               value={vit.name}
//               onChange={(e) =>
//                 handleVitaminChange(index, "name", e.target.value)
//               }
//               className="border p-2 rounded"
//             />

//             <input
//               type="number"
//               placeholder="Value"
//               step="any"
//               value={vit.value}
//               onChange={(e) =>
//                 handleVitaminChange(index, "value", e.target.value)
//               }
//               className="border p-2 rounded"
//             />

//             <input
//               type="text"
//               placeholder="Unit"
//               value={vit.unit}
//               onChange={(e) =>
//                 handleVitaminChange(index, "unit", e.target.value)
//               }
//               className="border p-2 rounded"
//             />

//             {/* REMOVE BUTTON */}
//             <button
//               type="button"
//               onClick={() => removeVitamin(index)}
//               className="bg-red-500 text-white px-2 py-1 rounded"
//             >
//               Remove
//             </button>
//           </div>
//         ))}

//         <button
//           type="button"
//           onClick={addVitamin}
//           className="bg-green-600 text-white px-3 py-1 rounded"
//         >
//           + Add Vitamin
//         </button>

//         <input
//           name="best_time"
//           placeholder="Best Time (comma separated)"
//           className="p-2 border rounded col-span-2"
//           onChange={handleChange}
//         />

//         {/* --- Diseases --- */}
//         <label className="col-span-2">Disease (Multi Select)</label>
//         <select
//           multiple
//           value={selectedDiseases}
//           onChange={(e) => {
//             const values = [...e.target.selectedOptions].map((o) => o.value);
//             setSelectedDiseases(values);
//           }}
//           className="p-2 border rounded col-span-2"
//         >
//           {diseases.map((d) => (
//             <option key={d._id} value={d._id}>
//               {d.name}
//             </option>
//           ))}
//         </select>

//         {/* --- Image --- */}
//         <input
//           type="file"
//           className="p-2 border rounded col-span-2"
//           onChange={(e) => setImage(e.target.files[0])}
//         />

//         <button className="bg-blue-600 text-white py-2 rounded col-span-2">
//           Add Food
//         </button>
//       </form>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { Plus, X, Upload, Package, Pill, Apple } from "lucide-react";

// export default function AddFood() {
//   const [form, setForm] = useState({
//     name: "",
//     type: "",
//     category: "",
//     description: "",
//     price: "",
//     location: "",
//     calories: "",
//     protein: "",
//     carbohydrates: "",
//     fats: "",
//     fiber: "",
//     sugar: "",
//     vitamins_total: "",
//     minerals_total: "",
//     best_time: "",
//     diseases: "",
//   });

//   const [image, setImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [diseases, setDiseases] = useState([
//     { _id: "1", name: "Diabetes" },
//     { _id: "2", name: "Hypertension" },
//     { _id: "3", name: "Heart Disease" },
//     { _id: "4", name: "Obesity" }
//   ]);
//   const [selectedDiseases, setSelectedDiseases] = useState([]);

//   const [vitamins, setVitamins] = useState([{ name: "", value: "", unit: "" }]);
//   const [minerals, setMinerals] = useState([{ name: "", value: "", unit: "" }]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   useEffect(() => {
//     setForm((prev) => ({
//       ...prev,
//       diseases: selectedDiseases,
//     }));
//   }, [selectedDiseases]);

//   const addVitamin = () => {
//     setVitamins([...vitamins, { name: "", value: "", unit: "" }]);
//   };

//   const addMineral = () => {
//     setMinerals([...minerals, { name: "", value: "", unit: "" }]);
//   };

//   const removeVitamin = (index) => {
//     const updated = vitamins.filter((_, i) => i !== index);
//     setVitamins(updated);
//   };

//   const removeMineral = (index) => {
//     const updated = minerals.filter((_, i) => i !== index);
//     setMinerals(updated);
//   };

//   const handleVitaminChange = (index, field, value) => {
//     const updated = [...vitamins];
//     updated[index][field] = value;
//     setVitamins(updated);
//   };

//   const handleMineralChange = (index, field, value) => {
//     const updated = [...minerals];
//     updated[index][field] = value;
//     setMinerals(updated);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Food Added Successfully! (Demo)");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6 md:p-10">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
//             <Package className="text-green-600" size={40} />
//             Add New Food Item
//           </h1>
//           <p className="text-gray-600">Fill in the details to add a new food item to your catalog</p>
//         </div>

//         <div className="space-y-8">
//           {/* Basic Information Card */}
//           <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
//               <div className="w-1 h-6 bg-green-600 rounded-full"></div>
//               Basic Information
//             </h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Food Name</label>
//                 <input
//                   name="name"
//                   placeholder="e.g., Quinoa Salad"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
//                   onChange={handleChange}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
//                 <select
//                   name="type"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
//                   onChange={handleChange}
//                 >
//                   <option value="">Select Type</option>
//                   <option value="Veg">Vegetarian</option>
//                   <option value="Non-Veg">Non-Vegetarian</option>
//                   <option value="Vegan">Vegan</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
//                 <input
//                   name="category"
//                   placeholder="e.g., Salad, Main Course"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
//                   onChange={handleChange}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
//                 <input
//                   name="price"
//                   placeholder="0.00"
//                   type="number"
//                   step="0.01"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
//                 <input
//                   name="location"
//                   placeholder="Origin or availability location"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                 <textarea
//                   name="description"
//                   placeholder="Describe the food item..."
//                   rows="4"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Nutritional Information Card */}
//           <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
//               <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
//               Nutritional Information
//             </h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Calories (kcal)</label>
//                 <input
//                   name="calories"
//                   placeholder="0"
//                   type="number"
//                   step="any"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                   onChange={handleChange}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Protein (g)</label>
//                 <input
//                   name="protein"
//                   placeholder="0"
//                   type="number"
//                   step="any"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                   onChange={handleChange}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Carbohydrates (g)</label>
//                 <input
//                   name="carbohydrates"
//                   placeholder="0"
//                   type="number"
//                   step="any"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                   onChange={handleChange}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Fats (g)</label>
//                 <input
//                   name="fats"
//                   placeholder="0"
//                   type="number"
//                   step="any"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                   onChange={handleChange}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Fiber (g)</label>
//                 <input
//                   name="fiber"
//                   placeholder="0"
//                   type="number"
//                   step="any"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                   onChange={handleChange}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Sugar (g)</label>
//                 <input
//                   name="sugar"
//                   placeholder="0"
//                   type="number"
//                   step="any"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Vitamins Card */}
//           <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
//                 <Apple className="text-orange-600" size={28} />
//                 Vitamins
//               </h2>
//               <button
//                 type="button"
//                 onClick={addVitamin}
//                 className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition shadow-md"
//               >
//                 <Plus size={18} />
//                 Add Vitamin
//               </button>
//             </div>

//             <div className="space-y-4">
//               {vitamins.map((vit, index) => (
//                 <div key={index} className="flex gap-3 items-center bg-orange-50 p-4 rounded-lg">
//                   <input
//                     type="text"
//                     placeholder="Vitamin Name (e.g., Vitamin C)"
//                     value={vit.name}
//                     onChange={(e) => handleVitaminChange(index, "name", e.target.value)}
//                     className="flex-1 p-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
//                   />

//                   <input
//                     type="number"
//                     placeholder="Value"
//                     step="any"
//                     value={vit.value}
//                     onChange={(e) => handleVitaminChange(index, "value", e.target.value)}
//                     className="w-28 p-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
//                   />

//                   <input
//                     type="text"
//                     placeholder="Unit"
//                     value={vit.unit}
//                     onChange={(e) => handleVitaminChange(index, "unit", e.target.value)}
//                     className="w-24 p-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
//                   />

//                   <button
//                     type="button"
//                     onClick={() => removeVitamin(index)}
//                     className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-md"
//                   >
//                     <X size={18} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Minerals Card */}
//           <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
//                 <Pill className="text-purple-600" size={28} />
//                 Minerals
//               </h2>
//               <button
//                 type="button"
//                 onClick={addMineral}
//                 className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-purple-700 transition shadow-md"
//               >
//                 <Plus size={18} />
//                 Add Mineral
//               </button>
//             </div>

//             <div className="space-y-4">
//               {minerals.map((min, index) => (
//                 <div key={index} className="flex gap-3 items-center bg-purple-50 p-4 rounded-lg">
//                   <input
//                     type="text"
//                     placeholder="Mineral Name (e.g., Iron)"
//                     value={min.name}
//                     onChange={(e) => handleMineralChange(index, "name", e.target.value)}
//                     className="flex-1 p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
//                   />

//                   <input
//                     type="number"
//                     placeholder="Value"
//                     step="any"
//                     value={min.value}
//                     onChange={(e) => handleMineralChange(index, "value", e.target.value)}
//                     className="w-28 p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
//                   />

//                   <input
//                     type="text"
//                     placeholder="Unit"
//                     value={min.unit}
//                     onChange={(e) => handleMineralChange(index, "unit", e.target.value)}
//                     className="w-24 p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
//                   />

//                   <button
//                     type="button"
//                     onClick={() => removeMineral(index)}
//                     className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-md"
//                   >
//                     <X size={18} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Health & Image Card */}
//           <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
//               <div className="w-1 h-6 bg-pink-600 rounded-full"></div>
//               Health Information & Image
//             </h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Best Time to Consume</label>
//                 <input
//                   name="best_time"
//                   placeholder="e.g., Morning, Evening (comma separated)"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
//                   onChange={handleChange}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Related Diseases</label>
//                 <select
//                   multiple
//                   value={selectedDiseases}
//                   onChange={(e) => {
//                     const values = [...e.target.selectedOptions].map((o) => o.value);
//                     setSelectedDiseases(values);
//                   }}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition h-32"
//                 >
//                   {diseases.map((d) => (
//                     <option key={d._id} value={d._id}>
//                       {d.name}
//                     </option>
//                   ))}
//                 </select>
//                 <p className="text-xs text-gray-500 mt-2">Hold Ctrl/Cmd to select multiple</p>
//               </div>

//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Food Image</label>
//                 <div className="flex items-center gap-4">
//                   <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-pink-500 transition">
//                     <Upload className="text-gray-400 mb-2" size={32} />
//                     <span className="text-sm text-gray-600">Click to upload image</span>
//                     <input
//                       type="file"
//                       className="hidden"
//                       accept="image/*"
//                       onChange={handleImageChange}
//                     />
//                   </label>
                  
//                   {imagePreview && (
//                     <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-pink-200 shadow-md">
//                       <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end gap-4">
//             <button
//               type="button"
//               className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSubmit}
//               className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition font-medium shadow-lg"
//             >
//               Add Food Item
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import API from "../api/admin";
import axios from "axios";

export default function AddFood() {
  const [form, setForm] = useState({
    name: "",
    type: "",
    category: "",
    description: "",
    price: "",
    location: "",
    calories: "",
    protein: "",
    carbohydrates: "",
    fats: "",
    fiber: "",
    sugar: "",
    vitamins_total: "",
    minerals_total: "",
    best_time: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [diseases, setDiseases] = useState([]);
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [diseaseSearch, setDiseaseSearch] = useState("");
  const [filteredDiseases, setFilteredDiseases] = useState([]);
  const [showDiseaseDropdown, setShowDiseaseDropdown] = useState(false);

  const [vitamins, setVitamins] = useState([{ name: "", value: "", unit: "" }]);
  const [minerals, setMinerals] = useState([{ name: "", value: "", unit: "" }]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Fetch diseases from backend
  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/diseases");
        setDiseases(res.data);
        setFilteredDiseases(res.data);
      } catch (error) {
        console.log("Error fetching diseases:", error);
      }
    };
    fetchDiseases();
  }, []);

  // Filter diseases based on search
  useEffect(() => {
    if (diseaseSearch.trim() === "") {
      setFilteredDiseases(diseases);
    } else {
      const filtered = diseases.filter((d) =>
        d.name.toLowerCase().includes(diseaseSearch.toLowerCase())
      );
      setFilteredDiseases(filtered);
    }
  }, [diseaseSearch, diseases]);

  const addVitamin = () => {
    setVitamins([...vitamins, { name: "", value: "", unit: "" }]);
  };

  const addMineral = () => {
    setMinerals([...minerals, { name: "", value: "", unit: "" }]);
  };

  const removeVitamin = (index) => {
    const updated = vitamins.filter((_, i) => i !== index);
    setVitamins(updated);
  };

  const removeMineral = (index) => {
    const updated = minerals.filter((_, i) => i !== index);
    setMinerals(updated);
  };

  const handleVitaminChange = (index, field, value) => {
    const updated = [...vitamins];
    updated[index][field] = value;
    setVitamins(updated);
  };

  const handleMineralChange = (index, field, value) => {
    const updated = [...minerals];
    updated[index][field] = value;
    setMinerals(updated);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleDiseaseSelection = (diseaseId) => {
    if (selectedDiseases.includes(diseaseId)) {
      setSelectedDiseases(selectedDiseases.filter((id) => id !== diseaseId));
    } else {
      setSelectedDiseases([...selectedDiseases, diseaseId]);
    }
  };

  const removeDiseaseTag = (diseaseId) => {
    setSelectedDiseases(selectedDiseases.filter((id) => id !== diseaseId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();

    // Basic fields
    fd.append("name", form.name);
    fd.append("type", form.type);
    fd.append("category", form.category);
    fd.append("description", form.description);
    fd.append("price", Number(form.price));
    fd.append("location", form.location);

    // Nutrients object with vitamins_total and minerals_total
    const nutrients = {
      calories: Number(form.calories) || 0,
      protein: Number(form.protein) || 0,
      carbohydrates: Number(form.carbohydrates) || 0,
      fats: Number(form.fats) || 0,
      fiber: Number(form.fiber) || 0,
      sugar: Number(form.sugar) || 0,
      vitamins_total: Number(form.vitamins_total) || 0,
      minerals_total: Number(form.minerals_total) || 0,
    };

    fd.append("nutrients", JSON.stringify(nutrients));

    // Best time → array
    fd.append(
      "best_time",
      JSON.stringify(form.best_time.split(",").map((t) => t.trim()))
    );

    // Diseases → array
    selectedDiseases.forEach((id) => {
      fd.append("diseases[]", id);
    });

    // Vitamins & Minerals
    fd.append("vitamins", JSON.stringify(vitamins));
    fd.append("minerals", JSON.stringify(minerals));

    // Image
    if (image) {
      fd.append("image", image);
    }

    try {
      const res = await API.post("/api/foods/create", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Food Added Successfully!");
      
      // Reset form
      setForm({
        name: "",
        type: "",
        category: "",
        description: "",
        price: "",
        location: "",
        calories: "",
        protein: "",
        carbohydrates: "",
        fats: "",
        fiber: "",
        sugar: "",
        vitamins_total: "",
        minerals_total: "",
        best_time: "",
      });
      setImage(null);
      setImagePreview(null);
      setSelectedDiseases([]);
      setVitamins([{ name: "", value: "", unit: "" }]);
      setMinerals([{ name: "", value: "", unit: "" }]);
      setDiseaseSearch("");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.msg || "Error adding food");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <span className="text-4xl">🍽️</span>
            Add New Food Item
          </h1>
          <p className="text-gray-600">Fill in the details to add a new food item to your catalog</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-green-600 rounded-full"></div>
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Food Name *</label>
                <input
                  name="name"
                  value={form.name}
                  placeholder="e.g., Quinoa Salad"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                <select
                  name="type"
                  value={form.type}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Veg">Vegetarian</option>
                  <option value="Non-Veg">Non-Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <input
                  name="category"
                  value={form.category}
                  placeholder="e.g., Salad, Main Course"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price ($) *</label>
                <input
                  name="price"
                  value={form.price}
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  name="location"
                  value={form.location}
                  placeholder="Origin or availability location"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  name="description"
                  value={form.description}
                  placeholder="Describe the food item..."
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Nutritional Information Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
              Nutritional Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Calories (kcal)</label>
                <input
                  name="calories"
                  value={form.calories}
                  placeholder="0"
                  type="number"
                  step="any"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Protein (g)</label>
                <input
                  name="protein"
                  value={form.protein}
                  placeholder="0"
                  type="number"
                  step="any"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Carbohydrates (g)</label>
                <input
                  name="carbohydrates"
                  value={form.carbohydrates}
                  placeholder="0"
                  type="number"
                  step="any"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fats (g)</label>
                <input
                  name="fats"
                  value={form.fats}
                  placeholder="0"
                  type="number"
                  step="any"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fiber (g)</label>
                <input
                  name="fiber"
                  value={form.fiber}
                  placeholder="0"
                  type="number"
                  step="any"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sugar (g)</label>
                <input
                  name="sugar"
                  value={form.sugar}
                  placeholder="0"
                  type="number"
                  step="any"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Vitamins (mg)</label>
                <input
                  name="vitamins_total"
                  value={form.vitamins_total}
                  placeholder="0"
                  type="number"
                  step="any"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Minerals (mg)</label>
                <input
                  name="minerals_total"
                  value={form.minerals_total}
                  placeholder="0"
                  type="number"
                  step="any"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Vitamins Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">🍊</span>
                Vitamins
              </h2>
              <button
                type="button"
                onClick={addVitamin}
                className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition shadow-md"
              >
                <span className="text-xl">+</span>
                Add Vitamin
              </button>
            </div>

            <div className="space-y-4">
              {vitamins.map((vit, index) => (
                <div key={index} className="flex gap-3 items-center bg-orange-50 p-4 rounded-lg">
                  <input
                    type="text"
                    placeholder="Vitamin Name (e.g., Vitamin C)"
                    value={vit.name}
                    onChange={(e) => handleVitaminChange(index, "name", e.target.value)}
                    className="flex-1 p-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  />

                  <input
                    type="number"
                    placeholder="Value"
                    step="any"
                    value={vit.value}
                    onChange={(e) => handleVitaminChange(index, "value", e.target.value)}
                    className="w-28 p-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  />

                  <input
                    type="text"
                    placeholder="Unit"
                    value={vit.unit}
                    onChange={(e) => handleVitaminChange(index, "unit", e.target.value)}
                    className="w-24 p-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  />

                  <button
                    type="button"
                    onClick={() => removeVitamin(index)}
                    className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-md"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Minerals Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">💊</span>
                Minerals
              </h2>
              <button
                type="button"
                onClick={addMineral}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-purple-700 transition shadow-md"
              >
                <span className="text-xl">+</span>
                Add Mineral
              </button>
            </div>

            <div className="space-y-4">
              {minerals.map((min, index) => (
                <div key={index} className="flex gap-3 items-center bg-purple-50 p-4 rounded-lg">
                  <input
                    type="text"
                    placeholder="Mineral Name (e.g., Iron)"
                    value={min.name}
                    onChange={(e) => handleMineralChange(index, "name", e.target.value)}
                    className="flex-1 p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  />

                  <input
                    type="number"
                    placeholder="Value"
                    step="any"
                    value={min.value}
                    onChange={(e) => handleMineralChange(index, "value", e.target.value)}
                    className="w-28 p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  />

                  <input
                    type="text"
                    placeholder="Unit"
                    value={min.unit}
                    onChange={(e) => handleMineralChange(index, "unit", e.target.value)}
                    className="w-24 p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  />

                  <button
                    type="button"
                    onClick={() => removeMineral(index)}
                    className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-md"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Health & Image Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-pink-600 rounded-full"></div>
              Health Information & Image
            </h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Best Time to Consume</label>
                <input
                  name="best_time"
                  value={form.best_time}
                  placeholder="e.g., Morning, Evening (comma separated)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Related Diseases (Searchable)</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="🔍 Search diseases by name..."
                    value={diseaseSearch}
                    onChange={(e) => setDiseaseSearch(e.target.value)}
                    onFocus={() => setShowDiseaseDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDiseaseDropdown(false), 200)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                  />
                  
                  {showDiseaseDropdown && (
                    <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {filteredDiseases.length > 0 ? (
                        filteredDiseases.map((disease) => (
                          <div
                            key={disease._id}
                            onClick={() => toggleDiseaseSelection(disease._id)}
                            className={`p-3 cursor-pointer hover:bg-pink-50 transition ${
                              selectedDiseases.includes(disease._id) ? "bg-pink-100" : ""
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{disease.name}</span>
                              {selectedDiseases.includes(disease._id) && (
                                <span className="text-pink-600 font-bold">✓</span>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-gray-500 text-center">No diseases found</div>
                      )}
                    </div>
                  )}
                </div>
                
                {selectedDiseases.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedDiseases.map((diseaseId) => {
                      const disease = diseases.find((d) => d._id === diseaseId);
                      return disease ? (
                        <span
                          key={diseaseId}
                          className="inline-flex items-center gap-2 bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm"
                        >
                          {disease.name}
                          <button
                            type="button"
                            onClick={() => removeDiseaseTag(diseaseId)}
                            className="hover:text-pink-600 font-bold"
                          >
                            ✕
                          </button>
                        </span>
                      ) : null;
                    })}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  {diseases.length} diseases available • Click to select multiple
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Food Image</label>
                <div className="flex items-center gap-4">
                  <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-pink-500 transition">
                    <span className="text-4xl mb-2">📤</span>
                    <span className="text-sm text-gray-600">Click to upload image</span>
                    {image && <span className="text-xs text-green-600 mt-1">✓ {image.name}</span>}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                  
                  {imagePreview && (
                    <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-pink-200 shadow-md">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition font-medium shadow-lg"
            >
              Add Food Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}