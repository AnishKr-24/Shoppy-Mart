// Real Indian SEO-optimized Grocery Product Data (3 products per category, 24 products total across 8 equal categories)
export const mockProducts = [
  // --- Category 1: Staples & Flour ---
  {
    _id: '1',
    name: 'Aashirvaad Shudh Chakki Whole Wheat Atta 10kg',
    category: 'Staples & Flour',
    price: 449,
    originalPrice: 520,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop'
    ],
    description: '100% pure whole wheat flour processed with traditional chakki process. Retains natural dietary fibers and essential nutrients for soft, tasty, and fluffy rotis.',
    specs: {
      brand: 'Aashirvaad',
      weight: '10 kg',
      grainType: 'Whole Wheat',
      processing: 'Traditional Chakki Process',
      shelfLife: '3 Months',
      countryOfOrigin: 'India'
    },
    stock: 100,
    rating: 4.9,
    reviews: 320,
    benefits: ['🌾 100% Pure Whole Wheat', '🥖 Soft Roti Guarantee', '🥗 Rich in Dietary Fiber']
  },
  {
    _id: '2',
    name: 'Fortune Superfine Maida 1kg',
    category: 'Staples & Flour',
    price: 52,
    originalPrice: 65,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop'],
    description: 'Hygienically milled and refined wheat flour. Ideal for baking fresh naan, samosas, bhature, cakes, and delicious bakery delicacies.',
    specs: {
      brand: 'Fortune',
      weight: '1 kg',
      type: 'Superfine Wheat Flour',
      shelfLife: '4 Months',
      countryOfOrigin: 'India'
    },
    stock: 90,
    rating: 4.7,
    reviews: 140,
    benefits: ['🌾 Hygienically Milled', '🥐 Perfect for Bakery & Samosas', '✨ Smooth Fine Texture']
  },
  {
    _id: '3',
    name: 'Rajdhani Premium Besan / Gram Flour 1kg',
    category: 'Staples & Flour',
    price: 110,
    originalPrice: 135,
    image: 'https://images.unsplash.com/photo-1627662168806-efa33a7cce86?w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1627662168806-efa33a7cce86?w=600&auto=format&fit=crop'],
    description: '100% pure chana dal besan with rich natural aroma and ultra-fine golden texture. Essential for crispy pakoras, dhokla, and sweets.',
    specs: {
      brand: 'Rajdhani',
      weight: '1 kg',
      source: '100% Pure Chana Dal',
      shelfLife: '6 Months',
      countryOfOrigin: 'India'
    },
    stock: 85,
    rating: 4.8,
    reviews: 210,
    benefits: ['🫘 100% Chana Dal Base', '🍢 Ideal for Crispy Pakoras', '💪 Protein-Rich Flour']
  },

  // --- Category 2: Rice & Grains ---
  {
    _id: '4',
    name: 'India Gate Super Premium Basmati Rice 5kg',
    category: 'Rice & Grains',
    price: 699,
    originalPrice: 850,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&auto=format&fit=crop'
    ],
    description: 'Extra long grain aromatic basmati rice aged to perfection. Ideal for royal biryani, jeera rice, pulao, and grand festive feasts.',
    specs: {
      brand: 'India Gate',
      weight: '5 kg',
      grainLength: 'Extra Long Aged Basmati',
      aging: '2 Years Aged',
      countryOfOrigin: 'India'
    },
    stock: 80,
    rating: 4.8,
    reviews: 240,
    benefits: ['🍚 Extra Long Aged Grain', '🌸 Mesmerizing Aroma', '👨‍🍳 Preferred Choice for Biryani']
  },
  {
    _id: '5',
    name: 'Fortune Everyday Basmati Rice 1kg',
    category: 'Rice & Grains',
    price: 115,
    originalPrice: 140,
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&auto=format&fit=crop'],
    description: 'Aromatic fluffy basmati rice tailored for daily family meals. Grains cook up non-sticky, long, and fluffy.',
    specs: {
      brand: 'Fortune',
      weight: '1 kg',
      type: 'Everyday Basmati Rice',
      shelfLife: '12 Months',
      countryOfOrigin: 'India'
    },
    stock: 120,
    rating: 4.6,
    reviews: 165,
    benefits: ['🍚 Fluffy Non-Sticky Grains', '🌾 Great for Daily Cooking', '✨ Delightful Aroma']
  },
  {
    _id: '6',
    name: 'Daawat Rozana Super Basmati Rice 5kg',
    category: 'Rice & Grains',
    price: 480,
    originalPrice: 580,
    image: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=600&auto=format&fit=crop'],
    description: 'Well-aged basmati rice with distinctive sweet aroma and firm texture. Perfect for fried rice, lemon rice, and curry meals.',
    specs: {
      brand: 'Daawat',
      weight: '5 kg',
      grain: 'Medium-Long Aged Basmati',
      shelfLife: '24 Months',
      countryOfOrigin: 'India'
    },
    stock: 70,
    rating: 4.7,
    reviews: 190,
    benefits: ['🌾 Well-Aged Quality', '🍲 Perfect for Pulao & Fried Rice', '🌟 Value Super Pack']
  },

  // --- Category 3: Edible Oils & Ghee ---
  {
    _id: '7',
    name: 'Fortune Sunlite Refined Sunflower Oil 5L Jar',
    category: 'Edible Oils & Ghee',
    price: 749,
    originalPrice: 899,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop'
    ],
    description: 'Light, healthy, and easy to digest refined sunflower oil enriched with Vitamin A & D. Formulated for daily Indian cooking and frying.',
    specs: {
      brand: 'Fortune',
      volume: '5 Litres',
      enrichment: 'Vitamin A, D & E',
      countryOfOrigin: 'India'
    },
    stock: 60,
    rating: 4.7,
    reviews: 195,
    benefits: ['🛢️ Heart Healthy Formula', '👁️ Enriched with Vitamin A & D', '🍳 Low Oil Absorption']
  },
  {
    _id: '8',
    name: 'Amul Pure Cow Ghee 1L Tin',
    category: 'Edible Oils & Ghee',
    price: 615,
    originalPrice: 680,
    image: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?w=600&auto=format&fit=crop'],
    description: 'Traditional granular cow ghee crafted from fresh cow milk cream. Delivers authentic Indian aroma and flavor to sweets, curries, and rotis.',
    specs: {
      brand: 'Amul',
      volume: '1 Litre',
      milkSource: '100% Pure Cow Milk',
      countryOfOrigin: 'India'
    },
    stock: 75,
    rating: 4.9,
    reviews: 410,
    benefits: ['🐄 100% Pure Cow Milk', '🧈 Rich Danedar Texture', '🍲 Irresistible Indian Aroma']
  },
  {
    _id: '9',
    name: 'Dhara Kachi Ghani Mustard Oil 1L Pouch',
    category: 'Edible Oils & Ghee',
    price: 165,
    originalPrice: 195,
    image: 'https://images.unsplash.com/photo-1620706857370-e1b993a58c34?w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1620706857370-e1b993a58c34?w=600&auto=format&fit=crop'],
    description: 'Pungent cold-pressed mustard oil rich in natural Omega-3 fatty acids. Essential for authentic Indian curries and pickles.',
    specs: {
      brand: 'Dhara',
      volume: '1 Litre',
      process: 'Kachi Ghani Cold Pressed',
      countryOfOrigin: 'India'
    },
    stock: 110,
    rating: 4.8,
    reviews: 280,
    benefits: ['🌿 Cold Pressed Kachi Ghani', '❤️ Rich in Omega-3', '🌶️ Authentic Pungent Taste']
  },

  // --- Category 4: Spices & Masalas ---
  {
    _id: '10',
    name: 'Everest Royal Garam Masala & Turmeric Combo (400g)',
    category: 'Spices & Masalas',
    price: 195,
    originalPrice: 240,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop'],
    description: 'Masterfully blended royal spices and pure golden turmeric powder with essential natural oils preserved. Gives vivid color and deep fragrance to Indian gravy.',
    specs: {
      brand: 'Everest',
      netWeight: '400g (200g Garam Masala + 200g Turmeric)',
      countryOfOrigin: 'India'
    },
    stock: 120,
    rating: 4.8,
    reviews: 180,
    benefits: ['🌶️ Preserved Natural Oils', '🌟 Vibrant Golden Color', '🍲 Master Spice Blend']
  },
  {
    _id: '11',
    name: 'Tata Salt Vacuum Evaporated Iodized Salt 1kg',
    category: 'Spices & Masalas',
    price: 28,
    originalPrice: 30,
    image: 'https://images.unsplash.com/photo-1518110165389-d91e6bfa414a?w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1518110165389-d91e6bfa414a?w=600&auto=format&fit=crop'],
    description: "Desh Ka Namak - India's iconic vacuum-evaporated iodized salt ensuring mental growth and essential daily sodium balance.",
    specs: {
      brand: 'Tata Salt',
      weight: '1 kg',
      purity: '99.7% Pure NaCl',
      countryOfOrigin: 'India'
    },
    stock: 200,
    rating: 4.9,
    reviews: 530,
    benefits: ['🧂 Vacuum Evaporated Purity', '🧠 Iodine Enriched', '🏆 Trusted Desh Ka Namak']
  },
  {
    _id: '12',
    name: 'MDH Deggi Mirch Red Chilli Powder 100g',
    category: 'Spices & Masalas',
    price: 85,
    originalPrice: 95,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop'],
    description: 'Vibrant red chilli powder blend imparting rich natural red color and pleasant moderate spice level without overpowering heat.',
    specs: {
      brand: 'MDH',
      weight: '100g',
      blend: 'Deggi Mirch Whole Red Peppers',
      countryOfOrigin: 'India'
    },
    stock: 150,
    rating: 4.8,
    reviews: 310,
    benefits: ['🌶️ Rich Deep Red Color', '🔥 Balanced Flavor & Spice', '🍛 Restaurant-Style Curries']
  },

  // --- Category 5: Dairy & Bakery ---
  {
    _id: '13',
    name: 'Amul Taaza Toned Milk 1L (Pack of 6)',
    category: 'Dairy & Bakery',
    price: 432,
    originalPrice: 460,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop'],
    description: 'Long-life UHT pasteurized toned milk enriched with Vitamin A & D. Requires no boiling or refrigeration prior to opening.',
    specs: {
      brand: 'Amul',
      volume: '6 Litres (6 x 1L Tetra Packs)',
      fatContent: '3.0% Fat',
      countryOfOrigin: 'India'
    },
    stock: 70,
    rating: 4.9,
    reviews: 290,
    benefits: ['🥛 Advanced UHT Long-Life Treatment', '🛡️ Zero Added Preservatives', '☕ Excellent for Tea, Coffee & Kheer']
  },
  {
    _id: '14',
    name: 'Amul Butter Pasteurized 500g Pack',
    category: 'Dairy & Bakery',
    price: 275,
    originalPrice: 290,
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&auto=format&fit=crop'],
    description: 'Utterly butterly delicious pasteurized salted butter crafted from pure cream. Perfect for breakfast toast, pav bhaji, and baking.',
    specs: {
      brand: 'Amul',
      weight: '500g',
      saltStatus: 'Salted Pasteurized',
      countryOfOrigin: 'India'
    },
    stock: 95,
    rating: 4.9,
    reviews: 480,
    benefits: ['🧈 100% Pure Cream Butter', '🍞 Iconic Utterly Butterly Flavor', '🍳 Essential for Pav Bhaji & Toast']
  },
  {
    _id: '15',
    name: 'Britannia Daily Fresh Paneer 200g',
    category: 'Dairy & Bakery',
    price: 95,
    originalPrice: 110,
    image: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?w=600&auto=format&fit=crop'],
    description: 'Soft, fresh cottage cheese rich in high quality milk protein and calcium. Holds shape perfectly in gravy and tikka dishes.',
    specs: {
      brand: 'Britannia',
      weight: '200g',
      type: 'Fresh Cottage Cheese Paneer',
      countryOfOrigin: 'India'
    },
    stock: 80,
    rating: 4.7,
    reviews: 210,
    benefits: ['🥛 High Protein & Calcium', '🧀 Super Soft Texture', '🍲 Great for Matar Paneer']
  },

  // --- Category 6: Beverages & Tea ---
  {
    _id: '16',
    name: 'Brooke Bond Taj Mahal Premium Tea 500g',
    category: 'Beverages & Tea',
    price: 385,
    originalPrice: 450,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop'],
    description: 'Wah Taj! Handpicked fine tea leaves blended to offer robust taste, rich golden cup color, and legendary aroma for true Indian chai enthusiasts.',
    specs: {
      brand: 'Taj Mahal',
      weight: '500g',
      type: 'CTC & Long Leaf Blend',
      countryOfOrigin: 'India'
    },
    stock: 90,
    rating: 4.8,
    reviews: 310,
    benefits: ['☕ Handpicked Fine Tea Leaves', '🌟 Rich Golden Color & Strength', '🫖 Legendary Wah Taj Aroma']
  },
  {
    _id: '17',
    name: 'Nescafé Classic Instant Coffee 200g Jar',
    category: 'Beverages & Tea',
    price: 610,
    originalPrice: 690,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop'],
    description: '100% pure natural coffee beans roasted to perfection. Delivers bold coffee flavor, rich crema, and uplifting morning energy.',
    specs: {
      brand: 'Nescafé',
      weight: '200g',
      type: '100% Pure Instant Coffee',
      countryOfOrigin: 'India'
    },
    stock: 65,
    rating: 4.8,
    reviews: 390,
    benefits: ['☕ 100% Pure Coffee Beans', '⚡ Instant Energy Boost', '😋 Rich Bold Flavor']
  },
  {
    _id: '18',
    name: 'Red Label Natural Care Tea 1kg Pack',
    category: 'Beverages & Tea',
    price: 540,
    originalPrice: 620,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop'],
    description: 'Enriched tea containing 5 natural Ayurvedic ingredients (Tulsi, Ginger, Cardamom, Mulethi, Ashwagandha) proven to enhance immunity.',
    specs: {
      brand: 'Red Label',
      weight: '1 kg',
      herbalAdditions: 'Tulsi, Ginger, Elaichi, Mulethi, Ashwagandha',
      countryOfOrigin: 'India'
    },
    stock: 85,
    rating: 4.9,
    reviews: 275,
    benefits: ['🌿 5 Ayurvedic Immunity Herbs', '☕ Refreshing Spiced Taste', '🛡️ Everyday Health Protection']
  },

  // --- Category 7: Snacks & Sweets ---
  {
    _id: '19',
    name: "Haldiram's Nagpur Special Bhujia Sev 1kg",
    category: 'Snacks & Sweets',
    price: 290,
    originalPrice: 340,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop'],
    description: 'Crispy, crunchy, and savory moth pulse bhujia seasoned with authentic Rajasthani spices. The ultimate Indian teatime companion.',
    specs: {
      brand: "Haldiram's Nagpur",
      weight: '1 kg',
      flavor: 'Spicy Moth Bhujia',
      countryOfOrigin: 'India'
    },
    stock: 110,
    rating: 4.7,
    reviews: 220,
    benefits: ['🍿 Exceptionally Crispy & Crunchy', '🌶️ Authentic Spice Blend', '☕ Perfect Teatime Snack']
  },
  {
    _id: '20',
    name: 'Bikanervala Soan Papdi Premium 500g',
    category: 'Snacks & Sweets',
    price: 160,
    originalPrice: 190,
    image: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=600&auto=format&fit=crop'],
    description: 'Flaky and melt-in-mouth traditional Indian sweet made with cardamom, pistachios, almonds, and pure ghee.',
    specs: {
      brand: 'Bikanervala',
      weight: '500g',
      type: 'Desi Ghee Soan Papdi',
      countryOfOrigin: 'India'
    },
    stock: 100,
    rating: 4.8,
    reviews: 180,
    benefits: ['🥮 Melt-in-Mouth Flaky Texture', '🧈 Made with Pure Ghee & Nuts', '🎁 Perfect Festive Dessert']
  },
  {
    _id: '21',
    name: 'Bikaji Aslee Bikaner Rasgulla 1kg Tin',
    category: 'Snacks & Sweets',
    price: 240,
    originalPrice: 280,
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop'],
    description: 'Soft, spongy cottage cheese dumplings soaked in light, clear sugar syrup. Traditional Bikaner sweets recipe.',
    specs: {
      brand: 'Bikaji',
      weight: '1 kg Tin',
      sweetType: 'Traditional White Rasgulla',
      countryOfOrigin: 'India'
    },
    stock: 75,
    rating: 4.9,
    reviews: 320,
    benefits: ['🍧 Ultra Soft & Spongy', '🍯 Light Fragrant Sugar Syrup', '🏆 Authentic Bikaner Recipe']
  },

  // --- Category 8: Pulses & Dals ---
  {
    _id: '22',
    name: 'Tata Sampann Unpolished Toor Dal / Arhar Dal 1kg',
    category: 'Pulses & Dals',
    price: 165,
    originalPrice: 195,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop'],
    description: '100% unpolished Arhar Toor Dal sourced from select farms. Free from oil or water polish to preserve natural protein and original wholesome taste.',
    specs: {
      brand: 'Tata Sampann',
      weight: '1 kg',
      processing: 'Unpolished (No Water/Oil Polish)',
      countryOfOrigin: 'India'
    },
    stock: 85,
    rating: 4.8,
    reviews: 175,
    benefits: ['🫘 100% Unpolished Dal', '💪 High Natural Protein', '🍲 Wholesome Taste & Fast Cooking']
  },
  {
    _id: '23',
    name: 'Fortune Premium Chana Dal 1kg',
    category: 'Pulses & Dals',
    price: 125,
    originalPrice: 150,
    image: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=600&auto=format&fit=crop'],
    description: 'Unpolished golden chana dal packed with plant-based protein and dietary fiber. Delicious for tadka dal, puran poli, and snacks.',
    specs: {
      brand: 'Fortune',
      weight: '1 kg',
      type: 'Unpolished Yellow Chana Dal',
      countryOfOrigin: 'India'
    },
    stock: 90,
    rating: 4.7,
    reviews: 145,
    benefits: ['🫘 Clean Unpolished Grains', '💪 Packed with Fiber & Protein', '🍲 Great for Dal Tadka']
  },
  {
    _id: '24',
    name: 'Organic Tattva Moong Dal Split 1kg',
    category: 'Pulses & Dals',
    price: 180,
    originalPrice: 210,
    image: 'https://images.unsplash.com/photo-1585994191611-726cef558607?w=600&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1585994191611-726cef558607?w=600&auto=format&fit=crop'],
    description: 'Certified 100% organic split green gram moong dal. Easily digestible, light on stomach, and rich in essential vitamins and minerals.',
    specs: {
      brand: 'Organic Tattva',
      weight: '1 kg',
      certification: 'Certified Organic',
      countryOfOrigin: 'India'
    },
    stock: 70,
    rating: 4.9,
    reviews: 260,
    benefits: ['🌱 100% Certified Organic', '🥗 Easy to Digest & Light', '🍲 Ideal for Khichdi & Soup']
  }
];

export const mockCategories = [
  'All',
  'Staples & Flour',
  'Rice & Grains',
  'Edible Oils & Ghee',
  'Spices & Masalas',
  'Dairy & Bakery',
  'Beverages & Tea',
  'Snacks & Sweets',
  'Pulses & Dals'
];

export const getProductById = (id) => {
  return mockProducts.find(p => p._id === id || String(p._id) === String(id));
};

export const getProductsByCategory = (category, limit = 10) => {
  if (!category || category.toLowerCase() === 'all') {
    return mockProducts.slice(0, limit);
  }
  return mockProducts.filter(p => p.category.toLowerCase() === category.toLowerCase()).slice(0, limit);
};

export const getAllProducts = (limit = 24) => {
  return mockProducts.slice(0, limit);
};

export const getRelatedProducts = (category, excludeId, limit = 4) => {
  return mockProducts
    .filter(p => p.category.toLowerCase() === category?.toLowerCase() && String(p._id) !== String(excludeId))
    .slice(0, limit);
};
