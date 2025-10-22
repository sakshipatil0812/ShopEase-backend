const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

// Load environment variables
dotenv.config();

// Fix admin user
const fixAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Delete existing admin (if any)
    await User.deleteOne({ email: 'admin@shopeasy.com' });
    console.log('🗑️  Deleted old admin user (if existed)');

    // Create fresh admin user with proper password hashing
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@shopeasy.com',
      password: 'Admin@123',  // This will be hashed by the User model's pre-save hook
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

    console.log('\n✅ Admin user created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👤 Name:', admin.name);
    console.log('📧 Email:', admin.email);
    console.log('🔑 Password: Admin@123');
    console.log('📱 Phone:', admin.phone);
    console.log('🔐 Admin Status:', admin.isAdmin);
    console.log('🔒 Password Hashed:', admin.password ? 'YES ✓' : 'NO ✗');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    // Verify password works
    const isMatch = await admin.comparePassword('Admin@123');
    console.log('\n🧪 Password verification test:', isMatch ? '✅ PASSED' : '❌ FAILED');

    console.log('\n🎉 You can now login with:');
    console.log('   Email: admin@shopeasy.com');
    console.log('   Password: Admin@123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
    process.exit(1);
  }
};

fixAdmin();
