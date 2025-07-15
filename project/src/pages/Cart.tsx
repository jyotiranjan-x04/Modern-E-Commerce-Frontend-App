import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartProps {
  onNavigate: (page: string) => void;
  darkMode?: boolean;
}

const Cart: React.FC<CartProps> = ({ onNavigate, darkMode = false }) => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    onNavigate('checkout');
  };

  if (items.length === 0) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center transition-colors duration-300`}>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={`w-24 h-24 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
            <ShoppingBag className={`w-12 h-12 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
          </div>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
            Your cart is empty
          </h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
            Add some products to get started!
          </p>
          <motion.button
            onClick={() => onNavigate('shop')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Shopping
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Shopping Cart
          </h1>
          <motion.button
            onClick={clearCart}
            className={`transition-colors ${
              darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            Clear Cart
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    className={`flex items-center p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} last:border-b-0`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg mr-4"
                    />
                    <div className="flex-1">
                      <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {item.name}
                      </h3>
                      {item.variant && (
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {item.variant.name}: {item.variant.value}
                        </p>
                      )}
                      <p className="text-lg font-bold text-blue-600 mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className={`flex items-center border rounded-lg ${
                        darkMode ? 'border-gray-600' : 'border-gray-300'
                      }`}>
                        <motion.button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className={`p-2 transition-colors ${
                            darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Minus size={16} />
                        </motion.button>
                        <span className={`px-4 py-2 font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          {item.quantity}
                        </span>
                        <motion.button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className={`p-2 transition-colors ${
                            darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Plus size={16} />
                        </motion.button>
                      </div>
                      <motion.button
                        onClick={() => removeFromCart(item.id)}
                        className={`p-2 transition-colors ${
                          darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 size={20} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 sticky top-8`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
                Order Summary
              </h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Items ({totalItems})
                  </span>
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Shipping</span>
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tax</span>
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    ${(totalPrice * 0.08).toFixed(2)}
                  </span>
                </div>
                <hr className={darkMode ? 'border-gray-700' : 'border-gray-200'} />
                <div className={`flex justify-between text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  <span>Total</span>
                  <span>${(totalPrice * 1.08).toFixed(2)}</span>
                </div>
              </div>

              <motion.button
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Proceed to Checkout
              </motion.button>

              <div className="mt-4 text-center">
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Free shipping on orders over $50
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;