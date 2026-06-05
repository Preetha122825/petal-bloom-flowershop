const router  = require('express').Router();
const { protect, adminOnly } = require('../middleware/auth');
const Order   = require('../models/Order');
const Product = require('../models/Product');
const User    = require('../models/User');

router.get('/stats', protect, adminOnly, async (req, res) => {
  const [totalOrders, totalProducts, totalUsers, orders] = await Promise.all([
    Order.countDocuments(), Product.countDocuments(),
    User.countDocuments({ role: 'user' }), Order.find().select('totalPrice'),
  ]);
  const revenue = orders.reduce((s, o) => s + o.totalPrice, 0);
  res.json({ success: true, stats: { totalOrders, totalProducts, totalUsers, revenue } });
});

module.exports = router;
