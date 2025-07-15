import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Users, Shield } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import Carousel from '../components/Carousel';

interface HomeProps {
  onNavigate: (page: string) => void;
  onViewProduct: (productId: string) => void;
  darkMode?: boolean;
}

const Home: React.FC<HomeProps> = ({ onNavigate, onViewProduct, darkMode = false }) => {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 3);
  const heroImages = [
    'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ];

  const features = [
    {
      icon: ShoppingBag,
      title: 'Wide Selection',
      description: 'Thousands of products across multiple categories',
    },
    {
      icon: Star,
      title: 'Quality Guaranteed',
      description: 'Only the best products from trusted brands',
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: '24/7 customer service to help you',
    },
    {
      icon: Shield,
      title: 'Secure Shopping',
      description: 'Your data and payments are always protected',
    },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white overflow-hidden">
        {/* Background Carousel */}
        <div className="absolute inset-0 opacity-20">
          <Carousel images={heroImages} autoPlay={true} interval={4000} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center relative z-10">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Welcome to EStore
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 text-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover amazing products at unbeatable prices
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.button
                onClick={() => onNavigate('shop')}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Now
              </motion.button>
              <motion.button
                onClick={() => onNavigate('register')}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Today
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
              Why Choose EStore?
            </h2>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              We're committed to providing the best shopping experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`text-center p-6 ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-md hover:shadow-lg transition-all duration-300`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
                  {feature.title}
                </h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
              Featured Products
            </h2>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Discover our most popular items
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onViewProduct={onViewProduct}
                darkMode={darkMode}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <motion.button
              onClick={() => onNavigate('shop')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Products
            </motion.button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`${darkMode ? 'bg-gradient-to-r from-blue-700 to-purple-800' : 'bg-blue-600'} text-white py-20 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of satisfied customers and discover amazing deals
          </p>
          <motion.button
            onClick={() => onNavigate('register')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Today
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default Home;