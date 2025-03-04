import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Calendar, MapPin, Users } from 'lucide-react';

interface GalleryEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  attendees: number;
  category: string;
  thumbnail: string;
  images: string[];
  details: string;
}

const events: GalleryEvent[] = [
  {
    id: 1,
    title: "Corporate Leadership Summit",
    description: "Annual gathering of industry leaders",
    date: "March 15, 2024",
    location: "Grand Convention Center",
    attendees: 500,
    category: "Corporate",
    thumbnail: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069",
    images: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070"
    ],
    details: "Our annual Corporate Leadership Summit brought together 500+ executives from Fortune 500 companies for a day of insightful discussions, networking, and strategic planning. The event featured keynote speeches from industry pioneers, interactive workshops, and exclusive networking sessions designed to foster collaboration and innovation across sectors."
  },
  {
    id: 2,
    title: "Tech Innovation Conference",
    description: "Showcasing the future of technology",
    date: "February 28, 2024",
    location: "Tech Hub Center",
    attendees: 750,
    category: "Technology",
    thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070",
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012"
    ],
    details: "The Tech Innovation Conference showcased cutting-edge technologies and groundbreaking solutions from startups and established tech giants alike. Attendees experienced hands-on demonstrations of the latest AI applications, immersive VR experiences, and participated in thought-provoking panel discussions about the ethical implications of emerging technologies."
  },
  {
    id: 3,
    title: "Elegant Wedding Celebration",
    description: "A magical day of love and celebration",
    date: "April 10, 2024",
    location: "Seaside Resort",
    attendees: 200,
    category: "Wedding",
    thumbnail: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070",
    images: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2070",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069"
    ],
    details: "This breathtaking seaside wedding combined elegant décor with natural beauty, creating an unforgettable celebration of love. From the custom floral arrangements to the personalized lighting design, every detail was meticulously crafted to reflect the couple's unique story and style. The evening concluded with a spectacular fireworks display over the ocean."
  },
  {
    id: 4,
    title: "Fashion Week Showcase",
    description: "Celebrating style and creativity",
    date: "May 5, 2024",
    location: "Metropolitan Gallery",
    attendees: 350,
    category: "Fashion",
    thumbnail: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2076",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2076",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070",
      "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=2065"
    ],
    details: "Our Fashion Week Showcase transformed the Metropolitan Gallery into a runway of innovation and style. Featuring collections from both established designers and emerging talents, the event celebrated diversity and sustainability in fashion. The immersive experience included interactive installations, live music performances, and exclusive after-parties that continued the celebration of creativity."
  },
  {
    id: 5,
    title: "Music Festival Experience",
    description: "Three days of incredible performances",
    date: "June 15-17, 2024",
    location: "Riverside Park",
    attendees: 5000,
    category: "Entertainment",
    thumbnail: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070",
    images: [
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070",
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=2070",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2070"
    ],
    details: "The Riverside Music Festival brought together over 30 artists across 4 stages for an unforgettable weekend of music and community. Beyond the performances, attendees enjoyed curated food experiences, interactive art installations, and wellness activities. Our sustainable event management practices ensured minimal environmental impact while maximizing the festival experience."
  },
  {
    id: 6,
    title: "Product Launch Gala",
    description: "Unveiling innovation with style",
    date: "July 8, 2024",
    location: "Innovation Center",
    attendees: 300,
    category: "Corporate",
    thumbnail: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012",
    images: [
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070",
      "https://images.unsplash.com/photo-1560523159-4a9692d222f9?q=80&w=2070"
    ],
    details: "This exclusive product launch transformed the Innovation Center into an immersive brand experience that captivated industry influencers and media representatives. The event featured choreographed product reveals, interactive demonstration stations, and a carefully curated sensory journey that reinforced the brand's identity and the product's unique value proposition."
  }
];

const InteractiveGallery = () => {
  const [selectedEvent, setSelectedEvent] = useState<GalleryEvent | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openEventDetails = (event: GalleryEvent) => {
    setSelectedEvent(event);
    setCurrentImageIndex(0);
  };

  const closeEventDetails = () => {
    setSelectedEvent(null);
  };

  const nextImage = () => {
    if (selectedEvent) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedEvent.images.length);
    }
  };

  const prevImage = () => {
    if (selectedEvent) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedEvent.images.length) % selectedEvent.images.length);
    }
  };

  return (
    <section className="py-20 bg-black text-white">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Our Event Gallery
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our portfolio of successful events that showcase our creativity and expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
              onClick={() => openEventDetails(event)}
            >
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-colors">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={event.thumbnail}
                    alt={event.title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/80 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {event.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-neutral-400 mb-4">{event.description}</p>
                  <div className="flex justify-between items-center text-sm text-neutral-500">
                    <span>{event.date}</span>
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeEventDetails}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-neutral-900 rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={closeEventDetails}
                  className="absolute right-4 top-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>

                {/* Image Carousel */}
                <div className="relative h-[50vh] md:h-[60vh]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      src={selectedEvent.images[currentImageIndex]}
                      alt={`${selectedEvent.title} - Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedEvent.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentImageIndex === index
                            ? "bg-white w-4"
                            : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="md:w-2/3">
                      <h2 className="text-3xl font-bold mb-4">{selectedEvent.title}</h2>
                      <p className="text-neutral-300 mb-6">{selectedEvent.details}</p>
                    </div>

                    <div className="md:w-1/3 bg-neutral-800/50 rounded-xl p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-blue-400" />
                        <div>
                          <h4 className="text-sm text-neutral-400">Date</h4>
                          <p className="text-white">{selectedEvent.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-blue-400" />
                        <div>
                          <h4 className="text-sm text-neutral-400">Location</h4>
                          <p className="text-white">{selectedEvent.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-blue-400" />
                        <div>
                          <h4 className="text-sm text-neutral-400">Attendees</h4>
                          <p className="text-white">{selectedEvent.attendees}+ guests</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Image Thumbnails */}
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Event Gallery</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {selectedEvent.images.map((image, index) => (
                        <div
                          key={index}
                          className={`relative cursor-pointer rounded-lg overflow-hidden ${
                            currentImageIndex === index
                              ? "ring-2 ring-blue-500"
                              : ""
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-24 object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default InteractiveGallery;