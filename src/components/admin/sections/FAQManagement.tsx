import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Edit2, Trash2, MessageSquare } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQManagement = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: '1',
      question: "What types of events do you manage?",
      answer: "We specialize in a wide range of events including corporate gatherings, weddings, conferences, product launches, fashion shows, and private celebrations. Our team has extensive experience in handling both intimate gatherings and large-scale events with thousands of attendees.",
      category: "Services"
    },
    {
      id: '2',
      question: "How far in advance should I book your services?",
      answer: "For large events like weddings and corporate conferences, we recommend booking at least 6-8 months in advance. For smaller events, 3-4 months notice is typically sufficient. However, we also accommodate last-minute requests based on availability.",
      category: "Booking"
    },
  ]);

  const [isAddingFAQ, setIsAddingFAQ] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [newFAQ, setNewFAQ] = useState<Partial<FAQ>>({
    question: '',
    answer: '',
    category: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFAQ) {
      setFaqs(faqs.map(faq =>
        faq.id === editingFAQ.id ? { ...faq, ...newFAQ } : faq
      ));
      setEditingFAQ(null);
    } else {
      setFaqs([
        ...faqs,
        {
          ...newFAQ as FAQ,
          id: Date.now().toString(),
        },
      ]);
    }
    setIsAddingFAQ(false);
    setNewFAQ({
      question: '',
      answer: '',
      category: '',
    });
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFAQ(faq);
    setNewFAQ(faq);
    setIsAddingFAQ(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      setFaqs(faqs.filter(faq => faq.id !== id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">FAQ Management</h2>
            <p className="text-neutral-400 mt-2">Manage frequently asked questions and their answers</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAddingFAQ(true)}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add FAQ
          </motion.button>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-neutral-900 rounded-xl p-6"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-neutral-800 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-5 w-5 text-neutral-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                    <p className="text-neutral-400">{faq.answer}</p>
                    <span className="inline-block mt-3 px-3 py-1 bg-neutral-800 text-neutral-300 rounded-full text-sm">
                      {faq.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEdit(faq)}
                    className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(faq.id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {isAddingFAQ && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setIsAddingFAQ(false);
                  setEditingFAQ(null);
                }
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-neutral-900 rounded-xl p-6 max-w-2xl w-full"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">
                    {editingFAQ ? 'Edit FAQ' : 'Add New FAQ'}
                  </h3>
                  <button
                    onClick={() => {
                      setIsAddingFAQ(false);
                      setEditingFAQ(null);
                    }}
                    className="text-neutral-400 hover:text-white"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Question
                    </label>
                    <input
                      type="text"
                      value={newFAQ.question}
                      onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
                      className="w-full px-3 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Answer
                    </label>
                    <textarea
                      value={newFAQ.answer}
                      onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white resize-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Category
                    </label>
                    <input
                      type="text"
                      value={newFAQ.category}
                      onChange={(e) => setNewFAQ({ ...newFAQ, category: e.target.value })}
                      className="w-full px-3 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingFAQ(false);
                        setEditingFAQ(null);
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
                      {editingFAQ ? 'Update FAQ' : 'Add FAQ'}
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

export default FAQManagement;