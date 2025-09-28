import { Leaf, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary">
            <Leaf className="h-6 w-6 text-primary-foreground animate-leaf-sway" />
          </div>
          <div>
            <h1 className="font-bold text-lg">AI-Crop Guardian</h1>
            <p className="text-xs text-muted-foreground">Smart Disease Detection</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Button variant="ghost" className="text-foreground hover:text-primary">
            Home
          </Button>
          <Button variant="ghost" className="text-foreground hover:text-primary">
            Weather
          </Button>
          <Button variant="ghost" className="text-foreground hover:text-primary">
            Soil Test
          </Button>
          <Button variant="ghost" className="text-foreground hover:text-primary">
            Chatbot
          </Button>
        </nav>

        {/* User Menu */}
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="hidden sm:flex">
            Go Premium
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>History</DropdownMenuItem>
              <DropdownMenuItem>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Home</DropdownMenuItem>
              <DropdownMenuItem>Weather</DropdownMenuItem>
              <DropdownMenuItem>Soil Test</DropdownMenuItem>
              <DropdownMenuItem>Chatbot</DropdownMenuItem>
              <DropdownMenuItem>Go Premium</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;