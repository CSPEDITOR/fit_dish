import React from 'react';
import loginbgimg from '../../images/loginbg.jpg'
const Signup = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center" 
         style={{ backgroundImage: `url(${loginbgimg})`}}>
      <div className="absolute inset-0 bg-black/25 backdrop-blur-sm"></div>
      <div className="relative z-10 bg-white/10 backdrop-blur-md text-white rounded-2xl shadow-2xl p-10 w-[90%] max-w-md">
        <h2 className="text-4xl font-bold text-center mb-8">SignUp</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input 
              type="text" 
              placeholder="enter your name"
              className="w-full px-4 py-2 rounded-md bg-white/80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
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
         
          <button type="submit" className="w-full py-2 mt-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold text-white transition-all">
            Sign Up
          </button>
        </form>
        <div className="text-center mt-6 text-sm">
          <p>
           Already have any account ? {' '}
            <a href="/login" className="text-indigo-300 hover:underline">
              Login Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
