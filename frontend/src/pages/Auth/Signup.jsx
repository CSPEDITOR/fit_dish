import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";
import loginbgimg from "../../images/loginbg.jpg";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { userInfo, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      // redirect after successful signup to profile page for setup
      navigate("/userprofile");
    }
  }, [userInfo, navigate]);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${loginbgimg})` }}
    >
      <div className="absolute inset-0 bg-black/25 backdrop-blur-sm"></div>
      <div className="relative z-10 bg-white/10 backdrop-blur-md text-white rounded-2xl shadow-2xl p-6 sm:p-10 w-[92%] max-w-md">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">
          Sign Up
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter your name"
              className="w-full px-3 py-2 rounded-md bg-white/80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#cc2405]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="example@gmail.com"
              className="w-full px-3 py-2 rounded-md bg-white/80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#cc2405]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full px-3 py-2 rounded-md bg-white/80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#cc2405]"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute bottom-34 right-10 sm:bottom-38 sm:right-15 flex items-center text-gray-600 cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-2 bg-[#cc2405] hover:bg-[#cf5944] rounded-lg font-semibold text-white transition-all"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </form>

        <div className="text-center mt-4 text-sm">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-300 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
