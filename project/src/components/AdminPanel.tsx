import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { Product, ProductVariant } from '../types';

interface AdminPanelProps {
  darkMode?: boolean;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ darkMode = false }) => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    category: '',
    stock: '',
    description: '',
    features: [],
    specifications: {},
    rating: 4.5,
    reviews: 0,
    brand: '',
    variants: [] as ProductVariant[],
  });

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      image: '',
      category: '',
      stock: '',
      description: '',
      features: [],
      specifications: {},
      rating: 4.5,
      reviews: 0,
      brand: '',
      variants: [],
    });
    setShowAddForm(false);
    setEditingProduct(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      image: formData.image,
      category: formData.category,
      stock: parseInt(formData.stock),
      description: formData.description,
      features: formData.features,
      specifications: formData.specifications,
      rating: formData.rating,
      reviews: formData.reviews,
      brand: formData.brand,
      variants: formData.variants,
      images: [formData.image],
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }

    resetForm();
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      category: product.category,
      stock: product.stock.toString(),
      description: product.description,
      features: product.features,
      specifications: product.specifications,
      rating: product.rating,
      reviews: product.reviews,
      brand: product.brand,
      variants: product.variants,
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const addVariant = () => {
    const newVariant: ProductVariant = {
      id: Date.now().toString(),
      name: 'Color',
      value: '',
    };
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, newVariant],
    }));
  };

  const updateVariant = (index: number, field: keyof ProductVariant, value: string) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[index] = { ...updatedVariants[index], [field]: value };
    setFormData(prev => ({ ...prev, variants: updatedVariants }));
  };

  const removeVariant = (index: number) => {
    const updatedVariants = formData.variants.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, variants: updatedVariants }));
  };

  return (
    <motion.div
      className={`max-w-6xl mx-auto p-6 min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Admin Dashboard
        </h1>
        <motion.button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={20} />
          <span>Add Product</span>
        </motion.button>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}
            whileHover={{ y: -5 }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {product.name}
              </h3>
              <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {product.category}
              </p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-blue-600">${product.price}</span>
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Stock: {product.stock}
                </span>
              </div>
              <div className="flex space-x-2">
                <motion.button
                  onClick={() => handleEdit(product)}
                  className="flex-1 bg-yellow-500 text-white py-2 px-3 rounded hover:bg-yellow-600 transition-colors flex items-center justify-center space-x-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </motion.button>
                <motion.button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 bg-red-500 text-white py-2 px-3 rounded hover:bg-red-600 transition-colors flex items-center justify-center space-x-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Product Form */}
      <AnimatePresence>
        {(showAddForm || editingProduct) && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button
                  onClick={resetForm}
                  className={`${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                    }`}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Price
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                      }`}
                      required
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Stock
                    </label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                      }`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                    }`}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Home">Home</option>
                    <option value="Clothing">Clothing</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                    }`}
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Variants
                    </label>
                    <button
                      type="button"
                      onClick={addVariant}
                      className={`text-sm transition-colors ${
                        darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                      }`}
                    >
                      Add Variant
                    </button>
                  </div>
                  {formData.variants.map((variant, index) => (
                    <div key={variant.id} className="flex space-x-2 mb-2">
                      <input
                        type="text"
                        placeholder="Name (e.g., Color)"
                        value={variant.name}
                        onChange={(e) => updateVariant(index, 'name', e.target.value)}
                        className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                        }`}
                      />
                      <input
                        type="text"
                        placeholder="Value (e.g., Red)"
                        value={variant.value}
                        onChange={(e) => updateVariant(index, 'value', e.target.value)}
                        className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => removeVariant(index)}
                        className={`px-2 transition-colors ${
                          darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'
                        }`}
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-4 pt-4">
                  <motion.button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Save size={20} />
                    <span>{editingProduct ? 'Update Product' : 'Add Product'}</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={resetForm}
                    className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                      darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-500 text-white hover:bg-gray-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminPanel;