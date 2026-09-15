import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Statistics } from './components/Statistics';
import { Benefits } from './components/Benefits';
import { FeaturedCourses } from './components/FeaturedCourses';
import { About } from './components/About';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CourseModal } from './components/CourseModal';
import { AboutModal } from './components/AboutModal';
import { Toast, ToastData } from './components/Toast';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Course } from './types';

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const scrollToCourses = () => {
    const el = document.getElementById('courses');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8FC] text-slate-800 selection:bg-[#10BFAE]/20 selection:text-[#062B68] overflow-x-hidden">
      {/* Navigation Bar */}
      <Navbar onExploreCourses={scrollToCourses} />

      {/* Main Page Content */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero
          onStartLearning={scrollToCourses}
          onExploreCourses={scrollToCourses}
        />

        {/* 2. Platform Statistics Bar */}
        <Statistics />

        {/* 3. Horizontal Benefits Bar */}
        <Benefits />

        {/* 4. Featured Courses Preview */}
        <FeaturedCourses
          onViewCourse={(course) => setSelectedCourse(course)}
          onContactAdmissions={scrollToContact}
        />

        {/* 5. About StartSmart Tech Hub */}
        <About onLearnMore={() => setAboutModalOpen(true)} />

        {/* 6. Why Choose StartSmart Tech Hub */}
        <WhyChooseUs />

        {/* 7. Contact Section & Direct Message Form (Formspree Connected) */}
        <Contact onShowToast={addToast} />
      </main>

      {/* 8. Professional Dark Footer */}
      <Footer />

      {/* Interactive Modals */}
      <CourseModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onShowToast={addToast}
      />

      <AboutModal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
        onOpenContact={scrollToContact}
      />

      {/* Dynamic Toast Notifications */}
      <Toast toasts={toasts} onDismiss={removeToast} />

      {/* Direct Floating WhatsApp Contact Widget */}
      <FloatingWhatsApp />
    </div>
  );
}
