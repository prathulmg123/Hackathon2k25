import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import StarField from "@/components/StarField";
import RegisterSection from "@/components/sections/RegisterSection";
import RewardsSection from "@/components/sections/RewardsSection";
import EvaluationSection from "@/components/sections/EvaluationSection";
import ContactSection from "@/components/sections/ContactSection";
import AllInfoSection from "@/components/sections/AllInfoSection";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Index = () => {
  useHorizontalScroll();
  useScrollAnimation();
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      <StarField />
      <Navigation />
      <main className="horizontal-scroll-container">
        <HeroSection />
        <RegisterSection />
        <RewardsSection />
        <EvaluationSection />
        <ContactSection />
        <AllInfoSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
