import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import RouteCard from "@/components/RouteCard";
import BookingModal from "@/components/BookingModal";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "wouter";
import { Check, Star } from "lucide-react";
import type { Route, Booking } from "@shared/schema";

export default function Home() {
  const { user } = useAuth();
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const { data: routes = [] } = useQuery<Route[]>({
    queryKey: ["/api/routes"],
  });

  const { data: bookings = [] } = useQuery<Booking[]>({
    queryKey: ["/api/bookings"],
  });

  const { data: userRoutes = [] } = useQuery<Route[]>({
    queryKey: [`/api/users/${user?.id}/routes`],
    enabled: !!user?.id,
  });

  const handleBookRoute = (route: Route) => {
    setSelectedRoute(route);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto max-w-6xl px-6">
          {/* Welcome Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-3xl p-8 text-center">
              <h1 className="text-4xl font-bold text-black mb-4">
                Welcome back, {user?.firstName || user?.email}!
              </h1>
              <p className="text-xl text-black/80 mb-6">
                Ready for your next urban adventure?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/routes">
                  <Button className="bg-black text-[#FFD700] px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300">
                    Explore Routes
                  </Button>
                </Link>
                <Link href="/create-route">
                  <Button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300">
                    Create Route
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* My Bookings */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">My Upcoming Adventures</h2>
            {bookings.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.slice(0, 3).map((booking) => (
                  <div key={booking.id} className="bg-white p-6 rounded-2xl shadow-lg">
                    <div className="text-sm text-gray-500 mb-2">
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </div>
                    <div className="font-bold text-lg mb-2">Route #{booking.routeId}</div>
                    <div className="text-gray-600 mb-4">
                      {booking.participants} participant{booking.participants > 1 ? 's' : ''}
                    </div>
                    <div className="text-xl font-bold text-[#FFD700]">
                      ${booking.totalPrice}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <p className="text-gray-600 mb-4">No upcoming bookings yet.</p>
                <Link href="/routes">
                  <Button className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black px-6 py-2 rounded-full font-bold">
                    Book Your First Adventure
                  </Button>
                </Link>
              </div>
            )}
          </section>

          {/* My Routes */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">My Routes</h2>
              <Link href="/create-route">
                <Button className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black px-6 py-3 rounded-full font-bold">
                  Create New Route
                </Button>
              </Link>
            </div>
            {userRoutes.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userRoutes.slice(0, 3).map((route) => (
                  <RouteCard key={route.id} route={route} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <p className="text-gray-600 mb-4">You haven't created any routes yet.</p>
                <Link href="/create-route">
                  <Button className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black px-6 py-2 rounded-full font-bold">
                    Create Your First Route
                  </Button>
                </Link>
              </div>
            )}
          </section>

          {/* Featured Routes */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Discover New Routes</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {routes.slice(0, 6).map((route) => (
                <RouteCard 
                  key={route.id} 
                  route={route} 
                  onBook={handleBookRoute}
                />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/routes">
                <Button className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300">
                  View All Routes
                </Button>
              </Link>
            </div>
          </section>
        </div>

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
                      <span className="text-gray-700">Discover hidden gems</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-[#FFD700] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">No long-term commitment</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-[#FFA500] hover:bg-[#FFD700] text-white font-bold py-3 rounded-xl transition-colors">
                    Book Now
                  </Button>
                </div>
              </div>

              {/* Monthly Membership */}
              <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 transform scale-105 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-black text-[#FFD700] px-4 py-2 rounded-full text-sm font-bold">
                  Most Popular
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4 text-black">Monthly Explorer</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-black">$75</span>
                    <span className="text-black/70 text-lg">/month</span>
                  </div>
                  <ul className="space-y-3 mb-8 text-left">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-black mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-black">Unlimited walks per month</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-black mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-black">Priority booking for special events</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-black mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-black">Monthly community meetup</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-black mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-black">Digital route maps & guides</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-black hover:bg-gray-800 text-[#FFD700] font-bold py-3 rounded-xl transition-colors">
                    Join Community
                  </Button>
                </div>
              </div>

              {/* Annual Membership */}
              <div className="bg-gradient-to-b from-gray-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">Annual Adventurer</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-[#FFA500]">$750</span>
                    <span className="text-gray-600 text-lg">/year</span>
                    <div className="text-sm text-green-600 font-semibold mt-1">Save $150!</div>
                  </div>
                  <ul className="space-y-3 mb-8 text-left">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-[#FFD700] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Everything in Monthly Explorer</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-[#FFD700] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Exclusive annual retreat</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-[#FFD700] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Urban Hikers merchandise</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-[#FFD700] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Beta access to new routes</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-[#FFA500] hover:bg-[#FFD700] text-white font-bold py-3 rounded-xl transition-colors">
                    Go Annual
                  </Button>
                </div>
              </div>
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
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        route={selectedRoute}
      />
    </div>
  );
}
