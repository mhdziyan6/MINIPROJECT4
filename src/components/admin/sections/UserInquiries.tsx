import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle } from 'lucide-react';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_solved?: boolean; // ✅ Added to track solved status
}

const API_BASE_URL = "http://127.0.0.1:8000/inquiries"; // ✅ Backend API URL

const UserInquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();

      // ✅ Only show inquiries that are NOT solved
      setInquiries(data.filter((inq: Inquiry) => !inq.is_solved));
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsSolved = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}/solve`, { method: "PATCH" });

      if (response.ok) {
        // ✅ Remove the solved inquiry from the UI
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));

        // ✅ Reset selected inquiry if it was solved
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
      } else {
        console.error("Failed to mark as solved:", await response.text());
      }
    } catch (error) {
      console.error("Error marking inquiry as solved:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        <h2 className="text-3xl font-bold">User Inquiries</h2>

        {loading ? (
          <p className="text-center text-neutral-400">Loading inquiries...</p>
        ) : (
          <div className="grid md:grid-cols-[350px,1fr] gap-6">
            {/* ✅ Left Sidebar - List of Inquiries */}
            <div className="bg-neutral-900 rounded-xl p-4 h-[calc(100vh-240px)] overflow-y-auto">
              {inquiries.map(inquiry => (
                <motion.div key={inquiry.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${selectedInquiry?.id === inquiry.id ? 'bg-blue-500/10 border border-blue-500/50' : 'hover:bg-neutral-800 border border-transparent'}`}
                  onClick={() => setSelectedInquiry(inquiry)}>
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-neutral-800 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-neutral-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">{inquiry.name}</h3>
                      <p className="text-sm text-neutral-400">{inquiry.subject}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ✅ Right Section - Inquiry Details */}
            {selectedInquiry ? (
              <div className="bg-neutral-900 rounded-xl p-6">
                <h3 className="text-2xl font-semibold">{selectedInquiry.subject}</h3>
                <p className="text-neutral-400">From: {selectedInquiry.name} ({selectedInquiry.email})</p>
                <div className="bg-neutral-800 rounded-lg p-4 mt-4">
                  <p className="text-neutral-300 whitespace-pre-wrap">{selectedInquiry.message}</p>
                </div>

                {/* ✅ "Mark as Solved" Button - Now Always Visible */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => markAsSolved(selectedInquiry.id)}
                    className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <CheckCircle className="h-5 w-5" />
                    Mark as Solved
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-neutral-900 rounded-xl p-6 flex items-center justify-center text-neutral-400">
                <p>Select an inquiry to view details</p>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default UserInquiries;
