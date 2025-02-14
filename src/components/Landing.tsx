import React from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, Menu, X } from "lucide-react";
import HeroIllustration from "./HeroIllustration";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleGetStarted = () => {
    navigate("/signup");
  };

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm fixed w-full z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div 
                className="cursor-pointer flex items-center" 
                onClick={() => scrollToSection("herosection")}
              >
                <img src="/Logo2.jpg" alt="SherLife Logo" className="h-8 w-8 sm:h-12 sm:w-12" />
                <span className="ml-2 text-lg sm:text-xl font-bold text-gray-900 dark:text-white">SherLife</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a onClick={() => scrollToSection("about")} className="text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer">About Us</a>
              <a onClick={() => scrollToSection("contact")} className="text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer">Contact</a>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                Sign In
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-4">
                <a onClick={() => scrollToSection("about")} className="text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer">About Us</a>
                <a onClick={() => scrollToSection("contact")} className="text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer">Contact</a>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors w-full"
                >
                  Sign In
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="herosection" className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="flex flex-col items-center lg:items-start space-y-6 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
                Welcome to<br />
                <span className="text-indigo-600 inline-block mt-2">SherLife</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-xl">
                Your one-stop platform for connecting Sheridan students and enhancing campus life. Join our community today!
              </p>
              <button
                onClick={handleGetStarted}
                className="px-6 py-3 text-lg bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors transform hover:scale-105 duration-200 shadow-lg"
              >
                Get Started
              </button>
            </div>
            <div className="relative w-full h-[400px] sm:h-[400px] lg:h-[500px] mt-8 lg:mt-0">
              <div className="absolute inset-0 transform hover:scale-105 transition-transform duration-500">
                <HeroIllustration />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 sm:py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              About Us
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-500 dark:text-gray-400">
              SherLife is dedicated to enriching the Sheridan College student experience.
            </p>
          </div>
          <div className="mt-8 sm:mt-10">
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Our Mission",
                  description: "To create a vibrant community where Sheridan students can connect, share experiences, and support each other."
                },
                {
                  title: "Our Vision",
                  description: "To become the essential platform that enhances student life at Sheridan College through meaningful connections."
                },
                {
                  title: "Our Values",
                  description: "Community, Innovation, Inclusivity, and Student Success drive everything we do."
                }
              ].map((item, index) => (
                <div key={index} className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Contact Us
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-500 dark:text-gray-400">
              Have questions? We're here to help!
            </p>
          </div>
          <div className="mt-8 sm:mt-10">
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
                {[
                {
                  Icon: Mail,
                  title: "Email",
                  onClick: () => window.open(`mailto:pate6219@sheridancollege.ca`),
                  info: "pate6219@sheridancollege.ca"
                },
                {
                  Icon: Phone,
                  title: "Phone",
                  info: "+1 (365) 998-1484"
                },
                {
                  Icon: MapPin,
                  title: "Location",
                  onClick: () => window.open("https://maps.app.goo.gl/mRpy9z6dRFcx7ihq9"),
                  info: "Sheridan College, Brampton, ON"
                }
                ].map((item, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg cursor-pointer"
                  onClick={item.onClick}
                >
                  <item.Icon className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400 text-center">
                  {item.info}
                  </p>
                </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
            <p className="text-sm sm:text-base text-gray-400 dark:text-gray-500">
              <a href="/privacy-policy" className="hover:text-indigo-600 transition-colors">
                Privacy Policy
              </a>
            </p>
            <p className="mt-4 text-sm sm:text-base text-gray-400 dark:text-gray-500">
              &copy; {new Date().getFullYear()} SherLife. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;