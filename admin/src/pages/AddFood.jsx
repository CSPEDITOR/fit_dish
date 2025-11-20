import { useState } from "react";
import API from "../api/admin";
import { useEffect } from "react";
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
    diseases: "",
  });

  const [image, setImage] = useState(null);
  const [diseases, setDiseases] = useState([]);
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/diseases");
        setDiseases(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDiseases();
  }, []);
  useEffect(() => {
  setForm((prev) => ({
    ...prev,
    diseases: selectedDiseases
  }));
}, [selectedDiseases]);

 const handleSubmit = async (e) => {
  e.preventDefault();

  const fd = new FormData();

  // BASIC FIELDS
  fd.append("name", form.name);
  fd.append("type", form.type);
  fd.append("category", form.category);
  fd.append("description", form.description);
  fd.append("price", Number(form.price));
  fd.append("location", form.location);

  // NUTRIENTS object
  const nutrients = {
    calories: Number(form.calories),
    protein: Number(form.protein),
    carbohydrates: Number(form.carbohydrates),
    fats: Number(form.fats),
    fiber: Number(form.fiber),
    sugar: Number(form.sugar),
    vitamins_total: Number(form.vitamins_total),
    minerals_total: Number(form.minerals_total),
  };

  fd.append("nutrients", JSON.stringify(nutrients));

  // BEST TIME (comma separated → array)
  fd.append(
    "best_time",
    JSON.stringify(form.best_time.split(",").map((t) => t.trim()))
  );

  // DISEASES (multi-select → array)
//   fd.append("diseases", JSON.stringify(selectedDiseases));
selectedDiseases.forEach((id) => {
  fd.append("diseases[]", id);
});


  // IMAGE
  if (image) {
    fd.append("image", image);
  }

  // Empty vitamins & minerals for now
//   fd.append("vitamins", "[]");
// fd.append("minerals", "[]");


  try {
    const res = await API.post("/api/foods/create", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Food Added Successfully!");

  } catch (err) {
    console.log(err);
    alert(err.response?.data?.msg || "Error adding food");
  }
};


  return (
    <div className="p-10">
      <h1 className="text-xl font-bold mb-5">Add Food</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 max-w-4xl"
      >
        <input
          name="name"
          placeholder="Name"
          className="p-2 border rounded"
          onChange={handleChange}
        />

        <input
          name="type"
          placeholder="Type (Veg / Non-Veg)"
          className="p-2 border rounded"
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Category"
          className="p-2 border rounded"
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="Price"
          type="number"
          className="p-2 border rounded"
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          className="p-2 border rounded"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="p-2 border rounded col-span-2"
          onChange={handleChange}
        />

        {/* Nutrients */}
        <input
          name="calories"
          placeholder="Calories"
          step="any"
          type="number"
          className="p-2 border rounded"
          onChange={handleChange}
        />
        <input
          name="protein"
          placeholder="Protein"
          step="any"
          type="number"
          className="p-2 border rounded"
          onChange={handleChange}
        />
        <input
          name="carbohydrates"
          placeholder="Carbohydrates"
          step="any"
          type="number"
          className="p-2 border rounded"
          onChange={handleChange}
        />
        <input
          name="fats"
          placeholder="Fats"
          step="any"
          type="number"
          className="p-2 border rounded"
          onChange={handleChange}
        />
        <input
          name="fiber"
          placeholder="Fiber"
          step="any"
          type="number"
          className="p-2 border rounded"
          onChange={handleChange}
        />
        <input
          name="sugar"
          placeholder="Sugar"
          step="any"
          type="number"
          className="p-2 border rounded"
          onChange={handleChange}
        />
        <input
          name="vitamins_total"
          placeholder="Vitamins Total"
          step="any"
          type="number"
          className="p-2 border rounded"
          onChange={handleChange}
        />
        <input
          name="minerals_total"
          placeholder="Minerals Total"
          step="any"
          type="number"
          className="p-2 border rounded"
          onChange={handleChange}
        />

        {/* Vitamins & Minerals will be added later as dynamic fields */}

        <input
          name="best_time"
          placeholder="Best Time (comma separated)"
          className="p-2 border rounded col-span-2"
          onChange={handleChange}
        />
        <label>Disease (Multi Select)</label>
<select
  name="diseases"
  multiple
  value={selectedDiseases}
  onChange={(e) => {
    const values = [...e.target.selectedOptions].map((o) => o.value);
    setSelectedDiseases(values);
  }}
  className="p-2 border rounded col-span-2"
  required
>
  {diseases.map((d) => (
    <option key={d._id} value={d._id}>
      {d.name}
    </option>
  ))}
</select>

        <input
          type="file"
          className="p-2 border rounded col-span-2"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button className="bg-blue-600 text-white py-2 rounded col-span-2">
          Add Food
        </button>
      </form>
    </div>
  );
}
