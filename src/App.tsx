import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import LatestSection from './components/LatestSection';
import ServicesSection from './components/ServicesSection.tsx';
import GalleryPage from './components/GalleryPage';
import TeamSection from './components/TeamSection';
import ContactSection from './components/ContactSection';
import CareersPage from './components/CareersPage';
import FAQPage from './components/FAQPage';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import Preloader from './components/Preloader';
import ParticlesBackground from './components/ParticlesBackground';
import InteractiveGallery from './components/InteractiveGallery';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('adminToken');
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" />;
};

// Page transition wrapper component
const PageTransitionWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Shorter duration for page transitions

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Preloader />}
      </AnimatePresence>
      {children}
    </>
  );
};

function App() {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AnimatePresence>
        {initialLoading && <Preloader />}
      </AnimatePresence>
      
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Public Routes with Page Transition */}
        <Route path="/gallery" element={
          <PageTransitionWrapper>
            <GalleryPage />
          </PageTransitionWrapper>
        } />
        <Route path="/careers" element={
          <PageTransitionWrapper>
            <CareersPage />
          </PageTransitionWrapper>
        } />
        <Route path="/faq" element={
          <PageTransitionWrapper>
            <FAQPage />
          </PageTransitionWrapper>
        } />
        <Route path="/interactive-gallery" element={
          <PageTransitionWrapper>
            <div className="bg-black text-white">
              <Navbar />
              <div className="pt-20">
                <InteractiveGallery />
              </div>
            </div>
          </PageTransitionWrapper>
        } />
        <Route
          path="/"
          element={
            <PageTransitionWrapper>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-black text-white relative"
              >
                <ParticlesBackground />
                <Navbar />
                <HeroSection />
                <AboutSection />
                <LatestSection />
                <ServicesSection />
                <TeamSection />
                <ContactSection />
              </motion.div>
            </PageTransitionWrapper>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;