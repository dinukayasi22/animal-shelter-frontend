import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import pwaimg from './pwa.png'

const Navbar = () => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem('userToken');
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img 
                src={pwaimg} 
                alt="PWA Logo" 
                className="h-8 mr-2"
              />
              <span className="text-white text-xl font-bold">PWA</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              <Link
                to="/"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                About Us
              </Link>
              <Link
                to="/animals"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Available Animals
              </Link>
              <Link
                to="/feedback"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Feedback
              </Link>
              <Link
                to="/donate"
                className="bg-yellow-500 text-white hover:bg-yellow-600 px-4 py-2 rounded-md text-sm font-medium"
              >
                Support Us ❤️
              </Link>
              
            </div>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {userToken ? (
              <>
                <Link
                  to="/profile"
                  className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              to="/animals"
              className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              Available Animals
            </Link>
            
            <Link
              to="/about"
              className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              About Us
            </Link>
            <Link
              to="/feedback"
              className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              Feedback
            </Link>
            {userToken ? (
              <>
                <Link
                  to="/profile"
                  className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:bg-blue-700 block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Register
                </Link>
              </>
            )}
            <Link
              to="/donate"
              className="bg-yellow-500 text-white hover:bg-yellow-600 block px-3 py-2 rounded-md text-base font-medium text-center"
            >
              Support Us ❤️
            </Link>
            
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;