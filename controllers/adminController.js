const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');

// @desc    Get admin dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    // Get total counts
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments({ isAdmin: false });
    
    // Get total revenue
    const orders = await Order.find({ orderStatus: { $ne: 'cancelled' } });
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    
    // Get recent orders
    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);
    
    // Get pending orders count
    const pendingOrders = await Order.countDocuments({ orderStatus: 'pending' });
    
    // Get low stock products (stock < 10)
    const lowStockProducts = await Product.find({ stock: { $lt: 10 } })
      .select('name stock')
      .limit(5);
    
    // Get revenue by month (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const revenueByMonth = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo },
          orderStatus: { $ne: 'cancelled' }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          revenue: { $sum: '$totalPrice' },
          orders: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    res.json({
      success: true,
      stats: {
        totalProducts,
        totalOrders,
        totalUsers,
        totalRevenue,
        pendingOrders,
        recentOrders,
        lowStockProducts,
        revenueByMonth
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch dashboard statistics',
      error: error.message 
    });
  }
};

// @desc    Get all products with pagination
// @route   GET /api/admin/products
// @access  Private/Admin
const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    const searchQuery = req.query.search 
      ? { name: { $regex: req.query.search, $options: 'i' } }
      : {};

    const products = await Product.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Product.countDocuments(searchQuery);

    res.json({
      success: true,
      products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalProducts: total,
        limit
      }
    });
  } catch (error) {
    console.error('Get all products error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch products',
      error: error.message 
    });
  }
};

// @desc    Create new product
// @route   POST /api/admin/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      stock,
      brand,
      tags,
      imageURL,
      images
    } = req.body;

    // Validation
    if (!name || !price || !category) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide name, price, and category' 
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock: stock || 0,
      brand,
      tags: tags || [],
      imageURL: imageURL || 'https://via.placeholder.com/400',
      images: images || []
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to create product',
      error: error.message 
    });
  }
};

// @desc    Update product
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }

    const {
      name,
      description,
      price,
      category,
      stock,
      brand,
      tags,
      imageURL,
      images
    } = req.body;

    // Update fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.category = category;
    if (stock !== undefined) product.stock = stock;
    if (brand) product.brand = brand;
    if (tags) product.tags = tags;
    if (imageURL) product.imageURL = imageURL;
    if (images) product.images = images;

    await product.save();

    res.json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to update product',
      error: error.message 
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to delete product',
      error: error.message 
    });
  }
};

// @desc    Get all orders with pagination
// @route   GET /api/admin/orders
// @access  Private/Admin
const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    const statusFilter = req.query.status 
      ? { orderStatus: req.query.status }
      : {};

    const orders = await Order.find(statusFilter)
      .populate('user', 'name email phone')
      .populate('orderItems.product', 'name imageURL')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Order.countDocuments(statusFilter);

    res.json({
      success: true,
      orders,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalOrders: total,
        limit
      }
    });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch orders',
      error: error.message 
    });
  }
};

// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, isPaid, isDelivered } = req.body;

    const order = await Order.findById(req.params.id).populate('orderItems.product');

    if (!order) {
      return res.status(404).json({ 
        success: false,
        message: 'Order not found' 
      });
    }

    const previousStatus = order.orderStatus;

    // If order is being cancelled, restore stock
    if (orderStatus === 'cancelled' && previousStatus !== 'cancelled') {
      for (const item of order.orderItems) {
        await Product.findByIdAndUpdate(
          item.product._id || item.product,
          { $inc: { stock: item.quantity } },
          { new: true }
        );
      }
    }

    // Update order status
    if (orderStatus) {
      order.orderStatus = orderStatus;
    }

    // Update payment status
    if (isPaid !== undefined) {
      order.isPaid = isPaid;
      if (isPaid && !order.paidAt) {
        order.paidAt = Date.now();
      }
    }

    // Update delivery status
    if (isDelivered !== undefined) {
      order.isDelivered = isDelivered;
      if (isDelivered && !order.deliveredAt) {
        order.deliveredAt = Date.now();
      }
    }

    await order.save();

    res.json({
      success: true,
      message: orderStatus === 'cancelled' 
        ? 'Order cancelled and stock restored successfully' 
        : 'Order status updated successfully',
      order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to update order status',
      error: error.message 
    });
  }
};

// @desc    Get all users with pagination
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    const searchQuery = req.query.search 
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } }
          ]
        }
      : {};

    const users = await User.find({ ...searchQuery, isAdmin: false })
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await User.countDocuments({ ...searchQuery, isAdmin: false });

    // Get order count for each user
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const orderCount = await Order.countDocuments({ user: user._id });
        const totalSpent = await Order.aggregate([
          { $match: { user: user._id, orderStatus: { $ne: 'cancelled' } } },
          { $group: { _id: null, total: { $sum: '$totalPrice' } } }
        ]);
        
        return {
          ...user.toObject(),
          orderCount,
          totalSpent: totalSpent[0]?.total || 0
        };
      })
    );

    res.json({
      success: true,
      users: usersWithStats,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalUsers: total,
        limit
      }
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch users',
      error: error.message 
    });
  }
};

// @desc    Get user details with activity
// @route   GET /api/admin/users/:id
// @access  Private/Admin
const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Get user's orders
    const orders = await Order.find({ user: user._id })
      .populate('orderItems.product', 'name imageURL price')
      .sort({ createdAt: -1 })
      .limit(10);

    // Get total spent
    const totalSpent = await Order.aggregate([
      { $match: { user: user._id, orderStatus: { $ne: 'cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    res.json({
      success: true,
      user: {
        ...user.toObject(),
        orderCount: orders.length,
        totalSpent: totalSpent[0]?.total || 0,
        recentOrders: orders
      }
    });
  } catch (error) {
    console.error('Get user details error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch user details',
      error: error.message 
    });
  }
};

// @desc    Delete order
// @route   DELETE /api/admin/orders/:id
// @access  Private/Admin
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('orderItems.product');

    if (!order) {
      return res.status(404).json({ 
        success: false,
        message: 'Order not found' 
      });
    }

    // Restore stock if order was not already cancelled
    if (order.orderStatus !== 'cancelled') {
      for (const item of order.orderItems) {
        await Product.findByIdAndUpdate(
          item.product._id || item.product,
          { $inc: { stock: item.quantity } },
          { new: true }
        );
      }
    }

    await order.deleteOne();

    res.json({
      success: true,
      message: 'Order deleted and stock restored successfully'
    });
  } catch (error) {
    console.error('Delete order error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to delete order',
      error: error.message 
    });
  }
};

// @desc    Bulk update product stock
// @route   POST /api/admin/products/bulk-update-stock
// @access  Private/Admin
const bulkUpdateStock = async (req, res) => {
  try {
    const { updates } = req.body; // Array of {productId, stock}
    
    if (!updates || !Array.isArray(updates)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid updates format' 
      });
    }

    const results = await Promise.all(
      updates.map(async ({ productId, stock }) => {
        try {
          const product = await Product.findByIdAndUpdate(
            productId,
            { stock },
            { new: true }
          );
          return { success: true, productId, product };
        } catch (error) {
          return { success: false, productId, error: error.message };
        }
      })
    );

    res.json({
      success: true,
      message: 'Stock updated successfully',
      results
    });
  } catch (error) {
    console.error('Bulk update stock error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to update stock',
      error: error.message 
    });
  }
};

// @desc    Get all categories
// @route   GET /api/admin/categories
// @access  Private/Admin
const getCategories = async (req, res) => {
  try {
    // Get unique categories from products
    const categories = await Product.distinct('category');
    
    // Get product count for each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const count = await Product.countDocuments({ category });
        return { name: category, productCount: count };
      })
    );

    res.json({
      success: true,
      categories: categoriesWithCount
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch categories',
      error: error.message 
    });
  }
};

module.exports = {
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
};
