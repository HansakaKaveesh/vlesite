import React from "react";

const TeamSection = () => {
  const teamMembers = [
    {
      image: "/images/home/tanjana-sir-image-1.png",
      name: "Mr. Tanjana Chamikara",
      role: "Founder & CEO",
    },
    {
      image: "/images/home/madara-miss-image-600-2-1.png",
      name: "Ms. Madhara Wedhage",
      role: "Head of Product",
    },
    {
      image: "/images/home/udara-miss-2.png",
      name: "Ms. Udara Dilshani",
      role: "Lead Developer",
    },
  ];

  return (
    <div className="py-20 bg-gray-100">
      <h2 className="text-4xl sm:text-5xl font-semibold text-black text-center mb-6">
        Meet Our Team
      </h2>
      <p className="text-xl sm:text-2xl text-black text-center mb-12 max-w-3xl mx-auto">
        Our dedicated team is passionate about making online education accessible for everyone.
      </p>

      <div className="grid md:grid-cols-3 gap-10 px-6 sm:px-12">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 duration-300"
          >
            <img
              src={member.image}
              alt={member.name}
              className="rounded-full h-40 w-40 mx-auto mb-6 object-cover border-4 border-blue-500 shadow-lg transform transition-all hover:scale-110"
            />
            <h3 className="text-2xl font-medium text-gray-800 mb-2">{member.name}</h3>
            <p className="text-gray-600 text-lg">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
