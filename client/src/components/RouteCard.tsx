import { Clock, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Route } from "@shared/schema";

interface RouteCardProps {
  route: Route;
  onBook?: (route: Route) => void;
}

export default function RouteCard({ route, onBook }: RouteCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'historic':
        return 'bg-[#FFD700] text-black';
      case 'art & culture':
        return 'bg-[#FFA500] text-black';
      case 'food & drink':
        return 'bg-[#FFD700] text-black';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      {route.imageUrl && (
        <img 
          src={route.imageUrl} 
          alt={route.title} 
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <Badge className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(route.category)}`}>
            {route.category}
          </Badge>
          <div className="flex items-center text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="ml-1 text-sm text-gray-600">
              {parseFloat(route.rating || "0").toFixed(1)}
            </span>
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-800">{route.title}</h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{route.description}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            <span>{route.duration}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{route.distance}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-[#FFD700]">${route.price}</span>
          {onBook && (
            <Button 
              onClick={() => onBook(route)}
              className="bg-gradient-to-r from-black to-gray-600 text-[#FFD700] px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              Book Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
