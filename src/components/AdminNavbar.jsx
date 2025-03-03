import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/admin/login');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left Section */}
          <div className="flex items-center">
            <Link to="/admin/dashboard" className="flex-shrink-0">
              <span className="text-white text-xl font-bold">Admin Panel</span>
            </Link>
            
            {/* Desktop Menu */}
            {token && (
              <div className="hidden md:ml-6 md:flex md:space-x-2">
                <NavLink to="/admin/dashboard">Dashboard</NavLink>
                <NavLink to="/admin/animals">Animals</NavLink>
                <NavLink to="/admin/add-animal">Add Animal</NavLink>
                <NavLink to="/admin/users">Users</NavLink>
                <NavLink to="/admin/adoptions">Adoptions</NavLink>
                <NavLink to="/admin/donations">Donations</NavLink>
                <NavLink to="/admin/feedback">Feedback</NavLink>
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {token ? (
              <button
                onClick={handleLogout}
                className="text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium hidden md:block"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/admin/login"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-white hover:bg-blue-700 rounded-lg"
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && token && (
          <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
            <MobileLink to="/admin/dashboard" onClick={toggleMenu}>Dashboard</MobileLink>
            <MobileLink to="/admin/animals" onClick={toggleMenu}>Manage Animals</MobileLink>
            <MobileLink to="/admin/add-animal" onClick={toggleMenu}>Add Animal</MobileLink>
            <MobileLink to="/admin/users" onClick={toggleMenu}>Manage Users</MobileLink>
            <MobileLink to="/admin/adoptions" onClick={toggleMenu}>Adoptions</MobileLink>
            <MobileLink to="/admin/donations" onClick={toggleMenu}>Donations</MobileLink>
            <MobileLink to="/admin/feedback" onClick={toggleMenu}>Feedback</MobileLink>
            <button
              onClick={handleLogout}
              className="w-full text-left text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

// Reusable component for desktop links
const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
  >
    {children}
  </Link>
);

// Reusable component for mobile links
const MobileLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
  >
    {children}
  </Link>
);

export default AdminNavbar;