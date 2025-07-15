import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    stock: 15,
    description: 'Experience premium sound quality with our latest wireless headphones featuring active noise cancellation and 30-hour battery life.',
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Premium sound quality',
      'Comfortable over-ear design',
      'Quick charge technology'
    ],
    specifications: {
      'Driver Size': '40mm',
      'Frequency Response': '20Hz - 20kHz',
      'Battery Life': '30 hours',
      'Charging Time': '2 hours',
      'Weight': '250g'
    },
    rating: 4.8,
    reviews: 1247,
    brand: 'AudioTech',
    variants: [
      { id: '1', name: 'Color', value: 'Black' },
      { id: '2', name: 'Color', value: 'White' },
      { id: '3', name: 'Color', value: 'Blue' },
    ]
  },
  {
    id: '2',
    name: 'Elegant Smart Watch',
    price: 449.99,
    originalPrice: 549.99,
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1034063/pexels-photo-1034063.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Accessories',
    stock: 8,
    description: 'Stylish smartwatch with health monitoring, GPS tracking, and seamless smartphone integration.',
    features: [
      'Health monitoring',
      'GPS tracking',
      'Water resistant',
      'Long battery life',
      'Smartphone integration'
    ],
    specifications: {
      'Display': '1.4" AMOLED',
      'Battery Life': '7 days',
      'Water Resistance': '5ATM',
      'Connectivity': 'Bluetooth 5.0',
      'Sensors': 'Heart rate, GPS, Accelerometer'
    },
    rating: 4.6,
    reviews: 892,
    brand: 'TechTime',
    variants: [
      { id: '4', name: 'Size', value: '38mm' },
      { id: '5', name: 'Size', value: '42mm' },
    ]
  },
  {
    id: '3',
    name: 'Latest Smartphone Pro',
    price: 899.99,
    originalPrice: 999.99,
    image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1440727/pexels-photo-1440727.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    stock: 12,
    description: 'Latest flagship smartphone with advanced camera system, powerful processor, and all-day battery life.',
    features: [
      'Triple camera system',
      'A15 Bionic chip',
      'All-day battery',
      '5G connectivity',
      'Face ID security'
    ],
    specifications: {
      'Display': '6.1" Super Retina XDR',
      'Processor': 'A15 Bionic',
      'Storage': '128GB/256GB/512GB',
      'Camera': '12MP Triple system',
      'Battery': '3095mAh'
    },
    rating: 4.9,
    reviews: 2156,
    brand: 'TechPhone',
    variants: [
      { id: '6', name: 'Storage', value: '128GB' },
      { id: '7', name: 'Storage', value: '256GB' },
      { id: '8', name: 'Storage', value: '512GB' },
    ]
  },
  {
    id: '4',
    name: 'Premium Leather Backpack',
    price: 189.99,
    originalPrice: 249.99,
    image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1545558/pexels-photo-1545558.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Accessories',
    stock: 20,
    description: 'Handcrafted leather backpack perfect for work, travel, and everyday use with multiple compartments.',
    features: [
      'Genuine leather construction',
      'Multiple compartments',
      'Laptop compartment',
      'Water resistant',
      'Comfortable straps'
    ],
    specifications: {
      'Material': 'Genuine Leather',
      'Dimensions': '45 x 30 x 15 cm',
      'Laptop Size': 'Up to 15"',
      'Weight': '1.2kg',
      'Warranty': '2 years'
    },
    rating: 4.7,
    reviews: 634,
    brand: 'LeatherCraft',
    variants: [
      { id: '9', name: 'Color', value: 'Brown' },
      { id: '10', name: 'Color', value: 'Black' },
    ]
  },
  {
    id: '5',
    name: 'Advanced Fitness Tracker',
    price: 129.99,
    originalPrice: 179.99,
    image: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    stock: 25,
    description: 'Track your fitness goals with advanced health monitoring, sleep tracking, and workout analysis.',
    features: [
      'Heart rate monitoring',
      'Sleep tracking',
      'Workout analysis',
      'Water resistant',
      '10-day battery life'
    ],
    specifications: {
      'Display': '1.1" Color AMOLED',
      'Battery Life': '10 days',
      'Water Resistance': '5ATM',
      'Sensors': 'Heart rate, SpO2, Accelerometer',
      'Compatibility': 'iOS & Android'
    },
    rating: 4.5,
    reviews: 1089,
    brand: 'FitTech',
    variants: [
      { id: '11', name: 'Color', value: 'Black' },
      { id: '12', name: 'Color', value: 'Blue' },
      { id: '13', name: 'Color', value: 'Pink' },
    ]
  },
  {
    id: '6',
    name: 'Smart Coffee Maker',
    price: 159.99,
    originalPrice: 199.99,
    image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Home',
    stock: 10,
    description: 'Smart coffee maker with app control, programmable brewing, and perfect temperature control.',
    features: [
      'App control',
      'Programmable brewing',
      'Temperature control',
      'Auto shut-off',
      'Easy cleaning'
    ],
    specifications: {
      'Capacity': '12 cups',
      'Power': '1200W',
      'Material': 'Stainless Steel',
      'Connectivity': 'WiFi',
      'Warranty': '2 years'
    },
    rating: 4.4,
    reviews: 456,
    brand: 'BrewMaster',
    variants: [
      { id: '14', name: 'Size', value: '12-cup' },
      { id: '15', name: 'Size', value: '10-cup' },
    ]
  },
  {
    id: '7',
    name: 'Gaming Mechanical Keyboard',
    price: 149.99,
    originalPrice: 199.99,
    image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    stock: 18,
    description: 'Professional gaming keyboard with RGB backlighting, mechanical switches, and programmable keys.',
    features: [
      'RGB backlighting',
      'Mechanical switches',
      'Programmable keys',
      'Anti-ghosting',
      'Durable construction'
    ],
    specifications: {
      'Switch Type': 'Cherry MX Blue',
      'Backlighting': 'RGB',
      'Layout': 'Full size',
      'Connection': 'USB-C',
      'Key Life': '50 million clicks'
    },
    rating: 4.6,
    reviews: 789,
    brand: 'GameTech',
    variants: [
      { id: '16', name: 'Switch', value: 'Blue' },
      { id: '17', name: 'Switch', value: 'Red' },
      { id: '18', name: 'Switch', value: 'Brown' },
    ]
  },
  {
    id: '8',
    name: 'Wireless Charging Pad',
    price: 49.99,
    originalPrice: 69.99,
    image: 'https://images.pexels.com/photos/4526943/pexels-photo-4526943.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/4526943/pexels-photo-4526943.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4526946/pexels-photo-4526946.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    stock: 30,
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices with LED indicator.',
    features: [
      'Fast wireless charging',
      'Qi-compatible',
      'LED indicator',
      'Non-slip surface',
      'Overcharge protection'
    ],
    specifications: {
      'Output': '15W max',
      'Input': 'USB-C',
      'Compatibility': 'Qi-enabled devices',
      'Material': 'Aluminum',
      'Dimensions': '10 x 10 x 0.8 cm'
    },
    rating: 4.3,
    reviews: 567,
    brand: 'ChargeTech',
    variants: [
      { id: '19', name: 'Color', value: 'Black' },
      { id: '20', name: 'Color', value: 'White' },
    ]
  },
  {
    id: '9',
    name: 'Bluetooth Speaker Pro',
    price: 89.99,
    originalPrice: 119.99,
    image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1034063/pexels-photo-1034063.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    stock: 22,
    description: 'Portable Bluetooth speaker with 360-degree sound, waterproof design, and 20-hour battery.',
    features: [
      '360-degree sound',
      'Waterproof design',
      '20-hour battery',
      'Voice assistant',
      'Portable design'
    ],
    specifications: {
      'Power': '20W',
      'Battery Life': '20 hours',
      'Water Rating': 'IPX7',
      'Bluetooth': '5.0',
      'Range': '30 meters'
    },
    rating: 4.7,
    reviews: 923,
    brand: 'SoundWave',
    variants: [
      { id: '21', name: 'Color', value: 'Black' },
      { id: '22', name: 'Color', value: 'Blue' },
      { id: '23', name: 'Color', value: 'Red' },
    ]
  },
  {
    id: '10',
    name: 'Smart Home Hub',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.pexels.com/photos/4526946/pexels-photo-4526946.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/4526946/pexels-photo-4526946.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4526943/pexels-photo-4526943.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Home',
    stock: 14,
    description: 'Central smart home hub to control all your connected devices with voice commands and app.',
    features: [
      'Voice control',
      'App integration',
      'Device compatibility',
      'Security features',
      'Easy setup'
    ],
    specifications: {
      'Connectivity': 'WiFi, Zigbee, Z-Wave',
      'Voice Assistant': 'Alexa, Google',
      'Compatibility': '1000+ devices',
      'Processor': 'Quad-core ARM',
      'Storage': '8GB'
    },
    rating: 4.5,
    reviews: 445,
    brand: 'SmartHome',
    variants: [
      { id: '24', name: 'Color', value: 'White' },
      { id: '25', name: 'Color', value: 'Black' },
    ]
  },
  {
    id: '11',
    name: 'Professional Camera Lens',
    price: 599.99,
    originalPrice: 749.99,
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Electronics',
    stock: 7,
    description: 'Professional 85mm portrait lens with fast aperture and exceptional image quality.',
    features: [
      'Fast f/1.4 aperture',
      'Professional quality',
      'Portrait optimized',
      'Weather sealed',
      'Image stabilization'
    ],
    specifications: {
      'Focal Length': '85mm',
      'Aperture': 'f/1.4',
      'Mount': 'Canon EF',
      'Weight': '950g',
      'Filter Size': '77mm'
    },
    rating: 4.9,
    reviews: 234,
    brand: 'LensMaster',
    variants: [
      { id: '26', name: 'Mount', value: 'Canon EF' },
      { id: '27', name: 'Mount', value: 'Nikon F' },
    ]
  },
  {
    id: '12',
    name: 'Ergonomic Office Chair',
    price: 349.99,
    originalPrice: 449.99,
    image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Home',
    stock: 16,
    description: 'Ergonomic office chair with lumbar support, adjustable height, and premium materials.',
    features: [
      'Lumbar support',
      'Adjustable height',
      'Premium materials',
      '360-degree swivel',
      'Breathable mesh'
    ],
    specifications: {
      'Material': 'Mesh & Leather',
      'Weight Capacity': '150kg',
      'Height Range': '42-52cm',
      'Base': 'Aluminum',
      'Warranty': '5 years'
    },
    rating: 4.6,
    reviews: 678,
    brand: 'ComfortSeating',
    variants: [
      { id: '28', name: 'Color', value: 'Black' },
      { id: '29', name: 'Color', value: 'Gray' },
    ]
  }
];

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(prev => prev.map(product =>
      product.id === id ? { ...product, ...updatedProduct } : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const getProduct = (id: string) => {
    return products.find(product => product.id === id);
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProduct,
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};