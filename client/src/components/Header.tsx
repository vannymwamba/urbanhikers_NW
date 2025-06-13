import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import logoUrl from "@assets/Circlelogo.png";

export default function Header() {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();

  const handleLogin = () => {
    window.location.href = "/sign-in";
  };

  const handleSignUp = () => {
    window.location.href = "/sign-up";
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of Urban Hikers.",
      });
      console.log("User signed out successfully");
    } catch (error: any) {
      console.error("Error signing out:", error);
      toast({
        title: "Sign out failed",
        description: "There was an error signing you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="bg-transparent text-[#FFD700] p-4 fixed w-full top-0 z-50 backdrop-blur-md shadow-lg">
      <nav className="container mx-auto flex justify-between items-center max-w-7xl">
        <Link href="/">
          <div className="flex items-center space-x-3 cursor-pointer">
            <img src={logoUrl} alt="Urban Hikers" className="w-16 h-16" />
            <div className="text-3xl font-bold text-[#FFD700]">
              Urban Hikers
            </div>
          </div>
        </Link>
        
        <ul className="hidden md:flex space-x-8 text-lg">
          <li>
            <Link href="/routes" className="text-[#FFD700] hover:bg-[#FFD700]/20 px-4 py-2 rounded-full transition-all duration-300 hover:-translate-y-1 font-medium">
              Routes
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link href="/create-route" className="text-[#FFD700] hover:bg-[#FFD700]/20 px-4 py-2 rounded-full transition-all duration-300 hover:-translate-y-1 font-medium">
                Create Route
              </Link>
            </li>
          )}
          <li>
            <a href="#pricing" className="text-[#FFD700] hover:bg-[#FFD700]/20 px-4 py-2 rounded-full transition-all duration-300 hover:-translate-y-1 font-medium">
              Pricing
            </a>
          </li>
          <li>
            <a href="#about" className="text-[#FFD700] hover:bg-[#FFD700]/20 px-4 py-2 rounded-full transition-all duration-300 hover:-translate-y-1 font-medium">
              About
            </a>
          </li>
        </ul>
        
        <div className="flex space-x-4 items-center">
          {isAuthenticated ? (
            <>
              <div className="flex items-center space-x-2">
                {user?.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-[#FFD700] rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">
                      {user?.displayName?.[0] || user?.email?.[0] || 'U'}
                    </span>
                  </div>
                )}
                <span className="font-medium">
                  {user?.displayName || user?.email}
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
                onClick={handleSignUp}
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
