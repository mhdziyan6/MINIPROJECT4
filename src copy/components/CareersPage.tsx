import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Camera, Users, X } from 'lucide-react';
import Navbar from './Navbar';
import { BackgroundBeams } from './ui/background-beams';

interface JobApplication {
  jobId: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  resume?: File;
  address?: string;
}

const CareersPage = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [formData, setFormData] = useState<JobApplication>({
    jobId: '',
    name: '',
    email: '',
    phone: '',
    experience: '',
  });

  const jobs = [
    {
      id: 'chef',
      title: 'Permanent Chef',
      icon: ChefHat,
      description: 'Join our culinary team and create extraordinary dining experiences.',
      requirements: [
        'Minimum 5 years of professional cooking experience',
        'Expertise in various cuisines',
        'Strong leadership and team management skills',
        'Food safety certification'
      ]
    },
    {
      id: 'cameraman',
      title: 'Permanent Cameraman',
      icon: Camera,
      description: 'Capture beautiful moments and create lasting memories through your lens.',
      requirements: [
        'Professional photography/videography experience',
        'Proficiency with modern camera equipment',
        'Portfolio of event photography',
        'Excellent communication skills'
      ]
    },
    {
      id: 'catering',
      title: 'Catering Boys (On-Demand)',
      icon: Users,
      description: 'Be part of our dynamic team delivering exceptional service at events.',
      requirements: [
        'Previous experience in catering or hospitality',
        'Flexible schedule availability',
        'Strong customer service skills',
        'Team player mentality'
      ]
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSelectedJob(null);
    setFormData({
      jobId: '',
      name: '',
      email: '',
      phone: '',
      experience: '',
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

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
              Join Our Team
            </h1>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Be part of something extraordinary. We're looking for talented individuals to join our growing team.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pb-20">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-colors">
                  <job.icon className="w-10 h-10 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                  <p className="text-neutral-400 mb-4">{job.description}</p>
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-neutral-300 mb-2">Requirements:</h4>
                    <ul className="space-y-2">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="text-sm text-neutral-400 flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedJob(job.id);
                      setFormData({ ...formData, jobId: job.id });
                    }}
                    className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    Apply Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedJob(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-neutral-900 rounded-xl p-6 max-w-md w-full relative"
            >
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute right-4 top-4 text-neutral-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              
              <h2 className="text-2xl font-bold mb-4">
                Apply for {jobs.find(j => j.id === selectedJob)?.title}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">
                    AGE
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {selectedJob === 'catering' ? (
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Address
                    </label>
                    <textarea
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none h-24"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                      Resume
                    </label>
                    <input
                      type="file"
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                    />
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Submit Application
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CareersPage;