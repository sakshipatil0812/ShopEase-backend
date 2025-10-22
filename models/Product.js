const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide product name'],
      trim: true,
      maxlength: [100, 'Product name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide product description'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide product price'],
      min: [0, 'Price cannot be negative'],
    },
    imageURL: {
      type: String,
      required: [true, 'Please provide product image URL'],
    },
    category: {
      type: String,
      required: [true, 'Please provide product category'],
      enum: [
        'Electronics', 
        'Fashion', 
        'Home & Kitchen', 
        'Books', 
        'Mobile & Accessories',
        'Sports & Toys', 
        'Health & Beauty', 
        'Baby Products',
        'Other'
      ],
    },
    stock: {
      type: Number,
      required: [true, 'Please provide stock quantity'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    brand: {
      type: String,
      trim: true,
      maxlength: [50, 'Brand name cannot exceed 50 characters'],
    },
    tags: [{
      type: String,
      trim: true,
    }],
    averageRating: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot be more than 5'],
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    images: [{
      type: String,
    }],
  },
  { timestamps: true }
);

// Index for search and filtering
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, price: 1, averageRating: -1 });

module.exports = mongoose.model('Product', productSchema);
