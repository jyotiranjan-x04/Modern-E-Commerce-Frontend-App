import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import AuthForm from './components/AuthForm';
import AdminPanel from './components/AdminPanel';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    setSelectedProductId(null);
  };

  const handleAuthSuccess = () => {
    setCurrentPage('home');
  };

  const handleViewProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product-detail');
  };

  const handleBackFromProduct = () => {
    setCurrentPage('shop');
    setSelectedProductId(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const renderPage = () => {
    if (currentPage === 'product-detail' && selectedProductId) {
      return (
        <ProductDetail
          productId={selectedProductId}
          onBack={handleBackFromProduct}
          darkMode={darkMode}
        />
      );
    }

    if (currentPage === 'checkout') {
      return (
        <Checkout
          onBack={() => handleNavigation('cart')}
          darkMode={darkMode}
        />
      );
    }

    if (currentPage === 'contact') {
      return <Contact darkMode={darkMode} />;
    }

    if (currentPage === 'login' || currentPage === 'register') {
      return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300`}>
          <AuthForm
            mode={currentPage as 'login' | 'register'}
            onToggleMode={() => setCurrentPage(currentPage === 'login' ? 'register' : 'login')}
            onSuccess={handleAuthSuccess}
          />
        </div>
      );
    }

    if (currentPage === 'admin') {
      if (!isAuthenticated || !user?.isAdmin) {
        return (
          <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center transition-colors duration-300`}>
            <div className="text-center">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
                Access Denied
              </h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                You need admin privileges to access this page.
              </p>
            </div>
          </div>
        );
      }
      return <AdminPanel darkMode={darkMode} />;
    }

    if (currentPage === 'profile') {
      if (!isAuthenticated) {
        setCurrentPage('login');
        return null;
      }
      return <Profile darkMode={darkMode} />;
    }

    const pages = {
      home: <Home onNavigate={handleNavigation} onViewProduct={handleViewProduct} darkMode={darkMode} />,
      shop: <Shop onViewProduct={handleViewProduct} darkMode={darkMode} />,
      cart: <Cart onNavigate={handleNavigation} darkMode={darkMode} />,
    };

    return pages[currentPage as keyof typeof pages] || pages.home;
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <Navbar 
        currentPage={currentPage} 
        onNavigate={handleNavigation} 
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <AppContent />
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;