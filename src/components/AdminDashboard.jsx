import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await fetch('http://localhost:5000/api/admin/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard statistics');
        }

        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-gray-500 text-sm mb-2">Total Animals</div>
          <div className="text-3xl font-bold text-blue-600">{stats?.totalAnimals || 0}</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-gray-500 text-sm mb-2">Available Animals</div>
          <div className="text-3xl font-bold text-green-600">{stats?.availableAnimals || 0}</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-gray-500 text-sm mb-2">Pending Adoptions</div>
          <div className="text-3xl font-bold text-yellow-600">{stats?.pendingAdoptions || 0}</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-gray-500 text-sm mb-2">Total Users</div>
          <div className="text-3xl font-bold text-purple-600">{stats?.totalUsers || 0}</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link to="/admin/add-animal" className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-4 text-center transition duration-300">
          Add New Animal
        </Link>
        <Link to="/admin/animals" className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-4 text-center transition duration-300">
          Manage Animals
        </Link>
        <Link to="/admin/users" className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg p-4 text-center transition duration-300">
          Manage Users
        </Link>
        <Link to="/admin/donations" className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg p-4 text-center transition duration-300">
          View Donations
        </Link>
        <Link to="/admin/feedback" className="bg-teal-500 hover:bg-teal-600 text-white rounded-lg p-4 text-center transition duration-300">
          View Feedback
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Adoptions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Recent Adoption Requests</h2>
          <div className="space-y-4">
            {stats?.recentAdoptions.slice(0, 4).map((adoption) => (
              <div key={adoption._id} className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{adoption.user.name}</div>
                    <div className="text-sm text-gray-500">
                      Animal: {adoption.animal.name}
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${adoption.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                    adoption.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                    'bg-red-100 text-red-800'}`}>
                    {adoption.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {new Date(adoption.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
          <Link to="/admin/adoptions" className="text-blue-500 hover:text-blue-600 text-sm mt-4 inline-block">
            View all adoption requests →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;