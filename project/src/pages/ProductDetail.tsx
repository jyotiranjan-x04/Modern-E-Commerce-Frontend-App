import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Heart, Star, Shield, Truck, RotateCcw } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { ProductVariant } from '../types';
import Carousel from '../components/Carousel';

interface ProductDetailProps {
  productId: string;
  onBack: () => void;
  darkMode?: boolean;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId, onBack, darkMode = false }) => {
  const { getProduct } = useProducts();
  const { addToCart } = useCart();
  const product = getProduct(productId);
  
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product?.variants.length ? product.variants[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  if (!product) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
            Product not found
          </h2>
          <button
            onClick={onBack}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product.id, product.name, product.price, product.image, selectedVariant);
    }
  };

  const isOutOfStock = product.stock === 0;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          onClick={onBack}
          className={`flex items-center space-x-2 mb-8 ${
            darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'
          } transition-colors`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} />
          <span>Back to Shop</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Carousel images={product.images} darkMode={darkMode} />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Brand and Category */}
            <div className="flex items-center justify-between">
              <span className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'} font-medium`}>
                {product.brand}
              </span>
              <span className={`text-sm ${darkMode ? 'text-gray-400 bg-gray-700' : 'text-gray-500 bg-gray-100'} px-3 py-1 rounded-full`}>
                {product.category}
              </span>
            </div>

            {/* Product Name */}
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={`${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : darkMode ? 'text-gray-600' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-blue-600">${product.price}</span>
              {product.originalPrice && (
                <span className={`text-xl ${darkMode ? 'text-gray-500' : 'text-gray-400'} line-through`}>
                  ${product.originalPrice}
                </span>
              )}
              {product.originalPrice && (
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            {/* Description */}
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
              {product.description}
            </p>

            {/* Features */}
            <div>
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-3`}>
                Key Features
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Variants */}
            {product.variants.length > 0 && (
              <div>
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-3`}>
                  {product.variants[0].name}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant) => (
                    <motion.button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                        selectedVariant?.id === variant.id
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : darkMode
                            ? 'border-gray-600 text-gray-300 hover:border-gray-500'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
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

            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mr-3`}>
                  Quantity:
                </label>
                <div className={`flex items-center border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-lg`}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className={`px-3 py-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
                    disabled={isOutOfStock}
                  >
                    -
                  </button>
                  <span className={`px-4 py-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className={`px-3 py-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
                    disabled={isOutOfStock}
                  >
                    +
                  </button>
                </div>
              </div>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {product.stock} in stock
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <motion.button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-semibold transition-colors ${
                  isOutOfStock
                    ? darkMode 
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                whileHover={!isOutOfStock ? { scale: 1.02 } : {}}
                whileTap={!isOutOfStock ? { scale: 0.98 } : {}}
              >
                <ShoppingCart size={20} />
                <span>{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
              </motion.button>

              <motion.button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  isLiked
                    ? 'border-red-500 bg-red-500 text-white'
                    : darkMode
                      ? 'border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-500'
                      : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
              </motion.button>
            </div>

            {/* Guarantees */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center space-x-3">
                <Truck className={`${darkMode ? 'text-green-400' : 'text-green-600'}`} size={20} />
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Free Shipping</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`} size={20} />
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>30-Day Returns</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Easy returns</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className={`${darkMode ? 'text-purple-400' : 'text-purple-600'}`} size={20} />
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Warranty</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>2-year coverage</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`mt-16 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8`}
        >
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-6`}>
            Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className={`flex justify-between py-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{key}</span>
                <span className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;