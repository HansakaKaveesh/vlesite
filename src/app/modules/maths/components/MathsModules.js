// components/MathsModules.js

import React from 'react'
import { FaCalculator, FaCogs, FaShapes, FaChartBar } from 'react-icons/fa'

const MathsModules = () => {
  const modules = [
    { name: 'Algebra', description: 'Learn the fundamentals of Algebra', icon: <FaCalculator size={30} /> },
    { name: 'Calculus', description: 'Introduction to limits, derivatives, and integrals', icon: <FaCogs size={30} /> },
    { name: 'Geometry', description: 'Explore geometric shapes and their properties', icon: <FaShapes size={30} /> },
    { name: 'Statistics', description: 'Understand data analysis and probability', icon: <FaChartBar size={30} /> }
  ]

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {modules.map((module, index) => (
        <div 
          key={index} 
          className="bg-white shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="text-blue-500">{module.icon}</div>
            <h2 className="text-2xl font-semibold text-gray-800">{module.name}</h2>
          </div>
          <p className="text-gray-600 text-lg">{module.description}</p>
        </div>
      ))}
    </div>
  )
}

export default MathsModules
