import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminFeedbackView = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/feedback', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch feedbacks');
        }

        const data = await response.json();
        setFeedbacks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleDeleteFeedback = async (feedbackId) => {
    try {
      await axios.delete(`http://localhost:5000/api/feedback/${feedbackId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      
      // Remove deleted feedback from state
      setFeedbacks(feedbacks.filter(fb => fb._id !== feedbackId));
    } catch (err) {
      console.error('Error deleting feedback:', err);
      setError(err.response?.data?.message || 'Failed to delete feedback');
    }
  };

  if (loading) return <div>Loading feedbacks...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-2 sm:px-4 py-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 px-2">Feedback Submissions</h2>
      
      {feedbacks.length === 0 ? (
        <div>No feedbacks available.</div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-50">
                <tr>
                  <th className="py-2 px-2 sm:px-3">Name</th>
                  <th className="py-2 px-2 sm:px-3">Email</th>
                  <th className="py-2 px-2 sm:px-3 hidden xs:table-cell">Contact</th>
                  <th className="py-2 px-2 sm:px-3">Message</th>
                  <th className="py-2 px-2 sm:px-3">Date</th>
                  <th className="py-3 px-2 sm:px-4 text-left text-xs sm:text-sm font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {feedbacks.map((feedback, index) => (
                  <tr key={feedback._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-2 px-2 sm:px-3">{feedback.name}</td>
                    <td className="py-2 px-2 sm:px-3 truncate max-w-[120px] sm:max-w-none">
                      {feedback.email}
                    </td>
                    <td className="py-2 px-2 sm:px-3 hidden xs:table-cell">
                      {feedback.contactNo}
                    </td>
                    <td className="py-2 px-2 sm:px-3 max-w-[150px] truncate">
                      {feedback.description}
                    </td>
                    <td className="py-2 px-2 sm:px-3 whitespace-nowrap">
                      {new Date(feedback.createdAt).toLocaleDateString('en-GB')}
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-sm text-gray-600 whitespace-nowrap">
                      <button
                        onClick={() => handleDeleteFeedback(feedback._id)}
                        className="text-red-600 hover:text-red-900 font-medium"
                        title="Delete Feedback"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFeedbackView; 