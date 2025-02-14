import React from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import HeroIllustration from "./HeroIllustration";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm fixed w-full z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="cursor-pointer flex items-center" onClick={() => {
                navigate("/");
                document.getElementById("herosection")?.scrollIntoView({ behavior: "smooth" });
              }}>
                <img src="/Logo2.jpg" alt="SherLife Logo" className="h-12 w-12" />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">SherLife</span>
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <a href="#about" className="text-gray-600 hover:text-indigo-600 transition-colors">About Us</a>
              <a href="#contact" className="text-gray-600 hover:text-indigo-600 transition-colors">Contact</a>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="herosection" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-start space-y-6">
              <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
                Welcome to<br />
                <span className="text-indigo-600 inline-block mt-2">SherLife</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xl">
                Your one-stop platform for connecting Sheridan students and enhancing campus life. Join our community today!
              </p>
              <button
                onClick={handleGetStarted}
                className="px-6 py-3 text-lg bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors transform hover:scale-105 duration-200 shadow-lg"
              >
                Get Started
              </button>
            </div>
            <div className="relative w-full h-[500px] hidden lg:block">
              <div className="absolute inset-0 transform hover:scale-105 transition-transform duration-500">
                <HeroIllustration />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              About Us
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
              SherLife is dedicated to enriching the Sheridan College student experience.
            </p>
          </div>
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Our Mission</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  To create a vibrant community where Sheridan students can connect, share experiences, and support each other.
                </p>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Our Vision</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  To become the essential platform that enhances student life at Sheridan College through meaningful connections.
                </p>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Our Values</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Community, Innovation, Inclusivity, and Student Success drive everything we do.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Contact Us
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
              Have questions? We're here to help!
            </p>
          </div>
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg">
                <Mail className="w-8 h-8 text-indigo-600" />
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Email</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  support@sherlife.com
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg">
                <Phone className="w-8 h-8 text-indigo-600" />
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Phone</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  +1 (123) 456-7890
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg">
                <MapPin className="w-8 h-8 text-indigo-600" />
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Location</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Sheridan College, Brampton, ON
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
            <p className="text-base text-gray-400 dark:text-gray-500">
              <a href="/privacy-policy" className="hover:text-indigo-600 transition-colors">
                Privacy Policy
              </a>
            </p>
            <p className="mt-4 text-base text-gray-400 dark:text-gray-500">
              &copy; {new Date().getFullYear()} SherLife. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
