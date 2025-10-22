const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

console.log('Testing MongoDB connection...');
console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Found' : 'Not Found');

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✓ MongoDB Connected Successfully');
    
    // List all collections
    mongoose.connection.db.listCollections().toArray((err, collections) => {
      if (err) {
        console.error('Error listing collections:', err);
      } else {
        console.log('\nAvailable Collections:');
        collections.forEach(col => console.log(`  - ${col.name}`));
      }
      
      process.exit(0);
    });
  })
  .catch((err) => {
    console.error('✗ MongoDB Connection Error:', err.message);
    process.exit(1);
  });
