import Image from "next/image";

const TutoringSection = () => {
  return (
    <section className="relative flex flex-wrap items-center justify-center bg-gray-100 py-20 px-8">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-16 items-center">
        {/* Text Section */}
        <div className="space-y-6">
          <h2 className="text-purple-700 font-bold text-4xl tracking-wide">
            How can we help?
          </h2>
          <p className="text-sm text-gray-500 font-semibold uppercase">
            Online via Zoom
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-red-600 leading-tight">
            1-to-1 Tutoring
          </h1>
          <p className="mt-6 text-gray-700 text-lg leading-relaxed">
            Unlock your full potential with personalized tutoring tailored to
            your unique needs. Let’s close the gaps and set you on the path to
            academic excellence.
          </p>
          <p className="text-gray-500 text-base">
            Use our search tool to discover over{" "}
            <span className="font-semibold text-purple-600">400+ subjects</span>{" "}
            taught by expert tutors.
          </p>
          {/* Tags */}
          <div className="flex flex-wrap gap-4 mt-6">
            {[
              "Maths",
              "English",
              "Computing",
              "Physics",
              
              "Chemistry",
              "Psychology",
              "Biology",
            ].map((subject, index) => (
              <span
                key={index}
                className="px-5 py-2 bg-gray-100 text-gray-700 rounded-full shadow-lg text-sm font-medium cursor-pointer hover:bg-purple-200 hover:text-purple-900 hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>

        {/* Image Section */}
        <div className="relative">
          <div className="relative bg-gradient-to-tr from-purple-50 to-purple-100 rounded-tl-[100px] rounded-br-[100px] overflow-hidden shadow-2xl transform hover:rotate-1 hover:scale-105 transition-all duration-500">
            <Image
              src="/images/home/Group-73.jpg" // Replace with your image path
              alt="Tutoring"
              width={600}
              height={600}
              className="object-cover w-full h-auto"
            />
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-0 -left-8 w-32 h-32 bg-purple-200 rounded-full blur-2xl opacity-50"></div>
          <div className="absolute bottom-0 -right-8 w-40 h-40 bg-red-200 rounded-full blur-3xl opacity-40"></div>
        </div>
      </div>
    </section>
  );
};

export default TutoringSection;
