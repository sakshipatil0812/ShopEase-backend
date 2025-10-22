const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

// Load environment variables
dotenv.config();

// Admin user data
const adminUser = {
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
};

// Connect to MongoDB and create admin
const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminUser.email });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists');
      console.log('📧 Email:', adminUser.email);
      console.log('🔑 Password: Admin@123');
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create(adminUser);
    
    console.log('✅ Admin user created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:', adminUser.email);
    console.log('🔑 Password:', adminUser.password);
    console.log('👤 Name:', admin.name);
    console.log('🔐 Admin Status:', admin.isAdmin);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('💡 Use these credentials to login to admin panel');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  }
};

// Run the seed function
seedAdmin();
