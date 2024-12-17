import { FaLaptopCode, FaDatabase, FaBrain, FaChartLine, FaPaintBrush, FaCloud } from "react-icons/fa";

export default function OurCourses() {
  const courses = [
    {
      title: "Web Development",
      description: "Learn to build modern websites.",
      icon: <FaLaptopCode className="text-5xl mb-4 text-blue-500" />,
    },
    {
      title: "Data Science",
      description: "Analyze data effectively.",
      icon: <FaDatabase className="text-5xl mb-4 text-green-500" />,
    },
    {
      title: "Machine Learning",
      description: "Explore AI technologies.",
      icon: <FaBrain className="text-5xl mb-4 text-yellow-500" />,
    },
    {
      title: "Digital Marketing",
      description: "Master online marketing strategies.",
      icon: <FaChartLine className="text-5xl mb-4 text-purple-500" />,
    },
    {
      title: "Graphic Designing",
      description: "Create stunning visual content.",
      icon: <FaPaintBrush className="text-5xl mb-4 text-pink-500" />,
    },
    {
      title: "Cloud Computing",
      description: "Understand cloud infrastructure and services.",
      icon: <FaCloud className="text-5xl mb-4 text-indigo-500" />,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-100 to-gray-200">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
        Our Courses
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 lg:px-16">
        {courses.map((course, idx) => (
          <div
            key={idx}
            className="transition-transform transform hover:scale-105 bg-white text-gray-900 shadow-xl rounded-2xl p-8 hover:shadow-2xl group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="group-hover:rotate-12 transition-transform">
                {course.icon}
              </div>
              <h3 className="text-2xl font-semibold mt-6 group-hover:text-blue-500 transition-colors">
                {course.title}
              </h3>
              <p className="mt-4 text-gray-600">{course.description}</p>
              <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition-all">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
