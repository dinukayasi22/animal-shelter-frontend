import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AdminNavbar from './components/AdminNavbar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AvailableAnimals from './pages/AvailableAnimals';
import ManageAnimals from './components/ManageAnimals';
import AddAnimal from './components/AddAnimal';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './components/Profile';
import Donate from './pages/Donate';
import AnimalDetails from './pages/AnimalDetails';
import AboutUs from './pages/AboutUs';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import ManageUsers from './components/ManageUsers';
import ManageAdoptions from './components/ManageAdoptions';
import AdminDonations from './pages/AdminDonations';
import FeedbackForm from './components/FeedbackForm';
import AdminFeedbackView from './components/AdminFeedbackView';
// Import other components as needed

// Main App component - no Router here
function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/admin/login';

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {!isAuthRoute && (isAdminRoute ? <AdminNavbar /> : <Navbar />)}
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/animals" element={<AvailableAnimals />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/animals/:id" element={<AnimalDetails />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="feedback" element={<FeedbackForm/>} />

          {/* Protected Admin Routes */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            path="/admin/animals" 
            element={
              <ProtectedAdminRoute>
                <ManageAnimals />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            path="/admin/add-animal" 
            element={
              <ProtectedAdminRoute>
                <AddAnimal />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              <ProtectedAdminRoute>
                <ManageUsers />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            path="/admin/adoptions" 
            element={
              <ProtectedAdminRoute>
                <ManageAdoptions />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            path="/admin/donations" 
            element={
              <ProtectedAdminRoute>
                <AdminDonations />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            path="/admin/feedback" 
            element={
              <ProtectedAdminRoute>
                <AdminFeedbackView />
              </ProtectedAdminRoute>
            } 
          />
        </Routes>
      </main>
      {!isAuthRoute && (
        <footer className="bg-blue-600 text-white py-4">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} Paw Welfare Alliance (PWA). All rights reserved.</p>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
