import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";

const faqs = [
  {
    question: "What is TechDiscoverly?",
    answer: "TechDiscoverly is a platform that allows users to share and discover new products in tech, gaming, and more."
  },
  {
    question: "How do I submit a product?",
    answer: "To submit a product, sign up for an account, click on 'Submit', and provide the necessary details about your product."
  },
  {
    question: "Is TechDiscoverly free to use?",
    answer: "Yes, TechDiscoverly is free to browse and submit products. However, premium features might be available."
  },
  {
    question: "Can I upvote my own product?",
    answer: "No, self-voting is not allowed. Encourage others to upvote if they find your product useful."
  }
];

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleFAQ = (question) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  return (
    <div className="max-w-3xl md:mx-auto pb-8 mx-4 ">
      <SectionTitle heading="Frequently Asked Questions" />
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.question}
            className="border rounded-lg p-4 cursor-pointer shadow-sm"
            onClick={() => toggleFAQ(faq.question)}
          >
            <div className="flex justify-between items-center">
              <h3 className="md:text-lg font-semibold">{faq.question}</h3>
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  openQuestion === faq.question ? "rotate-180" : ""
                }`}
              />
            </div>
            {openQuestion === faq.question && (
              <p className="mt-2 md:text-base text-sm text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
