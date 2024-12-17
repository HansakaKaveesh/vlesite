import Image from 'next/image';
import "animate.css"; // Make sure to install animate.css or include it in your project
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-cover bg-center text-white text-center py-40">
      <Image
        src="/images/home/Hero bg.jpg" // Update the image path
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        quality={75}
        className="absolute inset-0 -z-10"
        priority // Ensures the background image loads faster
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-75"></div>

      {/* Content */}
      <div className="relative z-10 py-16 px-6 sm:px-12 lg:px-16">
        <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-wide animate__animated animate__fadeInDown">
          Welcome to <span className="text-yellow-400">GenZedu!</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl md:text-xl animate__animated animate__fadeInUp animate__delay-.5s">
          Unlock the future of education. Explore our modern ICT and Computer Science courses tailored for you.
        </p>
        <div className="mt-8">
          <Link href="./login">
            <button className="px-10 py-4 bg-yellow-500 text-black font-semibold rounded-full shadow-lg hover:bg-yellow-400 transform hover:scale-110 transition-all duration-300 ease-in-out animate__animated animate__zoomIn animate__delay-1.5s">
              Explore Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
