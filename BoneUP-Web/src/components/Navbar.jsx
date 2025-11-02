import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMyAccountClick = () => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'instructor') {
        navigate('/instructor/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    }
  };

  return (
    <>
      <nav 
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
          ${isSticky 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-white'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#04510e] rounded-lg flex items-center justify-center">
                  <svg 
                    className="w-5 h-5 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                    />
                  </svg>
                </div>
                <span className="text-xl font-semibold text-[#04510e]">
                  BoneUp!
                </span>
              </Link>
            </div>

            {/* Navigation Menu - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/"
                className={`px-4 py-2 text-base font-medium transition-colors duration-200 relative ${
                  isActive('/') 
                    ? 'text-[#04510e]' 
                    : 'text-black hover:text-[#04510e] group'
                }`}
              >
                Home
                {isActive('/') ? (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#04510e]"></span>
                ) : (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#04510e] transition-all duration-300 group-hover:w-full"></span>
                )}
              </Link>
              <Link
                to="/how-it-works"
                className={`px-4 py-2 text-base font-medium transition-colors duration-200 relative ${
                  isActive('/how-it-works') 
                    ? 'text-[#04510e]' 
                    : 'text-black hover:text-[#04510e] group'
                }`}
              >
                How It Works
                {isActive('/how-it-works') ? (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#04510e]"></span>
                ) : (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#04510e] transition-all duration-300 group-hover:w-full"></span>
                )}
              </Link>
              <Link
                to="/fish-guide"
                className={`px-4 py-2 text-base font-medium transition-colors duration-200 relative ${
                  isActive('/fish-guide') 
                    ? 'text-[#04510e]' 
                    : 'text-black hover:text-[#04510e] group'
                }`}
              >
                Fish Guide
                {isActive('/fish-guide') ? (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#04510e]"></span>
                ) : (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#04510e] transition-all duration-300 group-hover:w-full"></span>
                )}
              </Link>
              
              {/* Divider */}
              <div className="h-6 w-px bg-[#04510e]"></div>
              
              {/* Conditional Auth Buttons */}
              {user ? (
                // Authenticated User
                <button
                  onClick={handleMyAccountClick}
                  className="px-4 py-2 text-base font-medium text-black hover:text-[#04510e] transition-colors duration-200 relative group"
                >
                  My Account
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#04510e] transition-all duration-300 group-hover:w-full"></span>
                </button>
              ) : (
                // Not Authenticated
                <>
                  <Link
                    to="/signin"
                    className={`px-4 py-2 text-base font-medium transition-colors duration-200 relative ${
                      isActive('/signin') 
                        ? 'text-[#04510e]' 
                        : 'text-black hover:text-[#04510e] group'
                    }`}
                  >
                    Sign In
                    {isActive('/signin') ? (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#04510e]"></span>
                    ) : (
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#04510e] transition-all duration-300 group-hover:w-full"></span>
                    )}
                  </Link>
                  <Link
                    to="/get-started"
                    className="px-4 py-2 rounded-md text-base font-medium text-white bg-[#04510e] hover:bg-green-800 transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="bg-transparent inline-flex items-center justify-center p-2 rounded-md text-green-600 hover:text-[#04510e] hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 transition-colors duration-200"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/')
                    ? 'text-[#04510e] bg-green-50'
                    : 'text-black hover:text-[#04510e] hover:bg-green-50'
                } transition-colors duration-200`}
              >
                Home
              </Link>
              <Link
                to="/fish-guide"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/fish-guide')
                    ? 'text-[#04510e] bg-green-50'
                    : 'text-black hover:text-[#04510e] hover:bg-green-50'
                } transition-colors duration-200`}
              >
                Fish Guide
              </Link>
              <Link
                to="/how-it-works"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/how-it-works')
                    ? 'text-[#04510e] bg-green-50'
                    : 'text-black hover:text-[#04510e] hover:bg-green-50'
                } transition-colors duration-200`}
              >
                How It Works
              </Link>
              
              {/* Divider */}
              <div className="border-t border-gray-200 my-2"></div>
              
              {/* Conditional Auth Buttons - Mobile */}
              {user ? (
                <button
                  onClick={() => {
                    handleMyAccountClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-black hover:text-[#04510e] hover:bg-green-50 transition-colors duration-200"
                >
                  My Account
                </button>
              ) : (
                <>
                  <Link
                    to="/signin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/signin')
                        ? 'text-[#04510e] bg-green-50'
                        : 'text-black hover:text-[#04510e] hover:bg-green-50'
                    } transition-colors duration-200`}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/get-started"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white bg-[#04510e] hover:bg-green-800 transition-colors duration-200"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;