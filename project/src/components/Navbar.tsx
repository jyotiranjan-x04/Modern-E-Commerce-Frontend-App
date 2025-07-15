import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, User, Home, Store, Phone, Moon, Sun } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();

  const navItems = [
    { name: 'Home', icon: Home, id: 'home' },
    { name: 'Shop', icon: Store, id: 'shop' },
    { name: 'Contact', icon: Phone, id: 'contact' },
    { name: 'Cart', icon: ShoppingCart, id: 'cart' },
  ];

  const handleNavigation = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg sticky top-0 z-50 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleNavigation('home')}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>EStore</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-300 ${
                  currentPage === item.id
                    ? darkMode ? 'bg-blue-900 text-blue-400' : 'bg-blue-50 text-blue-600'
                    : darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon size={18} />
                <span>{item.name}</span>
                {item.id === 'cart' && totalItems > 0 && (
                  <motion.span
                    className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'text-yellow-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <motion.button
                  onClick={() => handleNavigation('profile')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <User size={18} />
                  <span>{user?.name}</span>
                </motion.button>
                {user?.isAdmin && (
                  <motion.button
                    onClick={() => handleNavigation('admin')}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Admin
                  </motion.button>
                )}
                <motion.button
                  onClick={logout}
                  className={`transition-colors ${
                    darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <motion.button
                  onClick={() => handleNavigation('login')}
                  className={`transition-colors ${
                    darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  Login
                </motion.button>
                <motion.button
                  onClick={() => handleNavigation('register')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Up
                </motion.button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-t`}
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors duration-300 ${
                    currentPage === item.id
                      ? darkMode ? 'bg-blue-900 text-blue-400' : 'bg-blue-50 text-blue-600'
                      : darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                  {item.id === 'cart' && totalItems > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-auto">
                      {totalItems}
                    </span>
                  )}
                </motion.button>
              ))}
              
              <hr className="my-2" />
              
              {/* Mobile Dark Mode Toggle */}
              <motion.button
                onClick={toggleDarkMode}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                  darkMode ? 'text-yellow-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </motion.button>

              {isAuthenticated ? (
                <>
                  <motion.button
                    onClick={() => handleNavigation('profile')}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                      darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <User size={20} />
                    <span>{user?.name}</span>
                  </motion.button>
                  {user?.isAdmin && (
                    <motion.button
                      onClick={() => handleNavigation('admin')}
                      className="w-full bg-purple-600 text-white px-3 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Admin Panel
                    </motion.button>
                  )}
                  <motion.button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className={`w-full transition-colors px-3 py-3 text-left ${
                      darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    Logout
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    onClick={() => handleNavigation('login')}
                    className={`w-full transition-colors px-3 py-3 text-left ${
                      darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    Login
                  </motion.button>
                  <motion.button
                    onClick={() => handleNavigation('register')}
                    className="w-full bg-blue-600 text-white px-3 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign Up
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;