import React, { useState, useEffect } from "react";
import API from "../api/admin"; // Adjust the path to where your API axios instance is

const AddDisease = () => {
  const [name, setName] = useState("");
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const fetchDiseases = async () => {
    try {
      const res = await API.get("/api/diseases");
      // Ensure the data is an array
      const diseasesArray = Array.isArray(res.data) ? res.data : res.data.data || [];
      setDiseases(diseasesArray);
    } catch (err) {
      console.error("Failed to fetch diseases", err);
      setError("Failed to load diseases");
    }
  };

  useEffect(() => {
    fetchDiseases();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await API.post("/api/diseases", { name });
      setMessage(res.data.message);
      setName("");
      fetchDiseases();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to add disease. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Add Disease
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Enter disease name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          required
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          disabled={!name.trim() || loading}
          className={`px-4 py-2 rounded text-white font-medium transition ${
            loading || !name.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Adding..." : "Add Disease"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-green-600 font-semibold text-center">{message}</p>
      )}
      {error && (
        <p className="mt-4 text-red-600 font-semibold text-center">{error}</p>
      )}

      <h3 className="mt-10 mb-4 text-lg font-semibold text-gray-700">
        Existing Diseases
      </h3>

      <ul className="divide-y divide-gray-200 border border-gray-200 rounded">
        {Array.isArray(diseases) && diseases.length > 0 ? (
          diseases.map((disease) => (
            <li
              key={disease._id}
              className="px-4 py-3 bg-gray-50 hover:bg-gray-100 transition"
            >
              {disease.name}
            </li>
          ))
        ) : (
          <li className="px-4 py-3 text-gray-500">No diseases found.</li>
        )}
      </ul>
    </div>
  );
};

export default AddDisease;
