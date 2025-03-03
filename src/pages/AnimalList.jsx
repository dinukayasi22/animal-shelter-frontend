import React, { useEffect, useState } from 'react';

const AnimalList = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/animals');
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

  if (loading) return <p>Loading animals...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Available Animals for Adoption</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {animals.map((animal) => (
          <div key={animal._id} className="border rounded p-4">
            <div className="relative h-0 pb-[75%] overflow-hidden rounded-lg group">
              <img 
                src={animal.image} 
                alt={animal.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="text-xl font-semibold mt-2">{animal.name}</h3>
            <p>Breed: {animal.breed}</p>
            <p>Age: {animal.age} years</p>
            <p>Status: {animal.status}</p>
            <button className="mt-2 bg-blue-500 text-white p-2 rounded">
              Adopt {animal.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimalList; 