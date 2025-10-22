const Product = require('../models/Product');

// @desc    Get search suggestions
// @route   GET /api/products/search/suggestions
// @access  Public
const getSearchSuggestions = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(200).json({
        success: true,
        suggestions: [],
      });
    }

    // Search in name, category, brand with limit of 8 results
    const suggestions = await Product.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } },
        { brand: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } },
      ],
    })
      .select('name category brand image price averageRating')
      .limit(8)
      .sort({ averageRating: -1, numReviews: -1 });

    res.status(200).json({
      success: true,
      count: suggestions.length,
      suggestions,
    });
  } catch (error) {
    console.error('Search suggestions error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching search suggestions',
      error: error.message,
    });
  }
};

// @desc    Get all products with filters and pagination
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res) => {
  try {
    const { 
      category, 
      search, 
      sort, 
      page = 1, 
      limit = 12,
      minPrice,
      maxPrice,
      minRating,
      brand,
      tags
    } = req.query;

    // Build query
    let query = {};

    // Filter by category (support multiple categories)
    if (category && category !== 'All') {
      const categoryArray = category.split(',').map(cat => cat.trim());
      if (categoryArray.length === 1) {
        query.category = categoryArray[0];
      } else {
        query.category = { $in: categoryArray };
      }
    }

    // Filter by brand (support multiple brands)
    if (brand) {
      const brandArray = brand.split(',').map(b => b.trim());
      if (brandArray.length === 1) {
        query.brand = { $regex: brandArray[0], $options: 'i' };
      } else {
        query.brand = { $in: brandArray };
      }
    }

    // Filter by tags
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      query.tags = { $in: tagArray };
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Filter by minimum rating
    if (minRating) {
      query.averageRating = { $gte: parseFloat(minRating) };
    }

    // Search by name, description, or tags (text search)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
        { brand: { $regex: search, $options: 'i' } },
      ];
    }

    // Sorting
    let sortOption = {};
    if (sort === 'price-asc') sortOption.price = 1;
    else if (sort === 'price-desc') sortOption.price = -1;
    else if (sort === 'rating') sortOption.averageRating = -1;
    else if (sort === 'popular') sortOption.numReviews = -1;
    else if (sort === 'newest') sortOption.createdAt = -1;
    else sortOption.createdAt = -1; // Default: newest first

    // Pagination
    const skip = (page - 1) * limit;

    // Execute query
    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    // Count total documents
    const total = await Product.countDocuments(query);

    // Get filter options for UI
    const categories = await Product.distinct('category');
    const brands = await Product.distinct('brand');
    const priceRange = await Product.aggregate([
      { $group: { _id: null, min: { $min: '$price' }, max: { $max: '$price' } } }
    ]);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      products,
      filters: {
        categories,
        brands: brands.filter(b => b), // Remove null/undefined
        priceRange: priceRange[0] || { min: 0, max: 100000 },
      },
    });
  } catch (error) {
    console.error('Get Products Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching products',
    });
  }
};;

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error('Get Product Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching product',
    });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Admin only)
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    console.error('Create Product Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating product',
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Admin only)
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    console.error('Update Product Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating product',
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Admin only)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Delete Product Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting product',
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getSearchSuggestions,
};
