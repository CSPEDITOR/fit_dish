import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <button
        className="mt-5 px-4 py-2 bg-red-600 text-white rounded"
        onClick={logout}
      >
        Logout
      </button>

      <div className="mt-10">
        <button
          onClick={() => navigate("/add-food")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Food
        </button>
      </div>
      <div className="mt-10">

      <button
          onClick={() => navigate("/add-disease")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
          >
          Add Disease
        </button>
          </div>
    </div>
  );
}
