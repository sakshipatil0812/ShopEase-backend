const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

// Enhanced sample products data with brands, tags, and ratings
const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling over-ear headphones with 30-hour battery life and crystal-clear sound quality.',
    price: 6499,
    imageURL: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Electronics',
    stock: 45,
    brand: 'SoundMax',
    tags: ['wireless', 'bluetooth', 'noise-cancelling', 'premium'],
    averageRating: 4.5,
    numReviews: 128,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500',
    ],
  },
  {
    name: 'Smart Watch Series 7',
    description: 'Advanced fitness tracking, heart rate monitor, GPS, and water-resistant design. Perfect for active lifestyles.',
    price: 24999,
    imageURL: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'Electronics',
    stock: 30,
    brand: 'TechPro',
    tags: ['smartwatch', 'fitness', 'gps', 'waterproof'],
    averageRating: 4.8,
    numReviews: 256,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    ],
  },
  {
    name: 'Laptop Backpack',
    description: 'Durable and stylish backpack with padded laptop compartment, USB charging port, and water-resistant material.',
    price: 3999,
    imageURL: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'Fashion',
    stock: 60,
    brand: 'UrbanGear',
    tags: ['backpack', 'laptop', 'travel', 'usb-charging'],
    averageRating: 4.3,
    numReviews: 89,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    ],
  },
  {
    name: 'Portable Power Bank 20000mAh',
    description: 'High-capacity power bank with dual USB ports and fast charging technology. Perfect for travel.',
    price: 2899,
    imageURL: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500',
    category: 'Electronics',
    stock: 100,
    brand: 'PowerPlus',
    tags: ['powerbank', 'fast-charging', 'portable', 'travel'],
    averageRating: 4.6,
    numReviews: 342,
    images: [
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500',
    ],
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Eco-friendly non-slip yoga mat with extra cushioning. Includes carrying strap.',
    price: 1999,
    imageURL: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    category: 'Sports',
    stock: 75,
    brand: 'FitLife',
    tags: ['yoga', 'fitness', 'eco-friendly', 'non-slip'],
    averageRating: 4.4,
    numReviews: 167,
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    ],
  },
  {
    name: 'Coffee Maker Deluxe',
    description: '12-cup programmable coffee maker with auto shut-off and brew strength control.',
    price: 7499,
    imageURL: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
    category: 'Home & Kitchen',
    stock: 40,
    brand: 'BrewMaster',
    tags: ['coffee', 'kitchen', 'programmable', 'appliance'],
    averageRating: 4.7,
    numReviews: 203,
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
    ],
  },
  {
    name: 'Running Shoes Pro',
    description: 'Lightweight running shoes with responsive cushioning and breathable mesh upper.',
    price: 9999,
    imageURL: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    category: 'Fashion',
    stock: 55,
    brand: 'SportElite',
    tags: ['running', 'shoes', 'sports', 'lightweight'],
    averageRating: 4.5,
    numReviews: 421,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    ],
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with adjustable DPI and long battery life.',
    price: 1599,
    imageURL: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
    category: 'Electronics',
    stock: 120,
    brand: 'TechGear',
    tags: ['mouse', 'wireless', 'ergonomic', 'computer'],
    averageRating: 4.2,
    numReviews: 567,
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
    ],
  },
  {
    name: 'Desk Organizer Set',
    description: 'Bamboo desk organizer set with pen holder, drawer, and phone stand.',
    price: 2499,
    imageURL: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=500',
    category: 'Home & Kitchen',
    stock: 85,
    brand: 'EcoHome',
    tags: ['organizer', 'desk', 'bamboo', 'office'],
    averageRating: 4.6,
    numReviews: 134,
    images: [
      'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=500',
    ],
  },
  {
    name: 'LED Desk Lamp',
    description: 'Adjustable LED desk lamp with touch control and USB charging port.',
    price: 3299,
    imageURL: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
    category: 'Home & Kitchen',
    stock: 50,
    brand: 'LightPro',
    tags: ['lamp', 'led', 'desk', 'adjustable'],
    averageRating: 4.4,
    numReviews: 98,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
    ],
  },
  {
    name: 'Skincare Set Premium',
    description: 'Complete skincare routine set with cleanser, toner, serum, and moisturizer.',
    price: 5399,
    imageURL: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500',
    category: 'Beauty',
    stock: 35,
    brand: 'GlowBeauty',
    tags: ['skincare', 'beauty', 'premium', 'set'],
    averageRating: 4.8,
    numReviews: 276,
    images: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500',
    ],
  },
  {
    name: 'Water Bottle Insulated',
    description: 'Stainless steel insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.',
    price: 1899,
    imageURL: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
    category: 'Sports',
    stock: 90,
    brand: 'HydroMax',
    tags: ['water-bottle', 'insulated', 'sports', 'travel'],
    averageRating: 4.7,
    numReviews: 423,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
    ],
  },
  {
    name: 'Bluetooth Speaker Portable',
    description: 'Waterproof portable Bluetooth speaker with 360-degree sound and 12-hour playtime.',
    price: 4599,
    imageURL: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    category: 'Electronics',
    stock: 65,
    brand: 'SoundWave',
    tags: ['speaker', 'bluetooth', 'waterproof', 'portable'],
    averageRating: 4.6,
    numReviews: 312,
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    ],
  },
  {
    name: 'Kitchen Knife Set',
    description: 'Professional 8-piece kitchen knife set with wooden block and sharpener.',
    price: 8299,
    imageURL: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500',
    category: 'Home & Kitchen',
    stock: 25,
    brand: 'ChefPro',
    tags: ['kitchen', 'knife', 'cooking', 'professional'],
    averageRating: 4.9,
    numReviews: 187,
    images: [
      'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500',
    ],
  },
  {
    name: 'Notebook Set',
    description: 'Set of 3 premium hardcover notebooks with dotted pages. Perfect for journaling and note-taking.',
    price: 1599,
    imageURL: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500',
    category: 'Books',
    stock: 110,
    brand: 'WritePlus',
    tags: ['notebook', 'journal', 'stationery', 'writing'],
    averageRating: 4.3,
    numReviews: 201,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500',
    ],
  },
  // Additional products for better filtering demonstration
  {
    name: '4K Smart TV 55 inch',
    description: 'Ultra HD 4K Smart TV with HDR, built-in streaming apps, and voice control.',
    price: 45999,
    imageURL: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500',
    category: 'Electronics',
    stock: 15,
    brand: 'VisionTech',
    tags: ['tv', 'smart', '4k', 'entertainment'],
    averageRating: 4.7,
    numReviews: 456,
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500',
    ],
  },
  {
    name: 'Gaming Mouse RGB',
    description: 'High-precision gaming mouse with customizable RGB lighting and 16000 DPI.',
    price: 3499,
    imageURL: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500',
    category: 'Electronics',
    stock: 80,
    brand: 'GamePro',
    tags: ['gaming', 'mouse', 'rgb', 'precision'],
    averageRating: 4.8,
    numReviews: 678,
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500',
    ],
  },
  {
    name: 'Leather Wallet',
    description: 'Genuine leather bifold wallet with RFID blocking and multiple card slots.',
    price: 2499,
    imageURL: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
    category: 'Fashion',
    stock: 95,
    brand: 'LeatherLux',
    tags: ['wallet', 'leather', 'rfid', 'fashion'],
    averageRating: 4.5,
    numReviews: 234,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
    ],
  },
  {
    name: 'Face Mask Set',
    description: 'Pack of 6 hydrating sheet masks with natural ingredients for all skin types.',
    price: 999,
    imageURL: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500',
    category: 'Beauty',
    stock: 150,
    brand: 'GlowBeauty',
    tags: ['facemask', 'skincare', 'hydrating', 'beauty'],
    averageRating: 4.6,
    numReviews: 389,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500',
    ],
  },
  {
    name: 'Dumbbell Set',
    description: 'Adjustable dumbbell set with 20kg total weight. Perfect for home workouts.',
    price: 6999,
    imageURL: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500',
    category: 'Sports',
    stock: 40,
    brand: 'FitLife',
    tags: ['dumbbell', 'fitness', 'workout', 'strength'],
    averageRating: 4.7,
    numReviews: 298,
    images: [
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500',
    ],
  },
  {
    name: 'Wooden Toy Train Set',
    description: 'Classic wooden train set with 50 pieces. Safe and educational for kids 3+.',
    price: 3999,
    imageURL: 'https://images.unsplash.com/photo-1558877385-09f6e502b3df?w=500',
    category: 'Toys',
    stock: 60,
    brand: 'KidsPlay',
    tags: ['toy', 'wooden', 'train', 'educational'],
    averageRating: 4.9,
    numReviews: 412,
    images: [
      'https://images.unsplash.com/photo-1558877385-09f6e502b3df?w=500',
    ],
  },
];

// Connect to database and seed
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Existing products cleared');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ ${products.length} products inserted successfully`);

    console.log('\n📦 Sample Products:');
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - ₹${product.price} (${product.category}) - ${product.brand} - ⭐${product.averageRating}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed Error:', error);
    process.exit(1);
  }
};

// Run seed
seedDatabase();
