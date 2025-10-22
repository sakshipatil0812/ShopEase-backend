const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  addReview,
  getProductReviews,
  updateReview,
  deleteReview,
  getUserReview,
} = require('../controllers/reviewController');

// Add a review (protected)
router.post('/', protect, addReview);

// Get all reviews for a product (public)
router.get('/:productId', getProductReviews);

// Get user's review for a product (protected)
router.get('/user/:productId', protect, getUserReview);

// Update a review (protected)
router.put('/:id', protect, updateReview);

// Delete a review (protected)
router.delete('/:id', protect, deleteReview);

module.exports = router;
