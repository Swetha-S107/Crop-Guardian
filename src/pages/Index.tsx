import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DiseaseDetector from "@/components/DiseaseDetector";
import WeatherWidget from "@/components/WeatherWidget";
import SoilMoistureTest from "@/components/SoilMoistureTest";
import ChatBot from "@/components/ChatBot";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        
        <DiseaseDetector />
        
        {/* Secondary Features Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Complete Farming Dashboard
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Monitor weather conditions, test soil moisture, and get expert advice all in one place
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <WeatherWidget />
              <SoilMoistureTest />
              <ChatBot />
            </div>
          </div>
        </section>
        
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
