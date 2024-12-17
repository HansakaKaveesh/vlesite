import React from "react";
import { FaRocket, FaEye, FaHandshake } from "react-icons/fa";

const MissionSection = () => {
  const missions = [
    {
      icon: <FaRocket className="text-4xl text-blue-600" />,
      title: "Our Mission",
      description: "To create an inclusive learning platform that bridges the gap between technology and education.",
    },
    {
      icon: <FaEye className="text-4xl text-green-600" />,
      title: "Our Vision",
      description: "To be a global leader in virtual learning, fostering growth and innovation in education.",
    },
    {
      icon: <FaHandshake className="text-4xl text-yellow-600" />,
      title: "Our Values",
      description: "Innovation, inclusivity, and integrity are the cornerstones of our commitment to education.",
    },
  ];

  return (
    <div className="py-24 bg-gray-100">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6 text-center">
        About Us
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 leading-relaxed text-center max-w-3xl mx-auto mb-12">
        Welcome to our Virtual Learning Environment (VLE)! Our mission is to empower students and educators by providing innovative, accessible, and user-friendly tools for online learning.
      </p>
      <div className="grid md:grid-cols-3 gap-12 md:gap-16 px-6">
        {missions.map((mission, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
          >
            <div className="mb-6">{mission.icon}</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">{mission.title}</h3>
            <p className="text-gray-600 text-center">{mission.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionSection;
