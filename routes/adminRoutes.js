const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const {
  getDashboardStats,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  bulkUpdateStock,
  getAllUsers,
  getUserDetails,
  getCategories
} = require('../controllers/adminController');

// All routes require authentication and admin privileges
router.use(protect);
router.use(adminAuth);

// Dashboard
router.get('/stats', getDashboardStats);

// Products Management
router.get('/products', getAllProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
router.post('/products/bulk-update-stock', bulkUpdateStock);

// Orders Management
router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);
router.delete('/orders/:id', deleteOrder);

// Users Management
router.get('/users', getAllUsers);
router.get('/users/:id', getUserDetails);

// Categories
router.get('/categories', getCategories);

module.exports = router;
