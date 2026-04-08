import { useState, useCallback, useEffect } from "react";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import OverviewSection from "@/components/OverviewSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { storage } from "@/lib/storage";
import type { HomepageSection } from "@/types";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [sections, setSections] = useState<HomepageSection>(storage.getHomepage());
  const handleSplashFinish = useCallback(() => setShowSplash(false), []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSections(storage.getHomepage());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {sections.hero && <HeroSection />}
      {sections.overview && <OverviewSection />}
      {sections.services && <ServicesSection />}
      {sections.projects && <ProjectsSection />}
      {sections.reviews && <ReviewsSection />}
      {sections.contact && <ContactSection />}
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
};

export default Index;
