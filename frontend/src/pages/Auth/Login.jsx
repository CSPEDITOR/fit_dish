import React from 'react';
import loginbgimg from '../../images/loginbg.jpg'
const Login = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center" 
         style={{ backgroundImage: `url(${loginbgimg})`}}>
      <div className="absolute inset-0 bg-black/25 backdrop-blur-sm"></div>
      <div className="relative z-10 bg-white/10 backdrop-blur-md text-white rounded-2xl shadow-2xl p-10 w-[90%] max-w-md">
        <h2 className="text-4xl font-bold text-center mb-8">LogIn</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input 
              type="email" 
              placeholder="example@gmail.com"
              className="w-full px-4 py-2 rounded-md bg-white/80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-md bg-white/80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="flex justify-end text-sm">
            <a href="#" className="hover:underline text-indigo-200">Forget Password</a>
          </div>
          <button  style={{ backgroundColor: "var(--red)" }} type="submit" className="w-full py-2 mt-4 rounded-lg font-semibold text-white transition-all">
            Log In
          </button>
        </form>
        <div className="text-center mt-6 text-sm">
          <p>
            Don’t have any account?{' '}
            <a href="/signup" className="text-indigo-300 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
