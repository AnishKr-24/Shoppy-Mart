const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const User = require('../model/User');
const Product = require('../model/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/Shoppy_Mart-demo';

// Exactly 3 items per category (24 items total across 8 equal categories)
const groceryProducts = [
  // --- Category 1: Staples & Flour ---
  {
    name: 'Aashirvaad Shudh Chakki Whole Wheat Atta 10kg',
    description: '100% pure whole wheat flour processed with traditional chakki process. Retains natural dietary fibers and nutrients for soft, delicious rotis.',
    price: 449,
    category: 'Staples & Flour',
    stock: 100,
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop',
    rating: 4.9,
    numReviews: 320
  },
  {
    name: 'Fortune Superfine Maida 1kg',
    description: 'Hygienically milled and refined wheat flour. Ideal for baking fresh naan, samosas, cakes, and delicious pastries.',
    price: 52,
    category: 'Staples & Flour',
    stock: 90,
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop',
    rating: 4.7,
    numReviews: 140
  },
  {
    name: 'Rajdhani Premium Besan / Gram Flour 1kg',
    description: '100% pure chana dal besan with rich aroma and fine texture. Perfect for pakoras, dhokla, and traditional Indian sweets.',
    price: 110,
    category: 'Staples & Flour',
    stock: 85,
    imageUrl: 'https://images.unsplash.com/photo-1627662168806-efa33a7cce86?w=600&auto=format&fit=crop',
    rating: 4.8,
    numReviews: 210
  },

  // --- Category 2: Rice & Grains ---
  {
    name: 'India Gate Super Premium Basmati Rice 5kg',
    description: 'Extra long grain aromatic basmati rice aged to perfection. Perfect for biryani, pulao, and festive Indian meals.',
    price: 699,
    category: 'Rice & Grains',
    stock: 80,
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop',
    rating: 4.8,
    numReviews: 240
  },
  {
    name: 'Fortune Everyday Basmati Rice 1kg',
    description: 'Aromatic fluffy basmati rice for everyday family meals. Fluffy non-sticky grains that swell up beautifully.',
    price: 115,
    category: 'Rice & Grains',
    stock: 120,
    imageUrl: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&auto=format&fit=crop',
    rating: 4.6,
    numReviews: 165
  },
  {
    name: 'Daawat Rozana Super Basmati Rice 5kg',
    description: 'Well-aged basmati rice with distinctive aroma and rich texture. Ideal for fried rice, lemon rice, and daily meals.',
    price: 480,
    category: 'Rice & Grains',
    stock: 70,
    imageUrl: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=600&auto=format&fit=crop',
    rating: 4.7,
    numReviews: 190
  },

  // --- Category 3: Edible Oils & Ghee ---
  {
    name: 'Fortune Sunlite Refined Sunflower Oil 5L Jar',
    description: 'Light, healthy, and easy to digest refined sunflower oil enriched with Vitamin A & D. Ideal for daily Indian cooking and deep frying.',
    price: 749,
    category: 'Edible Oils & Ghee',
    stock: 60,
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop',
    rating: 4.7,
    numReviews: 195
  },
  {
    name: 'Amul Pure Cow Ghee 1L Tin',
    description: 'Traditional granular cow ghee crafted from fresh cream. Delivers authentic aroma and rich flavor to sweets, dals, and parathas.',
    price: 615,
    category: 'Edible Oils & Ghee',
    stock: 75,
    imageUrl: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?w=600&auto=format&fit=crop',
    rating: 4.9,
    numReviews: 410
  },
  {
    name: 'Dhara Kachi Ghani Mustard Oil 1L Pouch',
    description: 'Pungent cold-pressed mustard oil rich in natural Omega-3. Essential for authentic North Indian curries and pickles.',
    price: 165,
    category: 'Edible Oils & Ghee',
    stock: 110,
    imageUrl: 'https://images.unsplash.com/photo-1620706857370-e1b993a58c34?w=600&auto=format&fit=crop',
    rating: 4.8,
    numReviews: 280
  },

  // --- Category 4: Spices & Masalas ---
  {
    name: 'Everest Royal Garam Masala & Turmeric Combo (400g)',
    description: 'Authentic blend of ground spices and pure golden turmeric with natural oils intact. Enhances aroma and color of curry dishes.',
    price: 195,
    category: 'Spices & Masalas',
    stock: 120,
    imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop',
    rating: 4.8,
    numReviews: 180
  },
  {
    name: 'Tata Salt Vacuum Evaporated Iodized Salt 1kg',
    description: "Desh ka Namak - India's most trusted vacuum-evaporated iodized salt ensuring mental development and daily health.",
    price: 28,
    category: 'Spices & Masalas',
    stock: 200,
    imageUrl: 'https://images.unsplash.com/photo-1518110165389-d91e6bfa414a?w=600&auto=format&fit=crop',
    rating: 4.9,
    numReviews: 530
  },
  {
    name: 'MDH Deggi Mirch Red Chilli Powder 100g',
    description: 'Vibrant red chilli powder blend imparting rich natural red color and moderate spice level without overpowering heat.',
    price: 85,
    category: 'Spices & Masalas',
    stock: 150,
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop',
    rating: 4.8,
    numReviews: 310
  },

  // --- Category 5: Dairy & Bakery ---
  {
    name: 'Amul Taaza Toned Milk 1L (Pack of 6)',
    description: 'Long-life UHT pasteurized toned milk enriched with Vitamin A & D. No preservatives needed; ready to drink or cook.',
    price: 432,
    category: 'Dairy & Bakery',
    stock: 70,
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop',
    rating: 4.9,
    numReviews: 290
  },
  {
    name: 'Amul Butter Pasteurized 500g Pack',
    description: 'Utterly butterly delicious pasteurized butter made from wholesome cow and buffalo milk cream. Ideal for toast and cooking.',
    price: 275,
    category: 'Dairy & Bakery',
    stock: 95,
    imageUrl: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&auto=format&fit=crop',
    rating: 4.9,
    numReviews: 480
  },
  {
    name: 'Britannia Daily Fresh Paneer 200g',
    description: 'Soft, fresh cottage cheese rich in protein and calcium. Perfect for shahi paneer, tikka, and matar paneer.',
    price: 95,
    category: 'Dairy & Bakery',
    stock: 80,
    imageUrl: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?w=600&auto=format&fit=crop',
    rating: 4.7,
    numReviews: 210
  },

  // --- Category 6: Beverages & Tea ---
  {
    name: 'Brooke Bond Taj Mahal Premium Tea 500g',
    description: 'Wah Taj! Exquisite tea leaves selection providing fine strength, rich golden color, and matchless aroma for tea lovers.',
    price: 385,
    category: 'Beverages & Tea',
    stock: 90,
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop',
    rating: 4.8,
    numReviews: 310
  },
  {
    name: 'Nescafé Classic Instant Coffee 200g Jar',
    description: '100% pure natural coffee beans roasted to perfection. Delivers bold coffee flavor and uplifting morning energy.',
    price: 610,
    category: 'Beverages & Tea',
    stock: 65,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop',
    rating: 4.8,
    numReviews: 390
  },
  {
    name: 'Red Label Natural Care Tea 1kg Pack',
    description: 'Enriched tea with Ayurvedic herbs including Tulsi, Ginger, Cardamom, Mulethi, and Ashwagandha for immunity.',
    price: 540,
    category: 'Beverages & Tea',
    stock: 85,
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop',
    rating: 4.9,
    numReviews: 275
  },

  // --- Category 7: Snacks & Sweets ---
  {
    name: "Haldiram's Nagpur Special Bhujia Sev 1kg",
    description: 'Crispy and spicy moth pulse and gram flour bhujia snack. Made with traditional Indian spices for teatime munching.',
    price: 290,
    category: 'Snacks & Sweets',
    stock: 110,
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop',
    rating: 4.7,
    numReviews: 220
  },
  {
    name: 'Bikanervala Soan Papdi Premium 500g',
    description: 'Flaky and melt-in-mouth traditional Indian sweet made with cardamom, pistachios, and pure ghee.',
    price: 160,
    category: 'Snacks & Sweets',
    stock: 100,
    imageUrl: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=600&auto=format&fit=crop',
    rating: 4.8,
    numReviews: 180
  },
  {
    name: 'Bikaji Aslee Bikaner Rasgulla 1kg Tin',
    description: 'Soft and spongy cottage cheese balls soaked in fragrant sugar syrup. Authentic Bikaner dessert recipe.',
    price: 240,
    category: 'Snacks & Sweets',
    stock: 75,
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop',
    rating: 4.9,
    numReviews: 320
  },

  // --- Category 8: Pulses & Dals ---
  {
    name: 'Tata Sampann Unpolished Toor Dal / Arhar Dal 1kg',
    description: 'Unpolished toor dal rich in natural protein without any artificial polish or water treatment. Wholesome and easy to cook.',
    price: 165,
    category: 'Pulses & Dals',
    stock: 85,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop',
    rating: 4.8,
    numReviews: 175
  },
  {
    name: 'Fortune Premium Chana Dal 1kg',
    description: 'Unpolished golden chana dal packed with plant-based protein and dietary fiber. Delicious for tadka dal and vada.',
    price: 125,
    category: 'Pulses & Dals',
    stock: 90,
    imageUrl: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=600&auto=format&fit=crop',
    rating: 4.7,
    numReviews: 145
  },
  {
    name: 'Organic Tattva Moong Dal Split 1kg',
    description: 'Certified organic split green gram moong dal. Easily digestible, light on stomach, and rich in essential minerals.',
    price: 180,
    category: 'Pulses & Dals',
    stock: 70,
    imageUrl: 'https://images.unsplash.com/photo-1585994191611-726cef558607?w=600&auto=format&fit=crop',
    rating: 4.9,
    numReviews: 260
  }
];

const seedDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully.');

    // Seed Admin User
    const adminEmail = 'admin@shoppymart.com';
    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      admin = await User.create({
        name: 'Admin User',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        verified: true
      });
      console.log('Admin user created successfully (email: admin@shoppymart.com, password: admin123)');
    } else {
      admin.role = 'admin';
      await admin.save();
      console.log('Admin user exists and role verified as admin.');
    }

    // Seed Products
    await Product.deleteMany({});
    console.log('Cleared existing products.');

    const createdProducts = await Product.insertMany(groceryProducts);
    console.log(`Successfully seeded ${createdProducts.length} products (3 per category across 8 categories)!`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDB();
