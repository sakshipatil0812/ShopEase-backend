require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function testUserLogin() {
  try {
    console.log('🔍 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Find your user
    const user = await User.findOne({ email: 'sakshipatil8324@gmail.com' }).select('+password');
    
    if (!user) {
      console.log('❌ User not found: sakshipatil8324@gmail.com');
      console.log('\n💡 Solution: Register a new account at http://localhost:3000/register');
      process.exit(0);
    }

    console.log('✅ User found!');
    console.log('📧 Email:', user.email);
    console.log('👤 Name:', user.name);
    console.log('🔑 Has Password:', !!user.password);
    console.log('📏 Password Hash Length:', user.password?.length);
    console.log('\n🧪 Testing common passwords...\n');

    // Test common passwords
    const testPasswords = [
      'Admin@123',
      'Sakshi@123',
      'Sakshi123',
      'sakshi123',
      'Password@123',
      'password123',
      '12345678',
      'Sakshi@12',
      'Test@123',
      'User@123'
    ];

    let passwordFound = false;
    for (const testPwd of testPasswords) {
      const isMatch = await user.comparePassword(testPwd);
      if (isMatch) {
        console.log('✅✅✅ PASSWORD FOUND! ✅✅✅');
        console.log('🔑 Password:', testPwd);
        console.log('\n📝 Login Credentials:');
        console.log('   Email:', user.email);
        console.log('   Password:', testPwd);
        passwordFound = true;
        break;
      } else {
        console.log(`❌ "${testPwd}" - No match`);
      }
    }

    if (!passwordFound) {
      console.log('\n⚠️  Password not found in common passwords list.');
      console.log('\n💡 Options:');
      console.log('1. Try to remember your password');
      console.log('2. Create a new account at http://localhost:3000/register');
      console.log('3. I can reset this user\'s password to a new one');
      console.log('\n🔄 Would you like me to reset the password to "Sakshi@123"?');
      console.log('   Run: node reset-password.js');
    }

    await mongoose.connection.close();
    console.log('\n✅ Test completed');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testUserLogin();
