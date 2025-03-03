import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const token = localStorage.getItem('userToken');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (!data.isAdmin) {
          navigate('/');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        navigate('/login');
      }
    };

    checkAdmin();
    fetchDonations();
  }, [navigate]);

  const fetchDonations = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/donations/all', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        setDonations(data.donations);
      } else {
        throw new Error(data.message || 'Failed to fetch donations');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Donation Management</h1>
            <Link
              to="/admin/dashboard"
              className="bg-gray-100 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-200"
            >
              Back to Dashboard
            </Link>
          </div>
          
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {donations.length === 0 ? (
                <li className="p-4 text-center text-gray-500">
                  No donations found
                </li>
              ) : (
                donations.map((donation) => (
                  <li key={donation._id} className="p-4 hover:bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {donation.name}
                        </h3>
                        <p className="text-sm text-gray-500">{donation.email}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Item Type: {donation.itemType}
                        </p>
                        <p className="text-sm text-gray-500">
                          Quantity: {donation.quantity}
                        </p>
                        <p className="text-sm text-gray-500">
                          Drop-off Date: {formatDate(donation.dropOffDate)}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Contact: {donation.contactNumber}
                        </p>
                        <p className="text-sm text-gray-500">
                          Description: {donation.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          Submitted: {formatDate(donation.createdAt)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDonations; 