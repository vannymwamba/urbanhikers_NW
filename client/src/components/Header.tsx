import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import logoUrl from "@assets/Circlelogo.png";

export default function Header() {
  const { isAuthenticated, user } = useAuth();

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <header className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black p-4 fixed w-full top-0 z-50 backdrop-blur-md shadow-lg">
      <nav className="container mx-auto flex justify-between items-center max-w-7xl">
        <Link href="/">
          <div className="flex items-center space-x-3 cursor-pointer">
            <img src={logoUrl} alt="Urban Hikers" className="w-12 h-12" />
            <div className="text-2xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              Urban Hikers
            </div>
          </div>
        </Link>
        
        <ul className="hidden md:flex space-x-8">
          <li>
            <Link href="/routes" className="hover:bg-black/10 px-4 py-2 rounded-full transition-all duration-300 hover:-translate-y-1">
              Routes
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link href="/create-route" className="hover:bg-black/10 px-4 py-2 rounded-full transition-all duration-300 hover:-translate-y-1">
                Create Route
              </Link>
            </li>
          )}
          <li>
            <a href="#pricing" className="hover:bg-black/10 px-4 py-2 rounded-full transition-all duration-300 hover:-translate-y-1">
              Pricing
            </a>
          </li>
          <li>
            <a href="#about" className="hover:bg-black/10 px-4 py-2 rounded-full transition-all duration-300 hover:-translate-y-1">
              About
            </a>
          </li>
        </ul>
        
        <div className="flex space-x-4 items-center">
          {isAuthenticated ? (
            <>
              <div className="flex items-center space-x-2">
                {(user as any)?.profileImageUrl && (
                  <img 
                    src={(user as any).profileImageUrl} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <span className="font-medium">
                  {(user as any)?.firstName || (user as any)?.email}
                </span>
              </div>
              <Button
                onClick={handleLogout}
                className="bg-gradient-to-r from-black to-gray-600 text-[#FFD700] px-6 py-3 rounded-full font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleLogin}
                className="bg-gradient-to-r from-black to-gray-600 text-[#FFD700] px-6 py-3 rounded-full font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Sign In
              </Button>
              <Button
                onClick={handleLogin}
                className="bg-white text-black px-6 py-3 rounded-full font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-black/20"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
