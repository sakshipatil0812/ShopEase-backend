const axios = require('axios');

// Test login endpoint directly
async function testLogin() {
  try {
    console.log('🧪 Testing Login Endpoint...\n');
    
    // Test 1: Admin login
    console.log('Test 1: Admin Login');
    console.log('Email: admin@shopeasy.com');
    console.log('Password: Admin@123\n');
    
    const response = await axios.post('http://localhost:5001/api/auth/login', {
      email: 'admin@shopeasy.com',
      password: 'Admin@123'
    });
    
    console.log('✅ Login Response:', response.status);
    console.log('📦 Data:', JSON.stringify(response.data, null, 2));
    console.log('\n🎉 Login test PASSED!');
    
  } catch (error) {
    console.error('❌ Login test FAILED!');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      console.error('No response received from server');
      console.error('Is the backend running on http://localhost:5001?');
    } else {
      console.error('Error:', error.message);
    }
  }
}

testLogin();
