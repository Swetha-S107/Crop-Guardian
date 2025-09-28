import { 
  Camera, 
  Brain, 
  Cloud, 
  MessageSquare, 
  Droplets, 
  Shield,
  Clock,
  TrendingUp,
  Smartphone
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Camera className="h-8 w-8 text-primary" />,
      title: "Instant Disease Detection",
      description: "Take a photo of your crops and get AI-powered disease identification in seconds with 95% accuracy.",
      color: "bg-primary/10"
    },
    {
      icon: <Brain className="h-8 w-8 text-accent" />,
      title: "Smart Treatment Plans",
      description: "Receive personalized treatment recommendations including organic and chemical options with safety guidelines.",
      color: "bg-accent/10"
    },
    {
      icon: <Cloud className="h-8 w-8 text-blue-500" />,
      title: "Weather Integration",
      description: "Get real-time weather data and crop-specific advisories to optimize your farming decisions.",
      color: "bg-blue-500/10"
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-green-500" />,
      title: "24/7 AI Assistant",
      description: "Chat with our farming expert AI for instant answers to all your agriculture questions and concerns.",
      color: "bg-green-500/10"
    },
    {
      icon: <Droplets className="h-8 w-8 text-blue-600" />,
      title: "Soil Moisture Monitoring",
      description: "Track soil moisture levels and get irrigation recommendations to prevent over or under-watering.",
      color: "bg-blue-600/10"
    },
    {
      icon: <Shield className="h-8 w-8 text-red-500" />,
      title: "Preventive Care Tips",
      description: "Learn preventive measures and best practices to keep your crops healthy and disease-free.",
      color: "bg-red-500/10"
    },
    {
      icon: <Clock className="h-8 w-8 text-purple-500" />,
      title: "Historical Tracking",
      description: "Track your crop health over time and identify patterns to improve your farming strategies.",
      color: "bg-purple-500/10"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-orange-500" />,
      title: "Yield Optimization",
      description: "Get data-driven insights to maximize crop yields and improve overall farm productivity.",
      color: "bg-orange-500/10"
    },
    {
      icon: <Smartphone className="h-8 w-8 text-indigo-500" />,
      title: "Mobile-First Design",
      description: "Access all features on your smartphone, tablet, or computer - perfect for on-field usage.",
      color: "bg-indigo-500/10"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need for
            <span className="text-primary"> Smart Farming</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Our comprehensive AI platform provides all the tools modern farmers need to 
            protect their crops, optimize yields, and make data-driven decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-soft hover:shadow-strong transition-all duration-300 group animate-crop-grow" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-6">
                <div className={`w-16 h-16 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-primary">95%</div>
            <p className="text-muted-foreground">Disease Detection Accuracy</p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-accent">50+</div>
            <p className="text-muted-foreground">Crop Types Supported</p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-success">24/7</div>
            <p className="text-muted-foreground">AI Assistant Available</p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-warning">1000+</div>
            <p className="text-muted-foreground">Farmers Helped</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;