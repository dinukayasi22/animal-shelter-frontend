import React from 'react';
import { Link } from 'react-router-dom';
import bgImage from './bg1.jpg';
import { FaHeart, FaPaw, FaHandsHelping, FaDog, FaCat } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-500">
        <div className="absolute inset-0 opacity-90">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 md:mb-6 leading-tight">
              Find Your Furry Soulmate
            </h1>
            <p className="text-lg md:text-xl text-black mb-6 md:mb-8 opacity-95">
              Rescue, Love, Repeat - Transforming Lives One Paw at a Time
            </p>
            <Link
              to="/animals"
              className="inline-block bg-white text-blue-600 px-8 py-3 md:px-10 md:py-4 rounded-full font-semibold text-lg md:text-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Meet Our Pets 🐾
            </Link>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-blue-50 rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="text-center mb-8">
              <FaHeart className="text-4xl text-red-500 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                Our Promise to Every Animal
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                At <span className="font-semibold text-blue-600">Paw Welfare Alliance</span>, 
                we provide comprehensive care including:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: <FaDog className="text-4xl" />, title: "Medical Care", text: "Full veterinary services and rehabilitation" },
                { icon: <FaHeart className="text-4xl" />, title: "Loving Shelter", text: "Safe, clean living environments" },
                { icon: <FaCat className="text-4xl" />, title: "Adoption Services", text: "Careful matching with forever homes" }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-blue-600 mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Adoption Steps */}
      <div className="bg-gray-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <FaPaw className="text-4xl text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple Adoption Process
            </h2>
            <p className="text-lg text-gray-600">
              Your journey to pet parenthood in three easy steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: '1', title: 'Browse Friends', text: 'Explore our adorable residents' },
              { number: '2', title: 'Apply Online', text: 'Complete our easy application' },
              { number: '3', title: 'Welcome Home', text: 'Start your life together' }
            ].map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{step.title}</h3>
                <p className="text-gray-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-900 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <FaHandsHelping className="text-4xl mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Change a Life Today
          </h2>
          <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto">
            Whether through adoption, donation, or volunteering - your support makes miracles happen
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/donate"
              className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors shadow-lg"
            >
              Support Our Mission
            </Link>
            <Link
              to="/animals"
              className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-colors"
            >
              Meet Our Pets
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;