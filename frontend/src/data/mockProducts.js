// Mock product data for demo purposes
export const mockProducts = [
  {
    _id: '1',
    name: 'Premium Wireless Headphones',
    category: 'Electronics',
    price: 2499,
    originalPrice: 3499,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&h=500&fit=crop'
    ],
    description: 'High-quality wireless headphones with active noise cancellation and 30-hour battery life.',
    specs: {
      brand: 'AudioPro',
      model: 'AP-2024',
      connectivity: 'Bluetooth 5.0',
      batteryLife: '30 hours',
      noiseCancel: 'Active Noise Cancellation',
      warranty: '2 years'
    },
    stock: 50,
    rating: 4.8,
    reviews: 124,
    benefits: ['🎧 Premium Sound Quality', '🔋 30-Hour Battery', '🔇 Active Noise Cancellation']
  },
  {
    _id: '2',
    name: 'Smart Watch Pro',
    category: 'Electronics',
    price: 1899,
    originalPrice: 2499,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1506704720897-c6b0b8ef6dba?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1523474253046-72967e0e0d86?w=500&h=500&fit=crop'
    ],
    description: 'Advanced smartwatch with fitness tracking, health monitoring, and 7-day battery life.',
    specs: {
      brand: 'TechWatch',
      model: 'TW-Pro',
      display: 'AMOLED 1.4 inches',
      batteryLife: '7 days',
      waterResistance: '5ATM',
      warranty: '1 year'
    },
    stock: 35,
    rating: 4.6,
    reviews: 89,
    benefits: ['⌚ Fitness Tracking', '❤️ Health Monitoring', '🔋 7-Day Battery']
  },
  {
    _id: '3',
    name: 'Professional Camera',
    category: 'Electronics',
    price: 4599,
    originalPrice: 5999,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1492707892657-8a34186e8d89?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=500&fit=crop'
    ],
    description: '24MP professional DSLR camera with 4K video recording and advanced autofocus system.',
    specs: {
      brand: 'ProCamera',
      model: 'PC-4K',
      megapixels: '24MP',
      video: '4K 60fps',
      autofocus: 'Advanced',
      warranty: '2 years'
    },
    stock: 15,
    rating: 4.9,
    reviews: 156,
    benefits: ['📷 24MP Resolution', '🎬 4K Video', '⚡ Advanced AF']
  },
  {
    _id: '4',
    name: 'Portable Speaker',
    category: 'Audio',
    price: 899,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1589003077984-894e133814c9?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1589003077984-894e133814c9?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&h=500&fit=crop'
    ],
    description: 'Waterproof portable speaker with 360-degree sound and 12-hour battery.',
    specs: {
      brand: 'SoundBox',
      model: 'SB-360',
      waterResistance: 'IP67',
      batteryLife: '12 hours',
      connectivity: 'Bluetooth 5.0',
      warranty: '1 year'
    },
    stock: 60,
    rating: 4.5,
    reviews: 78,
    benefits: ['🔊 360° Sound', '💧 Waterproof', '🔋 12-Hour Battery']
  },
  {
    _id: '5',
    name: 'Laptop Stand',
    category: 'Accessories',
    price: 399,
    originalPrice: 599,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1520869db7652-8306998cbe5e?w=500&h=500&fit=crop'
    ],
    description: 'Adjustable aluminum laptop stand for better ergonomics and cooling.',
    specs: {
      material: 'Aluminum Alloy',
      maxLoad: '15kg',
      adjustable: 'Yes',
      portable: 'Yes',
      compatibility: 'Universal',
      warranty: '1 year'
    },
    stock: 100,
    rating: 4.4,
    reviews: 45,
    benefits: ['🖥️ Ergonomic Design', '❄️ Better Cooling', '📱 Universal Fit']
  },
  {
    _id: '6',
    name: 'USB-C Hub',
    category: 'Accessories',
    price: 599,
    originalPrice: 899,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop'
    ],
    description: '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader.',
    specs: {
      ports: '7-in-1',
      hdmi: '4K 60Hz',
      usb: 'USB 3.0 x3',
      sdCard: 'Yes',
      pownerDelivery: '100W',
      warranty: '2 years'
    },
    stock: 75,
    rating: 4.7,
    reviews: 92,
    benefits: ['🔌 7-in-1 Design', '📺 4K HDMI', '⚡ 100W Power Delivery']
  },
  {
    _id: '7',
    name: 'Mechanical Keyboard',
    category: 'Accessories',
    price: 1299,
    originalPrice: 1799,
    image: 'https://images.unsplash.com/photo-1587829191301-72f86e09dcf0?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1587829191301-72f86e09dcf0?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1595635266106-c0ef43d52d0f?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1623206635299-2f6b8b28eaf9?w=500&h=500&fit=crop'
    ],
    description: 'Premium mechanical keyboard with RGB lighting and hot-swappable switches.',
    specs: {
      switches: 'Hot-Swappable',
      lighting: 'RGB',
      layout: 'Full Size',
      connectivity: 'Wireless',
      batteryLife: '50 hours',
      warranty: '2 years'
    },
    stock: 40,
    rating: 4.8,
    reviews: 134,
    benefits: ['⌨️ Hot-Swappable', '🌈 RGB Lighting', '🎮 Gaming Ready']
  },
  {
    _id: '8',
    name: 'Wireless Mouse',
    category: 'Accessories',
    price: 699,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop'
    ],
    description: 'Precision wireless mouse with adjustable DPI and ergonomic design.',
    specs: {
      dpi: 'Adjustable 1600-3200',
      connectivity: 'Wireless 2.4GHz',
      batteryLife: '18 months',
      buttons: '6',
      ergonomic: 'Yes',
      warranty: '1 year'
    },
    stock: 85,
    rating: 4.5,
    reviews: 67,
    benefits: ['🖱️ Precision Control', '⚡ Wireless', '🔋 18-Month Battery']
  }
];

export const mockCategories = ['Electronics', 'Audio', 'Accessories', 'All'];

export const getProductById = (id) => {
  return mockProducts.find(p => p._id === id);
};

export const getProductsByCategory = (category, limit = 10) => {
  if (category === 'All') {
    return mockProducts.slice(0, limit);
  }
  return mockProducts.filter(p => p.category === category).slice(0, limit);
};

export const getAllProducts = (limit = 10) => {
  return mockProducts.slice(0, limit);
};

export const getRelatedProducts = (category, excludeId, limit = 4) => {
  return mockProducts
    .filter(p => p.category === category && p._id !== excludeId)
    .slice(0, limit);
};
