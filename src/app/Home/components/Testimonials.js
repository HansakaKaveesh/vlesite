import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import Image from 'next/image';

export default function Testimonials() {
  const testimonials = [
    { 
      name: 'Jane Doe', 
      feedback: 'This platform is amazing!', 
      image: '/images/home/Men.jpg' 
    },
    { 
      name: 'John Smith', 
      feedback: 'The courses are top-notch.', 
      image: '/images/home/Men.jpg' 
    },
    { 
      name: 'Emily Johnson', 
      feedback: 'The community is incredibly supportive.', 
      image: '/images/home/Women.jpg' 
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 tracking-tight">
          What Our Learners Say
        </h2>
        <p className="mt-4 text-center text-lg text-gray-600">
          Hear from the people who have experienced success with us.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="p-8 bg-white shadow-lg rounded-xl transform transition-all hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative">
                <FaQuoteLeft className="absolute top-0 left-0 text-3xl text-blue-500" />
                <FaQuoteRight className="absolute bottom-0 right-0 text-3xl text-blue-500" />
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={64} // Specify width
                    height={64} // Specify height
                    className="rounded-full border-4 border-blue-500 object-cover"
                  />
                </div>
              </div>
              <p className="text-center text-lg italic text-gray-700">{`"${testimonial.feedback}"`}</p>
              <h4 className="mt-4 text-center font-semibold text-xl text-gray-800">{testimonial.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
