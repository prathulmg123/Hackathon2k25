import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Phone, MapPin, Clock, Users } from "lucide-react";

const ContactSection = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      detail: "hackathon2025@company.com",
      description: "For general inquiries and registration help"
    },
    {
      icon: MessageSquare,
      title: "Discord Community",
      detail: "Join our server",
      description: "Real-time chat with organizers and participants"
    },
    {
      icon: Phone,
      title: "Phone Support",
      detail: "+1 (555) 123-4567",
      description: "Available Mon-Fri, 9AM-6PM EST"
    }
  ];

  const eventDetails = [
    {
      icon: MapPin,
      title: "Location",
      detail: "Tech Innovation Center, San Francisco, CA",
      description: "Hybrid event: In-person and virtual participation"
    },
    {
      icon: Clock,
      title: "Event Dates",
      detail: "March 22-24, 2025",
      description: "48 hours of non-stop innovation"
    },
    {
      icon: Users,
      title: "Expected Participants",
      detail: "500+ Developers",
      description: "From startups to Fortune 500 companies"
    }
  ];

  return (
    <section id="contact" className="bg-gradient-cosmic flex-shrink-0 w-screen h-screen flex items-center justify-center px-8">
      <div className="max-w-6xl mx-auto text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 data-animate="pulse-glow" className="text-6xl font-bold text-glow bg-gradient-primary bg-clip-text text-transparent">
              Contact & Support
            </h2>
            <p data-animate="slide-up" className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get in touch with our team for any questions about the hackathon.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 my-12">
            {/* Contact Methods */}
            <div data-animate="fade-in" className="space-y-6">
              <h3 className="text-2xl font-bold text-left">Get Help</h3>
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold">{method.title}</h4>
                      <p className="text-primary font-medium">{method.detail}</p>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Event Details */}
            <div data-animate="fade-in" className="space-y-6" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-2xl font-bold text-left">Event Info</h3>
              {eventDetails.map((detail, index) => {
                const IconComponent = detail.icon;
                return (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold">{detail.title}</h4>
                      <p className="text-primary font-medium">{detail.detail}</p>
                      <p className="text-sm text-muted-foreground">{detail.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-card/30 backdrop-blur-sm rounded-xl p-8 border border-border">
            <h3 className="text-2xl font-bold mb-4">Need Immediate Assistance?</h3>
            <p className="text-muted-foreground mb-6">
              Our support team is available 24/7 during the hackathon event.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Join Discord Community</Button>
              <Button variant="outline" size="lg">Send Email</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;