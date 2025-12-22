import { Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddFood from "./pages/AddFood";
import ProtectedRoute from "./component/ProtectedRoute";
import AddDisease from "./pages/AddDisease";
import AdminUsers from "./pages/AdminUser";
import ManageFoods from "./pages/ManageFoods";
import EditFood from "./pages/EditFood"; // Import the EditFood component

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLogin />} />

      {/* Protected routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-food"
        element={
          <ProtectedRoute>
            <AddFood />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-disease"
        element={
          <ProtectedRoute>
            <AddDisease />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <AdminUsers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/manage-foods"
        element={
          <ProtectedRoute>
            <ManageFoods />
          </ProtectedRoute>
        }
      />

      {/* ✅ ADD THIS NEW ROUTE FOR EDITING FOOD */}
      <Route
        path="/edit-food/:id"
        element={
          <ProtectedRoute>
            <EditFood />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}