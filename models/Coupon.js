const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Please provide coupon code'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    discountType: {
      type: String,
      required: [true, 'Please provide discount type'],
      enum: ['percentage', 'fixed'],
      default: 'percentage',
    },
    discountValue: {
      type: Number,
      required: [true, 'Please provide discount value'],
      min: [0, 'Discount value cannot be negative'],
    },
    minimumPurchase: {
      type: Number,
      default: 0,
      min: [0, 'Minimum purchase cannot be negative'],
    },
    maximumDiscount: {
      type: Number,
      default: null, // null means no maximum
    },
    expiryDate: {
      type: Date,
      required: [true, 'Please provide expiry date'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    usageLimit: {
      type: Number,
      default: null, // null means unlimited
    },
    usedCount: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Index for faster lookup
couponSchema.index({ code: 1, isActive: 1 });

// Method to check if coupon is valid
couponSchema.methods.isValid = function () {
  const now = new Date();
  
  // Check if active
  if (!this.isActive) {
    return { valid: false, message: 'This coupon is no longer active' };
  }
  
  // Check if expired
  if (this.expiryDate < now) {
    return { valid: false, message: 'This coupon has expired' };
  }
  
  // Check usage limit
  if (this.usageLimit !== null && this.usedCount >= this.usageLimit) {
    return { valid: false, message: 'This coupon has reached its usage limit' };
  }
  
  return { valid: true, message: 'Coupon is valid' };
};

// Method to calculate discount amount
couponSchema.methods.calculateDiscount = function (cartTotal) {
  // Check if cart meets minimum purchase requirement
  if (cartTotal < this.minimumPurchase) {
    return {
      valid: false,
      discount: 0,
      message: `Minimum purchase of ₹${this.minimumPurchase} required`,
    };
  }
  
  let discount = 0;
  
  if (this.discountType === 'percentage') {
    discount = (cartTotal * this.discountValue) / 100;
    
    // Apply maximum discount cap if exists
    if (this.maximumDiscount !== null && discount > this.maximumDiscount) {
      discount = this.maximumDiscount;
    }
  } else if (this.discountType === 'fixed') {
    discount = this.discountValue;
    
    // Discount cannot exceed cart total
    if (discount > cartTotal) {
      discount = cartTotal;
    }
  }
  
  return {
    valid: true,
    discount: Math.round(discount),
    message: 'Coupon applied successfully',
  };
};

module.exports = mongoose.model('Coupon', couponSchema);
