// components/MathsResources.js

import React from 'react'

const MathsResources = () => {
  return (
    <div className="p-8 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Recommended Resources</h2>
      <ul className="space-y-4">
        <li>
          <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-300">Interactive Algebra Tool</a>
        </li>
        <li>
          <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-300">Calculus Video Tutorials</a>
        </li>
        <li>
          <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-300">Geometry Practice Problems</a>
        </li>
        <li>
          <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-300">Statistics Workbook PDF</a>
        </li>
      </ul>
    </div>
  )
}

export default MathsResources
