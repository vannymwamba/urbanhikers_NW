import { MapPin, Users, Smartphone } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: MapPin,
      title: "Curated Routes",
      description: "Discover carefully crafted walking routes featuring historical landmarks, street art, food tours, and hidden local gems."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Connect with fellow urban explorers, share experiences, and discover routes created by local experts and passionate walkers."
    },
    {
      icon: Smartphone,
      title: "Smart Navigation",
      description: "GPS-guided tours with offline maps, audio commentary, and AR features to enhance your walking experience."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-r from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl px-6">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Why Choose Urban Hikers?</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] mx-auto mb-16 rounded"></div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#FFD700]/20"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-2xl flex items-center justify-center text-black text-2xl mb-6">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
