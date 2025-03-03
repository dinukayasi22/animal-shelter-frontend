import React, { useEffect, useState } from 'react';
import { FaHeart, FaPaw, FaUsers, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import axios from 'axios';

const AboutUs = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/feedback?limit=6');
        setFeedbacks(data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-500 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Our Shelter</h1>
          <p className="text-xl md:text-2xl opacity-95">Providing loving homes since 2010</p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-600 flex items-center">
              <FaHeart className="mr-3 text-red-500" /> Our Mission
            </h2>
            <div className="space-y-4 text-gray-700 text-lg">
              <p className="leading-relaxed">
                At <span className="font-semibold text-blue-600">Paw Welfare Alliance (PWA)</span>, 
                we're dedicated to transforming the lives of stray, abandoned, and abused animals 
                in Kandy, Sri Lanka.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="mb-4">
                  🐾 We rescue, shelter, and find forever homes for dogs and cats in need
                </p>
                <p className="mb-4">
                  🏥 Provide essential medical care and rehabilitation
                </p>
                <p className="mb-4">
                  🌍 Promote humane population control through sterilization programs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: <FaPaw />, number: '2,000+', label: 'Animals Adopted' },
              { icon: <FaUsers />, number: '50+', label: 'Dedicated Volunteers' },
              { icon: <FaHeart />, number: '13', label: 'Years of Service' },
            ].map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="text-blue-600 text-4xl mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-blue-600">
            What People Say About Us
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedbacks.map((feedback) => (
              <div key={feedback._id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{feedback.name}</h3>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "{feedback.description}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-600 flex items-center">
              <FaMapMarkerAlt className="mr-3" /> Visit Us
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="mt-1 mr-3 text-blue-600" />
                  <div>
                    <p className="font-medium">Shelter Address:</p>
                    <p>123 Animal Care Lane<br/>Kandy, Sri Lanka</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaPhone className="mr-3 text-blue-600" />
                  <div>
                    <p className="font-medium">Phone:</p>
                    <p>+94 77 123 4567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="mr-3 text-blue-600" />
                  <div>
                    <p className="font-medium">Email:</p>
                    <p>contact@pawshelter.lk</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FaClock className="mr-2 text-blue-600" /> Hours of Operation
                </h3>
                <div className="space-y-2">
                  {[
                    ['Monday - Friday', '9:00 AM - 6:00 PM'],
                    ['Saturday', '10:00 AM - 5:00 PM'],
                    ['Sunday', '12:00 PM - 4:00 PM']
                  ].map(([days, hours], index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-600">{days}</span>
                      <span className="text-gray-800 font-medium">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Team members data removed as per request

export default AboutUs; 