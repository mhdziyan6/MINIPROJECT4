import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ChefHat, Camera, Users, X, Check, Trash2 } from 'lucide-react';

interface JobApplication {
  id: string;
  position: string;
  applicantName: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
}

interface JobListing {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  type: string;
}

const JobManagement = () => {
  const [activeTab, setActiveTab] = useState<'applications' | 'listings'>('applications');
  const [applications, setApplications] = useState<JobApplication[]>([
    {
      id: '1',
      position: 'Permanent Chef',
      applicantName: 'John Doe',
      email: 'john@example.com',
      status: 'pending',
      appliedDate: '2024-03-15',
    },
    {
      id: '2',
      position: 'Cameraman',
      applicantName: 'Jane Smith',
      email: 'jane@example.com',
      status: 'approved',
      appliedDate: '2024-03-14',
    },
  ]);

  const [jobListings, setJobListings] = useState<JobListing[]>([
    {
      id: '1',
      title: 'Permanent Chef',
      description: 'Join our culinary team and create extraordinary dining experiences.',
      requirements: [
        'Minimum 5 years of professional cooking experience',
        'Expertise in various cuisines',
        'Strong leadership skills',
      ],
      type: 'Full-time',
    },
    {
      id: '2',
      title: 'Event Photographer',
      description: 'Capture beautiful moments at our premium events.',
      requirements: [
        'Professional photography experience',
        'Portfolio of event photography',
        'Equipment knowledge',
      ],
      type: 'Contract',
    },
  ]);

  const [isAddingJob, setIsAddingJob] = useState(false);
  const [newJob, setNewJob] = useState<Partial<JobListing>>({
    title: '',
    description: '',
    requirements: [''],
    type: 'Full-time',
  });

  const handleStatusChange = (applicationId: string, newStatus: 'approved' | 'rejected') => {
    setApplications(applications.map(app => 
      app.id === applicationId ? { ...app, status: newStatus } : app
    ));
  };

  const addRequirement = () => {
    setNewJob(prev => ({
      ...prev,
      requirements: [...(prev.requirements || []), ''],
    }));
  };

  const updateRequirement = (index: number, value: string) => {
    setNewJob(prev => ({
      ...prev,
      requirements: prev.requirements?.map((req, i) => i === index ? value : req),
    }));
  };

  const removeRequirement = (index: number) => {
    setNewJob(prev => ({
      ...prev,
      requirements: prev.requirements?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmitNewJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (newJob.title && newJob.description && newJob.requirements?.length) {
      setJobListings([
        ...jobListings,
        {
          id: Date.now().toString(),
          title: newJob.title,
          description: newJob.description,
          requirements: newJob.requirements.filter(req => req.trim() !== ''),
          type: newJob.type || 'Full-time',
        },
      ]);
      setIsAddingJob(false);
      setNewJob({
        title: '',
        description: '',
        requirements: [''],
        type: 'Full-time',
      });
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
          <h2 className="text-3xl font-bold">Job Management</h2>
          <p className="text-neutral-400 mt-2">Manage job applications and listings</p>
        </div>

        <div className="flex gap-4 border-b border-neutral-800">
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'applications'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Applications
          </button>
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'listings'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Job Listings
          </button>
        </div>

        {activeTab === 'applications' ? (
          <div className="grid gap-4">
            {applications.map((application) => (
              <motion.div
                key={application.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-neutral-900 rounded-lg p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-neutral-800 flex items-center justify-center">
                      {application.position.includes('Chef') ? (
                        <ChefHat className="h-6 w-6 text-neutral-400" />
                      ) : application.position.includes('Camera') ? (
                        <Camera className="h-6 w-6 text-neutral-400" />
                      ) : (
                        <Users className="h-6 w-6 text-neutral-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{application.applicantName}</h3>
                      <p className="text-neutral-400">{application.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {application.status === 'pending' && (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleStatusChange(application.id, 'approved')}
                          className="p-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20 transition-colors"
                        >
                          <Check className="h-5 w-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleStatusChange(application.id, 'rejected')}
                          className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </motion.button>
                      </>
                    )}
                    {application.status === 'approved' && (
                      <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-lg text-sm">
                        Approved
                      </span>
                    )}
                    {application.status === 'rejected' && (
                      <span className="px-3 py-1 bg-red-500/10 text-red-500 rounded-lg text-sm">
                        Rejected
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-4 text-sm text-neutral-400">
                  <p>Email: {application.email}</p>
                  <p>Applied: {new Date(application.appliedDate).toLocaleDateString()}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsAddingJob(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <Plus className="h-5 w-5" />
                Add New Job
              </motion.button>
            </div>

            <div className="grid gap-4">
              {jobListings.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-neutral-900 rounded-lg p-6"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <p className="text-neutral-400 mt-1">{job.description}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </motion.button>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Requirements:</h4>
                    <ul className="list-disc list-inside text-neutral-400">
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-lg text-sm">
                      {job.type}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Add New Job Modal */}
      <AnimatePresence>
        {isAddingJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsAddingJob(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-neutral-900 rounded-xl p-6 max-w-2xl w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Add New Job Listing</h3>
                <button
                  onClick={() => setIsAddingJob(false)}
                  className="text-neutral-400 hover:text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmitNewJob} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    className="block w-full px-3 py-2 border border-neutral-700 rounded-lg bg-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Senior Event Coordinator"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newJob.description}
                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                    rows={3}
                    className="block w-full px-3 py-2 border border-neutral-700 rounded-lg bg-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Enter job description..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Requirements
                  </label>
                  <div className="space-y-2">
                    {newJob.requirements?.map((req, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={req}
                          onChange={(e) => updateRequirement(index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-neutral-700 rounded-lg bg-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Add a requirement..."
                        />
                        <button
                          type="button"
                          onClick={() => removeRequirement(index)}
                          className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addRequirement}
                      className="text-blue-500 hover:text-blue-400 text-sm flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      Add Requirement
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Job Type
                  </label>
                  <select
                    value={newJob.type}
                    onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                    className="block w-full px-3 py-2 border border-neutral-700 rounded-lg bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Temporary">Temporary</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddingJob(false)}
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
                    Create Job Listing
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JobManagement;