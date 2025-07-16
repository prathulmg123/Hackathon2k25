import { Code, Lightbulb, Users, Zap } from "lucide-react";

const EvaluationSection = () => {
  const criteria = [
    {
      title: "Innovation",
      description: "Originality and creativity of the solution",
      weight: "25%",
      icon: Lightbulb,
      details: ["Unique approach", "Creative problem-solving", "Novel technology use"]
    },
    {
      title: "Technical Excellence",
      description: "Code quality, architecture, and implementation",
      weight: "25%",
      icon: Code,
      details: ["Clean code", "Scalable architecture", "Best practices"]
    },
    {
      title: "Impact & Feasibility", 
      description: "Real-world application and market potential",
      weight: "25%",
      icon: Zap,
      details: ["Market viability", "Social impact", "Practical implementation"]
    },
    {
      title: "Presentation",
      description: "Team presentation and demo quality",
      weight: "25%",
      icon: Users,
      details: ["Clear communication", "Compelling demo", "Team collaboration"]
    }
  ];

  return (
    <section id="evaluation" className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-8">
      <div className="max-w-6xl mx-auto text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 data-animate="pulse-glow" className="text-6xl font-bold text-glow bg-gradient-primary bg-clip-text text-transparent">
              Evaluation Criteria
            </h2>
            <p data-animate="slide-up" className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your projects will be evaluated by industry experts across four key dimensions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
            {criteria.map((criterion, index) => {
              const IconComponent = criterion.icon;
              return (
                <div key={index} className="group">
                  <div data-animate="scale-in" className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 hover-glow h-full" style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-1">{criterion.title}</h3>
                        <div className="text-sm text-primary font-semibold mb-2">{criterion.weight}</div>
                        <p className="text-muted-foreground text-sm mb-4">{criterion.description}</p>
                      </div>
                      <div className="space-y-2">
                        {criterion.details.map((detail, idx) => (
                          <div key={idx} className="text-xs text-muted-foreground bg-muted/30 px-3 py-1 rounded-full">
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-card/30 backdrop-blur-sm rounded-xl p-8 border border-border">
            <h3 className="text-2xl font-bold mb-4">Judging Process</h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <h4 className="font-semibold mb-2">Initial Review</h4>
                <p className="text-muted-foreground text-sm">All submissions undergo preliminary technical review</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Demo Presentations</h4>
                <p className="text-muted-foreground text-sm">Top teams present to industry expert panel</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Final Evaluation</h4>
                <p className="text-muted-foreground text-sm">Comprehensive scoring across all criteria</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EvaluationSection;