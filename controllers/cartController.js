const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Coupon = require('../models/Coupon');

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');

    if (!cart) {
      // Create new cart with proper initialization
      cart = new Cart({ 
        userId: req.user.id, 
        items: [],
        subtotal: 0,
        discount: 0,
        total: 0
      });
      await cart.save();
    } else {
      // Clean up any invalid items (items without price or with deleted products)
      cart.items = cart.items.filter(item => {
        // Remove items where product doesn't exist or price is missing
        if (!item.productId || item.price === undefined || item.price === null) {
          return false;
        }
        return true;
      });
      
      // Calculate totals only if we have valid items
      cart.calculateTotals();
      await cart.save();
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error('Get Cart Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching cart',
    });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock',
      });
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new Cart({ 
        userId: req.user.id, 
        items: [],
        subtotal: 0,
        discount: 0,
        total: 0
      });
    }

    // Validate product has a price
    if (!product.price || product.price <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Product price is invalid',
      });
    }

    // Check if product already in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity and ensure price is set
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;
      
      // Check if new quantity exceeds stock
      if (newQuantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.stock} items available in stock`,
        });
      }
      
      cart.items[existingItemIndex].quantity = newQuantity;
      cart.items[existingItemIndex].price = product.price;
    } else {
      // Add new item with all required fields explicitly
      cart.items.push({ 
        productId: productId, 
        quantity: quantity, 
        price: product.price 
      });
    }

    // Recalculate totals
    cart.calculateTotals();
    
    // Save the cart
    await cart.save();
    
    // Populate product details
    await cart.populate('items.productId');

    res.status(200).json({
      success: true,
      message: 'Item added to cart successfully',
      cart,
    });
  } catch (error) {
    console.error('Add to Cart Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding to cart',
    });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:itemId
// @access  Private
const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1',
      });
    }

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart',
      });
    }

    // Check stock
    const product = await Product.findById(item.productId);
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock',
      });
    }

    item.quantity = quantity;
    await cart.save();
    await cart.populate('items.productId');

    res.status(200).json({
      success: true,
      message: 'Cart updated successfully',
      cart,
    });
  } catch (error) {
    console.error('Update Cart Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating cart',
    });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
    await cart.save();
    await cart.populate('items.productId');

    res.status(200).json({
      success: true,
      message: 'Item removed from cart',
      cart,
    });
  } catch (error) {
    console.error('Remove from Cart Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while removing from cart',
    });
  }
};

// @desc    Clear entire cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully',
      cart,
    });
  } catch (error) {
    console.error('Clear Cart Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while clearing cart',
    });
  }
};

// @desc    Apply coupon to cart
// @route   POST /api/cart/coupon
// @access  Private
const applyCoupon = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Please provide coupon code',
      });
    }

    // Find coupon
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });
    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Invalid coupon code',
      });
    }

    // Validate coupon
    const validationResult = coupon.isValid();
    if (!validationResult.valid) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
      });
    }

    // Get cart
    let cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty',
      });
    }

    // Calculate subtotal
    cart.calculateTotals();

    // Calculate discount
    const discountResult = coupon.calculateDiscount(cart.subtotal);
    if (!discountResult.valid) {
      return res.status(400).json({
        success: false,
        message: discountResult.message,
      });
    }

    // Apply coupon
    cart.appliedCoupon = {
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
    };
    cart.discount = discountResult.discount;
    cart.calculateTotals();

    await cart.save();

    res.status(200).json({
      success: true,
      message: discountResult.message,
      cart,
      discount: discountResult.discount,
    });
  } catch (error) {
    console.error('Apply Coupon Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while applying coupon',
    });
  }
};

// @desc    Remove coupon from cart
// @route   DELETE /api/cart/coupon
// @access  Private
const removeCoupon = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    // Remove coupon
    cart.appliedCoupon = undefined;
    cart.discount = 0;
    cart.calculateTotals();

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Coupon removed successfully',
      cart,
    });
  } catch (error) {
    console.error('Remove Coupon Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while removing coupon',
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  applyCoupon,
  removeCoupon,
};
