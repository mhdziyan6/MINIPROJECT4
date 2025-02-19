import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from './Navbar';
import { BackgroundBeams } from './ui/background-beams';
import dalNik from '../images/D&N.jpg';
import sanEbin from '../images/S&D.jpg';


const events = [
  {
    id: 1,
    title: "SANDHRA & EBIN",
    description: "WEDDING OF SANDHRA AND EBIN",
    date: "March 15, 2024",
    location: "Grand Convention Center",
    images: [
      sanEbin,
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070"
    ],
    category: "WEDDING",
    highlights: [
      "500+ attendees from Fortune 500 companies",
      "20 keynote speakers",
      "Interactive workshops and networking sessions",
      "Innovation showcase"
    ]
  },
  {
    id: 2,
    title: "DALI AND NIKHIL",
    description: "SAVE THE DATE OF NIKHIL AND DALI.",
    date: "February 28, 2024",
    location: "Tech Hub Center",
    images: [
      dalNik,
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012"
    ],
    category: "SAVE THE DATE",
    highlights: [
      "Live product demonstrations",
      "Expert panel discussions",
      "Startup showcase",
      "Networking opportunities"
    ]
  }
];

const EventCard = ({ event, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    className="group relative"
  >
    <div className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-colors">
      <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
        <img
          src={event.images[0]}
          alt={event.title}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/80 text-gray-800 px-3 py-1 rounded-full text-sm">
          {event.category}
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
      <p className="text-neutral-400 mb-4">{event.description}</p>
      <div className="flex justify-between items-center text-sm text-neutral-500">
        <span>{event.date}</span>
        <span>{event.location}</span>
      </div>
    </div>
  </motion.div>
);

const EventModal = ({ event, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % event.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + event.images.length) % event.images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-neutral-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-96">
          <img
            src={event.images[currentImageIndex]}
            alt={`${event.title} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
          <p className="text-neutral-400 mb-6">{event.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="font-semibold mb-2">Date</h4>
              <p className="text-neutral-400">{event.date}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Location</h4>
              <p className="text-neutral-400">{event.location}</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Event Highlights</h4>
            <ul className="list-disc list-inside text-neutral-400">
              {event.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const GalleryPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

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
              All our Works
            </h1>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Discover our portfolio of successful events that have left lasting impressions and created unforgettable experiences.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 pb-20">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={setSelectedEvent}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;