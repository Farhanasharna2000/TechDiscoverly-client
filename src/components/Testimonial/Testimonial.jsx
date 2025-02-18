import { motion } from "framer-motion";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";

const testimonials = [
  {
    name: "John Doe",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    text: "TechDiscoverly transformed the way I learn about new technologies. The content is top-notch!",
  },
  {
    name: "Jane Smith",
    role: "Product Manager",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    text: "Amazing platform! The insights and tutorials are incredibly helpful for my daily work.",
  },
  {
    name: "Alex Johnson",
    role: "UI/UX Designer",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    text: "TechDiscoverly has helped me stay updated with the latest design trends. Highly recommend!",
  },
];

export default function Testimonial() {
  return (
      <div className="max-w-6xl mx-auto px-6 text-center">
      <SectionTitle

heading="What People Say About Us"
/>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              whileHover={{ scale: 1.05 }} 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.5 }} 
              className="p-4"
            >
              <div className="bg-white shadow-lg rounded-2xl p-6">
                <div className="flex flex-col items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full mb-4" 
                  />
                  <p className="text-gray-700 text-center">"{testimonial.text}"</p>
                  <h3 className="mt-4 font-semibold text-gray-900">{testimonial.name}</h3>
                  <span className="text-sm text-gray-500">{testimonial.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
  );
}
