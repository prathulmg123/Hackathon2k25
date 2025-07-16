import { Button } from "@/components/ui/button";
import { Calendar, Users, Trophy, Rocket } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen w-screen flex items-center justify-center relative px-6 py-12 bg-gradient-cosmic">
      <div className="container mx-auto text-center z-10 animate-fade-in">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main heading with enhanced glow */}
          <div className="space-y-4">
            <h1 data-animate="pulse-glow" className="text-7xl md:text-9xl font-black text-transparent bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text">
              HACKATHON
            </h1>
            <div data-animate="scale-in" className="text-6xl md:text-8xl font-black text-glow">
              2025
            </div>
          </div>

          {/* Subtitle with slide-up animation */}
          <p data-animate="slide-up" className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join the most innovative coding competition of the year. Build the future with cutting-edge technology.
          </p>

          {/* Event details with staggered animations */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-12">
            <div data-animate="fade-in" className="flex flex-col items-center space-y-2" style={{ animationDelay: '0.2s' }}>
              <Calendar className="w-8 h-8 text-primary" />
              <span className="text-sm text-muted-foreground">March 15-17</span>
              <span className="text-xs text-muted-foreground">2025</span>
            </div>
            <div data-animate="fade-in" className="flex flex-col items-center space-y-2" style={{ animationDelay: '0.4s' }}>
              <Users className="w-8 h-8 text-primary" />
              <span className="text-sm text-muted-foreground">500+ Teams</span>
              <span className="text-xs text-muted-foreground">Global</span>
            </div>
            <div data-animate="fade-in" className="flex flex-col items-center space-y-2" style={{ animationDelay: '0.6s' }}>
              <Trophy className="w-8 h-8 text-primary" />
              <span className="text-sm text-muted-foreground">$50K Prize</span>
              <span className="text-xs text-muted-foreground">Pool</span>
            </div>
            <div data-animate="fade-in" className="flex flex-col items-center space-y-2" style={{ animationDelay: '0.8s' }}>
              <Rocket className="w-8 h-8 text-primary" />
              <span className="text-sm text-muted-foreground">48 Hours</span>
              <span className="text-xs text-muted-foreground">Coding</span>
            </div>
          </div>

          {/* Call to action buttons */}
          <div data-animate="scale-in" className="flex flex-col sm:flex-row gap-4 justify-center mt-12" style={{ animationDelay: '1s' }}>
            <Button size="lg" className="text-lg px-8 py-4 hover-glow">
              Register Now
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;