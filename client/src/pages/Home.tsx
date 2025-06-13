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
