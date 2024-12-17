import React from "react";

const CTASection = () => {
  return (
    <section className="bg-blue-600 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">
          Enhance Your Learning Journey Today!
        </h2>
        <p className="text-lg mb-8">
          Join our VLE and access interactive courses, resources, and tools to
          achieve your academic goals.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/register"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Enroll Now
          </a>
          <a
            href="/learn-more"
            className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
          >
            Explore Features
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
