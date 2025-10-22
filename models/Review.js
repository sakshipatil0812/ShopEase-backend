const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Review must belong to a product'],
    },
    rating: {
      type: Number,
      required: [true, 'Please provide a rating'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5'],
    },
    comment: {
      type: String,
      required: [true, 'Please provide a review comment'],
      trim: true,
      maxlength: [500, 'Review cannot exceed 500 characters'],
    },
  },
  { timestamps: true }
);

// Prevent duplicate reviews - one review per user per product
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

// Static method to calculate average rating
reviewSchema.statics.calcAverageRating = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: '$product',
        numReviews: { $sum: 1 },
        averageRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    await this.model('Product').findByIdAndUpdate(productId, {
      numReviews: stats[0].numReviews,
      averageRating: Math.round(stats[0].averageRating * 10) / 10, // Round to 1 decimal
    });
  } else {
    await this.model('Product').findByIdAndUpdate(productId, {
      numReviews: 0,
      averageRating: 0,
    });
  }
};

// Calculate average rating after save
reviewSchema.post('save', function () {
  this.constructor.calcAverageRating(this.product);
});

// Calculate average rating after delete
reviewSchema.post('remove', function () {
  this.constructor.calcAverageRating(this.product);
});

module.exports = mongoose.model('Review', reviewSchema);
