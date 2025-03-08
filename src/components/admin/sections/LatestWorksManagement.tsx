import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';

interface LatestWork {
  id: string;
  title: string;
  link: string;
  thumbnail: string;
  category: string;
}

const LatestWorksManagement = () => {
  const [works, setWorks] = useState<LatestWork[]>([
    {
      id: '1',
      title: "Corporate Gala",
      link: "#",
      thumbnail: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069",
      category: "Corporate",
    },
    {
      id: '2',
      title: "Wedding Celebration",
      link: "#",
      thumbnail: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070",
      category: "Wedding",
    },
    {
      id: '3',
      title: "Tech Conference",
      link: "#",
      thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070",
      category: "Conference",
    },
    {
      id: '4',
      title: "Fashion Show",
      link: "#",
      thumbnail: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2076",
      category: "Fashion",
    },
    {
      id: '5',
      title: "Music Festival",
      link: "#",
      thumbnail: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070",
      category: "Festival",
    },
    {
      id: '6',
      title: "Product Launch",
      link: "#",
      thumbnail: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012",
      category: "Launch",
    },
  ]);

  const [isAddingWork, setIsAddingWork] = useState(false);
  const [editingWork, setEditingWork] = useState<LatestWork | null>(null);
  const [newWork, setNewWork] = useState<Partial<LatestWork>>({
    title: '',
    link: '',
    thumbnail: '',
    category: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingWork) {
      setWorks(works.map(work =>
        work.id === editingWork.id ? { ...work, ...newWork } as LatestWork : work
      ));
      setEditingWork(null);
    }
    setIsAddingWork(false);
    setNewWork({
      title: '',
      link: '',
      thumbnail: '',
      category: '',
    });
  };

  const handleEdit = (work: LatestWork) => {
    setEditingWork(work);
    setNewWork(work);
    setIsAddingWork(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this work? This action cannot be undone.')) {
      setWorks(works.filter(work => work.id !== id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div>
          <h2 className="text-3xl font-bold">Latest Works Management</h2>
          <p className="text-neutral-400 mt-2">Manage and update your portfolio of works</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {works.map((work) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative h-48 sm:h-64 md:h-96 w-full"
            >
              <div className="relative w-full h-full overflow-hidden rounded-xl">
                <img
                  src={work.thumbnail}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-lg font-medium text-white truncate">{work.title}</h4>
                    <p className="text-sm text-neutral-300">{work.category}</p>
                  </div>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEdit(work)}
                    className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500/20 transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(work.id)}
                    className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {isAddingWork && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setIsAddingWork(false);
                  setEditingWork(null);
                }
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-neutral-900 rounded-xl p-6 max-w-md w-full"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">
                    Edit Work
                  </h3>
                  <button
                    onClick={() => {
                      setIsAddingWork(false);
                      setEditingWork(null);
                    }}
                    className="text-neutral-400 hover:text-white"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={newWork.title}
                      onChange={(e) => setNewWork({ ...newWork, title: e.target.value })}
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
                      value={newWork.category}
                      onChange={(e) => setNewWork({ ...newWork, category: e.target.value })}
                      className="w-full px-3 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Thumbnail URL
                    </label>
                    <input
                      type="url"
                      value={newWork.thumbnail}
                      onChange={(e) => setNewWork({ ...newWork, thumbnail: e.target.value })}
                      className="w-full px-3 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Link
                    </label>
                    <input
                      type="url"
                      value={newWork.link}
                      onChange={(e) => setNewWork({ ...newWork, link: e.target.value })}
                      className="w-full px-3 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingWork(false);
                        setEditingWork(null);
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
                      Update Work
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

export default LatestWorksManagement;