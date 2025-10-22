const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
    appliedCoupon: {
      code: String,
      discountType: String,
      discountValue: Number,
    },
    subtotal: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Calculate totals before saving
cartSchema.methods.calculateTotals = function () {
  // Calculate subtotal with proper validation
  this.subtotal = this.items.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity) || 0;
    return sum + (price * quantity);
  }, 0);
  
  // Calculate discount (ensure it's a number)
  const discountAmount = parseFloat(this.discount) || 0;
  
  // Calculate total (subtotal - discount)
  this.total = this.subtotal - discountAmount;
  
  // Ensure total is not negative
  if (this.total < 0) this.total = 0;
  
  // Ensure subtotal and total are valid numbers
  if (isNaN(this.subtotal)) this.subtotal = 0;
  if (isNaN(this.total)) this.total = 0;
};

module.exports = mongoose.model('Cart', cartSchema);
