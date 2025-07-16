import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { label: "Home", href: "#home" },
    { label: "Register", href: "#register" },
    { label: "Rewards", href: "#rewards" },
    { label: "Evaluation Criteria", href: "#evaluation" },
    { label: "Contact", href: "#contact" },
    { label: "All the Info", href: "#all-info" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">H</span>
            </div>
            <span className="text-xl font-bold text-glow">Hackathon 2025</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:text-glow cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  const sectionId = item.href.replace('#', '');
                  const element = document.getElementById(sectionId);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', inline: 'start' });
                  }
                }}
              >
                {item.label}
              </a>
            ))}
            
            {/* Language Switcher */}
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Globe className="w-4 h-4" />
              <span className="text-sm">EN</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    const sectionId = item.href.replace('#', '');
                    const element = document.getElementById(sectionId);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', inline: 'start' });
                    }
                  }}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex items-center space-x-2 text-muted-foreground pt-2">
                <Globe className="w-4 h-4" />
                <span className="text-sm">EN</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;