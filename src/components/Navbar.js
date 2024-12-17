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
        <a
          href="/"
          className="text-4xl font-extrabold tracking-wide hover:scale-105 transition-transform duration-300"
        >
          GenZedu
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center space-x-8 text-lg font-semibold">
          <li>
            <a
              href="/"
              className="hover:text-yellow-300 cursor-pointer transition-transform duration-300 hover:scale-110"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="hover:text-yellow-300 cursor-pointer transition-transform duration-300 hover:scale-110"
            >
              About Us
            </a>
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
                <li>
                  <a
                    href="/modules/maths"
                    className="flex items-center px-4 py-3 hover:bg-blue-100 cursor-pointer transition-all duration-200"
                  >
                    <FaBook className="mr-3 text-yellow-500" />
                    Mathematics
                  </a>
                </li>
                <li>
                  <a
                    href="/modules/science"
                    className="flex items-center px-4 py-3 hover:bg-blue-100 cursor-pointer transition-all duration-200"
                  >
                    <FaFlask className="mr-3 text-green-500" />
                    Science
                  </a>
                </li>
                <li>
                  <a
                    href="/modules/history"
                    className="flex items-center px-4 py-3 hover:bg-blue-100 cursor-pointer transition-all duration-200"
                  >
                    <FaHistory className="mr-3 text-red-500" />
                    History
                  </a>
                </li>
                <li>
                  <a
                    href="/modules/programming"
                    className="flex items-center px-4 py-3 hover:bg-blue-100 cursor-pointer transition-all duration-200"
                  >
                    <FaLaptopCode className="mr-3 text-purple-500" />
                    Programming
                  </a>
                </li>
                <li>
                  <a
                    href="/modules/art"
                    className="flex items-center px-4 py-3 hover:bg-blue-100 cursor-pointer transition-all duration-200"
                  >
                    <FaPalette className="mr-3 text-pink-500" />
                    Art
                  </a>
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
                <li>
                  <a
                    href="/courses/web-development"
                    className="flex items-center px-4 py-3 hover:bg-blue-100 cursor-pointer transition-all duration-200"
                  >
                    <FaLaptopCode className="mr-3 text-purple-500" />
                    Web Development
                  </a>
                </li>
                <li>
                  <a
                    href="/courses/data-science"
                    className="flex items-center px-4 py-3 hover:bg-blue-100 cursor-pointer transition-all duration-200"
                  >
                    <FaLaptopCode className="mr-3 text-blue-500" />
                    Data Science
                  </a>
                </li>
                <li>
                  <a
                    href="/courses/machine-learning"
                    className="flex items-center px-4 py-3 hover:bg-blue-100 cursor-pointer transition-all duration-200"
                  >
                    <FaLaptopCode className="mr-3 text-orange-500" />
                    Machine Learning
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <a
              href="/contact"
              className="hover:text-yellow-300 cursor-pointer transition-transform duration-300 hover:scale-110"
            >
              Contact Us
            </a>
          </li>
        </ul>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-6">
          <a
            href="/login"
            className="bg-yellow-500 text-black px-5 py-2 rounded-lg font-semibold shadow-lg hover:bg-yellow-400 hover:scale-105 transition-all duration-300"
          >
            Sign In
          </a>
          <a
            href="/register"
            className="bg-yellow-500 text-black px-5 py-2 rounded-lg font-semibold shadow-lg hover:bg-yellow-400 hover:scale-105 transition-all duration-300"
          >
            Register
          </a>
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
            <li>
              <a href="/" className="hover:text-yellow-300 cursor-pointer">
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-yellow-300 cursor-pointer"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/modules"
                className="hover:text-yellow-300 cursor-pointer"
              >
                Modules
              </a>
            </li>
            <li>
              <a
                href="/courses"
                className="hover:text-yellow-300 cursor-pointer"
              >
                Courses
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-yellow-300 cursor-pointer"
              >
                Contact Us
              </a>
            </li>
          </ul>
          <div className="flex flex-col space-y-4">
            <a
              href="/login"
              className="bg-yellow-500 text-black px-5 py-2 rounded-lg font-semibold shadow-lg hover:bg-yellow-400 transition-all duration-300"
            >
              Sign In
            </a>
            <a
              href="/register"
              className="bg-yellow-500 text-black px-5 py-2 rounded-lg font-semibold shadow-lg hover:bg-yellow-400 transition-all duration-300"
            >
              Register
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}