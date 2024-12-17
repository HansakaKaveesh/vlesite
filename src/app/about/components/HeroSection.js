import React from "react";
import "animate.css"; // Make sure to install animate.css or include it in your project

export default function AboutUs() {
  return (
    <div>
      <section className="relative w-full bg-blue-900 text-white py-24">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
         // style={{ backgroundImage: "url('/images/hero-image.jpg')" }}
        ></div>
        <div className="relative container mx-auto text-center px-6">
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6 text-gradient animate__animated animate__fadeInDown">
            About Us
          </h1>
          <p className="text-lg sm:text-2xl mb-8 font-medium opacity-90 animate__animated animate__fadeInUp">
            Welcome to our Virtual Learning Environment, where education meets innovation.
          </p>
          <div className="flex justify-center gap-6">
            <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all ease-in-out transform hover:scale-105 animate__animated animate__zoomIn animate__delay-1.5s">
              Learn More
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg shadow-lg hover:bg-white hover:text-blue-900 transition-all ease-in-out transform hover:scale-105 animate__animated animate__zoomIn animate__delay-1.5s">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
