import React from 'react';

function App() {
  return (
    <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg w-80">
      <h2 className="text-2xl font-semibold text-white mb-2">Registration Form</h2>
      <p className="text-white mb-4">Register now, enjoy free trial for one month</p>
      <form>
        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="full-name">Full Name (Name with Initials)</label>
          <input className="w-full p-2 rounded bg-white bg-opacity-20 text-white" type="text" id="full-name" placeholder="Name" />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="location">Location</label>
          <select className="w-full p-2 rounded bg-white bg-opacity-20 text-white" id="location">
            <option>Place</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="email">Email</label>
          <input className="w-full p-2 rounded bg-white bg-opacity-20 text-white" type="email" id="email" value="Value" />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="phone-number">Phone Number</label>
          <input className="w-full p-2 rounded bg-white bg-opacity-20 text-white" type="text" id="phone-number" value="Value" />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="course-type">Course Type</label>
          <select className="w-full p-2 rounded bg-white bg-opacity-20 text-white" id="course-type">
            <option>Select</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="grade">Grade</label>
          <select className="w-full p-2 rounded bg-white bg-opacity-20 text-white" id="grade">
            <option>Value</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default App;