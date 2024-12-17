"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext'; // Import the user context
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
  const { login } = useUser(); // Destructure the login function from context
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('student'); // Default role
  const [formData, setFormData] = useState({ email: '', password: '', role: 'student' });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setFormData({ ...formData, role: newRole });
    setErrorMessage(''); // Clear error message
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error messages
    setLoading(true); // Start loading state
  
    // Validate input
    if (!formData.email || !formData.password) {
      setErrorMessage('Email and Password are required.');
      setLoading(false); // Stop loading
      return;
    }
  
    try {
      // Update this URL to your AWS API Gateway URL
      const response = await fetch('https://fy9bi7j5s4.execute-api.ap-south-1.amazonaws.com/production/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData }), // Send the form data (email, password, and role)
      });
  
      console.log('Response Status:', response.status);
      const data = await response.json();
      console.log('Received data from backend:', data);
  
      if (response.ok) {
        if (data.token) {
          // Store token and relevant user data in localStorage
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.user.userId);
          localStorage.setItem('username', data.user.username);
          localStorage.setItem('userType', data.user.userType); // Store userType
          localStorage.setItem('subjects', JSON.stringify(data.user.subjects || [])); // Store subjects
          localStorage.setItem('syllabus', JSON.stringify(data.user.syllabus || [])); // Store syllabus
          localStorage.setItem('courseLevels', JSON.stringify(data.user.courseLevels || {})); // Store course levels
  
          // Update the user context
          login(data.user.userId, data.user);
  
          // Navigate to the dashboard
          router.push('/dashboard');
        } else {
          setErrorMessage('Missing token in response.');
        }
      } else {
        setErrorMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="sticky z-20 top-0 bg-blue-200 text-black h-[80vh] flex items-center justify-center mt-[-10px]">
      <div className=" bg-blue-700 bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-sm overflow-y-auto">
        <h2 className="text-2xl font-semibold text-white mb-2">Login</h2>
        <p className="text-white mb-4">Access your account</p>
        <div className="flex justify-center mb-4 space-x-3">
          {['student', 'teacher', 'admin'].map((userRole) => (
            <button
              key={userRole}
              className={`flex items-center justify-center w-24 py-2 px-4 rounded ${role === userRole ? 'bg-yellow-300 text-black' : 'bg-blue-900 text-white'}`}
              onClick={() => handleRoleChange(userRole)}
            >
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="email">Email</label>
            <input
              className="w-full p-2 rounded bg-blue-200 text-white"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="password">Password</label>
            <div className="relative">
              <input
                className="w-full p-2 rounded bg-blue-200 text-white"
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 py-2 rounded-r"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p className="text-red-500 mt-2" aria-live="assertive">{errorMessage}</p>
        </form>
        <div className="mt-4">
          <a href="/forgot-password" className="text-white hover:underline">Forgot Password?</a>
          <br />
          <a href="/register" className="text-white hover:underline">Register New Account</a>
        </div>
      </div>
    </div>
  );
}
