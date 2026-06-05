const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  const { category, search, maxPrice, sort, page = 1, limit = 12 } = req.query;
  const q = {};
  if (category && category !== 'All') q.category = category;
  if (search) q.name = { $regex: search, $options: 'i' };
  if (maxPrice) q.price = { $lte: +maxPrice };
  const sortMap = { 'price-asc': { price: 1 }, 'price-desc': { price: -1 }, rating: { rating: -1 }, newest: { createdAt: -1 } };
  const skip = (+page - 1) * +limit;
  const [products, total] = await Promise.all([Product.find(q).sort(sortMap[sort] || { numReviews: -1 }).skip(skip).limit(+limit), Product.countDocuments(q)]);
  res.json({ success: true, products, total, pages: Math.ceil(total / +limit), page: +page });
};

exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id).populate('reviews.user', 'name');
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, product });
};

exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, product });
};

exports.deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, message: 'Product deleted' });
};

exports.addReview = async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  if (product.reviews.find(r => r.user.toString() === req.user._id.toString()))
    return res.status(400).json({ success: false, message: 'Already reviewed' });
  product.reviews.push({ user: req.user._id, name: req.user.name, rating: +rating, comment });
  product.updateRating();
  await product.save();
  res.status(201).json({ success: true, message: 'Review added' });
};
