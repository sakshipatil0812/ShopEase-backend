const http = require('http');

const testAdminLogin = async () => {
  try {
    console.log('🧪 Testing Admin Login Endpoint...\n');
    
    const postData = JSON.stringify({
      email: 'admin@shopeasy.com',
      password: 'Admin@123'
    });

    const options = {
      hostname: 'localhost',
      port: 5001,
      path: '/api/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          const response = JSON.parse(data);
          console.log('✅ Login Successful!');
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          console.log('Response Data:');
          console.log(JSON.stringify(response, null, 2));
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          
          if (response.user) {
            console.log('\n👤 User Info:');
            console.log('Name:', response.user.name);
            console.log('Email:', response.user.email);
            console.log('Is Admin:', response.user.isAdmin);
            console.log('Token:', response.token ? 'EXISTS ✓' : 'MISSING ✗');
            
            if (response.user.isAdmin) {
              console.log('\n✅ User is Admin - Should redirect to /admin/dashboard');
            } else {
              console.log('\n❌ User is NOT Admin - Should show access denied');
            }
          }
        } else {
          console.error('❌ Login Failed!');
          console.error('Status:', res.statusCode);
          console.error('Response:', data);
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Request Failed!');
      console.error('Error:', error.message);
      console.error('Stack:', error.stack);
    });

    req.write(postData);
    req.end();
  } catch (error) {
    console.error('❌ Test Failed!');
    console.error('Error:', error.message);
  }
};

testAdminLogin();
