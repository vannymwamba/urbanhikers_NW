import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "wouter";

export default function Hero() {
  const { isAuthenticated } = useAuth();

  const scrollToRoutes = () => {
    const routesSection = document.getElementById('routes');
    if (routesSection) {
      routesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] pt-32 pb-20 text-center relative overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-black/5 to-transparent"></div>
      <div className="container mx-auto relative z-10 max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent animate-fade-in-up">
          Discover Your City Through<br />Themed Walking Adventures
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-black/80 animate-fade-in-up animation-delay-300">
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
