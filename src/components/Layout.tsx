import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { BookOpen, MessageCircle, Calendar, Bookmark, User, LogOut, Sun, Moon, Menu, X } from 'lucide-react';
import { auth } from '../config/firebase';


export default function Layout() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
 

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { path: '/resources', icon: Bookmark, label: 'Resources' },
    { path: '/confessions', icon: MessageCircle, label: 'Confessions' },
    { path: '/events', icon: Calendar, label: 'Events' },
    { path: '/marketplace', icon: BookOpen, label: 'Marketplace' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const NavLink = ({ path, icon: Icon, label }: { path: string; icon: React.ComponentType<any>; label: string }) => (
    <Link
      to={path}
      className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium w-full md:w-auto ${
        location.pathname === path
          ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/resources" className="text-xl sm:text-2xl font-bold text-indigo-600 
            dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
              SherLife
            </Link>

            {/* Mobile menu button */}
            <div className="flex items-center space-x-4 md:hidden">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                )}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
              {navItems.map((item) => (
                <NavLink key={item.path} {...item} />
              ))}

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => auth.signOut()}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-500 
                  dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
                
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Toggle theme"
                >
                  {isDark ? (
                    <Sun className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  )}
                </button>
              </div>
            </nav>
          </div>

          {/* Mobile navigation */}
          <div
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } md:hidden border-t border-gray-200 dark:border-gray-700 py-4`}
          >
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <NavLink key={item.path} {...item} />
              ))}
              <button
                onClick={() => auth.signOut()}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-500
                 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <Outlet />
      </main>
    </div>
  );
}