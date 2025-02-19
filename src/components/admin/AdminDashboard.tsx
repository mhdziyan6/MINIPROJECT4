import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  Settings,
  Users,
  Mail,
  Calendar,
  Image,
  LogOut,
  Menu,
  X,
  Briefcase,
  Home,
} from "lucide-react";
import AdminSettings from "./sections/AdminSettings";
import JobManagement from "./sections/JobManagement";
import UserInquiries from "./sections/UserInquiries"; // Import User Inquiries
import EventManagement from "./sections/EventManagement";
import GalleryManagement from "./sections/GalleryManagement";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { icon: Settings, label: "Settings", path: "settings" },
    { icon: Users, label: "Job Management", path: "jobs" },
    { icon: Mail, label: "User Inquiries", path: "inquiries" }, // Added User Inquiries
    { icon: Calendar, label: "Event Management", path: "events" },
    { icon: Image, label: "Gallery Management", path: "gallery" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar Toggle Button (Mobile) */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-neutral-900 rounded-lg"
      >
        {isSidebarOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Menu className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed lg:static inset-y-0 left-0 w-64 bg-neutral-900 p-4 flex flex-col z-40"
          >
            <div className="flex items-center gap-2 px-2 py-4">
              <Briefcase className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold">Admin Panel</span>
            </div>

            <nav className="flex-1 mt-8">
              <div className="space-y-1">
                <a
                  href="/"
                  className="flex items-center gap-2 px-4 py-3 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <Home className="h-5 w-5" />
                  View Site
                </a>
                {menuItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                      location.pathname.includes(item.path)
                        ? "bg-blue-600 text-white"
                        : "text-neutral-300 hover:text-white hover:bg-neutral-800"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </button>
                ))}
              </div>
            </nav>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-neutral-800 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 p-8 lg:pl-8 pl-20">
        <Routes>
          <Route path="settings" element={<AdminSettings />} />
          <Route path="jobs" element={<JobManagement />} />
          <Route path="inquiries" element={<UserInquiries />} /> {/* Added Route */}
          <Route path="events" element={<EventManagement />} />
          <Route path="gallery" element={<GalleryManagement />} />
          <Route path="*" element={<AdminSettings />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
