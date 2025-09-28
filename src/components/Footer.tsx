import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Leaf className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">AI-Crop Guardian</h3>
                <p className="text-sm opacity-90">Smart Disease Detection</p>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              Empowering farmers with AI technology to protect crops, 
              optimize yields, and build sustainable agricultural practices.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Disease Detection</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Weather Integration</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Soil Moisture Test</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">AI Chatbot</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Treatment Plans</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Premium Features</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Help Center</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">User Guide</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Video Tutorials</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Community Forum</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Contact Support</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Report Issue</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm opacity-90">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@aicropguardian.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-CROP</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Agricultural Tech Hub<br />Innovation District</span>
              </div>
            </div>
            
            <div className="mt-4">
              <h5 className="font-medium mb-2">Emergency Plant Disease Hotline</h5>
              <p className="text-accent font-semibold">+1 (555) 911-CROP</p>
              <p className="text-xs opacity-75">Available 24/7 for critical crop issues</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-90">
            © 2024 AI-Crop Guardian. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm opacity-90 hover:opacity-100 transition-opacity">Privacy Policy</a>
            <a href="#" className="text-sm opacity-90 hover:opacity-100 transition-opacity">Terms of Service</a>
            <a href="#" className="text-sm opacity-90 hover:opacity-100 transition-opacity">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;