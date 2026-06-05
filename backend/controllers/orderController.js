const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  const { items, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice } = req.body;
  if (!items?.length) return res.status(400).json({ success: false, message: 'No items' });
  const order = await Order.create({ user: req.user._id, items, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice });
  res.status(201).json({ success: true, order });
};

exports.getMyOrders  = async (req, res) => res.json({ success: true, orders: await Order.find({ user: req.user._id }).sort({ createdAt: -1 }) });

exports.getOrder = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin')
    return res.status(403).json({ success: false, message: 'Access denied' });
  res.json({ success: true, order });
};

exports.getAllOrders = async (req, res) => res.json({ success: true, orders: await Order.find().populate('user', 'name email').sort({ createdAt: -1 }) });

exports.updateOrderStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus: req.body.status }, { new: true });
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  res.json({ success: true, order });
};
