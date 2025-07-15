import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, ArrowLeft, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BillingInfo } from '../types';

interface CheckoutProps {
  onBack: () => void;
  darkMode?: boolean;
}

const Checkout: React.FC<CheckoutProps> = ({ onBack, darkMode = false }) => {
  const { items, totalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!billingInfo.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!billingInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!billingInfo.email.trim()) newErrors.email = 'Email is required';
      if (!billingInfo.phone.trim()) newErrors.phone = 'Phone is required';
      if (!billingInfo.address.trim()) newErrors.address = 'Address is required';
      if (!billingInfo.city.trim()) newErrors.city = 'City is required';
      if (!billingInfo.state.trim()) newErrors.state = 'State is required';
      if (!billingInfo.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    }

    if (step === 2) {
      if (!billingInfo.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      if (!billingInfo.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
      if (!billingInfo.cvv.trim()) newErrors.cvv = 'CVV is required';
      if (!billingInfo.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) return;

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setOrderComplete(true);
    clearCart();
  };

  const handleInputChange = (field: keyof BillingInfo, value: string) => {
    setBillingInfo(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (orderComplete) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8 max-w-md w-full text-center`}
        >
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
            Order Complete!
          </h2>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
            Thank you for your purchase. You will receive a confirmation email shortly.
          </p>
          <motion.button
            onClick={onBack}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue Shopping
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const tax = totalPrice * 0.08;
  const shipping = totalPrice > 50 ? 0 : 9.99;
  const finalTotal = totalPrice + tax + shipping;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <span>Back to Cart</span>
        </motion.button>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= 1 ? 'bg-blue-600 text-white' : darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-300 text-gray-600'
            }`}>
              1
            </div>
            <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-blue-600' : darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= 2 ? 'bg-blue-600 text-white' : darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-300 text-gray-600'
            }`}>
              2
            </div>
            <div className={`w-16 h-1 ${currentStep >= 3 ? 'bg-blue-600' : darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= 3 ? 'bg-blue-600 text-white' : darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-300 text-gray-600'
            }`}>
              3
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <motion.div
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {currentStep === 1 && (
                <div>
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-6`}>
                    Billing Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={billingInfo.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.firstName ? 'border-red-500' : darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                        }`}
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={billingInfo.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.lastName ? 'border-red-500' : darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                        }`}
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                        Email *
                      </label>
                      <input
                        type="email"
                        value={billingInfo.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.email ? 'border-red-500' : darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                        }`}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={billingInfo.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.phone ? 'border-red-500' : darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                        }`}
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                        Address *
                      </label>
                      <input
                        type="text"
                        value={billingInfo.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.address ? 'border-red-500' : darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                        }`}
                      />
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                        City *
                      </label>
                      <input
                        type="text"
                        value={billingInfo.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.city ? 'border-red-500' : darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                        }`}
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                        State *
                      </label>
                      <input
                        type="text"
                        value={billingInfo.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.state ? 'border-red-500' : darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                        }`}
                      />
                      {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        value={billingInfo.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.zipCode ? 'border-red-500' : darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                        }`}
                      />
                      {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                        Country
                      </label>
                      <select
                        value={billingInfo.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                        }`}
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-6 flex items-center`}>
                    <CreditCard className="mr-2" />
                    Payment Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                        Card Number *
                      </label>
                      <input
                        type="text"
                        value={billingInfo.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.cardNumber ? 'border-red-500' : darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                        }`}
                      />
                      {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          value={billingInfo.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                          placeholder="MM/YY"
                          maxLength={5}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.expiryDate ? 'border-red-500' : darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                          }`}
                        />
                        {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          CVV *
                        </label>
                        <input
                          type="text"
                          value={billingInfo.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').substring(0, 4))}
                          placeholder="123"
                          maxLength={4}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.cvv ? 'border-red-500' : darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                          }`}
                        />
                        {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                      </div>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        value={billingInfo.cardName}
                        onChange={(e) => handleInputChange('cardName', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.cardName ? 'border-red-500' : darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                        }`}
                      />
                      {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                    </div>
                  </div>
                  <div className={`mt-6 p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg flex items-center`}>
                    <Lock className={`${darkMode ? 'text-green-400' : 'text-green-600'} mr-2`} size={20} />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Your payment information is secure and encrypted
                    </span>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <motion.button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className={`px-6 py-2 border rounded-lg transition-colors ${
                      darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Previous
                  </motion.button>
                )}
                {currentStep < 2 ? (
                  <motion.button
                    onClick={handleNext}
                    className="ml-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Next
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className="ml-auto bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors flex items-center space-x-2"
                    whileHover={!isProcessing ? { scale: 1.05 } : {}}
                    whileTap={!isProcessing ? { scale: 0.95 } : {}}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Lock size={16} />
                        <span>Complete Order</span>
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 sticky top-8`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
                Order Summary
              </h3>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div className="flex-1">
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'} text-sm`}>
                        {item.name}
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className={`space-y-2 pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Subtotal</span>
                  <span className={darkMode ? 'text-white' : 'text-gray-800'}>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Tax</span>
                  <span className={darkMode ? 'text-white' : 'text-gray-800'}>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Shipping</span>
                  <span className={darkMode ? 'text-white' : 'text-gray-800'}>
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className={`flex justify-between text-lg font-bold pt-2 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <span className={darkMode ? 'text-white' : 'text-gray-800'}>Total</span>
                  <span className={darkMode ? 'text-white' : 'text-gray-800'}>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;