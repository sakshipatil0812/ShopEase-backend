const User = require('../models/User');

// Admin authorization middleware
const adminAuth = async (req, res, next) => {
  try {
    // Check if user is authenticated (from auth middleware)
    if (!req.user) {
      return res.status(401).json({ 
        success: false,
        message: 'Please login to access this resource' 
      });
    }

    // Fetch user with isAdmin field
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Check if user is admin
    if (!user.isAdmin) {
      return res.status(403).json({ 
        success: false,
        message: 'Access denied. Admin privileges required.' 
      });
    }

    // User is admin, proceed to next middleware
    next();
  } catch (error) {
    console.error('Admin authorization error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during authorization' 
    });
  }
};

module.exports = adminAuth;
