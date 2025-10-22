const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Coupon = require('./models/Coupon');

dotenv.config();

// Sample coupons data
const sampleCoupons = [
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10,
    minimumPurchase: 0,
    maximumDiscount: 1000,
    expiryDate: new Date('2026-12-31'),
    isActive: true,
    usageLimit: null,
    description: 'Welcome offer: Get 10% off on your first purchase!',
  },
  {
    code: 'SAVE500',
    discountType: 'fixed',
    discountValue: 500,
    minimumPurchase: 2000,
    maximumDiscount: null,
    expiryDate: new Date('2026-12-31'),
    isActive: true,
    usageLimit: null,
    description: 'Save ₹500 on orders above ₹2000',
  },
  {
    code: 'FLASH20',
    discountType: 'percentage',
    discountValue: 20,
    minimumPurchase: 5000,
    maximumDiscount: 2000,
    expiryDate: new Date('2025-12-31'),
    isActive: true,
    usageLimit: 100,
    description: 'Flash Sale: 20% off on orders above ₹5000 (Max ₹2000)',
  },
  {
    code: 'MEGA30',
    discountType: 'percentage',
    discountValue: 30,
    minimumPurchase: 10000,
    maximumDiscount: 5000,
    expiryDate: new Date('2026-06-30'),
    isActive: true,
    usageLimit: null,
    description: 'Mega Sale: 30% off on orders above ₹10000 (Max ₹5000)',
  },
  {
    code: 'FLAT1000',
    discountType: 'fixed',
    discountValue: 1000,
    minimumPurchase: 5000,
    maximumDiscount: null,
    expiryDate: new Date('2026-12-31'),
    isActive: true,
    usageLimit: null,
    description: 'Flat ₹1000 off on orders above ₹5000',
  },
];

// Connect to database and seed
const seedCoupons = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing coupons
    await Coupon.deleteMany({});
    console.log('🗑️  Existing coupons cleared');

    // Insert sample coupons
    const coupons = await Coupon.insertMany(sampleCoupons);
    console.log(`✅ ${coupons.length} coupons inserted successfully`);

    console.log('\n🎫 Sample Coupons:');
    coupons.forEach((coupon, index) => {
      console.log(`${index + 1}. ${coupon.code} - ${coupon.discountType === 'percentage' ? coupon.discountValue + '%' : '₹' + coupon.discountValue} off (Min: ₹${coupon.minimumPurchase})`);
      console.log(`   ${coupon.description}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed Error:', error);
    process.exit(1);
  }
};

// Run seed
seedCoupons();
