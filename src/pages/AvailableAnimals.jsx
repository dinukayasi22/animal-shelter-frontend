import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AvailableAnimals = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    species: '',
    size: '',
    gender: ''
  });

  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/animals');
      if (!response.ok) {
        throw new Error('Failed to fetch animals');
      }
      const data = await response.json();
      setAnimals(data.filter(animal => animal.status === 'Available'));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredAnimals = animals.filter(animal => {
    return (
      (!filters.species || animal.species.toLowerCase().includes(filters.species.toLowerCase())) &&
      (!filters.size || animal.size === filters.size) &&
      (!filters.gender || animal.gender === filters.gender)
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="species"
            placeholder="Search by species..."
            value={filters.species}
            onChange={handleFilterChange}
            className="border rounded-md px-4 py-2"
          />
          <select
            name="size"
            value={filters.size}
            onChange={handleFilterChange}
            className="border rounded-md px-4 py-2"
          >
            <option value="">All Sizes</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
          <select
            name="gender"
            value={filters.gender}
            onChange={handleFilterChange}
            className="border rounded-md px-4 py-2"
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>

      {/* Animals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAnimals.map((animal) => (
          <div key={animal._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={`http://localhost:5000/${animal.image.replace(/\\/g, '/')}`}
              alt={animal.name}
              className="w-full h-64 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/fallback-image.jpg';
              }}
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{animal.name}</h3>
              <div className="text-gray-600 mb-2">
                <p>{animal.breed} • {animal.age} years old</p>
                <p>{animal.gender} • {animal.size}</p>
              </div>
              <p className="text-gray-500 mb-4 line-clamp-2">{animal.description}</p>
              <Link
                to={`/animals/${animal._id}`}
                className="block text-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredAnimals.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No animals found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default AvailableAnimals; 