import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ManageAnimals = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/animals', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch animals');
        }
        const data = await response.json();
        setAnimals(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this animal?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/animals/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete animal');
        }

        setAnimals(animals.filter((animal) => animal._id !== id));
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Animals</h2>
        <Link
          to="/admin/animals/add"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Add New Animal
        </Link>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Species</th>
                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Breed</th>
                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health</th>
                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medical Notes</th>
                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {animals.filter(animal => animal.status !== 'Archived').map((animal) => (
                <tr key={animal._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img 
                      src={`http://localhost:5000/${animal.image.replace(/\\/g, '/')}`}
                      alt={animal.name} 
                      className="w-20 h-20 object-cover rounded" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/fallback-image.jpg';
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{animal.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{animal.species}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{animal.breed}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{animal.age} years</td>
                  <td className="px-6 py-4 whitespace-nowrap">{animal.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{animal.size}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p>{animal.healthStatus}</p>
                      <p className="text-sm text-gray-500">
                        {animal.vaccinated ? '✓ Vaccinated' : '✗ Not Vaccinated'} | 
                        {animal.neutered ? '✓ Neutered' : '✗ Not Neutered'}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${animal.status === 'Available' ? 'bg-green-100 text-green-800' : 
                        animal.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-blue-100 text-blue-800'}`}>
                      {animal.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs overflow-hidden text-sm">
                      {animal.medicalNotes || 'No medical notes'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => handleDelete(animal._id)}
                      className="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-full text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageAnimals;