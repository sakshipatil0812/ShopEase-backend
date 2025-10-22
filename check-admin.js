const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

// Load environment variables
dotenv.config();

// Check admin user
const checkAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Find admin user
    const admin = await User.findOne({ email: 'admin@shopeasy.com' });
    
    if (!admin) {
      console.log('❌ Admin user NOT found in database!');
      console.log('Run: node seed-admin.js to create admin');
      process.exit(1);
    }

    console.log('✅ Admin user found in database!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👤 Name:', admin.name);
    console.log('📧 Email:', admin.email);
    console.log('📱 Phone:', admin.phone);
    console.log('🔐 Is Admin:', admin.isAdmin);
    console.log('🔑 Password Hash:', admin.password ? 'EXISTS ✓' : 'MISSING ✗');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    // Test password comparison
    const testPassword = 'Admin@123';
    const isMatch = await admin.comparePassword(testPassword);
    
    console.log('\n🧪 Testing password verification:');
    console.log('Test Password:', testPassword);
    console.log('Password Match:', isMatch ? '✅ CORRECT' : '❌ INCORRECT');
    
    if (!isMatch) {
      console.log('\n⚠️  Password does not match! Recreating admin...');
      await User.deleteOne({ email: 'admin@shopeasy.com' });
      const newAdmin = await User.create({
        name: 'Admin User',
        email: 'admin@shopeasy.com',
        password: 'Admin@123',
        phone: '9999999999',
        isAdmin: true,
        address: {
          street: '123 Admin Street',
          city: 'Mumbai',
          state: 'Maharashtra',
          zipCode: '400001',
          country: 'India'
        }
      });
      console.log('✅ Admin user recreated successfully!');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkAdmin();
