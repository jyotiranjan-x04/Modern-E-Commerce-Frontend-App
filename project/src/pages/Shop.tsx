import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

interface ShopProps {
  onViewProduct: (productId: string) => void;
  darkMode?: boolean;
}

const Shop: React.FC<ShopProps> = ({ onViewProduct, darkMode = false }) => {
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || product.category === selectedCategory)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>Shop</h1>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Discover our amazing collection of products
          </p>
        </div>

        {/* Filters */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 mb-8`}>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                }`}
              />
            </div>

            {/* Category Filter */}
            <div className="flex-1">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                }`}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex-1">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                }`}
              >
                <option value="name">Sort by Name</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {/* View Mode */}
            <div className={`flex border rounded-lg overflow-hidden ${
              darkMode ? 'border-gray-600' : 'border-gray-300'
            }`}>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-blue-600 text-white' 
                    : darkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-white text-gray-700 hover:bg-blue-50'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : darkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-white text-gray-700 hover:bg-blue-50'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        <motion.div
          className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
              : 'grid-cols-1'
          }`}
          layout
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard 
                product={product} 
                onViewProduct={onViewProduct}
                darkMode={darkMode}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={`w-24 h-24 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <Filter className={`w-12 h-12 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            </div>
            <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
              No products found
            </h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Shop;