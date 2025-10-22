// Debug Login Issue - Test Script
// Run this with: node debug-login.js

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: { type: String, select: false },
  isAdmin: Boolean,
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

async function testLogin() {
  try {
    console.log('🔍 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // List all users
    console.log('📋 Listing all users in database:');
    const users = await User.find({}).select('+password');
    console.log(`Found ${users.length} users:\n`);
    
    users.forEach((user, index) => {
      console.log(`${index + 1}. Email: ${user.email}`);
      console.log(`   Name: ${user.name}`);
      console.log(`   Admin: ${user.isAdmin}`);
      console.log(`   Has Password: ${!!user.password}`);
      console.log(`   Password Length: ${user.password?.length || 0}\n`);
    });

    if (users.length === 0) {
      console.log('⚠️  NO USERS FOUND! You need to register a user first.\n');
      console.log('Solutions:');
      console.log('1. Visit http://localhost:3000/register to create an account');
      console.log('2. Or run the seed-admin.js script to create an admin user\n');
    } else {
      // Test password comparison
      console.log('\n🧪 Testing password comparison:');
      const testUser = users[0];
      const testPasswords = ['Admin@123', 'password123', 'test123', '123456'];
      
      console.log(`Testing user: ${testUser.email}\n`);
      for (const pwd of testPasswords) {
        const isMatch = await testUser.comparePassword(pwd);
        console.log(`Password "${pwd}": ${isMatch ? '✅ MATCH' : '❌ No match'}`);
      }
    }

    await mongoose.connection.close();
    console.log('\n✅ Test completed');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testLogin();
