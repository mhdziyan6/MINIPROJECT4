import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Navbar from './Navbar';
import { BackgroundBeams } from './ui/background-beams';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    question: "What types of events do you manage?",
    answer: "We specialize in a wide range of events including corporate gatherings, weddings, conferences, product launches, fashion shows, and private celebrations. Our team has extensive experience in handling both intimate gatherings and large-scale events with thousands of attendees.",
    category: "Services"
  },
  {
    question: "How far in advance should I book your services?",
    answer: "For large events like weddings and corporate conferences, we recommend booking at least 6-8 months in advance. For smaller events, 3-4 months notice is typically sufficient. However, we also accommodate last-minute requests based on availability.",
    category: "Booking"
  },
  {
    question: "Do you provide decoration and catering services?",
    answer: "Yes, we offer comprehensive event services including decoration, catering, lighting, sound systems, and entertainment. We can either use our in-house resources or coordinate with your preferred vendors to ensure a seamless event experience.",
    category: "Services"
  },
  {
    question: "What is your pricing structure?",
    answer: "Our pricing varies based on the type of event, number of guests, services required, and duration. We offer customizable packages to suit different budgets and requirements. Contact us for a detailed quote tailored to your specific event needs.",
    category: "Pricing"
  },
  {
    question: "Do you handle destination events?",
    answer: "Yes, we have experience in organizing destination events both domestically and internationally. Our team can handle all aspects including venue selection, local vendor coordination, and logistics management for destination events.",
    category: "Services"
  },
  {
    question: "What happens if there's an emergency or last-minute changes?",
    answer: "We have a dedicated emergency response team and backup plans for all critical aspects of your event. We also maintain strong relationships with multiple vendors to ensure quick solutions for any last-minute changes or emergencies.",
    category: "Planning"
  }
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));
  
  const filteredFaqs = selectedCategory 
    ? faqs.filter(faq => faq.category === selectedCategory)
    : faqs;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="relative pt-20">
        <BackgroundBeams className="opacity-20" />
        <div className="container-width relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Frequently Asked Questions
            </h1>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Find answers to common questions about our event management services
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === null
                  ? 'bg-white text-black'
                  : 'bg-neutral-800 text-white'
              }`}
            >
              All
            </motion.button>
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category
                    ? 'bg-white text-black'
                    : 'bg-neutral-800 text-white'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <div className="max-w-3xl mx-auto pb-20 space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-neutral-900/50 border border-neutral-800 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center"
                >
                  <span className="font-medium">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-neutral-400" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 pb-4"
                    >
                      <p className="text-neutral-400">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;