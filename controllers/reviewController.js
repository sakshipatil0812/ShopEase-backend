const Review = require('../models/Review');
const Product = require('../models/Product');

// @desc    Add a review for a product
// @route   POST /api/reviews
// @access  Private
const addReview = async (req, res) => {
  try {
    const { product, rating, comment } = req.body;

    // Check if product exists
    const productExists = await Product.findById(product);
    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      user: req.user._id,
      product,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this product',
      });
    }

    // Create review
    const review = await Review.create({
      user: req.user._id,
      product,
      rating,
      comment,
    });

    // Populate user info
    await review.populate('user', 'name');

    res.status(201).json({
      success: true,
      review,
    });
  } catch (error) {
    console.error('Add Review Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while adding review',
    });
  }
};

// @desc    Get reviews for a product
// @route   GET /api/reviews/:productId
// @access  Public
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10, sort = 'newest' } = req.query;

    // Check if product exists
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Sorting
    let sortOption = {};
    if (sort === 'newest') sortOption.createdAt = -1;
    else if (sort === 'oldest') sortOption.createdAt = 1;
    else if (sort === 'highest') sortOption.rating = -1;
    else if (sort === 'lowest') sortOption.rating = 1;
    else sortOption.createdAt = -1;

    // Pagination
    const skip = (page - 1) * limit;

    // Get reviews
    const reviews = await Review.find({ product: productId })
      .populate('user', 'name')
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    // Count total reviews
    const total = await Review.countDocuments({ product: productId });

    res.status(200).json({
      success: true,
      count: reviews.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      reviews,
    });
  } catch (error) {
    console.error('Get Reviews Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching reviews',
    });
  }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private
const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    // Find review
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    // Check if user owns this review
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own reviews',
      });
    }

    // Update review
    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    await review.save();

    await review.populate('user', 'name');

    res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    console.error('Update Review Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating review',
    });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    // Find review
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    // Check if user owns this review
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own reviews',
      });
    }

    // Save product ID before deleting
    const productId = review.product;

    // Delete review
    await review.remove();

    // Manually trigger average rating calculation
    await Review.calcAverageRating(productId);

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    console.error('Delete Review Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting review',
    });
  }
};

// @desc    Get user's review for a product
// @route   GET /api/reviews/user/:productId
// @access  Private
const getUserReview = async (req, res) => {
  try {
    const { productId } = req.params;

    const review = await Review.findOne({
      user: req.user._id,
      product: productId,
    }).populate('user', 'name');

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    console.error('Get User Review Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching review',
    });
  }
};

module.exports = {
  addReview,
  getProductReviews,
  updateReview,
  deleteReview,
  getUserReview,
};
