import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Edit2, Trash2, Image as ImageIcon, Calendar, MapPin, Users } from 'lucide-react';

interface GalleryEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  attendees: number;
  category: string;
  thumbnail: string;
  images: string[];
  details: string;
  highlights: string[];
}

const GalleryManagement = () => {
  const [events, setEvents] = useState<GalleryEvent[]>([
    {
      id: '1',
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
      details: "Our annual Corporate Leadership Summit brought together 500+ executives from Fortune 500 companies for a day of insightful discussions, networking, and strategic planning.",
      highlights: [
        "500+ attendees from Fortune 500 companies",
        "20 keynote speakers",
        "Interactive workshops",
        "Networking sessions"
      ]
    }
  ]);

  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState<GalleryEvent | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<GalleryEvent>>({
    title: '',
    description: '',
    date: '',
    location: '',
    attendees: 0,
    category: '',
    thumbnail: '',
    images: [],
    details: '',
    highlights: ['']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      setEvents(events.map(event =>
        event.id === editingEvent.id ? { ...event, ...newEvent } as GalleryEvent : event
      ));
      setEditingEvent(null);
    } else {
      setEvents([
        ...events,
        {
          ...newEvent as GalleryEvent,
          id: Date.now().toString(),
        },
      ]);
    }
    setIsAddingEvent(false);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      location: '',
      attendees: 0,
      category: '',
      thumbnail: '',
      images: [],
      details: '',
      highlights: ['']
    });
  };

  const handleEdit = (event: GalleryEvent) => {
    setEditingEvent(event);
    setNewEvent(event);
    setIsAddingEvent(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  const addHighlight = () => {
    setNewEvent(prev => ({
      ...prev,
      highlights: [...(prev.highlights || []), '']
    }));
  };

  const updateHighlight = (index: number, value: string) => {
    setNewEvent(prev => ({
      ...prev,
      highlights: prev.highlights?.map((highlight, i) => i === index ? value : highlight) || []
    }));
  };

  const removeHighlight = (index: number) => {
    setNewEvent(prev => ({
      ...prev,
      highlights: prev.highlights?.filter((_, i) => i !== index) || []
    }));
  };

  const addImage = () => {
    setNewEvent(prev => ({
      ...prev,
      images: [...(prev.images || []), '']
    }));
  };

  const updateImage = (index: number, value: string) => {
    setNewEvent(prev => ({
      ...prev,
      images: prev.images?.map((image, i) => i === index ? value : image) || []
    }));
  };

  const removeImage = (index: number) => {
    setNewEvent(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || []
    }));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Gallery Management</h2>
            <p className="text-neutral-400 mt-2">Manage event gallery cards and their details</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAddingEvent(true)}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Event
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative bg-neutral-900 rounded-xl overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={event.thumbnail}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-lg font-medium text-white truncate">{event.title}</h4>
                    <p className="text-sm text-neutral-300">{event.category}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-neutral-400">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleEdit(event)}
                  className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500/20 transition-colors"
                >
                  <Edit2 className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(event.id)}
                  className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {isAddingEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setIsAddingEvent(false);
                  setEditingEvent(null);
                }
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-neutral-900 rounded-xl p-6 max-w-3xl w-full my-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">
                    {editingEvent ? 'Edit Event' : 'Add New Event'}
                  </h3>
                  <button
                    onClick={() => {
                      setIsAddingEvent(false);
                      setEditingEvent(null);
                    }}
                    className="text-neutral-400 hover:text-white"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        className="w-full px-3 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        Category
                      </label>
                      <input
                        type="text"
                        value={newEvent.category}
                        onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                        className="w-full px-3 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Short Description
                    </label>
                    <input
                      type="text"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      className="w-full px-3 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        className="w-full px-3 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={newEvent.location}
                        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                        className="w-full px-3 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-2">
                        Attendees
                      </label>
                      <input
                        type="number"
                        value={newEvent.attendees}
                        onChange={(e) => setNewEvent({ ...newEvent, attendees: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Detailed Description
                    </label>
                    <textarea
                      value={newEvent.details}
                      onChange={(e) => setNewEvent({ ...newEvent, details: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white resize-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Thumbnail URL
                    </label>
                    <input
                      type="url"
                      value={newEvent.thumbnail}
                      onChange={(e) => setNewEvent({ ...newEvent, thumbnail: e.target.value })}
                      className="w-full px-3 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                      required
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-neutral-300">
                        Additional Images
                      </label>
                      <button
                        type="button"
                        onClick={addImage}
                        className="text-blue-500 hover:text-blue-400 text-sm flex items-center gap-1"
                      >
                        <Plus className="h-4 w-4" />
                        Add Image
                      </button>
                    </div>
                    <div className="space-y-2">
                      {newEvent.images?.map((image, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="url"
                            value={image}
                            onChange={(e) => updateImage(index, e.target.value)}
                            className="flex-1 px-3 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                            placeholder="Image URL"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-neutral-300">
                        Event Highlights
                      </label>
                      <button
                        type="button"
                        onClick={addHighlight}
                        className="text-blue-500 hover:text-blue-400 text-sm flex items-center gap-1"
                      >
                        <Plus className="h-4 w-4" />
                        Add Highlight
                      </button>
                    </div>
                    <div className="space-y-2">
                      {newEvent.highlights?.map((highlight, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={highlight}
                            onChange={(e) => updateHighlight(index, e.target.value)}
                            className="flex-1 px-3 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                            placeholder="Event highlight"
                          />
                          <button
                            type="button"
                            onClick={() => removeHighlight(index)}
                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingEvent(false);
                        setEditingEvent(null);
                      }}
                      className="px-4 py-2 text-neutral-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                      {editingEvent ? 'Update Event' : 'Create Event'}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default GalleryManagement;