import { Camera, Upload, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Farmer using AI-Crop Guardian app in agricultural field"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 mb-6">
            <Zap className="h-4 w-4 text-accent mr-2" />
            <span className="text-sm font-medium text-foreground">AI-Powered Crop Health Detection</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-crop-grow">
            Protect Your Crops with{" "}
            <span className="text-accent">Smart AI</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Take a photo of your plants and get instant disease diagnosis, treatment recommendations, 
            and expert farming guidance powered by artificial intelligence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-strong text-lg px-8 py-4">
              <Camera className="h-5 w-5 mr-2" />
              Scan Crop Now
            </Button>
            <Button size="lg" variant="outline" className="bg-background/10 backdrop-blur-sm border-background/30 text-primary-foreground hover:bg-background/20 text-lg px-8 py-4">
              <Upload className="h-5 w-5 mr-2" />
              Upload Photo
            </Button>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-background/10 backdrop-blur-sm rounded-xl p-6 border border-background/20">
              <div className="text-3xl mb-2">🌱</div>
              <h3 className="font-semibold text-primary-foreground mb-2">Instant Diagnosis</h3>
              <p className="text-primary-foreground/80 text-sm">Get disease identification in seconds with 95% accuracy</p>
            </div>
            <div className="bg-background/10 backdrop-blur-sm rounded-xl p-6 border border-background/20">
              <div className="text-3xl mb-2">💊</div>
              <h3 className="font-semibold text-primary-foreground mb-2">Treatment Plans</h3>
              <p className="text-primary-foreground/80 text-sm">Receive organic and chemical treatment recommendations</p>
            </div>
            <div className="bg-background/10 backdrop-blur-sm rounded-xl p-6 border border-background/20">
              <div className="text-3xl mb-2">🤖</div>
              <h3 className="font-semibold text-primary-foreground mb-2">Expert Chat</h3>
              <p className="text-primary-foreground/80 text-sm">24/7 AI farming assistant for all your questions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-pulse-glow" />
      <div className="absolute top-20 right-20 w-16 h-16 bg-primary/20 rounded-full blur-lg animate-pulse-glow delay-1000" />
    </section>
  );
};

export default HeroSection;