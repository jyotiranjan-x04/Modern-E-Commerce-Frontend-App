import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onViewProduct: (productId: string) => void;
  darkMode?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewProduct, darkMode = false }) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product.id, product.name, product.price, product.image, selectedVariant);
  };

  const isOutOfStock = product.stock === 0;

  return (
    <motion.div
      className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300`}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover cursor-pointer"
          onClick={() => onViewProduct(product.id)}
        />
        
        {/* Discount Badge */}
        {product.originalPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}
        
        <motion.button
          className={`absolute top-3 right-12 p-2 rounded-full ${
            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-600'
          } shadow-md hover:shadow-lg transition-shadow`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onViewProduct(product.id)}
        >
          <Eye size={16} />
        </motion.button>
        
        <motion.button
          className={`absolute top-3 right-3 p-2 rounded-full ${
            isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
          } shadow-md hover:shadow-lg transition-shadow`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
        </motion.button>
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 
            className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-800'} line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors`}
            onClick={() => onViewProduct(product.id)}
          >
            {product.name}
          </h3>
          <span className={`text-sm ${darkMode ? 'text-gray-400 bg-gray-700' : 'text-gray-500 bg-gray-100'} px-2 py-1 rounded`}>
            {product.category}
          </span>
        </div>

        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-3 line-clamp-2`}>
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : darkMode ? 'text-gray-600' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className={`ml-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600">${product.price}</span>
            {product.originalPrice && (
              <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'} line-through`}>
                ${product.originalPrice}
              </span>
            )}
          </div>
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Stock: {product.stock}
          </span>
        </div>

        {product.variants.length > 0 && (
          <div className="mb-4">
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              {product.variants[0].name}:
            </label>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant) => (
                <motion.button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors duration-300 ${
                    selectedVariant?.id === variant.id
                      ? 'bg-blue-600 text-white'
                      : darkMode 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isOutOfStock}
                >
                  {variant.value}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        <motion.button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium transition-colors duration-300 ${
            isOutOfStock
              ? darkMode 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
          whileHover={!isOutOfStock ? { scale: 1.02 } : {}}
          whileTap={!isOutOfStock ? { scale: 0.98 } : {}}
        >
          <ShoppingCart size={18} />
          <span>{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;