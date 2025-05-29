import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import RouteCard from "@/components/RouteCard";
import BookingModal from "@/components/BookingModal";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import type { Route } from "@shared/schema";

export default function Routes() {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { data: routes = [], isLoading } = useQuery<Route[]>({
    queryKey: ["/api/routes"],
  });

  const filteredRoutes = routes.filter(route => {
    const matchesSearch = route.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || route.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...Array.from(new Set(routes.map(route => route.category)))];

  const handleBookRoute = (route: Route) => {
    setSelectedRoute(route);
    setIsBookingModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-24 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FFD700] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading routes...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto max-w-6xl px-6">
          {/* Page Header */}
          <section className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              Discover Urban Adventures
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Explore curated walking routes and hidden gems in your city
            </p>
          </section>

          {/* Search and Filters */}
          <section className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search routes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-3 rounded-full border-gray-300 focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48 py-3 rounded-full border-gray-300 focus:ring-2 focus:ring-[#FFD700] focus:border-transparent">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </section>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600 text-center">
              {filteredRoutes.length} route{filteredRoutes.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Routes Grid */}
          <section>
            {filteredRoutes.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRoutes.map((route) => (
                  <RouteCard 
                    key={route.id} 
                    route={route} 
                    onBook={handleBookRoute}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md mx-auto">
                  <p className="text-gray-600 mb-4">
                    No routes found matching your criteria.
                  </p>
                  <p className="text-sm text-gray-500">
                    Try adjusting your search or filter settings.
                  </p>
                </div>
              </div>
            )}
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
