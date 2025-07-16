import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, Users, Trophy, Code, Clock, MapPin } from "lucide-react";

const AllInfoSection = () => {
  const infoCards = [
    {
      icon: Calendar,
      title: "Timeline",
      items: [
        "Registration Opens: February 1, 2025",
        "Registration Closes: March 15, 2025", 
        "Event Dates: March 22-24, 2025",
        "Results Announced: March 31, 2025"
      ]
    },
    {
      icon: Users,
      title: "Participation",
      items: [
        "Teams of 1-4 members",
        "All skill levels welcome",
        "Students & professionals",
        "Remote participation available"
      ]
    },
    {
      icon: Code,
      title: "Technologies",
      items: [
        "Any programming language",
        "Open source frameworks encouraged",
        "Cloud platforms provided",
        "API access to partner services"
      ]
    },
    {
      icon: Trophy,
      title: "Categories",
      items: [
        "Web/Mobile Applications",
        "AI/Machine Learning",
        "Blockchain & Web3",
        "Social Impact Solutions"
      ]
    }
  ];

  const resources = [
    { name: "Hackathon Rules & Guidelines", size: "2.1 MB", type: "PDF" },
    { name: "API Documentation Package", size: "15.3 MB", type: "ZIP" },
    { name: "Design Assets & Brand Kit", size: "8.7 MB", type: "ZIP" },
    { name: "Starter Code Templates", size: "4.2 MB", type: "ZIP" }
  ];

  return (
    <section id="all-info" className="bg-gradient-cosmic flex-shrink-0 w-screen h-screen flex items-center justify-center px-8 pt-24 md:pt-32">
      <div className="max-w-6xl mx-auto text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 data-animate="pulse-glow" className="text-6xl font-bold text-glow bg-gradient-primary bg-clip-text text-transparent">
              All the Info
            </h2>
            <p data-animate="slide-up" className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about Hackathon 2025 in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
            {infoCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <div key={index} data-animate="fade-in" className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover-glow" style={{ animationDelay: `${index * 0.15}s` }}>
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold">{card.title}</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {card.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Downloads */}
            <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-border">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Download className="w-5 h-5 text-primary" />
                Downloads & Resources
              </h3>
              <div className="space-y-3">
                {resources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <div className="text-left">
                        <p className="text-sm font-medium">{resource.name}</p>
                        <p className="text-xs text-muted-foreground">{resource.type} • {resource.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Download</Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Facts */}
            <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-border">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Quick Facts
              </h3>
              <div className="space-y-4 text-left">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">48 Hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Prizes:</span>
                  <span className="font-medium">$50,000+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expected Teams:</span>
                  <span className="font-medium">125+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mentors:</span>
                  <span className="font-medium">20+ Industry Experts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Workshops:</span>
                  <span className="font-medium">8 Technical Sessions</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Food Provided:</span>
                  <span className="font-medium">All Meals & Snacks</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg">Download Complete Info Pack</Button>
            <Button variant="outline" size="lg">Subscribe for Updates</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllInfoSection;