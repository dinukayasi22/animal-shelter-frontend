import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AdoptionPayment from '../components/AdoptionPayment';

const AnimalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAdoptModal, setShowAdoptModal] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [adoptionId, setAdoptionId] = useState(null);
  const [adoptionRequest, setAdoptionRequest] = useState({
    applicationDetails: {
      housingType: '',
      hasYard: false,
      hasOtherPets: false,
      otherPetsDetails: '',
      hasChildren: false,
      childrenAges: '',
      workSchedule: '',
      previousPetExperience: '',
      reasonForAdopting: ''
    },
    animalId: '',
    userId: ''
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchAnimalDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/animals/${id}`);
        if (!response.ok) {
          throw new Error('Animal not found');
        }
        const data = await response.json();
        setAnimal(data);
        setAdoptionRequest(prev => ({
          ...prev,
          animalId: data._id,
          userId: localStorage.getItem('userId')
        }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Check if user is authenticated
    const userToken = localStorage.getItem('userToken');
    setIsAuthenticated(!!userToken);

    fetchAnimalDetails();
  }, [id]);

  const handleAdoptionRequestChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setAdoptionRequest(prev => ({
      ...prev,
      applicationDetails: {
        ...prev.applicationDetails,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };

  const handleAdoptSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:5000/api/adoptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        },
        body: JSON.stringify(adoptionRequest)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit adoption request');
      }

      const data = await response.json();
      setAdoptionId(data._id);
      setShowAdoptModal(false);
      setShowPayment(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    navigate('/profile', { 
      state: { message: 'Adoption request submitted and payment completed successfully!' } 
    });
  };

  const handleAdoptClick = () => {
    if (!isAuthenticated) {
      // Redirect to login page with return URL
      navigate('/login', { 
        state: { 
          returnUrl: `/animals/${id}`,
          message: 'Please log in to submit an adoption request.' 
        } 
      });
      return;
    }
    setShowAdoptModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!animal) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Main Info Section */}
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-1/2">
              <div className="relative h-0 pb-[75%]"> {/* 4:3 aspect ratio */}
                <img
                  src={`http://localhost:5000/${animal.image}`}
                  alt={animal.name}
                  className="w-full h-full object-cover absolute top-0 left-0 rounded-xl"
                />
              </div>
            </div>

            {/* Basic Information */}
            <div className="md:w-1/2 p-8">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-gray-900">{animal.name}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  animal.status === 'Available' 
                    ? 'bg-green-100 text-green-800' 
                    : animal.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {animal.status}
                </span>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Species</h3>
                  <p className="mt-1 text-lg text-gray-900">{animal.species}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Breed</h3>
                  <p className="mt-1 text-lg text-gray-900">{animal.breed}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Age</h3>
                  <p className="mt-1 text-lg text-gray-900">{animal.age} years</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Gender</h3>
                  <p className="mt-1 text-lg text-gray-900">{animal.gender}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Size</h3>
                  <p className="mt-1 text-lg text-gray-900">{animal.size}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Intake Date</h3>
                  <p className="mt-1 text-lg text-gray-900">
                    {new Date(animal.intakeDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Health Information */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Health Information</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Health Status</h3>
                    <p className="mt-1 text-lg text-gray-900">{animal.healthStatus}</p>
                  </div>
                  <div className="flex space-x-6">
                    <div className="flex items-center">
                      <svg className={`h-5 w-5 ${animal.vaccinated ? 'text-green-500' : 'text-gray-400'}`} 
                           fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2">Vaccinated</span>
                    </div>
                    <div className="flex items-center">
                      <svg className={`h-5 w-5 ${animal.neutered ? 'text-green-500' : 'text-gray-400'}`} 
                           fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2">Neutered/Spayed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical Notes */}
              {animal.medicalNotes && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-500">Medical Notes</h3>
                  <div className="mt-2 p-4 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-700 whitespace-pre-line">
                      {animal.medicalNotes}
                    </p>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500">About {animal.name}</h3>
                <p className="mt-2 text-gray-700">{animal.description}</p>
              </div>

              {/* Adoption Button */}
              {animal.status === 'Available' && (
                <button
                  onClick={handleAdoptClick}
                  className="mt-8 w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {isAuthenticated ? `Request to Adopt ${animal.name}` : `Login to Adopt ${animal.name}`}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Updated Adoption Request Modal */}
      {showAdoptModal && isAuthenticated && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Adoption Request for {animal.name}
              </h2>
              <form onSubmit={handleAdoptSubmit} className="space-y-6">
                {/* Housing Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Housing Type *
                  </label>
                  <select
                    name="housingType"
                    required
                    value={adoptionRequest.applicationDetails.housingType}
                    onChange={handleAdoptionRequestChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select housing type...</option>
                    <option value="House">House</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Yard */}
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="hasYard"
                      checked={adoptionRequest.applicationDetails.hasYard}
                      onChange={handleAdoptionRequestChange}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Do you have a yard? *</span>
                  </label>
                </div>

                {/* Other Pets */}
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="hasOtherPets"
                      checked={adoptionRequest.applicationDetails.hasOtherPets}
                      onChange={handleAdoptionRequestChange}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Do you have other pets? *</span>
                  </label>
                  {adoptionRequest.applicationDetails.hasOtherPets && (
                    <textarea
                      name="otherPetsDetails"
                      value={adoptionRequest.applicationDetails.otherPetsDetails}
                      onChange={handleAdoptionRequestChange}
                      placeholder="Please describe your other pets..."
                      className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      rows="3"
                    />
                  )}
                </div>

                {/* Children */}
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="hasChildren"
                      checked={adoptionRequest.applicationDetails.hasChildren}
                      onChange={handleAdoptionRequestChange}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Do you have children? *</span>
                  </label>
                  {adoptionRequest.applicationDetails.hasChildren && (
                    <input
                      type="text"
                      name="childrenAges"
                      value={adoptionRequest.applicationDetails.childrenAges}
                      onChange={handleAdoptionRequestChange}
                      placeholder="Children's ages (comma-separated, e.g.: 5, 7, 10)"
                      className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  )}
                </div>

                {/* Work Schedule */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Work Schedule *
                  </label>
                  <textarea
                    name="workSchedule"
                    required
                    value={adoptionRequest.applicationDetails.workSchedule}
                    onChange={handleAdoptionRequestChange}
                    placeholder="Describe your typical work schedule..."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows="2"
                  />
                </div>

                {/* Previous Pet Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Previous Pet Experience *
                  </label>
                  <textarea
                    name="previousPetExperience"
                    required
                    value={adoptionRequest.applicationDetails.previousPetExperience}
                    onChange={handleAdoptionRequestChange}
                    placeholder="Describe your experience with pets..."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows="3"
                  />
                </div>

                {/* Reason for Adopting */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Why would you like to adopt {animal.name}? *
                  </label>
                  <textarea
                    name="reasonForAdopting"
                    required
                    value={adoptionRequest.applicationDetails.reasonForAdopting}
                    onChange={handleAdoptionRequestChange}
                    placeholder="Please share your reasons for wanting to adopt..."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows="4"
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAdoptModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPayment && isAuthenticated && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Complete Adoption Payment for {animal.name}
              </h2>
              <div className="mb-4">
                <p className="text-gray-600">
                  To complete your adoption request, please pay the adoption fee of LKR 4,000.
                </p>
              </div>
              <AdoptionPayment 
                adoptionId={adoptionId} 
                onSuccess={handlePaymentSuccess}
              />
              <button
                type="button"
                onClick={() => setShowPayment(false)}
                className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimalDetails; 