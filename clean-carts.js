const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  });

const Cart = require('./models/Cart');

async function cleanCarts() {
  try {
    console.log('🧹 Cleaning corrupted carts...\n');

    // Find all carts
    const carts = await Cart.find({});
    console.log(`Found ${carts.length} cart(s) in database`);

    let cleanedCount = 0;
    let deletedCount = 0;

    for (const cart of carts) {
      // Check if cart has items without price
      const invalidItems = cart.items.filter(item => 
        !item.price || item.price === undefined || item.price === null
      );

      if (invalidItems.length > 0) {
        console.log(`\n❌ Cart ${cart._id} has ${invalidItems.length} invalid item(s)`);
        
        // Remove invalid items
        cart.items = cart.items.filter(item => 
          item.price && item.price !== undefined && item.price !== null
        );

        if (cart.items.length === 0) {
          // If no items left, delete the cart
          await Cart.deleteOne({ _id: cart._id });
          deletedCount++;
          console.log(`   🗑️  Deleted empty cart`);
        } else {
          // Save cleaned cart
          cart.calculateTotals();
          await cart.save();
          cleanedCount++;
          console.log(`   ✅ Cleaned cart, ${cart.items.length} valid item(s) remaining`);
        }
      } else {
        console.log(`\n✅ Cart ${cart._id} is valid (${cart.items.length} items)`);
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('🎉 Cart Cleanup Complete!');
    console.log(`   - Cleaned: ${cleanedCount} cart(s)`);
    console.log(`   - Deleted: ${deletedCount} empty cart(s)`);
    console.log('='.repeat(60) + '\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error cleaning carts:', error);
    process.exit(1);
  }
}

cleanCarts();
