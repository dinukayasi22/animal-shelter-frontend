import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddAnimal = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [image, setImage] = useState(null);

  // Initialize formData state
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    size: '',
    healthStatus: '',
    vaccinated: false,
    neutered: false,
    description: '',
    status: 'Available',
    medicalNotes: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!image) {
        throw new Error('Please upload an image');
      }

      // Create FormData and append all fields
      const formDataToSend = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      
      // Append the image
      formDataToSend.append('image', image);

      // Log the data being sent
      for (let pair of formDataToSend.entries()) {
        console.log('Sending:', pair[0], pair[1]);
      }

      const response = await fetch('http://localhost:5000/api/animals', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        },
        body: formDataToSend
      });

      const data = await response.json();
      console.log('Response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add animal');
      }

      navigate('/admin/animals');
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Add form validation
  const validateForm = () => {
    if (!formData.name || !formData.species || !formData.breed || 
        !formData.age || !formData.gender || !formData.size || 
        !formData.healthStatus || !formData.description) {
      setError('Please fill in all required fields');
      return false;
    }
    if (!image) {
      setError('Please upload an image');
      return false;
    }
    return true;
  };

  // Update the form submission to include validation
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    await handleSubmit(e);
  };

  return (
    <form onSubmit={handleFormSubmit} className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Animal</h2>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

      {/* Basic Information */}
      <div className="space-y-4">
        <div>
          <label className="block mb-1">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Species *</label>
          <input
            type="text"
            name="species"
            value={formData.species}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Breed *</label>
          <input
            type="text"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Age *</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Gender *</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Size *</label>
          <select
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Health Status *</label>
          <input
            type="text"
            name="healthStatus"
            value={formData.healthStatus}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="flex space-x-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="vaccinated"
              checked={formData.vaccinated}
              onChange={handleChange}
              className="mr-2"
            />
            <label>Vaccinated</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="neutered"
              checked={formData.neutered}
              onChange={handleChange}
              className="mr-2"
            />
            <label>Neutered</label>
          </div>
        </div>

        <div>
          <label className="block mb-1">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Status *</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="Available">Available</option>
            <option value="Pending">Pending</option>
            <option value="Adopted">Adopted</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Image *</label>
          <input
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded"
            accept="image/*"
            required
          />
        </div>

        {/* Medical Notes */}
        <div className="mb-4">
          <label className="block mb-1">Medical Notes</label>
          <textarea
            name="medicalNotes"
            value={formData.medicalNotes}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            placeholder="Enter medical notes..."
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'Adding...' : 'Add Animal'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddAnimal;