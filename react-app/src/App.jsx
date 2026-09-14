import React from 'react';
import { AppProvider } from './context/AppContext';
import CustomCursor from './components/CustomCursor';
import Aurora from './components/Aurora';
import Background3D from './components/Background3D';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Features from './components/Features';
import Comparison from './components/Comparison';
import Ages from './components/Ages';
import SampleDownload from './components/SampleDownload';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import OrderSection from './components/OrderSection';
import Footer from './components/Footer';
import LightboxModal from './components/LightboxModal';
import Chatbot from './components/Chatbot';
import Toast from './components/Toast';

export function AppContent() {
  return (
    <div className="relative min-h-screen flex flex-col transition-colors duration-300">
      {/* Interactive Custom Cursor with Book Emoji */}
      <CustomCursor />

      {/* Aurora Background Orbs */}
      <Aurora />

      {/* 3D Dynamic Cascade ('طوفان الكتب') Three.js */}
      <Background3D />

      {/* Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1 relative z-10">
        <Hero />
        <Problem />
        <Features />
        <Comparison />
        <Ages />
        <SampleDownload />
        <Testimonials />
        <FAQ />
        <OrderSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Overlays & Modals */}
      <LightboxModal />
      <Chatbot />
      <Toast />
    </div>
  );
}

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
