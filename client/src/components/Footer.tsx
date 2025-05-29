export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-16">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#FFD700]">Urban Hikers</h3>
            <p className="text-gray-300 leading-relaxed">
              Connecting urban explorers with the hidden gems and stories that make every city unique.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-[#FFD700]">Platform</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-[#FFD700] transition-colors">Browse Routes</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#FFD700] transition-colors">Create Route</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#FFD700] transition-colors">Become a Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#FFD700] transition-colors">Mobile App</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-[#FFD700]">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-[#FFD700] transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#FFD700] transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#FFD700] transition-colors">Community Forum</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#FFD700] transition-colors">Safety Guidelines</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-[#FFD700]">Connect</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-[#FFD700] transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#FFD700] transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#FFD700] transition-colors">Press</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#FFD700] transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-600 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Urban Hikers. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
