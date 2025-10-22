const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getSearchSuggestions,
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/search/suggestions', getSearchSuggestions); // Must come before /:id
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Protected routes (optional - for admin functionality)
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
