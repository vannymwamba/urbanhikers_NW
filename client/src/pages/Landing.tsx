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
      name: "Jeanmarie",
      location: "Jacksonville, FL",
      rating: 5,
      date: "April 2021",
      review: "In an era where online algorithms control many of our interactions with one another, funneling us into echo chambers with more people just like us, it's fantastic to find an experience like Vanny's Urban Hiking, which is designed to foster authentic engagement and meaningful conversation. The hike isn't intended to teach you anything about the area's buildings or history, but rather to experience the urban environment alongside interesting people with diverse experiences and fresh perspectives.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
    },
    {
      name: "Janet",
      location: "New York, NY",
      rating: 5,
      date: "December 2021",
      review: "I enjoyed walking and conversing with Vanny throughout downtown Cincinnati and Covington Kentucky! I didn't know much about Cinny, but through the walk I learned a bit about the city and it's evolving history. Vanny was also very personable and inviting. I had a great time and you will too!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
    },
    {
      name: "Imee",
      location: "Columbus, OH",
      rating: 5,
      date: "June 2021",
      review: "This was an amazing experience! We've been to Cincinnati many times, but after this urban hike, we feel even better acquainted with the city. Often we would just drive to one point of attraction but this was a great way to see the city. And Vanny is amazing! Easy going and great to talk to. Would definitely recommend this experience to anyone!",
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
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex text-yellow-500">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{testimonial.date}</span>
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

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Our Story</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] mx-auto mb-16 rounded"></div>
          
          <div className="bg-white p-12 rounded-3xl shadow-xl">
            <div className="text-lg leading-relaxed text-gray-700 space-y-6">
              <p>
                In 2014, we started with a simple idea—a book club that walked. What began as casual discussions about literature while strolling through Cincinnati's parks slowly evolved into something deeper. Step by step, conversation by conversation, we realized we weren't just walking to talk—we were walking to connect.
              </p>
              
              <p>
                As our group grew, so did our purpose. The books faded into the background, but the walking remained—and with it, an unexpected transformation. Strangers became friends. Neighbors became allies. A book club became Urban Hikers: a community-powered movement dedicated to bridging divides, one step at a time.
              </p>
              
              <p>
                Today, Urban Hikers has grown beyond Cincinnati to cities across the nation. What started with a handful of book lovers has become a network of thousands who believe in the power of walking together. We've discovered that when you change the way you see your city, you change the way you see each other.
              </p>
              
              <p>
                Our mission remains simple: to create meaningful connections through shared urban adventures. Whether you're exploring historic neighborhoods, discovering hidden gems, or simply getting some fresh air with like-minded people, every step builds community.
              </p>
              
              <div className="text-center mt-10">
                <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full">
                  <span className="text-black font-bold text-lg">From Cincinnati book club to nationwide movement</span>
                </div>
              </div>
              
              <div className="mt-10 pt-8 border-t border-gray-200">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">What We Believe</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-black font-bold text-2xl">👥</span>
                    </div>
                    <h4 className="font-bold text-xl mb-3">Community First</h4>
                    <p className="text-gray-600">Every walk is an opportunity to build bridges and create lasting friendships in your city.</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-black font-bold text-2xl">🗺️</span>
                    </div>
                    <h4 className="font-bold text-xl mb-3">Urban Discovery</h4>
                    <p className="text-gray-600">Cities are full of hidden stories and unexpected beauty waiting to be explored on foot.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Join the Movement</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] mx-auto mb-16 rounded"></div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Individual Walk */}
            <div className="bg-gradient-to-b from-gray-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Drop-In Walk</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#FFA500]">$25</span>
                  <span className="text-gray-600 text-lg">/person</span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#FFD700] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Join any scheduled walk</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#FFD700] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Meet fellow urban explorers</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#FFD700] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">2-4 hour experience</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#FFD700] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">No commitment required</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => window.location.href = "/routes"}
                  className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold py-3 rounded-full hover:shadow-lg transition-all duration-300"
                >
                  Book a Walk
                </Button>
              </div>
            </div>

            {/* Monthly Membership */}
            <div className="bg-gradient-to-b from-[#FFD700]/10 to-[#FFA500]/10 p-8 rounded-3xl shadow-xl border-2 border-[#FFD700] hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black px-6 py-2 rounded-full text-sm font-bold">
                  MOST POPULAR
                </span>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Community Member</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#FFA500]">$45</span>
                  <span className="text-gray-600 text-lg">/month</span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#FFD700] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Unlimited monthly walks</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#FFD700] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Priority booking access</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#FFD700] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Member-only events</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#FFD700] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Digital route guides</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#FFD700] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Community Discord access</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => window.location.href = "/api/login"}
                  className="w-full bg-gradient-to-r from-black to-gray-600 text-[#FFD700] font-bold py-3 rounded-full hover:shadow-lg transition-all duration-300"
                >
                  Join Community
                </Button>
              </div>
            </div>

            {/* Private Group */}
            <div className="bg-gradient-to-b from-gray-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Private Group</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#FFA500]">$200</span>
                  <span className="text-gray-600 text-lg">/group</span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#FFD700] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Custom route planning</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#FFD700] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Up to 12 participants</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#FFD700] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Dedicated guide</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#FFD700] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Flexible scheduling</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#FFD700] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Team building focused</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => window.location.href = "mailto:hello@urbanhikers.com"}
                  className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold py-3 rounded-full hover:shadow-lg transition-all duration-300"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-4">
              All walks include experienced guides, route materials, and post-walk community discussion.
            </p>
            <p className="text-sm text-gray-500">
              No cancellation fees • Weather protection guarantee • All fitness levels welcome
            </p>
          </div>
        </div>
      </section>

      {/* Waiting List Section */}
      <section className="py-20 bg-gradient-to-r from-[#FFD700] to-[#FFA500]">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">Coming Soon to Your City!</h2>
          <p className="text-xl mb-8 text-black/80">
            Urban Hikers is launching nationwide. Join our waiting list to be the first to explore your city with fellow adventurers.
          </p>
          
          {/* Waiting List Form */}
          <div className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Reserve Your Spot</h3>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none"
                  required
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none"
                required
              />
              <select className="w-full px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#FFD700] focus:border-transparent outline-none">
                <option value="">Select Your City</option>
                <option value="cincinnati">Cincinnati, OH</option>
                <option value="columbus">Columbus, OH</option>
                <option value="cleveland">Cleveland, OH</option>
                <option value="chicago">Chicago, IL</option>
                <option value="nashville">Nashville, TN</option>
                <option value="atlanta">Atlanta, GA</option>
                <option value="other">Other (we'll contact you)</option>
              </select>
              <div className="flex items-start space-x-3 text-left">
                <input type="checkbox" id="updates" className="mt-1.5 w-4 h-4 text-[#FFD700] rounded" />
                <label htmlFor="updates" className="text-sm text-gray-700">
                  Send me updates about Urban Hikers events, new routes, and community news
                </label>
              </div>
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-black to-gray-600 text-[#FFD700] px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Join the Waiting List
              </Button>
            </form>
            
            {/* Benefits */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4 font-semibold">Waiting list members get:</p>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-[#FFD700] mr-2" />
                  <span>Early access to routes</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-[#FFD700] mr-2" />
                  <span>Founding member pricing</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-[#FFD700] mr-2" />
                  <span>Free first walk</span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-black/70 mt-6 text-lg">
            Expected launch: <strong>Spring 2025</strong>
          </p>
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
