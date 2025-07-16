import { Crown, Medal, Gift, Star } from "lucide-react";

const RewardsSection = () => {
  const rewards = [
    {
      place: "1st Place",
      prize: "$25,000",
      icon: Crown,
      description: "Grand prize winner + mentorship program",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      place: "2nd Place", 
      prize: "$15,000",
      icon: Medal,
      description: "Second place + tech startup consultation",
      gradient: "from-gray-300 to-gray-500"
    },
    {
      place: "3rd Place",
      prize: "$10,000", 
      icon: Gift,
      description: "Third place + developer resources package",
      gradient: "from-amber-600 to-amber-800"
    }
  ];

  const specialPrizes = [
    "Best Innovation Award - $5,000",
    "Best Design Award - $3,000", 
    "Best Social Impact - $3,000",
    "People's Choice Award - $2,000"
  ];

  return (
    <section id="rewards" className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-8">
      <div className="max-w-6xl mx-auto text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 data-animate="pulse-glow" className="text-6xl font-bold text-glow bg-gradient-primary bg-clip-text text-transparent">
              Rewards & Prizes
            </h2>
            <p data-animate="slide-up" className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Compete for amazing prizes and recognition in the developer community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 my-12">
            {rewards.map((reward, index) => {
              const IconComponent = reward.icon;
              return (
                <div key={index} className="relative group">
                  <div data-animate="fade-in" className="p-8 bg-card/50 backdrop-blur-sm rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 hover-glow" style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${reward.gradient} flex items-center justify-center`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{reward.place}</h3>
                    <div className="text-4xl font-bold text-primary mb-4">{reward.prize}</div>
                    <p className="text-muted-foreground">{reward.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-card/30 backdrop-blur-sm rounded-xl p-8 border border-border">
            <h3 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
              <Star className="w-6 h-6 text-primary" />
              Special Category Awards
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {specialPrizes.map((prize, index) => (
                <div key={index} className="text-lg text-muted-foreground">
                  {prize}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RewardsSection;