import React, { useState, useEffect } from 'react';

const ManageAdoptions = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedAdoption, setSelectedAdoption] = useState(null);

  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        const token = localStorage.getItem('userToken'); // Ensure you are using the correct token
        const response = await fetch('http://localhost:5000/api/adoptions', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch adoptions');
        }

        const data = await response.json();
        setAdoptions(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching adoptions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdoptions();
  }, []);

  const handleStatusChange = async (adoptionId, action) => {
    try {
      const response = await fetch(`http://localhost:5000/api/adoptions/${adoptionId}${action === 'approve' ? '/approve' : '/reject'}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        },
        body: action === 'reject' ? JSON.stringify({ rejectionReason: 'Not specified' }) : null // Add rejection reason if needed
      });

      if (!response.ok) {
        throw new Error('Failed to update adoption status');
      }

      // Refresh the adoption requests after updating
      const fetchAdoptions = async () => {
        try {
          const token = localStorage.getItem('userToken');
          const response = await fetch('http://localhost:5000/api/adoptions', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            throw new Error('Failed to fetch adoptions');
          }

          const data = await response.json();
          setAdoptions(data);
        } catch (err) {
          setError(err.message);
          console.error('Error fetching adoptions:', err);
        }
      };

      fetchAdoptions();
    } catch (error) {
      setError(error.message);
    }
  };

  const openModal = (adoption) => {
    setSelectedAdoption(adoption);
  };

  const closeModal = () => {
    setSelectedAdoption(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading adoption requests...</div>
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
      <h2 className="text-2xl font-bold mb-6">Adoption Requests</h2>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Animal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Submitted
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {adoptions.map((adoption) => (
              <tr key={adoption._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{adoption.user.name}</div>
                  <div className="text-sm text-gray-500">{adoption.user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{adoption.animal.name}</div>
                  <div className="text-sm text-gray-500">Breed: {adoption.animal.breed}</div>
                  <div className="text-sm text-gray-500">Age: {adoption.animal.age} years</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${adoption.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                    adoption.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                    'bg-red-100 text-red-800'}`}>
                    {adoption.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(adoption.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {adoption.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(adoption._id, 'approve')}
                        className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-medium"
                      >
                        Approve Adoption
                      </button>
                      <button
                        onClick={() => handleStatusChange(adoption._id, 'reject')}
                        className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium ml-2"
                      >
                        Reject Adoption
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => openModal(adoption)}
                    className="text-white bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-md text-sm font-medium ml-2"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Adoption Details */}
      {selectedAdoption && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2">
            <h3 className="text-lg font-bold mb-4">Adoption Request Details</h3>
            <div className="mb-4">
              <strong>User:</strong> {selectedAdoption.user.name} ({selectedAdoption.user.email})
            </div>
            <div className="mb-4">
              <strong>Animal:</strong> {selectedAdoption.animal.name}
            </div>
            <div className="mb-4">
              <strong>Application Details:</strong>
              <ul className="list-disc pl-5">
                <li>Housing Type: {selectedAdoption.applicationDetails.housingType}</li>
                <li>Has Yard: {selectedAdoption.applicationDetails.hasYard ? 'Yes' : 'No'}</li>
                <li>Has Other Pets: {selectedAdoption.applicationDetails.hasOtherPets ? 'Yes' : 'No'}</li>
                <li>Other Pets Details: {selectedAdoption.applicationDetails.otherPetsDetails}</li>
                <li>Has Children: {selectedAdoption.applicationDetails.hasChildren ? 'Yes' : 'No'}</li>
                <li>Children Ages: {selectedAdoption.applicationDetails.childrenAges}</li>
                <li>Work Schedule: {selectedAdoption.applicationDetails.workSchedule}</li>
                <li>Previous Pet Experience: {selectedAdoption.applicationDetails.previousPetExperience}</li>
                <li>Reason for Adopting: {selectedAdoption.applicationDetails.reasonForAdopting}</li>
              </ul>
            </div>
            <button
              onClick={closeModal}
              className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAdoptions; 