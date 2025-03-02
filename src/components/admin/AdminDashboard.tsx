import React, { useState } from "react";
import { motion } from "framer-motion";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  Settings,
  Users,
  Mail,
  Calendar,
  Image,
  LogOut,
  Briefcase,
  Home,
  MessageSquare,
} from "lucide-react";
import AdminSettings from "./sections/AdminSettings";
import JobManagement from "./sections/JobManagement";
import UserInquiries from "./sections/UserInquiries";
import EventManagement from "./sections/EventManagement";
import GalleryManagement from "./sections/GalleryManagement";
import LatestWorksManagement from "./sections/LatestWorksManagement";
import FAQManagement from "./sections/FAQManagement";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(true);

  const menuItems = [
    { 
      icon: <Settings className="h-5 w-5 flex-shrink-0" />, 
      label: "Settings", 
      href: "settings" 
    },
    { 
      icon: <Users className="h-5 w-5 flex-shrink-0" />, 
      label: "Job Management", 
      href: "jobs" 
    },
    { 
      icon: <Mail className="h-5 w-5 flex-shrink-0" />, 
      label: "User Inquiries", 
      href: "inquiries" 
    },
    { 
      icon: <Calendar className="h-5 w-5 flex-shrink-0" />, 
      label: "Event Management", 
      href: "events" 
    },
    { 
      icon: <Image className="h-5 w-5 flex-shrink-0" />, 
      label: "Gallery Management", 
      href: "gallery" 
    },
    { 
      icon: <Image className="h-5 w-5 flex-shrink-0" />, 
      label: "Latest Works", 
      href: "latest-works" 
    },
    { 
      icon: <MessageSquare className="h-5 w-5 flex-shrink-0" />, 
      label: "FAQ Management", 
      href: "faq" 
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const getCurrentPageTitle = () => {
    const path = location.pathname.split('/').pop() || '';
    const menuItem = menuItems.find(item => item.href === path);
    return menuItem ? menuItem.label : 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="flex flex-col h-full justify-between">
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-3 px-3 py-4 mb-6">
              <Briefcase className="h-8 w-8 text-blue-500 flex-shrink-0" />
              <motion.span
                animate={{
                  display: open ? "inline-block" : "none",
                  opacity: open ? 1 : 0,
                }}
                className="text-xl font-bold whitespace-pre"
              >
                Admin Panel
              </motion.span>
            </div>

            <div className="space-y-1 px-1">
              <SidebarLink
                link={{
                  label: "View Site",
                  href: "/",
                  icon: <Home className="h-5 w-5 flex-shrink-0" />
                }}
              />
              
              {menuItems.map((item) => (
                <SidebarLink
                  key={item.href}
                  link={item}
                  active={location.pathname.includes(item.href)}
                  onClick={() => navigate(item.href)}
                />
              ))}
            </div>
          </div>
          
          <div className="mt-6 px-1">
            <SidebarLink
              link={{
                label: "Logout",
                href: "#",
                icon: <LogOut className="h-5 w-5 flex-shrink-0 text-red-400" />
              }}
              className="text-red-400 hover:text-red-300 hover:bg-neutral-800"
              onClick={handleLogout}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <div className="lg:hidden"></div>
        <div className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="hidden lg:block mb-8">
            <h1 className="text-3xl font-bold">{getCurrentPageTitle()}</h1>
          </div>
          <Routes>
            <Route path="settings" element={<AdminSettings />} />
            <Route path="jobs" element={<JobManagement />} />
            <Route path="inquiries" element={<UserInquiries />} />
            <Route path="events" element={<EventManagement />} />
            <Route path="gallery" element={<GalleryManagement />} />
            <Route path="latest-works" element={<LatestWorksManagement />} />
            <Route path="faq" element={<FAQManagement />} />
            <Route path="*" element={<AdminSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;