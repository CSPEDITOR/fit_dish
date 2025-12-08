import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManageFoods = () => {
  const [foods, setFoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

 useEffect(() => {
  fetch("http://localhost:5000/api/foods")
    .then(res => res.json())
    .then(data => {
     
      if (Array.isArray(data.data)) setFoods(data.data);
      else if (Array.isArray(data.foods)) setFoods(data.foods);
      else setFoods([]);
    });
}, []);


  const indexLast = currentPage * itemsPerPage;
  const indexFirst = indexLast - itemsPerPage;
  console.log(foods)
  const currentFoods = Array.isArray(foods)
    ? foods.slice(indexFirst, indexLast)
    : [];
    console.log(currentFoods)

  const totalPages = Math.ceil(foods.length / itemsPerPage);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/foods/${id}`, { method: "DELETE" });
    setFoods((prev) => prev.filter((f) => f._id !== id));
  };

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Manage Foods</h1>
        <Link
          to="/add-food"
          className="px-4 py-2 bg-[#CC2405] text-white rounded-lg hover:bg-red-700"
        >
          + Add Food
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#FEF1E1]">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Food Name</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {
              // console.log(currentFoods)
            }
            {currentFoods.map((food) => (
              <tr key={food._id} className="border-b">
                <td className="p-3">
                  <img
                    src={food.image}
                    alt=""
                    className="w-14 h-14 object-cover rounded-md"
                  />
                </td>
                <td className="p-3">{food.name}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      food.type === "veg" ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {food.type}
                  </span>
                </td>

                <td className="p-3 flex gap-3">
                  <Link
                    to={`/edit-food/${food._id}`}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(food._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-3">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-4 py-1 bg-gray-200 rounded">
          {currentPage} / {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageFoods;
