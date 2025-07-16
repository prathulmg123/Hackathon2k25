import { Button } from "@/components/ui/button";
import { Calendar, Users, Trophy } from "lucide-react";

const RegisterSection = () => {
  return (
    <section id="register" className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 data-animate="pulse-glow" className="text-6xl font-bold text-glow bg-gradient-primary bg-clip-text text-transparent">
              Register Now
            </h2>
            <p data-animate="slide-up" className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join the most innovative hackathon of 2025. Build, create, and compete with the best developers worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 my-12">
            <div data-animate="fade-in" className="flex flex-col items-center space-y-4 p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-border hover-glow transition-all duration-300">
              <Calendar className="w-12 h-12 text-primary" />
              <h3 className="text-xl font-semibold">Duration</h3>
              <p className="text-muted-foreground text-center">48 hours of intense coding and innovation</p>
            </div>
            <div data-animate="fade-in" className="flex flex-col items-center space-y-4 p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-border hover-glow transition-all duration-300" style={{ animationDelay: '0.2s' }}>
              <Users className="w-12 h-12 text-primary" />
              <h3 className="text-xl font-semibold">Team Size</h3>
              <p className="text-muted-foreground text-center">1-4 members per team, all skill levels welcome</p>
            </div>
            <div data-animate="fade-in" className="flex flex-col items-center space-y-4 p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-border hover-glow transition-all duration-300" style={{ animationDelay: '0.4s' }}>
              <Trophy className="w-12 h-12 text-primary" />
              <h3 className="text-xl font-semibold">Prizes</h3>
              <p className="text-muted-foreground text-center">$50,000 in total prizes and opportunities</p>
            </div>
          </div>

          <div data-animate="scale-in" className="space-y-6">
            <Button size="lg" className="text-lg px-8 py-6 hover-glow">
              Register Your Team
            </Button>
            <p className="text-sm text-muted-foreground">
              Registration closes on March 15, 2025
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterSection;