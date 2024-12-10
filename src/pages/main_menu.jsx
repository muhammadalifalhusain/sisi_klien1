import React from "react";
import { Link } from "react-router-dom"; 
const Main_Menu = () => (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-green-400">
      <h1 className="text-4xl font-bold text-white mb-8">Selamat Datang!</h1>
      <nav className="flex gap-4">
        <Link
          to="/login"
          className="bg-white text-blue-500 font-semibold py-3 px-6 rounded shadow-lg hover:shadow-xl transition duration-300"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-white text-green-500 font-semibold py-3 px-6 rounded shadow-lg hover:shadow-xl transition duration-300"
        >
          Register
        </Link>
      </nav>
    </div>
  );
  
  export default Main_Menu; // Pastikan ekspor ini konsisten dengan impor di App.js
  