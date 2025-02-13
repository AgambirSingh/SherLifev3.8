import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Landing: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setShowPrivacyModal(true);
  };

  const handleAcceptPrivacy = () => {
    localStorage.setItem("visited", "true");
    setShowPrivacyModal(false); 
    navigate("/signup");        
  };

  const handleDeclinePrivacy = () => {
    setShowPrivacyModal(false); 
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  const navigation = [
    { title: "Customers", path: "/customers" },
    { title: "Careers", path: "/careers" },
    { title: "Guides", path: "/guides" },
    { title: "Partners", path: "/partners" },
  ];

  return (
    <>
      <header>
        <nav className="items-center pt-5 px-4 mx-auto max-w-screen-xl sm:px-8 md:flex md:space-x-6">
          <div className="flex justify-between">
            <a href="/" className="flex items-center space-x-2">
              <img src="./public/Logo.jpg" alt="Company Logo" className="h-24 w-24" />
            </a>
            <button
              className="text-gray-500 outline-none md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
          <ul className={`flex-1 justify-between mt-12 md:flex md:mt-0 ${menuOpen ? "" : "hidden"}`}>
            <li className="order-2 pb-5 md:pb-0">
              <button
                onClick={handleSignIn}
                className="py-3 px-6 rounded-md shadow-md text-white text-center bg-indigo-500 hover:bg-indigo-600 focus:shadow-none block md:inline"
              >
                Sign In
              </button>
            </li>
            <div className="order-1 flex-1 justify-center items-center space-y-5 md:flex md:space-x-6 md:space-y-0">
              {navigation.map((item, idx) => (
                <li className="text-gray-400 hover:text-indigo-600" key={idx}>
                  <a href={item.path}>{item.title}</a>
                </li>
              ))}
            </div>
          </ul>
        </nav>
      </header>

      <section className="mt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8">
        <div className="space-y-4 flex-1 sm:text-center lg:text-left">
          <h1 className="text-gray-800 font-bold text-4xl xl:text-5xl">
            One stop solution for
            <span className="text-indigo-600"> Sheridan students</span>
          </h1>
          <p className="text-gray-500 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
            Designed to help students find the right resources and information all in one place.
          </p>
          <div className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
            <button
              onClick={handleGetStarted}
              className="px-7 py-3 w-full bg-indigo-600 text-white text-center rounded-md shadow-md block sm:w-auto hover:bg-indigo-500"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-2">
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600">
              Privacy Policy
            </a>
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} SherLife. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4">Privacy Policy Agreement</h2>
            <p className="text-sm mb-4">
              By clicking "Accept", you agree to our{" "}
              <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Privacy Policy
              </a>.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleAcceptPrivacy}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
              >
                Accept
              </button>
              <button
                onClick={handleDeclinePrivacy}
                className="px-4 py-2 border border-gray-300 text-gray-500 rounded-md hover:bg-gray-100"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Landing;
