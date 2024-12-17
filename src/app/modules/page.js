"use client";

import Head from 'next/head';

export default function Modules() {
  return (
    <>
      <Head>
        <title>Modules</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center py-10">
        {/* Container for all content */}
        <div className="bg-gray-900 bg-opacity-90 p-6 md:p-10 rounded-lg shadow-lg w-full max-w-7xl">
          {/* Top Section */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 text-center tracking-tight">
            Unlock Your Potential with Our Learning Modules
          </h1>
          <p className="text-white text-lg sm:text-xl mb-8 text-center tracking-wide">
            Whether you're preparing for IGCSE, GCSE, or IAL exams, our platform offers tailored lessons, quizzes, and subject-specific content designed to guide you every step of the way. Choose your module and begin your journey to success.
          </p>

          {/* Modules Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-10">
            {/* Edexcel Module */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-950 p-6 rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl text-white w-full">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Edexcel Module</h2>
              <p className="text-sm sm:text-lg mb-4">
                The Edexcel module offers a structured approach to learning with clear, concise lessons and practice quizzes, ensuring you are fully prepared for IGCSE, GCSE, and IAL exams.
              </p>
              <ul className="list-disc pl-5 mb-4 text-xs sm:text-sm">
                <li>Available for IGCSE, GCSE, and IAL levels</li>
                <li>Dynamic lessons tailored to different learning styles</li>
                <li>Custom quizzes and mock exams for better exam preparation</li>
                <li>Progress tracking with adaptive learning paths</li>
              </ul>
            </div>

            {/* Cambridge Module */}
            <div className="bg-gradient-to-r from-green-900 to-green-950 p-6 rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl text-white w-full">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Cambridge Module</h2>
              <p className="text-sm sm:text-lg mb-4">
                Our Cambridge module provides in-depth learning resources, including practice exams, lessons, and feedback, designed for IGCSE, GCSE, and IAL students.
              </p>
              <ul className="list-disc pl-5 mb-4 text-xs sm:text-sm">
                <li>Structured lessons covering the entire syllabus</li>
                <li>Interactive quizzes and personalized feedback</li>
                <li>Past papers and model answers for exam prep</li>
                <li>Adaptive learning paths based on progress</li>
              </ul>
            </div>
          </div>

          {/* Levels Section */}
          <div className="mt-10 sm:mt-16">
            <h2 className="text-3xl sm:text-4xl font-semibold text-white text-center mb-6">Choose Your Level</h2>
            <div className="flex flex-wrap justify-center space-x-6 sm:space-x-10 gap-6">
              {['IGCSE', 'GCSE', 'IAL'].map((level) => (
                <div
                  key={level}
                  className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full sm:w-60 text-center transform transition-transform hover:scale-105 hover:shadow-2xl"
                >
                  <h3 className="text-2xl sm:text-3xl font-semibold mb-4">{level}</h3>
                  <p className="text-sm sm:text-lg mb-4">Choose this level to access lessons, quizzes, and personalized exam prep designed for {level} students.</p>
                </div>
              ))}
            </div>
          </div>

          {/* Subjects Section */}
          <div className="mt-10 sm:mt-16">
            <h2 className="text-3xl sm:text-4xl font-semibold text-white text-center mb-6">Explore Our Subjects</h2>
            <p className="text-white text-sm sm:text-lg mb-6 text-center">Select your subject of choice and begin your learning journey with us. We offer a wide range of subjects across Edexcel and Cambridge curricula.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 text-center">
              {['ICT', 'CS'/*'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Geography', 'Computer Science'*/].map((subject) => (
                <div
                  key={subject}
                  className="bg-gray-800 text-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
                >
                  <h4 className="text-2xl sm:text-3xl font-semibold mb-4">{subject}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-10 sm:mt-16 text-center">
            <p className="text-white text-sm sm:text-xl tracking-wide">
              Ready to begin your journey? Select your level and subject to access lessons, quizzes, and more. Our platform adapts to your learning style and helps you track your progress every step of the way!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
