import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Edit, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ProfileProps {
  darkMode?: boolean;
}

const Profile: React.FC<ProfileProps> = ({ darkMode = false }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345',
  });

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, City, State 12345',
    });
    setIsEditing(false);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Profile</h1>
          {!isEditing && (
            <motion.button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Edit size={18} />
              <span>Edit Profile</span>
            </motion.button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <motion.div
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 text-center`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-white" />
              </div>
              <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
                {user?.name}
              </h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{user?.email}</p>
              {user?.isAdmin && (
                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                  Admin
                </span>
              )}
            </motion.div>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2">
            <motion.div
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Personal Information
                </h3>
                {isEditing && (
                  <div className="flex space-x-2">
                    <motion.button
                      onClick={handleSave}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Save size={16} />
                      <span>Save</span>
                    </motion.button>
                    <motion.button
                      onClick={handleCancel}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X size={16} />
                      <span>Cancel</span>
                    </motion.button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Full Name
                  </label>
                  <div className="flex items-center space-x-3">
                    <User className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                        }`}
                      />
                    ) : (
                      <span className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{formData.name}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Email Address
                  </label>
                  <div className="flex items-center space-x-3">
                    <Mail className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                        }`}
                      />
                    ) : (
                      <span className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{formData.email}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Phone Number
                  </label>
                  <div className="flex items-center space-x-3">
                    <Phone className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                        }`}
                      />
                    ) : (
                      <span className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{formData.phone}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Address
                  </label>
                  <div className="flex items-center space-x-3">
                    <MapPin className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                        }`}
                      />
                    ) : (
                      <span className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{formData.address}</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Order History */}
        <motion.div
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 mt-8`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-6`}>
            Order History
          </h3>
          <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <p>No orders yet. Start shopping to see your order history!</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;