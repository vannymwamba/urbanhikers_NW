import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "wouter";
import heroImageUrl from "@assets/Urban Hikers FEB27 2022_ 100.jpg";

export default function Hero() {
  const { isAuthenticated } = useAuth();

  const scrollToRoutes = () => {
    const routesSection = document.getElementById('routes');
    if (routesSection) {
      routesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 text-center overflow-hidden min-h-screen flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImageUrl})`
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="container mx-auto relative z-10 max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white animate-fade-in-up">
          Discover Your City Through<br />Themed Walking Adventures
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in-up animation-delay-300">
          Join guided tours, create your own routes, and explore hidden gems in your city with fellow urban explorers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
          {isAuthenticated ? (
            <Link href="/routes">
              <Button className="bg-gradient-to-r from-black to-gray-600 text-[#FFD700] px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                Explore Routes
              </Button>
            </Link>
          ) : (
            <Button 
              onClick={scrollToRoutes}
              className="bg-gradient-to-r from-black to-gray-600 text-[#FFD700] px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              Explore Routes
            </Button>
          )}
          {isAuthenticated ? (
            <Link href="/create-route">
              <Button className="bg-white text-black px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-black/20">
                Create Your Route
              </Button>
            </Link>
          ) : (
            <Button 
              onClick={() => window.location.href = "/api/login"}
              className="bg-white text-black px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-black/20"
            >
              Get Started
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
