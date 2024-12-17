import Image from 'next/image';

export default function MeetTeachersStudents() {
  const people = [
    { name: 'Mr. Tanjana Chamikara', role: 'Teacher', image: '/images/home/tanjana-sir-image-1.png' },
    { name: 'Ms. Madhara Wedhage', role: 'Teacher', image: '/images/home/madara-miss-image-600-2-1.png' },
    { name: 'Ms. Udara Dilshani', role: 'Teacher', image: '/images/home/udara-miss-2.png' },
    { name: 'Mr. Deepana Welivitage ', role: 'Teacher', image: '/images/home/Men.jpg' },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 tracking-tight">
          Meet Our Teachers
        </h2>
        <p className="mt-4 text-lg text-center text-gray-600">
          Get to know the brilliant minds who make up our vibrant learning community.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {people.map((person, idx) => (
            <div
              key={idx}
              className="p-6 bg-white text-center shadow-lg rounded-xl hover:shadow-2xl transition-shadow transform hover:-translate-y-2 duration-300 ease-in-out"
            >
              <div className="relative w-24 h-24 mx-auto mb-4">
                <Image
                  src={person.image}
                  alt={person.name}
                  width={96} // Set the width explicitly
                  height={96} // Set the height explicitly
                  className="rounded-full object-cover shadow-md"
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">{person.name}</h3>
              <p className="mt-2 text-gray-500">{person.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
