import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import RouteCard from "@/components/RouteCard";
import BookingModal from "@/components/BookingModal";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Star, Check } from "lucide-react";
import type { Route } from "@shared/schema";

export default function Landing() {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const { data: routes = [] } = useQuery<Route[]>({
    queryKey: ["/api/routes"],
  });

  const featuredRoutes = routes.slice(0, 3);

  const handleBookRoute = (route: Route) => {
    setSelectedRoute(route);
    setIsBookingModalOpen(true);
  };

  const testimonials = [
    {
      name: "Sarah M.",
      rating: 5,
      review: "Amazing experience! I discovered parts of my own city I never knew existed. The historic downtown tour was perfectly paced and incredibly informative.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
    },
    {
      name: "Mike R.",
      rating: 5,
      review: "The community aspect is fantastic. I've met so many like-minded people and created lasting friendships through group walks. Highly recommend!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
    },
    {
      name: "Emma L.",
      rating: 5,
      review: "Creating my own route was so easy! The tools are intuitive and the community feedback helped me improve it. Now it's one of the most popular routes in the city.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
    }
  ];

  const pricingPlans = [
    {
      name: "Explorer",
      price: "Free",
      features: [
        "Access to free public routes",
        "Basic route creation tools",
        "Community forum access",
        "Mobile app with GPS"
      ]
    },
    {
      name: "Adventurer",
      price: "$12/month",
      popular: true,
      features: [
        "Unlimited premium routes",
        "Advanced route creation",
        "Priority customer support",
        "Offline maps & audio guides",
        "Group booking discounts"
      ]
    },
    {
      name: "Guide",
      price: "$29/month",
      features: [
        "Everything in Adventurer",
        "Create paid tours",
        "Revenue analytics",
        "Custom branding",
        "API access"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      
      {/* Featured Routes Section */}
      <section id="routes" className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Featured Routes</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] mx-auto mb-16 rounded"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRoutes.map((route) => (
              <RouteCard 
                key={route.id} 
                route={route} 
                onBook={handleBookRoute}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              View All Routes
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">What Urban Explorers Say</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] mx-auto mb-16 rounded"></div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.avatar} 
                    alt={`${testimonial.name} testimonial`} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <div className="flex text-yellow-500">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.review}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-r from-black to-gray-600 text-white">
        <div className="container mx-auto max-w-6xl px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Choose Your Adventure</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] mx-auto mb-16 rounded"></div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index}
                className={`p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 relative ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black border-[#FFD700] hover:shadow-2xl' 
                    : 'bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-black text-[#FFD700] px-4 py-2 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-2xl font-bold mb-4 ${plan.popular ? 'text-black' : 'text-white'}`}>
                  {plan.name}
                </h3>
                <div className={`text-4xl font-bold mb-6 ${plan.popular ? 'text-black' : 'text-[#FFD700]'}`}>
                  {plan.price}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className={`w-5 h-5 mr-3 ${plan.popular ? 'text-black' : 'text-[#FFD700]'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full py-3 rounded-full font-bold transition-all duration-300 hover:-translate-y-1 ${
                    plan.popular
                      ? 'bg-black text-[#FFD700] hover:shadow-lg'
                      : 'bg-[#FFD700] text-black hover:shadow-lg'
                  }`}
                >
                  {plan.name === "Guide" ? "Become a Guide" : plan.name === "Adventurer" ? "Start Free Trial" : "Get Started"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-[#FFD700] to-[#FFA500]">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">Ready to Start Your Urban Adventure?</h2>
          <p className="text-xl mb-8 text-black/80">Join thousands of explorers discovering their cities one step at a time.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.location.href = "/api/login"}
              className="bg-gradient-to-r from-black to-gray-600 text-[#FFD700] px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              Get Started Free
            </Button>
            <Button className="bg-white text-black px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-black/20">
              Download App
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      
      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        route={selectedRoute}
      />
    </div>
  );
}
