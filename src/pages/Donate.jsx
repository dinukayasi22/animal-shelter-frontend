import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Donate = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [donationType, setDonationType] = useState('money');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    itemType: '',
    description: '',
    quantity: '',
    dropOffDate: '',
    contactNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        setUserData(data);
        setFormData(prev => ({
          ...prev,
          name: data.name,
          email: data.email
        }));
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  const handleDonationTypeChange = (e) => {
    setDonationType(e.target.value);
    setError('');
    setSuccess('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/donations/goods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(isLoggedIn && { 'Authorization': `Bearer ${localStorage.getItem('userToken')}` })
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccess('Thank you for your donation! We will contact you about the drop-off.');
        setFormData({
          name: userData?.name || '',
          email: userData?.email || '',
          itemType: '',
          description: '',
          quantity: '',
          dropOffDate: '',
          contactNumber: ''
        });
      } else {
        throw new Error('Failed to submit donation');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Support Our Animal Shelter
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Your donations help us provide care for animals in need
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Money Donations Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Bank Transfer Details</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-6 rounded-lg">
                <dl className="space-y-4">
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-500">Bank:</dt>
                    <dd className="font-semibold text-gray-900">Peoples Bank</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-500">Account Number:</dt>
                    <dd className="font-semibold text-gray-900">057-2-224-5-0044554</dd>
                  </div>
                </dl>
              </div>
              <p className="text-sm text-gray-600 italic">
                Please include "Paw Welfare Alliance (PWA) Donation" in your transfer description
              </p>
            </div>
          </div>

          {/* Goods Donations Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Donate Goods</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name and Email fields (disabled if logged in) */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isLoggedIn}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoggedIn}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
              </div>

              {/* Item Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Item Type</label>
                <select
                  name="itemType"
                  value={formData.itemType}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select item type</option>
                  <option value="blankets">Blankets</option>
                  <option value="towels">Towels</option>
                  <option value="beds">Dog/Cat Beds</option>
                  <option value="food">Unopened Dog/Cat Food</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Please describe the items you wish to donate..."
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  min="1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Drop-off Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Preferred Drop-off Date</label>
                <input
                  type="date"
                  name="dropOffDate"
                  value={formData.dropOffDate}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm rounded-md bg-red-50 p-3">
                  {error}
                </div>
              )}

              {success && (
                <div className="text-green-600 text-sm rounded-md bg-green-50 p-3">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Donation'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate; 