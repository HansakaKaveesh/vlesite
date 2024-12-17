"use client";
import { useState } from "react";
import {
  FaBook,
  FaLaptopCode,
  FaFlask,
  FaHistory,
  FaPalette,
} from "react-icons/fa";

export default function Navbar() {
  const [modulesOpen, setModulesOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky z-20 top-0 bg-blue-600 text-white shadow-lg px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-4xl font-extrabold tracking-wide hover:scale-105 transition-transform duration-300">
          GenZedu
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center space-x-8 text-lg font-semibold">
          <li className="hover:text-yellow-300 cursor-pointer transition-transform duration-300 hover:scale-110">
            Home
          </li>
          <li className="hover:text-yellow-300 cursor-pointer transition-transform duration-300 hover:scale-110">
            About Us
          </li>
          <li
            className="relative group"
            onMouseEnter={() => setModulesOpen(true)}
            onMouseLeave={() => setModulesOpen(false)}
          >
            <button className="hover:text-yellow-300 flex items-center transition-transform duration-300 hover:scale-110">
              Modules
            </button>
            {modulesOpen && (
              <ul className="absolute top-8 left-0 bg-white text-blue-700 rounded-lg shadow-xl py-2 z-10 w-56 animate-slideIn">
                <li className="flex items-center px-4 py-3 hover:bg-blue-100 cursor-pointer transition-all duration-200">
                  <FaBook className="mr-3 text-yellow-500" />
                  Mathematics
                </li>
                <li className="flex items-center px-4 py-3 hover:bg-blue-100 cursor-pointer transition-all duration-200">
                  <FaFlask className="mr-3 text-green-500" />
                  Science
                </li>
                <li className="flex items-center px-4 py-3 hover:bg-blue-100 cursor-pointer transition-all duration-200">
                  <FaHistory className="mr-3 text-red-500" />
                  History
                </li>
                <li className="flex items-center px-4 py-3 hover:bg-blue-100 cursor-pointer transition-all duration-200">
                  <FaLaptopCode className="mr-3 text-purple-500" />
                  Programming
                </li>
                <li className="flex items-center px-4 py-3 hover:bg-blue-100 cursor-pointer transition-all duration-200">
                  <FaPalette className="mr-3 text-pink-500" />
                  Art
                </li>
              </ul>
            )}
          </li>
          <li
            className="relative group"
            onMouseEnter={() => setCoursesOpen(true)}
            onMouseLeave={() => setCoursesOpen(false)}
          >
            <button className="hover:text-yellow-300 flex items-center transition-transform duration-300 hover:scale-110">
              Courses
            </button>
            {coursesOpen && (
              <ul className="absolute top-8 left-0 bg-white text-blue-700 rounded-lg shadow-xl py-2 z-10 w-56 animate-slideIn">
                <li className="flex items-center px-4 py-3 hover:bg-blue-100 cursor-pointer transition-all duration-200">
                  <FaLaptopCode className="mr-3 text-purple-500" />
                  Web Development
                </li>
                <li className="flex items-center px-4 py-3 hover:bg-blue-100 cursor-pointer transition-all duration-200">
                  <FaLaptopCode className="mr-3 text-blue-500" />
                  Data Science
                </li>
                <li className="flex items-center px-4 py-3 hover:bg-blue-100 cursor-pointer transition-all duration-200">
                  <FaLaptopCode className="mr-3 text-orange-500" />
                  Machine Learning
                </li>
              </ul>
            )}
          </li>
          <li className="hover:text-yellow-300 cursor-pointer transition-transform duration-300 hover:scale-110">
            Contact Us
          </li>
        </ul>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-6">
          <button className="bg-yellow-500 text-black px-5 py-2 rounded-lg font-semibold shadow-lg hover:bg-yellow-400 hover:scale-105 transition-all duration-300">
            Sign In
          </button>
          <button className="bg-yellow-500 text-black px-5 py-2 rounded-lg font-semibold shadow-lg hover:bg-yellow-400 hover:scale-105 transition-all duration-300">
            Register
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white text-3xl hover:text-yellow-300 transition-transform duration-300"
          >
            {mobileMenuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-indigo-600 text-white rounded-lg shadow-lg mt-4 p-4 space-y-4">
          <ul className="space-y-4 text-lg">
            <li className="hover:text-yellow-300 cursor-pointer">Home</li>
            <li className="hover:text-yellow-300 cursor-pointer">About Us</li>
            <li className="hover:text-yellow-300 cursor-pointer">Modules</li>
            <li className="hover:text-yellow-300 cursor-pointer">Courses</li>
            <li className="hover:text-yellow-300 cursor-pointer">Contact Us</li>
          </ul>
          <div className="flex flex-col space-y-4">
            <button className="bg-yellow-500 text-black px-5 py-2 rounded-lg font-semibold shadow-lg hover:bg-yellow-400 transition-all duration-300">
              Sign In
            </button>
            <button className="bg-yellow-500 text-black px-5 py-2 rounded-lg font-semibold shadow-lg hover:bg-yellow-400 transition-all duration-300">
              Register
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
