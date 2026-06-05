const Cart = require('../models/Cart');

exports.getCart       = async (req, res) => res.json({ success: true, cart: (await Cart.findOne({ user: req.user._id }).populate('items.product')) || { items: [] } });

exports.addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  let cart = await Cart.findOne({ user: req.user._id }) || new Cart({ user: req.user._id, items: [] });
  const existing = cart.items.find(i => i.product.toString() === productId);
  if (existing) existing.quantity += quantity;
  else cart.items.push({ product: productId, quantity });
  await cart.save();
  res.json({ success: true, cart });
};

exports.updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });
  const item = cart.items.find(i => i.product.toString() === req.params.productId);
  if (!item) return res.status(404).json({ success: false, message: 'Item not in cart' });
  if (quantity <= 0) cart.items = cart.items.filter(i => i.product.toString() !== req.params.productId);
  else item.quantity = quantity;
  await cart.save();
  res.json({ success: true, cart });
};

exports.clearCart = async (req, res) => { await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] }); res.json({ success: true }); };
