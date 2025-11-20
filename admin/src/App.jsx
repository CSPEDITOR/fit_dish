import { Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddFood from "./pages/AddFood";
import ProtectedRoute from "./component/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLogin />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
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
            <AddFood/>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
